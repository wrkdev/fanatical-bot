module.exports = {
    name: 'clear',
    description: 'Clear specified number of messages',
    usage: 'f!clear [number]',
    aliases: ['prune', 'purge'],
    args: true,
    execute(message, args) {
        const amount = parseInt(args[0]) + 1;
    
        if (isNaN(amount)) {
            return message.channel.send('that doesn\'t seem to be a valid number.');
        } else if (amount <= 1 || amount > 100) {
            return message.channel.send('you need to input a number between 1 and 99.');
        }
        console.log(message.channel);
        if (message.channel.type !== "dm") {
            message.channel.bulkDelete(amount, true).catch(err => {
                console.error(err);
                message.channel.send('there was an error trying to prune messages in this channel!');
            });
        } else {
            message.channel.send("You can't clear messages in your DM's unfortunately.");
        }
    }
};