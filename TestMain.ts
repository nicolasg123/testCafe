import {TestEnvironments} from "./Utils/TestEnvironments";

export class Main {

    public static t: TestController;
    public static env: TestEnvironments;

    public static async initT(testController: TestController){
        Main.t = testController;
        await Main.t.resizeWindow(1600,1000);
    }

}
