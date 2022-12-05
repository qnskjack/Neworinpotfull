require("./server/express");
const { Client, Collection, GuildMember } = require("discord.js");
const client = new Client();
const chalk = require("chalk");
const fs = require("fs");
const DisTube = require('distube');
require('discord-buttons')(client);

client.distube = new DisTube(client, { searchSongs: false, emitNewSongOnly: true });
client.queue = new Map();
client.commands = new Collection();

fs.readdir(__dirname + "/bot/events/api/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let event = require(__dirname + "/bot/events/api/" + file);
        let eventName = file.split(".")[0];
        console.log(
            chalk.blue.bold("Loading api event ") + chalk.magenta.bold(`"${eventName}"`)
        );
        client.on(eventName, event.bind(null, client));
    });
});

fs.readdir(__dirname + "/bot/commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(__dirname + "/bot/commands/" + file);
        let commandName = file.split(".")[0];
        console.log(
            chalk.blue.bold("Loading command ") + chalk.red.bold(`"${commandName}"`)
        );
        client.commands.set(commandName, props);
    });
});

fs.readdir(__dirname + "/bot/events/music/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let event = require(__dirname + "/bot/events/music/" + file);
        let eventName = file.split(".")[0];
        console.log(
            chalk.blue.bold("Loading distube event ") + chalk.magenta.bold(`"${eventName}"`)
        );
        client.distube.on(eventName, event.bind(null, (client)));
    });
});

client.distube.on("playSong", (message, queue, song) => message.channel.send(
    `\`${song.name}\``
))
client.on("message", (msg) => {
    let prefix ="!!"
    let message = msg.content;

    if (message.startsWith(prefix)) {
        const command = message.slice(prefix.length).split(" ")[0];
        
        switch(command) {
            case "عزوقك": 
            msg.channel.send(' تفضل يا غالي');
            msg.channel.send('انجليزي');
            msg.channel.send('https://youtube.com/playlist?list=PLbZIPy20-1pN7mqjckepWF78ndb6ci_qi');
            msg.channel.send('عربي');
            msg.channel.send('https://youtube.com/playlist?list=PLHACtR4F3SV8N4_BcrQtEgdhvyIRsbo7K');
            msg.channel.send('روسي');
            msg.channel.send('https://youtube.com/playlist?list=PL1Y6V8MUlDe6IWedYgBVYfrApg7uC4bT-');
            break;

            case "اضافة": 
            msg.channel.send('جرب الرابط');
            msg.channel.send('https://discord.com/api/oauth2/authorize?client_id=854389681491542027&permissions=1110252195072&scope=bot');
            break;

          
        }
    }
})


client.login(require("./config/bot").token).catch(err => console.log(chalk.red.bold(err)))