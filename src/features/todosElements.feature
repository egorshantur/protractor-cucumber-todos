Feature: Elements on Main Todos page

    Background: Open todos
        Given I open the url "https://todomvc.com/examples/angular2/"

    @positive
    Scenario: Verify the default state of elements on Todos page
        Then I expect that Title is equal to "todos"
            And I expect that [New Todo] input is displayed
            And I expect that [New Todo] input is enabled
            And I expect that [New Todo] input is empty
            And I expect that [New Todo] input has placeholder "What needs to be done?"

    @positive
    Scenario: Verify Footer Text
        And I expect that Footer text is equal to:
            """
            Double-click to edit a todo
            Created by Sam Saccone and Colin Eberhardt using Angular2
            Part of TodoMVC
            """

    @positive
    Scenario Outline: Verify Footer link: <linkText>
        And I expect that Footer text "<linkText>" is a link to "<href>"

        Examples:
            | linkText        | href                             |
            | Sam Saccone     | http://github.com/samccone       |
            | Colin Eberhardt | http://github.com/colineberhardt |
            | Angular2        | http://angular.io/               |
            | TodoMVC         | http://todomvc.com/              |