#!/usr/bin/env python

import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "settings")
import json
import signal
import subprocess
from services.mongo_service import APIService


CASPER_PATH = 'casperjs'


def start_scraping_engine(page, **kwargs):
    root = os.path.dirname(os.path.abspath(__file__))
    main_script_filename = root + '/baiquandai.js'

    myargs = [CASPER_PATH, main_script_filename]
    myargs += ['--page=%s' % page]

    try:
        proc = subprocess.Popen(
            myargs,
            stdout=subprocess.PIPE,
        )
        output = proc.communicate()[0]
        return output
    except Alarm:
        print 'Try to kill the scrape process, pid:%s' % (proc.pid)
        os.killpg(proc.pid, signal.SIGKILL)
        return None

start_hades = start_scraping_engine

def products():
    api_service = APIService()
    api_id = 'baiquandai'
    url = 'http://www.baiquandai.com/financePerPage.do'
    version = 1
    for i in range(1, 6):
        api_service.add_scrape_data(api_id, url, version, start_hades(i))
        

if __name__ == '__main__':
    products()
