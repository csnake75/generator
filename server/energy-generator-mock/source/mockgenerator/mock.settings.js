var mongo = require('mongodb');
var mongoClient = mongo.MongoClient;
var mockSettings = {};
var mongoURL = 'mongodb://localhost:27017/';

function find(id, callback) {
    mongoClient.connect(mongoURL, function (err, db) {
        if (err) {
            console.error('Unable to connect to the mongoDB server. Error: \r\n' + err);
        } else {
            var collection = db.collection('mockSettings');
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
            var collection = db.collection('mockSettings');
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
            var collection = db.collection('mockSettings');
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
            var collection = db.collection('mockSettings');
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
            var collection = db.collection('mockSettings');
            collection.deleteOne({_id: mongo.ObjectID(id)}, function (err, document) {
                callback();
                db.close();
            });
        }
    });
}

mockSettings.find = function (id, callback) {
    find(id, callback)
};

mockSettings.findAll = function (callback) {
    findAll(callback)
};

mockSettings.update = function (obj, callback) {
    update(obj, callback)
};

mockSettings.insert = function (obj, callback) {
    insert(obj, callback)
};

mockSettings.delete = function (obj, callback) {
    deleteObj(obj, callback)
};

mockSettings.template = {};
mockSettings.successProcentage = 25;
mockSettings.timeoutProcentage = 25;
mockSettings.quantity = 10;
mockSettings.name = 'Unknown';
mockSettings.user = 'Unknown';
mockSettings.project = 'Unknown';

module.exports = mockSettings;