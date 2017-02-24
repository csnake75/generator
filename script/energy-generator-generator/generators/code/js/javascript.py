from .angular import AngularGenerator


class JavaScriptGenerator:
    def __init__(self, code_setting, file_writer, communicator):
        self.communicator = communicator
        self.code_setting = code_setting
        self.file_writer = file_writer

    def generate(self):
        self.communicator.debug("JavaScriptGenerator loaded")
        if self.code_setting['ui']['angular']:
            ng = AngularGenerator(self.code_setting, self.file_writer, self.communicator)
            ng.generate()
