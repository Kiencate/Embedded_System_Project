#!/bin/bash
dtc spidev_disabler.dts -O dtb >spidev_disabler.dtbo
dtoverlay -d . spidev_disabler