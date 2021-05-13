// Project imports
import { Command } from '../types/interfaces/command';

// Command definition
export default {

    // Properties
    name: 'purge',
    description: 'Deletes X amount of messgaes that are younger than two weeks.',
    usage: '',
    permissions: ['MANAGE_MESSAGES', 'ADD_REACTIONS'],
    dm: false,
    aliases: [],
    cooldown: 0,

    // Execute function
    execute: async (bot, prefix, message, args) => {
        
        // Check if command author has permissions
        if (!message.member?.hasPermission(['MANAGE_MESSAGES'])) {
            message.reply('You do not have permissions for this command.').then(res => {
                message.delete({timeout: 3000});
                res.delete({timeout: 3000});
            });
            return;
        }

        // Check if channel is a text channel
        if (message.channel.type === 'text') {
            const amount = Number(args[0]);

            // Check if amount is a number
            if (amount === NaN) {
                message.reply('Argument supplied is not a valid number.').then(res => {
                    res.delete({timeout: 3000});
                });

            // Delete messages
            } else {
                message.channel.bulkDelete(amount, true).then(messages => {
                    const difference = amount-messages.size;
                    if (difference > 0) {
                        message.reply(`Deleted ${messages.size} messages. ${difference} messages older than two weeks were not deleted. This message will be deleted in three seconds.`).then(res => {
                            res.delete({timeout: 3000});
                        });
                    } else {
                        message.reply(`Deleted ${messages.size} messages. This message will be deleted in three seconds.`).then(res => {
                            res.delete({timeout: 3000});
                        });
                    }
                });
            }
        
        // Let user know if messages can not be deleted in this channel
        } else {
            message.reply('Can not delete messgaes in this channel.').then(res => {
                res.delete({timeout: 3000});
            });
        }
    }

} as Command;