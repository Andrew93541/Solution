package com.ecohub.app.ui.screens.home

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.ExperimentalAnimationApi
import androidx.compose.animation.core.LinearEasing
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.ExperimentalFoundationApi
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.foundation.pager.HorizontalPager
import androidx.compose.foundation.pager.rememberPagerState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.automirrored.filled.ArrowForward
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.ArrowForward
import androidx.compose.material.icons.filled.Calculate
import androidx.compose.material.icons.filled.Eco
import androidx.compose.material.icons.filled.EmojiEvents
import androidx.compose.material.icons.filled.FormatListBulleted
import androidx.compose.material.icons.filled.Group
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.LocationOn
import androidx.compose.material.icons.filled.Map
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material.icons.filled.Star
import androidx.compose.material.icons.filled.StarBorder
import androidx.compose.material.icons.filled.TrendingUp
import androidx.compose.material3.Badge
import androidx.compose.material3.BadgeDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Divider
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableFloatStateOf
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import coil.compose.AsyncImage
import com.ecohub.app.ui.animation.AnimationUtils
import com.ecohub.app.ui.components.AnimatedButton
import com.ecohub.app.ui.components.AnimatedCard
import com.ecohub.app.ui.components.AnimatedProgressIndicator
import com.ecohub.app.ui.components.AnimatedToggleButton
import com.ecohub.app.ui.components.PulsingDot
import com.ecohub.app.ui.components.SpinningIcon
import com.ecohub.app.ui.navigation.Screen
import com.ecohub.app.ui.theme.ErrorRed
import com.ecohub.app.ui.theme.SuccessGreen
import com.ecohub.app.ui.theme.WarningYellow
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlin.random.Random

