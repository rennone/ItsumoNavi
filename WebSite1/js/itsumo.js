
/* 東京 */
var map,
    lat = 35.6778614, lon = 139.7703167;

var p = 10;

var div;
var screen_;

var widgets = [];

function loadMap(id) {
    div = document.getElementById(id);

    screen_ = { width: div.clientWidth, height: div.clientHeight };

    map = new ZDC.Map(
        div,
        {
            latlon: new ZDC.LatLon(lat, lon),
            zoom: 3
        }
    );

    var latlons = [];
    latlons.push(new ZDC.LatLon(35.6778614, 138.7703167));
    latlons.push(new ZDC.LatLon(35.6778614, 140.7703167));

 
    var mesh = ZDC.getMeshCode({ latlon: { lat: lat, lon: lon }, level: 1 });

    //var pl = new ZDC.Polyline(getLatLonsArrayFromBox(mesh.box), { strokeWeight: 2, fillColor: '#FF0000', fillOpacity:0.5 ,closePath:true });

    //map.addWidget(pl);

    //ZDC.addListener(map, ZDC.MAP_CLICK, getLatLon);


    console.log('div' + div.clientWidth + "," + div.clientHeight);

    var xx = 50;
    var yy = 25;
    var o = { strokeWeight: 1, fillColor: '#FF0000', fillOpacity: 0.5, closePath: true, propagation:true };
    for (var i = 0; i < xx; ++i) {
        var x = div.clientWidth * i / xx;
        var nx = div.clientWidth * (i + 1) / xx;
        for (var j = 0; j < yy; ++j) {
            var y = div.clientHeight * j / yy;
            var ny = div.clientHeight *( j+1) / yy;

            var ll = getLatLonsArraFromPixel(x, y, nx, ny);

            var pl = new ZDC.Polyline(ll, o);
            // map.addWidget(pl);
        }
    }

    onMouseMove();

    var lt = pixel2Latlon(0, 0);
    var rt = pixel2Latlon(div.clientWidth, 0);

    var lb = pixel2Latlon(0, div.clientHeight);

    console.log(ZDC.getLatLonToLatLonDistance(lt, rt) + " ," + ZDC.getLatLonToLatLonDistance(lt, lb));

    ZDC.addListener(map, ZDC.MAP_MOUSEMOVE, onMouseMove);
};

function onMouseMove()
{
    var rect = getRectFromMeshCode(pixel2MeshCode(0, 0), pixel2MeshCode(screen_.height, screen_.width));

    widgets.forEach(function (v) { map.removeWidget(v); });

    widgets = [];
    var o = { strokeWeight: 1, fillColor: '#FF0000', fillOpacity: 0.5, closePath: true, propagation: true };
    for (var x = rect.min.x; x <= rect.max.x; ++x) {
        for (var y = rect.min.y; y <= rect.max.y; ++y) {
            var code = 100 * x + y;
            var nextCode = code + 101;

            var ll = meshCode2LatLonsArray(code, nextCode);
            var pl = new ZDC.Polyline(ll, o);
            map.addWidget(pl);
            widgets.push(pl);
        }
    }
}

function getRectFromMeshCode(leftTop, rightBottom) {
    console.log("leftTop" + leftTop.mesh[0], "rightBottom" + rightBottom.mesh[0]);
    leftTop = +leftTop.mesh[0];
    rightBottom = +rightBottom.mesh[0];
    var l = leftTop % 100;
    var b = Math.floor(rightBottom / 100) % 100;
    var r = rightBottom % 100;
    var t = Math.floor(leftTop / 100) % 100;
   // console.log("l" + l, "b" + b + "r" + r + "t" + t);
    return new RectI(
        { x: l, y: b },
    {
        x: r - l,
        y: t - b
    });
}

function meshCode2LatLon(meshCode) {
    var y = meshCode % 100;
    var x = Math.floor(meshCode / 100) % 100;

    var lat = y / 1.5;
    var lon = x + 100;

    return new ZDC.LatLon(lat, lon);
}

function meshCode2LatLonsArray(min, max) {
    return getLatLonsArrayFrom(meshCode2LatLon(min), meshCode2LatLon(max));
}


function getLatLonsArrayFrom(min, max)
{
    return [min, { lat: min.lat, lon: max.lon }, max, { lat: max.lat, lon: min.lon }];
}

function getLatLonsArraFromPixel(left, top, right, bottom) {
    var lt = map.tlToLatLon({ top: top, left: left });
    var rb = map.tlToLatLon({ top: bottom, left: right });
    return getLatLonsArrayFrom(lt, rb);
}

function pixel2MeshCode(top, left) {
    return ZDC.getMeshCode({ latlon:pixel2Latlon(top, left), level: 1 });
}

function pixel2Latlon(top, left) {
    return map.tlToLatLon({ top: top, left: left });
}

function getLatLonsArrayFromBox(latlonbox) {
    var min = latlonbox.getMin();
    var max = latlonbox.getMax();

    return [min, { lat: min.lat, lon: max.lon }, max, {lat:max.lat, lon:min.lon}];
}

/* 地図をクリックしたときの動作 */
function addListener() {
    action = ZDC.addListener(map, ZDC.MAP_CLICK, getLatLon);

};

/* 登録されたオブジェクトのイベントを削除して、
  地図のクリック時に何も起こらないようにする */
function removeListener() {
    ZDC.removeListener(action);
};

/* 指定されたイベント名でコールされるリスナをオブジェクトから削除して、
  地図のクリック時に何も起こらないようにする */
function clearListeners() {
    ZDC.clearListeners(map, ZDC.MAP_CLICK);
};

/* 指定されたオブジェクトのすべてのイベントのすべてのリスナを削除して、
  地図のクリック時に何も起こらないようにする */
function clearInstanceListeners() {
    ZDC.clearInstanceListeners(map);
};

function  latlonToStr(latlon) {
    return '緯度：' + latlon.lat + ' 経度：' + latlon.lon;
}

function getLatLon() {
    var latlon = map.getPointerPosition();

    alert(latlonToStr(latlon) + '\n' + latlonToStr(map.tlToLatLon({ top: 0, left: 0 })));
};