package com.ecohub.app.ui.animation;

/**
 * Animation utilities for screen transitions and UI elements
 */
@kotlin.Metadata(mv = {1, 9, 0}, k = 1, xi = 48, d1 = {"\u00006\n\u0002\u0018\u0002\n\u0002\u0010\u0000\n\u0002\b\u0002\n\u0002\u0010\b\n\u0002\b\u0004\n\u0002\u0018\u0002\n\u0002\b\u0007\n\u0002\u0018\u0002\n\u0002\b\u000f\n\u0002\u0018\u0002\n\u0002\u0018\u0002\n\u0000\n\u0002\u0018\u0002\n\u0002\b\u0004\b\u00c6\u0002\u0018\u00002\u00020\u0001B\u0007\b\u0002\u00a2\u0006\u0002\u0010\u0002J#\u0010 \u001a\u0019\u0012\n\u0012\b\u0012\u0004\u0012\u0002H#0\"\u0012\u0004\u0012\u00020\t0!\u00a2\u0006\u0002\b$\"\u0004\b\u0000\u0010#J#\u0010%\u001a\u0019\u0012\n\u0012\b\u0012\u0004\u0012\u0002H#0\"\u0012\u0004\u0012\u00020\u00110!\u00a2\u0006\u0002\b$\"\u0004\b\u0000\u0010#J#\u0010&\u001a\u0019\u0012\n\u0012\b\u0012\u0004\u0012\u0002H#0\"\u0012\u0004\u0012\u00020\t0!\u00a2\u0006\u0002\b$\"\u0004\b\u0000\u0010#J#\u0010'\u001a\u0019\u0012\n\u0012\b\u0012\u0004\u0012\u0002H#0\"\u0012\u0004\u0012\u00020\u00110!\u00a2\u0006\u0002\b$\"\u0004\b\u0000\u0010#R\u000e\u0010\u0003\u001a\u00020\u0004X\u0086T\u00a2\u0006\u0002\n\u0000R\u000e\u0010\u0005\u001a\u00020\u0004X\u0086T\u00a2\u0006\u0002\n\u0000R\u000e\u0010\u0006\u001a\u00020\u0004X\u0086T\u00a2\u0006\u0002\n\u0000R\u000e\u0010\u0007\u001a\u00020\u0004X\u0086T\u00a2\u0006\u0002\n\u0000R\u0011\u0010\b\u001a\u00020\t\u00a2\u0006\b\n\u0000\u001a\u0004\b\n\u0010\u000bR\u0011\u0010\f\u001a\u00020\t\u00a2\u0006\b\n\u0000\u001a\u0004\b\r\u0010\u000bR\u0011\u0010\u000e\u001a\u00020\t\u00a2\u0006\b\n\u0000\u001a\u0004\b\u000f\u0010\u000bR\u0011\u0010\u0010\u001a\u00020\u0011\u00a2\u0006\b\n\u0000\u001a\u0004\b\u0012\u0010\u0013R\u0011\u0010\u0014\u001a\u00020\t\u00a2\u0006\b\n\u0000\u001a\u0004\b\u0015\u0010\u000bR\u0011\u0010\u0016\u001a\u00020\u0011\u00a2\u0006\b\n\u0000\u001a\u0004\b\u0017\u0010\u0013R\u0011\u0010\u0018\u001a\u00020\u0011\u00a2\u0006\b\n\u0000\u001a\u0004\b\u0019\u0010\u0013R\u0011\u0010\u001a\u001a\u00020\u0011\u00a2\u0006\b\n\u0000\u001a\u0004\b\u001b\u0010\u0013R\u0011\u0010\u001c\u001a\u00020\t\u00a2\u0006\b\n\u0000\u001a\u0004\b\u001d\u0010\u000bR\u0011\u0010\u001e\u001a\u00020\u0011\u00a2\u0006\b\n\u0000\u001a\u0004\b\u001f\u0010\u0013\u00a8\u0006("}, d2 = {"Lcom/ecohub/app/ui/animation/AnimationUtils;", "", "()V", "EXPAND_ANIM_DURATION", "", "FADE_ANIM_DURATION", "NAV_ANIM_DURATION", "SCALE_ANIM_DURATION", "expandIn", "Landroidx/compose/animation/EnterTransition;", "getExpandIn", "()Landroidx/compose/animation/EnterTransition;", "expandVertically", "getExpandVertically", "fadeIn", "getFadeIn", "fadeOut", "Landroidx/compose/animation/ExitTransition;", "getFadeOut", "()Landroidx/compose/animation/ExitTransition;", "scaleIn", "getScaleIn", "scaleOut", "getScaleOut", "shrinkOut", "getShrinkOut", "shrinkVertically", "getShrinkVertically", "slideInVertically", "getSlideInVertically", "slideOutVertically", "getSlideOutVertically", "enterTransition", "Lkotlin/Function1;", "Landroidx/compose/animation/AnimatedContentTransitionScope;", "T", "Lkotlin/ExtensionFunctionType;", "exitTransition", "popEnterTransition", "popExitTransition", "app_debug"})
@kotlin.OptIn(markerClass = {androidx.compose.animation.ExperimentalAnimationApi.class})
public final class AnimationUtils {
    public static final int NAV_ANIM_DURATION = 400;
    public static final int FADE_ANIM_DURATION = 300;
    public static final int SCALE_ANIM_DURATION = 500;
    public static final int EXPAND_ANIM_DURATION = 400;
    @org.jetbrains.annotations.NotNull()
    private static final androidx.compose.animation.EnterTransition fadeIn = null;
    @org.jetbrains.annotations.NotNull()
    private static final androidx.compose.animation.ExitTransition fadeOut = null;
    @org.jetbrains.annotations.NotNull()
    private static final androidx.compose.animation.EnterTransition scaleIn = null;
    @org.jetbrains.annotations.NotNull()
    private static final androidx.compose.animation.ExitTransition scaleOut = null;
    @org.jetbrains.annotations.NotNull()
    private static final androidx.compose.animation.EnterTransition expandIn = null;
    @org.jetbrains.annotations.NotNull()
    private static final androidx.compose.animation.ExitTransition shrinkOut = null;
    @org.jetbrains.annotations.NotNull()
    private static final androidx.compose.animation.EnterTransition expandVertically = null;
    @org.jetbrains.annotations.NotNull()
    private static final androidx.compose.animation.ExitTransition shrinkVertically = null;
    @org.jetbrains.annotations.NotNull()
    private static final androidx.compose.animation.EnterTransition slideInVertically = null;
    @org.jetbrains.annotations.NotNull()
    private static final androidx.compose.animation.ExitTransition slideOutVertically = null;
    @org.jetbrains.annotations.NotNull()
    public static final com.ecohub.app.ui.animation.AnimationUtils INSTANCE = null;
    
