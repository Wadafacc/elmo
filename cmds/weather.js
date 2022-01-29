
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const axios = require('axios');
module.exports = {

    data: new SlashCommandBuilder()
        .setName('weather')
        .setDescription('Shows the weather for a requested place')
        .addStringOption(option =>
            option.setName('location')
                .setDescription(`format example: baar-switzerland`)
                .setRequired(true)),
    async execute(interaction) {
        var loc = interaction.options.getString('location');


        axios.get(`http://api.weatherapi.com/v1/current.json?key=21bb70024cb44342a1a165744222801&q=${loc}&aqi=no`).then(res => {
            const e = new MessageEmbed()
                .setColor('#00ff79')
                .setTitle(`${res.data.location.name}, ${res.data.location.country}`)
                .setAuthor({ name: interaction.guild.me.displayName, iconURL: interaction.client.user.avatarURL() })
                .setThumbnail(`https:${res.data.current.condition.icon}`)
                .addField(`${res.data.current.condition.text}`, `**${res.data.current.temp_c}°C**`, true);
            return interaction.reply({ embeds: [e] });

        }).catch(error => {
            console.log(error)
            const e = new MessageEmbed()
                .setColor('#820707')
                .setAuthor({ name: interaction.guild.me.displayName, iconURL: interaction.client.user.avatarURL() })
                .setDescription(`Whoops, wrong format.`)
                .addField(`format example: baar-switzerland`, `(or your city is just not relevant enough lol)`, true);
            return interaction.reply({ embeds: [e] });
        });
    },
};