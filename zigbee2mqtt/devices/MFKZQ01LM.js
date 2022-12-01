const fz = require('zigbee-herdsman-converters/converters/fromZigbee');
const tz = require('zigbee-herdsman-converters/converters/toZigbee');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const reporting = require('zigbee-herdsman-converters/lib/reporting');
const extend = require('zigbee-herdsman-converters/lib/extend');
const e = exposes.presets;
const ea = exposes.access;

const definition = {
    zigbeeModel: [
       "lumi.sensor_cube",
       "lumi.sensor_cube.aqgl01",
       "lumi.remote.cagl02.disabled",
     ],
     model: "MFKZQ01LM",
     vendor: "Xiaomi",
     description: "Mi/Aqara smart home cube",
     meta: { battery: { voltageToPercentage: "3V_2850_3000" } },
     fromZigbee: [
       fz.xiaomi_basic,
       fz.MFKZQ01LM_action_multistate,
       fz.MFKZQ01LM_action_analog,
     ],
     exposes: [
       e.battery(),
       e.battery_voltage(),
       e.angle("action_angle"),
       e.device_temperature(),
       e.power_outage_count(false),
       e.cube_side("action_from_side"),
       e.cube_side("action_side"),
       e.cube_side("action_to_side"),
       e.cube_side("side"),
       e.action([
         "shake",
         "wakeup",
         "fall",
         "tap",
         "slide",
         "flip180",
         "flip90",
         "rotate_left",
         "rotate_right",
       ]),
     ],
     toZigbee: [],
};

module.exports = definition;
