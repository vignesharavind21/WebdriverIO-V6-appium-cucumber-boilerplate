Feature: Sample feature file to illustrate app and browser tests

  @androidApp    
  Scenario: Search for a mobile phone and add it to cart
    Given I launch the Amazon app
  
  @androidApp123
  Scenario: Search for a mobile phone and add it to cart
    Given I launch the Amazon app
    When I tap the search box
    And I enter "iPhone 15"
    And I submit the search
    Then I should see the search results
    And I should see "iPhone" in the results
    When I select an iPhone from the results
    Then I should see the product details
    And I should see the product price
    When I add the product to the cart
    Then the cart should contain the selected product