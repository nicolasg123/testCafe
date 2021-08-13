import {Main} from "./src/config/TestMain";
import {Suites} from "./src/config/Suites";
process.setMaxListeners(99);

//Check env variables
Main.checkEnvVariables();
Main.initFileLogs();


const browser = process.env.BROWSER ? process.env.BROWSER : "chromeLocal";
const suite =  process.env.SUITE ? process.env.SUITE : "local"; 


console.log(suite) // Remove later

Main.testsArray = Suites.suites[suite];

const fs = require("fs");
const path = require("path");


// AllureEnvironment.generateAllureEnvironment();

console.log(Main.testsArray);
const nTests = Main.testsArray.length;
console.log("Testing in :" + (nTests * 1) + " instances");

Main.setRunningMultipleTests(nTests);


const promises: Array<Promise<any>> = [];

const testOptions = {
    selectorTimeout:120000,
    browser:browser,
    allure:true,
    screenshots:true,
    videos:true,
    assertionTimeout: 120000
}

// if(browser.indexOf("Saucelabs") !== -1){
//     testOptions.screenshots = false;
//     testOptions.videos = false;
// }

let waitingForPromises = false;

const addNewTest = () => {
    console.log("Adding new testcafe test...");
    const testResult = Main.startNextTest(testOptions);

    if(testResult.addedTest){
        console.log("Test added, running...");
        if(testResult.testPromise) {
            promises.push(testResult.testPromise);
            testResult.testPromise.then((testsFailed) => {
                setTimeout(addNewTest,5000);
            });
        }
    }

    if(testResult.finishedRun && !waitingForPromises){
        console.log("No more tests to run! :D");
        console.log("Waiting for remaining tests to finish...");

        waitingForPromises = true;
        Promise.all(promises).then(Main.finishedTestRun);
        return;
    }

};


console.log("Running with concurrency set to ",Main.concurrencyN);
for(let i = 0 ; i < Main.concurrencyN;i ++){
    setTimeout(addNewTest,1000 * i);
}
