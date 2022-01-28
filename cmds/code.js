const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('code')
        .setDescription('Link to the code.'),
    async execute(interaction) {
        return interaction.reply('https://github.com/Wadafacc/elmo');
    },
};