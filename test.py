import requests
import json
from urllib import response
import time

url = "http://localhost:4000/payments"
payment = {"userId": 1,
           "atmId": 101,
           "batteryId": 12,
           "capacity": 20,
           "totalPrice": 1000,
           "time": str(time.ctime())}
response = requests.post(url, data=payment)
print(response.status_code)
print(response.content)
# [data]