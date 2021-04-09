"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
var lodash_1 = require("lodash");
var USERS = [
    {
        id: "1",
        email: "email@test.com",
        profile: {
            age: 20,
            name: "Dotan"
        }
    }
];
exports.resolvers = {
    Query: {
        user: function (parent, args) {
            return USERS.find(function (u) { return u.id === args.id; });
        },
        posts: function (parent, args) {
            var _a;
            return {
                posts: lodash_1.times(((_a = args.limit) !== null && _a !== void 0 ? _a : 10), function (i) { return ({ text: "Post text " + i }); }),
                nextPageToken: '',
            };
        }
    },
};
