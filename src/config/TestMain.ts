import chalk from "chalk";
import {create} from "domain";
import * as fs from "fs";
import {t} from "testcafe";
import {getRunnableBrowser} from "./BrowsersAvailable";
import {TestCaseRunner} from "./TestCaseRunner";
import {Envs} from "./TestEnvironments";
import createTestCafe from "testcafe";
import { EnvironmentUtils } from './EnvironmentUtils'

export class Main {

    public static t: TestController;
    public static env: Envs;

    public static runningMultipleTests = false;

    public static testCaseRunners: TestCaseRunner[] = [];


    public static testsArray: string[] = [];

    public static lastTestIdRan = 0;

    public static testResults: Array<number> = [];

    public static concurrencyN =  process.env.CONCURRENCY ? process.env.CONCURRENCY : 1;

    public static testsRunning = 0;
    /**
     * Inits the T variable and resizes the window
     * @param testController
     */
    public static async initT(testController: TestController): Promise<void> {
        await t.setPageLoadTimeout(150000);
        await t.maximizeWindow();
        Main.t = testController;
    }

    static setRunningMultipleTests(nTests: number): void {
        Main.runningMultipleTests = nTests > 1 ? true : false;

        if(Main.runningMultipleTests){
            console.log(chalk.bold.yellow(""));
            console.log(chalk.bold.yellow("RUNNING MORE THAN ONE TEST"));
            console.log(chalk.bold.yellow("SHOWING TEST LOGS AT END OF EACH RUN"));
            console.log(chalk.bold.yellow(""));
        }
    }

    /**
     * Sets the env type
     * @param env
     */
    static setEnv(env: Envs): void {
        switch (env) {
            case Envs.devx:
                Main.env = Envs.devx;
                break;
            case Envs.qax:
                Main.env = Envs.qax;
                break;
            case Envs.stgx:
                Main.env = Envs.stgx;
                break;
            case Envs.prod:
                Main.env = Envs.prod;
                break;
            case Envs.eu1:
                Main.env = Envs.eu1;
                break;
            case Envs.devLocal:
                Main.env = Envs.devLocal;
                break;
            case Envs.qaLocal:
                Main.env = Envs.qaLocal;
                break;
        }
    }

    static checkEnvVariables(): void {
        console.log("");
        console.log("");
        console.log("Checking ENV Vars...");
        const exist = [];
        exist.push(Main.checkVar("ENV"));
        exist.push(Main.checkVar("BROWSER"));
        exist.push(Main.checkVar("BAT_AUTOMATION_PASSWORD"));
        // exist.push(Main.checkVar("SUITE"));
        // exist.push(Main.checkVar("QA_AUTOMATION_PASSWORD"));
        if(exist.indexOf(false) !== -1){
            console.error(chalk.red("Missing env VARS, exiting..."));
            process.exit(500);
        }

        console.log("");
        console.log("");
    }

    private static checkVar(envVar: string): boolean {
        const exists =  !(typeof process.env[envVar] === "undefined");
        if(!exists){
            console.error(chalk.red("YOU ARE MISSING THE ", envVar, " VARIABLE IN YOUR ENVIRONMENT, PLEASE CREATE IT!"));
        }
        return exists;
    }

    static initFileLogs(): void {
        if(!fs.existsSync("lodgs")){
            fs.mkdirSync("logs");
        }
        if(fs.existsSync("logs/testlog.log")){
            fs.unlinkSync("logs/testlog.log");
        }
    }

    public static startNextTest(options: {
        browser: string; selectorTimeout: number;allure: boolean; screenshots: boolean;assertionTimeout: number;videos: boolean; }): CreateTestResult{
        const idTest = Main.lastTestIdRan;

        const createTestResult: CreateTestResult = {
            finishedRun: false,
            addedTest:false,
            testPromise:undefined
        };

        if(this.testsRunning >= this.concurrencyN){
            return createTestResult;
        }
        let testcafe ;
        if(typeof Main.testsArray[idTest] !== "undefined"){     // If i have a test to run
            const src = Main.testsArray[idTest];
            const env = EnvironmentUtils.getEnv();
            this.testsRunning ++;       //Add a test running to counter...
            const promise: Promise<number> = new Promise( (resolve) => {        //Create the promise of a running instance
                createTestCafe()
                    .then((tc) => {
                        testcafe = tc;
                        const testName = src.split("/")[src.split("/").length - 1].replace(".ts","");
                        let testcafeRunner = testcafe
                            .createRunner()
                            .src(src)
                            .browsers(getRunnableBrowser(options.browser));
                        if(options.videos){
                            // noinspection TypeScriptValidateJSTypes
                            testcafeRunner = testcafeRunner.video("videos/", {
                                singleFile: false,
                                failedOnly: false,
                                pathPattern: env+"-"+testName+".mp4"
                            },
                              {
                                vcodec : "libx264",
                                crf : 27,
                                preset : "superfast",
                                s : "1920x1080"
                            });
                        }
                        if(options.screenshots){    // IF screenshots allowed add screenshots
                            testcafeRunner = testcafeRunner.screenshots({
                                path : "./screenshots/",
                                pathPattern: "test-"+env+"-"+testName+"_${USERAGENT}.png",
                                takeOnFails:true});
                        }
                        return testcafeRunner.run({       //Finnally run the instance
                            skipJsErrors: true,
                            pageLoadTimeout: 120000,
                            selectorTimeout: options.selectorTimeout,
                            assertionTimeout: options.assertionTimeout

                        });
                    })
                    .then((failedCount) => {    // When execution of test finishes, resolve and clear a space for a running test
                        this.testsRunning--;
                        this.testResults.push(failedCount);
                        resolve(failedCount);
                    })
                  .catch((error)=>{
                        console.error(error);
                        this.testsRunning--;
                        this.testResults.push(1);
                        resolve(1);

                    });
            });
            this.lastTestIdRan ++;      //Increment next test by 1
            createTestResult.addedTest = true;
            createTestResult.testPromise = promise;
            createTestResult.finishedRun = false;
        }else{
            createTestResult.finishedRun = true;    //If no test to run , we should return the finished run property
        }

        return createTestResult;

    }

    public static finishedTestRun(): void {
        const testResults = Main.testResults;
        let failedCount = 0;
        for(const i in testResults){
            failedCount += testResults[i];
        }

        console.log("------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
        console.log("------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
        console.log("------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
        console.log("------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
        console.log("TEST LOGS : ");
        for(const l in Main.testCaseRunners){
            Main.testCaseRunners[l].printTestLog(true);
        }
        console.log("------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
        console.log("------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
        console.log("------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
        console.log("------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------");

        console.log("Tests failed: " + failedCount);


        if (failedCount > 0) {
            process.exit(1);
        }else{
            process.exit(0);
        }

    }


}

export class CreateTestResult{

    public addedTest = false;
    public testPromise: Promise<number> | undefined = undefined;
    public finishedRun = false;

}
