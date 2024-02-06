package dev.wary.wordle.data

import kotlinx.serialization.Serializable

@Serializable
data class Suggestion(val word: String, val letterFrequencyScore: Double, val letterFrequencyAtIndexScore: Double)
