const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'nowplaying',
    description: 'Voir la musique en cours de lecture',
    aliases: ['np'],
    utilisation: '{prefix}nowplaying',
    voiceChannel: true,

    execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`Aucune musique ne joue actuellement sur le serveur ❌`);

        const track = queue.current;
        

        const embed = new MessageEmbed();

        const methods = ['disabled', 'track', 'queue'];

        const timestamp = queue.getPlayerTimestamp();
        const trackDuration = timestamp.progress == 'Infinity' ? 'LIVE 🔴' : track.duration;
        /*if(timestamp.progress == 'Infinity'){
            progressBar = `LIVE 🔴`
        }else{
            progressBar = createProgressBar()
        }*/

        const saveButton = new MessageButton()
        	.setLabel('Enregistrer')
        	.setCustomId('saveTrack')
        	.setStyle('SUCCESS')
        const skipButton = new MessageButton()
        	.setLabel('⏭ Passer')
        	.setCustomId('skipTrack')
        	.setStyle('SECONDARY')
        const shuffleButton = new MessageButton()
        	.setLabel('🔀 Aléatoire')
        	.setCustomId('shuffleTrack')
			.setStyle('SECONDARY')
        const queueButton = new MessageButton()
        	.setLabel('📑 File d\'attente')
        	.setCustomId('queue')
			.setStyle('SECONDARY')

        const row = new MessageActionRow().addComponents(saveButton, skipButton, shuffleButton, queueButton);

        message.channel.send({ embeds: [{
              color: 'BLUE',
              title: `En cours de lecture : __${track.title}__`,
              thumbnail: {url: track.thumbnail},
              fields: [
                  {name: '💡 Demandé par :', value: `<@${track.requestedBy.id}>`, inline: true},
                  {name: '<:youtube:905725669986693140>  Lien :', value: `[\`Clique ici\`](${track.url})`, inline: true},
                  {name: '⏱️ Durée :', value: `\`${track.duration}\``, inline: true},
                  {name: '🔊 Volume :', value: `${queue.volume}%`, inline: true},
                  {name: '🔁 Mode répétition :', value: `${methods[queue.repeatMode] == 'disabled' ? 'Désactivé' : 'Activé'}`, inline: true},
                  {name: '⏏️ Progession :', value: `${timestamp.progress == 'Infinity' ? 'LIVE 🔴' : queue.createProgressBar()}`, inline: false}
                ],
              footer: { icon_url: client.user.displayAvatarURL(), text: client.config.footer }
            }], components: [row] });
    },
};