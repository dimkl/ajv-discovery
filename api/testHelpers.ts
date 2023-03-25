export function createRequiredError(attrName: string) {
    return {
      instancePath: "",
      keyword: "required",
      message: `must have required property '${attrName}'`,
      params: {
        missingProperty: attrName,
      },
      schemaPath: "#/required",
    };
  }
  