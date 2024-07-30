import { addKeywords } from "./addKeywords";

describe("addKeywords(ajv)", () => {
    test("sets x-http-method and x-http-path keywords in ajv passed", () => {
        const ajv = { addKeyword: jest.fn() } as any;

        addKeywords(ajv);

        expect(ajv.addKeyword).toBeCalledTimes(2);
        expect(ajv.addKeyword.mock.calls[0]).toMatchSnapshot();
        expect(ajv.addKeyword.mock.calls[0][0].validate()).toEqual(true);
        expect(ajv.addKeyword.mock.calls[1]).toMatchSnapshot();
        expect(ajv.addKeyword.mock.calls[1][0].validate()).toEqual(true);
    });
});
