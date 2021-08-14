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
        baseUrl: "https://github.com",
    },
    devLocal: {
        baseUrl: "http://localhost:3000",
        apiUrl: "https://github.com"
    },
    qax: {
        baseUrl: "https://github.com",
    },
    qaLocal: {
        baseUrl: "http://localhost:3000",
        apiUrl: "https://github.com"
    },
    stgx: {
        baseUrl: "https://github.com",
    },
    eu1: {
        baseUrl: "https://github.com",
    },
    prod: {
        baseUrl: "https://github.com",
    }
};
