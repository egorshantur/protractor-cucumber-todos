Feature: Edit Todo

    Background: Create Todo
        Given I open the url "https://todomvc.com/examples/angular2/"
        And I add Todo "Todo A"

    Scenario Outline: Verify that User is able to add <description> characters to existing Todo: <value>
        When I add "<value>" for Todo "Todo A"
        Then I expect that Todo "Todo A<value>" is displayed

        @positive
        Examples:
            | description  | value   |
            | alphabetical | updated |

        @negative
        Examples:            
            | description | value                     |
            | special     | !@#$%^&*():'/*-+~!.<><--! |

    @positive
    Scenario Outline: Verify that Todo deletes if clear Todo text and <description>
        When I double click Todo "Todo A"
            And I click Todo "Todo A"
            And I clear text in Edit Todo input
            And <actionStep>
        Then I expect that Todo "Todo A" is not displayed
            And I expect that Todos' count is equal to 0

        Examples:
            | description  | actionStep                         |
            | press Enter  | I press "ENTER" in Edit Todo input |
            | change focus | I set focus in New Todo input      |

    @negative
    Scenario: Verify User is unable to Edit multiple Todos at the same time
            And I add Todo "Todo B"
            And I double click Todo "Todo A"
            And I double click Todo "Todo B"
            And I expect that count of displayed Edit Todo inputs is equal to 1