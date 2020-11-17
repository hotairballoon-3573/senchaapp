from flask_restful import Resource, reqparse
from . import models
from flask import current_app
import traceback
from utils.utils import isNoneStr


class UserPageList(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('page', type=int)
        self.parser.add_argument('limit', type=int)
        self.parser.add_argument('username', type=str)

    def get(self):
        try:
            args = self.parser.parse_args()

            page = args.get('page')
            if not page:
                return {"code": "1", "msg": "ERROR", "data": {"exception": "The parameter page cannot be null !"}}

            limit = args.get('limit')
            if not limit:
                return {"code": "1", "msg": "ERROR", "data": {"exception": "The parameter limit cannot be null !"}}

            username = args.get('username')

            user = models.User()
            total, records = user.query_pagination(page, limit, username)

            return {"code": "0", "msg": "SUCCESS", "data": {"total": total, "records": records}}
        except BaseException as e:
            current_app.logger.error(
                "An exception occurred on the interface {0}:{1}".format(self.__class__.__name__,
                                                                        traceback.format_exc()))
            return {"code": "1", "msg": "ERROR", "data": {"exception": str(e)}}


class UserSave(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('usercode', type=str)
        self.parser.add_argument('alias', type=str)
        self.parser.add_argument('sex', type=str)

    def post(self):
        try:
            args = self.parser.parse_args()

            usercode = args.get('usercode')
            if isNoneStr(usercode):
                return {"code": "1", "msg": "ERROR", "data": {"exception": "用户编号缺失 !"}}

            user = models.User(usercode=usercode)
            existing = user.query_existing()

            if existing:
                return {"code": "1", "msg": "ERROR", "data": {"exception": "用户编号已被使用 !"}}

            alias = args.get('alias')
            if isNoneStr(alias):
                return {"code": "1", "msg": "ERROR", "data": {"exception": "用户姓名缺失!!!"}}

            sex = args.get('sex')
            if isNoneStr(sex):
                return {"code": "1", "msg": "ERROR", "data": {"exception": "用户性别缺失!!!"}}

            if sex not in ('M', 'F'):
                return {"code": "1", "msg": "ERROR", "data": {"exception": "性别编码不合法!!!"}}

            user.alias = alias
            user.sex = sex

            user.save()

            return {"code": "0", "msg": "SUCCESS", "data": {"exception": None}}

        except BaseException as e:
            current_app.logger.error(
                "An exception occurred on the interface {0}:{1}".format(self.__class__.__name__,
                                                                        traceback.format_exc()))
            return {"code": "1", "msg": "ERROR", "data": {"exception": str(e)}}


class UserEnable(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('id', type=str)

    def post(self):
        try:
            args = self.parser.parse_args()

            id = args.get('id')
            if isNoneStr(id):
                return {"code": "1", "msg": "ERROR", "data": {"exception": "用户唯一标识缺失 !"}}

            user = models.User(id=id)
            user.enable()

            return {"code": "0", "msg": "SUCCESS", "data": {"exception": None}}

        except BaseException as e:
            current_app.logger.error(
                "An exception occurred on the interface {0}:{1}".format(self.__class__.__name__,
                                                                        traceback.format_exc()))
            return {"code": "1", "msg": "ERROR", "data": {"exception": str(e)}}


class UserDisable(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('id', type=str)

    def post(self):
        try:
            args = self.parser.parse_args()

            id = args.get('id')
            if isNoneStr(id):
                return {"code": "1", "msg": "ERROR", "data": {"exception": "用户唯一标识缺失 !"}}

            user = models.User(id=id)
            user.disable()

            return {"code": "0", "msg": "SUCCESS", "data": {"exception": None}}

        except BaseException as e:
            current_app.logger.error(
                "An exception occurred on the interface {0}:{1}".format(self.__class__.__name__,
                                                                        traceback.format_exc()))
            return {"code": "1", "msg": "ERROR", "data": {"exception": str(e)}}


class UserRemove(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('id', type=str)

    def delete(self):
        try:
            args = self.parser.parse_args()

            id = args.get('id')
            if isNoneStr(id):
                return {"code": "1", "msg": "ERROR", "data": {"exception": "用户唯一标识缺失 !"}}

            user = models.User(id=id)
            user.remove()

            return {"code": "0", "msg": "SUCCESS", "data": {"exception": None}}

        except BaseException as e:
            current_app.logger.error(
                "An exception occurred on the interface {0}:{1}".format(self.__class__.__name__,
                                                                        traceback.format_exc()))
            return {"code": "1", "msg": "ERROR", "data": {"exception": str(e)}}


class MenuChildren(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('node', type=int)

    def get(self):
        try:
            args = self.parser.parse_args()
            id = args.get('node')

            if id is None:
                return {"code": "0", "msg": "SUCCESS", "data": {"children": None}}

            menu = models.Menu(id=id)
            children = menu.query_children()

            return {"code": "0", "msg": "SUCCESS", "data": {"children": children}}

        except BaseException as e:
            current_app.logger.error(
                "An exception occurred on the interface {0}:{1}".format(self.__class__.__name__,
                                                                        traceback.format_exc()))
            return {"code": "1", "msg": "ERROR", "data": {"exception": str(e)}}
