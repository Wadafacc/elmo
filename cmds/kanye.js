const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const request = require('request');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kanye')
        .setDescription('Shows a quote from the one and only.'),
    async execute(interaction) {
        //http request
        request('https://api.kanye.rest/', { json: true }, (err, res, body) => {
            if (err) {
                return console.log(err);
            }
            else {
                const e = new MessageEmbed()
                    .setColor('#820707')
                    .setAuthor({ name: interaction.guild.me.displayName, iconURL: interaction.client.user.avatarURL() })
                    .addField(`"${body.quote}"`, '~Kanye', true);
                return interaction.reply({ embeds: [e] });
            }
        });
    },
};