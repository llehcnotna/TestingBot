const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {

    // >ping

    message.channel.send(`Pong! \`${message.createdTimestamp - Date.now()} ms\``);
    
};

module.exports.help = {
    name: 'ping'
};
