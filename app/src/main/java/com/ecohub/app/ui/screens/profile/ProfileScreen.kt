package com.ecohub.app.ui.screens.profile

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.Image
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
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.Edit
import androidx.compose.material.icons.filled.Eco
import androidx.compose.material.icons.filled.EmojiEvents
import androidx.compose.material.icons.filled.Settings
import androidx.compose.material.icons.filled.Star
import androidx.compose.material.icons.outlined.EmojiEvents
import androidx.compose.material.icons.outlined.Settings
import androidx.compose.material.icons.outlined.Star
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Divider
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedCard
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Tab
import androidx.compose.material3.TabRow
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.ecohub.app.R
import com.ecohub.app.ui.animation.AnimationUtils
import com.ecohub.app.ui.components.AnimatedButton
import com.ecohub.app.ui.components.AnimatedCard
import com.ecohub.app.ui.components.AnimatedProgressIndicator
import kotlinx.coroutines.delay

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ProfileScreen(navController: NavController) {
    // User profile data
    val userName = "Alex Green"
    val userBio = "Passionate environmentalist and sustainability advocate"
    val joinDate = "Member since January 2023"
    val carbonFootprint = 1.2f // Tons of CO2 per year
    val averageFootprint = 4.0f // National average
    val sustainabilityScore = 78 // Out of 100
    
    // Badge data
    val earnedBadges = 8
    val totalBadges = 15
    
    // Contribution statistics
    val treesPlanted = 5
    val eventsAttended = 7
    val challengesCompleted = 23
    
    // Animation states
    var showProfileSection by remember { mutableStateOf(false) }
    var showStatsSection by remember { mutableStateOf(false) }
    var showBadgesSection by remember { mutableStateOf(false) }
    
    // Trigger animations in sequence
    LaunchedEffect(Unit) {
        showProfileSection = true
        delay(300)
        showStatsSection = true
        delay(300)
        showBadgesSection = true
    }
    
    // Selected tab state
    var selectedTabIndex by remember { mutableIntStateOf(0) }
    val tabs = listOf("Stats", "Badges", "Activity")
    
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Profile") },
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
                    IconButton(onClick = { /* Settings */ }) {
                        Icon(
                            Icons.Default.Settings,
                            contentDescription = "Settings",
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
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            // Profile header
            item {
                AnimatedVisibility(
                    visible = showProfileSection,
                    enter = AnimationUtils.fadeIn + AnimationUtils.scaleIn
                ) {
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(200.dp)
                    ) {
                        // Background gradient
                        Box(
                            modifier = Modifier
                                .fillMaxSize()
                                .background(
                                    brush = Brush.verticalGradient(
                                        colors = listOf(
                                            MaterialTheme.colorScheme.primaryContainer,
                                            MaterialTheme.colorScheme.surface
                                        )
                                    )
                                )
                        )
                        
                        Column(
                            modifier = Modifier
                                .fillMaxSize()
                                .padding(16.dp),
                            horizontalAlignment = Alignment.CenterHorizontally,
                            verticalArrangement = Arrangement.Center
                        ) {
                            // Profile picture
                            Surface(
                                shape = CircleShape,
                                border = BorderStroke(
                                    width = 3.dp,
                                    color = MaterialTheme.colorScheme.primary
                                ),
                                modifier = Modifier.size(100.dp)
                            ) {
                                Box(
                                    modifier = Modifier
                                        .fillMaxSize()
                                        .background(MaterialTheme.colorScheme.primaryContainer),
                                    contentAlignment = Alignment.Center
                                ) {
                                    Icon(
                                        imageVector = Icons.Default.Eco,
                                        contentDescription = "Profile",
                                        modifier = Modifier.size(60.dp),
                                        tint = MaterialTheme.colorScheme.primary
                                    )
                                }
                            }
                            
                            Spacer(modifier = Modifier.height(8.dp))
                            
                            // User name
                            Text(
                                text = userName,
                                style = MaterialTheme.typography.headlineSmall,
                                fontWeight = FontWeight.Bold
                            )
                            
                            // User bio
                            Text(
                                text = userBio,
                                style = MaterialTheme.typography.bodyMedium,
                                textAlign = TextAlign.Center,
                                modifier = Modifier.padding(horizontal = 32.dp, vertical = 4.dp)
                            )
                            
                            // Join date
                            Text(
                                text = joinDate,
                                style = MaterialTheme.typography.bodySmall,
                                color = MaterialTheme.colorScheme.onSurfaceVariant
                            )
                        }
                        
                        // Edit profile button
                        IconButton(
                            onClick = { /* Edit profile */ },
                            modifier = Modifier
                                .align(Alignment.TopEnd)
                                .padding(8.dp)
                        ) {
                            Icon(
                                imageVector = Icons.Default.Edit,
                                contentDescription = "Edit Profile"
                            )
                        }
                    }
                }
            }
            
            // Sustainability Statistics
            item {
                AnimatedVisibility(
                    visible = showStatsSection,
                    enter = AnimationUtils.fadeIn + AnimationUtils.expandVertically
                ) {
                    AnimatedCard(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(16.dp)
                    ) {
                        Column(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(16.dp)
                        ) {
                            Text(
                                text = "Sustainability Stats",
                                style = MaterialTheme.typography.titleLarge,
                                fontWeight = FontWeight.Bold
                            )
                            
                            Spacer(modifier = Modifier.height(16.dp))
                            
                            // Sustainability score
                            val scoreProgress = sustainabilityScore / 100f
                            Column(
                                modifier = Modifier.fillMaxWidth()
                            ) {
                                Row(
                                    modifier = Modifier.fillMaxWidth(),
                                    horizontalArrangement = Arrangement.SpaceBetween
                                ) {
                                    Text(
                                        text = "Sustainability Score",
                                        style = MaterialTheme.typography.bodyLarge
                                    )
                                    Text(
                                        text = "$sustainabilityScore/100",
                                        style = MaterialTheme.typography.bodyLarge,
                                        fontWeight = FontWeight.Bold,
                                        color = MaterialTheme.colorScheme.primary
                                    )
                                }
                                
                                Spacer(modifier = Modifier.height(4.dp))
                                
                                AnimatedProgressIndicator(
                                    progress = scoreProgress,
                                    modifier = Modifier
                                        .fillMaxWidth()
                                        .height(12.dp)
                                )
                            }
                            
                            Spacer(modifier = Modifier.height(16.dp))
                            
                            // Carbon footprint
                            Column(
                                modifier = Modifier.fillMaxWidth()
                            ) {
                                Row(
                                    modifier = Modifier.fillMaxWidth(),
                                    horizontalArrangement = Arrangement.SpaceBetween
                                ) {
                                    Text(
                                        text = "Carbon Footprint",
                                        style = MaterialTheme.typography.bodyLarge
                                    )
                                    Text(
                                        text = "$carbonFootprint tons CO2/year",
                                        style = MaterialTheme.typography.bodyLarge,
                                        fontWeight = FontWeight.Bold
                                    )
                                }
                                
                                Spacer(modifier = Modifier.height(4.dp))
                                
                                // Progress indicator with comparison to average
                                Box(
                                    modifier = Modifier
                                        .fillMaxWidth()
                                        .height(12.dp)
                                        .clip(RoundedCornerShape(6.dp))
                                        .background(MaterialTheme.colorScheme.surfaceVariant)
                                ) {
                                    // User's footprint progress
                                    Box(
                                        modifier = Modifier
                                            .fillMaxWidth(carbonFootprint / averageFootprint)
                                            .height(12.dp)
                                            .clip(RoundedCornerShape(6.dp))
                                            .background(MaterialTheme.colorScheme.primary)
                                    )
                                    
                                    // Average marker
                                    Box(
                                        modifier = Modifier
                                            .fillMaxWidth(1f)
                                            .height(12.dp)
                                            .padding(horizontal = 1.dp)
                                    ) {
                                        Box(
                                            modifier = Modifier
                                                .size(2.dp, 12.dp)
                                                .align(Alignment.CenterEnd)
                                                .background(MaterialTheme.colorScheme.error)
                                        )
                                    }
                                }
                                
                                Spacer(modifier = Modifier.height(4.dp))
                                
                                Row(
                                    modifier = Modifier.fillMaxWidth(),
                                    horizontalArrangement = Arrangement.End
                                ) {
                                    Text(
                                        text = "National Average: $averageFootprint tons",
                                        style = MaterialTheme.typography.bodySmall,
                                        color = MaterialTheme.colorScheme.onSurfaceVariant
                                    )
                                }
                            }
                            
                            Spacer(modifier = Modifier.height(16.dp))
                            
                            // Quick stat boxes
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween
                            ) {
                                StatBox(
                                    value = treesPlanted,
                                    label = "Trees Planted",
                                    icon = Icons.Default.Eco,
                                    modifier = Modifier.weight(1f)
                                )
                                
                                Spacer(modifier = Modifier.width(8.dp))
                                
                                StatBox(
                                    value = eventsAttended,
                                    label = "Events Attended",
                                    icon = Icons.Default.EmojiEvents,
                                    modifier = Modifier.weight(1f)
                                )
                                
                                Spacer(modifier = Modifier.width(8.dp))
                                
                                StatBox(
                                    value = challengesCompleted,
                                    label = "Challenges Completed",
                                    icon = Icons.Default.CheckCircle,
                                    modifier = Modifier.weight(1f)
                                )
                            }
                        }
                    }
                }
            }
            
            // Tab section
            item {
                AnimatedVisibility(
                    visible = showBadgesSection,
                    enter = AnimationUtils.fadeIn + AnimationUtils.expandVertically
                ) {
                    Column(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(horizontal = 16.dp)
                    ) {
                        TabRow(
                            selectedTabIndex = selectedTabIndex,
                            containerColor = MaterialTheme.colorScheme.surface
                        ) {
                            tabs.forEachIndexed { index, title ->
                                Tab(
                                    text = { Text(title) },
                                    selected = selectedTabIndex == index,
                                    onClick = { selectedTabIndex = index },
                                    icon = {
                                        when (index) {
                                            0 -> Icon(
                                                imageVector = if (selectedTabIndex == 0) 
                                                    Icons.Default.Star 
                                                else 
                                                    Icons.Outlined.Star,
                                                contentDescription = null
                                            )
                                            1 -> Icon(
                                                imageVector = if (selectedTabIndex == 1) 
                                                    Icons.Default.EmojiEvents 
                                                else 
                                                    Icons.Outlined.EmojiEvents,
                                                contentDescription = null
                                            )
                                            2 -> Icon(
                                                imageVector = if (selectedTabIndex == 2) 
                                                    Icons.Default.Settings 
                                                else 
                                                    Icons.Outlined.Settings,
                                                contentDescription = null
                                            )
                                        }
                                    }
                                )
                            }
                        }
                        
                        when (selectedTabIndex) {
                            0 -> StatsTabContent()
                            1 -> BadgesTabContent(earnedBadges, totalBadges)
                            2 -> ActivityTabContent()
                        }
                    }
                }
            }
        }
    }
}

