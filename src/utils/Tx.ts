import {ConsoleOutput} from "../config/ConsoleOutput";

/**
 * Expect disabler! use this to disable a test
 */
export class tx {

    /**
     * Modifies a expect to now use a console output instead ignoring the test
     * @param prom
     * @param message
     */
    public static async expect(prom: any, message: string): Promise<void> {
        ConsoleOutput.disabledTestGlobal(message);
    }

}
