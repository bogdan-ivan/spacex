"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const graphql_1 = require("graphql");
const LaunchType = new graphql_1.GraphQLObjectType({
    name: "Launch",
    fields: () => ({
        flight_number: { type: graphql_1.GraphQLInt },
        mission_name: { type: graphql_1.GraphQLString },
        launch_year: { type: graphql_1.GraphQLString },
        launch_date_local: { type: graphql_1.GraphQLString },
        launch_success: { type: graphql_1.GraphQLBoolean },
        rocket: { type: RocketType },
    }),
});
const RocketType = new graphql_1.GraphQLObjectType({
    name: "Rocket",
    fields: () => ({
        rocket_id: { type: graphql_1.GraphQLString },
        rocket_name: { type: graphql_1.GraphQLString },
        rocket_type: { type: graphql_1.GraphQLString },
    }),
});
const RootQuery = new graphql_1.GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        launches: {
            type: new graphql_1.GraphQLList(LaunchType),
            resolve(parent, args) {
                return axios_1.default
                    .get("https://api.spacexdata.com/v3/launches")
                    .then((res) => res.data);
            },
        },
        launch: {
            type: LaunchType,
            args: {
                flight_number: { type: graphql_1.GraphQLInt },
            },
            resolve(parent, args) {
                return axios_1.default
                    .get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
                    .then((res) => res.data);
            },
        },
        rockets: {
            type: new graphql_1.GraphQLList(RocketType),
            resolve(parent, args) {
                return axios_1.default
                    .get("https://api.spacexdata.com/v3/rockets")
                    .then((res) => res.data);
            },
        },
        rocket: {
            type: RocketType,
            args: {
                id: { type: graphql_1.GraphQLInt },
            },
            resolve(parent, args) {
                return axios_1.default
                    .get(`https://api.spacexdata.com/v3/rockets/${args.id}`)
                    .then((res) => res.data);
            },
        },
    },
});
const schema = new graphql_1.GraphQLSchema({
    query: RootQuery,
});
exports.default = schema;
//# sourceMappingURL=schema.js.map