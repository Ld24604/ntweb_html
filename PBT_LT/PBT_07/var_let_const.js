console.log("===== ĐOẠN 1 =====");

console.log(x);
var x = 5;

console.log("===== ĐOẠN 2 =====");

try {
    console.log(y);
    let y = 10;
} catch (error) {
    console.log(error.message);
}

console.log("===== ĐOẠN 3 =====");

try {
    const z = 15;
    z = 20;
} catch (error) {
    console.log(error.message);
}

console.log("===== ĐOẠN 4 =====");

const arr = [1, 2, 3];
arr.push(4);
console.log(arr);

console.log("===== ĐOẠN 5 =====");

let a = 1;

{
    let a = 2;
    console.log("Trong block:", a);
}

console.log("Ngoài block:", a);