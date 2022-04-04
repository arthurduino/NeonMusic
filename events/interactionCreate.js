module.exports = (client, int) => {
    if (!int.isButton()) return;

    const queue = player.getQueue(int.guildId);

    switch (int.customId) {
        case 'saveTrack': {
            if (!queue || !queue.playing) return int.reply({ content: `Aucune musique ne joue actuellement sur le serveur.`, ephemeral: true, components: [] });
			const timestamp = queue.getPlayerTimestamp();
            
            return int.member.send({
            embeds: [{
              title: `${queue.current.title}`,
              author: { name: `${int.guild.name} - Sauvegarde`, icon_url: int.member.displayAvatarURL({dynamic: true}) },
              thumbnail: {url: queue.current.thumbnail},
              color: 'BLUE',
              fields: [
				  {name: '🎤 Auteur :', value: `${queue.current.author}`, inline: true},
                  {name: '<:youtube:905725669986693140>  Lien :', value: `[\`Clique ici\`](${queue.current.url})`, inline: true},
                  {name: '⏱️ Durée :', value: `\`${queue.current.duration}\``, inline: true},
                  {name: '⏏️ Progession :', value: `${timestamp.progress == 'Infinity' ? 'LIVE 🔴' : queue.createProgressBar()}`, inline: false}
                ],
            }]
          }).then(() => {
                return int.reply({ content: `Je vous ai envoyé la musique en message privé ✅`, ephemeral: true, components: [] });
            }).catch(error => {
                return int.reply({ content: `Je n'ai pas réussi à vous envoyer un message privé... Vérifiez vos paramètres puis réésayez.`, ephemeral: true, components: [] });
            });
        }
        case 'skipTrack': {
            if (!queue || !queue.playing) return message.channel.send(`Aucune musique ne joue actuellement sur le serveur.`);
            queue.skip()
            return int.reply({ content: `J'ai passé la musique en cours de lecture ✅`})
        }
        case 'shuffleTrack': {
            if (!queue.tracks[0]) return int.reply({ content: `Il n'y a aucune musique dans la file d'attente après la musique actuelle.`, ephemeral: true});
            queue.shuffle()
            return int.reply({ content: `La file d'attente a mélangé **${queue.tracks.length}** chanson(s) ! ✅`})
        }
        case 'queue': {
            if (!queue.tracks[0]) return int.reply({ content: `Il n'y a aucune musique dans la file d'attente après la musique actuelle.`, ephemeral: true});
            
            const methods = ['', '🔁', '🔂'];
            const tracks = queue.tracks.map((track, i) => `**${i + 1})** [${track.title}](${track.url}) (Demandé par \`${track.requestedBy.username}\`)`);
        	const songs = queue.tracks.length;
        	const nextSongs = songs > 5 ? `Et **${songs - 5}** autres musique(s)...` : ``;
            
            return int.reply({
            embeds: [{
              author: { name: `File d'attente de ${int.guild.name} (${songs} ${songs > 1 ? 'titres' : 'titre'}) ${methods[queue.repeatMode]}`, icon_url: int.user.displayAvatarURL({ size: 1024, dynamic: true }) },
              color: 'BLUE',
              description: `**• En cours de lecture:** [${queue.current.title}](${queue.current.url}) (Demandé par \`${queue.current.requestedBy.username}\`)\n\n${tracks.slice(0, 5).join('\n')}\n\n${nextSongs}`
            }], ephemeral: true
          })
        }
    }
};