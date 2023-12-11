const { SlashCommandBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('listroles')
        .setDescription('Lista todos os cargos do servidor'),

    async execute(interaction, reply) {
        const roles = interaction ? interaction.guild.roles.cache : reply.guild.roles.cache;

        const roleList = roles.map((role) => ({
            name: role.name,
            id: role.id,
            color: role.hexColor,
            members: role.members.map((member) => member.user.tag),
        }));

        const response = {
            roles: roleList,
        };

        if (interaction) {
            await interaction.reply({ content: JSON.stringify(response), ephemeral: true });
        } else if (reply) {
            reply.send(JSON.stringify(response));
        }
    },
};
