package dev.wary.wordle

import dev.wary.wordle.api.apiModule
import dev.wary.wordle.ui.uiModule
import io.ktor.server.application.*

fun main(args: Array<String>): Unit = io.ktor.server.netty.EngineMain.main(args)