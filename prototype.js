// EXAMPLE CLASS

class Car {

    constructor(name = null, color = null) {
        this.name = name;
        this.color = color;
    }

    get get_name() { return this.name; }
    get get_color() { return this.golor; }

    print_params(add_dot = false, type_call = null){
        let output = `Auto: ${this.name}, color: ${this.color}`
        if (type_call) output += `, type_call: ${type_call}`;
        if (add_dot) output += ".";
        console.log(output);
        return output;
    }

}

let reno = {
    name: 'reno',
    color: 'purple'
}

let bmv = new Car('bmv', 'red');
let mers = new Car('mers', 'black');

mers.print_params.call(reno, true, "call");
mers.print_params.apply(reno, [true, "apply"]);
mers.print_params.bind(reno, true, "bind")();


// EXAMPLE function constructor


function Cat(name, color) {
    this.name = name;
    this.color = color;

    this.sayMyau = function() {
        console.log("Myau");
    }

}

barsik = new Cat('Barsik', 'white');

barsik.sayMyau();




// EXAMPLE STRING

// let str = new String("Hello world");
let str = "Hello world";

String.prototype.countChar = function(char) {
    let counter = 0;
    for (let i = 0; i < this.length; i++ ) {
        if (this[i] == char) counter++;
    }
    return counter;
}

console.log(str.countChar('l'));