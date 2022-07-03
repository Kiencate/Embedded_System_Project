## Installation (on raspberry pi4)
enable SPI Interface:
```bash
sudo raspi-config
```
->Interface Options -> I2C -> Enable -> Finish

Then move to rc522-driver folder:
```bash
cd Embedded_System_Project/rc522-driver
make
cd  
echo "sudo insmod /home/pi/Embedded_System_Project/LCD-driver/lcdi2c.ko" >> .bashrc
sudo reboot
```
after rebooting:
```bash  
lsmod | head
```
will see:
```bash
bluetooth             405504  26 hci_uart,bnep,btbcm
lcdi2c                 28672  0
ecdh_generic           16384  2 bluetooth
