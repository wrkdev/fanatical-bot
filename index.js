const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const bot = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const cooldowns = new Discord.Collection();

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
}

// Reads the events folder for files and executes the event.
 fs.readdir("./events/", (err, files) => {
     if (err) return console.error(err);
     files.forEach(file => {
         const event = require(`./events/${file}`);
         let eventName = file.split(".")[0];
         bot.on(eventName, event.bind(null, bot));
     });
 });

// Functionality for when the bot is ready to receive commands.
bot.once('ready', () => {
    console.log(`${bot.user.username} has logged into the Server!`);
    bot.guilds.cache.forEach(guild => {
        console.log(`Ready to serve in ${bot.channels.cache.size} channels on ${guild.name}, for a total of ${bot.users.cache.size} users.`);
        bot.user.setActivity(guild.name, { type: "WATCHING" });
    });
});

// Functionality for giving a user a role based on their reaction
bot.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.partial) {
        try {
            await reaction.fetch();
        } catch (error) {
            console.log('Something went wrong when fetching the message: ', error);
            return;
        }

        if (reaction.message.channel.name === 'general') {
            const guild = reaction.message.guild;
            const memberWhoReacted = guild.members.cache.find(member => member.id === user.id);
            let role = null;
            switch (reaction.emoji.name) {
                case '🇪':
                    role = guild.roles.cache.find(role => role.name === 'EU');
                    memberWhoReacted.roles.add(role);
                    break;
                case '🇺':
                    role = guild.roles.cache.find(role => role.name === 'US');
                    memberWhoReacted.roles.add(role);
                    break;
            }
        }
    }
});

// Functionality for removing a role based on a user's reaction
bot.on('messageReactionRemove', async (reaction, user) => {
    if (reaction.partial) {
        try {
            await reaction.fetch();
        } catch (error) {
            console.log('Something went wrong when fetching the message: ', error);
            return;
        }

        if (reaction.message.channel.name === 'general') {
            const guild = reaction.message.guild;
            const memberWhoReacted = guild.members.cache.find(member => member.id === user.id);
            let role = null;
            switch (reaction.emoji.name) {
                case '🇪':
                    role = guild.roles.cache.find(role => role.name === 'EU');
                    memberWhoReacted.roles.remove(role);
                    break;
                case '🇺':
                    role = guild.roles.cache.find(role => role.name === 'US');
                    memberWhoReacted.roles.remove(role);
                    break;
            }
        }
    }
});

// Functionality for when a message is received by the bot
bot.on('message', message => {
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

    console.info(`${message.author.id} sent the command ${command.name} in ${message.channel.name}`);

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
});

process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));

bot.login(token);