// Project imports
import { Command, Execute } from '../types/interfaces/command';

// Command definition
export default {

    // Properties
    name: 'help',
    description: 'Shows help text',
    usage: '',
    aliases: [],
    cooldown: 0,

    // Execute function
    execute: async (prefix, bot, message, args) => {

    }

} as Command;