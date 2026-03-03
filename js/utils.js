// ===================================
// Bite & Burn - Utility Functions
// ===================================

// Storage keys
const STORAGE_KEYS = {
  USER: 'biteburn_user',
  USERS: 'biteburn_users',
  ROUTINES: 'biteburn_routines',
  WORKOUTS: 'biteburn_workouts',
  MEALS: 'biteburn_meals',
  ACHIEVEMENTS: 'biteburn_achievements',
  INGREDIENTS: 'biteburn_ingredients'
};

// Get time-based greeting
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  if (hour < 21) return 'Good Evening';
  return 'Good Night';
}

// Format date
function formatDate(date, format = 'short') {
  const d = new Date(date);
  const options = {
    short: { month: 'short', day: 'numeric' },
    long: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
    time: { hour: '2-digit', minute: '2-digit' }
  };
  return d.toLocaleDateString('en-US', options[format] || options.short);
}

// Generate unique ID
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Local storage helpers
function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error('Storage error:', e);
    return false;
  }
}

function getFromStorage(key, defaultValue = null) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (e) {
    console.error('Storage error:', e);
    return defaultValue;
  }
}


// API Base URL
const API_BASE_URL = 'http://localhost:5000/api';

// Local AI Analysis Data
const ANALYSIS_RESPONSES = {
  headache: `
        <div class="chat-response-card">
            <h4 style="color: #a78bfa; margin-bottom: 8px;">🧠 Headache Analysis</h4>
            <p><strong>Possible Causes:</strong> Dehydration, Eye Strain, Tension, or Lack of Sleep.</p>
            <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px; margin: 12px 0;">
                <strong>💊 Immediate Relief:</strong>
                <ul style="margin: 8px 0; padding-left: 20px;">
                    <li>Drink 500ml of water immediately.</li>
                    <li>Rest in a dark, quiet room for 20 mins.</li>
                    <li>Apply a cold compress to forehead.</li>
                </ul>
            </div>
            <p style="font-size: 0.9rem; color: #f87171;">⚠️ <strong>See a doctor if:</strong> Pain is sudden & severe ('thunderclap'), or accompanied by vision loss.</p>
        </div>`,
  fever: `
        <div class="chat-response-card">
            <h4 style="color: #ef4444; margin-bottom: 8px;">🌡️ Fever Management</h4>
            <p><strong>Meaning:</strong> Your body is fighting an infection.</p>
            <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px; margin: 12px 0;">
                <strong>💊 Recommendations:</strong>
                <ul style="margin: 8px 0; padding-left: 20px;">
                    <li><strong>Hydrate:</strong> Drink water or ORS to prevent dehydration.</li>
                    <li><strong>Rest:</strong> Avoid physical exertion.</li>
                    <li><strong>Cooling:</strong> Wear light clothes, keep room airy.</li>
                    <li><strong>Meds:</strong> Paracetamol can help lower temp (consult pharmacist).</li>
                </ul>
            </div>
            <p style="font-size: 0.9rem; color: #f87171;">⚠️ <strong>Emergency:</strong> If temperature > 103°F (39.4°C) or lasts > 3 days.</p>
        </div>`,
  stomach: `
        <div class="chat-response-card">
            <h4 style="color: #f59e0b; margin-bottom: 8px;">🤢 Digestive Health</h4>
            <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px; margin: 12px 0;">
                <strong>💊 Home Remedies:</strong>
                <ul style="margin: 8px 0; padding-left: 20px;">
                    <li><strong>Ginger Tea:</strong> Excellent for nausea and settling stomach.</li>
                    <li><strong>BRAT Diet:</strong> Bananas, Rice, Applesauce, Toast.</li>
                    <li><strong>Hydration:</strong> Sip water slowly; avoid gulping.</li>
                    <li><strong>Avoid:</strong> Dairy, spicy, and oily foods.</li>
                </ul>
            </div>
            <p style="font-size: 0.9rem; color: #f87171;">⚠️ <strong>Alert:</strong> Severe pain on the lower right side could be Appendicitis.</p>
        </div>`,
  cold: `
        <div class="chat-response-card">
            <h4 style="color: #3b82f6; margin-bottom: 8px;">🤧 Cold & Flu Care</h4>
            <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px; margin: 12px 0;">
                <strong>💊 Rapid Recovery Tips:</strong>
                <ul style="margin: 8px 0; padding-left: 20px;">
                    <li><strong>Salt Gargle:</strong> Soothes sore throat (3x daily).</li>
                    <li><strong>Steam:</strong> Inhale steam to clear nasal congestion.</li>
                    <li><strong>Honey & Lemon:</strong> Natural cough suppressant.</li>
                    <li><strong>Zinc/Vit C:</strong> May shorten duration.</li>
                </ul>
            </div>
            <p style="font-size: 0.9rem; color: #f87171;">⚠️ <strong>Monitor:</strong> Difficulty breathing requires immediate attention.</p>
        </div>`
};

