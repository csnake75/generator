from code_generator import CodeGenerator
from communicator import Communicator
from file_writer import FileWriter
from db_helper import DBHelper
import sys
import argparse

communicator = Communicator()

parser = argparse.ArgumentParser(description='Process some integers.')
parser.add_argument('--id', dest='code_setting_id', help='Code Setting ID')
parser.add_argument('--log', dest='log', help='Sets Log Level')
args = parser.parse_args()


def run_generator(code_setting_id):
    generator = CodeGenerator(get_setting_from_db(code_setting_id), communicator)
    generator.generate(generator)


def get_setting_from_db(code_setting_id):
    db_helper = DBHelper(code_setting_id, communicator)
    code_setting = db_helper.get_setting(db_helper)
    return code_setting


if args.code_setting_id:
    communicator.set_level(args.log)
    communicator.debug("Start compiling for Code-Setting-ID - " + sys.argv[1])
    run_generator(args.code_setting_id)
else:
    communicator.debug("Missing Code-Setting-ID")


