// Projects imports
import { Execute } from '../interfaces/Command';

// Command properties
const name: string = 'prefix';
const description: string = 'Sets a custom prefix for the bot in the current server.';

// Command execute function
// TODO: Delete original message and bot message if insufficient permission after x seconds
const execute: Execute = async (bot, message, args) => {

    // Check if command author has permissions
    if (!message.member?.hasPermission(['MANAGE_GUILD'])) {
        message.reply('You do not have permissions for this command.');
    }

    // Check usage and set the prefix in the redis store
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