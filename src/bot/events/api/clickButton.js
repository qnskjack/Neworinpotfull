module.exports = async function(client, button) {
        try {
            const distube = client.distube;
            const { MessageEmbed } = require('discord.js');
            let queue = distube.getQueue(button);
            if (!queue) {
                button.channel.send({
                    embed: {
                        title: `❌ |خطأ`,
                        description: `قائمة انتظار الخادم فارغة ، يرجى تشغيل الموسيقى أولاً`,
                        color: 0xF70000
                    }
                }).then(async function(msg) {
                    setTimeout(() => {
                        msg.delete()
                    }, 1000 * 5);
                });
                return
            }
            let ownerID = queue.songs.map((song, id) => song.user.id).slice(0, 1).join("\n");
            if (ownerID !== button.clicker.user.id) {
                button.channel.send({
                    embed: {
                        title: `❌ |خطأ`,
                        description: `فقط صاحب الاغنية <@!${ownerID}> يتحكم بالزر`,
                        color: 0xF70000
                    }
                }).then(async function(msg) {
                    setTimeout(() => {
                        msg.delete()
                    }, 1000 * 5);
                });
                return
            }
            if (button.id == 'stop') {
                distube.stop(button);
                button.channel.send(
                    new MessageEmbed()
                    .setColor('BLUE')
                    .setDescription(`🛑 | توقف عن العمل `)
                    .setFooter(client.user.username, client.user.avatarURL({ dynamic: true }))
                )
                
            } else if (button.id == 'skip') {
                distube.skip(button);
                button.channel.send(
                        new MessageEmbed()
                        .setColor('GREEN')
                        .setDescription(`⏭ | ${queue.songs.map((song, id) =>
`**[${song.name}](${song.url})**`).slice(0, 1).join("\n")} تم تخطي ${queue.songs.map((song, id) =>
`**[${song.name}](${song.url})**`).slice(1, 2).join("\n")}`)
.setFooter(client.user.username, client.user.avatarURL({ dynamic: true }))
).then(async function(msg) {

});
    } else if (button.id == 'pause') {
        distube.pause(button)
        button.channel.send(
            new MessageEmbed()
            .setAuthor(`⏸ | ايقاف مؤقت`, client.user.avatarURL({ dynamic: true }), `https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=6479507312`)
            .setColor('BLUE')
            .setDescription(`⏸ | تم ايقاف لوقت قصير`)
            .setFooter(client.user.username, client.user.avatarURL({ dynamic: true }))
        ).then(async function(msg) {
            
        });
    } else if (button.id == 'resume') {
        distube.resume(button)
        button.channel.send(
            new MessageEmbed()
            .setAuthor(`⏯ | استمرار`, client.user.avatarURL({ dynamic: true }), `https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=6479507312`)
            .setColor('BLUE')
            .setDescription(`⏸ | العيشة بدون ما تمشي`)
            .setFooter(client.user.username, client.user.avatarURL({ dynamic: true }))
        ).then(async function(msg) {
            
        });
    } else if (button.id == 'loop') {
        let modeler = 1;
        distube.setRepeatMode(button, parseInt(modeler));
        button.channel.send(
            new MessageEmbed()
            .setAuthor(`🔄 | وضع التكرار`, client.user.avatarURL({ dynamic: true }), `https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=6479507312`)
            .setColor('BROWN')
            .setDescription(`🔄 | وضع الاغاني تحول الى وضع :تكرار الاغاني`)
            .setFooter(client.user.username, client.user.avatarURL({ dynamic: true }))
        ).then(async function(msg) {
            
        });
    } else if (button.id == 'lyrics') {
        let name = queue.songs.map((song, id) => song.name).slice(0, 1).join("\n");
        let thumbnail = queue.songs.map((song, id) => song.thumbnail).slice(0, 1).join("\n");
        let url = queue.songs.map((song, id) => song.url).slice(0, 1).join("\n");
        var lyrics = await require('lyrics-finder')(name, name) || "Not Found!";
        button.channel.send(
            new MessageEmbed()
            .setAuthor(`📑 | Lyrics`, thumbnail, url)
            .setColor('GREEN')
            .setThumbnail(thumbnail)
            .setDescription(lyrics)
            .setFooter(client.user.username, client.user.avatarURL({ dynamic: true }))
        ).then(async function(msg) {
          
        });
    }
} catch (err) {
    console.log(err)
}
}