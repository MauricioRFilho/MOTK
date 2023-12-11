const moment = require('moment');

module.exports = {
    async execute(interaction, reply) {
        const guild = interaction ? interaction.guild : reply.guild;
        const members = guild.members.cache;

        const userList = members.map((member) => ({
            username: member.user.username,
            tag: member.user.tag,
            joinedAt: moment(member.joinedAt).format('MMMM Do YYYY, h:mm:ss a'),
            lastMessage: member.lastMessage ? moment(member.lastMessage.createdAt).format('MMMM Do YYYY, h:mm:ss a') : 'N/A',
            roles: member.roles.cache.map((role) => role.name),
        }));

        const response = {
            users: userList,
        };

        if (interaction) {
            await interaction.reply({ content: JSON.stringify(response), ephemeral: true });
        } else if (reply) {
            reply.send(JSON.stringify(response));
        }
    },
};
