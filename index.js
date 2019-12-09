// initialize inquirer
let inquirer = require("inquirer");

// create word array
let words = ["hello", "door", "popsicle", "carpet", "burger", "pants", "code", "magic", "elephant", "horse", "whale", "laundry", "television", "school", "breakfast", "table", "cups", "tennis", "baseball", "gymnastics"]

// create a variable to store a random word
let wordChoice = words[Math.floor(Math.random()*words.length)];

// Pass random word through Word constructor
let displayedWord = new Word(wordChoice);

// not sure why we need this
let requireNewWord = false;

// Array for guessed letters
let incorrectLetters = [];
let correctLetters = [];

// Guesses left
let guessesLeft = 10;

// main game function
function playGame() {

    // Generates new word for Word constructor if true
    if (requireNewWord) {
        // Selects random words array
        wordChoice = words[Math.floor(Math.random()*words.length)];

        // Passes random word through the Word constructor
        displayedWord = new Word(wordChoice);

        // still don't know why we need this
        requireNewWord = false;
    }

    // Tests if a letter guessed is correct
    let wordComplete = [];
    displayedWord.objArray.forEach(completeCheck);

    // letters remaining to be guessed
    if (wordComplete.includes(false)) {
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "Guess a letter between A-Z!",
                    name: "userinput"
                }
            ])
            .then(function (input) {

               // ** check to see if entry is just a single letter
                if (input.userinput.length > 1) {
                    console.log("\nPlease try again!\n");
                    playGame();
                } else {
        
                    if (incorrectLetters.includes(input.userinput) || correctLetters.includes(input.userinput) || input.userinput === "") {
                        console.log("\nAlready Guessed or Nothing Entered\n");
                        playGame();
                    } else {

                        // Checks if guess is correct
                        let wordCheckArray = [];

                        displayedWord.userGuess(input.userinput);

                        // Checks if guess is correct
                        displayedWord.objArray.forEach(wordCheck);
                        if (wordCheckArray.join('') === wordComplete.join('')) {
                            console.log("\nIncorrect\n");
                           
                            incorrectLetters.push(input.userinput);
                            guessesLeft--;
                        } else {
                            console.log("\nCorrect!\n");
                           
                            correctLetters.push(input.userinput);
                        }
                        
                        // not sure what .log does
                        displayedWord.log();

                        // Print guesses left
                        console.log("Guesses Left: " + guessesLeft + "\n");

                        // Print letters guessed already
                        console.log("Letters Guessed: " + incorrectLetters.join(" ") + "\n");

                        // Guesses left
                        if (guessesLeft > 0) {
                            // Call function 
                            playGame();
                        } else {
                            console.log("Sorry, you lose!\n");

                            restartGame();
                        }


                        
                        function wordCheck(key) {
                            wordCheckArray.push(key.guessed);
                        }
                    }
                }
            })
    } else {
        console.log("YOU WIN!\n");

        restartGame();
    }

   
    function completeCheck(key) {
        wordComplete.push(key.guessed);
        // console.log(wordComplete);
    }

}

function restartGame() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Would you like to:",
                choices: ["Play Again", "Exit"],
                name: "restart"
            }
        ])
        .then(function (input) {
            if (input.restart === "Play Again") {
                requireNewWord = true;
                incorrectLetters = [];
                correctLetters = [];
                guessesLeft = 10;
                playGame();
            } else {
                return
            }
        })
}

playGame();

// Letter constructor
function Letter(value) {
    this.letter = value;
    this.guessed = false;
    // i saw the "toString" suggestion in the instructions but don't really understand it
    this.toString = function () {

        if (this.letter === " ") {
            this.guessed = true;
            return " ";
        } else {
            if (this.guessed === false) {
                return "_";
            } else {
                return this.letter;
            }
        }
    };
    
    this.guess = function (guess) {
        if (guess === this.letter) {
            this.guessed = true;
        }
    }
}

// Word constructor
function Word(answer) {
    console.log(answer);
    //Letter objects array
    this.objArray = [];
    
    for (let i = 0; i < answer.length; i++) {
        let letter = new Letter(answer[i]);
        this.objArray.push(letter);
    }
    
    this.log = function () {
        answerLog = "";
        for (let i = 0; i < this.objArray.length; i++) {
            answerLog += this.objArray[i] + " ";
        }
        console.log(answerLog + "\n");
    }
    
    this.userGuess = function (input) {
        for (let i = 0; i < this.objArray.length; i++) {
            // i don't understand what the .guess does
            this.objArray[i].guess(input);
        }
    }
}