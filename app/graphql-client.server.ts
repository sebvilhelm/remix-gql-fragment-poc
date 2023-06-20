import { GraphQLClient } from "graphql-request";

let client = new GraphQLClient("http://127.0.0.1:8080/graphql", {
  errorPolicy: "ignore",
});

export { client };
