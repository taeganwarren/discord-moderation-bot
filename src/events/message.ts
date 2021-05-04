// Projects imports
import { Execute } from '../interfaces/Command';
// Projects imports
import config from '../config.json';

// Command properties
const name: string = 'message';
const once: boolean = false;

// Command execute function
const execute: Execute = async (bot, message) => {
    // Return if the author was the bot
    if (message.author.bot) { return; }

    // Get the guild id the message was sent it
    const server_id = message.guild?.id;
    if (!server_id) { return; }

    // Get the guilds custom prefix from the redis store. If no custom prefix is found, use the default prefix.
    bot.prefixes.get(server_id, async (err, prefix) => {
        if (!prefix) { prefix = config.prefix }

        // Return if message does not begin with the servers prefix
        if (!message.content.startsWith(prefix)) { return; }

        // Split command name and additional arguments
        const args = message.content.slice(prefix?.length).trim().split(/ +/);
        const command = args.shift()?.toLowerCase();
        
        // Execute the command
        if (command) {
            await bot.commands.get(command)?.execute(bot, message, args);
        }
    });
}

export { name, once, execute }