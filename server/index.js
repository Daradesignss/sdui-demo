import { ApolloServer, gql } from "apollo-server";

// 1) Define a GraphQL schema (type definitions)
const typeDefs = gql`
  scalar JSON

   type Query {
    screenConfig(screenId: String!): JSON
  }
`;

// 2) Provide resolvers (how data is returned)
const resolvers = {
  Query: {
    screenConfig: () => ({
      // You can switch schema by screenId later if you want.
      type: "Screen",
      props: { analyticsId: "home_screen_v1" },
      children: [
        { type: "Text", props: { value: "Hello Oluwadarasimi" } },
        { type: "Spacer", props: { height: 16 } },
        { type: "Button", props: { label: "Sign In", analyticsId: "signin_btn", action: "OPEN_URL", url: "https://example.com/login" } },
      ],
    }),
  },
};

// Minimal JSON scalar implementation
const JSONScalar = {
  JSON: {
    __parseValue(value) {
      return value;
    },
    __serialize(value) {
      return value;
    },
    __parseLiteral(ast) {
      // This is a simplified literal parser for demonstration purposes.
      return ast.value;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    ...resolvers,
    ...JSONScalar,
  },
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀 GraphQL Server ready at ${url}`);
});
