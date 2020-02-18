
/*
var example = document.getElementById("jsCubes");

var ctx = example.getContext('2d');
ctx.fillRect(0, 0, example.width, example.height);

console.log('example.width: ' + example.width);
*/

class Canvas {

    constructor(id, idParentElement, width, height) {
        this.canvas = document.createElement('canvas');
        this.canvas.ctx = this.canvas.getContext('2d');
        this.canvas.id = id;
        this.canvas.height = height;
        this.canvas.width = width;
        this.canvas.idParentElement = idParentElement;
        this.step = 50;
        this.CREATE_CANVAS();      
    }

    CREATE_CANVAS() {
        this.canvas.ctx.fillStyle = "#000";
        this.canvas.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        document.getElementById(this.canvas.idParentElement).appendChild(this.canvas);
    }

    PAINT_CUBES(x,y, color) {
        let start_x = x * this.step - this.step,
            start_y = y * this.step - this.step,
            end_x = start_x,
            end_y = start_y;

        this.canvas.ctx.fillStyle = color;
        this.canvas.ctx.fillRect(start_x, start_y, end_x, end_y);
    }

}




const jsCubes = new Canvas("jsCubes", "jsCubes-wrap", 400, 400);

jsCubes.PAINT_CUBES(4, 2, "#F00");

//jsCubes-wrap