const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pings")
        .setDescription("Deve responder 'Pong!'"),

    async execute(interaction) {
        await interaction.reply("Pong!")
    }
}