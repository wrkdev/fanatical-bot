const fs = require('fs');
const Discord = require('discord.js');
const { token } = require('./config.json');

const bot = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

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
        console.log(`Ready to receive commands in ${bot.channels.cache.size} channels on ${guild.name}, for a total of ${bot.users.cache.size} users.`);
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
    }

    if (reaction.message.channel.name === 'general') {
        const guild = reaction.message.guild;
        const memberWhoReacted = guild.members.cache.find(member => member.id === user.id);
        let role = null;
        console.info(`Adding role to ${memberWhoReacted}`);
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
    }

    if (reaction.message.channel.name === 'general') {
        const guild = reaction.message.guild;
        const memberWhoReacted = guild.members.cache.find(member => member.id === user.id);
        let role = null;
        console.info(`Removing role from ${memberWhoReacted}`);
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
});

process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));

bot.login(token);