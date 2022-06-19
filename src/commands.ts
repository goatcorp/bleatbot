import { IssueCommentEvent } from "@octokit/webhooks-types";
import yargs from "yargs";
import { leaveComment } from "./util";

import faqCommand from "./commands/faq";
import {
  autoCloseCommand,
  autoMergeCommand,
  cancelAutoCommand
} from "./commands/auto";

const parser = yargs
  .command(
    "faq <entry>",
    false,
    (yargs) => {
      return yargs.positional("entry", {
        type: "string"
      });
    },
    faqCommand
  )
  .command(
    "autoclose <when>",
    false,
    (yargs) => {
      return yargs.positional("when", {
        type: "string"
      });
    },
    autoCloseCommand
  )
  .command(
    "automerge <when>",
    false,
    (yargs) => {
      return yargs.positional("when", {
        type: "string"
      });
    },
    autoMergeCommand
  )
  .command("cancel", false, () => {}, cancelAutoCommand);

export function parseCommand(comment: string, body: IssueCommentEvent) {
  parser.parse(comment, { body }, (err) => {
    if (err) {
      leaveComment(
        body,
        ":warning: An error occurred processing your command."
      );
      console.error(err);
    }
  });
}
