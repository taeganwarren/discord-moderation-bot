// Imports
import { Message } from 'discord.js';

export default {

    // Meta information
    name: 'ping',
    description: 'Pong!',

    // Command function
    async execute(message: Message, args: string[]) {
        message.channel.send('Pong!');
    }

}