import os
import configparser
from decouple import config



class Config(object):
    basedir = os.path.abspath(os.path.dirname(__file__))

    # Set up the App SECRET_KEY
    random_SECRET_KEY = os.urandom(32)
    SECRET_KEY = os.environ.get('SECRET_KEY') or random_SECRET_KEY

    # Tryton config
    TRYTON_DATABASE = os.environ.get('health42', 'health42')
    TRYTON_CONFIG = os.path.join(basedir, 'trytond.conf')  # Ruta completa
    TRYTON_USER = 1

    def __init__(self):
        """Inicializamos la ruta de adjuntos al crear la instancia"""
        self._attachments_path = self._load_attachments_path()

    def _load_attachments_path(self):
        """Carga y valida la ruta de adjuntos"""
        try:
            tryton_config =configparser.ConfigParser()
            tryton_config.readfp(open('trytond.conf'))
            path = tryton_config.get('database', 'path')

            if not path:
                raise ValueError("Configuración 'database.path' no encontrada en trytond.conf")

            path = os.path.abspath(os.path.expanduser(path))
            os.makedirs(path, exist_ok=True)
            return path
        except Exception as e:
            print(f"ERROR CRÍTICO: No se pudo cargar la ruta de adjuntos: {str(e)}")
            raise

    @property
    def TRYTON_ATTACHMENTS_PATH(self):
        """Propiedad para mantener compatibilidad"""
        return self._attachments_path

class ProductionConfig(Config):
    DEBUG = False

    # Security
    SESSION_COOKIE_HTTPONLY  = True
    REMEMBER_COOKIE_HTTPONLY = True
    REMEMBER_COOKIE_DURATION = 3600

    # PostgreSQL database
    SQLALCHEMY_DATABASE_URI = '{}://{}:{}@{}:{}/{}'.format(
        config( 'DB_ENGINE'   , default='postgresql'    ),
        config( 'DB_USERNAME' , default='appseed'       ),
        config( 'DB_PASS'     , default='pass'          ),
        config( 'DB_HOST'     , default='localhost'     ),
        config( 'DB_PORT'     , default=5432            ),
        config( 'DB_NAME'     , default='appseed-flask' )
    )

class DebugConfig(Config):
    DEBUG = True

# Load all possible configurations
config_dict = {
    'Production': ProductionConfig,
    'Debug'     : DebugConfig
}
