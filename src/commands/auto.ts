// TODO: lock this file to certain users

import yargs from "yargs";
import { leaveComment } from "../util";
import { IssueCommentEvent } from "@octokit/webhooks-types";
import prisma from "../instances/prisma";

import parse from "parse-duration";
import { formatDuration, intervalToDuration } from "date-fns";
import octokit from "../instances/octokit";

enum AutomaticTaskType {
  Close,
  Merge
}

const alreadyHaveTask =
  ":x: You already have an automatic task scheduled. Cancel it first with `@bleatbot cancelAuto`.";

async function checkIfHasTask(id: number) {
  const task = await prisma.automaticTasks.findUnique({
    where: {
      id: id
    }
  });

  return task !== null;
}

export async function autoCloseCommand(argv: yargs.ArgumentsCamelCase) {
  const body = argv.body as IssueCommentEvent;
  if (await checkIfHasTask(body.issue.id)) {
    leaveComment(body, alreadyHaveTask);
    return;
  }

  if (body.issue.state === "closed") {
    leaveComment(body, ":x: This issue is already closed.");
    return;
  }

  const parsed = parse(argv.when as string);
  const when = Date.now() + parsed;
  const closeAt = formatDuration(
    intervalToDuration({
      start: 0,
      end: parsed
    })
  );

  await prisma.automaticTasks.create({
    data: {
      id: body.issue.id,
      type: AutomaticTaskType.Close,
      performAt: new Date(when),

      owner: body.repository.owner.login,
      repo: body.repository.name,
      issueId: body.issue.number
    }
  });

  leaveComment(
    body,
    `:white_check_mark: I'll close this **in ${closeAt}**. Cancel it with \`@bleatbot cancelAuto\`.`
  );
}

export async function autoMergeCommand(argv: yargs.ArgumentsCamelCase) {
  const body = argv.body as IssueCommentEvent;
  if (await checkIfHasTask(body.issue.id)) {
    leaveComment(body, alreadyHaveTask);
    return;
  }

  if (!body.issue.pull_request) {
    leaveComment(body, ":x: This isn't a pull request.");
    return;
  }

  if (body.issue.state === "closed" || body.issue.pull_request.merged_at) {
    leaveComment(body, ":x: This pull request isn't open.");
    return;
  }

  const parsed = parse(argv.when as string);
  const when = Date.now() + parsed;
  const mergeAt = formatDuration(
    intervalToDuration({
      start: 0,
      end: parsed
    })
  );

  await prisma.automaticTasks.create({
    data: {
      id: body.issue.id,
      type: AutomaticTaskType.Merge,
      performAt: new Date(when),

      owner: body.repository.owner.login,
      repo: body.repository.name,
      issueId: body.issue.number
    }
  });

  leaveComment(
    body,
    `:white_check_mark: I'll merge this **in ${mergeAt}**. Cancel it with \`@bleatbot cancelAuto\`.`
  );
}

export async function cancelAutoCommand(argv: yargs.ArgumentsCamelCase) {
  const body = argv.body as IssueCommentEvent;

  const task = await prisma.automaticTasks.findUnique({
    where: {
      id: body.issue.id
    }
  });

  if (!task) {
    leaveComment(
      body,
      ":white_check_mark: This issue doesn't have any automatic tasks, so there's nothing to cancel."
    );
    return;
  }

  await prisma.automaticTasks.delete({
    where: {
      id: body.issue.id
    }
  });

  leaveComment(body, `:white_check_mark: Task cancelled.`);
}

export async function handleAutomatic() {
  const tasks = await prisma.automaticTasks.findMany({
    where: {
      performAt: {
        lte: new Date(Date.now())
      }
    }
  });

  for (const task of tasks) {
    try {
      if (task.type === AutomaticTaskType.Close) {
        octokit.rest.issues.update({
          owner: task.owner,
          repo: task.repo,
          issue_number: task.issueId,
          state: "closed"
        });

        await prisma.automaticTasks.delete({
          where: {
            id: task.id
          }
        });
      } else if (task.type === AutomaticTaskType.Merge) {
        octokit.rest.pulls.merge({
          owner: task.owner,
          repo: task.repo,
          pull_number: task.issueId
        });

        await prisma.automaticTasks.delete({
          where: {
            id: task.id
          }
        });
      }
    } catch (err) {
      console.error(err);
    }
  }
}

setInterval(handleAutomatic, 60 * 1000);