    private AnimationUtils() {
        super();
    }
    
    @org.jetbrains.annotations.NotNull()
    public final androidx.compose.animation.EnterTransition getFadeIn() {
        return null;
    }
    
    @org.jetbrains.annotations.NotNull()
    public final androidx.compose.animation.ExitTransition getFadeOut() {
        return null;
    }
    
    @org.jetbrains.annotations.NotNull()
    public final androidx.compose.animation.EnterTransition getScaleIn() {
        return null;
    }
    
    @org.jetbrains.annotations.NotNull()
    public final androidx.compose.animation.ExitTransition getScaleOut() {
        return null;
    }
    
    @org.jetbrains.annotations.NotNull()
    public final androidx.compose.animation.EnterTransition getExpandIn() {
        return null;
    }
    
    @org.jetbrains.annotations.NotNull()
    public final androidx.compose.animation.ExitTransition getShrinkOut() {
        return null;
    }
    
    @org.jetbrains.annotations.NotNull()
    public final androidx.compose.animation.EnterTransition getExpandVertically() {
        return null;
    }
    
    @org.jetbrains.annotations.NotNull()
    public final androidx.compose.animation.ExitTransition getShrinkVertically() {
        return null;
    }
    
    @org.jetbrains.annotations.NotNull()
    public final <T extends java.lang.Object>kotlin.jvm.functions.Function1<androidx.compose.animation.AnimatedContentTransitionScope<T>, androidx.compose.animation.EnterTransition> enterTransition() {
        return null;
    }
    
    @org.jetbrains.annotations.NotNull()
    public final <T extends java.lang.Object>kotlin.jvm.functions.Function1<androidx.compose.animation.AnimatedContentTransitionScope<T>, androidx.compose.animation.ExitTransition> exitTransition() {
        return null;
    }
    
    @org.jetbrains.annotations.NotNull()
    public final <T extends java.lang.Object>kotlin.jvm.functions.Function1<androidx.compose.animation.AnimatedContentTransitionScope<T>, androidx.compose.animation.EnterTransition> popEnterTransition() {
        return null;
    }
    
    @org.jetbrains.annotations.NotNull()
    public final <T extends java.lang.Object>kotlin.jvm.functions.Function1<androidx.compose.animation.AnimatedContentTransitionScope<T>, androidx.compose.animation.ExitTransition> popExitTransition() {
        return null;
    }
    
    @org.jetbrains.annotations.NotNull()
    public final androidx.compose.animation.EnterTransition getSlideInVertically() {
        return null;
    }
    
    @org.jetbrains.annotations.NotNull()
    public final androidx.compose.animation.ExitTransition getSlideOutVertically() {
        return null;
    }
}