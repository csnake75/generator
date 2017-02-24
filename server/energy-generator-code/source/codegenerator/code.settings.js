var mongo = require('mongodb');
var mongoClient = mongo.MongoClient;
var codeSettings = {};
var mongoURL = 'mongodb://localhost:27017/';

function find(id, callback) {
    mongoClient.connect(mongoURL, function (err, db) {
        if (err) {
            console.error('Unable to connect to the mongoDB server. Error: \r\n' + err);
        } else {
            var collection = db.collection('codeSettings');
            collection.findOne({_id: mongo.ObjectID(id)}, function (err, document) {
                callback(document);
                db.close();
            });
        }
    });
}

function findAll(callback) {
    mongoClient.connect(mongoURL, function (err, db) {
        if (err) {
            console.error('Unable to connect to the mongoDB server. Error: \r\n' + err);
        } else {
            var collection = db.collection('codeSettings');
            collection.find().toArray(function (err, res) {
                callback(res)
            })
        }
    });
}

function insert(obj, callback) {
    mongoClient.connect(mongoURL, function (err, db) {
        if (err) {
            console.error('Unable to connect to the mongoDB server. Error: \r\n' + err);
        } else {
            var collection = db.collection('codeSettings');
            collection.insert(obj, function (err, document) {
                callback(document);
            });
        }
    });
}

function update(obj, callback) {
    if (obj._id != "-1") {
        obj._id = mongo.ObjectID(obj._id)
    } else {
        obj._id = new mongo.ObjectID()
    }

    mongoClient.connect(mongoURL, function (err, db) {
        if (err) {
            console.error('Unable to connect to the mongoDB server. Error: \r\n' + err);
        } else {
            var collection = db.collection('codeSettings');
            collection.save(obj, function (err, document) {
                find(obj._id, function (res) {
                    callback(res);
                })
            });
        }
    });
}

function deleteObj(id, callback) {
    mongoClient.connect(mongoURL, function (err, db) {
        if (err) {
            console.error('Unable to connect to the mongoDB server. Error: \r\n' + err);
        } else {
            var collection = db.collection('codeSettings');
            collection.deleteOne({_id: mongo.ObjectID(id)}, function (err, document) {
                callback();
                db.close();
            });
        }
    });
}

codeSettings.find = function (id, callback) {
    find(id, callback)
};

codeSettings.findAll = function (callback) {
    findAll(callback)
};

codeSettings.update = function (obj, callback) {
    update(obj, callback)
};

codeSettings.insert = function (obj, callback) {
    insert(obj, callback)
};

codeSettings.delete = function (obj, callback) {
    deleteObj(obj, callback)
};

codeSettings.template = {};
codeSettings.successProcentage = 25;
codeSettings.timeoutProcentage = 25;
codeSettings.quantity = 10;
codeSettings.name = 'Unknown';
codeSettings.user = 'Unknown';
codeSettings.project = 'Unknown';

module.exports = codeSettings;