import os
from urllib import response
import requests
import time


class ATM_Pins():
    max_pin_number = 2
    rfid = None
    check_card = None
    usr_info = None
    pins_stack = [2, 0]
    servo = [1, 1]
    url = "http://10.133.161.237:4000/"

    #doc the tu
    def Read_RFID(self):
        self.rfid = None
        dev = os.open("/dev/rfid_rc522_dev", os.O_RDONLY)
        start = time.time()
        while (self.rfid == b'' or self.rfid == None):
            self.rfid = os.read(dev, 4)
            time_out = time.time()
            if time_out-start > 5:
                self.Display_Lcd("Hello,\nPls insert card")
                start = time_out
        os.close(dev)
        try:
            self.rfid = str(int(self.rfid[0]))+','+str(int(self.rfid[1])) + \
                ','+str(int(self.rfid[2]))+','+str(int(self.rfid[3]))
            print(self.rfid)
            self.check_card = True
        except:
            print("deo on")
            self.check_card = False

    #Hien thi LCD
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
        
    #Rotate servo
    def Rotate_Servo(self):
        mode = ''
        for i in range(self.max_pin_number):
            mode += str(self.servo[i])
        dev = os.open("/dev/2servo", os.O_WRONLY)
        os.write(dev, bytes(mode, 'utf-8'))
        os.close(dev)

    # Lay thong tin tu database
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

    #thanh toan
    def Update_Balance(self):
        try:
            response = requests.put(
                url=self.url+"api/users?page=2", data=self.usr_info)
        except:
            print("no user")
            return True

    #dinh danh
    def Identification(self):
        self.Read_RFID()
        if not self.check_card:
            self.Display_Lcd("Invalid card\n Pls try again!")
            return False
        else:
            # check data base and return check card (true or false)
            print("checking")
        if not self.check_card:
            self.Display_Lcd("Invalid user\n Pls try again!")
            return False
        else:
            return True
    
    # kiem tra xem co pin nao trong ATM da day khong
    def Check_Pin_Available(self):
        for i in range(self.max_pin_number):
            if self.pins_stack[i] == 2:
                return True
        return False
    # kiem tra dung pin va phan tram pin con lai 
    def Check_pin_in_box(self, pin_number):
        return True


test = ATM_Pins()
test.Display_Lcd("Hello,\nPls insert card")
start = time.time()
while 1:
    if (test.Identification()):
        # doi tra pin
        if not test.Check_Pin_Available():
            test.Display_Lcd("Sorry,\nNo pin available")
            continue
        check = True
        for i in range(test.max_pin_number):
            if test.pins_stack[i] == 0:  # kiem tra xem co ngan nao trong khong
                # open to push pin
                test.servo[i] = 0
                test.Rotate_Servo()
                # user push pin
                time.sleep(3)
                test.pins_stack[i] = 1
                # close to check pin
                test.servo[i] = 1
                test.Rotate_Servo()
                if test.Check_pin_in_box(i):
                    if (test.Update_Balance()):
                        #pay successfully
                        test.Display_Lcd("Successfully,\nReceive new pin")
                        test.pins_stack[i]=1
                    else:
                        #pay fail
                        test.Display_Lcd("Pay false,\nReceive old pin")
                        #return old pin
                        test.servo[i] = 0
                        test.Rotate_Servo()
                        time.sleep(3)
                        test.servo[i] = 1
                        test.Rotate_Servo()
                        test.pins_stack[i] = 0
                        check = False
                else:
                    #check fail
                    test.Display_Lcd("Check pin false,\nReceive old pin")
                    #return old pin
                    test.servo[i] = 0
                    test.Rotate_Servo()
                    time.sleep(3)
                    test.servo[i] = 1
                    test.Rotate_Servo()
                    test.pins_stack[i] = 0
                    check = False
                break
        if check:
            for i in range(test.max_pin_number):
                if test.pins_stack[i] == 2:
                    # open for user receiving pin
                    test.servo[i] = 0
                    test.Rotate_Servo()
                    time.sleep(5)
                    test.pins_stack[i] = 0
                    test.servo[i] = 1
                    test.Rotate_Servo()
        print("doi thanh cong")
