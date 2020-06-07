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
        // .setThumbnail('https://cdn.discordapp.com/avatars/666375055558705152/4429d4778ecf332843e19e38700b72f3.png')
        .setDescription(description);
        message.channel.send(rEmbed);
    }
};