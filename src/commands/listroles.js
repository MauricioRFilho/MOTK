const {
    SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('listroles')
        .setDescription('Lista todos os cargos do servidor'),

    async execute(interaction) {
        const roles = interaction.guild.roles.cache;

        const roleList = roles.map((role) => {
            return {
                name: role.name,
                id: role.id,
                color: role.hexColor,
                members: role.members.map((member) => member.user.tag).join(', '),
            };
        });

        const formattedList = roleList.map(
            (role) =>
`${role.name}
ID: ${role.id}
Color: ${role.color}
Members: ${role.members}
-----------------------------------`
        );

        await interaction.reply(`\`\`\`${formattedList.join('\n')}\`\`\``);
    },
};