// Project imports
import { Command } from '../types/interfaces/command';

// Command definition
export default {

    // Properties
    name: 'prefix',
    description: 'Sets a custom prefix for the bot in the current server.',
    usage: '',
    aliases: [],
    cooldown: 0,

    // Execute function
    execute: async (bot, prefix, message, args) => {

        // Check if command author has permissions
        if (!message.member?.hasPermission(['MANAGE_GUILD'])) {
            message.reply('You do not have permissions for this command.').then(res => {
                res.delete({timeout: 5000});
                message.delete({timeout: 5000});
            });
            return;
        }
    
        // Check usage and set the prefix in the redis store
        // TODO: Check for valid prefix
        // TODO: Update prefix in mongodb
        // TODO: Fix usage
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

} as Command;