// Local Analysis Function
function localAnalyze(message) {
  const msg = message.toLowerCase();
  let responseContent = "I'm listening. Please describe your symptoms (e.g., headache, fever, stomach pain) for a local analysis.";

  if (msg.includes('headache') || msg.includes('head pain')) {
    responseContent = ANALYSIS_RESPONSES.headache;
  } else if (msg.includes('fever') || msg.includes('temperature')) {
    responseContent = ANALYSIS_RESPONSES.fever;
  } else if (msg.includes('stomach') || msg.includes('belly') || msg.includes('nausea')) {
    responseContent = ANALYSIS_RESPONSES.stomach;
  } else if (msg.includes('cold') || msg.includes('cough') || msg.includes('flu')) {
    responseContent = ANALYSIS_RESPONSES.cold;
  }

  return responseContent;
}

// User management
function getCurrentUser() {
  return getFromStorage(STORAGE_KEYS.USER);
}

function isLoggedIn() {
  return !!getCurrentUser();
}

function logout() {
  // Clear ALL application data to prevent leakage between users
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith('biteburn_')) {
      localStorage.removeItem(key);
    }
  });

  const isInPages = window.location.pathname.includes('/pages/');
  window.location.href = isInPages ? 'signin.html' : 'pages/signin.html';
}

// Multi-user database functions
async function registerUser(userData) {
  // Clear any existing data from previous sessions before starting signup
  Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));

  try {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Signup failed');

    // Save user to local storage for persistent session
    saveToStorage(STORAGE_KEYS.USER, data.user);

    // Unlock first achievement
    unlockAchievement('first_signup', 'Journey Begins', 'Completed your health profile', '🌟');

    return true;
  } catch (error) {
    console.error('Signup error:', error);
    // Offline fallback: Save user locally
    if (error.name === 'TypeError' || error.message.includes('fetch')) {
      console.log('Server down, entering offline mode...');
      const localUser = { ...userData, id: 'local_' + Date.now(), isOffline: true };
      saveToStorage(STORAGE_KEYS.USER, localUser);

      // Save to local users list for login fallback
      const localUsers = getFromStorage(STORAGE_KEYS.USERS, []);
      localUsers.push(localUser);
      saveToStorage(STORAGE_KEYS.USERS, localUsers);

      unlockAchievement('first_signup', 'Journey Begins', 'Completed your health profile', '🌟');
      return true;
    }
    throw error;
  }
}

async function loginUser(email, password) {
  // Clear previous data
  Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));

  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Login failed');

    // Merge profile data back into user object if it exists
    let fullUser = result.user;
    if (result.data && result.data.profile) {
      fullUser = { ...fullUser, ...result.data.profile };
    }

    // Save user info
    saveToStorage(STORAGE_KEYS.USER, fullUser);

    // Sync downloaded data to local storage
    if (result.data) {
      Object.keys(result.data).forEach(key => {
        if (key === 'profile') return;
        localStorage.setItem(key, JSON.stringify(result.data[key]));
      });
    }

    return fullUser;
  } catch (error) {
    console.error('Login error:', error);
    // Offline fallback: check local users
    if (error.name === 'TypeError' || error.message.includes('fetch')) {
      const localUsers = getFromStorage(STORAGE_KEYS.USERS, []);
      const user = localUsers.find(u => u.email === email && u.password === password);
      if (user) {
        saveToStorage(STORAGE_KEYS.USER, user);
        return user;
      }
      throw new Error('Cannot connect to server, and no local matching account found.');
    }
    throw error;
  }
}

