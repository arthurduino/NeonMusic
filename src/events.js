const Discord = require('discord.js')
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

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
 
player.on('error', (queue, error) => {
    console.log(`Error emitted from the queue: ${error.message}`);
    client.channels.cache.get('959485725307449414').send({
            embeds: [{
              title: `Erreur émise depuis la queue`,
              color: 'RED',
              description: `\`\`\`${error.message}\`\`\``
            }]
          })
});

player.on('connectionError', (queue, error) => {
    console.log(`Error emitted from the connection: ${error.message}`);
    client.channels.cache.get('959485725307449414').send({
            embeds: [{
              title: `Erreur émise depuis la connexion`,
              color: 'RED',
              description: `\`\`\`${error.message}\`\`\``
            }]
          })
});

player.on('trackStart', (queue, track) => {
    if (!client.config.opt.loopMessage && queue.repeatMode !== 0) return;
    const row = new MessageActionRow().addComponents(saveButton, skipButton, shuffleButton, queueButton);
    
    queue.metadata.send({
            embeds: [{
              title: `En cours de lecture : __${track.title}__`,
              thumbnail: {url: track.thumbnail},
              color: 'BLUE',
              fields: [
                  {name: '💡 Demandé par :', value: `<@${track.requestedBy.id}>`, inline: true},
                  {name: '<:youtube:905725669986693140>  Lien :', value: `[\`Clique ici\`](${track.url})`, inline: true},
                  {name: '⏱️ Durée :', value: `\`${track.duration}\``, inline: true}
                ]
            }],components: [row]})
});

player.on('trackAdd', (queue, track) => {
    queue.metadata.send({
            embeds: [{
              color: 'BLUE',
              description: `**${track.title}** a été ajouté à la file d'attente.`
            }]
          })
});

player.on('botDisconnect', (queue) => {
    queue.metadata.send({
            embeds: [{
              color: 'RED',
              description: `La musique s\'est arrêtée car j\'ai été déconnecté du canal vocal !`
            }]
          })
});

player.on('channelEmpty', (queue) => {
    queue.metadata.send({
            embeds: [{
              color: 'RED',
              description: `La musique s'est arrêtée car il n'y a plus de membre dans le canal vocal !`
            }]
          })
});

player.on('queueEnd', (queue) => {
    queue.metadata.send({
            embeds: [{
              color: 'RED',
              description: `La musique s'est arrêtée car il n'y a plus de musique dans la file d'attente !`
            }]
          })
});