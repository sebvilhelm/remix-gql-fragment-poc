// @ts-check
import DataLoader from "dataloader";
import { repo } from "./repo.mjs";

let userLoader = new DataLoader((keys) =>
  Promise.resolve(
    keys.map((key) => repo.users.get(key) || new Error(`No result for ${key}`))
  )
);

let loanLoader = new DataLoader((keys) =>
  Promise.resolve(
    keys.map((key) => repo.loans.get(key) || new Error(`No result for ${key}`))
  )
);

let itemLoader = new DataLoader((keys) =>
  Promise.resolve(
    keys.map((key) => repo.items.get(key) || new Error(`No result for ${key}`))
  )
);

let bookLoader = new DataLoader((keys) =>
  Promise.resolve(
    keys.map((key) => repo.books.get(key) || new Error(`No result for ${key}`))
  )
);

let authorLoader = new DataLoader((keys) =>
  Promise.resolve(
    keys.map(
      (key) => repo.authors.get(key) || new Error(`No result for ${key}`)
    )
  )
);

export { userLoader, loanLoader, itemLoader, bookLoader, authorLoader };
