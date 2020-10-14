---
title: discord.js command
tags: node.js,api
---

A sample command for a discord.js bot

- Listens for a certain phrase
- Finds where the phrase is sent
- Responds to phrase

```js
client.on ("message", message => {
  if(message.content === "!ping")
  message.channel.send("Pong!")
});
