// Projects imports
import { Execute } from '../interfaces/Command';

// Command properties
const name: string = 'prefix';
const description: string = 'Sets a custom prefix for the bot in the current server.';

// Command execute function
const execute: Execute = async (bot, message, args) => {
    if (!message.member?.hasPermission(['MANAGE_GUILD'])) {
        message.reply('You do not have permissions for this command.');
    }
    if (args[0]) {
        if (message.guild) {
            bot.prefixes.set(message.guild.id, args[0]);
            message.reply(`Bots prefix has been updated to "${args[0]}"`);
        }
    } else {
        message.reply('Usage: !prefix <prefix>');
    }
}

export { name, description, execute }