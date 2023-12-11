const moment = require('moment');
const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('listusers')
        .setDescription('Lista todos os usuários do canal com informações relevantes'),

    async execute(interaction) {
        const guild = interaction.guild;
        const members = guild.members.cache;

        const userList = members.map((member) => {
            return {
                username: member.user.username,
                tag: member.user.tag,
                joinedAt: moment(member.joinedAt).format('MMMM Do YYYY, h:mm:ss a'),
                lastMessage: member.lastMessage ? moment(member.lastMessage.createdAt).format('MMMM Do YYYY, h:mm:ss a') : 'N/A',
                roles: member.roles.cache.map((role) => role.name).join(', '),
            };
        });

        const formattedList = userList.map(
            (user) =>
                    `${user.username} - #${user.tag}**
                    Entrou: ${user.joinedAt}
                    Ultima msg: ${user.lastMessage}
                    Cargo: ${user.roles}
                    -----------------------------------`
                            );

        await interaction.reply(`\`\`\`${formattedList.join('\n')}\`\`\``);
    },
};
