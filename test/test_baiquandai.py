import time
from hades.engine import start_hades


def scrape():
    url = 'http://www.baiquandai.com/financePerPage.do?shoveDate' + str(int(time.time() * 1000))
    config = {
        "collection": {
            "property_1": {
                "css": ".invest-case-4 .invest-case-title",
                "re": ".*",
                "name": "title",
            },
            "property_2": {
                "css": ".invest-case-4",
                "re": ".*",
                "name": "unit",
            },
        },
    }
    return start_hades(url, config)


if __name__ == '__main__':
    print scrape()
