package com.ecohub.app.ui.components;

@kotlin.Metadata(mv = {1, 9, 0}, k = 2, xi = 48, d1 = {"\u0000P\n\u0000\n\u0002\u0010\u0002\n\u0000\n\u0002\u0010\u000e\n\u0000\n\u0002\u0018\u0002\n\u0000\n\u0002\u0018\u0002\n\u0000\n\u0002\u0018\u0002\n\u0002\b\u0002\n\u0002\u0018\u0002\n\u0002\b\u0002\n\u0002\u0010\u0007\n\u0002\b\u0002\n\u0002\u0010\u000b\n\u0000\n\u0002\u0018\u0002\n\u0002\b\u0002\n\u0002\u0018\u0002\n\u0002\b\u0007\n\u0002\u0010\b\n\u0002\b\u0004\u001a4\u0010\u0000\u001a\u00020\u00012\u0006\u0010\u0002\u001a\u00020\u00032\f\u0010\u0004\u001a\b\u0012\u0004\u0012\u00020\u00010\u00052\b\b\u0002\u0010\u0006\u001a\u00020\u00072\n\b\u0002\u0010\b\u001a\u0004\u0018\u00010\tH\u0007\u001a%\u0010\n\u001a\u00020\u00012\b\b\u0002\u0010\u0006\u001a\u00020\u00072\u0011\u0010\u000b\u001a\r\u0012\u0004\u0012\u00020\u00010\u0005\u00a2\u0006\u0002\b\fH\u0007\u001a\u001a\u0010\r\u001a\u00020\u00012\u0006\u0010\u000e\u001a\u00020\u000f2\b\b\u0002\u0010\u0006\u001a\u00020\u0007H\u0007\u001a$\u0010\u0010\u001a\u00020\u00012\u0006\u0010\u0011\u001a\u00020\u00122\u0012\u0010\u0013\u001a\u000e\u0012\u0004\u0012\u00020\u0012\u0012\u0004\u0012\u00020\u00010\u0014H\u0007\u001a.\u0010\u0015\u001a\u00020\u00012\u0006\u0010\u0016\u001a\u00020\u00172\b\b\u0002\u0010\u0018\u001a\u00020\u000f2\b\b\u0002\u0010\u0019\u001a\u00020\u000fH\u0007\u00f8\u0001\u0000\u00a2\u0006\u0004\b\u001a\u0010\u001b\u001aD\u0010\u001c\u001a\u00020\u00012\u0006\u0010\b\u001a\u00020\t2\n\b\u0002\u0010\u001d\u001a\u0004\u0018\u00010\u00032\b\b\u0002\u0010\u001e\u001a\u00020\u001f2\b\b\u0002\u0010\u0006\u001a\u00020\u00072\b\b\u0002\u0010 \u001a\u00020\u0017H\u0007\u00f8\u0001\u0000\u00a2\u0006\u0004\b!\u0010\"\u0082\u0002\u0007\n\u0005\b\u00a1\u001e0\u0001\u00a8\u0006#"}, d2 = {"AnimatedButton", "", "text", "", "onClick", "Lkotlin/Function0;", "modifier", "Landroidx/compose/ui/Modifier;", "icon", "Landroidx/compose/ui/graphics/vector/ImageVector;", "AnimatedCard", "content", "Landroidx/compose/runtime/Composable;", "AnimatedProgressIndicator", "progress", "", "AnimatedToggleButton", "isChecked", "", "onCheckedChange", "Lkotlin/Function1;", "PulsingDot", "color", "Landroidx/compose/ui/graphics/Color;", "size", "pulseScale", "PulsingDot-ek8zF_U", "(JFF)V", "SpinningIcon", "contentDescription", "rotationDuration", "", "tint", "SpinningIcon-xwkQ0AY", "(Landroidx/compose/ui/graphics/vector/ImageVector;Ljava/lang/String;ILandroidx/compose/ui/Modifier;J)V", "app_release"})
public final class AnimatedComponentsKt {
    
    /**
     * A button that animates when pressed
     */
    @androidx.compose.runtime.Composable()
    public static final void AnimatedButton(@org.jetbrains.annotations.NotNull()
    java.lang.String text, @org.jetbrains.annotations.NotNull()
    kotlin.jvm.functions.Function0<kotlin.Unit> onClick, @org.jetbrains.annotations.NotNull()
    androidx.compose.ui.Modifier modifier, @org.jetbrains.annotations.Nullable()
    androidx.compose.ui.graphics.vector.ImageVector icon) {
    }
    
    /**
     * A card that animates in when first composed
     */
    @androidx.compose.runtime.Composable()
    public static final void AnimatedCard(@org.jetbrains.annotations.NotNull()
    androidx.compose.ui.Modifier modifier, @org.jetbrains.annotations.NotNull()
    kotlin.jvm.functions.Function0<kotlin.Unit> content) {
    }
    
    /**
     * A progress indicator that animates continuously
     */
    @androidx.compose.runtime.Composable()
    public static final void AnimatedProgressIndicator(float progress, @org.jetbrains.annotations.NotNull()
    androidx.compose.ui.Modifier modifier) {
    }
    
    /**
     * A toggle button that animates between states
     */
    @androidx.compose.runtime.Composable()
    public static final void AnimatedToggleButton(boolean isChecked, @org.jetbrains.annotations.NotNull()
    kotlin.jvm.functions.Function1<? super java.lang.Boolean, kotlin.Unit> onCheckedChange) {
    }
}