from generators.code import JavaScriptGenerator
from generators.code import JavaGenerator
from file_writer import FileWriter


class CodeGenerator:
    def __init__(self, setting, communicator):
        self.communicator = communicator
        self.communicator.debug("CodeGenerator loaded")
        self.communicator.debug("Object:" + str(setting))
        self.setting = setting
        self.file_writer = FileWriter(setting, communicator)

    def generate(self):
        js_generator = JavaScriptGenerator(self.setting, self.file_writer, self.communicator)
        java_generator = JavaGenerator(self.setting, self.file_writer, self.communicator)
        js_generator.generate()
        java_generator.generate()
        self.file_writer.create_zip()

    generate = staticmethod(generate)
