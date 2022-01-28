const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const request = require('request');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tronalddump')
        .setDescription('a quote of the dumbest person alive.'),
    async execute(interaction) {
        //http request
        request('https://api.tronalddump.io/random/quote', { json: true }, (err, res, body) => {
            if (err) {
                return console.log(err);
            }
            else {
                const e = new MessageEmbed()
                    .setColor('#820707')
                    .setAuthor({ name: interaction.guild.me.displayName, iconURL: interaction.client.user.avatarURL() })
                    .addField(`"${body.value}"`, '~Trump', true);
                return interaction.reply({ embeds: [e] });
            }
        });
    },
};