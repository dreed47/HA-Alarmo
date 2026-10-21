# Home Assistant - Home Alarm Setup

## Software/Hardware Components

- [Home Assistant HACS/Alarmo component](https://github.com/nielsfaber/alarmo) (v1.10.19)
- [Zigbee2MQTT](https://www.zigbee2mqtt.io/) - runs on a separate host; Home Assistant connects through MQTT and the Zigbee2MQTT Proxy add-on
- [SMLIGHT SLZB-06M](https://smlight.tech) - network (Ethernet) Zigbee coordinator, `ember` adapter
- [Aqara Motion Sensor P1](https://www.amazon.com/gp/product/B09QKVMMTB/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&psc=1)
- [THIRDREALITY Zigbee Motion Sensor](https://www.amazon.com/gp/product/B08RRRWK6B/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&th=1)
- [XFINITY XHS2-UE Door/Window Sensors](https://www.ebay.com/itm/353601730199)
- [Linkind Water Leak Detector](https://www.amazon.com/gp/product/B08YDB1PCK/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&th=1)
- HOBEIAN ZG-222ZA Water Leak Sensor
- [THIRDREALITY Zigbee Smart Plug](https://www.amazon.com/gp/product/B09KNDM4VV/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&psc=1)
- [CXBER Home Zigbee Smart Plug](https://www.amazon.com/gp/product/B0BJ6DQXKF/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&th=1) (reports as eWeLink SA-003-Zigbee)
- NEO NAS-AB02B2 Zigbee Siren
- [Wired Alarm Siren Horn](https://www.amazon.com/gp/product/B07P1FNJTG/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&th=1) [(Siren 12V 2A Power Supply)](https://www.amazon.com/gp/product/B077PW5JC3/ref=ppx_od_dt_b_asin_title_s00?ie=UTF8&psc=1) - powered through a Zigbee smart plug
- THIRDREALITY 3RSB22BZ Smart Button - manual alarm trigger
- [Custom NFC Tag Reader](TAG_READER.md) x3 (ESPHome)
- [Xfinity XHK1-UE Security Alarm Keypad](https://www.ebay.com/itm/324974319228) - *not currently paired*

## General Install Notes

- Procure Zigbee adapter of your choice ([Supported Adapters](https://www.zigbee2mqtt.io/guide/adapters/#recommended))
- Install Zigbee2MQTT ([Instructions](https://www.zigbee2mqtt.io/guide/installation/)). If it runs outside Home Assistant, install the Zigbee2MQTT Proxy add-on to get the frontend in the HA sidebar
- Procure, pair, install zigbee devices of your choice [(Supported Devices)](https://www.zigbee2mqtt.io/supported-devices/)
- Install Alarmo through HACS and assign sensors to it

#### (Optional)

- [Buy](https://adonno-crafts.myshopify.com)/[Build](https://github.com/adonno/tagreader) one or more and install in Home Assistant [Custom NFC Tag Readers](TAG_READER.md)
- Procure security keypad(s) and pair with zigbee2mqtt [(Supported Keypads)](https://www.zigbee2mqtt.io/supported-devices/#s=keypad)
- Create an automation using the Xfinity-Alarmo-Sync ver1.2 [blueprint](blueprints/automation/Xfinity-Alarmo-Sync%20ver1.2.yaml) to keep keypads in sync with Alarmo
- Create automations using the Tag-Event_Arm_Disarm-Alarm-Ver-1.2 [blueprint](blueprints/automation/Tag-Event_Arm_Disarm-Alarm-Ver-1.2.yaml) to arm/disarm with NFC tags
- Create automations to react to triggered and disarmed alarm per your requirements

## Alarm Automations

| Automation | What it does |
|------------|--------------|
| Tag Event: Arm Disarm alarm - away 1.2 | Blueprint. Tag `Security-tag-1` toggles Alarmo between disarmed and **armed away** |
| Tag Event: Arm Disarm alarm - night 1.2 | Blueprint. Tag `alarm-tag-night` toggles Alarmo between disarmed and **armed night** |
| Xfinity-Keypad-Alarmo-sync ver 1.2 | Blueprint. Syncs keypad states with Alarmo (no keypads currently paired) |
| Tagreader: Set LED color | Drives the tag reader LEDs/buzzers from the Alarmo state (see below) |
| Alarm Triggered with Siren | Turns on the wired sirens, turns on day lights, plays a police siren on the tag readers |
| Alarm Disarmed | Turns off all sirens, short beep on the tag readers, sets day/night light scene |
| Manual Alarm Trigger | Zigbee button to manually toggle lights and sirens |
| turn off night alarm @ 7:12 | Disarms the alarm at 7:12 AM if armed night |

All tag reader buzzer calls use `continue_on_error: true` so an unplugged reader doesn't stop the rest of the automation.

## NFC Tag Readers

Three [adonno tagreaders](https://github.com/adonno/tagreader) (Wemos D1 mini ESP8266, PN532 NFC, WS2812 LED, buzzer) running ESPHome:

- `tagreader-garage`
- `tagreader-frontdoor`
- `tagreader-bedroom`

Each device file (`esphome/tagreader-*.yaml`) only sets the name/IP/API key and includes the shared package `esphome/common/tagreader.yaml`. Change the package and reinstall all three readers from ESPHome Device Builder.

Reader behavior by alarm state:

| Alarmo state | LED | Buzzer |
|--------------|-----|--------|
| Tag scanned | - | Immediate "success" chime (on device) |
| Arming / pending | Flashes white every second | Beep with each flash |
| Armed away / night | Solid red (bedroom dimmed) | - |
| Triggered | Flashes red | Police siren |
| Disarmed | Off | Single short beep |

#### ESPHome 2026.x notes

- RTTTL default durations (`d=`) must be 1, 2, 4, 8, 16 or 32. Anything else (e.g. `d=24`, `d=64`) is rejected and the tune silently doesn't play
- `wifi: post_connect_roaming: false` is set in the shared package. The default roaming scans stall the ESP8266 and cause multi-second delays on tag reads

## Notes

#### Template code to get all battery levels

```
{% set entities = states.sensor|selectattr('entity_id', 'search', 'battery')|rejectattr('state', 'eq', 'unknown')|rejectattr('entity_id', 'search', 'phone')|rejectattr('entity_id', 'search', 'ipad')|rejectattr('entity_id', 'search', '403_front_door')|rejectattr('entity_id', 'search', '_tempest') %}
{% for entity in entities -%}
  {{ entity.name ~ ': **' ~ entity.state ~ '%**' }}
{% endfor %}
```

## Zigbee Devices

#### Coordinator

SMLIGHT - SLZB-06M (network coordinator)

#### Routers - Plugs

eWeLink SA-003-Zigbee

- Mantle Plug
- Curio Cabinet Light Plug
- Computer Desk Plug
- Basement Handrail Lights
- Main Floor Siren (wired siren horn)
- Basement Floor Siren Plug (wired siren horn)
- Unused Plug

Third Reality 3RSP019BZ

- Garage Plug
- Basement Family Room Plug
- Master Bedroom Plug
- Kitchen Fridge Under Cabinet

Innr SP 244

- Basement Bathroom Plug
- Coffee Pot Plug
- Computer Room Plug
- Laundry Room Plug

Sengled E1C-NB7

- Hall Plug
- Kitchen Stove Under Cabinet
- xmas plug 1
- xmas plug 2

SONOFF S40ZBTPB

- Kitchen Chicken Plug

#### Routers - Other

- SONOFF ZBDongle-E (router firmware) - Kitchen Router Stick
- TI router stick - Basement Router Stick
- IKEA E1746 signal repeater - Ikea Blinds Repeater
- GLEDOPTO C-ZB-LC20v2-CCT - Kitchen Under Counter LED, Kitchen Kick Panel LED

#### Sirens

NEO NAS-AB02B2

- Garage Siren
- Mantle Siren

#### Motion / Presence Sensors

Aqara RTCGQ14LM (Motion P1)

- Basement Motion
- Garage Motion 2

Third Reality 3RMS16BZ

- Stairway Motion
- Stairway Motion 2

SONOFF SNZB-03

- Basement Stairway Motion

Tuya ZG-204ZL

- Livingroom PIR

Linptech ES1ZZ(TY) mmWave

- Garage Human Presence

Tuya ZY-M100-S_2 mmWave

- Laundry Room Human Presence

#### Contact Sensors

Universal Electronics Inc - XHS2-UE

- Basement Door Sensor
- Computer Room Window 1 Sensor
- Dining Room Window1 Sensor
- Dining Room Window2 Sensor
- Emily's Bedroom Window Sensor
- First Floor Bathroom Window Sensor
- Front Door Sensor
- Garage Door Sensor
- Leos Bedroom Window Sensor
- Living Room Window 1 Sensor
- Master Bedroom Window 1 Sensor
- Master Bedroom Window 2 Sensor
- Porch Door Sensor

Linkind ZS110050078

- Computer Room Window 2 Sensor
- Basement Office Window Sensor

Aqara MCCGQ11LM

- Living Room Window 2 Sensor

Tuya TS0203

- Basement Kitchen Door Sensor
- Living Room Window 3 Sensor

Leedarson LDHD2AZW

- Garage Side Door Sensor

#### Leak Detectors

Linkind LS21001

- Basement Bathroom Leak
- First Floor Bathroom Leak
- Guest Bathroom Leak
- Hot Water Furnace Leak
- Kitchen Sink Leak
- Master Bathroom Leak

HOBEIAN ZG-222ZA

- Garbage Disposal Drain Leak
- Main Water Line Leak
- Master Bathroom Sink Leak Carol
- Master Bathroom Sink Leak David
- First Floor Bathroom Sink Leak

#### Buttons

Third Reality 3RSB22BZ

- Manual Alarm Trigger
- Smart Button 1
