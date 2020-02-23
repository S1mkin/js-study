let m = [5, 10, 15, 20, 25];

/*
new_m = m.map((value, index)=>{
    return value**2;
});

console.log(new_m);


let new_m = m.sort((a, b) => {
    return b - a;
});

console.log(new_m);


let new_m = m.filter(value => value > 15);

console.log(new_m);

*/
m.splice(1, 2);
console.log(m);
