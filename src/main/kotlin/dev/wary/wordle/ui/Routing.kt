package dev.wary.wordle.ui

import io.ktor.server.application.*
import io.ktor.server.http.content.*
import io.ktor.server.routing.*

fun Application.configureUiRouting() {
    routing {
            staticResources("/wordlesolver", "static")
//            get("/wordlesolver") {
//                call.respond(MustacheContent(
//                    "index.mustache",
//                    mapOf(
//                        "hello" to "world"
//                    )
//                ))
//            }
    }
}