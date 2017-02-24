var each = require('async-each-series');

var mockSettings = require('./mock.settings.js');
var mockFunctions = require('./mock.functions');
var mockRandom = require("./mock.random.js");

var mockGenerator = {};

var _HTTP_STATUS = [200, 400, 403, 404, 407, 408, 423, 444, 500, 502, 504, 505];
var generatedError = "A Random Error Occurred";

function generateStatus(mockSetting, isServerRequest, callback) {
    callback(isServerRequest ? 200 : _HTTP_STATUS[mockRandom.getRandomIndex(0, _HTTP_STATUS.length, mockSetting.successProcentage)]);
}

function generateData(mockSetting, callback, quantity) {
    var generatedData = [];
    var dataQuantity = quantity ? quantity : mockSetting.quantity;
    var arr = [];

    for (var i = 0; i < dataQuantity; i++) {
        arr.push(i)
    }

    each(arr, function (el, next) {
        var generatedObject = JSON.parse(JSON.stringify(mockSetting.template));
        mockFunctions.reset(function () {
            generateObject(generatedObject, function (res) {
                generatedData.push(res);
                next();
            });
        });
    }, function () {
        callback(generatedData);
    });

}

function generateObject(obj, callback) {
    each(Object.keys(obj), function (property, next) {
        if (obj.hasOwnProperty(property)) {
            try {
                var clb = function (result) {
                    obj[property] = result;
                    next();
                };

                if (typeof obj[property] == "object") {
                    if (obj[property].execute) {
                        obj[property] = eval("(" + obj[property].execute + ")();");
                        next();
                    } else if (obj[property].enum) {
                        obj[property] = obj[property].enum;
                        next();
                    } else {
                        generateObject(obj[property], clb);
                    }
                } else {
                    if (obj[property] && eval("mockFunctions." + obj[property].split("(")[0])) {
                        eval("mockFunctions." + ((obj[property].indexOf("(") > 0 || obj[property].indexOf(")") > 0) ? obj[property].replace(")", ",clb)") : obj[property] + "(clb)"));
                    } else {
                        obj[property] = obj[property];
                        next();
                    }
                }
            }
            catch (err) {
                obj[property] = err;
                next();
            }
        } else {
            next();
        }
    }, function () {
        callback(obj);
    });
}

mockGenerator.setMockID = function (id, callback) {
    mockSettings.find(id, function (mockSetting) {
        callback(mockSetting);
    });
};

mockGenerator.createResponse = function (mockSetting, callback, quantity, isServerRequest) {
    generateStatus(mockSetting, isServerRequest, function (status) {
        generateData(mockSetting, function (data) {
            setTimeout(function () {
                callback(status, data);
            }, isServerRequest ? 0 : mockRandom.getRandomTimeOutTime(0, _HTTP_STATUS.length, mockSetting.timeoutProcentage));
        }, quantity)
    });
};

mockGenerator.getGeneratedData = function (generatedStatus, generatedData) {
    return generatedStatus == 200 ? generatedData : generatedError;
};

module.exports = mockGenerator;
