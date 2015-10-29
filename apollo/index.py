import hashlib
import urllib2
import json
from django import http
from django.http import HttpResponse
from django.views.generic import View



class VerifyWechatCBV(View):

    def get(self, request, *args, **kwargs):
        signature = request.GET["signature"]
        timestamp = request.GET["timestamp"]
        nonce = request.GET["nonce"]
        if self.checkSignature(signature, timestamp, nonce):
            return HttpResponse(request.GET["echostr"])
        return HttpResponse('')

    def checkSignature(self, signature, timestamp, nonce):
        token = 'b1acky'
        tmp_array = sorted([token, timestamp, nonce])
        tmp_str = ''.join(tmp_array)
        if signature == self.sha1(signature):
            return True
        else:
            return False


    def sha1(self, content):
        sha1 = hashlib.sha1()
        sha1.update(content)
        return sha1.hexdigest()


class HelloworldCBV(View):

    def get(self, request, *args, **kwargs):
        return HttpResponse('hello world!')


class EchoCallbackCBV(View):

    def get(self, request, *args, **kwargs):
        code = request.GET.get('code', 'no code')
        data = send_request('https://api.weixin.qq.com/sns/oauth2/access_token?appid=wxf9336f499e0715f8&secret=75ffcd0518934dcd6200dad6e7bb78cf&code=%s&grant_type=authorization_code' % code)
        return HttpResponse(json.dumps(data))


def send_request(url):
    data = urllib2.urlopen(url)
    json_data = json.load(data)
    return json_data
