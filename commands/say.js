const Discord = require('discord.js');
const colors = require("../config/colours.json");

module.exports = {
    name: 'say',
    description: 'Send an announcement to current channel',
    aliases: ['announce'],
    usage: 'f!say [message]',
    args: true,
    execute(message, args) {
        message.delete();
        let description = args.join(" ");
        const rEmbed = new Discord.MessageEmbed()
        .setColor(colors.orange)
        .setDescription(description);
        message.channel.send(rEmbed);
    }
};