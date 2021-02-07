import { Message } from 'discord.js';
import bot from '../main';

const prefix = '$';

export default async (message: Message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) { return; }
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift()?.toLowerCase();
    if (command === 'ping') {
        await bot.commands.get('ping')?.execute(bot, message, args);
    }
}