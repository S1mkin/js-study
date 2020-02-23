let v1 = Number(5);
let v2 = String("str");
let v3 = Boolean(true);
let v4 = BigInt(10000000000);
let v5 = undefined;
let v6 = null;
let v7 = Object({x: 2, y: 3});

console.log(v7);

// BOOLEAN
console.log(Boolean("")); // false
console.log(Boolean(0)); // false
console.log(Boolean(null)); // false
console.log(Boolean(undefined)); // false
console.log(Boolean([])); // true
console.log(Boolean({})); // true


// NUMBER
console.log(Number("")); // 0
console.log(Number("0")); // 0
console.log(Number(null)); // 0
console.log(Number(undefined)); // NaN
console.log(Number([])); // 0
console.log(Number({})); // NaN
console.log(Number([1,2,3])); // NaN
console.log(Number({x: 2, y: 3})); // NaN


// STRING

console.log(String(null)); // "null"
console.log(String(undefined)); // "undefined"
console.log(String([])); // ""
console.log(String({})); // [Object object]
console.log(String([1,2,3])); // "1,2,3"
console.log(String({x: 2, y: 3})); // [Object object]

console.log("" + null + undefined + [] + [1,2,3] + {});

console.log("2" + 3 + "px");