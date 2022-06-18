import config from "config";
import glob from "glob";
import { Client, Collection, Intents } from "discord.js";
import * as db from "./lib/db.mjs";

if (!config.discord) {
  console.log("No config.");
  process.exit();
}

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.DIRECT_MESSAGES],
  partials: ["CHANNEL"],
});

client.commands = new Collection();
const commandFiles = glob.sync("./commands/**/*.mjs");
for (const file of commandFiles) {
  await import(file).then((command) => {
    console.log(
      `Loading command '${command.data.name}' from file '${file}'...`
    );
    client.commands.set(command.data.name, command);
  });
}

const eventFiles = glob.sync("./events/**/*.mjs");
for (const file of eventFiles) {
  await import(file).then((event) => {
    console.log(
      `Loading event '${event.name}' (${
        event.once ? "once" : "on"
      }) from file '${file}'...`
    );
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  });
}

console.log(db.ping());
console.log("NOW should print before this.");

client.login(config.get("discord.api.token"));
