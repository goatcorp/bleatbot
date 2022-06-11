import "dotenv/config";
import crypto from "crypto";

import Koa from "koa";
import bodyParser from "koa-bodyparser";
import Router from "@koa/router";

import { handleIssueEvent } from "./handlers";
import { handleAutomatic } from "./commands/auto";

const app = new Koa();
app.use(bodyParser());
const router = new Router();

router.post("/webhook", (ctx) => {
  // verify the hash. fuck you ! operator if the user fucked this up they're stupid
  const hash = crypto
    .createHmac("sha256", process.env["GITHUB_WEBHOOK_SECRET"]!)
    .update(ctx.request.rawBody)
    .digest("hex");

  const headers = ctx.request.headers;
  if (headers["x-hub-signature-256"] !== `sha256=${hash}`) {
    ctx.status = 400;
    return;
  }

  // fuck you
  let eventType = headers["x-github-event"] as string;
  switch (eventType) {
    case "issue_comment":
      handleIssueEvent(ctx.request.body);
      break;

    default:
      break;
  }

  ctx.status = 200;
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(process.env["PORT"], () => {
  console.log("bleatbot started!");
  handleAutomatic();
});
