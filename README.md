# Amazon Shopping - Android Test Automation

An Android UI automation example built from the WebdriverIO v6, Appium and Cucumber
boilerplate. It uses the Page Object Model to test product search and adding a
product to the Amazon Shopping cart, with an HTML report and session recording.

**Current scope:** the Amazon Android scenario. The iOS/browser scripts and sample
files inherited from the original boilerplate are not configured for this scenario.
The test does not place an order or complete payment.

## What the test verifies

[Test.feature](./src/featureFiles/Test.feature) contains one scenario with 11 BDD steps:

1. Launch Amazon, handle notification/language onboarding and skip sign-in.
2. Open the search box.
3. Enter `iPhone 18 Pro`.
4. Submit the search using Android's Enter key.
5. Verify that search results are visible.
6. Check that a result description contains the requested product name.
7. Select the first matching product.
8. Verify the product details.
9. Verify that the displayed price contains at least one digit.
10. Add the product to the cart and close the confirmation.
11. Open the cart and verify the product title.

The price check does not assert a fixed amount. The cart check verifies the product
name, not its quantity or subtotal. Existing cart items are not automatically removed;
repeated runs may increase the quantity of the same product.

## Requirements

| Component | Setup used by this project |
| --- | --- |
| Node.js | **12.22.12**, with its bundled npm, for this legacy dependency stack |
| WebdriverIO / Cucumber | v6; installed from the committed dependency lockfile |
| Appium server | **1.22.3**, running separately |
| Java / Android tooling | A JDK, Android SDK and SDK platform-tools; configure their environment variables |
| Device | One connected Android device with USB debugging enabled, or a running emulator |
| App | Amazon Shopping with package `in.amazon.mShop.android.shopping`, already installed |

> Node.js 12 and Appium 1 are legacy, end-of-life tools. This setup reproduces the
> existing boilerplate; it is not a recommended stack for a new production framework.
> Modern Node.js versions can fail to load the `fibers` dependency used by
> `@wdio/sync`. Use the version above rather than silently replacing it with the latest.

The commands below use **Windows PowerShell**. On another operating system, adapt
the paths and use `npm`, `appium` and `adb` instead of the Windows executable names.

## Setup

### 1. Clone and install dependencies

Activate Node.js 12.22.12, then run:

```powershell
git clone https://github.com/vignesharavind21/WebdriverIO-V6-appium-cucumber-boilerplate.git
Set-Location .\WebdriverIO-V6-appium-cucumber-boilerplate
node --version
npm.cmd --version
npm.cmd ci
```

`npm ci` uses [package-lock.json](./package-lock.json) for reproducible dependency
installation. Do not copy or commit an existing `node_modules` folder.

### 2. Prepare the Android device and app

Install the Android SDK/platform-tools and a compatible Java JDK. Set `JAVA_HOME`
and `ANDROID_HOME`, and put Java's `bin` directory and SDK `platform-tools` on PATH.
For example, replace these placeholder paths with your installation directories:

```powershell
$env:JAVA_HOME = 'C:\path\to\jdk'
$env:ANDROID_HOME = 'C:\path\to\AndroidSDK'
$env:ANDROID_SDK_ROOT = $env:ANDROID_HOME
$env:Path = "$env:JAVA_HOME\bin;$env:ANDROID_HOME\platform-tools;$env:Path"
```

These assignments affect the current terminal only. Configure the same variables
in the terminal used to start Appium, or set them through Windows environment settings.

Enable Developer options and USB debugging, connect and unlock the phone, and
accept its USB debugging authorization prompt. For an emulator, start it first.

```powershell
adb.exe devices -l
adb.exe shell getprop ro.build.version.release
adb.exe shell pm path in.amazon.mShop.android.shopping
```

- The device must appear as `device`, not `unauthorized` or `offline`.
- Use one connected device for this configuration.
- The last command must return an APK path. If it does not, install the correct
  Amazon Shopping app before running the test.
- Other regional Amazon builds may use a different package and UI locators.
  The configured package, activity and screen locators must match the installed app.

**The Amazon APK is not included.** The converter APK in `apps/` belongs to the
original sample and must not be used for this Amazon scenario.

### 3. Update the device configuration

Edit [android.info.js](./config/android.info.js):

| Method | Value to set |
| --- | --- |
| `deviceName()` | The device serial shown by `adb devices`, or your emulator identifier |
| `platFormVersion()` | The Android version returned by `getprop`; currently configured as `16` |

Review [android.config.js](./config/android.config.js) if your app package or launch
activity differs. Keep these reset settings unless you deliberately change the setup:

| Setting | Current value | Purpose |
| --- | --- | --- |
| `noReset` | `false` | Request clearing local app data for first-run onboarding |
| `fullReset` | `false` | Use the already-installed app without uninstalling it |
| `autoLaunch` | `false` | Let the Given step launch the app once |
| `connectionRetryCount` | `0` | Avoid repeated app launches when session creation fails |

**Do not set `fullReset: true` without supplying a valid Amazon APK through the
`app` capability.** A full reset can uninstall the app, including during failure
cleanup. Local data reset also does not guarantee removal of Amazon server-saved
cart contents.

### 4. Start Appium in a separate terminal

Use the same legacy Node.js environment and Android/Java environment variables:

```powershell
npm.cmd install --global appium@1.22.3
appium.cmd --version
appium.cmd --address 127.0.0.1 --port 4723
```

