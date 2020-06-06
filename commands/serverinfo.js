const Discord = require('discord.js');
module.exports = {
    name: 'serverinfo',
    description: 'Get the Server Information',
    execute(bot, message, args) {
        let sEmbed = new Discord.MessageEmbed()
        .setTitle("Server Information")
        .setColor("F55F37")
        .setAuthor(`${message.guild.name} Info`, message.guild.iconURL)
        .setThumbnail(message.guild.iconURL)
        .addFields({ name: "**Server Name**", value: `${message.guild.name}`, inline: true })
        .addFields({ name: "**Server Owner**", value: `${message.guild.owner}`, inline: true })
        .addFields({ name: "**Member Count**", value: `${message.guild.memberCount}`, inline: true })
        .addFields({ name: "**Role Count**", value: `${message.guild.roles.cache.size}`, inline: true })
        .setFooter("Fanatical Bot | Footer", bot.user.displayAvatarURL);
        message.channel.send(sEmbed);
    }
};