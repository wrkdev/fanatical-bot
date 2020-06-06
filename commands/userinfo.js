const Discord = require('discord.js');
module.exports = {
    name: 'userinfo',
    description: 'Get the User Information',
    execute(bot, message, args) {

        if (!message.mentions.users.size) {
            let sEmbed = new Discord.MessageEmbed()
            .setTitle("User Information")
            .setColor("23A33B")
            .setAuthor(`${message.guild.name} Info`, message.guild.iconURL)
            .setThumbnail(message.guild.iconURL)
            .addFields({ name: "**Username**", value: `${message.author.username}`, inline: true })
            .addFields({ name: "**Discriminator**", value: `${message.author.discriminator}`, inline: true })
            .addFields({ name: "**ID**", value: `${message.author.id}`, inline: true })
            .addFields({ name: "**Status**", value: `${message.author.presence.status}`, inline: true })
            .addFields({ name: "**Created At**", value: `${message.author.createdAt}`, inline: true })
            .setFooter("Fanatical Bot | Footer", bot.user.displayAvatarURL);
            message.channel.send(sEmbed);
        } else {
            const avatarList = message.mentions.users.map(user => {
                
                let sEmbed = new Discord.MessageEmbed()
                .setTitle("User Information")
                .setColor("23A33B")
                .setAuthor(`${message.guild.name} Info`, message.guild.iconURL)
                .setThumbnail(message.guild.iconURL)
                .addFields({ name: "**Username**", value: `${user.username}`, inline: true })
                .addFields({ name: "**Discriminator**", value: `${user.discriminator}`, inline: true })
                .addFields({ name: "**ID**", value: `${user.id}`, inline: true })
                .addFields({ name: "**Status**", value: `${user.presence.status}`, inline: true })
                .addFields({ name: "**Created At**", value: `${user.createdAt}`, inline: true })
                .setFooter("Fanatical Bot | Footer", bot.user.displayAvatarURL);
                return sEmbed;
            });

            message.channel.send(avatarList);
        }

    }
}