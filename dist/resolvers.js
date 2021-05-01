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
var POSTS = lodash_1.times((50), function (i) { return ({ id: i, text: "Post text " + i }); });
var tokenToOffset = function (token) { return Number(token); };
exports.resolvers = {
    Query: {
        user: function (parent, args) {
            return USERS.find(function (u) { return u.id === args.id; });
        },
        posts: function (parent, args) {
            var _a, _b;
            var offset = tokenToOffset((_a = args.pageToken) !== null && _a !== void 0 ? _a : '0');
            var limit = (_b = args.limit) !== null && _b !== void 0 ? _b : 10;
            return {
                posts: POSTS.slice(offset, limit),
                nextPageToken: (offset + limit) < POSTS.length ? undefined : ('' + offset + limit),
            };
        }
    },
};
