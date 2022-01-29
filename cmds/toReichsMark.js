const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const request = require('request-promise');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('toreichsmark')
        .setDescription('Calculate the value in German Reichsmark.')
        .addStringOption(option =>
            option.setName('amount')
                .setDescription(`The amount you'd like to convert.`)
                .setRequired(true))
        .addStringOption(option =>
            option.setName('currency')
                .setDescription(`The currency your amount is in.`)
                .setRequired(true)),
    async execute(interaction) {
        const amnt = interaction.options.getString('amount');
        const crrcy = interaction.options.getString('currency').toUpperCase();

        request(`https://freecurrencyapi.net/api/v2/latest?apikey=ac51b480-8030-11ec-99c1-27dccd23e849&base_currency=${crrcy}`, { json: true }, (err, res, body) => {
            if (err) {
                return console.log(err);
            }
            else {
                let cr = 1;
                if (crrcy != "USD") {
                    cr = body.data.USD;
                }
                const e = new MessageEmbed()
                    .setColor('#820707')
                    .setAuthor({ name: interaction.guild.me.displayName, iconURL: interaction.client.user.avatarURL() })
                    .setThumbnail('https://media.tenor.com/images/2100e3d1c84e0610c67635e0debd31b8/tenor.gif')
                    .addField(`${(cr * amnt * 100000000).toFixed(2)} Reichsmark`, `(${amnt} ${crrcy})`, true);
                return interaction.reply({ embeds: [e] });
            }
        });
    },
};