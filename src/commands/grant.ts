// Project imports
import { Execute } from '../interfaces/Command';

// Properties
const name: string = 'grant';
const description: string = 'Grant a user access to a specific channel';
const usage: string = '';

// Execute function
const execute: Execute = async (prefix, bot, message, args) => {
    
    // Flow
    // ----------------
    // [X] Check permissions
    // [] Get user
    // [] Get channel
    // [] Create new role (based on channel so can be reused for various users)
    // [] Assign role to user
    // [] Grant role access to channel

    // Check if command author has permissions
    if (!message.member?.hasPermission(['MANAGE_ROLES'])) {
        message.reply('You do not have permissions for this command').then(res => {
            message.delete({timeout:5000});
            res.delete({timeout:5000});
        });
        return;
    }
}

export { name, description, usage, execute }