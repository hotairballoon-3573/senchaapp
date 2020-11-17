from flask import Flask
from apps import configure_app,register_blueprints, configure_logging, configure_database
from database import db

backend = Flask(__name__)


def init_app(app):
    configure_app(app)
    register_blueprints(app)
    configure_logging(app)
    configure_database(app)
    db.init_app(app)


init_app(backend)

if __name__ == '__main__':
    backend.run()
    # backend.run(debug=True, host='127.0.0.1', port=5000)
