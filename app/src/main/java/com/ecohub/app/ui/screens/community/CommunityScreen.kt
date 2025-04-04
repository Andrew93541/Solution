package com.ecohub.app.ui.screens.community

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.core.tween
import androidx.compose.animation.fadeIn
import androidx.compose.animation.slideInVertically
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
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Comment
import androidx.compose.material.icons.filled.DateRange
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material.icons.filled.FavoriteBorder
import androidx.compose.material.icons.filled.FilterList
import androidx.compose.material.icons.filled.LocationOn
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.Search
import androidx.compose.material.icons.filled.Share
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Divider
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.ExtendedFloatingActionButton
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
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
import com.ecohub.app.ui.components.PulsingDot
import kotlinx.coroutines.delay

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CommunityScreen(navController: NavController) {
    // Animation states
    var showContent by remember { mutableStateOf(false) }
    
    // Trigger animation on composition
    LaunchedEffect(Unit) {
        showContent = true
    }
    
    // Tab state
    var selectedTabIndex by remember { mutableIntStateOf(0) }
    val tabs = listOf("Feed", "Events", "Groups")
    
    // Search state
    var searchQuery by remember { mutableStateOf("") }
    var isSearchActive by remember { mutableStateOf(false) }
    
    // Community data
    val events = remember {
        listOf(
            CommunityEvent(
                id = 1,
                title = "Urban Gardening Workshop",
                date = "April 15, 2023",
                time = "10:00 AM - 2:00 PM",
                location = "Community Center",
                description = "Learn how to start your own urban garden with expert tips and techniques. We'll cover container gardening, vertical gardens, and composting.",
                imageUrl = "https://images.pexels.com/photos/8092930/pexels-photo-8092930.jpeg?auto=compress&cs=tinysrgb&w=600",
                attendees = 42
            ),
            CommunityEvent(
                id = 2,
                title = "Beach Cleanup",
                date = "April 22, 2023",
                time = "9:00 AM - 12:00 PM",
                location = "Ocean Beach",
                description = "Join us for Earth Day to help clean up our beautiful beaches and protect marine life from plastic pollution.",
                imageUrl = "https://images.pexels.com/photos/3737000/pexels-photo-3737000.jpeg?auto=compress&cs=tinysrgb&w=600",
                attendees = 87
            ),
            CommunityEvent(
                id = 3,
                title = "Renewable Energy Fair",
                date = "May 5, 2023",
                time = "11:00 AM - 4:00 PM",
                location = "Downtown Plaza",
                description = "Explore the latest in renewable energy solutions for your home. Solar, wind, and more with demonstrations and expert advice.",
                imageUrl = "https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg?auto=compress&cs=tinysrgb&w=600",
                attendees = 56
            )
        )
    }
    
    val posts = remember {
        listOf(
            CommunityPost(
                id = 1,
                authorName = "Taylor Green",
                authorImageUrl = "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=600",
                content = "Just finished installing my solar panels! Excited to start generating clean energy for my home. 🌞",
                imageUrl = "https://images.pexels.com/photos/3525298/pexels-photo-3525298.jpeg?auto=compress&cs=tinysrgb&w=600",
                likes = 28,
                comments = 7,
                timeAgo = "2 hours ago"
            ),
            CommunityPost(
                id = 2,
                authorName = "Jordan Rivera",
                authorImageUrl = "https://images.pexels.com/photos/1499327/pexels-photo-1499327.jpeg?auto=compress&cs=tinysrgb&w=600",
                content = "Today's farmers market haul! Supporting local farmers reduces carbon emissions from long-distance transportation. #SustainableLiving #LocalFood",
                imageUrl = "https://images.pexels.com/photos/264537/pexels-photo-264537.jpeg?auto=compress&cs=tinysrgb&w=600",
                likes = 45,
                comments = 12,
                timeAgo = "5 hours ago"
            ),
            CommunityPost(
                id = 3,
                authorName = "Alex Morgan",
                authorImageUrl = "https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=600",
                content = "Our community garden is thriving! We've grown over 100 lbs of vegetables this season, all donated to local food banks. 🌱 #CommunityGarden",
                imageUrl = "https://images.pexels.com/photos/2286776/pexels-photo-2286776.jpeg?auto=compress&cs=tinysrgb&w=600",
                likes = 83,
                comments = 15,
                timeAgo = "1 day ago"
            )
        )
    }
    
    val groups = remember {
        listOf(
            CommunityGroup(
                id = 1,
                name = "Urban Gardeners",
                description = "A group for urban gardening enthusiasts to share tips, tricks, and experiences.",
                memberCount = 543,
                imageUrl = "https://images.pexels.com/photos/5705090/pexels-photo-5705090.jpeg?auto=compress&cs=tinysrgb&w=600"
            ),
            CommunityGroup(
                id = 2,
                name = "Clean Energy Advocates",
                description = "Discussing and promoting clean energy solutions for homes and communities.",
                memberCount = 782,
                imageUrl = "https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg?auto=compress&cs=tinysrgb&w=600"
            ),
            CommunityGroup(
                id = 3,
                name = "Zero Waste Living",
                description = "Sharing ideas for reducing waste and living a more sustainable lifestyle.",
                memberCount = 1245,
                imageUrl = "https://images.pexels.com/photos/5029859/pexels-photo-5029859.jpeg?auto=compress&cs=tinysrgb&w=600"
            )
        )
    }
    
    Scaffold(
        topBar = {
            TopAppBar(
                title = { 
                    if (!isSearchActive) {
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.spacedBy(8.dp)
                        ) {
                            Text("Community")
                            PulsingDot(color = MaterialTheme.colorScheme.primaryContainer, size = 8f)
                        }
                    } else {
                        OutlinedTextField(
                            value = searchQuery,
                            onValueChange = { searchQuery = it },
                            placeholder = { Text("Search community...") },
                            modifier = Modifier.fillMaxWidth(),
                            singleLine = true,
                            leadingIcon = {
                                Icon(
                                    Icons.Default.Search,
                                    contentDescription = "Search"
                                )
                            }
                        )
                    }
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
                    if (!isSearchActive) {
                        IconButton(onClick = { isSearchActive = true }) {
                            Icon(
                                Icons.Default.Search,
                                contentDescription = "Search",
                                tint = MaterialTheme.colorScheme.onPrimary
                            )
                        }
                        IconButton(onClick = { /* Filter content */ }) {
                            Icon(
                                Icons.Default.FilterList,
                                contentDescription = "Filter",
                                tint = MaterialTheme.colorScheme.onPrimary
                            )
                        }
                    } else {
                        IconButton(onClick = { 
                            isSearchActive = false
                            searchQuery = ""
                        }) {
                            Icon(
                                Icons.AutoMirrored.Filled.ArrowBack,
                                contentDescription = "Close Search",
                                tint = MaterialTheme.colorScheme.onPrimary
                            )
                        }
                    }
                }
            )
        },
        floatingActionButton = {
            when (selectedTabIndex) {
                0 -> {
                    ExtendedFloatingActionButton(
                        text = { Text("New Post") },
                        icon = { Icon(Icons.Default.Add, contentDescription = "New Post") },
                        onClick = { /* Create new post */ }
                    )
                }
                1 -> {
                    ExtendedFloatingActionButton(
                        text = { Text("Create Event") },
                        icon = { Icon(Icons.Default.DateRange, contentDescription = "Create Event") },
                        onClick = { /* Create new event */ }
                    )
                }
                2 -> {
                    ExtendedFloatingActionButton(
                        text = { Text("Create Group") },
                        icon = { Icon(Icons.Default.Person, contentDescription = "Create Group") },
                        onClick = { /* Create new group */ }
                    )
                }
            }
        }
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
        ) {
            // Tabs
            TabRow(
                selectedTabIndex = selectedTabIndex
            ) {
                tabs.forEachIndexed { index, title ->
                    Tab(
                        text = { Text(title) },
                        selected = selectedTabIndex == index,
                        onClick = { selectedTabIndex = index }
                    )
                }
            }
            
            // Content based on selected tab
            AnimatedVisibility(
                visible = showContent,
                enter = AnimationUtils.fadeIn + AnimationUtils.expandVertically
            ) {
                when (selectedTabIndex) {
                    0 -> FeedTab(posts)
                    1 -> EventsTab(events)
                    2 -> GroupsTab(groups)
                }
            }
        }
    }
}

