function pipe(...fns) {
    return value =>
        fns.reduce(
            (result, fn) => fn(result),
            value
        );
}

const process = pipe(
    x => x * 2,
    x => x + 10,
    x => x.toString(),
    x => "Kết quả: " + x
);

console.log(process(5));

function memoize(fn) {
    const cache = {};

    return (...args) => {
        const key = JSON.stringify(args);

        if (cache[key]) {
            return cache[key];
        }

        cache[key] = fn(...args);

        return cache[key];
    };
}

const expensiveCalc = memoize(n => {
    console.log("Đang tính...");

    let result = 0;

    for (let i = 0; i < n; i++) {
        result += i;
    }

    return result;
});

console.log(expensiveCalc(1000000));
console.log(expensiveCalc(1000000));

function debounce(fn, delay) {
    let timer;

    return (...args) => {
        clearTimeout(timer);

        timer = setTimeout(
            () => fn(...args),
            delay
        );
    };
}

const search = debounce(query => {
    console.log("Searching:", query);
}, 500);

async function retry(
    fn,
    maxAttempts = 3
) {
    let attempt = 0;

    while (attempt < maxAttempts) {
        try {
            return await fn();
        } catch (error) {
            attempt++;

            if (attempt === maxAttempts) {
                throw error;
            }
        }
    }
}