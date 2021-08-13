/* eslint-disable no-undef */
import chalk from "chalk";
import {ConsoleOutput} from "./ConsoleOutput";
import {RequestHookTimestamper} from "./RequestHookTimestamper";
import {TestCaseRunner} from "./TestCaseRunner";
import {Main} from "./TestMain";
import {IBasicTest} from "../tests/IBasicTest";
import {Environments, Envs} from "./TestEnvironments";
import {ClientFunction, RequestLogger} from "testcafe";
import { EnvironmentUtils } from './EnvironmentUtils'
interface ISuitesMap {[key: string]: string[]}


/**
 * Represents all suites to run
 */
export class Suites {

    /**
     * Suites available to run, edit this to add new tests
     */
    public static suites: ISuitesMap = {
        oldUI : [
          "src/tests/monitors/MonitorSuite.ts",
          "src/tests/Locations/LocationsSuite.ts"
        ],
        newUI: [
          "src/tests/NewUI/TestJustLoginNew.ts",
          "src/tests/NewUI/LandingSuite.ts",
          "src/tests/NewUI/MonitoringSuite.ts",
          "src/tests/NewUI/UploadSuite.ts"
        ],
        all: [
            "src/tests/TestJustLogin.ts",
            "src/tests/monitors/MonitorSuite.ts",
            "src/tests/Locations/LocationsSuite.ts",
            "src/tests/NewUI/TestJustLogin.ts",
            "src/tests/NewUI/MonitoringSuite.ts",
            "src/tests/NewUI/UploadSuite.ts"            
          ],
        local: [
            "src/tests/local/Local.ts"      
          ],
    };

    /**
     * Runs the test
     * @param currTest
     */
    public static async runTest(currTest: IBasicTest): Promise<void> {


        const env = EnvironmentUtils.getEnv();

        console.log(chalk.green("Running test on: " + env));

        currTest.consoleOutput = new ConsoleOutput(currTest.meta);
        currTest.testCaseRunner = new TestCaseRunner(currTest.consoleOutput);

        // @ts-ignore
        Main.env = Envs[env];
        if(!Main.env){
            console.error(`No env corresponds to ${env} in Envs`);
        }
        const page = Environments[env].baseUrl;

        if (!Main.env) {
            console.error(chalk.red("SET ALL ENV VARS!"));
            process.exit(1);
        }

        process.env.SAUCE_JOB = currTest.meta.ID;

        fixture `New Fixture`
            .page(page)
            


        if (!Main.env) {
            console.error(chalk.red("SET ALL ENV VARS!"));
            process.exit(1);
        }

        // process.env.SAUCE_JOB = currTest.meta.ID;

        currTest.requestLogger = RequestLogger(request => {
            if(request.url.indexOf(".js") !== -1){
                return false;
            }
            if(request.url.indexOf(".png") !== -1){
                return false;
            }
            if(request.url.indexOf(".jpeg") !== -1){
                return false;
            }
            if(request.url.indexOf(".css") !== -1){
                return false;
            }
            if(request.method === "post" || request.method === "put" || request.method === "delete"){
                if(request.url.indexOf("anypoint.mulesoft.com") !== -1){
                    return true;
                }
            }
            return false;
        }, {logResponseBody: true,stringifyResponseBody:true,stringifyRequestBody:true, logResponseHeaders : true, logRequestHeaders : true, logRequestBody : true});


        test(currTest.meta.ID, async (t) => {
            await Main.initT(t);
            await this.setDialogHandler(t);
            await currTest.runTest();
        }).requestHooks([new RequestHookTimestamper(),currTest.requestLogger]).meta(currTest.meta).before(async (ctx) => {
            if(process.env.BROWSER && process.env.BROWSER.indexOf("edge") !== -1){
                console.log("Reloading page");

                const clientFunction = ClientFunction(() => {
                    setTimeout(window.location.reload,5000);
                    return true;
                });
                await ctx.expect(await clientFunction()).ok();

            }
        }).after(async (ctx) => {
            Main.testCaseRunners.push(currTest.testCaseRunner);
            if(!Main.runningMultipleTests){
                currTest.testCaseRunner.printTestLog(false);
            }
            currTest.testCaseRunner.printRequests(currTest.requestLogger,currTest.meta.ID);
        });


    }

    /**
     * Sets the diaog handler to testcafe
     * This will click OK if a dialog appears such as an ALERT
     * @param t
     */
    // @ts-ignore
    public static async setDialogHandler(t): Promise<void> {
        // @ts-ignore
        await t.setNativeDialogHandler((type, text, options) => {
            console.log("DIALOG WAS CREATED");
            console.log("DIALOG TEXT WAS : " + text);
            console.log("DEFAULT OPTION IS ACCEPT");
            return true;
        });
    }

}
