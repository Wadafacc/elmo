const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Link to the code.')
        .addStringOption(option => option.setName('song').setDescription('link to play (YT)')),
    async execute(interaction) {
        const s = interaction.options.getString('song');

        return interaction.reply();
    },
};