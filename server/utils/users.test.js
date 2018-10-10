const expect = require("expect");

const {Users} = require("./users");

describe("Users", () => {
    var users;
    
    beforeEach(() => {
        users = new Users();
        users.users = [
            {
                id: "1",
                name: "Ramiro",
                room: "ChatApp"
            },
            {
                id: "2",
                name: "Juan",
                room: "Sports"
            },
            {
                id: "3",
                name: "Jennifer",
                room: "ChatApp"
            }
        ]
    });
    it("should add new user", () => {
        var users = new Users();
        var user = {
            id: "123",
            name: "Ramiro",
            room: "Some Room"
        }

        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it("should remove a user",() => {
        var user = {
            id: "1",
            name: "Ramiro",
            room: "ChatApp"
        };
        var res = users.removeUser("1");

        expect(res).toEqual(user);
        expect(users.users.length).toBe(2);
    });

    
    it("should not remove a user",() => {
        var res = users.removeUser("4123");

        expect(res).toBeFalsy();
        expect(users.users.length).toBe(3);
    });

    
    it("should find user",() => {
        var user = {
            id: "3",
            name: "Jennifer",
            room: "ChatApp"
        }
        var res = users.getUser("3");

        expect(res).toEqual(user);
    });

    
    it("should not find user",() => {
        var res = users.getUser("1233");

        expect(res).toBeFalsy();
    });

    it("should find user by name",() => {
        var user = {
            id: "3",
            name: "Jennifer",
            room: "ChatApp"
        }
        var res = users.getUserByName("Jennifer");

        expect(res).toEqual(user);
    });

    
    it("should not find user",() => {
        var res = users.getUserByName("Carlos");

        expect(res).toBeFalsy();
    });

    it("should return names for ChatApp", () =>{
        var userList = users.getUserList("ChatApp");

        expect(userList).toEqual(["Ramiro", "Jennifer"]);
    });

    it("should return names for Sports", () =>{
        var userList = users.getUserList("Sports");

        expect(userList).toEqual(["Juan"]);
    });


});