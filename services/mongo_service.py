import datetime
import itertools
import json
from collections import defaultdict
from django.conf import settings
from pymongo import MongoClient
from services.constants import COLLECTIONS, DEFAULT_PROJECTION


class MongoService(object):

    def __init__(self, db_name='default'):
        self.db_name = db_name

    def write(self, collection, post_data):
        conn = Connection()
        context = CommitContext(conn)
        collection = conn.get_collection(self.db_name, collection)
        bulk = context.get_bulk_op(collection)
        bulk.op.insert(post_data)
        bulk.count += 1
        context.commit()

    def query(self, colelction, criteria, projection=DEFAULT_PROJECTION):
        conn = Connection()
        collection = conn.get_collection(self.db_name, colelction)
        return collection.find(criteria, projection)


class CommitContext(object):
    '''
    The context to commit to. Maintains the bulk ops and will be able
    '''
    class OpResult(object):
        '''
        The operation result
        '''
        def __init__(self, bulk_op):
            self.op = bulk_op
            self.count = 0

    def __init__(self, conn, write_concern=None):
        '''
        :param webanalytics.mongodb.connection.Connection conn: The mongo connection
        '''
        self.conn = conn
        self.bulk_ops = {}
        self.write_concern = write_concern

    def get_bulk_op(self, collection, order=0, create=True):
        '''
        Get the bulk operation, make one if necessary
        :param pymongo.collection.Collection collection: The collection to get the bulk op for
        :param int order: The order of execution
        :param bool create: Whether to create the operation, or return it
        '''
        result = self.bulk_ops.get((collection.name, order), None)
        if not result and create:
            return self.create_bulk_op(collection, order)
        return result

    def create_bulk_op(self, collection, order):
        '''
        Get the bulk operation, make one if necessary
        :param pymongo.collection.Collection collection: The collection to get the bulk op for
        :param int order: The order of execution
        '''
        op = collection.initialize_unordered_bulk_op()
        result = self.OpResult(op)
        self.bulk_ops[(collection.name, order)] = result
        return result

    def commit(self):
        '''
        Commit the results and check the amount of stored documents
        '''
        for _, op_result in sorted(self.bulk_ops.items()):
            if op_result.count == 0:
                continue
            result = op_result.op.execute(self.write_concern)
            if op_result.count != -1 and \
                    op_result.count != result['nUpserted'] + result['nMatched'] + result['nInserted']:
                raise StorageError('Expected ' + str(op_result.count) + ' operations, but performed ' +
                                   str(result['nUpserted'] + result['nMatched']))


class Connection(object):

    def __init__(self, *args, **kwargs):
        self.conn = None
        self.conn = self.get_conn()

    def __del__(self):
        self.conn.close()

    def _get_mongodb_uri(self, key='gaia'):
        uri = 'mongodb://'
        host = settings.STORAGE_MONGODB[key]['HOST']
        port = settings.STORAGE_MONGODB[key]['PORT']
        uri += host + ':' + str(port)
        return uri

    def _establish_new_conn(self):
        kwargs = {
            'host': self._get_mongodb_uri(),
        }
        return MongoClient(**kwargs)

    def get_conn(self):
        if self.conn is None:
            self.conn = self._establish_new_conn()
        return self.conn

    def get_db(self, db_name):
        return getattr(self.conn, db_name)

    def get_collection(self, db_name, collection_name):
        db = self.get_db(db_name)
        collection = db[collection_name]
        return collection


class APIService(MongoService):

    def add_api_urls(self, api_id, urls):
        post_data = {
            'api_id': api_id,
            'urls': urls
        }
        self.write(COLLECTIONS.URLS, post_data)

    def add_scrape_data(self, api_id, crawling_url, version, scrape_data):
        post_data = {
            'api_id': api_id,
            'crawling_url': crawling_url,
            'version': version,
            'scrape_data': scrape_data,
        }
        self.write(COLLECTIONS.SCRAPE_DATA, post_data)

    def get_scrape_data(self, api_id, version):
        criteria = {
            'api_id': api_id,
            'version': version
        }
        cur = self.query(COLLECTIONS.SCRAPE_DATA, criteria)
        result = defaultdict(list)
        for item in cur:
            for key, values in json.loads(item.get('scrape_data', {})).iteritems():
                result[key] += values
        return result

    def get_urls_by_api_id(self, api_ids):
        criteria = {
            'api_id': {
                '$in': api_ids
            }
        }
        cur = self.query(COLLECTIONS.URLS, criteria)
        result = defaultdict(list)
        for item in cur:
            result[item['api_id']].extend(item['urls'])
        return result


def test_scrape_data(write=False):
    service = APIService()
    api_id = 'gaia'
    version = 2
    crawling_url = 'http://www.dianping.com'
    data1 = {
        'staff': [{
                'name': 'demien',
                'age': 30,
                'position': 'engineer',
            },{
                'name': 'ck',
                'age': 26,
                'position': 'engineer',
            }
        ]
    }
    data2 = {
        'staff': [{
                'name': 'chris',
                'age': 31,
                'position': 'engineer',
            }
        ]
    }
    if write:
        service.add_scrape_data(api_id, crawling_url, version, data1)
        service.add_scrape_data(api_id, crawling_url, version, data2)
    result = service.get_scrape_data(api_id, version)
    print repr(result).decode('unicode-escape')
