module.exports = {
    name: 'back',
	description: 'Jouer la musique précedente',
    aliases: ['previous'],
    utilisation: '{prefix}back',
    voiceChannel: true,
    playing: true,

    async execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue.previousTracks[1]) return message.channel.send(`Il n'y avait pas de musique en cours de lecture précédement...`);

        await queue.back();

        message.channel.send(`Je joue la musique précédente. ✅`);
    },
};