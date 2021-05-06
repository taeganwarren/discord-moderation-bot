// Library imports
import { Message } from 'discord.js';

// Get details about a user or message author
const get_member = (message: Message, toFind: string, return_author: boolean) => {
    toFind = toFind.toLowerCase();

    // Attempt to get the user
    let target = message.guild?.members.cache.get(toFind);
    if (!target && message.mentions.members) {
        target = message.mentions.members.first();
    }
    if (!target && toFind) {
        target = message.guild?.members.cache.find(member => {
            return member.displayName.toLowerCase().includes(toFind) ||
                member.user.tag.toLowerCase().includes(toFind);
        });
    }

    // If still no user is found, set target to the message author
    if (return_author && message.member !== null && (target === null || target === undefined)) {
        target = message.member;
    }
    
    // Return the user
    return target;
}

const get_channel = (message: Message, toFind: string) => {
    // let target = message.guild?.channels.cache.get(toFind);
    // if (!target && message.mentions.channels) {
    //     target = message.mentions.channels.first();
    // }
    // if (!target) {
    //     target = message.guild?.members.cache.find(member => {
    //         return member.displayName.toLowerCase().includes(toFind) ||
    //             member.user.tag.toLowerCase().includes(toFind);
    //     });
    // }
}

// Formats a date for string output
const format_date = (date: Date) => {
    return new Intl.DateTimeFormat('en-US').format(date);
}

export { 
    get_member,
    get_channel,
    format_date
}