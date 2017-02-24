var each = require('async-each-series');

var codeSettings = require('./code.settings.js');

var codeGenerator = {};

var _HTTP_STATUS = [200, 400, 403, 404, 407, 408, 423, 444, 500, 502, 504, 505];
var generatedError = "A Random Error Occurred";

function generateStatus(codeSetting, isServerRequest, callback) {
    callback(isServerRequest ? 200 : _HTTP_STATUS[codeRandom.getRandomIndex(0, _HTTP_STATUS.length, codeSetting.successProcentage)]);
}

function generateData(codeSetting, callback, quantity) {
    var generatedData = [];
    var dataQuantity = quantity ? quantity : codeSetting.quantity;
    var arr = [];

    for (var i = 0; i < dataQuantity; i++) {
        arr.push(i)
    }

    each(arr, function (el, next) {
        var generatedObject = JSON.parse(JSON.stringify(codeSetting.template));
        codeFunctions.reset(function () {
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
                    if (obj[property] && eval("codeFunctions." + obj[property].split("(")[0])) {
                        eval("codeFunctions." + ((obj[property].indexOf("(") > 0 || obj[property].indexOf(")") > 0) ? obj[property].replace(")", ",clb)") : obj[property] + "(clb)"));
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

codeGenerator.setcodeID = function (id, callback) {
    codeSettings.find(id, function (codeSetting) {
        callback(codeSetting);
    });
};

codeGenerator.createResponse = function (codeSetting, callback, quantity, isServerRequest) {
    generateStatus(codeSetting, isServerRequest, function (status) {
        generateData(codeSetting, function (data) {
            setTimeout(function () {
                callback(status, data);
            }, isServerRequest ? 0 : codeRandom.getRandomTimeOutTime(0, _HTTP_STATUS.length, codeSetting.timeoutProcentage));
        }, quantity)
    });
};

codeGenerator.getGeneratedData = function (generatedStatus, generatedData) {
    return generatedStatus == 200 ? generatedData : generatedError;
};

module.exports = codeGenerator;