@Composable
private fun StatBox(
    value: Int,
    label: String,
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    modifier: Modifier = Modifier
) {
    OutlinedCard(
        modifier = modifier,
        colors = CardDefaults.outlinedCardColors(
            containerColor = MaterialTheme.colorScheme.surface
        )
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(8.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Icon(
                imageVector = icon,
                contentDescription = null,
                tint = MaterialTheme.colorScheme.primary,
                modifier = Modifier.size(24.dp)
            )
            
            Spacer(modifier = Modifier.height(4.dp))
            
            Text(
                text = value.toString(),
                style = MaterialTheme.typography.titleLarge,
                fontWeight = FontWeight.Bold
            )
            
            Text(
                text = label,
                style = MaterialTheme.typography.bodySmall,
                textAlign = TextAlign.Center
            )
        }
    }
}

@Composable
private fun StatsTabContent() {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp)
    ) {
        // Weekly activity
        Text(
            text = "Weekly Activity",
            style = MaterialTheme.typography.titleMedium,
            modifier = Modifier.padding(bottom = 8.dp)
        )
        
        val weeklyData = listOf(0.2f, 0.5f, 0.7f, 0.4f, 0.9f, 0.3f, 0.6f)
        val days = listOf("Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun")
        
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .height(100.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.Bottom
        ) {
            weeklyData.forEachIndexed { index, value ->
                val height by animateFloatAsState(
                    targetValue = value * 100,
                    animationSpec = tween(durationMillis = 1000, delayMillis = index * 100),
                    label = "Bar height"
                )
                
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.Bottom
                ) {
                    Box(
                        modifier = Modifier
                            .width(30.dp)
                            .height(height.dp)
                            .clip(RoundedCornerShape(topStart = 4.dp, topEnd = 4.dp))
                            .background(MaterialTheme.colorScheme.primary)
                    )
                    
                    Text(
                        text = days[index],
                        style = MaterialTheme.typography.bodySmall
                    )
                }
            }
        }
        
        Spacer(modifier = Modifier.height(24.dp))
        
        // Monthly savings
        Text(
            text = "Monthly Impact",
            style = MaterialTheme.typography.titleMedium,
            modifier = Modifier.padding(bottom = 8.dp)
        )
        
        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(
                containerColor = MaterialTheme.colorScheme.surfaceVariant
            )
        ) {
            Column(
                modifier = Modifier.padding(16.dp)
            ) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    ImpactStat("120", "kg CO2 Saved")
                    ImpactStat("35", "L Water Saved")
                    ImpactStat("18", "kWh Reduced")
                }
            }
        }
    }
}

