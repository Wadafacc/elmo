const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Get the avatar of the selected user, or your own avatar.')
        .addUserOption(option => option.setName('target').setDescription('The user\'s avatar to show')),
    async execute(interaction) {

        const user = interaction.options.getUser('target');
        const e = new MessageEmbed()
            .setTitle(user.tag)
            .setAuthor({ name: interaction.guild.me.displayName, iconURL: interaction.client.user.avatarURL() })
            .setImage(user.displayAvatarURL({ dynamic: true }));
        return interaction.reply({ embeds: [e] });
    },
};