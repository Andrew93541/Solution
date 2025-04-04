package com.ecohub.app.ui.screens.calculator;

@kotlin.Metadata(mv = {1, 9, 0}, k = 2, xi = 48, d1 = {"\u0000:\n\u0000\n\u0002\u0010\u0002\n\u0002\b\u0002\n\u0002\u0018\u0002\n\u0002\b\u0002\n\u0002\u0010\u0007\n\u0002\b\u0007\n\u0002\u0010\u000e\n\u0000\n\u0002\u0018\u0002\n\u0002\b\u0002\n\u0002\u0018\u0002\n\u0002\u0018\u0002\n\u0000\n\u0002\u0018\u0002\n\u0002\b\u0003\u001a\b\u0010\u0000\u001a\u00020\u0001H\u0007\u001a\u0010\u0010\u0002\u001a\u00020\u00012\u0006\u0010\u0003\u001a\u00020\u0004H\u0007\u001a\u0010\u0010\u0005\u001a\u00020\u00012\u0006\u0010\u0006\u001a\u00020\u0007H\u0007\u001a\u0010\u0010\b\u001a\u00020\u00012\u0006\u0010\t\u001a\u00020\u0007H\u0007\u001a\b\u0010\n\u001a\u00020\u0001H\u0007\u001a\b\u0010\u000b\u001a\u00020\u0001H\u0007\u001a\b\u0010\f\u001a\u00020\u0001H\u0007\u001aG\u0010\r\u001a\u00020\u00012\u0006\u0010\u000e\u001a\u00020\u000f2\u0006\u0010\u0010\u001a\u00020\u00112\u0006\u0010\u0012\u001a\u00020\u000f2\u0011\u0010\u0013\u001a\r\u0012\u0004\u0012\u00020\u00010\u0014\u00a2\u0006\u0002\b\u00152\u0012\u0010\u0016\u001a\u000e\u0012\u0004\u0012\u00020\u0007\u0012\u0004\u0012\u00020\u00010\u0017H\u0007\u001a\b\u0010\u0018\u001a\u00020\u0001H\u0007\u001a\b\u0010\u0019\u001a\u00020\u0001H\u0007\u00a8\u0006\u001a"}, d2 = {"AirTravelCalculator", "", "CarbonCalculatorScreen", "navController", "Landroidx/navigation/NavController;", "CarbonFootprintSummary", "totalFootprint", "", "CarbonReductionAdvice", "footprint", "ElectricityCalculator", "FoodCalculator", "HomeEnergyCalculator", "SectionCard", "title", "", "icon", "Landroidx/compose/ui/graphics/vector/ImageVector;", "description", "expandedContent", "Lkotlin/Function0;", "Landroidx/compose/runtime/Composable;", "onEmissionChange", "Lkotlin/Function1;", "ShoppingCalculator", "TransportationCalculator", "app_release"})
public final class CarbonCalculatorScreenKt {
    
    @kotlin.OptIn(markerClass = {androidx.compose.material3.ExperimentalMaterial3Api.class})
    @androidx.compose.runtime.Composable()
    public static final void CarbonCalculatorScreen(@org.jetbrains.annotations.NotNull()
    androidx.navigation.NavController navController) {
    }
    
    @androidx.compose.runtime.Composable()
    public static final void CarbonFootprintSummary(float totalFootprint) {
    }
    
    @androidx.compose.runtime.Composable()
    public static final void SectionCard(@org.jetbrains.annotations.NotNull()
    java.lang.String title, @org.jetbrains.annotations.NotNull()
    androidx.compose.ui.graphics.vector.ImageVector icon, @org.jetbrains.annotations.NotNull()
    java.lang.String description, @org.jetbrains.annotations.NotNull()
    kotlin.jvm.functions.Function0<kotlin.Unit> expandedContent, @org.jetbrains.annotations.NotNull()
    kotlin.jvm.functions.Function1<? super java.lang.Float, kotlin.Unit> onEmissionChange) {
    }
    
    @androidx.compose.runtime.Composable()
    public static final void HomeEnergyCalculator() {
    }
    
    @androidx.compose.runtime.Composable()
    public static final void TransportationCalculator() {
    }
    
    @androidx.compose.runtime.Composable()
    public static final void FoodCalculator() {
    }
    
    @androidx.compose.runtime.Composable()
    public static final void ShoppingCalculator() {
    }
    
    @androidx.compose.runtime.Composable()
    public static final void AirTravelCalculator() {
    }
    
    @androidx.compose.runtime.Composable()
    public static final void ElectricityCalculator() {
    }
    
    @androidx.compose.runtime.Composable()
    public static final void CarbonReductionAdvice(float footprint) {
    }
}