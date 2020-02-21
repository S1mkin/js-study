class Canvas {

    constructor(id, idParentElement, width, height, step) {
        this.canvas = document.createElement('canvas');
        this.canvas.ctx = this.canvas.getContext('2d');
        this.canvas.id = id;
        this.canvas.height = height;
        this.canvas.width = width;
        this.canvas.idParentElement = idParentElement;
        this.step = step;
        this.colors = ["#fff", "#db1414", "#23518c", "#276f21", "#c1af1b", "#aaa"];

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
        
        this.canvas.ctx.strokeStyle = (color == "#fff") ? "#fff": "#fff";
        this.canvas.ctx.strokeRect(start_x+4, start_y+4, this.step - 8, this.step - 8);
 
        //this.canvas.ctx.fillStyle = "#fff";
        //this.canvas.ctx.fillText(`${x}:${y}`, start_x + 10, start_y + 14);

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
        let newValue = 5;
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

        this.score += (deleteCounter > 2) ? deleteCounter**2 : 0;

        for(let i = 0; i < this.fields.length; i++) {
            if ( this.fields[i].value == newValue ) {
                this.fields[i].value = (deleteCounter > 2) ? 0 : currentValue;
            }
        }


    } 

    SEARCH_EMPTY_COL(){
        let maybe_empty_col = 0; 
        for (let x = 2; x <= this.xCount; x++ ) {
            maybe_empty_col = x;
            for (let y = 1; y <= this.yCount; y++ ) {
                if (this.GET_FIELD_VALUE(x, y) != 0) {
                    maybe_empty_col = 0;
                    break;
                }
            }
            if (maybe_empty_col) { 
                break;
            }
        }
        return maybe_empty_col;     
    }

    SWAP_COL(x1, x2) {
        for (let y = 1; y <= this.yCount; y++ ) {
            let x1_val = this.GET_FIELD_VALUE(x1, y);
            let x2_val = this.GET_FIELD_VALUE(x2, y);
            this.SET_FIELD_VALUE(x1, y, x2_val);
            this.SET_FIELD_VALUE(x2, y, x1_val);
        }
        return 'swap success';
    }

    REBUILD_FIELDS() {
        // Empty cubes to TOP
        for (let x = 1; x <= this.xCount; x++ ) {
            for (let y = 2; y <= this.yCount; y++ ) {
                if ( this.GET_FIELD_VALUE(x, y) == 0 && this.GET_FIELD_VALUE(x, y-1) !== 0 ) {
                    this.SET_FIELD_VALUE(x, y, this.GET_FIELD_VALUE(x, y-1));
                    this.SET_FIELD_VALUE(x, y-1, 0);
                    break;
                }
            }
        }
        
        let empty_x = this.SEARCH_EMPTY_COL();
        console.log('empty_x: ' + empty_x);

        if (empty_x && empty_x < this.xCount) {
            this.SWAP_COL(empty_x, empty_x + 1);
        }

    }

}

const xWidth = 16;
const yWidth = 12;
const size = 40;

const jsCubesFields = new jsCubes(xWidth, yWidth);
const jsCubesCanvas = new Canvas("jsCubes", "jsCubes-wrap", xWidth*size, yWidth*size, size);

const jsCubesFields_2 = new jsCubes(xWidth, 1);
const jsCubesCanvas_2 = new Canvas("jsCubesLine", "jsCubesLine-wrap", xWidth*size, 1*size, size);

jsCubesCanvas_2.REPAINT_FIELDS(jsCubesFields_2.fields);

// ONCLICK main field
jsCubesCanvas.canvas.onclick = function(event){
    let pos = jsCubesCanvas.COORD_TO_POSITION(event.offsetX, event.offsetY);
    if (jsCubesFields.GET_FIELD_VALUE(pos.x, pos.y)) {
        jsCubesFields.TRY_DELETE_FIELD(pos.x, pos.y);
    }
    document.getElementById("jsCubes-score").innerText = jsCubesFields.score;
};


/*

let timer = setInterval(() => {
    jsCubesFields.REBUILD_FIELDS();
    jsCubesCanvas.REPAINT_FIELDS(jsCubesFields.fields);
}, 40);
*/


let step = function step() {
  requestAnimationFrame(step);
    jsCubesFields.REBUILD_FIELDS();
    jsCubesCanvas.REPAINT_FIELDS(jsCubesFields.fields);
}
step();
