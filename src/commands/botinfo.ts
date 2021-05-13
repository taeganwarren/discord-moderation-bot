// Library Imports
import { MessageEmbed } from 'discord.js';
import { stripIndents } from 'common-tags';
// Project imports
import { get_member, format_date } from '../utils/functions';
import config from '../botconfig.json';
import { Command } from '../types/interfaces/command';
import { logger } from '../utils/logger';

// Command definition
export default {

    // Properties
    name: 'botinfo',
    description: 'Information about the bot.',
    usage: '',
    permissions: [],
    dm: true,
    aliases: [],
    cooldown: 0,

    // Execute function
    execute: async (bot, prefix, message, args) => {

        // Format developers string
        let developers = '';
        config.developers.forEach((element: string) => {
            if (element !== config.developers[config.developers.length-1]) {
                developers += `${element} `;
            } else {
                developers += element
            }
        });

        // Create bot embed
        const bot_info_embed = new MessageEmbed();
        
        // Get bot information
        const member = get_member(message, config.id, false);
        const user = bot.user;

        // Get the server specific information if in a guild
        if (message.guild) {
            if (member && user) {
                // Get roles
                const roles = member?.roles.cache
                    .filter(r => r.id !== message.guild?.id)
                    .map(r => r).join(", ") || 'none';
                // Get date information
                if (!member?.joinedAt) { return; }
                const joined = format_date(member.joinedAt);
                const created = format_date(member.user.createdAt);
                // Server specific information
                bot_info_embed.addField('Server Specific Information:', stripIndents`
                    **\\> Display name:** ${member.displayName}
                    **\\> Joined:** ${joined}
                    **\\> Roles:** ${roles}`, true);
                // User information
                bot_info_embed.addField('User information:', stripIndents`
                    **\\> Username:** ${member.user.username}
                    **\\> Tag:** ${member.user.tag}
                    **\\> Created:** ${created}`, true)
            } else {
                bot.logger.error({message: `Error getting bot details in server ${message.guild.name}:\n${member}\n${user}`});
                return;
            }
        } else {
            if (user) {
                // Get date information
                const created = format_date(user.createdAt);
                // User information
                bot_info_embed.addField('User information:', stripIndents`
                    **\\> Username:** ${user.username}
                    **\\> Created:** ${created}`, true)
            } else {
                bot.logger.error({message: `Error getting bot details in DM's:\n${user}`});
                return;
            }
        }

        // Set thumbnail
        bot_info_embed.setThumbnail(user.displayAvatarURL());

        // Project Information
        bot_info_embed.addField('Project Information', stripIndents`
            **\\> Project name:** ${config.name}
            **\\> Description:** ${config.description}
            **\\> Version:** ${config.version}
            **\\> Developers:** ${developers}`);

        // Send embed
        message.channel.send(bot_info_embed);   
    }

} as Command;