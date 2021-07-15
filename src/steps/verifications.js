const expect = require('chai').expect;
let { Then, setDefaultTimeout } = require('@cucumber/cucumber');
const HomePage = require("../pageobjects/pages/home.page");

// globally set steps timeout to 60000 milliseconds
setDefaultTimeout(60 * 1000);

/**
 * Verify Footer text
 * 
 * EXAMPLES:
 * I expect that Footer text is equal to:
 * """"
 *  Expected text here
 * """"
 * 
 * @param expectedText - expected footer text, should be passed as Doc Strings
 * 
 */
Then(/^I expect that Footer text is equal to:$/, async (expectedText) => {
    const footerElement = HomePage.Footer.footer;
    const footerText = await footerElement.getText();

    expect(footerText).to.equal(expectedText);
});

/**
 * Verify link's href in the footer
 * 
 * EXAMPLES:
 * I expect that Footer text "Angular2" is a link to "http://angular.io/"
 * 
 * @param linkText - link text
 * @param href - expected href value
 * 
 */
Then(/^I expect that Footer text "([^"]*)" is a link to "([^"]*)"$/, async (linkText, href) => {
    const actualLinkHREF = await HomePage.Footer.getFooterLinkByText(linkText);

    expect(actualLinkHREF).to.equal(href);
});

/**
 * Verify Todo with specific text is (not) displayed, selected
 * 
 * EXAMPLES:
 * I expect that Todo "Todo A" is displayed
 * I expect that Todo "Todo A" is not displayed
 * I expect that Todo "Todo A" is selected
 * I expect that Todo "Todo A" is not selected
 * 
 * @param todoText - todo text
 * @param not - optional
 * @param expectedState - expected state of Todo, can be one of the following: displayed, selected
 * 
 */
Then(/^I expect that Todo "([^"]*)" is (not )?(displayed|selected)$/, async (todoText, not, expectedState) => {
    let actual;
    switch (expectedState) {
        case 'displayed':
            actual = await HomePage.todo(todoText).isDisplayed();
            break;
        case 'selected':
            actual = await HomePage.todo(todoText).isSelected();
            break;
        
        default:
            throw new Error(`${expectedState} is not supported`)
    }
    const expected = not ? false : true;

    expect(actual).to.equal(expected);
});

/**
 * Verify count of displayed Todos
 * 
 * EXAMPLES:
 * I expect that Todos' count is equal to 3
 * 
 * @param expectedCount - expected count of displayed Todos
 * 
 */
Then(/^I expect that Todos' count is equal to (\d+)$/, async (expectedCount) => {
    const actualCount = await HomePage.getTodosListCount();

    expect(actualCount).to.equal(expectedCount);
});

/**
 * Verify [New Todo] input is displayed or is enabled or is empty
 * 
 * EXAMPLES:
 * I expect that [New Todo] input is displayed
 * I expect that [New Todo] input is enabled
 * I expect that [New Todo] input is empty
 * 
 * @param expectedState - expected state [New Todo] input, can be one of the following: displayed, enabled, empty
 * 
 */
Then(/^I expect that \[New Todo\] input is (displayed|enabled|empty)$/, async (expectedState) => {
    const elem = HomePage.newTodoInput;
    let actual;
    switch (expectedState) {
        case 'displayed':
            actual = await elem.isDisplayed();
            break;
        case 'enabled':
            actual = await elem.isEnabled();
            break;
        case 'empty':
            actual = await elem.getAttribute('value') === '' ? true : false;
            break;
        
        default:
            throw new Error(`${expectedState} is not supported`)
    }

    expect(actual).to.equal(true, `[New Todo] input is not ${expectedState}`);
});

/**
 * Verify placeholder of New Todo input
 * 
 * EXAMPLES:
 * I expect that [New Todo] input has placeholder "What needs to be done?"
 * 
 * @param expectedPlaceholder - expected placeholder
 * 
 */
Then(/^I expect that \[New Todo\] input has placeholder "([^"]*)"$/, async (expectedPlaceholder) => {
    const actualPlaceholder = await HomePage.newTodoInput.getAttribute('placeholder');

    expect(actualPlaceholder).to.equal(expectedPlaceholder);
});

/**
 * Verify title text
 * 
 * EXAMPLES:
 * I expect that Title is equal to "todos"
 * 
 * @param expected - expected title
 * 
 */
Then(/^I expect that Title is equal to "([^"]*)"$/, async (expected) => {
    const actual = await HomePage.title.getText();

    expect(actual).to.equal(expected);
});


/**
 * Verify [Clear completed] button is (not) displayed
 * 
 * EXAMPLES:
 * I expect that [Clear completed] button is displayed
 * I expect that [Clear completed] button is not displayed
 * 
 */
 Then(/^I expect that \[Clear completed\] button is (not )?displayed$/, async (not) => {
    const actual = await HomePage.clearCompletedButton.isPresent() ? await HomePage.clearCompletedButton.isDisplayed() : false;  
    const expected = not ? false : true;

    expect(actual).to.equal(expected);
});

/**
 * Verify number in the 'items left' text
 * 
 * EXAMPLES:
 * I expect that number of items left is equal to 3
 * 
 * @param expected - number of items
 * 
 */
 Then(/^I expect that number of items left is equal to (\d+)$/, async (expected) => {
    const actual = parseInt(await HomePage.todoCountNumber.getText()); 

    expect(actual).to.equal(expected);
});

/**
 * Verify Todo's text decoration
 * 
 * EXAMPLES:
 * I expect that Todo "Todo A" has "line-through" text decoration
 * I expect that Todo "Todo A" has no "line-through" text decoration
 * 
 * @param todoText - todo text
 * @param expectedTextDecoration - expected text decoration style
 * 
 */
Then(/^I expect that Todo "([^"]*)" has (no )?"([^"]*)" text decoration$/, async (todoText, not, expectedTextDecoration) => {
    const actual = await HomePage.todo(todoText).getTextDecoration();
    if (not) {
        expect(actual).to.not.equal(expectedTextDecoration);
    } else {
        expect(actual).to.equal(expectedTextDecoration);
    }
});

/**
 * Verify count of displayed Edit Todo inputs
 * 
 * EXAMPLES:
 * I expect that count of displayed Edit Todo inputs is equal to 1
 * 
 * @param expectedCount - expected count of displayed Edit Todo inputs
 * 
 */
 Then(/^I expect that count of displayed Edit Todo inputs is equal to (\d+)$/, async (expectedCount) => {
    const editTodoInputsLocator = HomePage.todo().editTodoInput().locator().value;
    const actualCount = await $$(editTodoInputsLocator).count();

    expect(actualCount).to.equal(expectedCount);
});