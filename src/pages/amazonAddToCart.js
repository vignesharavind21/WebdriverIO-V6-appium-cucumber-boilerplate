const ActionHelper = require('../helpers/actionHelpers');
require('chai').should();

class AmazonAddToCartPage {

    getObjectLocator() {
        const platform = browser.capabilities.platformName.toLowerCase();
        return require(`./../screens/native/${platform}/amazonAddToCart.screen.js`);
    }

    dismissAppRatingIfPresent() {
        if (ActionHelper.isVisible(this.getObjectLocator().rateAppMessage)) {
            ActionHelper.click(this.getObjectLocator().laterButton);
        }
    }

    launchApp() {
        ActionHelper.launchApp();
        ActionHelper.switchToNativeContext();
        ActionHelper.pause(10);
    }

    enterCelsius(celsiusValue) {
        this.dismissAppRatingIfPresent();
        ActionHelper.waitForElement(this.getObjectLocator().celsiusTextField, 4);
        ActionHelper.clearText(this.getObjectLocator().celsiusTextField);
        ActionHelper.sendText(this.getObjectLocator().celsiusTextField, celsiusValue);
        ActionHelper.click(this.getObjectLocator().submitButton);
    }

    verifyFahrenheitValue(fahrenheitValue) {
        ActionHelper.waitForElement(this.getObjectLocator().fahrenheitTextField, 4);
        ActionHelper.getText(this.getObjectLocator().fahrenheitTextField).should.equal(fahrenheitValue);
    }
}

module.exports = AmazonAddToCartPage;
