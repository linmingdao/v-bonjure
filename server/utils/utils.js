function fib(n) {
    if (n == 1 || n == 2) {
        return 1;
    }
    return fib(n - 1) + fib(n - 2);
}

module.exports = {
    // 模拟睡眠
    mockSleep() {
        fib(42);
    }
};