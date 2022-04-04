module.exports = (client, message) => {
    if (message.author.bot || message.channel.type === 'dm') return;

    const prefix = client.config.app.px;

    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
	
    const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));
	
    const DJ = client.config.opt.DJ;
	
    const queue = player.getQueue(message.guild.id);
    
    if (cmd && DJ.enabled && DJ.commands.includes(cmd.name)) {
        const roleDJ = message.guild.roles.cache.find(x => x.name === DJ.roleName);

        if (!message.member._roles.includes(roleDJ.id)) {
            return message.channel.send(`This command is reserved for members with the ${DJ.roleName} role on the server ${message.author}... try again ? ❌`);
        }
    }

    if (cmd && cmd.voiceChannel) {
        if (!message.member.voice.channel) return message.channel.send({ embeds: [{
              color: 'RED',
        	  description: `Vous devez être dans un canal vocal pour utiliser cette commande !`
    	}]});

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send({ embeds: [{
              color: 'RED',
        	  description: `Vous devez être dans le même canal vocal que moi pour utiliser cette commande !`
    	}]});
    }
    
    if (cmd && cmd.playing) {
        if (!queue || !queue.playing) return message.channel.send({ embeds: [{
              color: 'RED',
        	  description: `Aucune musique de joue actuellement sur le serveur !`
    	}]});
    }
    

    if (cmd) cmd.execute(client, message, args);
    client.channels.cache.get('959485725307449414').send({ embeds: [{
              color: '#36393f',
        	  description: `**Time: **<t:${Math.floor(Date.now() / 1000)}>\n**User: **${message.author.username} \`${message.author.id}\`\n**Serveur: **${message.guild.name}\n**Commande: **\`${message.content}\``
    	}]})
};