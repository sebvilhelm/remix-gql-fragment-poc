// @ts-check
import { graphql, printSchema } from "graphql";
import { writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { schema } from "./schema.mjs";
import path from "node:path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

await writeFile(
  path.join(__dirname, "..", "schema.graphql"),
  printSchema(schema),
  "utf8"
);

let server = createServer(async (req, res) => {
  switch (req.url) {
    case "/graphql":
      return await handleGraphQLRequest(req, res);
    default:
      res.writeHead(404);
      res.end();
  }
});

/**
 * @param req {import("node:http").IncomingMessage}
 * @param res {import("node:http").ServerResponse}
 */
async function handleGraphQLRequest(req, res) {
  if (req.method === "GET") {
    res.writeHead(405);
    res.end();
    return;
  }

  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", async () => {
    let parsedBody = JSON.parse(body);

    let response = await graphql({
      schema,
      source: parsedBody.query,
      variableValues: parsedBody.variables,
      operationName: parsedBody.operationName,
    });

    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(response));
    res.end();
  });
}

server.listen(8080, "127.0.0.1", () => {
  console.log("server is ok");
});