@Composable
private fun ImpactStat(value: String, label: String) {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = value,
            style = MaterialTheme.typography.titleLarge,
            fontWeight = FontWeight.Bold,
            color = MaterialTheme.colorScheme.primary
        )
        
        Text(
            text = label,
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
            textAlign = TextAlign.Center
        )
    }
}

@Composable
private fun BadgesTabContent(earned: Int, total: Int) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp)
    ) {
        // Badges summary
        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(
                containerColor = MaterialTheme.colorScheme.primaryContainer
            )
        ) {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                Text(
                    text = "$earned/$total Badges Earned",
                    style = MaterialTheme.typography.titleMedium,
                    color = MaterialTheme.colorScheme.onPrimaryContainer
                )
                
                Spacer(modifier = Modifier.height(8.dp))
                
                LinearProgressIndicator(
                    progress = earned.toFloat() / total,
                    modifier = Modifier.fillMaxWidth(),
                    color = MaterialTheme.colorScheme.primary,
                    trackColor = MaterialTheme.colorScheme.onPrimaryContainer.copy(alpha = 0.2f)
                )
                
                Spacer(modifier = Modifier.height(8.dp))
                
                AnimatedButton(
                    text = "View All Badges",
                    onClick = { /* View all badges */ }
                )
            }
        }
        
        Spacer(modifier = Modifier.height(16.dp))
        
        // Recent badges
        Text(
            text = "Recently Earned Badges",
            style = MaterialTheme.typography.titleMedium,
            modifier = Modifier.padding(bottom = 8.dp)
        )
        
        val recentBadges = listOf(
            "Tree Planter" to "Planted your first tree",
            "Waste Reducer" to "Reduced household waste by 20%",
            "Energy Saver" to "Used renewable energy for a week"
        )
        
        recentBadges.forEach { (title, description) ->
            BadgeItem(
                title = title,
                description = description,
                modifier = Modifier.padding(vertical = 4.dp)
            )
        }
    }
}

