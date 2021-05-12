// Project imports
import { Command } from '../types/interfaces/command';

// Command definition
export default {

    // Properties
    name: 'purge',
    description: '',
    usage: '',
    aliases: [],
    cooldown: 0,

    // Execute function
    // TODO: Allow command to be ran silently
    // TODO: Allow user to pass in a channel ID
    execute: async (prefix, bot, message, args) => {
        
        // Check if command author has permissions
        if (!message.member?.hasPermission(['MANAGE_MESSAGES'])) {
            message.reply('You do not have permissions for this command.').then(res => {
                message.delete({timeout: 5000});
                res.delete({timeout: 5000});
            });
            return;
        }

        // Check is channel is a text channel
        if (message.channel.type === 'text') {
            const amount = Number(args[0]);

            // Check if amount is a number
            if (amount === NaN) {
                message.reply('Argument supplied is not a valid number.').then(res => {
                    res.delete({timeout: 5000});
                });

            // Delete messages
            } else {
                message.channel.bulkDelete(amount, true).then(messages => {
                    const difference = amount-messages.size;
                    if (difference > 0) {
                        message.reply(`Deleted ${messages.size} messages. ${difference} messages older than two weeks were not deleted. This message will be deleted in five seconds.`).then(res => {
                            res.delete({timeout: 5000});
                        });
                    } else {
                        message.reply(`Deleted ${messages.size} messages. This message will be deleted in five seconds.`).then(res => {
                            res.delete({timeout: 5000});
                        });
                    }
                });
            }
        
        // Let user know if messages can not be deleted in this channel
        } else {
            message.reply('Can not delete messgaes in this channel.').then(res => {
                res.delete({timeout: 5000});
            });
        }
    }

} as Command;