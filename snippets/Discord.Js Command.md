---
title: Discord.js command
tags: Node.js,API
---

Sample discord.js bot command

- Listens for a message
- Locates where the message was sent
- Replies to message

```js
client.on ("message", message => {
  if(message.content === "!ping")
  message.channel.send("Pong!")
});
```
