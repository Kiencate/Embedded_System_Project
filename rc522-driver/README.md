## Installation (on raspberry pi4)
enable SPI Interface:
```bash
sudo raspi-config
```
->Interface Options -> SPI -> Enable -> Finish

Then move to rc522-driver folder:
```bash
cd Embedded_System_Project/rc522-driver
make
dtc spidev_disabler.dts -O dtb >spidev_disabler.dtbo
sudo cp spidev_disabler.dtbo /boot/overlays/
sudo vim /boot/config.txt
```
add new line: 
```bash  
dtoverlay=spidev_disabler
```
save file then:
```bash
cd  
echo "sudo insmod /home/pi/Embedded_System_Project/rc522-driver/RFID-RC522.ko" >> .bashrc
sudo reboot
```
after rebooting:
```bash  
lsmod | head
```
will see:
```bash
Module                  Size  Used by
RFID_RC522             20480  0
cmac                   16384  3
```