@Composable
private fun FeedTab(posts: List<CommunityPost>) {
    LazyColumn(
        modifier = Modifier.fillMaxSize(),
        verticalArrangement = Arrangement.spacedBy(16.dp),
        contentPadding = androidx.compose.foundation.layout.PaddingValues(16.dp)
    ) {
        itemsIndexed(posts) { index, post ->
            AnimatedVisibility(
                visible = true,
                enter = fadeIn(tween(durationMillis = 300, delayMillis = index * 100)) +
                        slideInVertically(
                            initialOffsetY = { it * 2 },
                            animationSpec = tween(durationMillis = 400, delayMillis = index * 100)
                        )
            ) {
                PostCard(post = post)
            }
        }
    }
}

@Composable
private fun PostCard(post: CommunityPost) {
    var isLiked by remember { mutableStateOf(false) }
    var likeCount by remember { mutableIntStateOf(post.likes) }
    
    AnimatedCard(
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(
            modifier = Modifier.fillMaxWidth()
        ) {
            // Author info row
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                // Author image
                AsyncImage(
                    model = post.authorImageUrl,
                    contentDescription = "Author profile picture",
                    contentScale = ContentScale.Crop,
                    modifier = Modifier
                        .size(40.dp)
                        .clip(CircleShape)
                )
                
                Spacer(modifier = Modifier.width(12.dp))
                
                // Author name and time
                Column {
                    Text(
                        text = post.authorName,
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold
                    )
                    
                    Text(
                        text = post.timeAgo,
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }
            
            // Post content
            Text(
                text = post.content,
                style = MaterialTheme.typography.bodyLarge,
                modifier = Modifier.padding(horizontal = 16.dp)
            )
            
            Spacer(modifier = Modifier.height(12.dp))
            
            // Post image if available
            if (post.imageUrl.isNotEmpty()) {
                AsyncImage(
                    model = post.imageUrl,
                    contentDescription = "Post image",
                    contentScale = ContentScale.Crop,
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(200.dp)
                )
            }
            
            // Like, comment, share buttons
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                horizontalArrangement = Arrangement.SpaceEvenly
            ) {
                // Like button
                Row(
                    modifier = Modifier
                        .clickable {
                            isLiked = !isLiked
                            likeCount = if (isLiked) post.likes + 1 else post.likes
                        },
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(
                        imageVector = if (isLiked) Icons.Default.Favorite else Icons.Default.FavoriteBorder,
                        contentDescription = "Like",
                        tint = if (isLiked) Color.Red else MaterialTheme.colorScheme.onSurface
                    )
                    
                    Spacer(modifier = Modifier.width(4.dp))
                    
                    Text(
                        text = likeCount.toString(),
                        style = MaterialTheme.typography.bodyMedium
                    )
                }
                
                // Comment button
                Row(
                    modifier = Modifier.clickable { /* Open comments */ },
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(
                        imageVector = Icons.Default.Comment,
                        contentDescription = "Comment"
                    )
                    
                    Spacer(modifier = Modifier.width(4.dp))
                    
                    Text(
                        text = post.comments.toString(),
                        style = MaterialTheme.typography.bodyMedium
                    )
                }
                
                // Share button
                Row(
                    modifier = Modifier.clickable { /* Share post */ },
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(
                        imageVector = Icons.Default.Share,
                        contentDescription = "Share"
                    )
                    
                    Spacer(modifier = Modifier.width(4.dp))
                    
                    Text(
                        text = "Share",
                        style = MaterialTheme.typography.bodyMedium
                    )
                }
            }
        }
    }
}

