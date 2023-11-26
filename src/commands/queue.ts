import { Command } from "../objects/Command";
import { Message } from "discord.js-selfbot-v13";
import Global from "../registries/Global";

export default class QueueCommand implements Command {
  name = "queue";
  usage = "queue";
  description = "Shows the current youtube queue.";

  async execute(msg: Message, args: string[]): Promise<void> {
    if (args[0] == "clear") {
      return;
    }
    let number = args[0] ? parseInt(args[0]) : 1;
    if (isNaN(number)) number = 1;
    let queue = Global.queue.peekFrom((number - 1) * 10, number * 10);
    let queueString = "";
    queue.forEach((element, index) => {
      queueString += `**#${(number - 1) * 10 + index + 1}** - \`${element}\`\n`;
    });
    await msg.reply(
      `**Current queue** \`(${
        queue.length + (number - 1) * 10
      }/${Global.queue.size()})\`**:** \n\n${queueString}`,
    );
  }
}
