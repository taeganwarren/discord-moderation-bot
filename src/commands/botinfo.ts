// Library Imports
import { MessageEmbed } from 'discord.js';
import { stripIndents } from 'common-tags';
// Project imports
import { get_member, format_date } from '../utils/functions';
import config from '../botconfig.json';
import { Command } from '../types/interfaces/command';

// Command definition
export default {

    // Properties
    name: 'botinfo',
    description: 'Information about the bot.',
    usage: '',
    permissions: [],
    dm: false,
    aliases: [],
    cooldown: 0,

    // Execute function
    // TODO: Better logic for date and other possibly null/undefined variables
    // TODO: Fix hardcoded color value
    // TODO: Maybe allow to run in DM's
    execute: async (bot, prefix, message, args) => {

        // Return if the guild is not available
        if (!message.guild?.available) { return; }

        // Get the information related to the bot in the specific server
        const member = get_member(message, config.id, false);
        if (!member) { return; }

        // Get the roles assigned to the bot
        const roles = member.roles.cache
            .filter(r => r.id !== message.guild?.id)
            .map(r => r).join(", ") || 'none';

        // Format developers string
        let developers = '';
        config.developers.forEach((element: string) => {
            if (element !== config.developers[config.developers.length-1]) {
                developers += `${element} `;
            } else {
                developers += element
            }
        });

        // Get date information
        if (!member.joinedAt) { return; }
        const joined = format_date(member.joinedAt);
        const created = format_date(member.user.createdAt);

        // Create bot embed
        const bot_info_embed = new MessageEmbed()
            .setThumbnail(member.user.displayAvatarURL())
            .setColor([56, 112, 184])
            .addField('User information:', stripIndents`
            **\\> Username:** ${member?.user.username}
            **\\> Tag:** ${member?.user.tag}
            **\\> Created:** ${created}`, true)
            .addField('Server Specific Information:', stripIndents`
            **\\> Display name:** ${member?.displayName}
            **\\> Joined:** ${joined}
            **\\> Roles:** ${roles}`, true)
            .addField('Project Information', stripIndents`
            **\\> Project name:** ${config.name}
            **\\> Description:** ${config.description}
            **\\> Version:** ${config.version}
            **\\> Developers:** ${developers}`);
            
        // Send embed
        message.channel.send(bot_info_embed);
    }

} as Command;