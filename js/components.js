// ===================================
// Bite & Burn - Shared Components
// ===================================

// Initialize chat functionality
function initChat() {
  const chatToggle = document.getElementById('chatToggle');
  const chatPopup = document.getElementById('chatPopup');
  const chatClose = document.getElementById('chatClose');
  const chatInput = document.getElementById('chatInput');
  const chatSend = document.getElementById('chatSend');
  const chatMessages = document.getElementById('chatMessages');

  if (!chatToggle) return;

  chatToggle.addEventListener('click', () => {
    chatPopup.classList.toggle('active');
  });

  chatClose?.addEventListener('click', () => {
    chatPopup.classList.remove('active');
  });

  function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;

    // Add user message
    addChatMessage(message, 'user');
    chatInput.value = '';

    // Simulate bot response
    setTimeout(() => {
      const response = getBotResponse(message);
      addChatMessage(response, 'bot');
    }, 1000);
  }

  chatSend?.addEventListener('click', sendMessage);
  chatInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
}

function addChatMessage(message, type) {
  const chatMessages = document.getElementById('chatMessages');
  const msgDiv = document.createElement('div');
  msgDiv.className = `chat-message ${type}`;
  msgDiv.style.cssText = `
    padding: 10px 14px;
    margin-bottom: 10px;
    border-radius: 12px;
    max-width: 80%;
    ${type === 'user'
      ? 'background: var(--primary); color: white; margin-left: auto;'
      : 'background: var(--gray-700); color: var(--gray-100);'}
  `;
  msgDiv.textContent = message;
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotResponse(message) {
  const msg = message.toLowerCase();

  if (msg.includes('hello') || msg.includes('hi')) {
    return "Hello! How can I assist you with your health journey today?";
  }
  if (msg.includes('workout') || msg.includes('exercise')) {
    return "I can help you with workouts! Check out our Workout page for personalized exercise plans based on your fitness level.";
  }
  if (msg.includes('food') || msg.includes('diet') || msg.includes('meal')) {
    return "For meal planning, visit our Food Planning page. We'll create meals based on your country's cuisine and health needs!";
  }
  if (msg.includes('routine') || msg.includes('schedule')) {
    return "You can organize your day in the Daily Routine section. Set tasks, track progress, and build healthy habits!";
  }
  if (msg.includes('health') || msg.includes('medical')) {
    return "For health analysis, check our Analyzing page. You can upload reports or describe symptoms for AI-powered insights.";
  }

  return "Thanks for your message! Feel free to explore our features or ask about workouts, meals, routines, or health analysis.";
}

// Check auth and redirect if needed
function requireAuth() {
  if (!isLoggedIn()) {
    window.location.href = 'signin.html';
    return false;
  }
  return true;
}

// Update header for logged in users
function updateHeaderAuth() {
  const authButtons = document.querySelector('.auth-buttons');
  const user = getCurrentUser();

  if (user && authButtons) {
    // Determine correct path prefix based on current page location
    const isInPages = window.location.pathname.includes('/pages/');
    const dashPath = isInPages ? 'dashboard.html' : 'pages/dashboard.html';

    // Determine avatar display
    const avatarContent = getAvatarContent(user, isInPages);

    authButtons.innerHTML = `
      <div class="user-nav-group" style="display: flex; align-items: center; gap: 12px;">
        <span class="nav-username" style="font-weight: 600; color: var(--gray-300); font-size: 0.9rem; max-width: 120px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
          ${user.name || 'User'}
        </span>
        <a href="${dashPath}" class="nav-dash-btn" title="Dashboard">
          <span class="nav-dash-icon">📊</span>
        </a>
        <button class="nav-profile-btn" onclick="showProfilePopup()" title="Profile">
          <span class="nav-avatar">${avatarContent}</span>
        </button>
      </div>
    `;
  }
}

// Global helper to get avatar HTML content
function getAvatarContent(user, isInPages = false) {
  if (!user) return '👤';

  const prefix = isInPages ? '../' : '';

  if (user.avatar) {
    if (user.avatar.startsWith('data:')) {
      return `<img src="${user.avatar}" style="width: 100%; height: 100%; object-fit: cover;">`;
    }
    if (user.avatar.includes('/')) {
      const fullPath = user.avatar.startsWith('assets/') ? prefix + user.avatar : user.avatar;
      return `<img src="${fullPath}" style="width: 100%; height: 100%; object-fit: cover;">`;
    }
    return user.avatar; // It's an emoji
  }

  // Fallback to gender-based default silhouette
  const defaultFile = user.gender === 'female' ? 'default_female.svg' : 'default_male.svg';
  return `<img src="${prefix}assets/avatars/${defaultFile}" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.7;">`;
}

// Create page header
function createPageHeader(title, showBack = true) {
  const isInPages = window.location.pathname.includes('/pages/');
  const homePath = isInPages ? '../index.html' : 'index.html';
  const dashPath = isInPages ? 'dashboard.html' : 'pages/dashboard.html';
  const achievPath = isInPages ? 'achievements.html' : 'pages/achievements.html';

  return `
    <header class="header">
      <div class="container">
        <div class="header-content">
          <div style="display: flex; align-items: center; gap: 16px;">
            ${showBack ? '<a href="javascript:history.back()" class="btn btn-icon btn-secondary">←</a>' : ''}
            <a href="${homePath}" class="logo">
              <div class="logo-icon">
                <img src="${isInPages ? '../' : ''}assets/logo.png" class="logo-light" alt="Bite & Burn Logo">
                <img src="${isInPages ? '../' : ''}assets/logo-white.png" class="logo-dark" alt="Bite & Burn Logo">
              </div>
              <span>Bite & Burn</span>
            </a>
          </div>
          
          <div style="display: flex; align-items: center; gap: 12px;">
            <a href="${dashPath}" class="btn btn-icon btn-secondary" title="Dashboard">📊</a>
            <a href="${achievPath}" class="btn btn-icon btn-secondary nav-achiev-btn" title="Achievements">🏆</a>
            <a href="${homePath}" class="btn btn-icon btn-secondary nav-home-btn" title="Home">🏠</a>
            <div class="auth-buttons"></div>
          </div>
        </div>
      </div>
    </header>
  `;
}

// Create footer
function createFooter() {
  return `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-copyright">
            © 2026 <strong>Deltians AI Force</strong>. All rights reserved.
          </div>
          <div class="footer-contact">
            Contact: <a href="tel:0771364629">0771364629</a> | <a href="tel:0715120657">0715120657</a>
          </div>
        </div>
      </div>
    </footer>
  `;
}

// Achievement popup
function showAchievementPopup() {
  const achievements = getFromStorage(STORAGE_KEYS.ACHIEVEMENTS) || [];
  const recent = achievements.slice(-5).reverse();

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay active';
  overlay.innerHTML = `
    <div class="modal">
      <div class="modal-header">
        <h3>🏆 Achievements</h3>
        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
      </div>
      <div class="modal-body">
        ${recent.length === 0
      ? '<p class="text-muted text-center">No achievements yet. Start your journey!</p>'
      : recent.map(a => `
              <div class="card" style="margin-bottom: 12px; padding: 12px;">
                <div style="display: flex; align-items: center; gap: 12px;">
                  <span style="font-size: 2rem;">${a.icon}</span>
                  <div>
                    <strong>${a.title}</strong>
                    <p class="text-muted" style="font-size: 0.875rem; margin: 0;">${a.description}</p>
                  </div>
                </div>
              </div>
            `).join('')
    }
        <a href="${window.location.pathname.includes('/pages/') ? 'achievements.html' : 'pages/achievements.html'}" class="btn btn-primary" style="width: 100%; margin-top: 16px;">
          View All Achievements
        </a>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.remove();
  });
}

// Add achievement
function unlockAchievement(id, title, description, icon = '🏆') {
  const achievements = getFromStorage(STORAGE_KEYS.ACHIEVEMENTS) || [];

  if (!achievements.find(a => a.id === id)) {
    achievements.push({ id, title, description, icon, date: new Date().toISOString() });
    saveData(STORAGE_KEYS.ACHIEVEMENTS, achievements);

    // Show notification
    showToast(`🎉 Achievement Unlocked: ${title}!`, 'success');
  }
}

// Profile popup with tabs
function showProfilePopup() {
  const user = getCurrentUser();
  if (!user) return;

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay active';
  overlay.innerHTML = `
    <div class="modal" style="max-width: 500px; padding: 0; overflow: hidden; display: flex; flex-direction: column;">
      <div class="modal-header" style="padding: 20px; border-bottom: 1px solid var(--gray-700);">
        <h3>Profile Settings</h3>
        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
      </div>
      
      <div class="profile-tabs-nav" style="display: flex; background: var(--gray-800); border-bottom: 1px solid var(--gray-700);">
        <button class="profile-tab-btn active" onclick="switchProfileTab('info')" style="flex: 1; padding: 12px; background: none; border: none; color: var(--gray-400); cursor: pointer; border-bottom: 2px solid var(--primary); color: var(--primary);">👤 Profile</button>
        <button class="profile-tab-btn" onclick="switchProfileTab('goals')" style="flex: 1; padding: 12px; background: none; border: none; color: var(--gray-400); cursor: pointer;">🎯 Goals</button>
        <button class="profile-tab-btn" onclick="switchProfileTab('settings')" style="flex: 1; padding: 12px; background: none; border: none; color: var(--gray-400); cursor: pointer;">⚙️ Settings</button>
      </div>

      <div class="modal-body" style="padding: 24px; max-height: 70vh; overflow-y: auto;">
        <!-- Profile Info Tab -->
        <div id="profile-tab-info" class="profile-tab-content active" style="display: block;">
          <div class="text-center">
            <div class="profile-pic-large" id="profileAvatarDisplay" style="
              width: 100px;
              height: 100px;
              margin: 0 auto 16px;
              border-radius: 50%;
              background: ${document.body.classList.contains('light-theme') ? '#f1f5f9' : 'var(--gray-700)'};
              border: 3px solid var(--primary);
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 2.5rem;
              overflow: hidden;
              cursor: pointer;
            " onclick="document.getElementById('avatarInput').click()" title="Click to upload photo">
              ${getAvatarContent(user, window.location.pathname.includes('/pages/'))}
            </div>
            <h3 style="margin-bottom: 4px;">${user.name || 'User'}</h3>
            <p class="text-muted" style="margin-bottom: 20px;">${user.email}</p>
            
            <input type="file" accept="image/*" id="avatarInput" style="display: none;">
            
            <div style="margin-top: 12px; text-align: left;">
              <p class="text-muted" style="font-size: 0.8rem; margin-bottom: 8px;">Pick an avatar:</p>
              <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; justify-items: center; max-height: 120px; overflow-y: auto; padding: 10px; background: rgba(0,0,0,0.1); border-radius: var(--radius-lg);">
                ${Array.from({ length: 15 }, (_, i) => `assets/avatars/avatar${i + 1}.svg`).map(relPath => {
    const displayPath = (window.location.pathname.includes('/pages/') ? '../' : '') + relPath;
    const isSelected = user.avatar === relPath;
    return `
                    <button onclick="selectAvatar('${relPath}', this)" 
                      style="width: 40px; height: 40px; border-radius: 50%; border: 2px solid ${isSelected ? 'var(--primary)' : 'transparent'}; background: var(--gray-800); cursor: pointer; transition: all 0.2s; overflow: hidden; padding: 0;">
                      <img src="${displayPath}" style="width: 100%; height: 100%; object-fit: cover;">
                    </button>
                  `}).join('')}
              </div>
            </div>

            <button class="btn btn-primary" style="width: 100%; margin-top: 24px;" onclick="this.closest('.modal-overlay').remove(); showEditProfilePopup();">
              ✏️ Edit Personal Info
            </button>
          </div>
        </div>

        <!-- Goals & Stats Tab -->
        <div id="profile-tab-goals" class="profile-tab-content" style="display: none;">
          <div style="display: grid; gap: 16px;">
            <div class="card" style="padding: 16px;">
              <div class="text-muted" style="font-size: 0.8rem; text-transform: uppercase;">Current Goal</div>
              <div style="font-weight: 600; font-size: 1.1rem; margin-top: 4px;">
                ${user.goal === 'lose_weight' ? '🏃 Lose Weight' :
      user.goal === 'gain_muscle' ? '💪 Gain Muscle' :
        user.goal === 'stay_fit' ? '❤️ Stay Fit' :
          user.goal === 'improve_strength' ? '🏋️ Improve Strength' :
            user.goal === 'improve_stamina' ? '🚴 Improve Stamina' : '❤️ Stay Healthy'}
              </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div class="card" style="padding: 12px;">
                <div class="text-muted" style="font-size: 0.75rem;">Weight</div>
                <div style="font-weight: 600;">${user.weight || '--'} kg</div>
              </div>
              <div class="card" style="padding: 12px;">
                <div class="text-muted" style="font-size: 0.75rem;">Height</div>
                <div style="font-weight: 600;">${user.height || '--'} cm</div>
              </div>
              <div class="card" style="padding: 12px;">
                <div class="text-muted" style="font-size: 0.75rem;">BMI</div>
                <div style="font-weight: 600; color: var(--primary);">${user.bmi || '--'}</div>
              </div>
              <div class="card" style="padding: 12px;">
                <div class="text-muted" style="font-size: 0.75rem;">Daily Cals</div>
                <div style="font-weight: 600;">${user.dailyCalories || '--'} kcal</div>
              </div>
            </div>
            <div class="card" style="padding: 16px;">
              <div class="text-muted" style="font-size: 0.8rem; text-transform: uppercase;">Activity Level</div>
              <div style="font-weight: 600; margin-top: 4px;">
                ${user.activityLevel === 'beginner' ? '🌱 Beginner' :
      user.activityLevel === 'moderate' ? '🚶 Moderate' :
        user.activityLevel === 'active' ? '🏃 Active' : '🔥 Very Active'}
              </div>
            </div>
            <button class="btn btn-secondary" style="width: 100%;" onclick="this.closest('.modal-overlay').remove(); showEditProfilePopup();">
              🔄 Update Goals & Stats
            </button>
          </div>
        </div>

        <!-- Appearance & Settings Tab -->
        <div id="profile-tab-settings" class="profile-tab-content" style="display: none;">
          <h4 style="margin-bottom: 16px;">Appearance</h4>
          <div class="theme-switch-container" style="margin-bottom: 24px;">
            <div class="theme-switch-text">
              <span id="themeLabelText">${document.body.classList.contains('light-theme') ? '☀️ Light Mode' : '🌙 Dark Mode'}</span>
            </div>
            <label class="theme-switch">
              <input type="checkbox" id="themeSlider" ${document.body.classList.contains('light-theme') ? 'checked' : ''} onchange="toggleTheme()">
              <span class="slider-knob"></span>
            </label>
          </div>

          <h4 style="margin-bottom: 12px; border-top: 1px solid var(--gray-700); padding-top: 16px;">Account Management</h4>
          <button class="btn btn-secondary" style="width: 100%; margin-bottom: 12px;" onclick="logout()">
            🚪 Logout Session
          </button>
          
          <button class="btn" style="width: 100%; background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid #ef4444;" onclick="deleteAccount()">
            🗑️ Delete My Account
          </button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  // Handle avatar upload
  const avatarInput = overlay.querySelector('#avatarInput');
  avatarInput?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxSize = 150;
          let w = img.width, h = img.height;
          if (w > h) { h = (maxSize * h) / w; w = maxSize; }
          else { w = (maxSize * w) / h; h = maxSize; }
          canvas.width = w;
          canvas.height = h;
          canvas.getContext('2d').drawImage(img, 0, 0, w, h);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.7);

          user.avatar = dataUrl;
          updateCurrentUser(user);
          overlay.remove();
          showProfilePopup();
          updateHeaderAuth();
          showToast('Avatar updated!', 'success');
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.remove();
  });
}

