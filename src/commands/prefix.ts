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
        return;
    }

    // Check usage and set the prefix in the redis store
    if (args[0]) {
        if (message.guild) {
            bot.prefixes.set(message.guild.id, args[0], async (err, res) => {

            });
        }
    } else {
        message.reply('Usage: !prefix <prefix>');
        return;
    }
}

export { name, description, execute }