@OptIn(ExperimentalMaterial3Api::class, ExperimentalFoundationApi::class)
@Composable
fun HomeScreen(navController: NavController) {
    // State for daily challenges
    var completedTasks by remember { mutableIntStateOf(0) }
    val totalTasks = 5
    
    // State for sustainability score
    var sustainabilityScore by remember { mutableFloatStateOf(0.68f) }
    
    // State for featured tips
    val tips = remember {
        listOf(
            "Use reusable bags when shopping to reduce plastic waste",
            "Turn off lights when leaving a room to save electricity",
            "Take shorter showers to conserve water and energy",
            "Use public transportation or carpool to reduce carbon emissions",
            "Choose locally grown produce to reduce transportation emissions",
            "Reduce meat consumption for a smaller carbon footprint",
            "Plant native trees and plants to support local ecosystems",
            "Repair items instead of replacing them to reduce waste",
            "Use a reusable water bottle instead of buying bottled water",
            "Install LED light bulbs to reduce energy consumption"
        )
    }
    
    // State for community events
    val events = remember {
        listOf(
            Event("Urban Gardening Workshop", "March 28", "Join us for a day of learning urban gardening techniques for sustainable food production", "https://images.pexels.com/photos/8092930/pexels-photo-8092930.jpeg?auto=compress&cs=tinysrgb&w=600"),
            Event("Recycling Drive", "April 5", "Help your community recycle more efficiently and learn about proper waste sorting", "https://images.pexels.com/photos/802221/pexels-photo-802221.jpeg?auto=compress&cs=tinysrgb&w=600"),
            Event("Clean Energy Seminar", "April 12", "Learn about the latest innovations in renewable energy technologies", "https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg?auto=compress&cs=tinysrgb&w=600"),
            Event("Beach Cleanup", "April 19", "Help keep our oceans clean and protect marine wildlife from pollution", "https://images.pexels.com/photos/3737000/pexels-photo-3737000.jpeg?auto=compress&cs=tinysrgb&w=600"),
            Event("Sustainable Fashion Show", "April 25", "Discover eco-friendly clothing brands and sustainable fashion practices", "https://images.pexels.com/photos/6567607/pexels-photo-6567607.jpeg?auto=compress&cs=tinysrgb&w=600")
        )
    }
    
    // Enhanced badges with descriptions and point values
    val badges = remember {
        listOf(
            EnhancedBadge("Tree Planter", Icons.Default.Eco, "Planted 5+ trees in your community", 500),
            EnhancedBadge("Energy Saver", Icons.Default.TrendingUp, "Reduced energy usage by 20%", 750),
            EnhancedBadge("Waste Reducer", Icons.Default.FormatListBulleted, "Diverted 100kg from landfill", 600),
            EnhancedBadge("Green Traveler", Icons.Default.Map, "Used sustainable transport for 30 days", 800),
            EnhancedBadge("Community Builder", Icons.Default.Group, "Organized 3+ environmental events", 1000)
        )
    }
    
    // Weather and air quality data
    var currentWeather by remember { mutableStateOf("Sunny") }
    var currentTemperature by remember { mutableStateOf(72) }
    var airQualityIndex by remember { mutableIntStateOf(45) }
    var uvIndex by remember { mutableIntStateOf(3) }
    
    // Auto-update the sustainability score
    LaunchedEffect(Unit) {
        while (true) {
            delay(10000) // Update every 10 seconds
            sustainabilityScore = (sustainabilityScore + Random.nextFloat() * 0.02f - 0.01f).coerceIn(0f, 1f)
        }
    }
    
    // Banner carousel state
    val banners = remember {
        listOf(
            BannerContent(
                "https://images.pexels.com/photos/3943969/pexels-photo-3943969.jpeg?auto=compress&cs=tinysrgb&w=600",
                "Make a difference today!",
                "Small actions lead to big changes for our planet."
            ),
            BannerContent(
                "https://images.pexels.com/photos/3699938/pexels-photo-3699938.jpeg?auto=compress&cs=tinysrgb&w=600",
                "Embrace renewable energy",
                "Switch to clean power sources to reduce your carbon footprint."
            ),
            BannerContent(
                "https://images.pexels.com/photos/3244513/pexels-photo-3244513.jpeg?auto=compress&cs=tinysrgb&w=600",
                "Protect our oceans",
                "Keep our waters clean for future generations."
            ),
            BannerContent(
                "https://images.pexels.com/photos/1353938/pexels-photo-1353938.jpeg?auto=compress&cs=tinysrgb&w=600",
                "Plant more trees",
                "Trees are vital for a healthy climate and ecosystem."
            )
        )
    }
    val pagerState = rememberPagerState(pageCount = { banners.size })
    
    // Auto-scroll the banner
    val coroutineScope = rememberCoroutineScope()
    LaunchedEffect(Unit) {
        while (true) {
            delay(5000)
            coroutineScope.launch {
                val nextPage = (pagerState.currentPage + 1) % banners.size
                pagerState.animateScrollToPage(nextPage)
            }
        }
    }
    
    // News feed items
    val newsFeedItems = remember {
        listOf(
            NewsFeedItem(
                "New Study Shows Benefits of Urban Gardens",
                "Research indicates urban gardens can reduce city temperatures by up to 3°C while providing fresh produce.",
                "Environmental Science Journal",
                "2 hours ago",
                "https://images.pexels.com/photos/2286776/pexels-photo-2286776.jpeg?auto=compress&cs=tinysrgb&w=600"
            ),
            NewsFeedItem(
                "Global Renewable Energy Capacity Grew by 45% Last Year",
                "Solar and wind power installations reached record levels, driving the transition to clean energy.",
                "Clean Energy Monitor",
                "1 day ago",
                "https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg?auto=compress&cs=tinysrgb&w=600"
            ),
            NewsFeedItem(
                "Ocean Cleanup Project Removes 100 Tons of Plastic",
                "Innovative technology successfully removes significant amount of ocean plastic pollution.",
                "Marine Conservation News",
                "3 days ago",
                "https://images.pexels.com/photos/2682405/pexels-photo-2682405.jpeg?auto=compress&cs=tinysrgb&w=600"
            )
        )
    }
    
    Scaffold(
        topBar = {
            TopAppBar(
                title = { 
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        Text("EcoHub")
                        PulsingDot(color = MaterialTheme.colorScheme.primaryContainer, size = 8f)
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.primary,
                    titleContentColor = MaterialTheme.colorScheme.onPrimary
                ),
                actions = {
                    IconButton(onClick = { navController.navigate(Screen.Profile.route) }) {
                        Icon(
                            Icons.Default.Person, 
                            contentDescription = "Profile",
                            tint = MaterialTheme.colorScheme.onPrimary
                        )
                    }
                }
            )
        },
        bottomBar = {
            NavigationBar {
                NavigationBarItem(
                    icon = { Icon(Icons.Default.Home, contentDescription = "Home") },
                    label = { Text("Home") },
                    selected = true,
                    onClick = { }
                )
                NavigationBarItem(
                    icon = { Icon(Icons.Default.Calculate, contentDescription = "Calculator") },
                    label = { Text("Calculator") },
                    selected = false,
                    onClick = { navController.navigate(Screen.Calculator.route) }
                )
                NavigationBarItem(
                    icon = { Icon(Icons.Default.Group, contentDescription = "Community") },
                    label = { Text("Community") },
                    selected = false,
                    onClick = { navController.navigate(Screen.Community.route) }
                )
                NavigationBarItem(
                    icon = { Icon(Icons.Default.EmojiEvents, contentDescription = "Challenges") },
                    label = { Text("Challenges") },
                    selected = false,
                    onClick = { navController.navigate(Screen.Challenges.route) }
                )
            }
        }
    ) { paddingValues ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            // Welcome banner with carousel
            item {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(220.dp)
                ) {
                    HorizontalPager(
                        state = pagerState,
                        modifier = Modifier.fillMaxSize()
                    ) { page ->
                        Box(
                            modifier = Modifier.fillMaxSize()
                        ) {
                            // Banner image
                            AsyncImage(
                                model = banners[page].imageUrl,
                                contentDescription = "Banner image",
                                contentScale = ContentScale.Crop,
                                modifier = Modifier.fillMaxSize()
                            )
                            
                            // Gradient overlay for better text readability
                            Box(
                                modifier = Modifier
                                    .fillMaxSize()
                                    .background(
                                        brush = Brush.verticalGradient(
                                            colors = listOf(
                                                Color.Transparent,
                                                Color.Black.copy(alpha = 0.7f)
                                            ),
                                            startY = 0f,
                                            endY = 500f
                                        )
                                    )
                            )
                            
                            // Banner content
                            Column(
                                modifier = Modifier
                                    .align(Alignment.BottomStart)
                                    .padding(16.dp)
                            ) {
                                Text(
                                    text = banners[page].title,
                                    style = MaterialTheme.typography.headlineSmall,
                                    color = Color.White,
                                    fontWeight = FontWeight.Bold
                                )
                                
                                Text(
                                    text = banners[page].subtitle,
                                    style = MaterialTheme.typography.bodyLarge,
                                    color = Color.White
                                )
                            }
                        }
                    }
                    
                    // Page indicator
                    Row(
                        Modifier
                            .align(Alignment.BottomCenter)
                            .padding(bottom = 8.dp),
                        horizontalArrangement = Arrangement.Center
                    ) {
                        repeat(banners.size) { iteration ->
                            val color = if (pagerState.currentPage == iteration) 
                                MaterialTheme.colorScheme.primary 
                            else 
                                MaterialTheme.colorScheme.surfaceVariant
                            Box(
                                modifier = Modifier
                                    .padding(2.dp)
                                    .clip(CircleShape)
                                    .background(color)
                                    .size(8.dp)
                            )
                        }
                    }
                }
            }
            
            // Weather and environmental conditions card
            item {
                Card(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 16.dp),
                    colors = CardDefaults.cardColors(
                        containerColor = MaterialTheme.colorScheme.primaryContainer
                    )
                ) {
                    Column(
                        modifier = Modifier.padding(16.dp)
                    ) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            // Location and weather
                            Row(
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Icon(
                                    imageVector = Icons.Default.LocationOn,
                                    contentDescription = null,
                                    tint = MaterialTheme.colorScheme.onPrimaryContainer
                                )
                                
                                Spacer(modifier = Modifier.width(4.dp))
                                
                                Text(
                                    text = "Your Location",
                                    style = MaterialTheme.typography.bodyLarge,
                                    color = MaterialTheme.colorScheme.onPrimaryContainer
                                )
                            }
                            
                            // Temperature and weather condition
                            Row(
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Icon(
                                    imageVector = when (currentWeather) {
                                        "Sunny" -> Icons.Default.Refresh
                                        else -> Icons.Default.Refresh
                                    },
                                    contentDescription = null,
                                    tint = MaterialTheme.colorScheme.onPrimaryContainer
                                )
                                
                                Spacer(modifier = Modifier.width(4.dp))
                                
                                Text(
                                    text = "$currentTemperature°F, $currentWeather",
                                    style = MaterialTheme.typography.bodyLarge,
                                    color = MaterialTheme.colorScheme.onPrimaryContainer
                                )
                            }
                        }
                        
                        Spacer(modifier = Modifier.height(16.dp))
                        
                        // Environmental metrics
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceEvenly
                        ) {
                            // Air Quality
                            EnvMetricItem(
                                title = "Air Quality",
                                value = "$airQualityIndex AQI",
                                status = when {
                                    airQualityIndex < 50 -> "Good"
                                    airQualityIndex < 100 -> "Moderate"
                                    else -> "Poor"
                                },
                                statusColor = when {
                                    airQualityIndex < 50 -> SuccessGreen
                                    airQualityIndex < 100 -> WarningYellow
                                    else -> ErrorRed
                                }
                            )
                            
                            // UV Index
                            EnvMetricItem(
                                title = "UV Index",
                                value = "$uvIndex",
                                status = when {
                                    uvIndex < 3 -> "Low"
                                    uvIndex < 6 -> "Moderate"
                                    else -> "High"
                                },
                                statusColor = when {
                                    uvIndex < 3 -> SuccessGreen
                                    uvIndex < 6 -> WarningYellow
                                    else -> ErrorRed
                                }
                            )
                        }
                    }
                }
            }
            
            // Sustainability score
            item {
                Card(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 16.dp),
                    colors = CardDefaults.cardColors(
                        containerColor = MaterialTheme.colorScheme.surfaceVariant
                    )
                ) {
                    Column(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(16.dp),
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        Text(
                            text = "Your Sustainability Score",
                            style = MaterialTheme.typography.titleMedium
                        )
                        
                        Spacer(modifier = Modifier.height(16.dp))
                        
                        Box(
                            contentAlignment = Alignment.Center
                        ) {
                            AnimatedProgressIndicator(
                                progress = sustainabilityScore,
                                modifier = Modifier.size(150.dp)
                            )
                            
                            Column(
                                horizontalAlignment = Alignment.CenterHorizontally
                            ) {
                                Text(
                                    text = "${(sustainabilityScore * 100).toInt()}",
                                    style = MaterialTheme.typography.headlineMedium,
                                    fontWeight = FontWeight.Bold
                                )
                                
                                Text(
                                    text = "Points",
                                    style = MaterialTheme.typography.bodySmall
                                )
                            }
                        }
                        
                        Spacer(modifier = Modifier.height(16.dp))
                        
                        Text(
                            text = getSustainabilityMessage(sustainabilityScore),
                            style = MaterialTheme.typography.bodyMedium,
                            textAlign = TextAlign.Center
                        )
                    }
                }
            }
            
            // Quick actions section
            item {
                Column(
                    modifier = Modifier.padding(horizontal = 16.dp)
                ) {
                    Text(
                        text = "Quick Actions",
                        style = MaterialTheme.typography.titleLarge,
                        modifier = Modifier.padding(bottom = 8.dp)
                    )
                    
                    Spacer(modifier = Modifier.height(8.dp))
                    
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceEvenly
                    ) {
                        QuickActionButton(
                            icon = Icons.Default.Calculate,
                            label = "Calculate Footprint",
                            onClick = { navController.navigate(Screen.Calculator.route) }
                        )
                        
                        QuickActionButton(
                            icon = Icons.Default.Eco,
                            label = "Green Tips",
                            onClick = { /* Navigate to tips */ }
                        )
                        
                        QuickActionButton(
                            icon = Icons.Default.FormatListBulleted,
                            label = "Daily Tasks",
                            onClick = { /* Navigate to tasks */ }
                        )
                    }
                }
            }
            
            // Daily challenges
            item {
                Card(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 16.dp),
                    colors = CardDefaults.cardColors(
                        containerColor = MaterialTheme.colorScheme.surface
                    )
                ) {
                    Column(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(16.dp)
                    ) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(
                                text = "Today's Challenges",
                                style = MaterialTheme.typography.titleMedium
                            )
                            
                            Text(
                                text = "$completedTasks/$totalTasks Completed",
                                style = MaterialTheme.typography.bodyMedium,
                                color = MaterialTheme.colorScheme.primary
                            )
                        }
                        
                        Spacer(modifier = Modifier.height(8.dp))
                        
                        Divider()
                        
                        Spacer(modifier = Modifier.height(8.dp))
                        
                        // Challenge items
                        ChallengeItem(
                            title = "Avoid single-use plastics today",
                            isComplete = true,
                            onToggle = { /* Update in database */ }
                        )
                        
                        Spacer(modifier = Modifier.height(8.dp))
                        
                        ChallengeItem(
                            title = "Use public transportation or carpool",
                            isComplete = true,
                            onToggle = { /* Update in database */ }
                        )
                        
                        Spacer(modifier = Modifier.height(8.dp))
                        
                        ChallengeItem(
                            title = "Reduce water usage by 20%",
                            isComplete = false,
                            onToggle = { 
                                completedTasks += if (it) 1 else -1
                            }
                        )
                        
                        Spacer(modifier = Modifier.height(8.dp))
                        
                        ChallengeItem(
                            title = "Plant a seedling or care for a plant",
                            isComplete = false,
                            onToggle = {
                                completedTasks += if (it) 1 else -1
                            }
                        )
                        
                        Spacer(modifier = Modifier.height(8.dp))
                        
                        ChallengeItem(
                            title = "Educate someone about sustainability",
                            isComplete = false,
                            onToggle = {
                                completedTasks += if (it) 1 else -1
                            }
                        )
                        
                        Spacer(modifier = Modifier.height(16.dp))
                        
                        AnimatedButton(
                            text = "View All Challenges",
                            onClick = { navController.navigate(Screen.Challenges.route) },
                            modifier = Modifier.align(Alignment.End)
                        )
                    }
                }
            }
            
            // Badges carousel
            item {
                Column(
                    modifier = Modifier.padding(horizontal = 16.dp)
                ) {
                    Text(
                        text = "Your Badges",
                        style = MaterialTheme.typography.titleLarge,
                        modifier = Modifier.padding(bottom = 8.dp)
                    )
                    
                    LazyRow(
                        state = rememberLazyListState(),
                        horizontalArrangement = Arrangement.spacedBy(16.dp),
                        modifier = Modifier.padding(vertical = 8.dp)
                    ) {
                        items(badges) { badge ->
                            EnhancedBadgeItem(badge = badge)
                        }
                    }
                }
            }
            
            // Daily tip card
            item {
                var currentTipIndex by remember { mutableIntStateOf(0) }
                var isChangingTip by remember { mutableStateOf(false) }
                
                // Auto change tip
                LaunchedEffect(Unit) {
                    while (true) {
                        delay(15000) // Change tip every 15 seconds
                        isChangingTip = true
                        delay(500) // Animation duration
                        currentTipIndex = (currentTipIndex + 1) % tips.size
                        isChangingTip = false
                    }
                }
                
                Card(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 16.dp),
                    colors = CardDefaults.cardColors(
                        containerColor = MaterialTheme.colorScheme.tertiaryContainer
                    )
                ) {
                    Column(
                        modifier = Modifier
                            .padding(16.dp)
                            .fillMaxWidth()
                    ) {
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Icon(
                                imageVector = Icons.Default.Eco,
                                contentDescription = null,
                                tint = MaterialTheme.colorScheme.onTertiaryContainer
                            )
                            Spacer(modifier = Modifier.width(8.dp))
                            Text(
                                text = "Daily Sustainability Tip",
                                style = MaterialTheme.typography.titleMedium,
                                color = MaterialTheme.colorScheme.onTertiaryContainer
                            )
                            
                            Spacer(modifier = Modifier.weight(1f))
                            
                            // Add icons to navigate tips manually
                            IconButton(
                                onClick = { 
                                    currentTipIndex = (currentTipIndex - 1 + tips.size) % tips.size
                                }
                            ) {
                                Icon(
                                    imageVector = Icons.AutoMirrored.Filled.ArrowBack,
                                    contentDescription = "Previous tip",
                                    tint = MaterialTheme.colorScheme.onTertiaryContainer
                                )
                            }
                            
                            IconButton(
                                onClick = { 
                                    currentTipIndex = (currentTipIndex + 1) % tips.size
                                }
                            ) {
                                Icon(
                                    imageVector = Icons.AutoMirrored.Filled.ArrowForward,
                                    contentDescription = "Next tip",
                                    tint = MaterialTheme.colorScheme.onTertiaryContainer
                                )
                            }
                        }
                        
                        Spacer(modifier = Modifier.height(16.dp))
                        
                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .height(80.dp),
                            contentAlignment = Alignment.Center
                        ) {
                            androidx.compose.animation.AnimatedVisibility(
                                visible = !isChangingTip,
                                enter = AnimationUtils.fadeIn,
                                exit = AnimationUtils.fadeOut
                            ) {
                                Text(
                                    text = tips[currentTipIndex],
                                    style = MaterialTheme.typography.bodyLarge,
                                    textAlign = TextAlign.Center,
                                    color = MaterialTheme.colorScheme.onTertiaryContainer
                                )
                            }
                        }
                        
                        Spacer(modifier = Modifier.height(8.dp))
                        
                        // Tip counter
                        Text(
                            text = "Tip ${currentTipIndex + 1} of ${tips.size}",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onTertiaryContainer.copy(alpha = 0.7f),
                            modifier = Modifier.align(Alignment.End)
                        )
                    }
                }
            }
            
            // News feed
            item {
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 16.dp)
                ) {
                    Text(
                        text = "Environmental News",
                        style = MaterialTheme.typography.titleLarge,
                        modifier = Modifier.padding(bottom = 8.dp)
                    )
                    
                    newsFeedItems.forEach { newsItem ->
                        NewsFeedItemCard(newsItem = newsItem)
                        Spacer(modifier = Modifier.height(12.dp))
                    }
                    
                    AnimatedButton(
                        text = "View All News",
                        onClick = { /* Navigate to news feed */ },
                        modifier = Modifier.align(Alignment.End)
                    )
                }
            }
            
            // Community events
            item {
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 16.dp)
                ) {
                    Text(
                        text = "Upcoming Community Events",
                        style = MaterialTheme.typography.titleLarge,
                        modifier = Modifier.padding(bottom = 8.dp)
                    )
                    
                    LazyRow(
                        state = rememberLazyListState(),
                        horizontalArrangement = Arrangement.spacedBy(16.dp),
                        modifier = Modifier.padding(vertical = 8.dp)
                    ) {
                        items(events) { event ->
                            EventCard(
                                event = event,
                                onClick = { navController.navigate(Screen.Community.route) }
                            )
                        }
                    }
                    
                    Spacer(modifier = Modifier.height(8.dp))
                    
                    AnimatedButton(
                        text = "View All Events",
                        onClick = { navController.navigate(Screen.Community.route) },
                        modifier = Modifier.align(Alignment.End)
                    )
                }
            }
            
            // Add some spacing at the bottom for better UX
            item {
                Spacer(modifier = Modifier.height(16.dp))
            }
        }
    }
}

