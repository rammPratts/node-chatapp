var expect = require("expect");

var {generateMessage, generateLocationMessage} = require("./message");


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

describe("generateLocationMessage", () => {
    it("should generate correct location message object", () => {
        var from = "UserExample";
        var latitude = 1;
        var longitude = 1;

        var res = generateLocationMessage(from, latitude, longitude);

        expect(res).toBeTruthy();
        expect(res.from).toBe(from);
        expect(res.url).toBe(`https://www.google.com/maps?q=${latitude},${longitude}`);
        expect(typeof res.createdAt).toBe("number");
    });
});