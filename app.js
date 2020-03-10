const config = require('./config.json'); // requires prefix and bot token
const Discord = require('discord.js'); // requires discord.js
const ddiff = require('return-deep-diff'); // requires ddiff
const moment = require('moment');

// TEST //
var http = require('http'); //importing http

function startKeepAlive() {
    setInterval(function() {
        var options = {
            host: 'your_app_name.herokuapp.com',
            port: 80,
            path: '/'
        };
        http.get(options, function(res) {
            res.on('data', function(chunk) {
                try {
                    // optional logging... disable after it's working
                    console.log("HEROKU RESPONSE: " + chunk);
                } catch (err) {
                    console.log(err.message);
                }
            });
        }).on('error', function(err) {
            console.log("Error: " + err.message);
        });
    }, 20 * 60 * 1000); // load every 20 minutes
}

startKeepAlive();
//////////

const fs = require('fs'); // require files

const client = new Discord.Client({disableEveryone: true});
client.commands = new Discord.Collection();

//command handler setup
fs.readdir('./commands', (err, files) => {

    if(err) console.log(err);

    let jsfile = files.filter(f => f.split('.').pop() === 'js');
    if (jsfile.length <= 0){
        console.log('couldn\'t find commands.');
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`[ LOG ] ${f} loaded!`);
        client.commands.set(props.help.name, props);
    });


});
//client events (playing, watching, streaming...)
client.on("ready", async () => {
    console.log(`\n[ LOG ] ${client.user.username} is online!`); // checking if the bot is online.
    client.user.setStatus('online'); // Change Status
    function setActivity() {
        //Variable Array for what the setGame can be set to
        var Gameinfo = [`${config.prefix}help`, `Javascript` // Change these to what you want, add as many or as few as you want to
        ]
    
        var info = Gameinfo[Math.floor(Math.random() * Gameinfo.length)]; //Random Math to set the setGame to something in the GameInfo array
    
        client.user.setActivity(info) // "playing Game" '...' Sets the setGame to what the info Random math picked from the GameInfo Array
        if (config.debugMode === "1") {
            console.log(`[ LOG ] set Activity set to ( ${info} )`) //Logs to console what the setGame was set as.
        }
    
    }
    
    setInterval(setActivity, 1000 * 60 * 10) //sets and picks a new game every 10 minutes
    });

//perms stuffs..
client.on('message', async message => {

    if (message.author.bot) return; // If message author = bot return
    if (message.channel.type === "dm") return; // If message sent in DM's return

    let prefix = config.prefix; // let prefix = config.prefix
    if(!message.content.startsWith(prefix)) return; // If message does not start with Prefix return
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1)

    let commandfile = client.commands.get(command.slice(prefix.length));
    if (commandfile) commandfile.run(client, message, args);

    // const command = args.shift().toLowerCase();
 });

client.login(process.env.BOT_TOKEN); // login token
