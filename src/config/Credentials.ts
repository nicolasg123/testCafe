/**
 * Credentials class used to get passwords for environments
 */
export class Credentials {

    public static userName = "E2euser"

    /**
     * Gets the password for the env sent
     * @param env
     */
    public static getPasswordForEnvironment(env: string): string {
        const passKey = "BAT_AUTOMATION_PASSWORD";
        const pass = process.env[passKey];
        if (!pass) { throw new Error(`Environment variable "${passKey}" is not defined`); }

        return pass;
    }
}
