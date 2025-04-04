package com.ecohub.app.ui.navigation

import androidx.compose.runtime.Composable
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.ecohub.app.ui.screens.home.HomeScreen
import com.ecohub.app.ui.screens.auth.LoginScreen
import com.ecohub.app.ui.screens.auth.SignUpScreen
import com.ecohub.app.ui.screens.calculator.CarbonCalculatorScreen
import com.ecohub.app.ui.screens.community.CommunityScreen
import com.ecohub.app.ui.screens.profile.ProfileScreen
import com.ecohub.app.ui.screens.resources.ResourcesScreen
import com.ecohub.app.ui.screens.challenges.ChallengesScreen

sealed class Screen(val route: String) {
    object Home : Screen("home")
    object Login : Screen("login")
    object SignUp : Screen("signup")
    object Calculator : Screen("calculator")
    object Community : Screen("community")
    object Profile : Screen("profile")
    object Resources : Screen("resources")
    object Challenges : Screen("challenges")
}

@Composable
fun AppNavigation() {
    val navController = rememberNavController()

    NavHost(navController = navController, startDestination = Screen.Home.route) {
        composable(Screen.Home.route) {
            HomeScreen(navController)
        }
        composable(Screen.Login.route) {
            LoginScreen(navController)
        }
        composable(Screen.SignUp.route) {
            SignUpScreen(navController)
        }
        composable(Screen.Calculator.route) {
            CarbonCalculatorScreen(navController)
        }
        composable(Screen.Community.route) {
            CommunityScreen(navController)
        }
        composable(Screen.Profile.route) {
            ProfileScreen(navController)
        }
        composable(Screen.Resources.route) {
            ResourcesScreen(navController)
        }
        composable(Screen.Challenges.route) {
            ChallengesScreen(navController)
        }
    }
} 