// Project imports
import { Execute } from '../interfaces/Command';

// Properties
const name: string = 'grant';
const description: string = 'Grant a user access to a specific channel';

// Execute function
const execute: Execute = async (bot, message, args) => {
    
    // Flow
    // ----------------
    // Check permissions
    // Get user
    // Get channel
    // Create new role (based on channel so can be reused for various users)
    // Assign role to user
    // Grant role access to channel

    if (!message.member?.hasPermission(['MANAGE_ROLES'])) {
        message.reply('You do not have permissions for this command').then(res => {
            message.delete({timeout:5000});
            res.delete({timeout:5000});
        });
        return;
    }
}

export { name, description, execute }