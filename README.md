# Home Assistant - Home Alarm Setup

## Software/Hardware Components

* [Home Assistant HACS/Alarmo component](https://github.com/nielsfaber/alarmo)
* [Home Assistant Add-on: Zigbee2MQTT](https://github.com/zigbee2mqtt/hassio-zigbee2mqtt/tree/master/zigbee2mqtt)
* [Zigbee 3.0 USB Dongle Plus–ZBDongle-E](https://itead.cc/product/zigbee-3-0-usb-dongle/)
* [1.5M USB Male to Female Extension Cable](https://itead.cc/product/1-5m-usb-male-to-female-extension-cable/)
* [Aqara Motion Sensor P1](https://www.amazon.com/gp/product/B09QKVMMTB/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&psc=1)
* [THIRDREALITY Zigbee Motion Sensor](https://www.amazon.com/gp/product/B08RRRWK6B/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&th=1)
* [XFINITY XHS2-UE Door/Window Sensors](https://www.ebay.com/itm/353601730199)
* [Linkind Water Leak Detector](https://www.amazon.com/gp/product/B08YDB1PCK/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&th=1)
* [Xfinity XHK1-UE Security Alarm Keypad](https://www.ebay.com/itm/324974319228)
* [THIRDREALITY Zigbee Smart Plug](https://www.amazon.com/gp/product/B09KNDM4VV/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&psc=1)
* [CXBER Home Zigbee Smart Plug](https://www.amazon.com/gp/product/B0BJ6DQXKF/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&th=1)
* [Wired Alarm Siren Horn](https://www.amazon.com/gp/product/B07P1FNJTG/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&th=1) [(Siren 12V 2A Power Supply)](https://www.amazon.com/gp/product/B077PW5JC3/ref=ppx_od_dt_b_asin_title_s00?ie=UTF8&psc=1)
* [Custom NFC Tag Reader](TAG_READER.md)

## General Install Notes

* Procure Zigbee adapter of your choice ([Supported Adapters](https://www.zigbee2mqtt.io/guide/adapters/#recommended))
* Install zigbee2mqtt Home Assistant Addon - [(Instructions)](https://github.com/zigbee2mqtt/hassio-zigbee2mqtt#installation)
* Procure, pair, install zigbee devices of your choice [(Supported Devices)](https://www.zigbee2mqtt.io/supported-devices/)

#### (Optional)

* [Buy](https://adonno-crafts.myshopify.com)/[Build](https://github.com/adonno/tagreader) one or more and install in Home Assistant [Custom NFC Tag Readers](TAG_READER.md)
* Procure security keypad(s) and pair with zigbee2mqtt [(Supported Keypads)](https://www.zigbee2mqtt.io/supported-devices/#s=keypad)
* Create an automation using the Blueprint-Xfinity-keypad-sync [blueprint](scripts/Blueprint-Xfinity-keypad-sync.yaml)
* Create an automation using the Blueprint-Tag-Event-Arm-Disarm-alarm [blueprint](scripts/Blueprint-Tag-Event-Arm-Disarm-alarm.yaml)
* Create automations to react to triggered and disarmed alarm per your requirements

## Notes

#### Template code to get all battery levels
```
{% set entities = states.sensor|selectattr('entity_id', 'search', 'battery')|rejectattr('state', 'eq', 'unknown')|rejectattr('entity_id', 'search', 'phone')|rejectattr('entity_id', 'search', 'ipad')|rejectattr('entity_id', 'search', '403_front_door')|rejectattr('entity_id', 'search', '_tempest') %}
{% for entity in entities -%}
  {{ entity.name ~ ': **' ~ entity.state ~ '%**' }}
{% endfor %}
For more informa
```
