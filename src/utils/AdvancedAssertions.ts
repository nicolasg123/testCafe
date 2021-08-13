import {t} from "testcafe";
import {Main} from "../config/TestMain";

/**
 * Advanced assertions class,
 * methods such as contains partialclassname
 */
export class AdvancedAssertions {

    /**
     * Tries to match a selector with a partial classname. Checks each class if it contains the expected class.
     *
     * @param selector selector to check
     * @param expectedClass expected class to have (at least parcially)
     * @param shouldHaveClass make an expect on the result? If true it will create an expect inside..
     */
    public static containsPartialClassname(selector: Selector, expectedClass: string,
        shouldHaveClass: boolean|null = null): Promise<boolean> {
        return selector.filter(`[class*=${expectedClass}]`).exists;
    }

}
