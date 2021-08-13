import {TestEnum} from '../Tests/TestEnum';
import {BasicTest} from "../Tests/BasicTest";

type BasicTestMap = {[key: string]: BasicTest}
type SuitesMap = {[key: string]: BasicTestMap}

export class Suites {

    static suites:SuitesMap = {
        lrg : {
            'TestEnum' : new TestEnum(),
        }
    }

    static runSuite(suiteName:string){
        let testsToRun = Object.keys(this.suites[suiteName]);


        for(let t in testsToRun){
            this.suites[suiteName][testsToRun[t]].runTest();
        }

    }



}
