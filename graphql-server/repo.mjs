// @ts-check

/** @typedef {{ id: string, email: string, loans: string[] }} User */
/** @typedef {{ id: string, loaner: string, item: string }} Loan */
/** @typedef {{ id: string, book: string}} Item */
/** @typedef {{ id: string, name: string, authors: string[], items: string[]}} Book */
/** @typedef {{ id: string, firstName: string, lastName: string, books: string[]}} Author */

let repo = {
  /** @type {Map<string, User>} */
  users: new Map(),
  /** @type {Map<string, Loan>} */
  loans: new Map(),
  /** @type {Map<string, Item>} */
  items: new Map(),
  /** @type {Map<string, Book>} */
  books: new Map(),
  /** @type {Map<string, Author>} */
  authors: new Map(),
};

repo.users.set("ea8b3f2d-bb5b-4409-86b3-4912b216e7fa", {
  id: "ea8b3f2d-bb5b-4409-86b3-4912b216e7fa",
  loans: ["b25179ae-311a-48bd-9227-307933d3ef1d"],
  email: "michael@example.org",
});

repo.loans.set("b25179ae-311a-48bd-9227-307933d3ef1d", {
  id: "b25179ae-311a-48bd-9227-307933d3ef1d",
  loaner: "ea8b3f2d-bb5b-4409-86b3-4912b216e7fa",
  item: "a0067e2e-9dc0-4966-af3f-e1dd3def1900",
});

repo.items.set("a0067e2e-9dc0-4966-af3f-e1dd3def1900", {
  id: "a0067e2e-9dc0-4966-af3f-e1dd3def1900",
  book: "7ce2e9f5-9c46-44a4-9066-c06a44243a65",
});

repo.books.set("7ce2e9f5-9c46-44a4-9066-c06a44243a65", {
  id: "7ce2e9f5-9c46-44a4-9066-c06a44243a65",
  name: "Moby Dick",
  authors: ["c81397db-b54e-40b6-aca5-a90b85d926e7"],
  items: ["a0067e2e-9dc0-4966-af3f-e1dd3def1900"],
});

repo.authors.set("c81397db-b54e-40b6-aca5-a90b85d926e7", {
  id: "c81397db-b54e-40b6-aca5-a90b85d926e7",
  firstName: "Herman",
  lastName: "Melville",
  books: ["7ce2e9f5-9c46-44a4-9066-c06a44243a65"],
});

export { repo };
