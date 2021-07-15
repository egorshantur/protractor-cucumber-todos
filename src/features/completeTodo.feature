Feature: Complete Todo

    Background: Create todo
        Given I open the url "https://todomvc.com/examples/angular2/"
            And I add Todo "Todo A"

    @positive
    Scenario: Verify that User is able to toggle Todo
        Then I expect that Todo "Todo A" is not selected
            And I expect that number of items left is equal to 1
            And I expect that Todo "Todo A" has no "line-through" text decoration
        When I toggle Todo "Todo A"
        Then I expect that Todo "Todo A" is selected
            And I expect that number of items left is equal to 0
            And I expect that Todo "Todo A" has "line-through" text decoration
        When I toggle Todo "Todo A"
        Then I expect that Todo "Todo A" is not selected
            And I expect that number of items left is equal to 1
            And I expect that Todo "Todo A" has no "line-through" text decoration

    @positive
    Scenario: Verify that User is able to clear multiple completed todos
        Then I expect that [Clear completed] button is not displayed
        When I toggle Todo "Todo A"
        Then I expect that [Clear completed] button is displayed
        When I add Todo "Todo B"
            And I toggle Todo "Todo B"
        Then I expect that Todo "Todo B" is selected
        When I add Todo "Not Completed Todo"
            And I click [Clear completed] button
        Then I expect that [Clear completed] button is not displayed
            And I expect that Todo "Todo A" is not displayed
            And I expect that Todo "Todo B" is not displayed
            And I expect that Todo "Not Completed Todo" is displayed
            And I expect that Todos' count is equal to 1
            And I expect that number of items left is equal to 1