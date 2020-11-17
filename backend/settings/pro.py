from settings.common import *

DEBUG = False

# Flask秘钥 可由os.urandom(24)生成随机数
# SECRET_KEY = b'\xca\x0c\x86\x04\x98@\x02b\x1b7\x8c\x88]\x1b\xd7"+\xe6px@\xc3#\\'
SECRET_KEY = ''

# 日志文件路径
LOG_PATH = ''

log_config = {
    # 日志格式
    "LOGGING_FORMATTER": "[%(asctime)s][%(filename)s:%(lineno)d][%(levelname)s][%(thread)d] - %(message)s"
    , "HANDLER_FILE": "{0}".format(LOG_PATH)
    , "HANDLER_WHEN": "D"
    , "HANDLER_INTERVAL": 1
    , "HANDLER_BACKUPCOUNT": 15
    , "HANDLER_ENCODING": "UTF-8"
    , "HANDLER_DELAY": False
    , "HANDLER_UTC": True
}

# 数据库配置
DATABASES = {
    'NAME': '',
    'USER': '',
    'PASSWORD': '',
    'HOST': '',
    'PORT': '',
}

db_configs = {
    'SQLALCHEMY_DATABASE_URI': 'mysql+pymysql://{0}:{1}@{2}:{3}/{4}?charset=utf8'.format(
        DATABASES.get("USER"),
        DATABASES.get("PASSWORD"),
        DATABASES.get("HOST"),
        DATABASES.get("PORT"),
        DATABASES.get("NAME")
    )
    # 设置是否在每次连接结束后自动提交数据库中的变动。
    , 'SQLALCHEMY_COMMIT_ON_TEARDOWN': True

    # 如果设置成 True (默认情况)，Flask-SQLAlchemy 将会追踪对象的修改并且发送信号。这需要额外的内存，如果不必要的可以禁用它。
    , 'SQLALCHEMY_TRACK_MODIFICATIONS': False

    , 'SQLALCHEMY_POOL_SIZE': 100
    , 'SQLALCHEMY_POOL_RECYCLE': 120
}
