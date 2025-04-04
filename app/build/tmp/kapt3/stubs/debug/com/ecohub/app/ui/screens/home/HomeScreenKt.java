package com.ecohub.app.ui.screens.home;

@kotlin.Metadata(mv = {1, 9, 0}, k = 2, xi = 48, d1 = {"\u0000X\n\u0000\n\u0002\u0010\u0002\n\u0000\n\u0002\u0010\u000e\n\u0000\n\u0002\u0010\u000b\n\u0000\n\u0002\u0018\u0002\n\u0002\b\u0002\n\u0002\u0018\u0002\n\u0002\b\u0004\n\u0002\u0018\u0002\n\u0002\b\u0004\n\u0002\u0018\u0002\n\u0000\n\u0002\u0018\u0002\n\u0002\b\u0002\n\u0002\u0018\u0002\n\u0002\b\u0002\n\u0002\u0018\u0002\n\u0002\b\u0002\n\u0002\u0018\u0002\n\u0002\b\u0003\n\u0002\u0010\u0007\n\u0000\u001a,\u0010\u0000\u001a\u00020\u00012\u0006\u0010\u0002\u001a\u00020\u00032\u0006\u0010\u0004\u001a\u00020\u00052\u0012\u0010\u0006\u001a\u000e\u0012\u0004\u0012\u00020\u0005\u0012\u0004\u0012\u00020\u00010\u0007H\u0003\u001a\u0010\u0010\b\u001a\u00020\u00012\u0006\u0010\t\u001a\u00020\nH\u0007\u001a2\u0010\u000b\u001a\u00020\u00012\u0006\u0010\u0002\u001a\u00020\u00032\u0006\u0010\f\u001a\u00020\u00032\u0006\u0010\r\u001a\u00020\u00032\u0006\u0010\u000e\u001a\u00020\u000fH\u0007\u00f8\u0001\u0000\u00a2\u0006\u0004\b\u0010\u0010\u0011\u001a\u001e\u0010\u0012\u001a\u00020\u00012\u0006\u0010\u0013\u001a\u00020\u00142\f\u0010\u0015\u001a\b\u0012\u0004\u0012\u00020\u00010\u0016H\u0003\u001a\u0010\u0010\u0017\u001a\u00020\u00012\u0006\u0010\u0018\u001a\u00020\u0019H\u0007\u001a\u0010\u0010\u001a\u001a\u00020\u00012\u0006\u0010\u001b\u001a\u00020\u001cH\u0007\u001a&\u0010\u001d\u001a\u00020\u00012\u0006\u0010\u001e\u001a\u00020\u001f2\u0006\u0010 \u001a\u00020\u00032\f\u0010\u0015\u001a\b\u0012\u0004\u0012\u00020\u00010\u0016H\u0003\u001a\u0010\u0010!\u001a\u00020\u00032\u0006\u0010\"\u001a\u00020#H\u0007\u0082\u0002\u0007\n\u0005\b\u00a1\u001e0\u0001\u00a8\u0006$"}, d2 = {"ChallengeItem", "", "title", "", "isComplete", "", "onToggle", "Lkotlin/Function1;", "EnhancedBadgeItem", "badge", "Lcom/ecohub/app/ui/screens/home/EnhancedBadge;", "EnvMetricItem", "value", "status", "statusColor", "Landroidx/compose/ui/graphics/Color;", "EnvMetricItem-g2O1Hgs", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;J)V", "EventCard", "event", "Lcom/ecohub/app/ui/screens/home/Event;", "onClick", "Lkotlin/Function0;", "HomeScreen", "navController", "Landroidx/navigation/NavController;", "NewsFeedItemCard", "newsItem", "Lcom/ecohub/app/ui/screens/home/NewsFeedItem;", "QuickActionButton", "icon", "Landroidx/compose/ui/graphics/vector/ImageVector;", "label", "getSustainabilityMessage", "score", "", "app_debug"})
public final class HomeScreenKt {
    
    @kotlin.OptIn(markerClass = {androidx.compose.material3.ExperimentalMaterial3Api.class, androidx.compose.foundation.ExperimentalFoundationApi.class})
    @androidx.compose.runtime.Composable()
    public static final void HomeScreen(@org.jetbrains.annotations.NotNull()
    androidx.navigation.NavController navController) {
    }
    
    @androidx.compose.runtime.Composable()
    public static final void EnhancedBadgeItem(@org.jetbrains.annotations.NotNull()
    com.ecohub.app.ui.screens.home.EnhancedBadge badge) {
    }
    
    @androidx.compose.runtime.Composable()
    public static final void NewsFeedItemCard(@org.jetbrains.annotations.NotNull()
    com.ecohub.app.ui.screens.home.NewsFeedItem newsItem) {
    }
    
    @androidx.compose.runtime.Composable()
    @org.jetbrains.annotations.NotNull()
    public static final java.lang.String getSustainabilityMessage(float score) {
        return null;
    }
    
    @androidx.compose.runtime.Composable()
    private static final void QuickActionButton(androidx.compose.ui.graphics.vector.ImageVector icon, java.lang.String label, kotlin.jvm.functions.Function0<kotlin.Unit> onClick) {
    }
    
    @androidx.compose.runtime.Composable()
    private static final void ChallengeItem(java.lang.String title, boolean isComplete, kotlin.jvm.functions.Function1<? super java.lang.Boolean, kotlin.Unit> onToggle) {
    }
    
    @kotlin.OptIn(markerClass = {androidx.compose.material3.ExperimentalMaterial3Api.class})
    @androidx.compose.runtime.Composable()
    private static final void EventCard(com.ecohub.app.ui.screens.home.Event event, kotlin.jvm.functions.Function0<kotlin.Unit> onClick) {
    }
}