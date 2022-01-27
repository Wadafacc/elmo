const { Client, Collection, Intents } = require('discord.js');

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const mongoose = require('mongoose');
const fs = require('fs');
const { prefix, token, guildId, clientId } = require('./config.json');


const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

//command handler
client.commands = new Collection();
const commands = [];

const commandFiles = fs.readdirSync('./cmds').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./cmds/${file}`);
    commands.push(command.data.toJSON());
    // With the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
}

client.once('ready', () => {
    console.log("Its killin' time.");
    client.user.setActivity('the Trial of the Fool', { type: 'COMPETING' });
});

//command registration
const rest = new REST({ version: '9' }).setToken(token);
(async () => {
    try {
        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );
        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

//main loop for slash commands
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'The God did not accept your request.', ephemeral: true });
    }
});

client.login(token);

