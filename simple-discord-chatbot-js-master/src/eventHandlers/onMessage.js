import { MessageEmbed } from "discord.js";
import axios from "axios"

async function onMessage(message) {
  const prefix = "!";

  if (message.author.bot === true || !message.content.startsWith(prefix)) {
    return;
  }

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === "안녕") {
    message.reply("반가워요!");
  }

  if (command === "투표") {
    const voteEmojis = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣"];

    const question = args.shift();

    if (args.length < 1 || args.length > 5) {
      message.reply("선택 항목은 1-5개만 지원합니다.");
      return;
    }

    const embed = new MessageEmbed(); // 삽입물

    let description = "";
    args.forEach((arg, i) => {
      description += `${voteEmojis[i]}: ${args[i]}\n`;
    });

    embed.setTitle("투표하기");
    embed.setDescription(description);

    const vote = await message.reply("투표해 주세요.", { embed: embed });
    args.forEach(async (arg, i) => {
      await vote.react(voteEmojis[i]);
    });

  }

  if (command == "강아지") {
    axios.get("https://dog.ceo/api/breeds/image/random").then((response) => {
      console.log(response.statusText);
      console.log(response.data);

      message.reply(response.data.message)
    });
  }
  
}

export default onMessage;