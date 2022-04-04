const { QueryType } = require('discord-player');

module.exports = {
    name: 'play',
    description: 'Jouer une musique',
    aliases: ['p'],
    utilisation: '{prefix}play [musique/URL]',
    voiceChannel: true,

    async execute(client, message, args) {
        if (!args[0]) return message.channel.send(`Veuillez réésayer avec une recherche valide !`);

        const res = await player.search(args.join(' '), {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return message.channel.send(`Auncun resultat pour cette recherche !`);

        const queue = await player.createQueue(message.guild, {
            metadata: message.channel
        });

        try {
            if (!queue.connection) await queue.connect(message.member.voice.channel);
        } catch {
            await player.deleteQueue(message.guild.id);
            return message.channel.send(`Je ne peux pas rejoindre votre canal vocal. Veuillez vérifier mes permissions.`);
        }

        await message.channel.send(`<a:loading:905136028594094182> Chargement de votre ${res.playlist ? 'playlist' : 'musique'}...`);

        res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

        if (!queue.playing) await queue.play();
    },
};