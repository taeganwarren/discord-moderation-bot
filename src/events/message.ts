// Library imports
import { Message } from 'discord.js';
// Project imports
import { Event } from '../types/interfaces/event';
import config from '../botconfig.json';

// Event definition
export default {

    // Properties
    name: 'message',
    once: false,

    // Execute function
    execute: async (bot, message: Message) => {
        if (message.author.bot) { return; }
    
        // Get the guild id the message was sent in
        const server_id = message.guild?.id;

        // If no guild ID is found, check if command can be ran in DM's
        if (!server_id) { 
            if (message.channel.type === 'dm') {
                const prefix = config.prefix;
                if (message.content.startsWith(prefix)) {
                    
                    // Execute command
                    const args = message.content.slice(prefix.length).trim().split(/ +/);
                    const command = args.shift()?.toLowerCase();
                    if (command) {
                        const bot_command = await bot.commands.get(command);
                        if (bot_command && bot_command.dm === true) {
                            bot_command.execute(bot, prefix, message, args);
                        }
                    }
                } else { return; }
            }
        
        // Run command in server
        } else {
            // Get the guilds custom prefix from the redis store. If no custom prefix is found, use the default prefix.
            bot.prefixes.get(server_id, async (err, prefix) => {
                if (!prefix) { prefix = config.prefix }
        
                // Return if message does not begin with the servers prefix
                if (!message.content.startsWith(prefix)) { return; }
        
                // Execute command
                const args = message.content.slice(prefix.length).trim().split(/ +/);
                const command = args.shift()?.toLowerCase();
                if (command) {
                    await bot.commands.get(command)?.execute(bot, prefix, message, args);
                }
            });
        }
    }

} as Event;