module.exports = async (client) => {
    client.channels.cache.get('959485725307449414').send({ embeds: [{
              color: 'GREEN',
        	  description: `**Time: **<t:${Math.floor(Date.now() / 1000)}>\n**Event:** \`READY\``
    	}]})
    console.log(`Logged to the client ${client.user.username}\n-> Ready on ${client.guilds.cache.size} servers for a total of ${client.users.cache.size} users`);

    client.user.setActivity(client.config.app.playing);
};