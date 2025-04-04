package com.ecohub.app.data.repository

import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.tasks.await
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class UserRepository @Inject constructor(
    private val auth: FirebaseAuth,
    private val firestore: FirebaseFirestore
) {
    suspend fun signIn(email: String, password: String): Result<Unit> = try {
        auth.signInWithEmailAndPassword(email, password).await()
        Result.success(Unit)
    } catch (e: Exception) {
        Result.failure(e)
    }

    suspend fun signUp(email: String, password: String): Result<Unit> = try {
        auth.createUserWithEmailAndPassword(email, password).await()
        Result.success(Unit)
    } catch (e: Exception) {
        Result.failure(e)
    }

    suspend fun signOut() {
        auth.signOut()
    }

    fun getCurrentUser() = auth.currentUser

    suspend fun updateUserProfile(name: String): Result<Unit> = try {
        auth.currentUser?.updateProfile(
            com.google.firebase.auth.UserProfileChangeRequest.Builder()
                .setDisplayName(name)
                .build()
        )?.await()
        Result.success(Unit)
    } catch (e: Exception) {
        Result.failure(e)
    }

    suspend fun saveUserData(userId: String, userData: Map<String, Any>): Result<Unit> = try {
        firestore.collection("users")
            .document(userId)
            .set(userData)
            .await()
        Result.success(Unit)
    } catch (e: Exception) {
        Result.failure(e)
    }

    fun getUserData(userId: String): Flow<Map<String, Any>> = flow {
        try {
            val snapshot = firestore.collection("users")
                .document(userId)
                .get()
                .await()
            emit(snapshot.data ?: emptyMap())
        } catch (e: Exception) {
            emit(emptyMap())
        }
    }
} 