Install Appium only if the required version is not already available.
Leave this terminal running. The Android configuration connects to an existing
server at `http://127.0.0.1:4723/wd/hub`; it does **not** start Appium automatically.
Appium 1 includes the UiAutomator2 driver used here.

This is an Appium 1 setup. Do not substitute Appium 2/3 without updating the
driver installation, capabilities and server-path configuration.

## Execute

From the repository root, with Appium running and the device ready:

```powershell
npm.cmd run lint
npm.cmd run android
```

The Android command runs [Test.feature](./src/featureFiles/Test.feature), filtered
by `@androidApp`. The spec path and reporting hooks are in
[wdio.conf.js](./config/wdio.conf.js).

The test modifies the cart by adding a product. Use a device/account suitable for
testing. An internet connection is required for the Amazon app; the generated report
can be viewed offline.

## Reports and video

After execution:

| Output | Purpose |
| --- | --- |
| `reports/html/index.html` | Main report dashboard |
| `reports/html/features/` | Scenario, step, assertion and failure details |
| `reports/html/assets/` | Local CSS, JavaScript and fonts |
| `reports/html/videos/` | MP4 session recordings |
| `reports/json/` | Cucumber results, including embedded recording data |

Open the dashboard in a browser:

```powershell
Start-Process .\reports\html\index.html
```

Click a feature, expand its scenario and inspect the step details. The report
includes app/device/Android metadata, execution timestamps, elapsed time and step
durations. The app version is explicitly marked **Not recorded**.

Android recording starts before the test actions and stops afterward, including
when the scenario fails. It records up to **180 seconds** at the configured bitrate.
The video is saved as an MP4 and embedded under **Attachment** on the last scenario
step. A failure before session creation produces no recording.

### Latest results and execution history

By default, `onPrepare` clears previous JSON results and the dashboard is generated
from the latest run. Older feature HTML/video files may still exist in the output
folders.

To archive a run separately, copy the **whole `reports/html/` folder** before the
next execution. To merge old and new executions into one dashboard instead, remove
or comment out only the JSON-deletion block in `onPrepare`. Keep
`executionStartedAt = new Date();` for the current run's timing.

### Sharing with reviewers

- Share the complete `reports/html/` folder, not just `index.html`.
- A reviewer can clone/download the repository and open the dashboard locally;
  Node.js, Appium and a phone are not needed just to view a completed report.
- GitHub's normal file viewer does not render the interactive report. GitHub Pages
  is an alternative for publishing it as a website.
- JSON files are optional for viewing, but useful for regenerating the report.
- Videos and embedded recordings increase file sizes. Check GitHub's file-size
  limits before committing them.
- Generate and inspect a fresh report/video before sharing. Report files may
  contain device identifiers and visible app/account information.

## Project layout

| File/folder | Responsibility |
| --- | --- |
| [Test.feature](./src/featureFiles/Test.feature) | BDD scenario and test intent |
| [Step definitions](./src/stepDefinitions/amazonAddToCart.js) | Map Gherkin steps to page methods |
| [Amazon page](./src/pages/amazonAddToCart.js) | Workflow, scrolling and assertions |
| [Android screen](./src/screens/native/android/amazonAddToCart.screen.js) | UI locators |
| [Action helpers](./src/helpers/actionHelpers.js) | Reusable driver actions |
| [Android config](./config/android.config.js) | Capabilities, metadata and recording hooks |
| [Device info](./config/android.info.js) | Device identifier and Android version |
| [Shared config](./config/wdio.conf.js) | Spec discovery, Cucumber setup and report generation |

Amazon UI changes can require locator updates. Use Appium Inspector with the same
device/app version to inspect the actual `resource-id`, `content-desc` or `text`;
do not assume they are interchangeable. Short WebView resource IDs use XPath here
to avoid Appium 1's automatic package-prefixing of ID locators.

## Troubleshooting

| Problem | What to check |
| --- | --- |
| `No specs found` | The spec path must point to `./src/featureFiles/Test.feature`, not the old sample filename. |
| Connection refused on port 4723 | Start Appium separately and verify the configured host, port and `/wd/hub` path. |
| `Full reset requires an app capability` | Keep `fullReset: false`, or provide a valid Amazon APK if reinstalling is intentional. |
| `'app' option is required for reinstall` | Confirm the configured Amazon package is installed; reinstall it if a previous full reset removed it. |
| `socket hang up` during session creation | Check the Appium server's ADB/instrumentation logs, device connection and competing Inspector/test sessions. |
| `fibers` or synchronous execution errors | Confirm the active Node.js version is 12.22.12 before installing/running this legacy stack. |
| A button is not found | Check the installed app build, current screen, onboarding state and Inspector locator. |
| Old executions appear in the report | Keep the JSON cleanup enabled, or archive runs in separate folders. |
| Charts/styles or step expansion do not work | Rerun report generation and keep all assets alongside the HTML files. |
| No JSON/video after a failed run | A session-start failure occurs before scenario results and recording can be created. Fix that failure first. |

## Original boilerplate

Based on [Arjun-Ar91/WebdriverIO-V6-appium-cucumber-boilerplate](https://github.com/Arjun-Ar91/WebdriverIO-V6-appium-cucumber-boilerplate).
Dependency and license information is available in [package.json](./package.json).
