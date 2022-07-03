## Installation (on raspberry pi4)

```bash
make
sudo vim /boot/config.txt
```
add new line: 
```bash  
dtoverlay=pwm-2chan,pin=18,func=2,pin2=19,func2=2
```
save file
then:
```bash  
echo "sudo insmod /home/pi/Embedded_System_Project/servo-driver/servo_driver.ko" >> .bashrc
sudo reboot
```
after rebooting:
```bash  
lsmod 
```
will see:
```bash
ecdh_generic           16384  2 bluetooth
ecc                    40960  1 ecdh_generic
servo_driver           16384  0
8021q                  32768  0
garp                   16384  1 8021q
