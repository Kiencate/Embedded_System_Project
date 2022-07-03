import os
from urllib import response
import requests
import time

class ATM_Pins():
    rfid = None
    check_card = None
    usr_info = None
    url = "http://10.133.161.237:4000/"

    def Read_RFID(self):
        dev = os.open("/dev/rfid_rc522_dev", os.O_RDONLY)
        while (self.rfid == b'' or self.rfid == None):
            self.rfid = os.read(dev, 4)
        os.close(dev)
        try:
            print(int(self.rfid[0]))
            self.check_card = True
        except:
            print("deo on")
            self.check_card = False
        
    def Display_Lcd(self, text):
        dev = os.open(
            "/sys/devices/virtual/alphalcd/lcdi2c/clear", os.O_WRONLY)
        os.write(dev, b'1')
        os.close(dev)
        dev = os.open(
            "/sys/devices/virtual/alphalcd/lcdi2c/position", os.O_WRONLY)
        os.write(dev, b'11')
        os.close(dev)
        dev = os.open("/dev/lcdi2c", os.O_WRONLY)
        os.write(dev, bytes(text, 'utf-8'))
        os.close(dev)

    def Rotate_Servo(self, angle):
        dev = os.open("/dev/2servo", os.O_WRONLY)
        os.write(dev, b'10')
        os.close(dev)

    def Get_info(self):
        try:
            response = requests.get(url=self.url+"user")
            print(response)
            if response.status_code == 200:
                self.usr_info = response
                print("get info successfuly")
            else:
                print("get info fail")
        except:
            print("no user")
            return 0

    def Update_Balance(self):
        try:
            response = requests.put(
                url=self.url+"api/users?page=2", data=self.usr_info)
        except:
            print("no user")
            return 0
    def Identification(self):
        self.Read_RFID()
        if not self.check_card:
            self.Display_Lcd("Invalid card num\n Pls try again!")
            return False
        else:
            #check data base and return check card (true or false)
            pass
        if not self.check_card:
            self.Display_Lcd("Invalid user\n Pls try again!")
            return False
        else:
            return True


test = ATM_Pins()
test.Display_Lcd("Hello,\nPls insert card")
start = time.time()
while 1:
    if (test.Identification()):
        ## doi tra pin
        print("doi thanh cong")
        pass
    else:
        time_out = time.time()
        if time_out - start > 5:
            test.Display_Lcd("Hello,\nPls insert card")
            start = time_out

    


