package com.ecohub.app.ui.screens.calculator

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.tween
import androidx.compose.animation.fadeIn
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.ArrowDropDown
import androidx.compose.material.icons.filled.ArrowDropUp
import androidx.compose.material.icons.filled.DirectionsCar
import androidx.compose.material.icons.filled.ElectricalServices
import androidx.compose.material.icons.filled.Flight
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.LocalDining
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material.icons.filled.ShoppingBag
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Divider
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Slider
import androidx.compose.material3.SliderDefaults
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.material3.TextFieldDefaults
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableFloatStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.rotate
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.ecohub.app.ui.animation.AnimationUtils
import com.ecohub.app.ui.components.AnimatedButton
import com.ecohub.app.ui.components.AnimatedProgressIndicator
import kotlinx.coroutines.delay
import kotlin.math.roundToInt

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CarbonCalculatorScreen(navController: NavController) {
    // Animation states
    var showContent by remember { mutableStateOf(false) }
    
    // Trigger animation on composition
    LaunchedEffect(Unit) {
        delay(100)
        showContent = true
    }
    
    // Emission categories
    val categories = remember {
        listOf(
            EmissionCategory(
                title = "Home Energy",
                icon = Icons.Default.Home,
                description = "Calculate emissions from your home energy use",
                expandedContent = {
                    HomeEnergyCalculator()
                }
            ),
            EmissionCategory(
                title = "Transportation",
                icon = Icons.Default.DirectionsCar,
                description = "Calculate emissions from your transportation habits",
                expandedContent = {
                    TransportationCalculator()
                }
            ),
            EmissionCategory(
                title = "Food & Diet",
                icon = Icons.Default.LocalDining,
                description = "Calculate emissions from your dietary choices",
                expandedContent = {
                    FoodCalculator()
                }
            ),
            EmissionCategory(
                title = "Shopping",
                icon = Icons.Default.ShoppingBag,
                description = "Calculate emissions from your purchases",
                expandedContent = {
                    ShoppingCalculator()
                }
            ),
            EmissionCategory(
                title = "Air Travel",
                icon = Icons.Default.Flight,
                description = "Calculate emissions from your flights",
                expandedContent = {
                    AirTravelCalculator()
                }
            ),
            EmissionCategory(
                title = "Electricity",
                icon = Icons.Default.ElectricalServices,
                description = "Calculate emissions from your electricity usage",
                expandedContent = {
                    ElectricityCalculator()
                }
            )
        )
    }
    
    // Total carbon footprint
    val totalFootprint = remember { mutableFloatStateOf(0f) }
    
    Scaffold(
        topBar = {
            TopAppBar(
                title = { 
                    Text("Carbon Footprint Calculator") 
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.primary,
                    titleContentColor = MaterialTheme.colorScheme.onPrimary
                ),
                navigationIcon = {
                    IconButton(onClick = { navController.navigateUp() }) {
                        Icon(
                            Icons.AutoMirrored.Filled.ArrowBack,
                            contentDescription = "Back",
                            tint = MaterialTheme.colorScheme.onPrimary
                        )
                    }
                },
                actions = {
                    IconButton(onClick = { /* Reset calculations */ }) {
                        Icon(
                            Icons.Default.Refresh,
                            contentDescription = "Reset",
                            tint = MaterialTheme.colorScheme.onPrimary
                        )
                    }
                }
            )
        }
    ) { paddingValues ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            // Carbon footprint summary
            item {
                AnimatedVisibility(
                    visible = showContent,
                    enter = AnimationUtils.fadeIn + AnimationUtils.expandVertically
                ) {
                    CarbonFootprintSummary(totalFootprint.floatValue)
                }
            }
            
            // Emission calculator sections
            categories.forEachIndexed { index, category ->
                item {
                    AnimatedVisibility(
                        visible = showContent,
                        enter = fadeIn(
                            animationSpec = tween(
                                durationMillis = AnimationUtils.FADE_ANIM_DURATION,
                                delayMillis = 100 * (index + 1)
                            )
                        ) + AnimationUtils.expandVertically
                    ) {
                        SectionCard(
                            title = category.title,
                            icon = category.icon,
                            description = category.description,
                            expandedContent = category.expandedContent,
                            onEmissionChange = { newEmission ->
                                // In a real app, you'd update the specific category emission
                                // and recalculate the total
                                totalFootprint.floatValue = (totalFootprint.floatValue + newEmission).coerceIn(0f, 100f)
                            }
                        )
                    }
                }
            }
            
            // Final advice and action buttons
            item {
                AnimatedVisibility(
                    visible = showContent,
                    enter = fadeIn(
                        animationSpec = tween(
                            durationMillis = AnimationUtils.FADE_ANIM_DURATION,
                            delayMillis = 100 * (categories.size + 1)
                        )
                    ) + AnimationUtils.expandVertically
                ) {
                    CarbonReductionAdvice(totalFootprint.floatValue)
                }
            }
            
            // Final spacing
            item {
                Spacer(modifier = Modifier.height(16.dp))
            }
        }
    }
}

