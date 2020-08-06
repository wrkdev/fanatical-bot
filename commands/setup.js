const { prefix } = require('../config/config.json');
const Discord = require('discord.js');

module.exports = {
	name: 'setup',
	description: 'Command to setup the bot in your server',
    usage: 'f!setup',
	cooldown: 5,
	execute(message, args) {

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