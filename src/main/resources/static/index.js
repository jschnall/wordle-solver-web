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
        console.log("Guess, " + state.guess() + " must be 5 letters.")
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

function clearSuggestions() {
    for (let i = 0; i < 5; i++) {
        document.getElementById("suggestion" + i).innerHTML = "";
    }
}

// Insert suggestion at index
function insertSuggestion(item, index) {
    document.getElementById("suggestion" + index).innerHTML = item;
}

function validateGuess() {
    return state.guess().length == 5
}

function resultToRow(result) {
    return new ResultRow(result.word, result.score)
}

function updateResults() {
    fetch('static/result.mustache')
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
    clearSuggestions()
    console.log(JSON.stringify(state.results))
    fetch('/suggestions', {
        method: 'POST',
        headers: {
            'Accept': 'text/html',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(state.results),
        cache: 'default'
    })
    .then((response) => response.text())
    .then((suggestions) => {
        suggestions.split(",").forEach(insertSuggestion);
    })
}

function update() {
    updateResults()
    updateSuggestions()
}