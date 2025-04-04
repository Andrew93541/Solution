// Smart Energy Management Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
    initializeCharts();
    initializeDeviceControls();
    startRealTimeUpdates();
});

// Sample data for charts
const dailyUsageData = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
    datasets: [{
        label: 'Energy Usage (kWh)',
        data: [0.5, 0.3, 1.2, 2.5, 3.8, 2.1],
        borderColor: '#3498db',
        backgroundColor: 'rgba(52, 152, 219, 0.1)',
        tension: 0.4,
        fill: true
    }]
};

const monthlyComparisonData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
        label: 'This Year',
        data: [280, 245, 320, 290, 310, 245],
        borderColor: '#3498db',
        backgroundColor: 'rgba(52, 152, 219, 0.1)',
        tension: 0.4,
        fill: true
    }, {
        label: 'Last Year',
        data: [310, 280, 350, 320, 340, 280],
        borderColor: '#95a5a6',
        backgroundColor: 'rgba(149, 165, 166, 0.1)',
        tension: 0.4,
        fill: true
    }]
};

const energyDistributionData = {
    labels: ['HVAC', 'Lighting', 'Appliances', 'Electronics', 'Other'],
    datasets: [{
        data: [45, 20, 15, 10, 10],
        backgroundColor: [
            '#3498db',
            '#2ecc71',
            '#e74c3c',
            '#f1c40f',
            '#95a5a6'
        ]
    }]
};

