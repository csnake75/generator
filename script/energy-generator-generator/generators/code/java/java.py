from .osgi import OSGIGenerator


class JavaGenerator:
    def __init__(self, code_setting, file_writer, communicator):
        self.communicator = communicator
        self.code_setting = code_setting
        self.file_writer = file_writer

    def generate(self):
        self.communicator.debug("JavaGenerator loaded")
        if self.code_setting['backend']['osgi']:
            osgi = OSGIGenerator(self.code_setting, self.file_writer, self.communicator)
            osgi.xrun()