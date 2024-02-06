package dev.wary.wordle.ui

import com.github.mustachejava.DefaultMustacheFactory
import io.ktor.server.application.*
import io.ktor.server.mustache.*

fun Application.uiModule() {
    install(Mustache) {
        mustacheFactory = DefaultMustacheFactory("templates")
    }

    configureUiRouting()
}