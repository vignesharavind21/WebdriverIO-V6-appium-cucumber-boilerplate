const ActionHelper = require('../helpers/actionHelpers');
require('chai').should();

class AmazonAddToCartPage {

    getObjectLocator() {
        const platform = browser.capabilities.platformName.toLowerCase();
        return require(`./../screens/native/${platform}/amazonAddToCart.screen.js`);
    }

    launchApp() {
        ActionHelper.launchApp();
        ActionHelper.switchToNativeContext();
    }

    dismissNotifications() {
        ActionHelper.waitForElement(this.getObjectLocator().dismissNotificationsButton, 5);
        ActionHelper.click(this.getObjectLocator().dismissNotificationsButton);
    }

    selectEnglishLanguage() {
        ActionHelper.waitForElement(this.getObjectLocator().englishLanguageButton, 5);
        ActionHelper.click(this.getObjectLocator().englishLanguageButton);
        ActionHelper.waitForElement(this.getObjectLocator().continueButton, 5);
        ActionHelper.click(this.getObjectLocator().continueButton);
    }

    skipSignIn() {
        ActionHelper.waitForElement(this.getObjectLocator().skipSignInButton, 5);
        ActionHelper.click(this.getObjectLocator().skipSignInButton);
    }

    tapSearchBox() {
        ActionHelper.waitForElement(this.getObjectLocator().searchBox1, 5);
        ActionHelper.click(this.getObjectLocator().searchBox1);
    }

    enterSearchText(searchText) {
        ActionHelper.waitForElement(this.getObjectLocator().searchBox2, 5);
        ActionHelper.sendText(this.getObjectLocator().searchBox2, searchText);
    }

    submitSearch() {
        ActionHelper.waitForElement(this.getObjectLocator().searchBox2, 5);
        ActionHelper.pressEnter();
    }

    verifySearchResults() {
        ActionHelper.waitForElement(this.getObjectLocator().firstSearchResultTitle, 5);
        ActionHelper.isVisible(this.getObjectLocator().firstSearchResultTitle).should.be.true;
    }

    verifySearchResultContains(searchText) {
        const resultTitle = this.getObjectLocator().firstSearchResultTitle;
        ActionHelper.waitForElement(resultTitle, 5);
        ActionHelper.getAttribute(resultTitle, 'content-desc').should.include(searchText);
    }

    selectSearchResult() {
        ActionHelper.scrollDown();
        ActionHelper.waitForElement(this.getObjectLocator().firstSearchResultTitle, 5);
        ActionHelper.click(this.getObjectLocator().firstSearchResultTitle);
    }

    verifyProductDetails() {
        ActionHelper.waitForElement(this.getObjectLocator().productDetails, 5);
        ActionHelper.isVisible(this.getObjectLocator().productDetails).should.be.true;
    }

    verifyProductPrice() {
        const productPriceButton = this.getObjectLocator().productPrice;
        for (let scrolls = 0; scrolls < 3 && !ActionHelper.isVisible(productPriceButton); scrolls++) {
            ActionHelper.scrollDown();
        }
        ActionHelper.waitForElement(this.getObjectLocator().productPrice, 5);
        ActionHelper.isVisible(this.getObjectLocator().productPrice).should.be.true;
    }

    addToCart() {
        const addToCartButton = this.getObjectLocator().addToCartButton;
        for (let scrolls = 0; scrolls < 5 && !ActionHelper.isVisible(addToCartButton); scrolls++) {
            ActionHelper.scrollDown();
        }
        ActionHelper.waitForElement(addToCartButton, 5);
        ActionHelper.click(addToCartButton);
        ActionHelper.waitForElement(this.getObjectLocator().doneButton, 5);
        ActionHelper.click(this.getObjectLocator().doneButton);
    }

    verifyCartContains(productName) {
        ActionHelper.waitForElement(this.getObjectLocator().bottomCartButton, 5);
        ActionHelper.click(this.getObjectLocator().bottomCartButton);
        ActionHelper.waitForElement(this.getObjectLocator().firstCartItem, 5);
        ActionHelper.isVisible(this.getObjectLocator().firstCartItem).should.be.true;
        ActionHelper.getText(this.getObjectLocator().firstCartItem).should.include(productName);
    }

}

module.exports = AmazonAddToCartPage;
