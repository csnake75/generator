import os
import zipfile


class FileWriter:
    def __init__(self, setting, communicator):
        self.communicator = communicator
        self.communicator.debug("FileWriter loaded")
        self.setting = setting
        self.zip_dir = "target/zip/"
        self.target_dir = "target/code/" + str(self.setting["name"]) + "/" + str(self.setting["version"]) + "/"

    def write_file(self, path, file_name, content):
        directory = self.target_dir + path

        if not os.path.exists(directory):
            os.makedirs(directory)

        f = open(directory + "/" + str(file_name), 'w')
        f.write(content)
        f.close()

    def create_zip(self):
        if not os.path.exists(self.zip_dir):
            os.makedirs(self.zip_dir)

        zip_file_name = str(self.zip_dir + self.setting["name"]) + "_" + str(self.setting["version"]) + ".zip"
        foo = zipfile.ZipFile(zip_file_name, 'w')

        for root, dirs, files in os.walk(self.target_dir):
            for f in files:
                foo.write(os.path.join(root, f))
        foo.close()