@Composable
fun CarbonFootprintSummary(totalFootprint: Float) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp)
            .shadow(8.dp, shape = RoundedCornerShape(16.dp)),
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.surface
        )
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(24.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(
                text = "Your Carbon Footprint",
                style = MaterialTheme.typography.titleLarge,
                fontWeight = FontWeight.Bold
            )
            
            Spacer(modifier = Modifier.height(16.dp))
            
            // Circular progress indicator
            Box(
                contentAlignment = Alignment.Center,
                modifier = Modifier.size(200.dp)
            ) {
                AnimatedProgressIndicator(
                    progress = totalFootprint / 100f, 
                    modifier = Modifier.size(200.dp)
                )
                
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text(
                        text = "${totalFootprint.roundToInt()} kg",
                        style = MaterialTheme.typography.headlineLarge,
                        fontWeight = FontWeight.Bold
                    )
                    Text(
                        text = "CO₂e weekly",
                        style = MaterialTheme.typography.bodyMedium
                    )
                }
            }
            
            Spacer(modifier = Modifier.height(16.dp))
            
            // Comparison text
            val comparisonText = when {
                totalFootprint < 20 -> "Your carbon footprint is lower than 90% of people!"
                totalFootprint < 40 -> "Your carbon footprint is lower than average"
                totalFootprint < 60 -> "Your carbon footprint is about average"
                totalFootprint < 80 -> "Your carbon footprint is higher than average"
                else -> "Your carbon footprint is very high. Consider more sustainable choices."
            }
            
            Text(
                text = comparisonText,
                style = MaterialTheme.typography.bodyLarge,
                textAlign = TextAlign.Center
            )
        }
    }
}

@Composable
fun SectionCard(
    title: String,
    icon: ImageVector,
    description: String,
    expandedContent: @Composable () -> Unit,
    onEmissionChange: (Float) -> Unit
) {
    var expanded by remember { mutableStateOf(false) }
    
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp)
            .clickable { expanded = !expanded },
        elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
    ) {
        Column(
            modifier = Modifier.fillMaxWidth()
        ) {
            // Header
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                // Icon
                Surface(
                    shape = CircleShape,
                    color = MaterialTheme.colorScheme.primaryContainer,
                    modifier = Modifier.size(48.dp)
                ) {
                    Box(contentAlignment = Alignment.Center) {
                        Icon(
                            imageVector = icon,
                            contentDescription = null,
                            modifier = Modifier.size(24.dp),
                            tint = MaterialTheme.colorScheme.onPrimaryContainer
                        )
                    }
                }
                
                Spacer(modifier = Modifier.width(16.dp))
                
                // Title and description
                Column(
                    modifier = Modifier.weight(1f)
                ) {
                    Text(
                        text = title,
                        style = MaterialTheme.typography.titleLarge
                    )
                    
                    Text(
                        text = description,
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
                
                // Expand/collapse icon
                Icon(
                    imageVector = if (expanded) 
                        Icons.Default.ArrowDropUp 
                    else 
                        Icons.Default.ArrowDropDown,
                    contentDescription = if (expanded) "Collapse" else "Expand",
                    tint = MaterialTheme.colorScheme.primary
                )
            }
            
            // Expanded content
            AnimatedVisibility(
                visible = expanded,
                enter = AnimationUtils.fadeIn + AnimationUtils.expandVertically,
                exit = AnimationUtils.fadeOut + AnimationUtils.shrinkVertically
            ) {
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp)
                ) {
                    expandedContent()
                    
                    Spacer(modifier = Modifier.height(16.dp))
                    
                    // Calculate button
                    AnimatedButton(
                        text = "Calculate",
                        onClick = { 
                            // Simulate emission calculation
                            onEmissionChange(5f + Math.random().toFloat() * 10f) 
                        },
                        modifier = Modifier.align(Alignment.End)
                    )
                }
            }
        }
    }
}

