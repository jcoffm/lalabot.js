import config from "config";
import knex from "knex";

const db = knex({ client: "pg", connection: config.get("db"), debug: true });

export function ping() {
  db.raw("SELECT NOW();").then((resp) => {
    return resp.rows[0].now;
  });
}
