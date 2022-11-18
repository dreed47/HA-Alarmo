const fz = require('zigbee-herdsman-converters/converters/fromZigbee');
const tz = require('zigbee-herdsman-converters/converters/toZigbee');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const reporting = require('zigbee-herdsman-converters/lib/reporting');
const extend = require('zigbee-herdsman-converters/lib/extend');
const e = exposes.presets;
const ea = exposes.access;

const definition = {
    zigbeeModel: ['LDHD2AZW'],
    model: 'LDHD2AZW',
    vendor: 'Leedarson',
    description: 'Magnetic door & window contact sensor',
    fromZigbee: [fz.ias_contact_alarm_1, fz.temperature, fz.battery],
    toZigbee: [],
    meta: {battery: {voltageToPercentage: '3V_2100'}},
    configure: async (device, coordinatorEndpoint, logger) => {
        const endpoint = device.getEndpoint(1);
        await reporting.bind(endpoint, coordinatorEndpoint, ['msTemperatureMeasurement', 'genPowerCfg']);
        await reporting.temperature(endpoint);
        await reporting.batteryVoltage(endpoint);
    },
    exposes: [e.contact(), e.battery_low(), e.tamper(), e.temperature(), e.battery()],
};

module.exports = definition;
