cmd_/home/kiencate/My_Linux_Driver/rfid-linux-driver/modules.order := {   echo /home/kiencate/My_Linux_Driver/rfid-linux-driver/RFID-RC522.ko; :; } | awk '!x[$$0]++' - > /home/kiencate/My_Linux_Driver/rfid-linux-driver/modules.order
