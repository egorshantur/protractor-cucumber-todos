# About
Created test project contains tests written on Protractor + Cucumber for Angular Todos application (https://todomvc.com/examples/angular2/). **Protractor** is an end-to-end test framework built specifically for Angular and AngularJS applications. **Page Object Model** implemented to keep code clean, easy to understand and optimized. All required actions and verifications are wrapped into Cucumber steps. Such approach allows the tester / business analyst to create test cases in simple text language (English). **Cucumber** acts as a bridge to overcome the gap between the technical & the non-technical members because the test cases are commonly written in simple text.

# Prerequisite
1. Protractor is a Node.js program. To run, you will need to have Node.js installed. Check the version of Node.js you have by running node --version. Should be > 12.x
1. This framework will set up a test using a local standalone Selenium Server to control browsers. You will need to have the Java Development Kit (JDK) installed to run the standalone Selenium Server. Check this by running java -version from the command line.

# How to run
1. Clone the git repo: `git clone git@github.com:egorshantur/protractor-cucumber-todos.git`
1. Install the dependencies: `npm install`
1. Start Selenium Server: `npm run start-webdriver` (This will start up a Selenium Server. Your Protractor test will send requests to this server to control a local browser. You can see information about the status of the server at http://localhost:4444/wd/hub.)

1. Start tests execution: `npm run e2e` (will execute all scenarios, execute this command in a separate terminal)

* `npm run e2e+ve` (will execute scenarios with "@positive" tag only)
* `npm run e2e-ve` (will execute scenarios with "@negative" tag only)

 NOTE: By default, tests will be executed in 2 parallel browser instances. Update `maxInstances` value in `protractor.config.js` to change the number of instances.

# Review the report
Test report will be generated once test execution is finished. Check the logs for the following line: `Cucumber HTML report ./reports/cucumber_report.html generated successfully`. Open that report to review execution results. There you can find all details about executed features, scenarios and steps. **Failed scenarios have attached screenshot**, so you can easily review and investigate the failure.
Please note, there are 2 test scenarios that are failing due to bugs in the app:
- Verify that Todo deletes if clear Todo text and change focus
- Verify User is unable to Edit multiple Todos at the same time


# Structure
* Test Scenarios split into Feature files by related functionality. All feature files are stored in `src/features` folder.  Negative and Positive scenarios marked with  `@negative` and `@positive` tags respectivly. 
* Page objects stored in `src/pageobjects` folder.
* Implemented Cucumber steps can by found in `src/steps` folder. There are `actions.js` file with action steps and `verifications.js` file with verification steps and expects. Each step contains full description, including examples and information about passed parameters. 

# Action steps examples:
* I open the url "https://todomvc.com/examples/angular2/"
* I add Todo "Todo A"
* I click Todo "Todo A"
* I double click Todo "Todo A"
* I toggle Todo "Todo A"
* I delete Todo "Todo A"
* I add "_updated" for Todo "Todo A"
* I set "New_value" for Todo "Todo A"
* I set focus in New Todo input
* I press "ENTER" in Edit Todo input
* I clear text in Edit Todo input
* I click [Clear completed] button

# Verification steps examples:
 * I expect that Footer text is equal to:
 <br>""""
 <br>Expected text here
 <br>""""
 * I expect that Footer text "Angular2" is a link to "http://angular.io/"
 * I expect that Todo "Todo A" is displayed
 * I expect that Todo "Todo A" is not displayed
 * I expect that Todo "Todo A" is selected
 * I expect that Todo "Todo A" is not selected
 * I expect that Todos' count is equal to 3
 * I expect that [New Todo] input is displayed
 * I expect that [New Todo] input is enabled
 * I expect that [New Todo] input is empty
 * I expect that [New Todo] input has placeholder "What needs to be done?"
 * I expect that Title is equal to "todos"
 * I expect that [Clear completed] button is displayed
 * I expect that [Clear completed] button is not displayed
 * I expect that number of items left is equal to 3
 * I expect that Todo "Todo A" has "line-through" text decoration
 * I expect that Todo "Todo A" has no "line-through" text decoration
 * I expect that count of displayed Edit Todo inputs is equal to 1