// Project imports
import { Execute } from '../interfaces/Command';

// Properties
const name: string = 'purge';
const description: string = 'Deletes X amount of messages in a channel.';
const usage: string = '';

// Execute function
const execute: Execute = async (prefix, bot, message, args) => {
    
}

export { name, description, usage, execute }