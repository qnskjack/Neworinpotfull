module.exports = async function(client, message, queue, song) {
    const { MessageEmbed } = require("discord.js");
    const { MessageButton, MessageActionRow } = require("discord-buttons")
    const newSong = new MessageEmbed()
        
        .setAuthor(song.name, song.thumbnail, song.url)
        .setColor('blue')
        .setThumbnail(song.thumbnail)
        .setTimestamp()
        .addFields(
            
            { name: '\u200B', value: '\u200B' },
            { name: '⌚ الوقت', value: `${song.formattedDuration}`, inline: true },
            { name: '☘️ بواسطة', value: `${message.author.username}#${message.author.discriminator}`, inline: true },
        )
        .addFields({ name: 'Channel', value: `${message.channel}`, inline: true })

        .setImage("https://cdn.discordapp.com/attachments/861191689662103552/1013410422675746846/698a03c9101487ecd2bdf4c5f2225df9.gif")
    const stop = new MessageButton()
        .setStyle('grey')
        .setEmoji('🛑')
        .setID('stop');
    const loop = new MessageButton()
        .setStyle('blurple')
        .setEmoji('🔄')
        .setID('loop');
    const lyrics = new MessageButton()
        .setStyle('grey')
        .setEmoji('📑')
        .setID('lyrics');
    const skip = new MessageButton()
        .setStyle('blurple')
        .setEmoji('⏭')
        .setID('skip');
    const pause = new MessageButton()
        .setStyle('blurple')
        .setEmoji('⏸')
        .setID('pause');
    const resume = new MessageButton()
        .setStyle('grey')
        .setEmoji('▶')
        .setID('resume');
    const row = new MessageActionRow()
        .addComponent(stop)
        .addComponent(loop)
        .addComponent(lyrics);
    const row2 = new MessageActionRow()
        .addComponent(pause)
        .addComponent(resume)
        .addComponent(skip);
    message.channel.send({
        embed: newSong,
        components: [
            row,
            row2
        ]
    });
};