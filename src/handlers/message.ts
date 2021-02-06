// Imports
import { Message } from 'discord.js';

// Message handler
export default (message: Message) => {

    // Return if the bot is the message author
    if (message.author.bot) { return; }

    // Check for hello command
    if (message.content === 'hello') {
        message.channel.send('Hello world!');
    }
    
}