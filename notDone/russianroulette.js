const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Collector } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('russian')
        .setDescription("Starts a Session of good ol' Roulette"),
    async execute(interaction) {

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('joinRoulette')
                    .setLabel('Join')
                    .setStyle('SUCCESS'),
            );
        const e = new MessageEmbed()
            .setColor('#379c6f')
            .setTitle('Russian Roulette')
            .setAuthor({ name: interaction.guild.me.displayName, iconURL: interaction.client.user.avatarURL() })
            .addField("tsest", "aioufwe");


        await interaction.reply({ embeds: [e], components: [row] });

        const filter = i => i.customId === 'joinRoulette';
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });
        const message = row.message;

        collector.on('collect', async i => {
            if (i.customId === 'joinRoulette') {
                await i.update({ content: 'A button was clicked!', components: [] });
            }
        });

        collector.on('end', collected => {
            if (!collected) {
                return interaction.send('shed');
            } else {

            }
        });
    },
};