package com.ecohub.app.data.repository

import com.google.firebase.firestore.FirebaseFirestore
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.tasks.await
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class CarbonCalculatorRepository @Inject constructor(
    private val firestore: FirebaseFirestore
) {
    // Carbon emission factors (approximate values)
    private val FACTORS = mapOf(
        "car" to 0.404, // kg CO2 per mile
        "publicTransport" to 0.14, // kg CO2 per hour
        "electricity" to 0.92, // kg CO2 per kWh
        "gas" to 5.3, // kg CO2 per therm
        "waste" to 2.5 // kg CO2 per bag of trash
    )

    suspend fun calculateCarbonFootprint(
        userId: String,
        carMiles: Double,
        publicTransport: Double,
        electricity: Double,
        gas: Double,
        waste: Double,
        recycle: Boolean
    ): Result<Double> = try {
        var total = 0.0
        
        // Weekly transportation to yearly
        total += carMiles * (FACTORS["car"] ?: 0.0) * 52
        total += publicTransport * (FACTORS["publicTransport"] ?: 0.0) * 52
        
        // Monthly energy to yearly
        total += electricity * (FACTORS["electricity"] ?: 0.0) * 12
        total += gas * (FACTORS["gas"] ?: 0.0) * 12
        
        // Weekly waste to yearly
        total += waste * (FACTORS["waste"] ?: 0.0) * 52
        
        // Recycling reduction
        if (recycle) {
            total *= 0.8 // 20% reduction for recycling
        }

        // Convert from kg to tons
        val totalTons = total / 1000

        // Save calculation to Firestore
        saveCalculation(userId, totalTons, carMiles, publicTransport, electricity, gas, waste, recycle)

        Result.success(totalTons)
    } catch (e: Exception) {
        Result.failure(e)
    }

    private suspend fun saveCalculation(
        userId: String,
        totalTons: Double,
        carMiles: Double,
        publicTransport: Double,
        electricity: Double,
        gas: Double,
        waste: Double,
        recycle: Boolean
    ) {
        val calculation = mapOf(
            "totalTons" to totalTons,
            "carMiles" to carMiles,
            "publicTransport" to publicTransport,
            "electricity" to electricity,
            "gas" to gas,
            "waste" to waste,
            "recycle" to recycle,
            "timestamp" to System.currentTimeMillis()
        )

        firestore.collection("users")
            .document(userId)
            .collection("calculations")
            .add(calculation)
            .await()
    }

    fun getCalculationHistory(userId: String): Flow<List<Map<String, Any>>> = flow {
        try {
            val snapshot = firestore.collection("users")
                .document(userId)
                .collection("calculations")
                .orderBy("timestamp", com.google.firebase.firestore.Query.Direction.DESCENDING)
                .get()
                .await()
            
            val calculations = snapshot.documents.mapNotNull { it.data }
            emit(calculations)
        } catch (e: Exception) {
            emit(emptyList())
        }
    }

    fun getRecommendations(
        carMiles: Double,
        electricity: Double,
        gas: Double,
        waste: Double,
        recycle: Boolean
    ): List<String> {
        val recommendations = mutableListOf<String>()

        if (carMiles > 100) {
            recommendations.add("Consider carpooling or using public transport to reduce your car usage.")
        }
        
        if (electricity > 900) {
            recommendations.add("Your electricity usage is high. Consider energy-efficient appliances and LED lighting.")
        }
        
        if (gas > 50) {
            recommendations.add("Improve home insulation to reduce gas consumption for heating.")
        }
        
        if (waste > 3) {
            recommendations.add("Try composting and reducing single-use items to decrease waste.")
        }
        
        if (!recycle) {
            recommendations.add("Start recycling to significantly reduce your carbon footprint.")
        }

        return recommendations
    }
} 