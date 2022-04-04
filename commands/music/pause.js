module.exports = {
    name: 'pause',
    description: 'Mettre la musique sur pause',
    aliases: [],
    utilisation: '{prefix}pause',
    voiceChannel: true,
    playing: true,

    execute(client, message) {
        const queue = player.getQueue(message.guild.id);
        const success = queue.setPaused(true);

        return message.channel.send(success ? `J'ai mis sur pause **${queue.current.title}**. ✅` : `Quelque chose c'est mal passé. Veuillez réésayer.`);
    },
};