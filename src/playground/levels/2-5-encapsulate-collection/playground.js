import {
  popQuestions,
  scienceQuestions,
  sportsQuestions,
  rockQuestions,
} from "./questions";

function createGame(console) {
  return function Game() {
    const players = new Array();
    const places = new Array(6);
    const purses = new Array(6);
    var inPenaltyBox = new Array(6);

    let currentPlayer = 0;
    let getOutOfPenalty = false;

    var didPlayerWin = function () {
      return !(purses[currentPlayer] == 6);
    };

    var currentCategory = function () {
      if (places[currentPlayer] == 0) return "Pop";
      if (places[currentPlayer] == 4) return "Pop";
      if (places[currentPlayer] == 8) return "Pop";
      if (places[currentPlayer] == 1) return "Science";
      if (places[currentPlayer] == 5) return "Science";
      if (places[currentPlayer] == 9) return "Science";
      if (places[currentPlayer] == 2) return "Sports";
      if (places[currentPlayer] == 6) return "Sports";
      if (places[currentPlayer] == 10) return "Sports";
      return "Rock";
    };

    this.createRockQuestion = function (idx) {
      return "Rock Question " + idx;
    };

    for (var i = 0; i < 50; i++) {
      popQuestions.push("Pop Question " + i);
      scienceQuestions.push("Science Question " + i);
      sportsQuestions.push("Sports Question " + i);
      rockQuestions.push(this.createRockQuestion(i));
    }

    this.isPlayable = function (howManyPlayers) {
      return howManyPlayers >= 2;
    };

    this.add = function (playerName) {
      players.push(playerName);
      places[this.howManyPlayers() - 1] = 0;
      purses[this.howManyPlayers() - 1] = 0;
      inPenaltyBox[this.howManyPlayers() - 1] = false;

      console.log(playerName + " was added");
      console.log("They are player number " + players.length);

      return true;
    };

    this.howManyPlayers = function () {
      return players.length;
    };

    var askQuestion = function () {
      if (currentCategory() == "Pop") {
        console.log(popQuestions[0]);
        popQuestions.shift();
      }
      if (currentCategory() == "Science") {
        console.log(scienceQuestions[0]);
        scienceQuestions.shift();
      }
      if (currentCategory() == "Sports") {
        console.log(sportsQuestions[0]);
        sportsQuestions.shift();
      }
      if (currentCategory() == "Rock") {
        console.log(rockQuestions[0]);
        rockQuestions.shift();
      }
    };

    this.roll = function (roll) {
      console.log(players[currentPlayer] + " is the current player");
      console.log("They have rolled a " + roll);

      if (inPenaltyBox[currentPlayer]) {
        if (roll % 2 != 0) {
          getOutOfPenalty = true;

          console.log(
            players[currentPlayer] + " is getting out of the penalty box"
          );
          places[currentPlayer] = places[currentPlayer] + roll;
          if (places[currentPlayer] > 11) {
            places[currentPlayer] = places[currentPlayer] - 12;
          }

          console.log(
            players[currentPlayer] +
              "'s new location is " +
              places[currentPlayer]
          );
          console.log("The category is " + currentCategory());
          askQuestion();
        } else {
          console.log(
            players[currentPlayer] +
              " is not getting out of the penalty box (gtesOutOfPnlt)"
          );
          getOutOfPenalty = false;
        }
      } else {
        places[currentPlayer] = places[currentPlayer] + roll;
        if (places[currentPlayer] > 11) {
          places[currentPlayer] = places[currentPlayer] - 12;
        }

        console.log(
          players[currentPlayer] + "'s new location is " + places[currentPlayer]
        );
        console.log("The category is " + currentCategory());
        askQuestion();
      }
    };

    this.wasCorrectlyAnswered = function () {
      if (inPenaltyBox[currentPlayer]) {
        if (getOutOfPenalty) {
          console.log("Answer was correct!!!!");
          purses[currentPlayer] += 1;
          console.log(
            players[currentPlayer] +
              " now has " +
              purses[currentPlayer] +
              " Gold Coins."
          );

          var winner = didPlayerWin();
          currentPlayer += 1;
          if (currentPlayer == players.length) currentPlayer = 0;

          return winner;
        } else {
          currentPlayer += 1;
          if (currentPlayer == players.length) currentPlayer = 0;
          return true;
        }
      } else {
        console.log("Answer was correct!!!!");

        purses[currentPlayer] += 1;
        console.log(
          players[currentPlayer] +
            " now has " +
            purses[currentPlayer] +
            " Gold Coins."
        );

        var winner = didPlayerWin();

        currentPlayer += 1;
        if (currentPlayer == players.length) currentPlayer = 0;

        return winner;
      }
    };

    this.wrongAnswer = function () {
      console.log("Question was incorrectly answered");
      console.log(players[currentPlayer] + " was sent to the penalty box");
      inPenaltyBox[currentPlayer] = true;

      currentPlayer += 1;
      if (currentPlayer == players.length) currentPlayer = 0;
      return true;
    };

    this.reset = function () {
      if (currentPlayer) currentPlayer = 0;
    };
  };
}

export { createGame };
