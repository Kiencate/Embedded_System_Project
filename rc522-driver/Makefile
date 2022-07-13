
obj-m :=RFID-RC522.o
RFID-RC522-objs:=rc522.o rc522_api.o
all:
	make ARCH=arm CROSS_COMPILE=/bin/arm-linux-gnueabihf- -C /home/kiencate/Documents/Mon_Hoc/HeThongNhung/rpi-kernel/linux M=$(PWD) modules
clean:
	make -C /lib/modules/$(shell uname -r)/build/ M=$(PWD) clean

