module.exports = async function(client, message, queue, playlist, song) {
    const { MessageEmbed } = require("discord.js");
    message.channel.send(
        new MessageEmbed()
        .setAuthor(playlist.name, client.user.avatarURL({ dynamic: true }), playlist.url)
        .setColor('GREEN')
        .setDescription(`__**[${playlist.name}](${playlist.url})**__ الاغنية هي  __**${playlist.total_items}**__ جاري تشغيل الاغنية في الوقت الحالي`)
    )
}