// Project imports
import { Execute } from '../interfaces/Command';
import { get_member } from '../lib/functions';

// Properties
const name: string = 'Ban';
const description: string = 'Ban a user from the server';
const usage: string = '';

// Execute function
// TODO: Finish command
const execute: Execute = async (prefix, bot, message, args) => {

    // Check if command author has permissions
    if (!message.member?.hasPermission(['BAN_MEMBERS'])) {
        message.reply('You do not have permissions for this command.').then(res => {
            message.delete({timeout: 5000});
            res.delete({timeout: 5000});
        });
        return;
    }
    
    // Get the user the author wants to ban
    const banned_user = get_member(message, args.shift(), false);
    if (!banned_user) {
        message.reply('I am unable to find that member.');
        return;
    }
}

export { name, description, usage, execute }