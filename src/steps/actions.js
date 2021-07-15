let { When, Given, setDefaultTimeout } = require('@cucumber/cucumber');
const HomePage = require("../pageobjects/pages/home.page");

// globally set steps timeout to 60000 milliseconds
setDefaultTimeout(60 * 1000);

/**
 * Todo actions. Supported options: add, click, double click, toggle, delete
 * 
 * EXAMPLES:
 * I add Todo "Todo A"
 * I click Todo "Todo A"
 * I double click Todo "Todo A"
 * I toggle Todo "Todo A"
 * I delete Todo "Todo A"
 * 
 * @param action - one of the following: add, click, double click, toggle, delete
 * @param todoText - todo text
 */
When(/^I (add|click|double click|toggle|delete) Todo "([^"]*)"$/, async (action, todoText) => {
    switch (action) {
        case 'add':
            await HomePage.todo(todoText).add();
            break;
        case 'click':
            await HomePage.todo(todoText).click();
            break;
        case 'double click':
            await HomePage.todo(todoText).doubleClick();
            break;
        case 'toggle':
            await HomePage.todo(todoText).toggle();
            break;
        case 'delete':
            await HomePage.todo(todoText).delete();
            break;

        default:
            throw new Error(`${action} is not supported`)
    }
});

/**
 * Add or set a value for Todo
 * 
 * EXAMPLES:
 * I add "_updated" for Todo "Todo A"
 * I set "New_value" for Todo "Todo A"
 * 
 * @param action - add (will add value to old one) or set (will replace value with new one)
 * @param newText - text that should be added or set
 * @param todoText - original todo text
 */
When(/^I (add|set) "([^"]*)" for Todo "([^"]*)"$/, async (action, newText, todoText) => {
    await HomePage.todo(todoText).doubleClick();

    switch (action) {
        case 'add':
            await HomePage.todo(todoText).addText(newText);
            break;
        case 'set':
            await HomePage.todo(todoText).setNewText(newText);
            break;

        default:
            throw new Error(`${action} is not supported`)
    }
});

/**
 * Clicks New Todo input to set focus
 * 
 * EXAMPLES:
 * I set focus in New Todo input
 * 
 */
When(/^I set focus in New Todo input$/, async () => {
    await HomePage.newTodoInput.click();
});

/**
 * Navigate to the url
 * 
 * EXAMPLES:
 * I open the url "https://todomvc.com/examples/angular2/"
 * 
 * @param url - url to navigate
 */
Given(/^I open the url "([^"]*)"$/, async (url) => {
    await browser.get(url);
});

/**
 * Press key
 * 
 * EXAMPLES:
 * I press "ENTER" in Edit Todo input
 * 
 * @param key - key to press, list of supported keys https://github.com/SeleniumHQ/selenium/blob/d943ee2950e25a2f4a3492058107cfd005d6f7fd/javascript/node/selenium-webdriver/lib/input.js#L44
 */
When(/^I press "([^"]*)" in Edit Todo input$/, async (key) => {
    await HomePage.todo().editTodoInput().sendKeys(protractor.Key[key]);
});

/**
 * Clear text in Edit Todo input
 * 
 * EXAMPLES:
 * I clear text in Edit Todo input
 * 
 */
When(/^I clear text in Edit Todo input$/, async () => {
    await HomePage.todo().clear();
});

/**
 * Click Clear completed button
 * 
 * EXAMPLES:
 * I click [Clear completed] button
 * 
 */
 When(/^I click \[Clear completed\] button$/, async () => {
    await HomePage.clearCompletedTodos();
});