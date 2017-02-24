class UIGridGenerator:
    def __init__(self, setting, file_write, communicator):
        self.setting = setting
        self.communicator = communicator
        self.file_writer = file_write

    def generate(self):
        self.communicator.debug("UIGridGenerator loaded")
        self.file_writer.write_file("js/angular/public/html/", "grid.html", "<div class='test'>UI GRID</div>")