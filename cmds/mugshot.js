const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mugshot')
        .setDescription('returns a random mugshot')
        .addStringOption(option => option.setName('lastname').setDescription('Name of the Prisoner').setRequired(true)),
    async execute(interaction) {
        const name = interaction.options.getString('lastname');
        const r = Math.round(Math.random() * 10);
        axios.get(`https://www.jailbase.com/api/1/search/?source_id=az-mcso&last_name=${name}`).then(res => {
            const e = new MessageEmbed()
                .setColor('#820707')
                .setAuthor({ name: interaction.guild.me.displayName, iconURL: interaction.client.user.avatarURL() })
                .setTitle(res.data.records[r].name)
                .setImage(res.data.records[r].mugshot)
            return interaction.reply({ embeds: [e] });

        }).catch(error => {
            console.log(error)
            const e = new MessageEmbed()
                .setColor('#820707')
                .setAuthor({ name: interaction.guild.me.displayName, iconURL: interaction.client.user.avatarURL() })
                .setDescription(`Whoops, error. (unknown name?)`);
            return interaction.reply({ embeds: [e] });
        });
    },
};