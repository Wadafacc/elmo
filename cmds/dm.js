const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dm')
        .setDescription('dm a user of this server')
        .addUserOption(option => option.setName('user').setDescription(`the user you'd like to DM`).setRequired(true))
        .addStringOption(option => option.setName('title').setDescription('Title of the Message').setRequired(true))
        .addStringOption(option => option.setName('message').setDescription('Content of the Message').setRequired(true))
        .addStringOption(option => option.setName('color').setDescription('color of the embed (hex)').setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const color = interaction.options.getString('color');
        const title = interaction.options.getString('title');
        const message = interaction.options.getString('message');

        const e = new MessageEmbed()
            .setColor(color)
            .setTitle(title)
            .setAuthor({ name: interaction.guild.me.displayName, iconURL: interaction.client.user.avatarURL() })
            .setThumbnail('https://media1.tenor.com/images/04c3c977128eddf34727ec6de71224f3/tenor.gif?itemid=16258033')
            .addField(message, `*Kind Regards*\n**elmo**`, true);
        user.send({ embeds: [e] });
        return interaction.reply("Message sent.");
    },
};