// save as motivate.js
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Calculate days between dates
const getDaysDiffBetweenDates = (dateInitial, dateFinal) =>
  Math.floor((dateFinal - dateInitial) / (1000 * 3600 * 24));

// Get day of year
const dayOfYear = date =>
  Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));

class CodingMotivator {
  constructor() {
    this.dataPath = path.join(process.cwd(), 'codingData.json');
    this.insults = [
      "Wow, another day without coding? You must be really proud.",
      "Do you call yourself a developer? Pathetic.",
      "No coding today? Guess you're busy being mediocre.",
      "Your GitHub streak is crying right now.",
      "Another day, another excuse for not coding."
    ];
    this.loadData();
  }

  loadData() {
    try {
      if (fs.existsSync(this.dataPath)) {
        const data = JSON.parse(fs.readFileSync(this.dataPath, 'utf8'));
        this.lastCodedDate = data.lastCodedDate ? new Date(data.lastCodedDate) : null;
      } else {
        this.lastCodedDate = null;
      }
    } catch (e) {
      this.lastCodedDate = null;
    }
  }

  saveData() {
    fs.writeFileSync(this.dataPath, JSON.stringify({
      lastCodedDate: this.lastCodedDate ? this.lastCodedDate.toISOString() : null
    }, null, 2));
  }

  checkDailyCoding() {
    const today = new Date();
    
    if (!this.lastCodedDate) {
      this.updateLastCodedDate();
      console.log("Tracking started! Happy coding!");
      return;
    }

    const daysDiff = getDaysDiffBetweenDates(this.lastCodedDate, today);
    
    if (daysDiff === 0) {
      console.log("Great job coding today! Keep it up!");
    } else if (daysDiff >= 1) {
      const randomInsult = this.insults[Math.floor(Math.random() * this.insults.length)];
      console.log(randomInsult);
    }
  }

  updateLastCodedDate() {
    this.lastCodedDate = new Date();
    this.saveData();
  }
}

// Run the script
const motivator = new CodingMotivator();

// Check for command line arguments
if (process.argv.includes('--reset')) {
  motivator.updateLastCodedDate();
  console.log("Reset your last coding date to now!");
} else {
  motivator.checkDailyCoding();
  
  // Add interactive option to mark coding as done
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Did you code today? (y/n) ', (answer) => {
    if (answer.toLowerCase() === 'y') {
      motivator.updateLastCodedDate();
      console.log("Awesome! Keep up the good work!");
    } else {
      console.log("Well, what are you waiting for? Get coding!");
    }
    rl.close();
  });
}