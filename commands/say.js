const Discord = require('discord.js');
const colors = require("../config/colours.json");

module.exports = {
    name: 'say',
    description: 'Send an announcement',
    args: true,
    execute(message, args) {
        message.delete();
        let description = args.join(" ");
        const rEmbed = new Discord.MessageEmbed()
        .setFooter(`This message has been sent by ${message.author.username}`)
        .setColor(colors.red)
        .setDescription(description);
        message.channel.send(rEmbed);
    }
};