var mockRandom = {};

mockRandom.getMinimun = function (MIN) {
    return MIN ? (typeof MIN == "number" ? MIN : 0) : 0;
};

mockRandom.getMaximum = function (MAX) {
    return MAX ? (typeof MAX == "number" ? MAX : 0) : 1000;
};

mockRandom.getRandomIndexByMaxValue = function (_MAX) {
    return Math.floor(Math.random() * (_MAX - 0));
};

mockRandom.getRandomIndex = function (_MIN, _MAX, successProcentage) {
    var isError = Math.ceil(Math.random() * (100 - _MIN)) <= (100 - successProcentage);
    return isError ? _MIN : Math.floor(Math.random() * (_MAX - _MIN))
};

mockRandom.getRandomTimeOutTime = function (_MIN, _MAX, timeoutProcentage) {
    var isError = Math.ceil(Math.random() * (100 - _MIN)) <= (100 - timeoutProcentage);
    return (isError ? _MIN : Math.floor(Math.random() * (_MAX - _MIN))) * ((isError ? _MIN : Math.floor(Math.random() * (_MAX - _MIN))) * 100)
};

module.exports = mockRandom;