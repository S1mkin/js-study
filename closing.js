function counter() {
    let currentCounter = 1;
    return () => currentCounter++
}

var counter_1 = counter();
var counter_2 = counter();

console.log("counter_1: " + counter_1());
console.log("counter_1: " + counter_1());
console.log("counter_1: " + counter_1());

console.log("counter_2: " + counter_2());
console.log("counter_2: " + counter_2());