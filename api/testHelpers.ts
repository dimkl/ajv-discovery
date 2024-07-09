export function createRequiredError(attrName: string) {
    return {
        instancePath: '',
        keyword: 'required',
        message: `must have required property '${attrName}'`,
        params: {
            missingProperty: attrName,
        },
        schemaPath: '#/required',
    }
}

export function createTypeError() {
    return {
        instancePath: '',
        keyword: 'type',
        message: 'must be object',
        params: {
            type: 'object',
        },
        schemaPath: '#/type',
    }
}
