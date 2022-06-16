import config from 'config'
import glob from 'glob'
import { Client, Collection, Intents } from 'discord.js'

const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

client.commands = new Collection()
const commandFiles = glob.sync('./commands/**/*.mjs')

for (const file of commandFiles) {
  await import(file).then((command) => {
    client.commands.set(command.data.name, command)
  })
}

client.once('ready', () => {
  console.log('Ready!')
})

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return

  const command = client.commands.get(interaction.commandName)

  if (!command) return

  try {
    await command.execute(interaction)
  } catch (error) {
    console.error(error)
    await interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true
    })
  }
})

client.login(config.get('discord.api.token'))
