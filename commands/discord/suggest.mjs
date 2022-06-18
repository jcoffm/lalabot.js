import config from "config";
import { SlashCommandBuilder } from "@discordjs/builders";

export const data = new SlashCommandBuilder()
  .setName("suggest")
  .setDescription("Submit an anonymous suggestion to FC leadership.")
  .addStringOption((option) =>
    option
      .setName("suggestion")
      .setDescription(
        "The text of your suggestion. Keep this under 1000 characters."
      )
      .setRequired(true)
  );

export async function execute(interaction) {
  const client = interaction.client;
  await client.channels
    .fetch(config.get("discord.channels.suggestions"))
    .then(async (channel) => {
      await interaction.deferReply({ ephemeral: true });
      await channel.send(
        `New Suggestion: ${interaction.options.getString("suggestion")}`
      );
      await interaction.editReply({
        content: "Your suggestion has been submitted!",
        ephemeral: true,
      });
    });
}