@Composable
private fun BadgeItem(
    title: String,
    description: String,
    modifier: Modifier = Modifier
) {
    Card(
        modifier = modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.surface
        )
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(12.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Surface(
                shape = CircleShape,
                color = MaterialTheme.colorScheme.primary.copy(alpha = 0.2f),
                modifier = Modifier.size(48.dp)
            ) {
                Box(
                    contentAlignment = Alignment.Center
                ) {
                    Icon(
                        imageVector = Icons.Default.EmojiEvents,
                        contentDescription = null,
                        tint = MaterialTheme.colorScheme.primary,
                        modifier = Modifier.size(28.dp)
                    )
                }
            }
            
            Spacer(modifier = Modifier.width(12.dp))
            
            Column {
                Text(
                    text = title,
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold
                )
                
                Text(
                    text = description,
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        }
    }
}

@Composable
private fun ActivityTabContent() {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp)
    ) {
        // Recent activity
        Text(
            text = "Recent Activity",
            style = MaterialTheme.typography.titleMedium,
            modifier = Modifier.padding(bottom = 8.dp)
        )
        
        val activities = listOf(
            Triple("Completed Challenge", "Meat-free Monday", "2 days ago"),
            Triple("Attended Event", "Beach Cleanup", "1 week ago"),
            Triple("Earned Badge", "Energy Saver", "2 weeks ago"),
            Triple("Joined Community", "Urban Gardeners", "1 month ago"),
            Triple("Updated Carbon Footprint", "Reduced by 0.2 tons", "1 month ago")
        )
        
        activities.forEachIndexed { index, (type, name, time) ->
            ActivityItem(
                type = type,
                name = name,
                time = time
            )
            
            if (index < activities.size - 1) {
                Divider(
                    modifier = Modifier.padding(vertical = 8.dp),
                    color = MaterialTheme.colorScheme.outlineVariant
                )
            }
        }
    }
}

@Composable
private fun ActivityItem(
    type: String,
    name: String,
    time: String
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clickable { },
        verticalAlignment = Alignment.CenterVertically
    ) {
        Column(
            modifier = Modifier.weight(1f)
        ) {
            Text(
                text = type,
                style = MaterialTheme.typography.bodyLarge,
                fontWeight = FontWeight.Bold
            )
            
            Text(
                text = name,
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.primary
            )
            
            Text(
                text = time,
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }
    }
} 