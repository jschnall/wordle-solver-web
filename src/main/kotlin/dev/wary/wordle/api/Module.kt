package dev.wary.wordle.api

import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.plugins.contentnegotiation.*
import kotlinx.serialization.json.Json

@Suppress("unused")
fun Application.apiModule() {
    install(ContentNegotiation) {
        json(
            json = Json {
                prettyPrint = true
                isLenient = true
            },
            contentType = ContentType.Any
        )
    }

    configureApiRouting()
}