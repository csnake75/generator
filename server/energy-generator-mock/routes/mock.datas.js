var express = require('express');
var mockGenerator = require('../source/mockgenerator/mock.generator');
var mockSettings = require('../source/mockgenerator/mock.settings');
var router = express.Router();

router.get('/', function (req, res, next) {
    mockSettings.findAll(function (mockSettings) {
        res.send(mockSettings);
    });
});

router.get('/:id', function (req, res, next) {
    mockSettings.find(req.params.id, function (mockSettings) {
        res.send(mockSettings);
    });
});

router.post('/', function (req, res, next) {
    mockSettings.update(req.body, function (mockSettings) {
        res.send(mockSettings);
    });
});

router.delete('/:id', function (req, res, next) {
    mockSettings.delete(req.params.id, function () {
        mockSettings.findAll(function (mockSettings) {
            res.send(mockSettings);
        });
    });
});

router.get('/:id/generate/:quantity?', function (req, res, next) {
    mockGenerator.setMockID(req.params.id, function (mockSetting) {
        mockGenerator.createResponse(mockSetting, function (generatedStatus, generatedData) {
            res.status(generatedStatus).send(mockGenerator.getGeneratedData(generatedStatus, generatedData));
        }, req.params.quantity, !req.headers['user-agent']);
    });
});

module.exports = router;
