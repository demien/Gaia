import hashlib
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
        return HttpResponse(code)
