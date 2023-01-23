import { encoding } from "../index.js";
import { generateContact } from "./contacts.js";

export function getCustomers(request, response) {
  const params = new URL(request.url, `http://${request.headers.host}`).searchParams;
  const c = params.get("cursor");
  const l = params.get("limit");
  const filter = params.get("filter") || "";

  const contacts = [];

  let seed = 0;
  if (c && c.length > 0) {
    try {
      seed = parseInt(c, 10);
    } catch (e) {
      // safe to ignore
    }
  }
  let limit = 50;
  if (l && l.length > 0) {
    try {
      limit = parseInt(l, 10);
    } catch (e) {
      // safe to ignore
    }
  }

  for (const [c, s] of generateContact(limit, seed, filter)) {
    contacts.push(c);
    seed = s;
  }

  if (contacts.length === 0) {
    response.writeHead(200, {
      "Content-Type": "application/json; charset=UTF-8",
      "Cache-Control": "max-age=0, must-revalidate, private",
    });
    response.end(
      JSON.stringify({
        contacts: [],
      }),
      encoding
    );
    return;
  }

  let nextCursor;
  if (contacts.length === limit && seed) {
    nextCursor = seed.toString(10);
  }

  response.writeHead(200, {
    "Content-Type": "application/json; charset=UTF-8",
    "Cache-Control": "max-age=0, must-revalidate, private",
  });

  let slowAPI = false;
  if (filter.length > 0 && filter.length <= 2) {
    slowAPI = !(c && c.length > 0);
  }

  setTimeout(
    () => {
      response.end(
        JSON.stringify({
          contacts,
          nextCursor,
        }),
        encoding
      );
    },
    slowAPI ? 1000 : 40
  );
}
