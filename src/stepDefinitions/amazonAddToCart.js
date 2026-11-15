const {Given, When, Then} = require('cucumber');

const AmazonAddToCartPage = require('../pages/amazonAddToCart');

const amazonAddToCartPage = new AmazonAddToCartPage();

Given(/^I launch the Amazon app and skip sign in$/, () => {
    amazonAddToCartPage.launchApp();
    amazonAddToCartPage.dismissNotifications();
    amazonAddToCartPage.selectEnglishLanguage();
    amazonAddToCartPage.skipSignIn();
});

When(/^I tap the search box$/, () => {
    amazonAddToCartPage.tapSearchBox();
});

When(/^I enter "iPhone 18 Pro"$/, () => {
    amazonAddToCartPage.enterSearchText('iPhone 18 Pro');
});

When(/^I submit the search$/, () => {
    amazonAddToCartPage.submitSearch();
});

Then(/^I should see the search results$/, () => {
    amazonAddToCartPage.verifySearchResults();
});

Then(/^I should see "iPhone 18 Pro" in the results$/, () => {
    amazonAddToCartPage.verifySearchResultContains('iPhone 18 Pro');
});

When(/^I select first iPhone from the results$/, () => {
    amazonAddToCartPage.selectSearchResult();
});

Then(/^I should see the product details$/, () => {
    amazonAddToCartPage.verifyProductDetails();
});

Then(/^I should see the product price$/, () => {
    amazonAddToCartPage.verifyProductPrice();
});

When(/^I add the product to the cart$/, () => {
    amazonAddToCartPage.addToCart();
});

Then(/^the cart should contain the selected product$/, () => {
    amazonAddToCartPage.verifyCartContains('iPhone 18 Pro');
});
