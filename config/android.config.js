const {config} = require('./wdio.conf');
const AndroidInfo = require('./android.info');
const fs = require('fs');
const path = require('path');
const cucumberJson = require('wdio-cucumberjs-json-reporter').default;
let recordingStarted = false;

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
        appActivity: 'com.amazon.mShop.home.HomeActivity',
        'cjson:metadata': {
            app: {name: 'Amazon Shopping', version: 'Not recorded'},
            device: AndroidInfo.deviceName(),
            platform: {name: 'android', version: AndroidInfo.platFormVersion()}
        }
    }
];

config.cucumberOpts.tagExpression = '@androidApp'; // pass tag to run tests specific to android

config.before = async function () {
    await driver.startRecordingScreen({timeLimit: 180, bitRate: 2000000});
    recordingStarted = true;
};

config.after = async function () {
    if (!recordingStarted) {
        return;
    }
    recordingStarted = false;
    const recording = await driver.stopRecordingScreen();
    if (!recording) {
        throw new Error('Appium returned an empty Android session recording.');
    }
    const videosDir = path.resolve('./reports/html/videos');
    fs.mkdirSync(videosDir, {recursive: true});
    const videoFile = path.join(videosDir, `android-${driver.sessionId}-${Date.now()}.mp4`);
    fs.writeFileSync(videoFile, Buffer.from(recording, 'base64'));
    cucumberJson.attach(recording, 'video/mp4');
};

exports.config = config;
