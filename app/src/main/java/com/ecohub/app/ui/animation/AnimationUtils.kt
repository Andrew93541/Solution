package com.ecohub.app.ui.animation

import androidx.compose.animation.AnimatedContentTransitionScope
import androidx.compose.animation.EnterTransition
import androidx.compose.animation.ExitTransition
import androidx.compose.animation.ExperimentalAnimationApi
import androidx.compose.animation.core.FastOutSlowInEasing
import androidx.compose.animation.core.LinearOutSlowInEasing
import androidx.compose.animation.core.Spring
import androidx.compose.animation.core.VisibilityThreshold
import androidx.compose.animation.core.spring
import androidx.compose.animation.core.tween
import androidx.compose.animation.expandHorizontally
import androidx.compose.animation.expandIn
import androidx.compose.animation.expandVertically
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.scaleIn
import androidx.compose.animation.scaleOut
import androidx.compose.animation.shrinkHorizontally
import androidx.compose.animation.shrinkOut
import androidx.compose.animation.shrinkVertically
import androidx.compose.animation.slideInHorizontally
import androidx.compose.animation.slideInVertically
import androidx.compose.animation.slideOutHorizontally
import androidx.compose.animation.slideOutVertically
import androidx.compose.ui.Alignment
import androidx.compose.ui.unit.IntSize
import androidx.navigation.NavBackStackEntry

/**
 * Animation utilities for screen transitions and UI elements
 */
@OptIn(ExperimentalAnimationApi::class)
object AnimationUtils {
    // Duration constants
    const val NAV_ANIM_DURATION = 400
    const val FADE_ANIM_DURATION = 300
    const val SCALE_ANIM_DURATION = 500
    const val EXPAND_ANIM_DURATION = 400
    
    // Basic fade animations
    val fadeIn = fadeIn(
        animationSpec = tween(FADE_ANIM_DURATION)
    )
    
    val fadeOut = fadeOut(
        animationSpec = tween(FADE_ANIM_DURATION)
    )
    
    // Scale animations with spring effect
    val scaleIn = scaleIn(
        animationSpec = spring(
            dampingRatio = Spring.DampingRatioMediumBouncy,
            stiffness = Spring.StiffnessLow
        ),
        initialScale = 0.9f
    )
    
    val scaleOut = scaleOut(
        animationSpec = tween(SCALE_ANIM_DURATION),
        targetScale = 0.9f
    )
    
    // Expand/shrink animations for UI elements
    val expandIn = expandIn(
        animationSpec = tween(EXPAND_ANIM_DURATION),
        expandFrom = Alignment.Center
    )
    
    val shrinkOut = shrinkOut(
        animationSpec = tween(EXPAND_ANIM_DURATION),
        shrinkTowards = Alignment.Center
    )
    
    // Vertical expand/shrink animations
    val expandVertically = expandVertically(
        animationSpec = tween(EXPAND_ANIM_DURATION),
        expandFrom = Alignment.Top
    )
    
    val shrinkVertically = shrinkVertically(
        animationSpec = tween(EXPAND_ANIM_DURATION),
        shrinkTowards = Alignment.Top
    )
    
    // Navigation transitions (for entering and exiting screens)
    fun <T> enterTransition(): AnimatedContentTransitionScope<T>.() -> EnterTransition {
        return {
            slideInHorizontally(
                animationSpec = tween(NAV_ANIM_DURATION),
                initialOffsetX = { fullWidth -> fullWidth }
            ) + fadeIn(animationSpec = tween(NAV_ANIM_DURATION))
        }
    }
    
    fun <T> exitTransition(): AnimatedContentTransitionScope<T>.() -> ExitTransition {
        return {
            slideOutHorizontally(
                animationSpec = tween(NAV_ANIM_DURATION),
                targetOffsetX = { fullWidth -> -fullWidth }
            ) + fadeOut(animationSpec = tween(NAV_ANIM_DURATION))
        }
    }
    
    fun <T> popEnterTransition(): AnimatedContentTransitionScope<T>.() -> EnterTransition {
        return {
            slideInHorizontally(
                animationSpec = tween(NAV_ANIM_DURATION),
                initialOffsetX = { fullWidth -> -fullWidth }
            ) + fadeIn(animationSpec = tween(NAV_ANIM_DURATION))
        }
    }
    
    fun <T> popExitTransition(): AnimatedContentTransitionScope<T>.() -> ExitTransition {
        return {
            slideOutHorizontally(
                animationSpec = tween(NAV_ANIM_DURATION),
                targetOffsetX = { fullWidth -> fullWidth }
            ) + fadeOut(animationSpec = tween(NAV_ANIM_DURATION))
        }
    }
    
    // Vertical transitions (for bottom sheets or dialogs)
    val slideInVertically = slideInVertically(
        animationSpec = tween(NAV_ANIM_DURATION),
        initialOffsetY = { fullHeight -> fullHeight }
    )
    
    val slideOutVertically = slideOutVertically(
        animationSpec = tween(NAV_ANIM_DURATION),
        targetOffsetY = { fullHeight -> fullHeight }
    )
} 