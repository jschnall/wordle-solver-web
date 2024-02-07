package dev.wary.wordle.data

import kotlinx.serialization.Serializable

@Serializable
data class Guess(val word: String, val score: String)

@Serializable
data class Suggestion(val word: String, val letterFrequencyScore: Double, val letterFrequencyAtIndexScore: Double)

@Serializable
data class SuggestionsResult(@Serializable val suggestions: List<Suggestion>, val remainingWords: Int)