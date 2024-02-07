package dev.wary.wordle.ui

import io.ktor.server.application.*

@Suppress("unused")
fun Application.uiModule() {
//    install(Mustache) {
//        mustacheFactory = DefaultMustacheFactory("templates")
//    }

    configureUiRouting()
}