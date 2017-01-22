/*---------------------
レンダラーの初期化
---------------------*/
function create(id, color)
{
    var div = document.getElementById(id)
    var renderer = new THREE.WebGLRenderer({ antialias: true });//描画を行うレンダラーの作成(アンチエイリアスを有効に)
    renderer.setSize(300, 300);//描画領域のサイズを設定
    renderer.setClearColor(color, 1);
    //renderer.setClearColorHex(0x333333, 0);//描画領域の色と透過度を設定(色は16進数、透過度は0～1)
    document.getElementById(id).appendChild(renderer.domElement);//描画領域の実装

    /*---------------------
    シーンの作成
    ---------------------*/
    var scene = new THREE.Scene();

    /*---------------------
    カメラの作成
    ---------------------*/
    var camera = new THREE.PerspectiveCamera(15, 500 / 500);//透視投影のカメラを作成(平行投影はOrthographicCamera)
    camera.position = new THREE.Vector3(0, 0, 8);//カメラの位置
    camera.lookAt(new THREE.Vector3(0, 0, 0));//カメラの注視点
    camera.backgroundColor = 0xffffff;
    scene.add(camera);//シーンにカメラを追加

    /*---------------------
    ライトの作成
    ---------------------*/
    var light = new THREE.DirectionalLight(0xffffff);//無限遠光源(太陽光のような光源)のライトを作成
    light.position = new THREE.Vector3(0.577, 0.577, 0.577);//ライトの位置
    scene.add(light);//シーンにライトを追加

    //var ambient = new THREE.AmbientLight(0x212832);//環境光(照り返しのような間接的なの光)を作成
    //scene.add(ambient);

    /*---------------------
    表示する物体の作成
    ---------------------*/
    var geometry = new THREE.CubeGeometry(1, 1, 1);//形状を作成
    var material = new THREE.MeshPhongMaterial({//質感を設定
        color: 0xffffff, //色、環境
        specular: 0xcccccc, shininess: 50,//ハイライトの色、ハイライトの大きさ、金属の質感を有効
        //map: THREE.ImageUtils.loadTexture('images/logo_mark.jpg')
    });//マッピングを設定（bumpMapで凹凸の設定が可能）

    var mesh = new THREE.Mesh(geometry, material);//物体を作成
    scene.add(mesh);//シーンに物体を追加

    /*---------------------
    レンダリング
    ---------------------*/
    var baseTime = +new Date;
    function render() {
        requestAnimationFrame(render);//アニメーションを作成
        mesh.rotation.y = 1 * (+new Date - baseTime) / 1000;//Y軸の回転
        mesh.rotation.x = 0.5 * (+new Date - baseTime) / 1000;//X軸の回転
        renderer.render(scene, camera);//3Dレンダリングの実行
    };
    render();

    function tick() {
        var finished = false;

        // 再描画の処理
        // アニメーションが終了したら
        // finishedをtrueにする

        if (!finished)
            requestAnimationFrame(tick);
    }

    //requestAnimFrameのクロスブラウザ対応
    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
                        window.webkitRequestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                        window.oRequestAnimationFrame ||
                        window.msRequestAnimationFrame ||
                        function (callback) {
                            window.setTimeout(callback, 1000 / 60);
                        };
    })();
}
