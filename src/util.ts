import { IssueCommentEvent } from "@octokit/webhooks-types";
import octokit from "./instances/octokit";

export function leaveComment(body: IssueCommentEvent, comment: string) {
  octokit.rest.issues.createComment({
    owner: body.repository.owner.login,
    repo: body.repository.name,
    issue_number: body.issue.number,
    body: comment
  });
}
