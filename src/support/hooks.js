const { After, Status } = require('@cucumber/cucumber');

/*
 * Attach screenshot if test failed
 */
After(async function (testCase) {
    if (testCase.result.status === Status.FAILED) {
        const screenshot = await browser.takeScreenshot();

        return this.attach(screenshot, 'image/png');
    }
});