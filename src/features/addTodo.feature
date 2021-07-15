Feature: Add Todo

    Background: Open todos
        Given I open the url "https://todomvc.com/examples/angular2/"

    Scenario Outline: Verify that User is able to add Todo with <description>
        When I add Todo "<value>"
        Then I expect that Todo "<value>" is displayed
            And I expect that Todos' count is equal to 1
            And I expect that number of items left is equal to 1

        @positive
        Examples:
            | description             | value  |
            | alphabetical characters | Todo A |

        @negative
        Examples:
            | description        | value                     |
            | special characters | !@#$%^&*():'/*-+~!.<><--! |

    @negative
    Scenario: Verify that User is not able to create empty Todo
        When I add Todo " "
        Then I expect that Todos' count is equal to 0