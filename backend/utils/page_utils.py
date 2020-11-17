from urllib.parse import urlencode


class Pagination(object):
    def __init__(self, current_page, per_page_count=10):
        try:
            current_page = int(current_page)
        except Exception as e:
            current_page = 1

        if current_page <= 0:
            current_page = 1
        self.current_page = current_page

        self.per_page_count = per_page_count

    @property
    def start(self):
        return (self.current_page - 1) * self.per_page_count

    @property
    def end(self):
        return self.current_page * self.per_page_count
