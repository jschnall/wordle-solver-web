package dev.wary.wordle.ui

import io.ktor.server.application.*
import io.ktor.server.http.content.*
import io.ktor.server.mustache.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureUiRouting() {
    routing {
        staticResources("/static", "static")

        get("/") {
            call.respond(MustacheContent(
                "index.mustache",
                mapOf(
                    "hello" to "world"
                )
            ))
        }
    }
}