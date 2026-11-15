class amazonAddToCart{
    constructor(){
        this.dismissNotificationsButton =
            '//android.widget.Button[@resource-id=' +
            '"com.android.permissioncontroller:id/permission_deny_button"]';
        this.englishLanguageButton =
            '~Select English';
        this.continueButton =
            'id=in.amazon.mShop.android.shopping:id/continue_button';
        this.skipSignInButton =
            'id=in.amazon.mShop.android.shopping:id/skip_sign_in_button';
        this.searchBox1 =
            'id=in.amazon.mShop.android.shopping:id/chrome_search_hint_view';
        this.searchBox2 =
            'id=in.amazon.mShop.android.shopping:id/rs_search_src_text';
        this.firstSearchResultTitle =
            '//android.widget.TextView[contains(@content-desc, "iPhone 18 Pro")]';
        this.productDetails =
            '//android.view.View[contains(@text, "iPhone 18 Pro")]';
        this.productPrice =
        '//android.widget.TextView[@resource-id="apex-pricetopay-accessibility-label"]';
        this.addToCartButton =
            '//*[@resource-id="add-to-cart-button"]';
        this.doneButton =
            '~DONE';
        this.proceedtoCheckoutButton =
            '//android.widget.Button[@text="Proceed to checkout"]';
        this.cartButton = 
            '//android.widget.Button[@text="Cart"]';
        this.bottomCartButton =
            'id=in.amazon.mShop.android.shopping:id/cart_count';
        this.firstCartItem =
            '//android.widget.TextView[contains(@text, "iPhone 18 Pro")]';
    }
}

module.exports = new amazonAddToCart();
