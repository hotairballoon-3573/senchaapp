from database import db
import traceback
import datetime
from flask import current_app
from utils.utils import isNoneStr
from utils.page_utils import Pagination
from sqlalchemy import distinct
from sqlalchemy.sql.functions import func
from pypinyin import lazy_pinyin
import uuid
from passlib.apps import custom_app_context


class User(db.Model):
    __tablename__ = 'user'
    __table_args__ = ({'comment': '用户表', 'extend_existing': True})
    id = db.Column(db.String(60), primary_key=True, comment='主键')
    usercode = db.Column(db.String(60), unique=True, nullable=False, comment='编号')
    username = db.Column(db.String(100), unique=True, nullable=False, comment='用户名')
    password = db.Column(db.String(200), nullable=False, comment='密码')
    alias = db.Column(db.String(20), nullable=False, comment='姓名')
    header = db.Column(db.String(100), comment='用户头像')
    sex = db.Column(db.String(1), comment='性别 M:男 F:女')
    create_time = db.Column(db.DateTime, default=datetime.datetime.now, nullable=False, comment='创建时间')
    update_time = db.Column(db.DateTime, default=datetime.datetime.now, onupdate=datetime.datetime.now, nullable=False,
                            comment='修改时间')
    is_deleted = db.Column(db.Boolean, default=False, nullable=False, comment='已删除')

    def hash_password(self, password):
        self.password = custom_app_context.encrypt(password)

    def query_pagination(self, page, limit, username=''):
        records = []

        try:
            if not isNoneStr(username):
                total = db.session.query(func.count(distinct(User.id))).filter(User.username == username).scalar()

                pager_obj = Pagination(1, limit)
                start = pager_obj.start
                end = pager_obj.end

                all = db.session.query(
                    User.id
                    , User.usercode
                    , User.username
                    , User.alias
                    , User.header
                    , User.sex
                    , User.create_time
                    , User.update_time
                    , User.is_deleted
                ) \
                    .filter(User.username == username) \
                    .order_by(User.username.asc()).slice(start, end).all()

            else:
                total = db.session.query(func.count(distinct(User.id))).filter().scalar()

                pager_obj = Pagination(page, limit)
                start = pager_obj.start
                end = pager_obj.end

                all = db.session.query(
                    User.id
                    , User.usercode
                    , User.username
                    , User.alias
                    , User.header
                    , User.sex
                    , User.create_time
                    , User.update_time
                    , User.is_deleted
                ) \
                    .filter() \
                    .order_by(User.username.asc()).slice(start, end).all()

            for item in all:
                records.append({
                    'id': item[0]
                    , 'usercode': item[1]
                    , 'username': item[2]
                    , 'alias': item[3]
                    , 'header': item[4]
                    , 'sex': item[5]
                    , 'create_time': str(item[6])
                    , 'update_time': str(item[7])
                    , 'is_deleted': item[8]
                })

            return total, records

        except BaseException as e:
            current_app.logger.error(
                "An exception occurred while querying User information:{0}".format(traceback.format_exc()))
            raise e
        finally:
            db.session.close()

    def query_existing(self):
        try:
            existing = User.query.filter(User.usercode == self.usercode).first()

            if existing:
                return True

            return False

        except BaseException as e:
            current_app.logger.error(
                "An exception occurred while querying User information:{0}".format(traceback.format_exc()))
            raise e

    def save(self):
        try:
            self.id = str(uuid.uuid1()).replace('-', '')

            username = "".join(lazy_pinyin(self.alias))

            total = db.session.query(func.count(distinct(User.id))).filter(
                User.username.like(username + "%")).scalar()

            self.username = password = "{0}{1}".format(username, (total > 0 and str(total) or ""))

            self.hash_password(password)

            self.header = (
                    self.sex == 'M' and 'resources/images/header/male.png' or 'resources/images/header/female.png')

            self.is_deleted = False

            db.session.add(self)
            db.session.commit()

        except BaseException as e:
            db.session.rollback()
            current_app.logger.error(
                "An exception occurred while Save User information:{0}".format(traceback.format_exc()))
            raise e
        finally:
            db.session.close()

    def enable(self):
        try:
            existing = User.query.filter(User.id == self.id).first()
            if existing:
                existing.is_deleted = False
                db.session.commit()
        except BaseException as e:
            db.session.rollback()
            current_app.logger.error(
                "An exception occurred while Enable User information:{0}".format(traceback.format_exc()))
            raise e
        finally:
            db.session.close()

    def disable(self):
        try:
            existing = User.query.filter(User.id == self.id).first()
            if existing:
                existing.is_deleted = True
                db.session.commit()
        except BaseException as e:
            db.session.rollback()
            current_app.logger.error(
                "An exception occurred while Disable User information:{0}".format(traceback.format_exc()))
            raise e
        finally:
            db.session.close()

    def remove(self):
        try:
            existing = User.query.filter(User.id == self.id).first()
            if existing:
                db.session.delete(existing)
                db.session.commit()

        except BaseException as e:
            db.session.rollback()
            current_app.logger.error(
                "An exception occurred while Delete User information:{0}".format(traceback.format_exc()))
            raise e
        finally:
            db.session.close()


class Menu(db.Model):
    __tablename__ = 'menu'
    __table_args__ = ({'comment': '功能菜单', 'extend_existing': True})

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    text = db.Column(db.String(15))
    iconCls = db.Column(db.String(60))
    rowCls = db.Column(db.String(60))
    expanded = db.Column(db.Boolean)
    selectable = db.Column(db.Boolean)
    viewType = db.Column(db.String(60))
    routeId = db.Column(db.String(60))
    leaf = db.Column(db.Boolean)
    pid = db.Column(db.Integer)
    order_no = db.Column(db.Integer)

    def query_children(self):
        children = []

        try:
            all = Menu.query.filter(Menu.pid == self.id).order_by(Menu.order_no.asc()).all()

            for node in all:
                children.append(node.to_dict())

            return children

        except BaseException as e:
            current_app.logger.error(
                "An exception occurred while querying Menu information:{0}".format(traceback.format_exc()))
            raise e

    def to_dict(self):
        fields = []
        for field in self.__dict__.keys():
            fields.append(field)

        dict_result = {}
        for attr in fields:
            if attr in (
                    'id', 'text', 'iconCls', 'rowCls', 'expanded', 'selectable', 'viewType', 'routeId', 'leaf', 'pid',
                    'order_no'):
                dict_result[attr] = getattr(self, attr)
            else:
                pass

        return dict_result
