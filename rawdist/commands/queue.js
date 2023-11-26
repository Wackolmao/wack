"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Global_1 = __importDefault(require("../registries/Global"));
class QueueCommand {
    name = "queue";
    usage = "queue";
    description = "Shows the current youtube queue.";
    async execute(msg, args) {
        if (args[0] == "clear") {
            return;
        }
        let number = args[0] ? parseInt(args[0]) : 1;
        if (isNaN(number))
            number = 1;
        let queue = Global_1.default.queue.peekFrom((number - 1) * 10, number * 10);
        let queueString = "";
        queue.forEach((element, index) => {
            queueString += `**#${(number - 1) * 10 + index + 1}** - \`${element}\`\n`;
        });
        await msg.reply(`**Current queue** \`(${queue.length + (number - 1) * 10}/${Global_1.default.queue.size()})\`**:** \n\n${queueString}`);
    }
}
exports.default = QueueCommand;