// Additional components

@Composable
fun EnvMetricItem(
    title: String,
    value: String,
    status: String,
    statusColor: Color
) {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = title,
            style = MaterialTheme.typography.bodyMedium
        )
        
        Text(
            text = value,
            style = MaterialTheme.typography.bodyLarge,
            fontWeight = FontWeight.Bold
        )
        
        Text(
            text = status,
            style = MaterialTheme.typography.bodySmall,
            color = statusColor,
            fontWeight = FontWeight.Bold
        )
    }
}

@Composable
fun EnhancedBadgeItem(badge: EnhancedBadge) {
    Card(
        modifier = Modifier
            .width(140.dp)
            .clickable { /* Show badge details */ }
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            modifier = Modifier.padding(16.dp)
        ) {
            Surface(
                shape = CircleShape,
                color = MaterialTheme.colorScheme.primary,
                modifier = Modifier.size(64.dp)
            ) {
                Box(contentAlignment = Alignment.Center) {
                    Icon(
                        imageVector = badge.icon,
                        contentDescription = badge.name,
                        modifier = Modifier.size(32.dp),
                        tint = MaterialTheme.colorScheme.onPrimary
                    )
                }
            }
            
            Spacer(modifier = Modifier.height(8.dp))
            
            Text(
                text = badge.name,
                style = MaterialTheme.typography.bodyMedium,
                textAlign = TextAlign.Center,
                fontWeight = FontWeight.Bold,
                maxLines = 1,
                overflow = TextOverflow.Ellipsis
            )
            
            Spacer(modifier = Modifier.height(4.dp))
            
            Text(
                text = badge.description,
                style = MaterialTheme.typography.bodySmall,
                textAlign = TextAlign.Center,
                maxLines = 2,
                overflow = TextOverflow.Ellipsis
            )
            
            Spacer(modifier = Modifier.height(8.dp))
            
            Text(
                text = "${badge.points} pts",
                style = MaterialTheme.typography.labelMedium,
                color = MaterialTheme.colorScheme.secondary,
                fontWeight = FontWeight.Bold
            )
        }
    }
}

