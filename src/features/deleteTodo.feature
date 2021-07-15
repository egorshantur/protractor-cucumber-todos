Feature: Delete Todo

    Background: Create todo
        Given I open the url "https://todomvc.com/examples/angular2/"
            And I add Todo "Todo A"
        Then I expect that Todo "Todo A" is displayed
            And I expect that Todos' count is equal to 1
          
    @positive
    Scenario: Verify that User is able to delete not completed Todo
        When I delete Todo "Todo A"
        Then I expect that Todo "Todo A" is not displayed
            And I expect that Todos' count is equal to 0

    @positive
    Scenario: Verify that User is able to delete completed Todo
        When I toggle Todo "Todo A"
            And I delete Todo "Todo A"
        Then I expect that Todo "Todo A" is not displayed
            And I expect that Todos' count is equal to 0