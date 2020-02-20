class Canvas {

    constructor(id, idParentElement, width, height, step) {
        this.canvas = document.createElement('canvas');
        this.canvas.ctx = this.canvas.getContext('2d');
        this.canvas.id = id;
        this.canvas.height = height;
        this.canvas.width = width;
        this.canvas.idParentElement = idParentElement;
        this.step = step;
        this.colors = ["#fff", "#db1414", "#23518c", "#276f21", "#c1af1b"];

        this.CREATE_CANVAS();
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

    REPAINT_FIELDS(fields) {
        fields.forEach(el => {
            this.PAINT_CUBES(el.x, el.y, this.colors[el.value]);
        });
    }

    COORD_TO_POSITION(x, y) {
        return {
            x: Math.ceil(x / this.step),
            y: Math.ceil(y / this.step)
        }
    }

}


class jsCubes {
    constructor(xCount, yCount) {
        this.xCount = xCount;
        this.yCount = yCount;
        this.fields = [];

        this.CREATE_FIELDS();
    }

    CREATE_FIELDS() {
        for (let x = 1; x <= this.xCount; x++) {
            for (let y = 1; y <= this.yCount; y++) {
                this.fields.push({
                    x, y, value: this.RANDOM_VALUE()
                });
            }
        }
    }

    RANDOM_VALUE() {
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }
        return getRandomInt(1, 5);
    }

    FIELD_VALUE(x, y, newValue) {
        this.fields.forEach(el => {
            if (el.x === x && el.y === y) {
                el.value = newValue;
            }
        });
    }



}


const jsCubesFields = new jsCubes(10, 10);
const jsCubesCanvas = new Canvas("jsCubes", "jsCubes-wrap", 400, 400, 40);

jsCubesCanvas.REPAINT_FIELDS(jsCubesFields.fields);

jsCubesCanvas.canvas.onclick = function(event){
    let position = jsCubesCanvas.COORD_TO_POSITION(event.offsetX, event.offsetY);
    jsCubesFields.FIELD_VALUE(position.x, position.y, 0);
    jsCubesCanvas.REPAINT_FIELDS(jsCubesFields.fields);
};