@Composable
fun HomeEnergyCalculator() {
    var electricityUsage by remember { mutableFloatStateOf(300f) }
    var gasUsage by remember { mutableFloatStateOf(100f) }
    
    Column(
        modifier = Modifier.fillMaxWidth()
    ) {
        Text(
            text = "Monthly Electricity Usage (kWh)",
            style = MaterialTheme.typography.bodyLarge
        )
        
        Spacer(modifier = Modifier.height(8.dp))
        
        Row(
            verticalAlignment = Alignment.CenterVertically
        ) {
            Slider(
                value = electricityUsage,
                onValueChange = { electricityUsage = it },
                valueRange = 0f..1000f,
                steps = 0,
                modifier = Modifier.weight(1f),
                colors = SliderDefaults.colors(
                    thumbColor = MaterialTheme.colorScheme.primary,
                    activeTrackColor = MaterialTheme.colorScheme.primary
                )
            )
            
            Spacer(modifier = Modifier.width(16.dp))
            
            Text(
                text = "${electricityUsage.roundToInt()} kWh",
                style = MaterialTheme.typography.bodyLarge
            )
        }
        
        Spacer(modifier = Modifier.height(16.dp))
        
        Text(
            text = "Monthly Natural Gas Usage (therms)",
            style = MaterialTheme.typography.bodyLarge
        )
        
        Spacer(modifier = Modifier.height(8.dp))
        
        Row(
            verticalAlignment = Alignment.CenterVertically
        ) {
            Slider(
                value = gasUsage,
                onValueChange = { gasUsage = it },
                valueRange = 0f..250f,
                steps = 0,
                modifier = Modifier.weight(1f),
                colors = SliderDefaults.colors(
                    thumbColor = MaterialTheme.colorScheme.primary,
                    activeTrackColor = MaterialTheme.colorScheme.primary
                )
            )
            
            Spacer(modifier = Modifier.width(16.dp))
            
            Text(
                text = "${gasUsage.roundToInt()} therms",
                style = MaterialTheme.typography.bodyLarge
            )
        }
    }
}

@Composable
fun TransportationCalculator() {
    var carMiles by remember { mutableFloatStateOf(150f) }
    var publicTransitMiles by remember { mutableFloatStateOf(50f) }
    
    Column(
        modifier = Modifier.fillMaxWidth()
    ) {
        Text(
            text = "Weekly Car Miles",
            style = MaterialTheme.typography.bodyLarge
        )
        
        Spacer(modifier = Modifier.height(8.dp))
        
        Row(
            verticalAlignment = Alignment.CenterVertically
        ) {
            Slider(
                value = carMiles,
                onValueChange = { carMiles = it },
                valueRange = 0f..500f,
                steps = 0,
                modifier = Modifier.weight(1f),
                colors = SliderDefaults.colors(
                    thumbColor = MaterialTheme.colorScheme.primary,
                    activeTrackColor = MaterialTheme.colorScheme.primary
                )
            )
            
            Spacer(modifier = Modifier.width(16.dp))
            
            Text(
                text = "${carMiles.roundToInt()} miles",
                style = MaterialTheme.typography.bodyLarge
            )
        }
        
        Spacer(modifier = Modifier.height(16.dp))
        
        Text(
            text = "Weekly Public Transit Miles",
            style = MaterialTheme.typography.bodyLarge
        )
        
        Spacer(modifier = Modifier.height(8.dp))
        
        Row(
            verticalAlignment = Alignment.CenterVertically
        ) {
            Slider(
                value = publicTransitMiles,
                onValueChange = { publicTransitMiles = it },
                valueRange = 0f..500f,
                steps = 0,
                modifier = Modifier.weight(1f),
                colors = SliderDefaults.colors(
                    thumbColor = MaterialTheme.colorScheme.primary,
                    activeTrackColor = MaterialTheme.colorScheme.primary
                )
            )
            
            Spacer(modifier = Modifier.width(16.dp))
            
            Text(
                text = "${publicTransitMiles.roundToInt()} miles",
                style = MaterialTheme.typography.bodyLarge
            )
        }
    }
}

