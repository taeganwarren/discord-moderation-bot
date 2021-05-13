// Library imports
import { MessageEmbed } from 'discord.js';
import { stripIndents } from 'common-tags';
// Project imports
import { Command } from '../types/interfaces/command';
import { prefix } from '../botconfig.json';

// Command definition
export default {

    // Properties
    name: 'help',
    description: 'Shows help text.',
    usage: `\`${prefix}help\` or \`${prefix}help <command name>\``,
    permissions: [],
    dm: true,
    aliases: [],
    cooldown: 0,

    // Execute function
    execute: async (bot, prefix, message, args) => {

        // If user did not specify a command, send list of all commands.
        if (!args.length) {

            // Check if command was ran in a server
            if (message.guild === null) {
                message.channel.send(`${prefix}help can not be run in DM's. Please run this command in a server to view a list of commands available to you.`);
                return;
            }

            // Get the message author
            const author = message.member;

            // Get and format all commands
            let help_text: string[] = [];
            bot.commands.each(command => {
                if (author?.hasPermission(command.permissions)) {
                    help_text.push(`**\\> ${command.name}:** ${command.description}\n`);
                }
            });

			// Build the embed
			const embed = new MessageEmbed()
                .setDescription(`These are the commands that are availabe to you in the server: ${message.guild?.name}`)
				.addField('List of commands:', stripIndents`
				${help_text.join('')}
				You can send \`${prefix}help <command name>\` to get additional info on a specific command!`);

            // Send the embed
            return message.author.send(embed)
                .then(() => {
                    if (message.channel.type === 'dm') { return }
                    message.reply('I\'ve sent you a DM with your available commands!').then(res => {
                        message.delete({timeout: 3000});
                        res.delete({timeout: 3000});
                    });
                })
                .catch (e => {
                    message.reply('it seems like I can\'t DM you!\nPlease check your DM settings and try again.');
                });

        } else {

            // Get requested command
            const name = args[0].toLowerCase();
            const command = bot.commands.get(name);

            // Return if the user gave an invalid command
            if (!command) {
                return message.reply('Invalid command.');
            }

            // Build the embed
            const embed = new MessageEmbed()
                .addField(`Command information:`, stripIndents`
                **\\> Name:** ${command.name}
                **\\> Description:** ${command.description}
                **\\> Permissions:** ${command.permissions.join(', ')}
                **\\> Aliases:** ${command.aliases.join(', ')}
                **\\> Cooldown time:** ${command.cooldown}
                **\\> Usage:** ${command.usage}`);

            // Send the embed
            return message.channel.send(embed);
        }
    }

} as Command;