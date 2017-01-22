var RectI = function(min, size) {

    if (!(this instanceof RectI)) {
        return new RectI(min, size);
    }
    this.min = min;
    this.size = size;
    
  

    //Object.defineProperty(RectI.prototype,
    //    "max",
    //    {
    //        get: function () { return { x: this.min.x + this.size.x, y: this.min.y + this.size.y } }
    //    });

    //Object.defineProperty(RectI.prototype,
    //    "width",
    //    {
    //        get: function () { return size.x; }
    //    });

    //Object.defineProperty(RectI.prototype,
    //    "height",
    //    {
    //        get: function () { return size.y; }
    //    });
};

RectI.prototype.diff = function (other) {
    if (!isOverlap(other)) {
        return [this, other];
    }

    if (other.contain(this)) {
        return [];
    }

    var ret = [];
    if (this.min.x < other.min.x) {
        ret.push(new RectI(
            this.min,
            {
                x: other.min.x - this.min.x,
                y: this.height
            }));
    }

    if (this.max.x > other.max.x) {
        ret.push(new RectI(
            {
                x: this.max.x,
                y: this.min.y
            },
            {
                x: this.max.x - other.max.x,
                y: this.height
            }
        ));
    }

    var minX = Math.max(this.min.x, other.min.x);
    var maxX = Math.min(this.max.x, other.max.x);
    if (this.min.y < other.min.y) {

        ret.push(new RectI({
            x: minX,
            y: this.min.y
        },
            {
                x: maxX - minX,
                y: other.min.y - this.min.y
            }));
    }

    if (this.max.y > other.max.y) {
        ret.push(new RectI({
            x: minX,
            y: other.max.y
        },
            {
                x: maxX - minX,
                y: other.max.y - this.max.y
            }));
    }

    return ret;
}

// otherと重なるかどうか
RectI.prototype.isOverlap = function (other) {
    return !(this.min.x >= other.max.x ||
        this.min.y >= other.max.y ||
        this.max.x <= other.min.x ||
        this.max.y >= other.min.y);
}
// otherを包括するかどうか
RectI.prototype.contain = function (other) {
    return this.min.x <= other.min.x &&
        this.min.y <= other.min.y &&
        this.max.x >= other.max.x &&
        this.max.y >= other.max.y;
}

RectI.prototype = {
    get max() {
        return { x: this.min.x + this.size.x, y: this.min.y + this.size.y };

    },

    get width() {
        return this.size.x;
    },

    get height() {
        return this.size.y;
    }


}
