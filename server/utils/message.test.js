var expect = require("expect");

var {generateMessage} = require("./message");


describe("generateMessage", () => {
    it("should generate correct message object", () => {
        var from = "Ramiro";
        var text = "This is a test";

        var res = generateMessage(from, text);

        expect(res).toBeTruthy();
        expect(res.from).toBe(from);
        expect(res.text).toBe(text);
        expect(typeof res.createdAt).toBe("number");
    });
});