@Composable
fun FoodCalculator() {
    var meatConsumption by remember { mutableFloatStateOf(3f) }
    var dairyConsumption by remember { mutableFloatStateOf(5f) }
    var plantBasedConsumption by remember { mutableFloatStateOf(4f) }
    
    Column(
        modifier = Modifier.fillMaxWidth()
    ) {
        Text(
            text = "Meat Meals per Week",
            style = MaterialTheme.typography.bodyLarge
        )
        
        Spacer(modifier = Modifier.height(8.dp))
        
        Row(
            verticalAlignment = Alignment.CenterVertically
        ) {
            Slider(
                value = meatConsumption,
                onValueChange = { meatConsumption = it },
                valueRange = 0f..21f,
                steps = 20,
                modifier = Modifier.weight(1f),
                colors = SliderDefaults.colors(
                    thumbColor = MaterialTheme.colorScheme.primary,
                    activeTrackColor = MaterialTheme.colorScheme.primary
                )
            )
            
            Spacer(modifier = Modifier.width(16.dp))
            
            Text(
                text = "${meatConsumption.roundToInt()} meals",
                style = MaterialTheme.typography.bodyLarge
            )
        }
        
        Spacer(modifier = Modifier.height(16.dp))
        
        Text(
            text = "Dairy Servings per Day",
            style = MaterialTheme.typography.bodyLarge
        )
        
        Spacer(modifier = Modifier.height(8.dp))
        
        Row(
            verticalAlignment = Alignment.CenterVertically
        ) {
            Slider(
                value = dairyConsumption,
                onValueChange = { dairyConsumption = it },
                valueRange = 0f..10f,
                steps = 9,
                modifier = Modifier.weight(1f),
                colors = SliderDefaults.colors(
                    thumbColor = MaterialTheme.colorScheme.primary,
                    activeTrackColor = MaterialTheme.colorScheme.primary
                )
            )
            
            Spacer(modifier = Modifier.width(16.dp))
            
            Text(
                text = "${dairyConsumption.roundToInt()} servings",
                style = MaterialTheme.typography.bodyLarge
            )
        }
        
        Spacer(modifier = Modifier.height(16.dp))
        
        Text(
            text = "Plant-Based Meals per Week",
            style = MaterialTheme.typography.bodyLarge
        )
        
        Spacer(modifier = Modifier.height(8.dp))
        
        Row(
            verticalAlignment = Alignment.CenterVertically
        ) {
            Slider(
                value = plantBasedConsumption,
                onValueChange = { plantBasedConsumption = it },
                valueRange = 0f..21f,
                steps = 20,
                modifier = Modifier.weight(1f),
                colors = SliderDefaults.colors(
                    thumbColor = MaterialTheme.colorScheme.primary,
                    activeTrackColor = MaterialTheme.colorScheme.primary
                )
            )
            
            Spacer(modifier = Modifier.width(16.dp))
            
            Text(
                text = "${plantBasedConsumption.roundToInt()} meals",
                style = MaterialTheme.typography.bodyLarge
            )
        }
    }
}

@Composable
fun ShoppingCalculator() {
    var monthlySpending by remember { mutableFloatStateOf(500f) }
    
    Column(
        modifier = Modifier.fillMaxWidth()
    ) {
        Text(
            text = "Monthly Spending on Consumer Goods ($)",
            style = MaterialTheme.typography.bodyLarge
        )
        
        Spacer(modifier = Modifier.height(8.dp))
        
        Row(
            verticalAlignment = Alignment.CenterVertically
        ) {
            Slider(
                value = monthlySpending,
                onValueChange = { monthlySpending = it },
                valueRange = 0f..2000f,
                steps = 0,
                modifier = Modifier.weight(1f),
                colors = SliderDefaults.colors(
                    thumbColor = MaterialTheme.colorScheme.primary,
                    activeTrackColor = MaterialTheme.colorScheme.primary
                )
            )
            
            Spacer(modifier = Modifier.width(16.dp))
            
            Text(
                text = "$${monthlySpending.roundToInt()}",
                style = MaterialTheme.typography.bodyLarge
            )
        }
    }
}

