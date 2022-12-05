module.exports = async function(client, message, queue, song) {
    const { MessageEmbed } = require("discord.js");
    message.channel.send(
        new MessageEmbed()
        .setAuthor(song.name, song.thumbnail, song.url)
        .setColor('GREEN')
        .setThumbnail(song.thumbnail)
        .setDescription(`✅ | **__[${song.name}](${song.url})__** تم الاضافة الى الانتظار`)
        .setFooter(song.formattedDuration + ` | ${song.likes}👍 ${song.dislikes}👎`)
    );
};