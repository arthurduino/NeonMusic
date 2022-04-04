const { QueueRepeatMode } = require('discord-player');

module.exports = {
    name: 'loop',
    description: 'Activer/désactiver le mode répétition pour un musique ou la playlist entière',
    aliases: ['lp', 'repeat'],
    utilisation: '{prefix}loop <queue>',
    voiceChannel: true,
    playing: true,

    execute(client, message, args) {
        const queue = player.getQueue(message.guild.id);
        if (args.join('').toLowerCase() === 'queue') {
            if (queue.repeatMode === 1) return message.channel.send(`Vous devez d'abord désactiver le mode boucle sur la musique actuelle (\`${client.config.app.px}loop\`), puis réessayez.`);

            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.QUEUE : QueueRepeatMode.OFF);

            return message.channel.send(success ? `**Le mode répétition est ${queue.repeatMode === 0 ? 'désactivé' : 'activé'}**. La file d'attente entière sera répétée sans fin 🔁` : `Quelque chose c'est mal passé. Veuillez réessayer...`);
        } else {
            if (queue.repeatMode === 2) return message.channel.send(`Vous devez d'abord désactiver le mode boucle sur la file d'attente (\`${client.config.app.px}loop queue\`), puis réessayez.`);

            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.TRACK : QueueRepeatMode.OFF);

            return message.channel.send(success ? `Le mode répétition est **${queue.repeatMode === 0 ? 'désactivé' : 'activé'}**. La musique actuelle sera répétée à l'infini (vous pouvez faire tourner la file d'attente en boucle avec l'option \`${client.config.app.px}loop queue\`) 🔂` : `Quelque chose c'est mal passé. Veuillez réessayer...`);
        };
    },
};