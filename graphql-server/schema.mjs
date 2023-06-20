// @ts-check
import {
  GraphQLString,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLList,
} from "graphql";
import {
  authorLoader,
  bookLoader,
  itemLoader,
  loanLoader,
  userLoader,
} from "./dataloaders.mjs";

let userType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    loans: {
      type: new GraphQLList(loanType),
      resolve(src) {
        return loanLoader.loadMany(src.loans);
      },
    },
  }),
});

let loanType = new GraphQLObjectType({
  name: "Loan",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    item: {
      type: itemType,
      resolve(src) {
        return itemLoader.load(src.item);
      },
    },
    loaner: {
      type: userType,
      resolve(src) {
        return userLoader.load(src.loaner);
      },
    },
  }),
});

let itemType = new GraphQLObjectType({
  name: "Item",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    book: {
      type: bookType,
      resolve(src) {
        return bookLoader.load(src.book);
      },
    },
  }),
});

let bookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    authors: {
      type: new GraphQLList(authorType),
      resolve(src) {
        return authorLoader.loadMany(src.authors);
      },
    },
    items: {
      type: new GraphQLList(itemType),
      resolve(src) {
        return itemLoader.loadMany(src.items);
      },
    },
  }),
});

let authorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    books: {
      type: new GraphQLList(bookType),
      resolve(source) {
        return bookLoader.loadMany(source.books);
      },
    },
  }),
});

let schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      user: {
        type: userType,
        args: { id: { type: new GraphQLNonNull(GraphQLID) } },
        resolve(_, { id }) {
          return userLoader.load(id);
        },
      },
    },
  }),
});

export { schema };
