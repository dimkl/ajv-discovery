import type Ajv from "ajv";

// see: /api/src/addKeywords.ts
export const addKeywords = (ajv: Ajv) => {
    ajv.addKeyword({
        keyword: "x-http-method",
        validate: () => true,
        errors: false,
    });
    ajv.addKeyword({
        keyword: "x-http-path",
        validate: () => true,
        errors: false,
    });
};
