package dev.wary.wordle.api

import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.plugins.contentnegotiation.*

fun Application.apiModule() {
//    install(ContentNegotiation) {
//        json()
//    }

    configureApiRouting()
}