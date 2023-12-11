// Require the necessary discord.js classes   ###https://discordjs.guide/creating-your-bot/main-file.html#running-your-application
const {
    Client,
    Events,
    GatewayIntentBits,
    Collection
} = require('discord.js');

const dotenv = require('dotenv');
dotenv.config()
const {
    DISCORD_TOKEN,
    CLIENT_ID,
    GUILD_ID
} = process.env

//Import commands
const fs = require("fs");
const path = require("path");
const commandsPath = path.join(__dirname, '/src/commands')
const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

client.commands = new Collection()


for (const file of commandsFiles) {
    const filePath = path.join(commandsPath, file)
    const command = require(filePath);

    console.log('Command:', command);

    if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`This command in ${filePath} is missing 'data' or 'execute' properties.`);
    }
}


// Create a new client instance

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Log in to Discord with your client's token
client.login(DISCORD_TOKEN);


//listener
client.on(Events.InteractionCreate, async interaction => {
    if (interaction.isStringSelectMenu()) {
        const selected = interaction.values[0]
        if (selected == "javascript") {
            await interaction.reply("Documentação do Javascript: https://developer.mozilla.org/en-US/docs/Web/JavaScript")
        } else if (selected == "python") {
            await interaction.reply("Documentação do Python: https://www.python.org")
        } else if (selected == "csharp") {
            await interaction.reply("Documentação do C#: https://learn.microsoft.com/en-us/dotnet/csharp/")
        } else if (selected == "discordjs") {
            await interaction.reply("Documentação do Discord.js: https://discordjs.guide/#before-you-begin")
        }
    }
    if (!interaction.isChatInputCommand()) return
    const command = interaction.client.commands.get(interaction.commandName)
    if (!command) {
        console.error("Comando não encontrado")
        return
    }
    try {
        await command.execute(interaction)
    } catch (error) {
        console.error(error)
        await interaction.reply("Houve um erro ao executar esse comando!")
    }
})