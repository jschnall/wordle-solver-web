import mustache from "https://cdnjs.cloudflare.com/ajax/libs/mustache.js/4.2.0/mustache.min.js"

class Result {
    word;
    score;
    constructor(word, score) {
        this.word = word
        this.score = score
    }
}

class ResultRow {
    items;
    constructor(word, scores) {
        this.items = []
        const upperWord = word.toUpperCase();
        for (let i = 0; i < upperWord.length; i++) {
            this.items.push(new ResultItem(upperWord[i], scores[i]));
        }
    }
}

class ResultItem {
    letter;
    score;
    constructor(letter, score) {
        this.letter = letter;
        this.score = score;
    }
}

const state = {
    suggestions: [],
    feedback: [0, 0, 0, 0, 0],
    results: [],
    wordLength: 5,

    guess: function() {
        return document.getElementById("guess").value
    },

    clearGuess: function() {
        document.getElementById("guess").value = ""
    },

    clearFeedback: function() {
        for (let i = 0; i < this.feedback.length; i++) {
            this.feedback[i] = 0
            document.getElementById("feedback" + i).classList.add("wordle-bg0")
            document.getElementById("feedback" + i).classList.remove("wordle-bg1")
            document.getElementById("feedback" + i).classList.remove("wordle-bg2")
            document.getElementById("feedback" + i).textContent = ""
        }
    }
};

window.toggleFeedback = function(index) {
    state.feedback[index] = (state.feedback[index] + 1) % 3

    document.getElementById("feedback" + index).classList.remove("wordle-bg0")
    document.getElementById("feedback" + index).classList.remove("wordle-bg1")
    document.getElementById("feedback" + index).classList.remove("wordle-bg2")

    document.getElementById("feedback" + index).classList.add("wordle-bg" + state.feedback[index])
}

window.addResult = function() {
    if (validateGuess()) {
        state.results.push(new Result(state.guess(), state.feedback.join("")))
        state.clearGuess()
        state.clearFeedback()
        update()
    } else {
        console.log("Guess, " + state.guess() + " must be " + state.wordLength + " letters.")
    }
}

window.removeResult = function(index) {
    const newResults = []
    for (let i = 0; i < state.results.length; i++) {
        if (i != index) {
            newResults.push(state.results[i])
        }
    }
    state.results = newResults
    update()
}

window.clearResults = function() {
    state.results = []
    update()
}

function onLoadSuggestions() {
    // Clear suggestions
    for (let i = 0; i < 5; i++) {
        document.getElementById("suggestion" + i).innerHTML = "";
    }
    // Show progress indicator
    document.getElementById("progress").classList.add("active");
}

// Insert suggestion at index
function insertSuggestion(suggestion, index) {
    document.getElementById("suggestion" + index).innerHTML = suggestion.word;
}

function validateGuess() {
    return state.guess().length == state.wordLength
}

function resultToRow(result) {
    return new ResultRow(result.word, result.score)
}

function updateResults() {
    fetch('result.mustache')
        .then((response) => response.text())
        .then((template) => {
            const htmlBlocks = []
            const rows = state.results.map(resultToRow)
            for (let i = 0; i < rows.length; i++) {
                const row = rows[i]
                htmlBlocks.push(mustache.render(template, { "id": i, "results": row.items }))
            }
            document.getElementById("results").innerHTML = htmlBlocks.join("")
        })
}

function updateSuggestions() {
    onLoadSuggestions()

    const body = {
        guesses: state.results,
        wordLength: state.wordLength
    };

    fetch('api/suggestions', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
        cache: 'default'
    })
    .then((response) => response.json())
    .then((data) => {
        // Hide progress indicator
        document.getElementById("progress").classList.remove("active");
        data.suggestions.forEach(insertSuggestion);
        document.getElementById("remaining").innerHTML = data.remainingWords + " words remain";
    })
}

window.update = function() {
    updateResults();
    updateSuggestions();
}

window.setWordLength = function(wordLength) {
    state.wordLength = wordLength;
    document.getElementById("guess").maxLength = wordLength;
    document.getElementById("guess").size = wordLength;

    if (wordLength == 5) {
        state.feedback = [0, 0, 0, 0, 0]
        document.getElementById("5-letter").classList.add("fill");
        document.getElementById("6-letter").classList.remove("fill");
        document.getElementById("feedback5").style.display = "none";
    } else {
        state.feedback = [0, 0, 0, 0, 0, 0]
        document.getElementById("5-letter").classList.remove("fill");
        document.getElementById("6-letter").classList.add("fill");
        document.getElementById("feedback5").style.display = "block";
    }

    state.clearGuess()
    state.clearFeedback()
    window.clearResults()
}

function updateFeedback(event) {
    const str = document.getElementById("guess").value.toUpperCase();
    for (let i = 0; i < str.length; i++) {
        document.getElementById("feedback" + i).textContent = str[i]
    }
    for (let i = str.length; i < state.wordLength; i++) {
        document.getElementById("feedback" + i).textContent = ""
    }
}

document.getElementById("guess").addEventListener("input", updateFeedback);

