# NeonMusic - Open Source Discord Music Bot 

[Ajouter le bot](https://discord.com/api/oauth2/authorize?client_id=909826264645373972&permissions=139887766865&scope=bot%20applications.command)
[Serveur de suppport](https://discord.gg/XVgXcfE9mb)

#### 1. Compléter la configuration
```js
module.exports = {
    app: {
        px: 'your_prefix',
        token: 'your_token',
        playing: 'status_of_the_bot'
    },

    opt: {
        DJ: {
            enabled: false,
            roleName: 'DJ',
            commands: ['back', 'clear', 'filter', 'loop', 'pause', 'resume', 'seek', 'shuffle', 'skip', 'stop', 'volume']
        },
        maxVol: 100,
        loopMessage: false,
        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 25
            }
        }
    }
};
```

#### 2. Installer les dépendances
`npm i`

#### 3. Lancer le bot
`node index`

![Logo of NeonMusic](https://cdn.discordapp.com/avatars/909826264645373972/64b6d989b85472a16323d7992b4da9f2.png)
