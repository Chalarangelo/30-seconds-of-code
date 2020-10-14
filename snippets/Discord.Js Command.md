**Template for a simple Discord.js command**

***Requires Node.js***



``` Javascript
client.on ("message", message => {
  if(message.content === "!ping")
  message.channel.send("Pong!")
});
