const {config} = require('./wdio.conf');
const AndroidInfo = require('./android.info');

// Use the already-running Appium server.
config.services = [
];

// Avoid relaunching the app when session creation fails.
config.connectionRetryCount = 0;

// Appium capabilities
config.capabilities = [
    {
        platformName: 'Android',
        noReset: false,
        fullReset: false,
        autoLaunch: false, // Launch only from the Given step.
        maxInstances: 1,
        automationName: 'uiautomator2',
        deviceName: AndroidInfo.deviceName(),
        platformVersion: AndroidInfo.platFormVersion(),
        appPackage: 'in.amazon.mShop.android.shopping',
        appActivity: 'com.amazon.mShop.home.HomeActivity'
    }
];

config.cucumberOpts.tagExpression = '@androidApp'; // pass tag to run tests specific to android

exports.config = config;
