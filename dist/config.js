"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var configuru_1 = require("configuru");
var loader = configuru_1.createLoader({ defaultConfigPath: '.configuru.jsonc' });
exports.default = configuru_1.values({
    services: {
        firebaseServiceAccount: loader.json('FIREBASE_SA'),
    },
});
