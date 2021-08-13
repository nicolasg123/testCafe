import {TestMeta} from "../tests/IBasicTest";
import {FileLogger} from "./FileLogger";

const chalk: any = require("chalk");

/**
 * Class that handles pretty infoPanel output
 * Usually used for steps on the test
 */
export class ConsoleOutput {

    /**
     * Indicates a test started
     * @param message
     */
    public static startedTestGlobal(message: string): void {
        console.log(chalk.yellow(`${message}`));
        console.log("");
    }

    /**
     * Indicates a successfull test
     * @param message
     */
    public static successfulTestGlobal(message: string): void {
        console.log(chalk.green(`${message}` + " ✓"));
        console.log("");
        console.log("");
        console.log("");
    }

    public parentTestMeta: TestMeta;

    /**
	 * Instantiates
	 * @param testMeta
	 */
    constructor(testMeta: TestMeta) {
    	this.parentTestMeta = testMeta;
    }

    /**
     * Indicates a test started
     * @param message
     */
    public  startedTest(message: string,logger: FileLogger|null = null): void {
        if(logger)
            logger.log((`(${this.parentTestMeta.ID})`) +  (` - ${message}`));

        // noinspection TypeScriptValidateJSTypes
        console.log(chalk.white.bgBlack(`(${this.parentTestMeta.ID})`) +  chalk.yellow(` - ${message}`));
    }

    /**
     * Indicates a successful test
     * @param message
     */
    public  successfulTest(message: string,logger: FileLogger|null = null): void {
        if(logger)
            logger.log((`(${this.parentTestMeta.ID})`) + (` - ${message}` + " ✓"));

        // noinspection TypeScriptValidateJSTypes
        console.log(chalk.white.bgBlack(`(${this.parentTestMeta.ID})`) + chalk.green(` - ${message}` + " ✓"));
    }

    /**
     * Indicates an excluded test
     * @param message
     */
    public  excludedTest(message: string, logger: FileLogger|null = null): void {

        if(logger)
            logger.log((`(${this.parentTestMeta.ID})`) + (` - ${message}`));

        // noinspection TypeScriptValidateJSTypes
        console.log(chalk.white.bgBlack(`(${this.parentTestMeta.ID})`) + chalk.grey(` - ${message}`));
    }

    /**
     * Indicates a test failed!
     * @param message
     */
    public  failedTest(message: string): void {
    	console.log(chalk.red(`(${this.parentTestMeta.ID}) - ${message}` + "x"));
    	console.log("");
    	console.log("");
    	console.log("");

    }

    /**
     * Indicates a disabled test
     * @param message
     */
    public  disabledTest(message: string): void {
    	console.debug(chalk.gray(`(${this.parentTestMeta.ID}) - ${message}` + " disabled ¯\\_(ツ)_/¯  "));
    	console.log("");
    	console.log("");
    	console.log("");
    	console.log("");

    }

    /**
     * Indicates a disabled test
     * @param message
     */
    public static disabledTestGlobal(message: string): void {
        console.debug(chalk.gray(`${message}` + " disabled ¯\\_(ツ)_/¯  "));
        console.log("");
        console.log("");
        console.log("");
        console.log("");

    }
}
