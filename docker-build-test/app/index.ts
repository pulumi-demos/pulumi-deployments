import {serve} from "@hono/node-server";
import {Hono} from "hono";

const app = new Hono();

app.get("/healthcheck", (c) => c.text("Ok"));

serve({
    fetch: app.fetch,
    port: 3000
})