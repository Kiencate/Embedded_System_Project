obj-m += servo_driver.o

all:
	# make -C /lib/modules/$(shell uname -r)/build M=$(PWD) modules
	make ARCH=arm CROSS_COMPILE=/bin/arm-linux-gnueabihf- -C /home/kiencate/Documents/Mon_Hoc/HeThongNhung/rpi-kernel/linux M=$(PWD) modules

clean:
	make -C /lib/modules/$(shell uname -r)/build M=$(PWD) clean
