const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Display info about this server.'),
    async execute(interaction) {

        const e = new MessageEmbed()
            .setColor('#820707')
            .setTitle('Server Info')
            .setAuthor({ name: interaction.guild.me.displayName, iconURL: interaction.client.user.avatarURL() })
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
            .addFields(
                { name: "Name:", value: `${interaction.guild.name}` },
                { name: "Users:", value: `${interaction.guild.memberCount}` },
            );
        return interaction.reply({ embeds: [e] });
    },
};