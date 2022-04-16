const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const db = require('quick.db')

var control = new db.table('control')

module.exports = {
    name: 'control',
    aliases: [],
    description: 'Menu d\'aide',
    showHelp: false,
    utilisation: '{prefix}help',

    execute(client, message, args) {
        
        if(!message.member.permissions.has('ADMINISTRATOR')) return message.reply(`Pour utiliser cette commande, vous devez avoir la permssion **ADMINISTRATEUR** !`)
        
        if (message.guild.channels.cache.find(ch => ch.name === "Musique 🎵")) return message.reply(`Une catégorie de musique existe déjà !`)
            
        const skip = new MessageButton()
      		.setLabel("⏭ Passer")
      		.setStyle("PRIMARY")
        	.setCustomId('skipTrack_private')
        const save = new MessageButton()
      		.setLabel("💾 Enregistrer")
      		.setStyle("PRIMARY")
        	.setCustomId('saveTrack')
        const shuffle = new MessageButton()
      		.setLabel("🔀 Mélanger")
      		.setStyle("PRIMARY")
        	.setCustomId('shuffleTrack_private')
        const queue = new MessageButton()
      		.setLabel("📑 File d'attente")
      		.setStyle("PRIMARY")
        	.setCustomId('queue_private')
        const row = new MessageActionRow().addComponents (save, skip, shuffle, queue)
        
        message.guild.channels.create(`Musique 🎵`, {type:'GUILD_CATEGORY'}).then(channel => {
        	message.guild.channels.create(`Musique`, {type:'GUILD_VOICE', parent: channel.id})
        	message.guild.channels.create(`Contrôle`, {type:'GUILD_TEXT', parent: channel.id, permissionOverwrites: [
            		{
              			deny: ['SEND_MESSAGES'],
              			id: message.guild.id
            		}
          		]}).then(channel => {
                client.channels.cache.get(channel.id).send({embeds: [{
                    title: 'Music Controller',
                    color: 'BLUE'
                }], components: [row]}).then(msg =>{
                    control.set(`${message.guild.id}_message`, msg.id)
                    console.log(`message set : ${msg.id}`)
                })
                
                message.reply(`Votre catégorie de musique à bien étée créée ! Vous pouvez désormais controler la musique dans <#${channel.id}>`)
                control.set(`${message.guild.id}_channel`, channel.id)
                console.log(`channel set : ${channel.id}`)
            })    
        })
       
    },
};
