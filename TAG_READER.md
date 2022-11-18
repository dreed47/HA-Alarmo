# Tag Reader for Home Assistant

<a href="https://www.buymeacoffee.com/dreed47.david" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

Thanks to: https://github.com/adonno/tagreader and https://github.com/smarthomejunkie/tagreader for providing code for this project.

The tag reader is a simple to build/use NFC tag reader, specially created for [Home Assistant](https://www.home-assistant.io). It is using a D1 mini ESP 8266 and the PN532 NFC module. The firmware is built using [ESPhome](https://www.esphome.io).

![Photos of the final device](media/tagreader-3.png)

## Building the tag reader

To build your own tag reader, you need the following components:

- [ESP8266 D1 Mini](https://s.click.aliexpress.com/e/_d8l72oB)
- [PN532 NFC Reader](https://s.click.aliexpress.com/e/_dZNORIJ)
- [WS2812](https://s.click.aliexpress.com/e/_d82GRqr)
- [Buzzer](https://s.click.aliexpress.com/e/_dZ5F5yj)

### Connecting the components

![Photo of schematics](media/tag_reader_schematics_v3.2.png)

There are not too many components to connect, but it does require soldering.

Also make sure that you have set the switches on the PN532 to the following:

- Switch 1: On (up)
- Switch 2: Off (down)

This enables the PN532 module to communicate with the D1 over I2C, and is required for the modules to work together!

To flash the reader firmware to your D1 Mini you point ESPHome at [ESPHome-TagReader-Firmware.yaml](ESPHome-TagReader-Firmware.yaml).

> :warning: The tag reader requires ESPHome `1.16.0` or greater.

If you're new to ESPHome, it's recommend that you use the [ESPHome Home Assistant add-on](https://esphome.io/guides/getting_started_hassio.html).

## Configuring for use with Home Assistant

The tag reader requires [Home Assistant](https://www.home-assistant.io) 0.115 or later.

If the tag reader is unable to connect to a wifi network, it will start a WiFi access point with a captive portal to allow you to enter your WiFi credentials.

The tag reader will be automatically discovered by Home Assistant once the tag reader is connected to the same network. You can follow the instructions in the UI to set it up.

## Usage

Scanned tags can be managed from the tags interface in Home Assistant. You can find it under config -> tags.

## XFinity XHK1-UE Keypads

https://www.zigbee2mqtt.io/devices/XHK1-UE.html

https://community.home-assistant.io/t/xfinity-xhk1-ue-keypad-in-deconz/386237

https://community.home-assistant.io/t/zigbee2mqtt-control-alarmo-via-keypad/420016/15

## Centralite 3400

Pairing

ve got 3400-X and this method doesn't work for me, but the factory default one works.

Remove batteries (both!)
Press the tamper button on the back and keep pressing it.
Insert one (!) battery
After keypad is lit up, immediately release the tamper button (doesn't seem to work its kept pressed few more seconds)
I recommend doing that with just one battery, as those batteries don't slid in and out easily and the device works with one as fine as with two, therefore inserting two batteries during setup messes up timing in point 4.
