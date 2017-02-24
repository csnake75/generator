from .ui_grid import UIGridGenerator

class AngularGenerator:
    def __init__(self, setting, file_writer, communicator):
        self.setting = setting
        self.communicator = communicator
        self.file_writer = file_writer

    def generate(self):
        self.communicator.debug("AngularGenerator loaded")
        if self.setting['ui']['ui_grid']:
            ui_grid = UIGridGenerator(self.setting, self.file_writer, self.communicator)
            ui_grid.generate()
