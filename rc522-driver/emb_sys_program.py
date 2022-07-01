import os
from urllib import response   
import requests             
class ATM_Pins():
    rfid = None
    usr_info = None
    url = "http://10.133.161.237:4000/"
    def Read_RFID(self):
        dev = os.open("/dev/rfid_rc522_dev", os.O_RDONLY)
        while (self.rfid != None and self.rfid !=0 ):
            self.rfid = os.read(dev,4)
        os.close(dev)
    
    def Display_Lcd(self,text):
        dev = os.open("dev/lcd",os.O_WRONLY)
        os.write(dev,text)
        os.close(dev)
    
    def Rotate_Servo(self,angle):
        dev = os.open("dev/my_pwm_dev",os.O_WRONLY)
        os.write(dev,angle)
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
            response = requests.put(url=self.url+"api/users?page=2",data=self.usr_info)
        except:
            print("no user")
            return 0
    


test = ATM_Pins()
test.Get_info()          

