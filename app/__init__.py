from flask import Flask
from flask_tryton import Tryton
from flask_babel import Babel

from importlib import import_module
from logging import DEBUG
from config import config_dict, Config
from decouple import config


def register_blueprints(app):
    for module_name in ('base', 'dashboard', 'appointments'):
        module = import_module('app.{}.routes'.format(module_name))
        app.register_blueprint(module.blueprint)

app = Flask(__name__, static_folder='base/static')
babel = Babel(app)

DEBUG = config('DEBUG', default=True, cast=bool)
get_config_mode = 'Debug' if DEBUG else 'Production'
app_config = config_dict[get_config_mode.capitalize()]
app.config.from_object(Config)
app.config['MAX_CONTENT_LENGTH'] = 1024 * 1024 * 3
app.config['ATTACHMENTS_BASE_PATH'] = app_config._load_attachments_path

tryton = Tryton(app, configure_jinja=True)

register_blueprints(app)

