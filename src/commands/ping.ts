// Projects imports
import { Execute } from '../interfaces/Command';

// Command properties
const name: string = 'ping';
const description: string = 'Pong!';

// Command execute function
const execute: Execute = async (bot, message, args) => {
    message.channel.send('Pong!');
}

export { name, description, execute }