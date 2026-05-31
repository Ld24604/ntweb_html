console.log("=== CLASSIC FIZZBUZZ ===");

for (let i = 1; i <= 100; i++) {

    let output = "";

    if (i % 3 === 0) output += "Fizz";
    if (i % 5 === 0) output += "Buzz";

    console.log(output || i);
}

function customFizzBuzz(limit, rules) {

    for (let i = 1; i <= limit; i++) {

        let result = "";

        for (const rule of rules) {

            if (i % rule.divisor === 0) {
                result += rule.word;
            }
        }

        console.log(result || i);
    }
}

customFizzBuzz(30, [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" },
    { divisor: 7, word: "Jazz" }
]);