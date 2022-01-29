const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nuke')
        .setDescription('only one way to find out'),
    async execute(interaction) {
        const fuse = 42069;
        const trigger = Math.round(Math.random() * 100000);

        let color = "";
        let txt = "";

        if (fuse == trigger) {
            color = "#820707";
            txt = "T-10 until meltdown.";
            await interaction.member.timeout(2 * 60 * 1000, "Fate has struck you.")
        } else {
            color = "#00ff3f";
            txt = "you were lucky this time";
        }

        const e = new MessageEmbed()
            .setColor(color)
            .setAuthor({ name: interaction.guild.me.displayName, iconURL: interaction.client.user.avatarURL() })
            .addField(`Launch Code: ${fuse}\nYour Code: ${trigger}`, txt, true);
        return interaction.reply({ embeds: [e] });
    },
};