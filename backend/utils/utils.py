def requestGetParam(request, key, default=None):
    param = request.args.get(key, default)
    return param


def requestPostParam(request, key, default=None):
    return request.form.get(key, default)


def requestParam(request, key, default=None):
    return request.args.get(key, default) if key in request.args else request.form.get(key, default)


def isNoneStr(string):
    if string is None:
        return True
    else:
        length = len(string.strip())
        if length == 0:
            return True
        else:
            return False
