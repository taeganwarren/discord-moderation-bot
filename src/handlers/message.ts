// Imports
import { Message } from 'discord.js';
import ping from '../commands/ping';

const prefix = '$';

// Message handler
export default (message: Message) => {

    // Return if the bot is the message author
    if (!message.content.startsWith(prefix) || message.author.bot) { return; }

    // Get command and any additional arguments
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift()?.toLowerCase();

    // Run the requested command
    if (command === 'ping') {
        ping.execute(message, args);
    }

}