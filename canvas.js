/**
* Class create new canvas element
*/
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
        this.canvas.style.cursor = "pointer";
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



/**
* Class create new game field
*/
class jsCubes {

    /**
    * Constructor: create new object
    */
    constructor(level) {
        this.fields = [];

        this.level = level;
        this.score = 0;

        this.levelSettings = [
            {id: 0, xWidth: 0, yWidth: 1, Ystart: 0, speed: 0, lines: 0},
            {id: 1, xWidth: 10, yWidth: 10, Ystart: 7, speed: 500, lines: 10},
            {id: 2, xWidth: 16, yWidth: 10, Ystart: 5, speed: 550, lines: 12},
            {id: 3, xWidth: 11, yWidth: 10, Ystart: 6, speed: 500, lines: 14},
            {id: 4, xWidth: 12, yWidth: 10, Ystart: 7, speed: 450, lines: 16},
            {id: 5, xWidth: 13, yWidth: 11, Ystart: 8, speed: 400, lines: 18},
            {id: 6, xWidth: 14, yWidth: 12, Ystart: 9, speed: 350, lines: 20},
            {id: 7, xWidth: 15, yWidth: 13, Ystart: 10, speed: 300, lines: 22},
        ]

        this.START_LEVEL(1);
    }




    /**
    * Fill fields random cubes
    */
    START_LEVEL(level) {
        this.level = level;
        this.levelSettings[0].xWidth = this.levelSettings[this.level].xWidth; 

        for (let x = 1; x <= this.levelSettings[this.level].xWidth; x++) {
            for (let y = 1; y <= this.levelSettings[this.level].yWidth; y++) {
                if (!level || y <= this.levelSettings[this.level].yWidth - this.levelSettings[this.level].Ystart) {
                    this.fields.push({
                        x, y, value: 0
                    });
                } else {
                    this.fields.push({
                        x, y, value: this.__RANDOM_VALUE()
                    });
                }
            }
        }

        if (level == 0) {
            this.__START_LINES();
        }

    }


    /**
    * METHODS FOR 1 LINES
    */

    async __START_LINES() {
        let full_line = false;

        let timer = await setInterval(()=>{
            this.fields.forEach(el => {
                if (el.value === 0) { 
                    el.value = this.__RANDOM_VALUE();
                    full_line = true;
                }
            });

            if (full_line) {
                full_line = false;
                clearInterval(timer);
                return this.fields;
            }

        }, levelSettings[this.level].speed );
    }



    /**
    * Fill fields random cubes
    */
    __RANDOM_VALUE() {
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

        let __oneCubeDel = (x, y, currentValue, newValue) => {

            let params = [
                { condition: !!(x > 1 && this.GET_FIELD_VALUE(x-1, y) == currentValue), next_x: x-1, next_y: y},
                { condition: !!(x < this.levelSettings[this.level].xWidth && this.GET_FIELD_VALUE(x+1, y) == currentValue), next_x: x+1, next_y: y},
                { condition: !!(y > 1 && this.GET_FIELD_VALUE(x, y-1) == currentValue ), next_x: x, next_y: y-1},
                { condition: !!(y < this.levelSettings[this.level].yWidth && this.GET_FIELD_VALUE(x, y+1) == currentValue), next_x: x, next_y: y+1},
            ]

            params.forEach(el => {
                if ( el.condition ) {
                    deleteCounter++;
                    this.SET_FIELD_VALUE(el.next_x, el.next_y, newValue);
                    __oneCubeDel(el.next_x, el.next_y, currentValue, newValue);
                }          
            });

        }

        this.SET_FIELD_VALUE(x, y, newValue);

        __oneCubeDel(x, y, currentValue, newValue);

        this.score += (deleteCounter > 2) ? deleteCounter**2 : 0;

        for(let i = 0; i < this.fields.length; i++) {
            if ( this.fields[i].value == newValue ) {
                this.fields[i].value = (deleteCounter > 2) ? 0 : currentValue;
            }
        }


    } 

    SEARCH_EMPTY_COL(){
        let maybe_empty_col = 0; 
        for (let x = 2; x <= this.levelSettings[this.level].xWidth; x++ ) {
            maybe_empty_col = x;
            for (let y = 1; y <= this.levelSettings[this.level].yWidth; y++ ) {
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

    __SWAP_COL(x1, x2) {
        for (let y = 1; y <= this.levelSettings[this.level].yWidth; y++ ) {
            let x1_val = this.GET_FIELD_VALUE(x1, y);
            let x2_val = this.GET_FIELD_VALUE(x2, y);
            this.SET_FIELD_VALUE(x1, y, x2_val);
            this.SET_FIELD_VALUE(x2, y, x1_val);
        }
        return 'swap success';
    }

    REBUILD_FIELDS() {
        // Empty cubes to TOP
        for (let x = 1; x <= this.levelSettings[this.level].xWidth; x++ ) {
            for (let y = 2; y <= this.levelSettings[this.level].yWidth; y++ ) {
                if ( this.GET_FIELD_VALUE(x, y) == 0 && this.GET_FIELD_VALUE(x, y-1) !== 0 ) {
                    this.SET_FIELD_VALUE(x, y, this.GET_FIELD_VALUE(x, y-1));
                    this.SET_FIELD_VALUE(x, y-1, 0);
                    break;
                }
            }
        }
        
        let empty_x = this.SEARCH_EMPTY_COL();
        // console.log('empty_x: ' + empty_x);

        if (empty_x && empty_x < this.levelSettings[this.level].xWidth) {
            this.__SWAP_COL(empty_x, empty_x + 1);
        }

    }

}


const size = 40;
var level = 1;

const jsCubesFields = new jsCubes(level);
const jsCubesCanvas = new Canvas("jsCubes", "jsCubes-wrap", jsCubesFields.levelSettings[level].xWidth*size, jsCubesFields.levelSettings[level].yWidth*size, size);

const jsCubesFields_2 = new jsCubes(0);
const jsCubesCanvas_2 = new Canvas("jsCubesLine", "jsCubesLine-wrap", jsCubesFields.levelSettings[level].xWidth*size, 1*size, size);

//jsCubesCanvas_2.REPAINT_FIELDS(jsCubesFields_2.fields);

// ONCLICK main field
jsCubesCanvas.canvas.onclick = function(event){
    let pos = jsCubesCanvas.COORD_TO_POSITION(event.offsetX, event.offsetY);
    if (jsCubesFields.GET_FIELD_VALUE(pos.x, pos.y)) {
        jsCubesFields.TRY_DELETE_FIELD(pos.x, pos.y);
    }
    // set new score
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
