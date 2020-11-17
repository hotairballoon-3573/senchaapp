from flask import Blueprint
from flask_restful import Api
from . import views


def register_views(app):
    api = Api(app)
    api.add_resource(views.UserPageList, '/QueryUserPageList', endpoint="UserPageList")
    api.add_resource(views.UserSave, '/SubmitUserSave', endpoint="UserSave")
    api.add_resource(views.UserEnable, '/SubmitUserEnable', endpoint="UserEnable")
    api.add_resource(views.UserDisable, '/SubmitUserDisable', endpoint="UserDisable")
    api.add_resource(views.UserRemove, '/DeleteUser', endpoint="UserRemove")
    api.add_resource(views.MenuChildren, '/QueryMenuChildren', endpoint="MenuChildren")


def auth_():
    auth = Blueprint('auth', __name__)
    register_views(auth)
    return auth
