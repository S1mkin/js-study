class Canvas {

    constructor(id, idParentElement, width, height, step) {
        this.canvas = document.createElement('canvas');
        this.canvas.ctx = this.canvas.getContext('2d');
        this.canvas.id = id;
        this.canvas.height = height;
        this.canvas.width = width;
        this.canvas.idParentElement = idParentElement;
        this.step = step;
        this.colors = ["#fff", "#db1414", "#23518c", "#276f21", "#c1af1b", "#eee"];

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

        this.canvas.ctx.fillStyle = "#fff";
        this.canvas.ctx.fillText(`${x}:${y}`, start_x + 10, start_y + 14);

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

        this.score = 0;

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

    SET_FIELD_VALUE(x, y, newValue) {
        for (let i = 0; i <= this.fields.length; i++ ) {
            if (this.fields[i].x === x && this.fields[i].y === y) {
                if (this.fields[i].value !== newValue) { 
                    this.fields[i].value = newValue;
                    this.REBUILD_FIELDS(); 
                }
                break;
            }
        }
    }

    GET_FIELD_VALUE(x, y) {
        let value = null;
        this.fields.forEach(el => {
            if (el.x === x && el.y === y) {
                value = el.value;
            }
        });
        return value;
    }



    TRY_DELETE_FIELD(x, y) {

        let currentValue = this.GET_FIELD_VALUE(x, y);
        let newValue = 6;
        let deleteCounter = 1;

        let oneCubeDel = (x, y, currentValue, newValue) => {

            if (x > 1 && this.GET_FIELD_VALUE(x-1, y) == currentValue ) {
                deleteCounter++;
                this.SET_FIELD_VALUE(x-1, y, newValue);
                oneCubeDel(x-1, y, currentValue, newValue);
            }

            if (x < this.xCount && this.GET_FIELD_VALUE(x+1, y) == currentValue ) {
                deleteCounter++;
                this.SET_FIELD_VALUE(x+1, y, newValue);
                oneCubeDel(x+1, y, currentValue, newValue);
            }

            if (y > 1 && this.GET_FIELD_VALUE(x, y-1) == currentValue ) {
                deleteCounter++;
                this.SET_FIELD_VALUE(x, y-1, newValue);
                oneCubeDel(x, y-1, currentValue, newValue);
            }

            if (y < this.yCount && this.GET_FIELD_VALUE(x, y+1) == currentValue ) {
                deleteCounter++;
                this.SET_FIELD_VALUE(x, y+1, newValue);
                oneCubeDel(x, y+1, currentValue, newValue);
            }

        }

        this.SET_FIELD_VALUE(x, y, newValue);

        oneCubeDel(x, y, currentValue, newValue);

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                for(let i = 0; i < this.fields.length; i++) {
                    if ( this.fields[i].value == 6 ) {
                        this.fields[i].value = (deleteCounter > 2) ? 0 : currentValue;
                    }
                }
                this.REBUILD_FIELDS();
                resolve(true);
            }, 100);
        });   

    } 

    REBUILD_FIELDS() {
        for (let x = 1; x <= this.xCount; x++ ) {
            for (let y = 2; y <= this.yCount; y++ ) {
                if ( this.GET_FIELD_VALUE(x, y) == 0 && this.GET_FIELD_VALUE(x, y-1) !== 0 ) {
                    this.SET_FIELD_VALUE(x, y, this.GET_FIELD_VALUE(x, y-1));
                    this.SET_FIELD_VALUE(x, y-1, 0);
                }
            }
        }
    }

}


const jsCubesFields = new jsCubes(10, 10);
const jsCubesCanvas = new Canvas("jsCubes", "jsCubes-wrap", 400, 400, 40);

jsCubesCanvas.REPAINT_FIELDS(jsCubesFields.fields);

jsCubesCanvas.canvas.onclick = function(event){
    let pos = jsCubesCanvas.COORD_TO_POSITION(event.offsetX, event.offsetY);
    // jsCubesFields.SET_FIELD_VALUE(pos.x, pos.y, 0);
    
    jsCubesFields.TRY_DELETE_FIELD(pos.x, pos.y).then(() => {
        jsCubesCanvas.REPAINT_FIELDS(jsCubesFields.fields);
    });

    

};

//console.log(jsCubesFields.fields[0]);