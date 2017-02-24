from pymongo import MongoClient
from bson.objectid import ObjectId


class DBHelper:
    def __init__(self, _id, communicator):
        self.communicator = communicator
        self.communicator.debug("DBHelper loaded")
        self._id = _id

    def get_setting(self):
        client = MongoClient('mongodb://localhost:27017/')
        db = client.admin.codeSettings
        settings = db.find_one({"_id": ObjectId(self._id)})
        return settings

    get_setting = staticmethod(get_setting)
