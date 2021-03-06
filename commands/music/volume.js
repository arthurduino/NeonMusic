const maxVol = client.config.opt.maxVol;

module.exports = {
    name: 'volume',
    description: 'RΓ©gler le volume',
    aliases: ['vol'],
    utilisation: `{prefix}volume [1-${maxVol}]`,
    voiceChannel: true,

    execute(client, message, args) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`No music currently playing ${message.author}... try again ? β`);

        const vol = parseInt(args[0]);

        if (!vol) return message.channel.send(`The current volume is ${queue.volume} π\n*To change the volume enter a valid number between **1** and **${maxVol}**.*`);

        if (queue.volume === vol) return message.channel.send(`The volume you want to change is already the current one ${message.author}... try again ? β`);

        if (vol < 0 || vol > maxVol) return message.channel.send(`The specified number is not valid. Enter a number between **1** and **${maxVol}** ${message.author}... try again ? β`);

        const success = queue.setVolume(vol);

        return message.channel.send(success ? `The volume has been modified to **${vol}**/**${maxVol}**% π` : `Something went wrong ${message.author}... try again ? β`);
    },
};