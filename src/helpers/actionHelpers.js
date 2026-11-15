class ActionHelper {

    static launchBrowserUrl(urlToLaunch) {
        browser.url(urlToLaunch)
    }

    static getTitle() {
        return browser.getTitle();
    }

    static launchApp() {
        driver.launchApp();
    }

    static switchToNativeContext() {
        browser.switchContext('NATIVE_APP');
    }

    static pause(seconds) {
        browser.pause(seconds * 1000);
    }

    static isVisible(locator) {
        return $(locator).isDisplayed() ? true : false;
    }

    static click(locator) {
        $(locator).click();
    }

    static scrollDown() {
        const {width, height} = driver.getWindowSize();
        const x = Math.floor(width / 4);
        driver.touchAction([
            {action: 'press', x, y: Math.floor(height * 0.8)},
            {action: 'wait', ms: 500},
            {action: 'moveTo', x, y: Math.floor(height * 0.5)},
            {action: 'release'}
        ]);
    }

    static waitForElement(locator, waitTimeInSeconds) {
        $(locator).waitForDisplayed(waitTimeInSeconds * 1000);
    }

    static clearText(locator) {
        $(locator).clearValue();
    }

    static sendText(locator, inputText) {
        $(locator).addValue(inputText);
    }

    static pressEnter() {
        driver.pressKeyCode(66); // Android KEYCODE_ENTER.
    }

    static getText(locator) {
        return $(locator).getText();
    }

    static getAttribute(locator, attribute) {
        return $(locator).getAttribute(attribute);
    }

    static dismissNotifications() {
        const denyButton = $('id=com.android.permissioncontroller:id/permission_deny_button');
        if (denyButton.isDisplayed()) {
            denyButton.click();
        }
    }

    static selectEnglishLanguage() {
        const englishLanguageOption = $('~Select English');
        if (englishLanguageOption.isDisplayed()) {
            englishLanguageOption.click();
        }

        const continueButton = $('id=in.amazon.mShop.android.shopping:id/continue_button');
        if (continueButton.isDisplayed()) {
            continueButton.click();
        }
    }

    static skipSignIn() {
        const skipSignInButton = $('id=in.amazon.mShop.android.shopping:id/skip_sign_in_button');
        if (skipSignInButton.isDisplayed()) {
            skipSignInButton.click();
        }
    }
}

module.exports = ActionHelper;
