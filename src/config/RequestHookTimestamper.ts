import {RequestHook} from "testcafe";



export class RequestHookTimestamper extends RequestHook {
    constructor (requestFilterRules?, responseEventConfigureOpts?) {
        super(requestFilterRules, responseEventConfigureOpts);
        // ...
    }
    async onRequest (event) {
        event.requestOptions.headers["timestamp"] = new Date();
    }
    async onResponse (event) {
        // ...
    }
}



