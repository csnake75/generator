from .dm_impl import DmImplGenerator


class OSGIGenerator:
    def __init__(self, code_setting, file_writer, communicator):
        self.code_setting = code_setting
        self.communicator = communicator
        self.file_writer = file_writer

    def xrun(self):
        self.communicator.debug("OSGIGenerator loaded")
        if self.code_setting['backend']['osgi']["dm_impl"]:
            dm_impl = DmImplGenerator(self.code_setting, self.communicator)
            dm_impl.xrun()