@Composable
private fun EventsTab(events: List<CommunityEvent>) {
    LazyColumn(
        modifier = Modifier.fillMaxSize(),
        verticalArrangement = Arrangement.spacedBy(16.dp),
        contentPadding = androidx.compose.foundation.layout.PaddingValues(16.dp)
    ) {
        items(events) { event ->
            EventCard(event = event)
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun EventCard(event: CommunityEvent) {
    var isAttending by remember { mutableStateOf(false) }
    
    Card(
        modifier = Modifier.fillMaxWidth(),
        onClick = { /* View event details */ },
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Column {
            // Event image
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(180.dp)
            ) {
                AsyncImage(
                    model = event.imageUrl,
                    contentDescription = event.title,
                    contentScale = ContentScale.Crop,
                    modifier = Modifier.fillMaxSize()
                )
                
                // Gradient overlay
                Box(
                    modifier = Modifier
                        .fillMaxSize()
                        .background(
                            Brush.verticalGradient(
                                colors = listOf(
                                    Color.Transparent,
                                    Color.Black.copy(alpha = 0.6f)
                                )
                            )
                        )
                )
                
                // Event title and date overlay
                Column(
                    modifier = Modifier
                        .align(Alignment.BottomStart)
                        .padding(16.dp)
                ) {
                    Text(
                        text = event.title,
                        style = MaterialTheme.typography.titleLarge,
                        color = Color.White,
                        fontWeight = FontWeight.Bold
                    )
                    
                    Spacer(modifier = Modifier.height(4.dp))
                    
                    Row(
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Icon(
                            imageVector = Icons.Default.DateRange,
                            contentDescription = null,
                            tint = Color.White,
                            modifier = Modifier.size(16.dp)
                        )
                        
                        Spacer(modifier = Modifier.width(4.dp))
                        
                        Text(
                            text = event.date,
                            style = MaterialTheme.typography.bodyMedium,
                            color = Color.White
                        )
                    }
                }
                
                // Attendee count
                Surface(
                    color = MaterialTheme.colorScheme.primary,
                    shape = RoundedCornerShape(bottomStart = 12.dp),
                    modifier = Modifier.align(Alignment.TopEnd)
                ) {
                    Text(
                        text = "${event.attendees} Attending",
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onPrimary,
                        modifier = Modifier.padding(horizontal = 12.dp, vertical = 6.dp)
                    )
                }
            }
            
            // Event details
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp)
            ) {
                // Time and location
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(
                        imageVector = Icons.Default.LocationOn,
                        contentDescription = null,
                        tint = MaterialTheme.colorScheme.primary
                    )
                    
                    Spacer(modifier = Modifier.width(8.dp))
                    
                    Text(
                        text = event.location,
                        style = MaterialTheme.typography.bodyMedium
                    )
                    
                    Spacer(modifier = Modifier.width(16.dp))
                    
                    Text(
                        text = event.time,
                        style = MaterialTheme.typography.bodyMedium
                    )
                }
                
                Spacer(modifier = Modifier.height(8.dp))
                
                // Description
                Text(
                    text = event.description,
                    style = MaterialTheme.typography.bodyMedium,
                    maxLines = 2,
                    overflow = TextOverflow.Ellipsis
                )
                
                Spacer(modifier = Modifier.height(16.dp))
                
                // Buttons
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    AnimatedButton(
                        text = if (isAttending) "Attending" else "Attend",
                        onClick = { isAttending = !isAttending },
                        modifier = Modifier.weight(1f)
                    )
                    
                    Spacer(modifier = Modifier.width(8.dp))
                    
                    AnimatedButton(
                        text = "Share",
                        onClick = { /* Share event */ },
                        modifier = Modifier.weight(1f)
                    )
                }
            }
        }
    }
}

