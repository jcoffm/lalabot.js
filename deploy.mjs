import config from "config";
import glob from "glob";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";

const commands = [];
const commandFiles = glob.sync("./commands/**/*.mjs");
for (const file of commandFiles) {
  console.log(`Loading command file: ${file}`);
  await import(file).then((command) => {
    commands.push(command.data.toJSON());
  });
}

const rest = new REST().setToken(config.get("discord.api.token"));

rest
  .put(
    Routes.applicationGuildCommands(
      config.get("discord.api.app_id"),
      config.get("discord.guild_id")
    ),
    { body: commands }
  )
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);
