// Project imports
import { Command } from '../types/interfaces/command';
import { prefix } from '../botconfig.json';

// Command definition
export default {

    // Properties
    name: 'prefix',
    description: 'Sets a custom prefix for the bot in the current server.',
    usage: `\`${prefix}prefix <prefix>\``,
    permissions: ['MANAGE_GUILD'],
    dm: false,
    aliases: [],
    cooldown: 0,

    // Execute function
    execute: async (bot, prefix, message, args) => {

        // Check if command author has permissions
        if (!message.member?.hasPermission(['MANAGE_GUILD'])) {
            message.reply('You do not have permissions for this command.').then(res => {
                res.delete({timeout: 3000});
                message.delete({timeout: 3000});
            });
            return;
        }
    
        // Check usage and set the prefix in the redis store
        if (args[0]) {
            if (message.guild) {
                bot.prefixes.set(message.guild.id, args[0], async (err, res) => {
                    message.reply(`Prefix successfully set to: ${args[0]}`);
                });
            }
        } else {
            message.reply(`Invalid arguments\nUsage: ${prefix}prefix <prefix>`);
        }
    }

} as Command;