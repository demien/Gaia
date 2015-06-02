# from . import engine


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
    return engine.start_hades(url, config)


if __name__ == '__main__':
    import pdb; pdb.set_trace()
    print 123
    # print scrape_dianping()