const {
    REST,
    Routes
} = require('discord.js')

const dotenv = require('dotenv');
dotenv.config()
const {
    DISCORD_TOKEN,
    CLIENT_ID,
    GUILD_ID
} = process.env

const fs = require("fs");
const path = require("path");
const commandsPath = path.join(__dirname, "src/commands")
const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

const commands = []

for (const file of commandsFiles) {
    const command = require(`./src/commands/${file}`)
    commands.push(command.data.toJSON())
}

const rest = new REST({
    version: "10"
}).setToken(DISCORD_TOKEN);

//deploy
(async () => {
    try {
        console.log('resetando comandos', commands)
        //PUT
        const data = await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
            body: commands
        })
    } catch (error) {
        console.error(error)
    }
})()