package dev.wary.wordle.ui

import io.ktor.server.application.*
import io.ktor.server.routing.*

@Suppress("unused")
fun Application.uiModule() {
    install(IgnoreTrailingSlash)

//    install(Mustache) {
//        mustacheFactory = DefaultMustacheFactory("templates")
//    }

    configureUiRouting()
}