const path = require("path");
const yargs = require("yargs").argv;
const fs = require('fs-extra');
const reporter = require('cucumber-html-reporter');

exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    baseUrl: '',
    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            args: ["window-size=1920,1080", "incognito"]
        },
        shardTestFiles: true,
        maxInstances: 2
    },
    specs: ['./src/features/*.feature'],
    restartBrowserBetweenTests: true,

    beforeLaunch: () => {
        const reportsFolder = path.join(process.cwd(), 'reports');

        if (fs.existsSync(reportsFolder)) {
            fs.removeSync(reportsFolder);
        }
        // create new folder for reports
        fs.mkdirSync(reportsFolder);
    },

    afterLaunch: function () {
        let options = {
            theme: 'bootstrap',
            jsonDir: './reports',
            output: './reports/cucumber_report.html',
            reportSuiteAsScenarios: true,
            launchReport: true,
            metadata: {
                "Browser": "Chrome",
                "Parallel": "Scenarios",
            }
        };

        reporter.generate(options);
    },
    params: {
        waitTimeout: 10000,
    },
    SELENIUM_PROMISE_MANAGER: false,
    cucumberOpts: {
        require: [
            'src/steps/*.js',
            'src/support/hooks.js',
        ],
        tags: [`${yargs.tag || "@positive or @negative"}`],
        format: ['json:reports/results.json', 'progress']
    },
    allScriptsTimeout: 60000,
    getPageTimeout: 60000,
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework')
};