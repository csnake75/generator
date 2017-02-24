import glob
import logging
import logging.handlers
import datetime
import inspect

class Communicator:
    def __init__(self):
        self.LOG_FILENAME = 'log/energy.generator.log'
        self.logger = logging.getLogger('EnergyGenerator')
        self.level = logging.NOTSET
        self.logger.setLevel(self.level)

        handler = logging.handlers.RotatingFileHandler(
            self.LOG_FILENAME, maxBytes=20000, backupCount=10)

        self.logger.addHandler(handler)
        self.debug("Communicator loaded")

    def set_level(self, level):
        self.level = self.name_to_level(level)
        self.logger.setLevel(self.level)

    def log(self, level, message, curframe):
        calframe = inspect.getouterframes(curframe, 2)
        now = datetime.datetime.now()
        level_show_name = self.level_to_name(level)
        class_name = calframe[1][1].split("\\")[len(calframe[1][1].split()) - 2]
        function_name = calframe[1][3]
        log_message = str(now) + " | " + level_show_name + " | " + class_name + " | " + function_name + " | " + message
        self.logger.log(level, log_message)

    def debug(self, message):
        self.log(logging.DEBUG, message, inspect.currentframe())

    def error(self, message):
        self.log(logging.ERROR, message, inspect.currentframe())

    def critical(self, message):
        self.log(logging.CRITICAL, message, inspect.currentframe())

    def fatal(self, message):
        self.log(logging.FATAL, message, inspect.currentframe())

    def warning(self, message):
        self.log(logging.WARNING, message, inspect.currentframe())

    def info(self, message):
        self.log(logging.INFO, message, inspect.currentframe())

    def notset(self, message):
        self.log(logging.NOTSET, message, inspect.currentframe())

    def level_to_name(level):
        if level == logging.CRITICAL:
            name = "critical"
        elif level == logging.FATAL:
            name = "fatal"
        elif level == logging.ERROR:
            name = "error"
        elif level == logging.WARNING:
            name = "warning"
        elif level == logging.WARN:
            name = "warn"
        elif level == logging.INFO:
            name = "info"
        elif level == logging.DEBUG:
            name = "debug"
        else:
            name = ""

        return name.upper()

    def name_to_level(name):
        name = name.lower()

        if name == "critical":
            level = logging.CRITICAL
        elif name == "fatal":
            level = logging.FATAL
        elif name == "error":
            level = logging.ERROR
        elif name == "warning":
            level = logging.WARNING
        elif name == "warn":
            level = logging.WARN
        elif name == "info":
            level = logging.INFO
        elif name == "debug":
            level = logging.DEBUG
        else:
            level = logging.NOTSET

        return level

    name_to_level = staticmethod(name_to_level)
    level_to_name = staticmethod(level_to_name)
