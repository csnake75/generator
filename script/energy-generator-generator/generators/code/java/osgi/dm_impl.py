class DmImplGenerator:
    def __init__(self, setting, communicator):
        self.setting = setting
        self.communicator = communicator

    def xrun(self):
        self.communicator.debug("DmImplGenerator loaded")
