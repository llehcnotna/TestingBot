const Discord = require("discord.js");
const moment = require("moment");

function convertMS(ms) {
    var d, h, m, s;
    s = Math.floor(ms / 1000);
    m = Math.floor(s / 60);
    s = s % 60;
    h = Math.floor(m / 60);
    m = m % 60;
    d = Math.floor(h / 24);
    h = h % 24;
    return {
        d: d
        , h: h
        , m: m
        , s: s
    };
};

exports.run = (client, message) => {    
    
    let u = convertMS(client.uptime);
    let uptime = u.d + " days : " + u.h + " hours : " + u.m + " minutes : " + u.s + " seconds"

   // var event = new Date('14 Jun 2017 00:00:00 PDT')
  //  const since = new Date(Date.now() - client.uptime).moment().format("dddd, MMMM Do YYYY, h:mm:ss a");


    const botembed = new Discord.RichEmbed()

        .setDescription(`🆙 **Uptime :**  ${uptime}`);


    message.channel.send(botembed);
}

module.exports.help = {
    name: "uptime"
} 