// Function to switch tabs in profile popup
function switchProfileTab(tabName) {
  // Update buttons
  const buttons = document.querySelectorAll('.profile-tab-btn');
  buttons.forEach(btn => {
    btn.classList.remove('active');
    btn.style.borderBottom = 'none';
    btn.style.color = 'var(--gray-400)';
    if (btn.getAttribute('onclick').includes(tabName)) {
      btn.classList.add('active');
      btn.style.borderBottom = '2px solid var(--primary)';
      btn.style.color = 'var(--primary)';
    }
  });

  // Update content
  const contents = document.querySelectorAll('.profile-tab-content');
  contents.forEach(content => {
    content.style.display = content.id === `profile-tab-${tabName}` ? 'block' : 'none';
  });
}

// Delete account with password verification
function deleteAccount() {
  const user = getCurrentUser();
  if (!user) return;

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay active';
  overlay.innerHTML = `
    <div class="modal" style="max-width: 400px;">
      <div class="modal-header">
        <h3 class="text-danger">⚠️ Delete Account</h3>
        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
      </div>
      <div class="modal-body">
        <p>Are you sure you want to delete your account? This action cannot be undone.</p>
        <p class="text-sm text-muted">Please enter your password to confirm.</p>
        
        <div class="form-group" style="margin-top: 16px;">
          <label class="form-label">Password</label>
          <input type="password" id="deletePasswordInput" class="form-input" placeholder="Enter your password">
        </div>

        <div class="error-message" id="deleteErrorMsg" style="display: none; color: var(--danger); font-size: 0.9rem; margin-top: 8px;"></div>

        <div style="display: flex; gap: 12px; margin-top: 24px;">
          <button class="btn btn-secondary" style="flex: 1;" onclick="this.closest('.modal-overlay').remove()">Cancel</button>
          <button class="btn btn-danger" style="flex: 1; background: var(--danger); color: white; border: none;" onclick="confirmDeleteAccount(this)">Delete Permanently</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  // Focus input
  setTimeout(() => overlay.querySelector('input').focus(), 100);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.remove();
  });
}

async function confirmDeleteAccount(btn) {
  const passwordInput = document.getElementById('deletePasswordInput');
  const errorMsg = document.getElementById('deleteErrorMsg');
  const password = passwordInput.value;
  const user = getCurrentUser();

  if (!password) {
    errorMsg.textContent = 'Password is required';
    errorMsg.style.display = 'block';
    return;
  }

  // Disable button
  const originalText = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = 'Deleting...';
  errorMsg.style.display = 'none';

  try {
    const response = await fetch(`${API_BASE_URL}/auth/delete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user.email, password })
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to delete account');
    }

    // Success
    showToast('Account deleted successfully', 'success');

    // Clear local data
    localStorage.clear(); // Clear everything

    // Close modal
    btn.closest('.modal-overlay').remove();

    // Redirect
    setTimeout(() => {
      window.location.href = '../index.html';
    }, 1500);

  } catch (error) {
    console.error('Delete account error:', error);
    errorMsg.textContent = error.message;
    errorMsg.style.display = 'block';
    btn.disabled = false;
    btn.innerHTML = originalText;
  }
}

