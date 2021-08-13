import chalk from "chalk";
import * as fs from "fs";
import {FileLogger} from "./FileLogger";
import {Main} from "./TestMain";
import {ConsoleOutput} from "./ConsoleOutput";


export enum TestCaseRunnerLogType {
    when = 0,
    xwhen = 2,
    it = 1
}

export type TestCaseRunnerLog = {
    indentation: number;
    type: TestCaseRunnerLogType;
    message: string;

}

/**
 * A basic testcase result. Includes it method to run the when stated before and display the it message once it runs correctly
 */
export class BasicTestCaseResult {

    /**
     * Runs the WHEN stated before this it method and returns itself
     * @param messages
     */
    public async it(... messages: string[]): Promise<BasicTestCaseResult> {
        return this;
    }
}
/**
 * A testcase result containing the IT method to display the success message result
 * Handles printing of its
 */
export class TestCaseResult extends BasicTestCaseResult {

    /**
     *
     * @param runningTest
     * @param tcr
     */
    constructor(private readonly runningTest: Promise<void>, private tcr: TestCaseRunner) {
        super();
    }

    /**
     * Runs the WHEN method before this IT was called and prints out the result inside the IT
     * @param messages
     */
    public async it(... messages: string[]) {

        await this.runningTest.then(() => {
            const global = !this.tcr.consoleOutput;
            this.tcr.indentation--;


            for(const i in messages) {
                const newIt: TestCaseRunnerLog = {
                    indentation: this.tcr.indentation,
                    type: TestCaseRunnerLogType.it,
                    message: messages[i]
                };
                this.tcr.log.push(newIt);
                if (!Main.runningMultipleTests) {
                    this.tcr.printIt(newIt);
                }
            }
        });

        return this;
    }

}

/**
 * TestCaseRunner handles the When method.
 * When is called when an action is taken with an assertion inside, followed up by IT showing the expected result
 * It also handles the output log for a test to print out at test execution ended.
 */
export class TestCaseRunner {

    public consoleOutput: ConsoleOutput;

    public indentation = 0 ;

    public log: TestCaseRunnerLog[] = [];

    public logger = new FileLogger();



    /**
     * Used to exclude the test
     * @param describeMessage
     * @param functionToRun
     */
    public xwhen(describeMessage: string, functionToRun: () => Promise<any>): BasicTestCaseResult {
        const newWhen: TestCaseRunnerLog= {
            indentation: this.indentation,
            type : TestCaseRunnerLogType.xwhen,
            message: describeMessage
        };
        if(!Main.runningMultipleTests){
            this.printXWhen(newWhen);
        }
        this.log.push(newWhen);
        this.indentation++;
        const tcr = new BasicTestCaseResult();
        return tcr;
    }

    /**
     * Used to describe a set of actions to run with a brief description
     * This will run after the IT is called later
     * @param describeMessage
     * @param functionToRun
     */
    public when(describeMessage: string, functionToRun: () => Promise<any>): BasicTestCaseResult {
        const newWhen: TestCaseRunnerLog= {
            indentation: this.indentation,
            type : TestCaseRunnerLogType.when,
            message: describeMessage
        };
        if(!Main.runningMultipleTests){
            this.printWhen(newWhen);
        }
        this.log.push(newWhen);
        this.indentation++;
        const tcr = new TestCaseResult(functionToRun(), this);
        return tcr;
    }

    /**
     * Prints the when message
     * @param when
     * @param avoidSpacing
     * @param logger
     */
    public printWhen(when: TestCaseRunnerLog, avoidSpacing = false, logger: FileLogger|null = null){
        if(!avoidSpacing){
            console.log(chalk.green(""));
        }
        this.consoleOutput.startedTest(`${this.getIndentation(when.indentation)}When : ${when.message}`, logger);

        if(!avoidSpacing){
            console.log(chalk.green(""));
        }
    }

    /**
     * Prints the disabled when message
     * @param when
     * @param avoidSpacing
     */
    public printXWhen(when: TestCaseRunnerLog, avoidSpacing = false, logger: FileLogger|null = null ){
        if(!avoidSpacing){
            console.log(chalk.green(""));
        }

        this.consoleOutput.excludedTest(`${this.getIndentation(when.indentation)}XWhen : ${when.message}`, logger);

        if(!avoidSpacing){
            console.log(chalk.green(""));
        }
    }

    /**
     * Prints the it
     * @param it
     * @param avoidSpacing
     */
    public printIt(it: TestCaseRunnerLog, avoidSpacing = false, logger: FileLogger|null = null){
        if(!avoidSpacing){
            console.log(chalk.green(""));
        }

        if (it.message && it.message.length > 0) {
            this.consoleOutput.successfulTest(`${this.getIndentation(it.indentation)}It : ${it.message}`,logger);
        }

        if(!avoidSpacing){
            console.log(chalk.green(""));
        }
    }

    /**
     * Sets this console output instance
     * @param consoleOutput
     */
    public constructor(consoleOutput: ConsoleOutput) {
        this.consoleOutput = consoleOutput;


    }

    /**
     * Gets the actual indentation for printing
     * @param override
     */
    public getIndentation(override: number =null): string {
        let indt= "";
        const amount = override ? override : this.indentation;
        for(let i = 0 ; i < amount ; i++){
            indt+="    ";
        }
        return indt;
    }

    /**
     * Prints the test log gathered for this test
     */
    public printTestLog(saveToFile = false): void {

        const logger =  saveToFile ? this.logger: null;
        if(logger){
            logger.saveToFile=true;
        }
        if(saveToFile){
            logger.log((""));
            logger.log((""));
            logger.log((""));
            logger.log((`TEST RESULT FOR : ${this.consoleOutput.parentTestMeta.ID}`));
            logger.log(("------------------------------------------------------------------------------------"));
            logger.log((""));
        }else{
            console.log((""));
            console.log((""));
            console.log((""));
            console.log((`TEST RESULT FOR : ${this.consoleOutput.parentTestMeta.ID}`));
            console.log(("------------------------------------------------------------------------------------"));
            console.log((""));
        }

        for(const i in this.log){
            const tlog = this.log[i];
            if(tlog.type === TestCaseRunnerLogType.when){
                this.printWhen(tlog,true,logger);
            }
            else
            if (tlog.type === TestCaseRunnerLogType.xwhen) {
                this.printXWhen(tlog, true,logger);
            }
            else
            if (tlog.type === TestCaseRunnerLogType.it) {
                this.printIt(tlog, true,logger);
            }
        }

        if(saveToFile){
            logger.log((""));
            logger.log((""));
            logger.log((""));
            logger.log(("- TEST LOG ENDED -"));
            logger.log(("------------------------------------------------------------------------------------"));
        }else{
            console.log((""));
            console.log((""));
            console.log((""));
            console.log(("- TEST LOG ENDED -"));
            console.log(("------------------------------------------------------------------------------------"));
        }
        if(logger){
            logger.writeFile();
        }
    }

    public printRequests(requestLogger: RequestLogger,name: string): void {
         if(!fs.existsSync("logs/requests")){
             fs.mkdirSync("logs/requests");
         }
         const filename = `logs/requests/${name}.txt`;
         if(fs.existsSync(filename)){
             fs.unlinkSync(filename);
         }
         for(let i in requestLogger.requests){
             fs.appendFileSync(filename,"\n\n"+JSON.stringify(requestLogger.requests[i]));
         }
    }
}
