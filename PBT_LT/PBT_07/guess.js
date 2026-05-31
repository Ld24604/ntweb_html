const target = Math.floor(Math.random() * 100) + 1;

let attempts = 0;
const guessed = [];

while (attempts < 7) {

    let input = prompt("Nhập số từ 1 đến 100:");

    if (input === null) {
        break;
    }

    const number = Number(input);

    if (
        Number.isNaN(number) ||
        number < 1 ||
        number > 100
    ) {
        alert("Chỉ được nhập số từ 1 đến 100");
        continue;
    }

    if (guessed.includes(number)) {
        alert("Bạn đã đoán số này rồi!");
        continue;
    }

    guessed.push(number);
    attempts++;

    if (number === target) {
        alert(`Bạn đoán đúng sau ${attempts} lần!`);
        break;
    }

    if (number < target) {
        alert("Cao hơn");
    } else {
        alert("Thấp hơn");
    }
}

if (attempts === 7) {
    alert(`Bạn thua! Đáp án là ${target}`);
}