@Composable
fun NewsFeedItemCard(newsItem: NewsFeedItem) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable { /* Open news article */ }
    ) {
        Row(
            modifier = Modifier.padding(16.dp)
        ) {
            // News image
            AsyncImage(
                model = newsItem.imageUrl,
                contentDescription = newsItem.title,
                contentScale = ContentScale.Crop,
                modifier = Modifier
                    .size(80.dp)
                    .clip(RoundedCornerShape(8.dp))
            )
            
            Spacer(modifier = Modifier.width(16.dp))
            
            // News content
            Column(
                modifier = Modifier.weight(1f)
            ) {
                Text(
                    text = newsItem.title,
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold,
                    maxLines = 2,
                    overflow = TextOverflow.Ellipsis
                )
                
                Spacer(modifier = Modifier.height(4.dp))
                
                Text(
                    text = newsItem.summary,
                    style = MaterialTheme.typography.bodySmall,
                    maxLines = 2,
                    overflow = TextOverflow.Ellipsis
                )
                
                Spacer(modifier = Modifier.height(8.dp))
                
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Text(
                        text = newsItem.source,
                        style = MaterialTheme.typography.labelMedium,
                        color = MaterialTheme.colorScheme.primary
                    )
                    
                    Text(
                        text = newsItem.timeAgo,
                        style = MaterialTheme.typography.labelMedium,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }
        }
    }
}

