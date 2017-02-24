var each = require('async-each-series');
var http = require("http");
var fs = require('fs');
var uuid = require('node-uuid');

var mockLoremIpsum = require("./mock.lists/mock.lorem.js");
var mockRandom = require("./mock.random.js");
var name, firstname, email, phone, company, street, zip, city, link;

var mockFunctions = {};

function getContentFromFile(value, max, filename, field, aggregate) {
    if (value) {
        return value;
    } else {
        var input = fs.readFileSync('./source/mockgenerator/mock.lists/' + filename).toString();
        var idx = mockRandom.getRandomIndexByMaxValue(max);
        value = input.split("\n")[idx].replace("\r", "").replace("\n", "");

        if (aggregate) {
            value = aggregate(value);
        }

        eval(field + "=" + field + " ? " + field + ": value");
        return value;
    }
}

mockFunctions.NAME = function (callback) {
    callback(getContentFromFile(name, 1999, "names.txt", "name", function (input) {
        return input.split(" ")[1];
    }));
};

mockFunctions.FIRSTNAME = function (callback) {
    callback(getContentFromFile(firstname, 1999, "names.txt", "firstname", function (input) {
        return input.split(" ")[0];
    }));
};

mockFunctions.FULLNAME = function (callback) {
    mockFunctions.NAME(function (resName) {
        mockFunctions.FIRSTNAME(function (resFirstName) {
            callback((resFirstName + " " + resName).replace("\r", ""));
        });
    });
};

mockFunctions.COMPANY = function (callback) {
    callback(getContentFromFile(company, 198, "companies.txt", "company"));
};

mockFunctions.EMAIL = function (callback) {
    mockFunctions.NAME(function (resName) {
        mockFunctions.FIRSTNAME(function (resFirstName) {
            mockFunctions.COMPANY(function (resCompany) {
                email = resFirstName + "." + resName + "@" + resCompany.replace(/ /g, "_") + ".de";
                callback(email.toLowerCase().replace("\r", ""));
            });
        });
    });
};

mockFunctions.PHONE = function (callback) {
    callback(getContentFromFile(phone, 12000, "phonenumbers.txt", "phone"));
};

mockFunctions.STREET = function (callback) {
    callback(getContentFromFile(street, 284, "streets.txt", "street"));
};

mockFunctions.CITY = function (callback) {
    callback(getContentFromFile(city, 13380, "cities.txt", "city"));
};

mockFunctions.ZIP = function (callback) {
    callback(getContentFromFile(zip, 13380, "zips.txt", "zip"));
};

mockFunctions.LINK = function (callback) {
    mockFunctions.COMPANY(function (res) {
        callback(("http://www." + res + ".de").replace("\r", ""));
    });
};

mockFunctions.PDF = function (callback) {
    arguments[arguments.length - 1]("EIN NAME");
};

mockFunctions.REST = function (host, port, path, callback) {
    var options = {
        host: host,
        port: port,
        path: path,
        method: 'GET'
    };

    http.request(options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (data) {
            callback(JSON.parse(data))
        });
    }).end();
};

mockFunctions.MOCK = function (objectID, callback) {
    mockFunctions.REST('127.0.0.1', '3000', '/mockdatas/' + objectID + '/generate', function (res) {
        callback(res)
    })
};

mockFunctions.STRING = function (LENGTH, callback) {
    arguments[arguments.length - 1](mockLoremIpsum.string.substring(0, LENGTH ? LENGTH : 50));
};

mockFunctions.TEXT = function (LENGTH, callback) {
    arguments[arguments.length - 1](mockLoremIpsum.text.substring(0, LENGTH ? LENGTH : 512));
};

mockFunctions.FLOAT = function (MIN, MAX, callback) {
    arguments[arguments.length - 1]((Math.random() * (mockRandom.getMaximum(MAX) - mockRandom.getMinimun(MIN))) + mockRandom.getMinimun(MIN));
};

mockFunctions.INT = function (MIN, MAX, callback) {
    arguments[arguments.length - 1](Math.floor(Math.random() * (mockRandom.getMaximum(MAX) - mockRandom.getMinimun(MIN))) + mockRandom.getMinimun(MIN));
};

mockFunctions.DATE = function (MIN, MAX, callback) {
    var generatedDate = new Date();
    arguments[arguments.length - 1](generatedDate.setDate(generatedDate.getDate() + (Math.floor(Math.random() * (mockRandom.getMaximum(MAX) - mockRandom.getMinimun(MIN))) + mockRandom.getMinimun(MIN))));
};

mockFunctions.ISODATE = function (MIN, MAX, callback) {
    var generatedDate = new Date();
    generatedDate.setDate(generatedDate.getDate() + (Math.floor(Math.random() * (mockRandom.getMaximum(MAX) - mockRandom.getMinimun(MIN))) + mockRandom.getMinimun(MIN)));
    arguments[arguments.length - 1](generatedDate.toISOString());
};

mockFunctions.BOOLEAN = function () {
    arguments[arguments.length - 1](([true, false][mockRandom.getRandomIndexByMaxValue(2)]));
};

mockFunctions.RANDOM = function () {
    arguments[arguments.length - 1]((arguments[mockRandom.getRandomIndexByMaxValue(arguments.length - 1)]));
};

mockFunctions.UUID = function () {
    arguments[arguments.length - 1](uuid.v1());
};

mockFunctions.UUIDV4 = function () {
    arguments[arguments.length - 1](uuid.v4());
};

mockFunctions.reset = function (callback) {
    name = '';
    firstname = '';
    email = '';
    phone = '';
    company = '';
    street = '';
    zip = '';
    city = '';
    link = '';
    callback();
};

module.exports = mockFunctions;