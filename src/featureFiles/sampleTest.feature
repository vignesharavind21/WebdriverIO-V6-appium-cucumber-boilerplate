Feature: Sample feature file to illustrate app and browser tests

  @androidApp
  Scenario: Search for a mobile phone and add it to cart
    Given I launch the Amazon app and skip sign in
    When I tap the search box
    And I enter "iPhone 18 Pro"
    And I submit the search
    Then I should see the search results
    And I should see "iPhone 18 Pro" in the results
    When I select first iPhone from the results
    Then I should see the product details
    And I should see the product price
    When I add the product to the cart
    Then the cart should contain the selected product