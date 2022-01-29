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
client.commands.set([]);
const commandFiles = fs.readdirSync('./cmds').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./cmds/${file}`);
    commands.push(command.data.toJSON());
    // With the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
}


//command registration
const rest = new REST({ version: '9' }).setToken(token);

/*Delete all commands*/
// rest.get(Routes.applicationCommands(clientId))
//     .then(data => {
//         const promises = [];
//         for (const command of data) {
//             const deleteUrl = `${Routes.applicationCommands(clientId)}/${command.id}`;
//             promises.push(rest.delete(deleteUrl));
//         }
//         return Promise.all(promises);
//     });
// rest.get(Routes.applicationGuildCommands(clientId, guildId))
//     .then(data => {
//         const promises = [];
//         for (const command of data) {
//             const deleteUrl = `${Routes.applicationGuildCommands(clientId, guildId)}/${command.id}`;
//             promises.push(rest.delete(deleteUrl));
//         }
//         return Promise.all(promises);
//     });


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

client.once('ready', () => {
    console.log("Its killin' time.");
    client.user.setActivity('your soul fall apart.', { type: 'WATCHING' });
});
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

