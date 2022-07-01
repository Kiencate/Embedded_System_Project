
obj-m :=RFID-RC522.o
RFID-RC522-objs:=rc522.o rc522_api.o
all:
	make -C /lib/modules/$(shell uname -r)/build/ M=$(PWD) modules
clean:
	make -C /lib/modules/$(shell uname -r)/build/ M=$(PWD) clean

