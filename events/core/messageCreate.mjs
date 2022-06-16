export const name = "messageCreate";
export const once = false;

export async function execute(msg) {
  const client = msg.client;

  if (msg.type == "DEFAULT" && msg.author != client.user) {
    await msg.reply(
      "Sorry, I'm not currently set up to respond to anything in DMs!"
    );
  }
}
