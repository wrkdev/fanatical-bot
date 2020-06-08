const { prefix } = require('../config/config.json');
const Discord = require('discord.js');

module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['help'],
    usage: 'f!help [command]',
    inHelp: 'yes',
	cooldown: 5,
	execute(message, args) {

        function embedAllCommands(object) {
            let embedMessage = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle("Fanatical's Bot Command List")
                .setThumbnail('https://cdn.discordapp.com/avatars/718008997797691422/54bf8ba8436a8fd10489691294d76bfc.png')
                .setDescription(`Information about all the available commands.\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`, 'https://cdn.discordapp.com/avatars/718008997797691422/54bf8ba8436a8fd10489691294d76bfc.png');
            const argumentArray = object.map(command => command);
            argumentArray.forEach(commandInfo => {
                embedMessage.addFields(
                    { name: 'Command', value: commandInfo.name, inline: false },
                    { name: 'Description', value: commandInfo.description, inline: false }
                )
            });
            embedMessage.setTimestamp();
            return embedMessage;
        }

        function turnToEmbed(object) {
            let embedMessage = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`Command Info about: *${object.name}*`)
                .setDescription(object.description)
                .setTimestamp();
                if (object.usage) embedMessage.addField('Usage:', object.usage, true);
                if (object.aliases) embedMessage.addField('Aliases:', object.aliases.join(', '), true);
                embedMessage.addField('Cooldown (seconds)', command.cooldown || 3, true)
            return embedMessage;
        }

        const data = [];
        const { commands } = message.client;
        if (!args.length) {
            data.push('Here\'s a list of all my commands:');
            data.push(embedAllCommands(commands));

            return message.author.send(data, { split: true })
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.reply('I\'ve sent you a DM with all my commands!');
                })
                .catch(error => {
                    console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                    message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
                });
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply('that\'s not a valid command!');
        }
        data.push(turnToEmbed(command));
        message.channel.send(data, { split: true });
	},
};