import type Ajv from "ajv";

// see: /api/src/addKeywords.ts
export const addKeywords = (ajv: Ajv) => {
  ajv.addKeyword({
    keyword: "http_method",
    validate: () => true,
    errors: false,
  });
  ajv.addKeyword({
    keyword: "http_path",
    validate: () => true,
    errors: false,
  });
};
