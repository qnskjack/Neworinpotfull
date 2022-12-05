module.exports = {
    name: "help",
    cooldown: 3,
    description: 'bot orders',
    aliases: ["h"],
    run: async function(client, message, args, user) {
        try {
            const { MessageEmbed } = require('discord.js');
            var prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`);
            if (prefix == null) prefix = require('../../config/bot').prefix;
            let help = new MessageEmbed()
            .setImage("https://cdn.discordapp.com/attachments/830139982890532904/999310978330148904/My_Video3.gif")
            .setTitle(`🎵جميع اوامر التشغيل | يمكنك دخول السيرفر ان كنت بحاجة لمساعدة 🎵`)
            .setColor('YELLOW')
                .setAuthor('➕ | JOIN DISCORD | انضم الينا ', client.user.avatarURL({ dynamic: true }), `https://discord.gg/Acc3z6fvU9`)
                .setDescription("🟤 نحن اناس نحب مساعدة الاخرين ونسعى لجعل المتعة اكثر لهاذا صنع البوت اورين - ان بوت اورين بوت يتطور مع الوقت بهدف مساعدة الاخرين وهو مجاني بالكامل 🟤")
            require('fs').readdir(__dirname + '/', (err, files) => {
                if (err) return console.error(err);
                files.forEach(file => {
                    if (!file.endsWith(".js")) return;
                    let props = require(__dirname + '/' + file);
                    let commandName = file.split(".")[0];
                    help.addFields({ name: prefix + props.name, value: props.description, inline: true })
                });
            });
            setTimeout(() => {
                message.channel.send({
                    embed: help
                })
            }, 500);
        } catch (err) {
            console.log(err)
        }
    }
};