@Composable
fun AirTravelCalculator() {
    var shortFlights by remember { mutableFloatStateOf(2f) }
    var longFlights by remember { mutableFloatStateOf(1f) }
    
    Column(
        modifier = Modifier.fillMaxWidth()
    ) {
        Text(
            text = "Short Flights per Year (<4 hours)",
            style = MaterialTheme.typography.bodyLarge
        )
        
        Spacer(modifier = Modifier.height(8.dp))
        
        Row(
            verticalAlignment = Alignment.CenterVertically
        ) {
            Slider(
                value = shortFlights,
                onValueChange = { shortFlights = it },
                valueRange = 0f..20f,
                steps = 19,
                modifier = Modifier.weight(1f),
                colors = SliderDefaults.colors(
                    thumbColor = MaterialTheme.colorScheme.primary,
                    activeTrackColor = MaterialTheme.colorScheme.primary
                )
            )
            
            Spacer(modifier = Modifier.width(16.dp))
            
            Text(
                text = "${shortFlights.roundToInt()} flights",
                style = MaterialTheme.typography.bodyLarge
            )
        }
        
        Spacer(modifier = Modifier.height(16.dp))
        
        Text(
            text = "Long Flights per Year (>4 hours)",
            style = MaterialTheme.typography.bodyLarge
        )
        
        Spacer(modifier = Modifier.height(8.dp))
        
        Row(
            verticalAlignment = Alignment.CenterVertically
        ) {
            Slider(
                value = longFlights,
                onValueChange = { longFlights = it },
                valueRange = 0f..10f,
                steps = 9,
                modifier = Modifier.weight(1f),
                colors = SliderDefaults.colors(
                    thumbColor = MaterialTheme.colorScheme.primary,
                    activeTrackColor = MaterialTheme.colorScheme.primary
                )
            )
            
            Spacer(modifier = Modifier.width(16.dp))
            
            Text(
                text = "${longFlights.roundToInt()} flights",
                style = MaterialTheme.typography.bodyLarge
            )
        }
    }
}

@Composable
fun ElectricityCalculator() {
    var renewablePercentage by remember { mutableFloatStateOf(30f) }
    
    Column(
        modifier = Modifier.fillMaxWidth()
    ) {
        Text(
            text = "Percentage of Renewable Electricity",
            style = MaterialTheme.typography.bodyLarge
        )
        
        Spacer(modifier = Modifier.height(8.dp))
        
        Row(
            verticalAlignment = Alignment.CenterVertically
        ) {
            Slider(
                value = renewablePercentage,
                onValueChange = { renewablePercentage = it },
                valueRange = 0f..100f,
                steps = 0,
                modifier = Modifier.weight(1f),
                colors = SliderDefaults.colors(
                    thumbColor = MaterialTheme.colorScheme.primary,
                    activeTrackColor = MaterialTheme.colorScheme.primary
                )
            )
            
            Spacer(modifier = Modifier.width(16.dp))
            
            Text(
                text = "${renewablePercentage.roundToInt()}%",
                style = MaterialTheme.typography.bodyLarge
            )
        }
    }
}

@Composable
fun CarbonReductionAdvice(footprint: Float) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp),
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.secondaryContainer
        )
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp)
        ) {
            Text(
                text = "Ways to Reduce Your Carbon Footprint",
                style = MaterialTheme.typography.titleLarge,
                color = MaterialTheme.colorScheme.onSecondaryContainer
            )
            
            Spacer(modifier = Modifier.height(16.dp))
            
            val suggestions = listOf(
                "Reduce meat consumption - try plant-based meals several times a week",
                "Use public transportation, bike or walk for short trips",
                "Switch to renewable electricity sources if available in your area",
                "Reduce air travel and offset emissions when flying",
                "Buy fewer new products and opt for used or repaired items",
                "Improve home insulation and energy efficiency"
            )
            
            suggestions.forEachIndexed { index, suggestion ->
                Row(
                    modifier = Modifier.padding(vertical = 4.dp),
                    verticalAlignment = Alignment.Top
                ) {
                    Text(
                        text = "•",
                        style = MaterialTheme.typography.bodyLarge,
                        color = MaterialTheme.colorScheme.onSecondaryContainer,
                        modifier = Modifier.padding(end = 8.dp, top = 2.dp)
                    )
                    
                    Text(
                        text = suggestion,
                        style = MaterialTheme.typography.bodyLarge,
                        color = MaterialTheme.colorScheme.onSecondaryContainer
                    )
                }
            }
            
            Spacer(modifier = Modifier.height(16.dp))
            
            // Sharing buttons
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.End
            ) {
                AnimatedButton(
                    text = "Share Results",
                    onClick = { /* Share results */ }
                )
                
                Spacer(modifier = Modifier.width(8.dp))
                
                AnimatedButton(
                    text = "Save Progress",
                    onClick = { /* Save progress */ }
                )
            }
        }
    }
}

// Data classes
data class EmissionCategory(
    val title: String,
    val icon: ImageVector,
    val description: String,
    val expandedContent: @Composable () -> Unit
) 