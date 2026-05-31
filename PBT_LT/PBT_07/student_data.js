const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" }
];

let gioi = 0;
let kha = 0;
let trungBinh = 0;
let yeu = 0;

let highest = null;
let lowest = null;

let sumMath = 0;
let sumPhysics = 0;
let sumCS = 0;

console.log("| STT | Tên | TB | Xếp loại |");

students.forEach((s, index) => {

    const avg =
        s.math * 0.4 +
        s.physics * 0.3 +
        s.cs * 0.3;

    let rank;

    if (avg >= 8) {
        rank = "Giỏi";
        gioi++;
    } else if (avg >= 6.5) {
        rank = "Khá";
        kha++;
    } else if (avg >= 5) {
        rank = "Trung bình";
        trungBinh++;
    } else {
        rank = "Yếu";
        yeu++;
    }

    s.avg = avg;

    console.log(
        `| ${index + 1} | ${s.name} | ${avg.toFixed(1)} | ${rank} |`
    );

    if (!highest || avg > highest.avg) {
        highest = s;
    }

    if (!lowest || avg < lowest.avg) {
        lowest = s;
    }

    sumMath += s.math;
    sumPhysics += s.physics;
    sumCS += s.cs;
});

console.log("\nTHỐNG KÊ");
console.log("Giỏi:", gioi);
console.log("Khá:", kha);
console.log("Trung bình:", trungBinh);
console.log("Yếu:", yeu);

console.log("\nCao nhất:", highest.name, highest.avg.toFixed(2));
console.log("Thấp nhất:", lowest.name, lowest.avg.toFixed(2));

console.log("\nTB Môn:");
console.log("Math:", (sumMath / students.length).toFixed(2));
console.log("Physics:", (sumPhysics / students.length).toFixed(2));
console.log("CS:", (sumCS / students.length).toFixed(2));

const male = students.filter(s => s.gender === "M");
const female = students.filter(s => s.gender === "F");

const avgMale =
    male.reduce((sum, s) => sum + s.avg, 0) / male.length;

const avgFemale =
    female.reduce((sum, s) => sum + s.avg, 0) / female.length;

console.log("\nTB Nam:", avgMale.toFixed(2));
console.log("TB Nữ:", avgFemale.toFixed(2));