const speechSynthesis = message => {
const msg = new SpeechSynthesisUtterance(message);
msg.voice = window.speechSynthesis.getVoices()[0];
window.speechSynthesis.speak(msg);
};
module.exports = speechSynthesis;