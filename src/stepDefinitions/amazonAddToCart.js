const {Given, When, Then} = require('cucumber');

const AmazonAddToCartPage = require('../pages/amazonAddToCart');

const amazonAddToCartPage = new AmazonAddToCartPage();

Given(/^I launch the Amazon app$/, () => {
    amazonAddToCartPage.launchApp();
});

When(/^I tap the search box$/, () => {
    amazonAddToCartPage.tapSearchBox();
});

When(/^I enter "iPhone 15"$/, () => {
    amazonAddToCartPage.enterSearchText('iPhone 15');
});

When(/^I submit the search$/, () => {
    amazonAddToCartPage.submitSearch();
});

Then(/^I should see the search results$/, () => {
    amazonAddToCartPage.verifySearchResults();
});

Then(/^I should see "iPhone" in the results$/, () => {
    amazonAddToCartPage.verifySearchResultContains('iPhone');
});

When(/^I select an iPhone from the results$/, () => {
    amazonAddToCartPage.selectSearchResult('iPhone');
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
    amazonAddToCartPage.verifyCartContains('iPhone');
});

// When(/^I enter celsius of (.*)$/, (celsius) => {
//     amazonAddToCartPage.enterCelsius(celsius);
// });

// Then(/^I should see fahrenheit of (.*)$/, (fahrenheit) => {
//     amazonAddToCartPage.verifyFahrenheitValue(fahrenheit);
// });
