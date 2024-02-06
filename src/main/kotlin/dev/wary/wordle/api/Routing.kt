package dev.wary.wordle.api

import dev.wary.wordle.data.Guess
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureApiRouting() {
    routing {
        get("/suggestions") {
//            val guesses = call.receive<List<Guess>>()
//            val solver = Solver()
//
//            guesses.forEach { guess ->
//                solver.update(guess.word, guess.score)
//            }
//
//            call.respond(solver.guess().map { Suggestion(it.key, it.value.first, it.value.second) })
            call.respondText ("blah,second,third,fourth,fifth", status = HttpStatusCode.OK)
        }
    }
}