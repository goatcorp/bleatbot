import { IssueCommentEvent } from "@octokit/webhooks-types";
import yargs from "yargs";
import { leaveComment } from "../util";

const responses = {
  logxl: `Please send us your **output.log** log file from \`%AppData%/XIVLauncher\` so we can look into the problem!

It's best to just upload/attach the file if you can!

**NOTE**: If you have file extensions hidden, this file will just look like \`output\` on your screen.

**DISCLAIMER**: This log will contain your FFXIV username[s]. If you're not comfortable posting that here, you can open the file in a text editor to redact that information first, or you can join our [Discord server](https://goat.place/) and send it to Franzbot to relay to a private admin channel for processing.

![The Windows 10 File Explorer, cropped to the top left of the screen. The search bar reads %AppData%/XIVLauncher.](https://cdn.discordapp.com/attachments/687530726756712478/810897701864210472/explorer_2021-02-08_19-20-41.png)`,

  logd: `Please send us your **dalamud.log** log file from \`%AppData%/XIVLauncher\` so we can look into the problem!

It's best to just upload/attach the file if you can!

**NOTE**: If you have file extensions hidden, this file will just look like \`dalamud\` on your screen.

**DISCLAIMER**: This log will contain your computer username. If you're not comfortable posting that here, you can open the file in a text editor to redact that information first, or you can join our [Discord server](https://goat.place/) and send it to Franzbot to relay to a private admin channel for processing.

![The Windows 10 File Explorer, cropped to the top left of the screen. The search bar reads %AppData%/XIVLauncher.](https://cdn.discordapp.com/attachments/687530726756712478/810897701864210472/explorer_2021-02-08_19-20-41.png)`,

  logi: `Please send us your **dalamud.injector.log** log file from \`%AppData%/XIVLauncher\` so we can look into the problem!

It's best to just upload/attach the file if you can!

**NOTE**: If you have file extensions hidden, this file will just look like \`dalamud.injector\` on your screen.

**DISCLAIMER**: This log will contain your computer username. If you're not comfortable posting that here, you can open the file in a text editor to redact that information first, or you can join our [Discord server](https://goat.place/) and send it to Franzbot to relay to a private admin channel for processing.

![The Windows 10 File Explorer, cropped to the top left of the screen. The search bar reads %AppData%/XIVLauncher.](https://cdn.discordapp.com/attachments/687530726756712478/810897701864210472/explorer_2021-02-08_19-20-41.png)`,

  logb: `Please send us your **dalamud.boot.log** log file from \`%AppData%/XIVLauncher\` so we can look into the problem!

It's best to just upload/attach the file if you can!

**NOTE**: If you have file extensions hidden, this file will just look like \`dalamud.boot\` on your screen.

**DISCLAIMER**: This log will contain your computer username. If you're not comfortable posting that here, you can open the file in a text editor to redact that information first, or you can join our [Discord server](https://goat.place/) and send it to Franzbot to relay to a private admin channel for processing.

![The Windows 10 File Explorer, cropped to the top left of the screen. The search bar reads %AppData%/XIVLauncher.](https://cdn.discordapp.com/attachments/687530726756712478/810897701864210472/explorer_2021-02-08_19-20-41.png)`,

  repair: `To repair a broken FFXIV installation, right-click on the login button in XIVLauncher and select \`Repair Game Files\`.

**NOTE**: Linux users running XIVLauncher through Wine will need to be using a prefix with Wine 7 or later. If you're on an older build, please make a new prefix and migrate first.

More info [here](https://goatcorp.github.io/faq/xl_troubleshooting#q-can-i-repair-my-ffxiv-installation).

![The XIVLauncher login page. The "Login" button has been right clicked, showing a context menu with the option "Repair game files".](https://cdn.discordapp.com/attachments/586272168741044226/948933649296924722/unknown.png)`,

  deleteDalamud: `General "how to delete dalamud" steps:

1. Close the game and XIVLauncher
2. Go to \`%AppData%/XIVLauncher\`
3. Remove the \`addon/Hooks\` folder
4. Start the game now
5. Let us know if the issue persists

![The Windows 10 File Explorer, cropped to the top left of the screen. The search bar reads %AppData%/XIVLauncher.](https://cdn.discordapp.com/attachments/687530726756712478/810897701864210472/explorer_2021-02-08_19-20-41.png)`,

  deleteRuntime: `General "how to delete the packaged .Net runtime" steps:

1. Close the game and XIVLauncher
2. Go to \`%AppData%/XIVLauncher\`
3. Remove the \`runtime\` folder
4. Start the game now
5. Let us know if the issue persists

![The Windows 10 File Explorer, cropped to the top left of the screen. The search bar reads %AppData%/XIVLauncher.](https://cdn.discordapp.com/attachments/687530726756712478/810897701864210472/explorer_2021-02-08_19-20-41.png)`,

  av: `Please whitelist or make AV exceptions for XIVLauncher. Details can be found [here](https://goatcorp.github.io/faq/xl_troubleshooting#q-how-do-i-whitelist-xivlauncher-and-dalamud-so-my-antivirus-leaves-them-alone).`,

  unknown: "I couldn't find that FAQ entry. :("
};

export default function faqCommand(argv: yargs.ArgumentsCamelCase) {
  const body = argv.body as IssueCommentEvent;

  switch (argv.entry) {
    case "logxl":
    case "xllog":
    case "log":
      leaveComment(body, responses.logxl);
      break;

    case "logd":
    case "dlog":
      leaveComment(body, responses.logd);
      break;

    case "logi":
    case "ilog":
      leaveComment(body, responses.logi);
      break;

    case "logb":
    case "blog":
      leaveComment(body, responses.logb);
      break;

    case "repair":
      leaveComment(body, responses.repair);
      break;

    case "deleteDalamud":
    case '"delete dalamud"':
      leaveComment(body, responses.deleteDalamud);
      break;

    case "deleteRuntime":
    case '"delete runtime"':
      leaveComment(body, responses.deleteRuntime);

    case "av":
    case "antivirus":
      leaveComment(body, responses.av);
      break;

    default:
      leaveComment(body, responses.unknown);
      break;
  }
}
