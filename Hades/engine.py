#!/usr/bin/env python

import os
import json
import signal
import subprocess

CASPER_PATH = 'casperjs'

class Alarm(Exception):
    pass


def alarm_handler(signo, frame):
    raise Alarm()

def start_scraping_engine(url, config, **kwargs):
    """
    :param url:             crawling tart url
    :param config:          css config to scrape
    :param kwargs:
        stdout:
        stderr:
    :return:
        subprocess return code
    """

    root = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'core')
    main_script_filename = root + '/main.js'

    # if timeout and not async:
    #     signal.signal(signal.SIGALRM, alarm_handler)
    #     signal.alarm(timeout)

    myargs = [CASPER_PATH, main_script_filename]
    myargs += ['--url=%s' % url]
    config = json.dumps(config)
    myargs += ['--css_config=%s' % config]

    try:
        proc = subprocess.Popen(
            myargs,
            stdout=subprocess.PIPE,
        )
        output = proc.communicate()[0]
        return output
        # return json.loads(output)
    except Alarm:
        print 'Try to kill the scrape process, pid:%s' % (proc.pid)
        os.killpg(proc.pid, signal.SIGKILL)
        return None

start_hades = start_scraping_engine


def scrape_dianping():
    url = 'http://www.dianping.com/search/category/2/45/g152'
    config = {
        "collection": {
            "property_1": {
                "css": "HTML > BODY[id='top'] > DIV[class='section Fix'] > DIV[class='content-wrap'] > DIV[class='shop-wrap'] > DIV[class='content'] > DIV[id='shop-all-list'] > UL > LI > DIV[class='txt'] > DIV[class='tit'] > A:nth-child(1) > H4",
                "re": ".*",
                "name": "name",
            },
            "property_2": {
                "css": "HTML > BODY[id='top'] > DIV[class='section Fix'] > DIV[class='content-wrap'] > DIV[class='shop-wrap'] > DIV[class='content'] > DIV[id='shop-all-list'] > UL > LI > DIV[class='txt'] > DIV[class='comment'] > A[class='review-num']",
                "re": ".*",
                "name": "comment",
            },
            "property_3": {
                "css": "HTML > BODY[id='top'] > DIV[class='section Fix'] > DIV[class='content-wrap'] > DIV[class='shop-wrap'] > DIV[class='content'] > DIV[id='shop-all-list'] > UL > LI > DIV[class='txt'] > DIV[class='comment'] > A[class='mean-price']",
                "re": ".*",
                "name": "price",
            },
            "property_4": {
                "css": "HTML > BODY[id='top'] > DIV[class='section Fix'] > DIV[class='content-wrap'] > DIV[class='shop-wrap'] > DIV[class='content'] > DIV[id='shop-all-list'] > UL > LI > DIV[class='txt'] > DIV[class='tag-addr'] > SPAN[class='addr']",
                "re": ".*",
                "name": "address",
            }
        }
    }
    return start_hades(url, config)


def scrape_jd():
    url = 'http://list.jd.com/list.html?cat=737,794,798'
    config = {
    "collection": {
        "property_1": {
            "css": "HTML > BODY > DIV[id='J_searchWrap'] > DIV[id='J_container'] > DIV[id='J_main'] > DIV[class='m-list'] > DIV[class='ml-wrap'] > DIV[id='plist'] > UL[class='gl-warp clearfix'] > LI[class='gl-item'] > DIV[class='gl-i-wrap j-sku-item'] > DIV[class='p-price'] > STRONG[class='J_price'] > I",
            "re": ".*",
            "name": "price",
        },
        "property_2": {
            "css": "HTML > BODY > DIV[id='J_searchWrap'] > DIV[id='J_container'] > DIV[id='J_main'] > DIV[class='m-list'] > DIV[class='ml-wrap'] > DIV[id='plist'] > UL[class='gl-warp clearfix'] > LI[class='gl-item'] > DIV[class='gl-i-wrap j-sku-item'] > DIV[class='p-name'] > A > EM:nth-child(1)",
            "re": ".*",
            "name": "name",
        },
        "property_3": {
            "css": "HTML > BODY > DIV[id='J_searchWrap'] > DIV[id='J_container'] > DIV[id='J_main'] > DIV[class='m-list'] > DIV[class='ml-wrap'] > DIV[id='plist'] > UL[class='gl-warp clearfix'] > LI[class='gl-item'] > DIV[class='gl-i-wrap j-sku-item'] > DIV[class='p-name'] > A > I[class='promo-words']",
            "re": ".*",
            "name": "description",
        },
        "property_4": {
            "css": "HTML > BODY > DIV[id='J_searchWrap'] > DIV[id='J_container'] > DIV[id='J_main'] > DIV[class='m-list'] > DIV[class='ml-wrap'] > DIV[id='plist'] > UL[class='gl-warp clearfix'] > LI[class='gl-item'] > DIV[class='gl-i-wrap j-sku-item'] > DIV[class='p-commit'] > STRONG > A",
            "re": ".*",
            "name": "comment",
        }
    }
}
    return start_hades(url, config)

if __name__ == '__main__':
    print '*' * 20 + 'dian ping' + '*' * 20
    print scrape_dianping()
    print '*' * 20 + 'jd' + '*' * 20
    print scrape_jd()
    
