
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
        this.step = 40;
        this.CREATE_CANVAS();      
    }

    RANDOM_COLOR() {
        let colors = ["#F00", "#955", "#044", "#F08", "#208", "#8F8", "#0F0", "#0A0", "#040", "#00F", "#456"];
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }
        return colors[getRandomInt(0, colors.length)];  
    }

    CREATE_CANVAS() {
        this.canvas.ctx.fillStyle = "#FFF";
        this.canvas.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        document.getElementById(this.canvas.idParentElement).appendChild(this.canvas);
    }

    PAINT_CUBES(x,y, color) {
        let start_x = x * this.step - this.step,
            start_y = y * this.step - this.step;

        this.canvas.ctx.fillStyle = color;
        this.canvas.ctx.fillRect(start_x, start_y, this.step - 1, this.step - 1);
    }

}


const jsCubes = new Canvas("jsCubes", "jsCubes-wrap", 400, 400);

for (let x = 1; x <= 10; x++) {
    for (let y = 1; y <= 10; y++) {
        jsCubes.PAINT_CUBES(x, y, jsCubes.RANDOM_COLOR());
    }
}

//jsCubes-wrap