// Select avatar (image or emoji)
function selectAvatar(avatar, btn) {
  const user = getCurrentUser();
  user.avatar = avatar;
  updateCurrentUser(user);
  // Close and reopen
  btn.closest('.modal-overlay').remove();
  showProfilePopup();
  updateHeaderAuth();
  showToast('Avatar updated!', 'success');
}

// Edit Profile popup with full form
function showEditProfilePopup() {
  const user = getCurrentUser();
  if (!user) return;

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay active';
  overlay.style.cssText = 'overflow-y: auto; padding: 20px;';
  overlay.innerHTML = `
    <div class="modal" style="max-width: 580px; width: 100%; max-height: 90vh; overflow-y: auto;">
      <div class="modal-header" style="position: sticky; top: 0; background: var(--gray-800); z-index: 10;">
        <h3>✏️ Edit Profile</h3>
        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
      </div>
      <div class="modal-body">
        <form id="editProfileFormModal">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div class="form-group">
              <label class="form-label">Name</label>
              <input type="text" class="form-input" name="name" value="${user.name || ''}">
            </div>
            <div class="form-group">
              <label class="form-label">Age</label>
              <input type="number" class="form-input" name="age" value="${user.age || ''}" min="10" max="100">
            </div>
            <div class="form-group">
              <label class="form-label">Gender</label>
              <select class="form-input" name="gender">
                <option value="male" ${user.gender === 'male' ? 'selected' : ''}>Male</option>
                <option value="female" ${user.gender === 'female' ? 'selected' : ''}>Female</option>
                <option value="other" ${user.gender === 'other' ? 'selected' : ''}>Other</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Country</label>
              <select class="form-input" name="country" id="editCountryModal">
                ${typeof COUNTRIES !== 'undefined' ? COUNTRIES.map(c => `<option value="${c.code}" ${c.code === user.country ? 'selected' : ''}>${c.name}</option>`).join('') : `<option value="${user.country}">${user.country}</option>`}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Height (cm)</label>
              <input type="number" class="form-input" name="height" value="${user.height || ''}" min="100" max="250">
            </div>
            <div class="form-group">
              <label class="form-label">Weight (kg)</label>
              <input type="number" class="form-input" name="weight" value="${user.weight || ''}" min="30" max="300">
            </div>
            <div class="form-group">
              <label class="form-label">Goal</label>
              <select class="form-input" name="goal">
                <option value="lose_weight" ${user.goal === 'lose_weight' ? 'selected' : ''}>🏃 Lose Weight</option>
                <option value="gain_muscle" ${user.goal === 'gain_muscle' ? 'selected' : ''}>💪 Gain Muscle</option>
                <option value="stay_fit" ${user.goal === 'stay_fit' ? 'selected' : ''}>❤️ Stay Fit</option>
                <option value="improve_strength" ${user.goal === 'improve_strength' ? 'selected' : ''}>🏋️ Improve Strength</option>
                <option value="improve_stamina" ${user.goal === 'improve_stamina' ? 'selected' : ''}>🚴 Improve Stamina</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Activity Level</label>
              <select class="form-input" name="activityLevel">
                <option value="beginner" ${user.activityLevel === 'beginner' ? 'selected' : ''}>🌱 Beginner</option>
                <option value="moderate" ${user.activityLevel === 'moderate' ? 'selected' : ''}>🚶 Moderate</option>
                <option value="active" ${user.activityLevel === 'active' ? 'selected' : ''}>🏃 Active</option>
                <option value="very_active" ${user.activityLevel === 'very_active' ? 'selected' : ''}>🔥 Very Active</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Diet Type</label>
              <select class="form-input" name="dietType">
                <option value="vegetarian" ${user.dietType === 'vegetarian' ? 'selected' : ''}>🥬 Vegetarian</option>
                <option value="non_vegetarian" ${user.dietType === 'non_vegetarian' ? 'selected' : ''}>🍖 Non-vegetarian</option>
                <option value="vegan" ${user.dietType === 'vegan' ? 'selected' : ''}>🌱 Vegan</option>
                <option value="mixed" ${user.dietType === 'mixed' ? 'selected' : ''}>🍽️ Mixed</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Target Weight (kg)</label>
              <input type="number" class="form-input" name="targetWeight" value="${user.targetWeight || ''}" min="30" max="300">
            </div>
            <div class="form-group" style="grid-column: 1 / -1;">
              <label class="form-label">Food Allergies</label>
              <input type="text" class="form-input" name="allergies" value="${user.allergies || ''}" placeholder="e.g., nuts, dairy">
            </div>
            <div class="form-group" style="grid-column: 1 / -1;">
              <label class="form-label">Medicines</label>
              <textarea class="form-input" name="medicines" rows="2" placeholder="Current medications...">${user.medicines || ''}</textarea>
            </div>
          </div>
          <div style="display: flex; gap: 12px; margin-top: 24px;">
            <button type="button" class="btn btn-secondary btn-lg" style="flex: 1;" onclick="this.closest('.modal-overlay').remove()">Cancel</button>
            <button type="submit" class="btn btn-primary btn-lg" style="flex: 1;">💾 Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  // Handle form submit
  overlay.querySelector('#editProfileFormModal').addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(this);

    user.name = formData.get('name') || user.name;
    user.age = parseInt(formData.get('age')) || user.age;
    user.gender = formData.get('gender') || user.gender;
    user.country = formData.get('country') || user.country;
    user.height = parseFloat(formData.get('height')) || user.height;
    user.weight = parseFloat(formData.get('weight')) || user.weight;
    user.goal = formData.get('goal') || user.goal;
    user.activityLevel = formData.get('activityLevel') || user.activityLevel;
    user.dietType = formData.get('dietType') || user.dietType;
    user.targetWeight = formData.get('targetWeight') || user.targetWeight;
    user.allergies = formData.get('allergies') || '';
    user.medicines = formData.get('medicines') || '';

    // Recalculate
    user.bmi = calculateBMI(user.weight, user.height);
    const actMap = { beginner: 'sedentary', moderate: 'light', active: 'moderate', very_active: 'active' };
    user.dailyCalories = calculateCalories(user.weight, user.height, user.age, user.gender, actMap[user.activityLevel] || 'moderate');

    updateCurrentUser(user);
    overlay.remove();
    updateHeaderAuth();
    showToast('Profile updated successfully! ✅', 'success');

    // Check for goal achievement
    if (user.targetWeight) {
      if ((user.goal === 'lose_weight' && user.weight <= user.targetWeight) ||
        (user.goal === 'gain_muscle' && user.weight >= user.targetWeight)) {
        unlockAchievement('goal_reached', 'Goal Crusher', 'Reached your target weight', '🎯');
      }
    }

    // Refresh dashboard if on it
    if (typeof initDashboard === 'function') initDashboard();
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.remove();
  });
}

// Initialize common features
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initChat();
  updateHeaderAuth();
  initHeaderScroll(); // Add scroll listener
  initHeroParallax(); // Add mouse parallax to hero section

  // Check streak if logged in
  if (isLoggedIn()) {
    checkDailyStreak();
    trackFeatureUsage(); // Track page visit
  }
});

// Header Scroll Effect
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// Interactive Hero Parallax Effect
function initHeroParallax() {
  const hero = document.querySelector('.hero');
  const animContainer = document.querySelector('.hero-animation');
  if (!hero || !animContainer) return;

  const icons = animContainer.querySelectorAll('.anim-icon');
  const circles = animContainer.querySelectorAll('.anim-circle');
  const heart = animContainer.querySelector('.anim-heart');

  hero.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = hero.getBoundingClientRect();

    // Normalize mouse position (-1 to 1)
    const x = ((clientX - left) / width - 0.5) * 2;
    const y = ((clientY - top) / height - 0.5) * 2;

    // Apply parallax to heart (slight)
    if (heart) {
      heart.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
    }

    // Apply parallax to icons (staggered depth)
    icons.forEach((icon, index) => {
      const depth = (index + 1) * 15;
      // We must preserve any existing orbital transform if we were using purely JS, 
      // but here we use CSS for orbit. However, simple translate can still work.
      // Better: Apply the parallax to the container or use CSS variables.
      icon.style.setProperty('--tx', `${x * depth}px`);
      icon.style.setProperty('--ty', `${y * depth}px`);
      icon.style.transform = `translate(var(--tx), var(--ty))`;
    });

    // Apply parallax to background circles (deeper depth)
    circles.forEach((circle, index) => {
      const depth = (index + 1) * -20; // Opposite direction for depth feel
      circle.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
    });
  });

  // Reset on mouse leave
  hero.addEventListener('mouseleave', () => {
    if (heart) heart.style.transform = '';
    icons.forEach(icon => icon.style.transform = '');
    circles.forEach(circle => circle.style.transform = '');
  });
}


// Theme Toggle Functions
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme);
}

function setTheme(theme) {
  if (theme === 'light') {
    document.body.classList.add('light-theme');
  } else {
    document.body.classList.remove('light-theme');
  }
  localStorage.setItem('theme', theme);
  updateThemeToggleIcon();

  // Sync slider if profile popup is open
  const slider = document.getElementById('themeSlider');
  const labelText = document.getElementById('themeLabelText');
  if (slider) {
    slider.checked = (theme === 'light');
  }
  if (labelText) {
    labelText.textContent = (theme === 'light' ? '☀️ Light Mode' : '🌙 Dark Mode');
  }
}

function toggleTheme() {
  const isLight = document.body.classList.contains('light-theme');
  setTheme(isLight ? 'dark' : 'light');
}

function updateThemeToggleIcon() {
  const toggleBtn = document.getElementById('themeToggle');
  const guestToggle = document.getElementById('guestThemeToggle');
  const isLight = document.body.classList.contains('light-theme');

  if (toggleBtn) {
    toggleBtn.innerHTML = isLight ? '🌙' : '☀️';
    toggleBtn.title = isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode';
  }

  if (guestToggle) {
    guestToggle.innerHTML = isLight ? '🌙' : '☀️';
    guestToggle.title = isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode';
  }
}

// Mobile Menu Toggle
function toggleMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (menuBtn && navLinks) {
    menuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
  }
}

// Header Scroll Effect
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// Close mobile menu when clicking on a link
document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();

  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const menuBtn = document.getElementById('mobileMenuBtn');
      const navLinksContainer = document.getElementById('navLinks');
      if (menuBtn && navLinksContainer) {
        menuBtn.classList.remove('active');
        navLinksContainer.classList.remove('active');
      }
    });
  });
});
