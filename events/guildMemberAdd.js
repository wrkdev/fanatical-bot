module.exports = (bot, member) => {
    const welcomeChannel = member.guild.channels.cache.find(channel => channel.name === "welcome-bot");
    if(!welcomeChannel) return;
    welcomeChannel.send(`Welcome ${member.user} to the ${member.guild.name}. Please the read the #rules to be given a role.`).catch(console.error);
    member.send(`Welcome to ${member.guild.name}`);
};