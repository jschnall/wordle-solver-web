package dev.wary.wordle.api

import dev.wary.wordle.Solver
import dev.wary.wordle.data.Guess
import dev.wary.wordle.data.Suggestion
import dev.wary.wordle.data.SuggestionsResult
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureApiRouting() {
    routing {
        post("/api/suggestions") {
            val guesses = call.receive<List<Guess>>()
            val solver = Solver()

            guesses.forEach { guess ->
                solver.update(guess.word, guess.score)
            }

            call.respond(
                SuggestionsResult(
                    suggestions = solver.guess().map { Suggestion(it.key, it.value.first, it.value.second) },
                    remainingWords = solver.remainingWordCount()
                )
            )
        }
    }
}