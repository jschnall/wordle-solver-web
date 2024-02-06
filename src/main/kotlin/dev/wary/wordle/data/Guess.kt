package dev.wary.wordle.data

import kotlinx.serialization.Serializable

@Serializable
data class Guess(val word: String, val score: String)