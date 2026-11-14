const {config} = require('./wdio.conf');
const AndroidInfo = require('./android.info');
const path = require('path');

// Appium capabilities
config.capabilities = [
    {
        platformName: 'Android',
        noReset: true,
        fullReset: false,
        maxInstances: 1,
        automationName: 'uiautomator2',
        deviceName: AndroidInfo.deviceName(),
        platformVersion: AndroidInfo.platFormVersion(),
        appPackage: 'com.androiddev2015.cfconverter',
        appActivity: 'com.androiddev2015.cfconverter.MainActivity'
    }
];

config.cucumberOpts.tagExpression = '@androidApp'; // pass tag to run tests specific to android

exports.config = config;
