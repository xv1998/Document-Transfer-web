const isProd = process.env.NODE_ENV === "production";

const isDev = process.env.NODE_ENV === "development";

const isTest = process.env.NODE_ENV === "test";

const isWin = () => {
    return /win32/gi.test(process.platform);
};

const isLinux = () => {
    return /linux/gi.test(process.platform);
};

module.exports = {
    isProd,
    isDev,
    isTest,
    isWin,
    isLinux
}