// Helper function for sustainability message
@Composable
fun getSustainabilityMessage(score: Float): String {
    return when {
        score < 0.3f -> "Getting started! Keep making sustainable choices."
        score < 0.5f -> "Good progress! You're on your way to a greener lifestyle."
        score < 0.7f -> "Great job! Your sustainable habits are making a difference."
        score < 0.9f -> "Excellent! You're a sustainability champion."
        else -> "Outstanding! You're leading the way in environmental stewardship."
    }
}

// Data classes
data class BannerContent(
    val imageUrl: String,
    val title: String,
    val subtitle: String
)

data class EnhancedBadge(
    val name: String,
    val icon: androidx.compose.ui.graphics.vector.ImageVector,
    val description: String,
    val points: Int
)

data class NewsFeedItem(
    val title: String,
    val summary: String,
    val source: String,
    val timeAgo: String,
    val imageUrl: String
)

data class Event(
    val title: String, 
    val date: String, 
    val description: String, 
    val imageUrl: String
)

@Composable
private fun QuickActionButton(
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    label: String,
    onClick: () -> Unit
) {
    var isPressed by remember { mutableStateOf(false) }
    
    val scale by animateFloatAsState(
        targetValue = if (isPressed) 0.9f else 1f,
        animationSpec = tween(
            durationMillis = 200,
            easing = LinearEasing
        ),
        label = "Scale animation"
    )
    
    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        modifier = Modifier
            .width(100.dp)
            .scale(scale)
            .clickable {
                isPressed = true
                onClick()
            }
    ) {
        Surface(
            shape = CircleShape,
            color = MaterialTheme.colorScheme.primaryContainer,
            modifier = Modifier.size(56.dp)
        ) {
            Box(contentAlignment = Alignment.Center) {
                Icon(
                    imageVector = icon,
                    contentDescription = label,
                    modifier = Modifier
                        .size(28.dp),
                    tint = MaterialTheme.colorScheme.onPrimaryContainer
                )
            }
        }
        
        Spacer(modifier = Modifier.height(8.dp))
        
        Text(
            text = label,
            style = MaterialTheme.typography.bodyMedium,
            textAlign = TextAlign.Center
        )
    }
    
    // Reset pressed state
    LaunchedEffect(isPressed) {
        if (isPressed) {
            delay(200)
            isPressed = false
        }
    }
}

