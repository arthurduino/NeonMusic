const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'queue',
    description: 'Afficher la file d\'attente',
    aliases: ['q'],
    utilisation: '{prefix}queue',
    voiceChannel: true,
    playing: true,

    execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue.tracks[0]) return message.channel.send(`No music in the queue after the current one ${message.author}... try again ? ❌`);

        const methods = ['', '🔁', '🔂'];
        const tracks = queue.tracks.map((track, i) => `**${i + 1})** [${track.title}](${track.url}) (Demandé par \`${track.requestedBy.username}\`)`);
        const songs = queue.tracks.length;
        const other = songs - 5
		const nextSongs = songs > 5 ? `Et **${other}** autres ${other > 0 ? 'musique':'musiques'}...` : ``;


        message.channel.send({ embeds: [{
              author: { name: `File d'attente de ${message.guild.name} (${songs} ${songs > 1 ? 'titres' : 'titre'}) ${methods[queue.repeatMode]}`, icon_url: message.author.displayAvatarURL({ size: 1024, dynamic: true }) },
              color: 'BLUE',
              description: `**• En cours de lecture:** [${queue.current.title}](${queue.current.url}) (Demandé par \`${queue.current.requestedBy.username}\`)\n\n${tracks.slice(0, 5).join('\n')}\n\n${nextSongs}`
            }] });
    },
};