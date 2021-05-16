"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var postToOut = function (x) { return (__assign(__assign({}, x), { id: String(x.id) })); };
var tokenToOffset = function (token) { return Number(token); };
exports.resolvers = {
    Query: {
        user: function (parent, args) {
            return USERS.find(function (u) { return u.id === args.id; });
        },
        posts: function (parent, args) {
            var _a, _b, _c, _d;
            var anchor = tokenToOffset((_a = args.after) !== null && _a !== void 0 ? _a : '-1');
            var limit = (_b = args.first) !== null && _b !== void 0 ? _b : 10;
            var posts = POSTS.filter(function (p) { return p.id > anchor; }).slice(0, limit);
            console.log({ posts: posts, limit: limit, anchor: anchor, args: args });
            return {
                edges: posts.map(function (v) { return ({ cursor: String(v.id), node: postToOut(v) }); }),
                pageInfo: {
                    hasNextPage: posts.length === limit,
                    endCursor: String((_d = (_c = posts[posts.length - 1]) === null || _c === void 0 ? void 0 : _c.id) !== null && _d !== void 0 ? _d : '')
                },
                posts: posts.map(postToOut),
                nextPageToken: undefined,
            };
        },
        post: function (parent, args) {
            return postToOut(POSTS[Number(args.id)]);
        }
    },
};
