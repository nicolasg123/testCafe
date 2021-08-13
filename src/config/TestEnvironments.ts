/**
 * Test Envs where to run
 */

export type BG = {
    name: string;
    parent: string;
    id: string;
}

export type Env = {
    baseUrl: string;
    apiUrl?: string;
}

export enum Envs {
    devx = "devx",
    qax = "qax",
    stgx = "stgx",
    eu1 = "eu1",
    prod = "prod",
    devLocal = "devLocal",
    qaLocal =  "qaLocal"
}

export type Environments = {
    [env: string]: Env;
}

export const Environments: Environments = {

    devx: {
        baseUrl: "https://devx.anypoint.mulesoft.com",
    },
    devLocal: {
        baseUrl: "http://localhost:3000",
        apiUrl: "https://devx.anypoint.mulesoft.com"
    },
    qax: {
        baseUrl: "https://qax.anypoint.mulesoft.com",
    },
    qaLocal: {
        baseUrl: "http://localhost:3000",
        apiUrl: "https://qax.anypoint.mulesoft.com"
    },
    stgx: {
        baseUrl: "https://stgx.anypoint.mulesoft.com",
    },
    eu1: {
        baseUrl: "https://eu1.anypoint.mulesoft.com",
    },
    prod: {
        baseUrl: "https://anypoint.mulesoft.com",
    }
};
