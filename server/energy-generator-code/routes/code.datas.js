var express = require('express');
var codeGenerator = require('../source/codegenerator/code.generator');
var codeSettings = require('../source/codegenerator/code.settings.js');
var router = express.Router();

router.get('/', function (req, res, next) {
    codeSettings.findAll(function (codeSettings) {
        res.send(codeSettings);
    });
});

router.get('/:id', function (req, res, next) {
    codeSettings.find(req.params.id, function (codeSettings) {
        res.send(codeSettings);
    });
});

router.post('/', function (req, res, next) {
    codeSettings.update(req.body, function (codeSettings) {
        res.send(codeSettings);
    });
});

router.delete('/:id', function (req, res, next) {
    codeSettings.delete(req.params.id, function () {
        codeSettings.findAll(function (codeSettings) {
            res.send(codeSettings);
        });
    });
});

router.get('/:id/generate/:quantity?', function (req, res, next) {
    codeGenerator.setcodeID(req.params.id, function (codeSetting) {
        codeGenerator.createResponse(codeSetting, function (generatedStatus, generatedData) {
            res.status(generatedStatus).send(codeGenerator.getGeneratedData(generatedStatus, generatedData));
        }, req.params.quantity, !req.headers['user-agent']);
    });
});

module.exports = router;
