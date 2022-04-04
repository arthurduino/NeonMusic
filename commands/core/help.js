const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'help',
    aliases: ['h'],
    description: 'Menu d\'aide',
    showHelp: false,
    utilisation: '{prefix}help',

    execute(client, message, args) {
        const server = new MessageButton()
      		.setURL("https://discord.gg/XVgXcfE9mb")
      		.setLabel("Serveur de support")
      		.setStyle("LINK")
        const add = new MessageButton()
      		.setURL("https://discord.com/api/oauth2/authorize?client_id=909826264645373972&permissions=139887766865&scope=bot%20applications.commands")
      		.setLabel("Ajouter le bot")
      		.setStyle("LINK")
        
        const row = new MessageActionRow().addComponents (server, add);
        
        

        const commands = client.commands.filter(x => x.showHelp !== false);
        //const cmdList = commands.map(x => `\`${x.name}${x.aliases[0] ? ` (${x.aliases.map(y => y).join(', ')})\`` : '\`'}`).join(' | ')
        const cmdList = commands.map(x => `\`${x.utilisation.replace("{prefix}", client.config.app.px)}\` ${x.description ?  x.description : ''}`).join('\n')


        message.channel.send({ embeds: [{
            title: `${client.user.username} - Menu d'aide`,
            color: 'BLUE',
            description: cmdList
		}], components: [row] });
    },
};