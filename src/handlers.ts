import { IssueCommentEvent } from "@octokit/webhooks-types";
import { parseCommand } from "./commands";

export function handleIssueEvent(body: IssueCommentEvent) {
  console.log(body);

  if (body.action === "created") {
    const comment = body.comment.body;

    if (comment.startsWith("@bleatbot")) {
      const command = comment.replace("@bleatbot", "").trim();
      parseCommand(command, body);
    }
  }
}