@Composable
private fun ChallengeItem(
    title: String,
    isComplete: Boolean,
    onToggle: (Boolean) -> Unit
) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Text(
            text = title,
            style = MaterialTheme.typography.bodyLarge
        )
        
        AnimatedToggleButton(
            isChecked = isComplete,
            onCheckedChange = onToggle
        )
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun EventCard(event: Event, onClick: () -> Unit) {
    var isFavorite by remember { mutableStateOf(false) }
    
    Card(
        modifier = Modifier
            .width(260.dp),
        onClick = onClick,
        elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
    ) {
        Box {
            Column {
                // Event image
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(140.dp)
                ) {
                    AsyncImage(
                        model = event.imageUrl,
                        contentDescription = event.title,
                        contentScale = ContentScale.Crop,
                        modifier = Modifier.fillMaxSize()
                    )
                    
                    // Date badge
                    Surface(
                        color = MaterialTheme.colorScheme.primary,
                        shape = RoundedCornerShape(bottomEnd = 12.dp),
                        modifier = Modifier.align(Alignment.TopStart)
                    ) {
                        Text(
                            text = event.date,
                            style = MaterialTheme.typography.bodyMedium,
                            color = MaterialTheme.colorScheme.onPrimary,
                            modifier = Modifier.padding(horizontal = 12.dp, vertical = 6.dp)
                        )
                    }
                    
                    // Favorite button
                    IconButton(
                        onClick = { isFavorite = !isFavorite },
                        modifier = Modifier
                            .align(Alignment.TopEnd)
                            .padding(4.dp)
                    ) {
                        Icon(
                            imageVector = if (isFavorite) Icons.Default.Star else Icons.Default.StarBorder,
                            contentDescription = "Favorite",
                            tint = if (isFavorite) Color(0xFFFFD700) else Color.White
                        )
                    }
                }
                
                // Event details
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(12.dp)
                ) {
                    Text(
                        text = event.title,
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold,
                        maxLines = 1,
                        overflow = TextOverflow.Ellipsis
                    )
                    
                    Spacer(modifier = Modifier.height(4.dp))
                    
                    Text(
                        text = event.description,
                        style = MaterialTheme.typography.bodySmall,
                        maxLines = 2,
                        overflow = TextOverflow.Ellipsis
                    )
                }
            }
        }
    }
} 