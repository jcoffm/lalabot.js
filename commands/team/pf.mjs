import { SlashCommandBuilder } from "@discordjs/builders";

export const data = new SlashCommandBuilder()
  .setName("pf")
  .setDescription("Create a party finder.")
  .addStringOption((option) =>
    option
      .setName("composition")
      .setDescription("Party composition")
      .setRequired(true)
      .addChoices(
        { name: "Light Party", value: "1/1/2/0" },
        { name: "Full Party", value: "2/2/4/0" },
        { name: "Alliance", value: "1/2/5/0" },
        { name: "Custom", value: "0/0/0/0" }
      )
  )
  .addIntegerOption((option) =>
    option.setName("tanks").setDescription("Number of tanks for this party")
  )
  .addIntegerOption((option) =>
    option.setName("healers").setDescription("Number of healers for this party")
  )
  .addIntegerOption((option) =>
    option.setName("dps").setDescription("Number of DPS for this party")
  )
  .addIntegerOption((option) =>
    option
      .setName("open_roles")
      .setDescription("Number of open roles for this party")
  );

export async function execute(interaction) {
  let tanks = 0;
  let healers = 0;
  let dps = 0;
  let open_roles = 0;

  if (interaction.options.getString("composition") != "0/0/0/0") {
    [tanks, healers, dps, open_roles] = interaction.options
      .getString("composition")
      .split("/")
      .map((x) => {
        return parseInt(x, 10);
      });
  } else {
    tanks = interaction.options.getInteger("tanks");
    healers = interaction.options.getInteger("healers");
    dps = interaction.options.getInteger("dps");
    open_roles = interaction.options.getInteger("open_roles");
  }

  const total = tanks + healers + dps + open_roles;

  await interaction.reply({
    content: `Tanks: ${tanks}, Healers: ${healers}, DPS: ${dps}, Open: ${open_roles}\nTotal: ${total}`,
    ephemeral: true,
  });
}
