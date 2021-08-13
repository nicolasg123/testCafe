/**
 * Language types selectable for project creation on SPEC
 */
export enum LanguageTypes {
    RAML10 = "RAML 1.0",
    RAML08 = "RAML 0.8",
    OAS20JSON = "OAS 2.0 (JSON)",
    OAS20YAML = "OAS 2.0 (YAML)",
}

export enum FileType {
    RAML10 = "RAML 1.0",
    RAML08 = "RAML 0.8",
    OAS20 = "OAS 2.0",
    OTHER = "Other"
}

export enum FileSubType {
    SPECIFICATION = "Specification",
    SPECIFICATION_YAML = "Specification (YAML)",
    SPECIFICATION_JSON = "Specification (JSON)"
}
