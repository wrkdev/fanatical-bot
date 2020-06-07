const Discord = require('discord.js');
const cooldowns = new Discord.Collection();
const { prefix } = require('../config/config.json');
module.exports = (bot, message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    // Handling for aliased commands
    const command = bot.commands.get(commandName)|| bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;

    // Handling for guild only commands
    if (command.guildOnly && message.channel.type !== 'text') {
        return message.reply('I can\'t execute that command inside DMs!');
    }

    // Handling for when arguments are required.
    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;
        // Display command usage.
        if (command.usage) {
    		reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }
		return message.channel.send(reply);
    }

    // Handling for command cooldowns
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }
    
    // Code for setting the cooldown for the command used.
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;
    
    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }
    } else {
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    }

    console.info(`${message.author.id} sent the command ${command.name} in ${message.channel.name || 'DM'}`);

    // Executing the command
    try {
        if(command.name === 'userinfo' || command.name === 'serverinfo') {
            command.execute(bot, message, args);
        } else {
            command.execute(message, args);
        }
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
};