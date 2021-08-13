export class EnvironmentUtils {

    /**
     */
    public static getEnv(): string {
        return process.env.ENV ? process.env.ENV : "qax";
    }
}