// Wrapper for saving data to both local storage and server
function saveData(key, value) {
  // 1. Save locally first (optimistic UI)
  const success = saveToStorage(key, value);

  // 2. Sync to server if logged in
  const user = getCurrentUser();
  if (user && user.id) {
    fetch(`${API_BASE_URL}/data/sync`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user.id,
        key: key,
        value: value
      })
    }).catch(err => console.error('Sync error:', err));
  }

  return success;
}

function updateCurrentUser(updatedData) {
  const user = getCurrentUser();
  if (!user) return;

  const newUser = { ...user, ...updatedData };
  saveToStorage(STORAGE_KEYS.USER, newUser);

  // Also sync user profile updates
  if (user.id) {
    // Sync 'profile' key with the new user object
    saveData('profile', newUser);
  }
}

// Calculate BMI
function calculateBMI(weight, heightCm) {
  const heightM = heightCm / 100;
  return (weight / (heightM * heightM)).toFixed(1);
}

// Get BMI Category
function getBMICategory(bmi) {
  if (bmi < 18.5) return { category: 'Underweight', color: '#3b82f6' };
  if (bmi < 25) return { category: 'Normal', color: '#22c55e' };
  if (bmi < 30) return { category: 'Overweight', color: '#f59e0b' };
  return { category: 'Obese', color: '#ef4444' };
}

// Calculate daily calorie needs (Mifflin-St Jeor)
function calculateCalories(weight, heightCm, age, gender, activityLevel) {
  let bmr;
  if (gender === 'male') {
    bmr = 10 * weight + 6.25 * heightCm - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * heightCm - 5 * age - 161;
  }

  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9
  };

  return Math.round(bmr * (activityMultipliers[activityLevel] || 1.55));
}

// Debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Show notification toast
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}</span>
    <span>${message}</span>
  `;
  toast.style.cssText = `
    position: fixed;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);
    background: ${type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#3b82f6'};
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    z-index: 10000;
    animation: slideUp 0.3s ease;
  `;

  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'fadeIn 0.3s ease reverse';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Validate email
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Capitalize first letter
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Get day type (weekday/weekend)
function getDayType() {
  const day = new Date().getDay();
  return (day === 0 || day === 6) ? 'weekend' : 'weekday';
}

// Format time from minutes
function formatMinutes(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

// Parse time string to minutes
function parseTimeToMinutes(timeStr) {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
}

// Check if current time is within range
function isTimeInRange(startTime, endTime) {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const start = parseTimeToMinutes(startTime);
  const end = parseTimeToMinutes(endTime);
  return currentMinutes >= start && currentMinutes <= end;
}

// Animate number counter
function animateCounter(element, target, duration = 1000) {
  const start = parseInt(element.textContent) || 0;
  const increment = (target - start) / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if ((increment > 0 && current >= target) || (increment < 0 && current <= target)) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.round(current);
    }
  }, 16);
}

// Create SVG progress circle
function createProgressCircle(percent, size = 200, strokeWidth = 12) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percent / 100) * circumference;

  return `
    <svg width="${size}" height="${size}" class="progress-circle-svg">
      <defs>
        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#22c55e"/>
          <stop offset="100%" style="stop-color:#10b981"/>
        </linearGradient>
      </defs>
      <circle
        class="bg"
        cx="${size / 2}"
        cy="${size / 2}"
        r="${radius}"
      />
      <circle
        class="progress"
        cx="${size / 2}"
        cy="${size / 2}"
        r="${radius}"
        stroke-dasharray="${circumference}"
        stroke-dashoffset="${offset}"
        />
    </svg>
  `;
}

// Country list with food cultures
const COUNTRIES = [
  { code: 'LK', name: 'Sri Lanka', cuisine: 'Rice and Curry', currencySymbol: 'LKR', costMultiplier: 300 },
  { code: 'IN', name: 'India', cuisine: 'Biryani', currencySymbol: '₹', costMultiplier: 80 },
  { code: 'JP', name: 'Japan', cuisine: 'Sushi', currencySymbol: '¥', costMultiplier: 400 },
  { code: 'CN', name: 'China', cuisine: 'Peking Duck', currencySymbol: '¥', costMultiplier: 25 },
  { code: 'IT', name: 'Italy', cuisine: 'Pizza', currencySymbol: '€', costMultiplier: 4 },
  { code: 'FR', name: 'France', cuisine: 'Croissant', currencySymbol: '€', costMultiplier: 5 },
  { code: 'GB', name: 'United Kingdom', cuisine: 'Fish and Chips', currencySymbol: '£', costMultiplier: 3 },
  { code: 'US', name: 'United States', cuisine: 'Hamburger', currencySymbol: '$', costMultiplier: 4 },
  { code: 'MX', name: 'Mexico', cuisine: 'Tacos', currencySymbol: 'MX$', costMultiplier: 70 },
  { code: 'TH', name: 'Thailand', cuisine: 'Pad Thai', currencySymbol: '฿', costMultiplier: 100 },
  { code: 'KR', name: 'South Korea', cuisine: 'Kimchi', currencySymbol: '₩', costMultiplier: 4000 },
  { code: 'ID', name: 'Indonesia', cuisine: 'Nasi Goreng', currencySymbol: 'Rp', costMultiplier: 50000 },
  { code: 'MY', name: 'Malaysia', cuisine: 'Nasi Lemak', currencySymbol: 'RM', costMultiplier: 15 },
  { code: 'TR', name: 'Turkey', cuisine: 'Kebab', currencySymbol: '₺', costMultiplier: 100 },
  { code: 'GR', name: 'Greece', cuisine: 'Moussaka', currencySymbol: '€', costMultiplier: 4 },
  { code: 'ES', name: 'Spain', cuisine: 'Paella', currencySymbol: '€', costMultiplier: 4 },
  { code: 'DE', name: 'Germany', cuisine: 'Bratwurst', currencySymbol: '€', costMultiplier: 5 },
  { code: 'RU', name: 'Russia', cuisine: 'Borscht', currencySymbol: '₽', costMultiplier: 300 },
  { code: 'BR', name: 'Brazil', cuisine: 'Feijoada', currencySymbol: 'R$', costMultiplier: 20 },
  { code: 'AR', name: 'Argentina', cuisine: 'Asado', currencySymbol: '$', costMultiplier: 800 },
  { code: 'EG', name: 'Egypt', cuisine: 'Koshari', currencySymbol: 'E£', costMultiplier: 100 },
  { code: 'ET', name: 'Ethiopia', cuisine: 'Injera with Doro Wat', currencySymbol: 'Br', costMultiplier: 150 },
  { code: 'MA', name: 'Morocco', cuisine: 'Couscous', currencySymbol: 'MAD', costMultiplier: 40 },
  { code: 'AU', name: 'Australia', cuisine: 'Meat Pie', currencySymbol: 'A$', costMultiplier: 6 },
  { code: 'NZ', name: 'New Zealand', cuisine: 'Hangi', currencySymbol: 'NZ$', costMultiplier: 6 }
];

// --- Daily Tracking Helpers ---

// Get today's date key (YYYY-MM-DD)
function getTodayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

// Eaten food tracking
function getTodayEaten() {
  return getFromStorage(`biteburn_eaten_${getTodayKey()}`, { calories: 0, protein: 0, carbs: 0 });
}

function saveTodayEaten(eaten) {
  saveToStorage(`biteburn_eaten_${getTodayKey()}`, eaten);
}

// Water intake tracking
function getTodayWater() {
  return getFromStorage(`biteburn_water_${getTodayKey()}`, 0);
}

function saveTodayWater(glasses) {
  saveToStorage(`biteburn_water_${getTodayKey()}`, glasses);
}

// Activity tracking (based on completed workouts today)
function getTodayActivity() {
  const todayKey = getTodayKey();
  const workoutData = getFromStorage(`biteburn_workout_${todayKey}`, null);

  if (workoutData && workoutData.exercises && workoutData.exercises.length > 0) {
    const completed = workoutData.exercises.filter(e => e.completed).length;
    const total = workoutData.exercises.length;
    return Math.round((completed / total) * 100);
  }

  return 0;
}

// Health tips by condition
const HEALTH_TIPS = {
  fever: 'Drink plenty of water, take enough rest, and keep your body cool. Use paracetamol only if needed and avoid dehydration.',
  cold: 'Drink warm fluids, inhale steam, and rest well. Wash hands often to prevent spreading.',
  cough: 'Drink warm water with honey, avoid cold drinks, and keep your throat warm.',
  soreThroat: 'Gargle with warm salt water, drink warm liquids, and avoid spicy or oily foods.',
  headache: 'Rest in a quiet place, drink enough water, and avoid too much screen time.',
  stomachAche: 'Eat light foods, drink warm water, and avoid oily or heavy meals.',
  diarrhea: 'Drink plenty of fluids, use oral rehydration solution (ORS), and avoid dairy and spicy foods.',
  bodyPain: 'Take rest, drink warm fluids, and do gentle stretching after recovery.',
  flu: 'Rest well, drink lots of warm fluids, and keep your body warm.',
  indigestion: 'Eat small meals, avoid overeating, and do light walking after meals.'
};

// --- Achievement System ---

// Unlock an achievement
function unlockAchievement(id, title, description, icon) {
  const achievements = getFromStorage(STORAGE_KEYS.ACHIEVEMENTS) || [];

  // Check if already unlocked
  if (achievements.some(a => a.id === id)) return;

  // Add to unlocked list
  achievements.push({
    id,
    title,
    description,
    icon,
    date: new Date().toISOString()
  });

  saveToStorage(STORAGE_KEYS.ACHIEVEMENTS, achievements);
  saveData(STORAGE_KEYS.ACHIEVEMENTS, achievements); // Sync if logged in

  // Show customized toast
  showAchievementToast(title, icon);
}

// Show specific achievement toast
function showAchievementToast(title, icon) {
  const toast = document.createElement('div');
  toast.className = 'achievement-toast';
  toast.innerHTML = `
    <div class="achievement-icon-toast">${icon}</div>
    <div>
      <div class="achievement-title-toast">Achievement Unlocked!</div>
      <div class="achievement-desc-toast">${title}</div>
    </div>
  `;

  // Add styles dynamically if not present
  if (!document.getElementById('achievement-toast-style')) {
    const style = document.createElement('style');
    style.id = 'achievement-toast-style';
    style.innerHTML = `
      .achievement-toast {
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: rgba(20, 20, 20, 0.95);
        border: 1px solid #eab308;
        padding: 16px 24px;
        border-radius: 16px;
        display: flex;
        align-items: center;
        gap: 16px;
        box-shadow: 0 10px 30px rgba(234, 179, 8, 0.2);
        z-index: 10001;
        transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        color: white;
        min-width: 300px;
      }
      .achievement-toast.show {
        transform: translateX(-50%) translateY(0);
      }
      .achievement-icon-toast {
        font-size: 2rem;
        animation: bounce 1s infinite;
      }
      .achievement-title-toast {
        font-weight: 700;
        color: #eab308;
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 2px;
      }
      .achievement-desc-toast {
        font-size: 1rem;
        font-weight: 600;
      }
      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
      }
    `;
    document.head.appendChild(style);
  }

  document.body.appendChild(toast);

  // Animate in
  setTimeout(() => toast.classList.add('show'), 100);

  // Remove after 4 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 500);
  }, 4000);
}

// Redirect to achievements page
function showAchievementPopup() {
  const isInPages = window.location.pathname.includes('/pages/');
  window.location.href = isInPages ? 'achievements.html' : 'pages/achievements.html';
}

// Check for daily streak
function checkDailyStreak() {
  const user = getCurrentUser();
  if (!user) return;

  const today = getTodayKey();
  const lastLogin = user.lastLoginDate;

  if (lastLogin === today) return; // Already logged in today

  let streak = user.currentStreak || 0;

  if (lastLogin) {
    const lastDate = new Date(lastLogin);
    const currDate = new Date(today);
    const diffTime = Math.abs(currDate - lastDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      streak++;
    } else {
      streak = 1;
    }
  } else {
    streak = 1;
  }

  // Update user without full profile save (to avoid overwriting other edits if concurrent)
  // But for simple local app, updating user object is fine
  user.lastLoginDate = today;
  user.currentStreak = streak;
  saveToStorage(STORAGE_KEYS.USER, user);

  if (streak >= 7) {
    unlockAchievement('week_streak', 'Weekly Warrior', 'Logged in 7 days in a row', '🔥');
  }
}

// Track feature usage for Explorer achievement
function trackFeatureUsage() {
  const user = getCurrentUser();
  if (!user) return;

  const features = getFromStorage('biteburn_features_used') || [];
  const validPages = ['daily-routine.html', 'food-planning.html', 'workout.html', 'analyzing.html', 'achievements.html'];

  // Identify current page
  const path = window.location.pathname;
  const page = validPages.find(p => path.includes(p));

  if (page && !features.includes(page)) {
    features.push(page);
    saveToStorage('biteburn_features_used', features);

    if (features.length >= 5) {
      unlockAchievement('explorer', 'Feature Explorer', 'Used all features of the app', '🗺️');
    }
  }
}
// --- Pricing and Adaptation Helpers ---

// Get full details for a country code
function getCountryDetails(code) {
  return COUNTRIES.find(c => c.code === code) || COUNTRIES.find(c => c.code === 'US');
}

// Estimate meal price based on calories and country cost multiplier
function estimateMealPrice(calories, countryCode) {
  const country = getCountryDetails(countryCode);
  const baseCost = (calories / 500); // Normalize: 500 cal = 1 unit
  const estimated = baseCost * country.costMultiplier;

  // Round nicely
  if (estimated > 100) return Math.round(estimated / 10) * 10;
  if (estimated > 10) return Math.round(estimated);
  return estimated.toFixed(2);
}

// Get activity multiplier based on completed workouts/tasks
function getActivityMultiplier() {
  const todayKey = getTodayKey();

  // 1. Check Workouts
  const workoutData = getFromStorage(`biteburn_workout_${todayKey}`, null);
  let workoutBoost = 0;
  if (workoutData && workoutData.exercises) {
    const completed = workoutData.exercises.filter(e => e.completed).length;
    if (completed >= 3) workoutBoost = 0.2; // High workout activity
    else if (completed >= 1) workoutBoost = 0.1; // Moderate workout activity
  }

  // 2. Check Routine Tasks
  // routines structure is { weekday: [], weekend: [] } generally, but we need completed tasks for *today*
  // The current app structure stores routine templates, identifying completed tasks for a specific day might 
  // require a specific key if implemented. Assuming 'routines' in localStorage acts as a checklist for today:
  const routines = getFromStorage(STORAGE_KEYS.ROUTINES) || {};
  let taskCount = 0;
  ['weekday', 'weekend', 'special'].forEach(type => {
    if (routines[type]) taskCount += routines[type].length;
  });

  let taskBoost = 0;
  if (taskCount >= 8) taskBoost = 0.1; // Very busy day

  // Total multiplier (Base is 1.0)
  return 1.0 + workoutBoost + taskBoost;
}