function initializeCharts() {
    // Daily Usage Chart
    const dailyUsageCtx = document.getElementById('dailyUsageChart').getContext('2d');
    new Chart(dailyUsageCtx, {
        type: 'line',
        data: dailyUsageData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.parsed.y.toFixed(1)} kWh`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'kWh'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)',
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });

    // Monthly Comparison Chart
    const monthlyComparisonCtx = document.getElementById('monthlyComparisonChart').getContext('2d');
    new Chart(monthlyComparisonCtx, {
        type: 'line',
        data: monthlyComparisonData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.parsed.y} kWh`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'kWh'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)',
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });

    // Energy Distribution Chart
    const energyDistributionCtx = document.getElementById('energyDistributionChart').getContext('2d');
    new Chart(energyDistributionCtx, {
        type: 'doughnut',
        data: energyDistributionData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${context.label}: ${value}% (${percentage}%)`;
                        }
                    }
                }
            },
            cutout: '70%'
        }
    });
}

function initializeDeviceControls() {
    const deviceCards = document.querySelectorAll('.device-card');
    
    deviceCards.forEach(card => {
        const powerBtn = card.querySelector('.control-btn:first-child');
        const scheduleBtn = card.querySelector('.control-btn:last-child');
        const statusSpan = card.querySelector('.status');
        const deviceName = card.querySelector('h3').textContent;

        // Power button click handler
        powerBtn.addEventListener('click', () => {
            const isOn = statusSpan.classList.contains('on');
            statusSpan.classList.toggle('on');
            statusSpan.classList.toggle('off');
            statusSpan.textContent = isOn ? 'Off' : 'On';
            
            // Update power value
            const powerValue = card.querySelector('.device-info p:last-child');
            powerValue.textContent = `Power: ${isOn ? '0 kW' : '0.2 kW'}`;
            
            // Update button icon
            powerBtn.querySelector('i').className = isOn ? 'fas fa-power-off' : 'fas fa-power-off';
            
            showNotification(`${deviceName} turned ${isOn ? 'off' : 'on'}`, 'success');
        });

        // Schedule button click handler
        scheduleBtn.addEventListener('click', () => {
            showScheduleModal(deviceName, statusSpan.classList.contains('on'));
        });
    });
}

function showScheduleModal(deviceName, isCurrentlyOn) {
    // Create modal HTML
    const modal = document.createElement('div');
    modal.className = 'schedule-modal';
    modal.innerHTML = `
        <div class="schedule-modal-content">
            <div class="schedule-modal-header">
                <h3>Schedule ${deviceName}</h3>
                <button class="close-modal" title="Close schedule modal">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="schedule-modal-body">
                <div class="schedule-options">
                    <div class="schedule-option">
                        <h4>Turn ${isCurrentlyOn ? 'Off' : 'On'}</h4>
                        <div class="time-inputs">
                            <div class="time-input">
                                <label>Time</label>
                                <input type="time" class="schedule-time">
                            </div>
                            <div class="time-input">
                                <label>Days</label>
                                <select class="schedule-days" multiple>
                                    <option value="0">Sunday</option>
                                    <option value="1">Monday</option>
                                    <option value="2">Tuesday</option>
                                    <option value="3">Wednesday</option>
                                    <option value="4">Thursday</option>
                                    <option value="5">Friday</option>
                                    <option value="6">Saturday</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="schedule-list">
                    <h4>Current Schedules</h4>
                    <div class="scheduled-items">
                        <!-- Sample schedule items -->
                        <div class="scheduled-item">
                            <span>Turn On at 7:00 AM</span>
                            <span>Mon, Wed, Fri</span>
                            <button class="delete-schedule" title="Delete schedule">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                        <div class="scheduled-item">
                            <span>Turn Off at 10:00 PM</span>
                            <span>Every day</span>
                            <button class="delete-schedule" title="Delete schedule">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="schedule-modal-footer">
                <button class="cancel-btn">Cancel</button>
                <button class="save-btn">Save Schedule</button>
            </div>
        </div>
    `;

    // Add modal to body
    document.body.appendChild(modal);

    // Add event listeners
    const closeBtn = modal.querySelector('.close-modal');
    const cancelBtn = modal.querySelector('.cancel-btn');
    const saveBtn = modal.querySelector('.save-btn');
    const deleteBtns = modal.querySelectorAll('.delete-schedule');

    closeBtn.addEventListener('click', () => modal.remove());
    cancelBtn.addEventListener('click', () => modal.remove());

    saveBtn.addEventListener('click', () => {
        const timeInput = modal.querySelector('.schedule-time');
        const daysSelect = modal.querySelector('.schedule-days');
        const selectedDays = Array.from(daysSelect.selectedOptions).map(option => option.value);
        
        if (!timeInput.value || selectedDays.length === 0) {
            showNotification('Please select both time and days', 'error');
            return;
        }

        // Add new schedule to the list
        const scheduledItems = modal.querySelector('.scheduled-items');
        const newSchedule = document.createElement('div');
        newSchedule.className = 'scheduled-item';
        newSchedule.innerHTML = `
            <span>Turn ${isCurrentlyOn ? 'Off' : 'On'} at ${timeInput.value}</span>
            <span>${selectedDays.length === 7 ? 'Every day' : selectedDays.map(day => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][day]).join(', ')}</span>
            <button class="delete-schedule" title="Delete schedule">
                <i class="fas fa-trash"></i>
            </button>
        `;
        scheduledItems.appendChild(newSchedule);

        // Add delete functionality to new schedule
        newSchedule.querySelector('.delete-schedule').addEventListener('click', () => {
            newSchedule.remove();
        });

        showNotification('Schedule saved successfully!', 'success');
        timeInput.value = '';
        daysSelect.selectedIndex = -1;
    });

    deleteBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.scheduled-item').remove();
        });
    });
}

function startRealTimeUpdates() {
    // Simulate real-time updates every 5 seconds
    setInterval(() => {
        updateRealTimeData();
    }, 5000);
}

function updateRealTimeData() {
    // Update current usage with random fluctuation
    const currentUsageCard = document.querySelector('.current-usage .value');
    const currentUsage = parseFloat(currentUsageCard.textContent);
    const fluctuation = (Math.random() - 0.5) * 0.5; // Random value between -0.25 and 0.25
    const newUsage = Math.max(0, currentUsage + fluctuation);
    currentUsageCard.textContent = newUsage.toFixed(1);

    // Update daily usage
    const dailyUsageCard = document.querySelector('.daily-usage .value');
    const dailyUsage = parseFloat(dailyUsageCard.textContent);
    const dailyIncrement = Math.random() * 0.2; // Random value between 0 and 0.2
    dailyUsageCard.textContent = (dailyUsage + dailyIncrement).toFixed(1);

    // Update trends
    updateUsageTrends();
}

function updateUsageTrends() {
    const trends = document.querySelectorAll('.usage-trend');
    trends.forEach(trend => {
        const isPositive = Math.random() > 0.5;
        const percentage = (Math.random() * 10).toFixed(1);
        
        trend.className = `usage-trend ${isPositive ? 'positive' : 'negative'}`;
        trend.innerHTML = `
            <i class="fas fa-arrow-${isPositive ? 'down' : 'up'}"></i>
            <span>${percentage}% vs ${trend.textContent.split('vs')[1]}</span>
        `;
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
} 