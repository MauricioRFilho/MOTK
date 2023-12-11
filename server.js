const express = require('express');
const moment = require('moment');
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const { listRolesCommand } = require('./src/routes/listRolesCommand');
const { listUsersCommand } = require('./src/routes/listUsersCommand')


const dotenv = require('dotenv');
dotenv.config()
const {
    DISCORD_TOKEN,
    CLIENT_ID,
    GUILD_ID
} = process.env

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

const app = express();
const port = 3000;

client.once('ready', () => {
    console.log(`Bot está online: ${client.user.tag}`);
});

client.login(DISCORD_TOKEN);

app.get('/api/listarmembros', async (req, res) => {
    const guild = client.guilds.cache.get(GUILD_ID);

    if (!guild) {
        return res.status(404).json({ error: 'Servidor não encontrado' });
    }

    await guild.members.fetch();

    const members = guild.members.cache;

    const userList = members.map((member) => ({
        username: member.user.username,
        tag: member.user.tag,
        id: member.user.id,
        nick:member.user.displayName,
        role: member.roles.cache.map((role) => role.name),
        bot: member.user.bot,
        avatar: member.user.displayAvatarURL,
        criadoEm: moment(member.user.createdTimestamp).format('DD MM YYYY'),
        resto:member
    }));

    res.json(userList);
});

app.listen(port, () => {
    console.log(`Servidor web rodando em http://localhost:${port}`);
});
