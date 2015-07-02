import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "settings")
from services.mongo_service import APIService
from hades.engine import start_hades

def scrape_p2p(version=1):
    api_service = APIService()
    api_id = 'wanglibao'
    config = {
        "collection": {
            "property_1": {
                "css": "HTML > BODY[class='white-background'] > DIV[class='container'] > DIV[class='row'] > DIV[class='span8'] > DIV[class='panel-p2p-product'] > DIV[class='shadow-inner'] > DIV[class='panel-title-bar'] > a",
                "re": ".*",
                "name": "name",
            },
            "property_2": {
                "css": "HTML > BODY[class='white-background'] > DIV[class='container'] > DIV[class='row'] > DIV[class='span8'] > DIV[class='panel-p2p-product'] > DIV[class='shadow-inner'] > DIV[class='panel-content'] > DIV[class='row'] > DIV:nth-child(1) > P > EM",
                "re": ".*",
                "name": "total",
            },
            "property_3": {
                "css": "HTML > BODY[class='white-background'] > DIV[class='container'] > DIV[class='row'] > DIV[class='span8'] > DIV[class='panel-p2p-product'] > DIV[class='shadow-inner'] > DIV[class='panel-content'] > DIV[class='row'] > DIV:nth-child(2) > P > EM",
                "re": ".*",
                "name": "month",
            },
            "property_4": {
                "css": "HTML > BODY[class='white-background'] > DIV[class='container'] > DIV[class='row'] > DIV[class='span8'] > DIV[class='panel-p2p-product'] > DIV[class='shadow-inner'] > DIV[class='panel-content'] > DIV[class='row'] > DIV:nth-child(3) > P > EM:nth-child(1)",
                "re": ".*",
                "name": "profit",
            },
            "property_5": {
                "css": "HTML > BODY[class='white-background'] > DIV[class='container'] > DIV[class='row'] > DIV[class='span8'] > DIV[class='panel-p2p-product'] > DIV[class='shadow-inner'] > DIV[class='panel-content'] > DIV[class='row'] > DIV:nth-child(4) > P > EM",
                "re": ".*",
                "name": "avaiable",
            },
            "property_6": {
                "css": "HTML > BODY[class='white-background'] > DIV[class='container'] > DIV[class='row'] > DIV[class='span8'] > DIV[class='panel-p2p-product'] > DIV[class='shadow-inner'] > DIV[class='panel-p2p--footer'] > DIV[class='row'] > DIV[class='span4'] > SPAN[class='highlight']",
                "re": ".*",
                "name": "process",
            },
            "property_7": {
                "css": "HTML > BODY[class='white-background'] > DIV[class='container'] > DIV[class='row'] > DIV[class='span8'] > DIV[class='panel-p2p-product'] > DIV[class='shadow-inner'] > DIV[class='panel-content'] > DIV[class='row'] > DIV:nth-child(5) > P:nth-child(2)",
                "re": ".*",
                "name": "time_left",
            }
        }
    }
    urls = ['https://www.wanglibao.com/p2p/list/?page=%s' % str(i) for i in range(1, 131)]
    for url in urls:
        print url
        api_service.add_scrape_data(api_id, url, version, start_hades(url, config))


if __name__ == '__main__':
    scrape_p2p()

