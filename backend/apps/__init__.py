from settings.dev import DEBUG, log_config, db_configs, SECRET_KEY
import logging
from logging.handlers import TimedRotatingFileHandler
from flask_cors import CORS
from apps.auth.urls import auth_



def configure_app(app):
    app.debug = DEBUG
    app.config['SECRET_KEY'] = SECRET_KEY
    CORS(app)


# 注册蓝图
def register_blueprints(app):
    app.register_blueprint(auth_(), url_prefix='/api/auth')


# 设置日志
def configure_logging(app):
    formatter = logging.Formatter(log_config.get("LOGGING_FORMATTER"))
    handler = TimedRotatingFileHandler(
        log_config.get("HANDLER_FILE")
        , when=log_config.get("HANDLER_WHEN")
        , interval=log_config.get("HANDLER_INTERVAL")
        , backupCount=log_config.get("HANDLER_BACKUPCOUNT")
        , encoding=log_config.get("HANDLER_ENCODING")
        , delay=log_config.get("HANDLER_DELAY")
        , utc=log_config.get("HANDLER_UTC")
    )
    app.logger.addHandler(handler)
    handler.setFormatter(formatter)
    handler.setLevel(logging.INFO)


# 初始化数据库连接
def configure_database(app):
    app.config['SQLALCHEMY_DATABASE_URI'] = db_configs.get("SQLALCHEMY_DATABASE_URI")
    app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = db_configs.get("SQLALCHEMY_COMMIT_ON_TEARDOWN")
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = db_configs.get("SQLALCHEMY_TRACK_MODIFICATIONS")
    app.config['SQLALCHEMY_POOL_SIZE'] = db_configs.get("SQLALCHEMY_POOL_SIZE")
    app.config['SQLALCHEMY_POOL_RECYCLE'] = db_configs.get("SQLALCHEMY_POOL_RECYCLE")
