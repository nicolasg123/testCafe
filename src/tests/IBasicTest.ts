import {ConsoleOutput} from "../config/ConsoleOutput";
import {TestCaseRunner} from "../config/TestCaseRunner";

/**
 * Basic Test interface
 */
export interface IBasicTest {
    /**
     * Metadata for the test, usually used in saucelabs
     */
    meta: TestMeta;
    consoleOutput: ConsoleOutput;
    testCaseRunner: TestCaseRunner;
    requestLogger: RequestLogger;

    /**
     * Method implemented to run the test
     * @param projectManager
     */
    runTest(): Promise<any>;

}

/**
 * Defines a severity for the test...
 */
export enum TestMetaSeverity {
    blocker,
    critical,
    normal,
    minor,
    trivial,
}

/**
 * Test metadata
 * Such as the one used by saucelabs
 */
export interface TestMeta {
    ID: string;
    SEVERITY: TestMetaSeverity;
    STORY: string;
    TEST_RUN: number;
    SAUCE_JOB: string;

}
