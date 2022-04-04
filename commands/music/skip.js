module.exports = {
    name: 'skip',
    description: 'Jouer la musique suivante',
    aliases: ['sk'],
    utilisation: '{prefix}skip',
    voiceChannel: true,

    execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`Aucune musique ne joue actuellement sur le serveur.`);

        const success = queue.skip();

        return message.channel.send(success ? `La musique **${queue.current.title}** a été passée. ✅` : `Quelque chose ne c'est pas passé correctement... Veuillez réésayer.`);
    },
};