@Composable
private fun GroupsTab(groups: List<CommunityGroup>) {
    LazyColumn(
        modifier = Modifier.fillMaxSize(),
        verticalArrangement = Arrangement.spacedBy(16.dp),
        contentPadding = androidx.compose.foundation.layout.PaddingValues(16.dp)
    ) {
        items(groups) { group ->
            GroupCard(group = group)
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun GroupCard(group: CommunityGroup) {
    var isMember by remember { mutableStateOf(false) }
    
    Card(
        modifier = Modifier.fillMaxWidth(),
        onClick = { /* View group details */ }
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .height(120.dp)
        ) {
            // Group image
            AsyncImage(
                model = group.imageUrl,
                contentDescription = group.name,
                contentScale = ContentScale.Crop,
                modifier = Modifier
                    .width(120.dp)
                    .fillMaxHeight()
            )
            
            // Group details
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(16.dp),
                verticalArrangement = Arrangement.SpaceBetween
            ) {
                Column {
                    Text(
                        text = group.name,
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold
                    )
                    
                    Spacer(modifier = Modifier.height(4.dp))
                    
                    Text(
                        text = group.description,
                        style = MaterialTheme.typography.bodyMedium,
                        maxLines = 2,
                        overflow = TextOverflow.Ellipsis
                    )
                }
                
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = "${group.memberCount} members",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                    
                    AnimatedButton(
                        text = if (isMember) "Joined" else "Join",
                        onClick = { isMember = !isMember }
                    )
                }
            }
        }
    }
}

// Data classes
data class CommunityPost(
    val id: Int,
    val authorName: String,
    val authorImageUrl: String,
    val content: String,
    val imageUrl: String = "",
    val likes: Int,
    val comments: Int,
    val timeAgo: String
)

data class CommunityEvent(
    val id: Int,
    val title: String,
    val date: String,
    val time: String,
    val location: String,
    val description: String,
    val imageUrl: String,
    val attendees: Int
)

data class CommunityGroup(
    val id: Int,
    val name: String,
    val description: String,
    val memberCount: Int,
    val imageUrl: String
) 