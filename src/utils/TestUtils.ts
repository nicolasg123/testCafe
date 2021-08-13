/* eslint-disable @typescript-eslint/ban-ts-ignore */
import {ClientFunction, Selector, t} from "testcafe";
import {TestCaseRunner} from "../config/TestCaseRunner";

/**
 * Test utilitaries, such as sending keys to browser
 * get shadow doms, create random test names and such
 */
export class TestUtils {


    public static async makeId(length): Promise<string> {
        let result = ''
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
        const charactersLength = characters.length
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength))
        }
        return result
    }


    /**
     * Sends the keys given to the browser.
     *
     * @param value
     */
    public static async sendKeys(value: string): Promise<void> {
        let keysToPress = "";
        await value.split("").forEach(async (key) => {
            let keytopress = key;
            if (key === " ") {
                keytopress = "space";
            }
            keysToPress += " " + keytopress;
        });

        await t.pressKey(keysToPress, {speed: 0.8});
        return;
    }

    /**
     * Waits for a shadow dom element to exist, should be used by this class only
     * @param stringifiedShadow
     */
    private static async waitShadowElementExists(stringifiedShadow: string): Promise<void> {

        const waitForOutput = ClientFunction((selectorString: string, runShadowSelect: any) => {
            try {
                runShadowSelect(selectorString);
                return true;
            } catch (e) {
                console.log("ERROR");
                return false;
            }
        });
        await t.expect(waitForOutput(stringifiedShadow, this.runShadowSelect))
            .ok("Output failed to load", {timeout: 8000});
        return;
    }

    /**
     * TODO: Not working
     * @param fileName
     */
    public static async checkDownload(fileName: string): Promise<boolean> {
        await t.navigateTo(this.getDownloadPage());
        const downloadSel = Selector("a").withText(fileName);
        await t.expect(downloadSel.exists).ok(`File was not downloaded ${fileName}`);
        return true;
    }

    private static getDownloadPage(): string {
        const browser = process.env.BROWSER.toLowerCase();
        if (browser.includes("chrome")) {
            return "chrome://downloads/";
        }
        return "//downloads/";
    }
    /**
     * Runs a shadow selector (internal use)
     * @param selectorString shadow selector string (eg: api-infoPanel |> api-summary |> h1)
     */
    private static runShadowSelect(selectorString: string): ShadowRoot {
        const splitted = selectorString.split("");
        let firstSelector = "";

        let key = 0;
        let stillChecking = true;

        while (stillChecking) {
            const actualChar = splitted[key];
            if (actualChar === "|") {
                stillChecking = false;
                key += 2;
                break;
            }
            firstSelector += actualChar;
            key++;
        }

        // eslint-disable-next-line no-undef
        let chain = document.querySelector(firstSelector).shadowRoot;

        /**
         * Gets the next operator on the string
         * @param splittedStr
         * @param indx
         */
        function getNextOperator(splittedStr, indx): { newSelector: string; action: string; key: any } {
            const foundOperator = false;
            let newSelector = "";
            while (indx < splittedStr.length  && !foundOperator) {
                const char = splittedStr[indx];
                if (char === "|") {
                    indx += 2;
                    return {newSelector , action: "shadow", key: indx};
                } else if (char === ">") {
                    indx++;
                    return {newSelector , action: "inner", key: indx};
                }
                newSelector += char;
                indx++;
            }
            return {newSelector, key: indx, action: "null"};
        }

        let result = getNextOperator(splitted, key);

        while (result.key !== splitted.length - 1) {
            // eslint-disable-next-line no-undef
            if(chain instanceof ShadowRoot === false){
                chain = chain[0];
            }
            if (result.action === "shadow") {
                chain = chain.querySelectorAll(result.newSelector)[0].shadowRoot;
            } else if (result.action === "inner") {
                // @ts-ignore
                chain = chain.querySelectorAll(result.newSelector);
            } else if (result.action === "null") {
                // @ts-ignore
                chain = chain.querySelectorAll(result.newSelector);
            }

            if (result.key === splitted.length) {
                break;
            }
            result = getNextOperator(splitted, result.key);
        }

        // eslint-disable-next-line no-undef
        if(chain instanceof ShadowRoot === false && Array.isArray(chain) && chain.length === 1){
            chain = chain[0];
        }
        return chain;
    }

    /**
     * Gets a shadow element
     * @param selectorString
     */
    public static async getShadowElement(selectorString: string): Promise<Selector> {

        await this.waitShadowElementExists(selectorString);
        const runShadowSelect = this.runShadowSelect;
        let runShadowString = `${runShadowSelect.toString()}`;
        if (runShadowString.indexOf("function") !== 0) {
            runShadowString = `function ${runShadowString}`;
        }
        const selectorStringString = selectorString.toString();
        const init = (): any => {
            const selectorr = runShadowSelect(selectorString);
            return selectorr;
        };
        const initString = init.toString();

        init.toString =
            // language=JavaScript
            () => `
            () => {
              var selectorString = '${selectorStringString}';
              var initFunction = ${initString};
              var runShadowSelect = ${runShadowString};
              let el = initFunction();
              console.log(el);
              return el;
            }
        `;
        const selector = Selector(init);
        return selector;
    }

    /**
     * Creates a random name test, adds XXXXXXXX at the end of the name given
     * @param name
     */
    public static createRandomTestName(name: string): string {
        let testName = name;
        testName += Math.floor(Math.random() * 9999999999999 ).toString().padStart(10, "9");
        return testName;
    }

    /**
     * Reformats spaces given from the DOM to match regular spaces .
     * Used to check string returned by editor which usually uses custom space characters.
     * @param string
     */
    public static reformatSpaces(str): any {
        let fixedText = str;
        fixedText = fixedText.replace(/\s/g, " ");
        return fixedText;
    }

    /**
     * Gets the remaining days between two dates
     * @param today
     * @param limitDate
     */
    public static getRemainingDaysBetween(today: Date, limitDate: Date): any {
        const oneDay = 1000 * 60 * 60 * 24;    // Convert both dates to milliseconds
        const date1Ms = today.getTime();
        const date2Ms = limitDate.getTime();    // Calculate the difference in milliseconds
        const differenceMs = date2Ms - date1Ms;        // Convert back to days and return
        const daysRemaining =  Math.round(differenceMs / oneDay);
        return daysRemaining;
    }

    public static async waitForCondition(func: () => Promise<boolean>,time): Promise<boolean>{

        // eslint-disable-next-line no-async-promise-executor
        const promise: Promise<boolean> = new Promise(async (resolve) => {
            let timesTried = 0;
            let solved = false;
            while(timesTried < time / 1000 && !solved){
                const res = await func();
                if(res){
                    solved = true;
                    resolve(true);
                }else{
                    timesTried++;
                    await t.wait(1000);
                }
            }
            resolve(false);
        });

        return promise;

    }

}
