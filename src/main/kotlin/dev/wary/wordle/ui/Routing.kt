package dev.wary.wordle.ui

import io.ktor.server.application.*
import io.ktor.server.http.content.*
import io.ktor.server.routing.*

fun Application.configureUiRouting() {
    routing {
            staticResources("/wordlesolver", "static") {
                preCompressed(CompressedFileType.BROTLI, CompressedFileType.GZIP)
            }
// TODO Add option to use 6 letter word dictionary
//            get("/wordlesolver") {
//                call.respond(MustacheContent(
//                    "index.mustache",
//                    mapOf(
//                        "word_length" to 5
//                    )
//                ))
//            }
    }
}