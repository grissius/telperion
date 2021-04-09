"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
var fs_1 = require("fs");
var path_1 = require("path");
var resolvers_1 = require("./resolvers");
var server = new apollo_server_1.ApolloServer({ resolvers: resolvers_1.resolvers, typeDefs: fs_1.readFileSync(path_1.join(__dirname, '../src/schema/main.graphql')).toString('utf-8') });
server.listen()
    .then(function (_a) {
    var url = _a.url;
    return console.log("Server ready at " + url + ". ");
});
