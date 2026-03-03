const express = require('express');
const cors = require('cors');
const path = require('path');
// require('dotenv').config(); // Not needed if offline


const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increase limit for base64 images

// Serve static files (HTML, CSS, JS) from the project root
app.use(express.static(path.join(__dirname)));

// Explicit route for the homepage to ensure Vercel serves it correctly
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Local AI Analysis Data (Mocked for Offline Use)
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



const db = require('./database');

// API Routes
app.post('/api/auth/signup', async (req, res) => {
    try {
        const { email, password, name, ...profileData } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Pass everything else as profile data
        const user = await db.createUser(email, password, name, profileData);

        // Return combined user object so frontend has everything immediately
        res.json({ user: { ...user, ...profileData } });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await db.getUserByEmail(email);

        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const userData = await db.getUserData(user.id);
        res.json({ user: { id: user.id, email: user.email, name: user.name }, data: userData });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/data/sync', async (req, res) => {
    try {
        const { userId, key, value } = req.body;
        if (!userId || !key) {
            return res.status(400).json({ error: 'UserId and key are required' });
        }
        if (key === 'profile') {
            console.log(`Syncing profile for user ${userId}, size: ${JSON.stringify(value).length} bytes`);
        }
        await db.saveUserData(userId, key, value);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/analyze', async (req, res) => {
    try {
        const { messages } = req.body;

        if (!messages || messages.length === 0) {
            return res.status(400).json({ error: 'Messages are required' });
        }

        // Simple local analysis based on keywords in the last message
        const userMessage = messages[messages.length - 1].content.toLowerCase();
        let responseContent = "I'm listening. Please describe your symptoms (e.g., headache, fever, stomach pain) for a local analysis.";

        if (userMessage.includes('headache') || userMessage.includes('head pain')) {
            responseContent = ANALYSIS_RESPONSES.headache;
        } else if (userMessage.includes('fever') || userMessage.includes('temperature')) {
            responseContent = ANALYSIS_RESPONSES.fever;
        } else if (userMessage.includes('stomach') || userMessage.includes('belly') || userMessage.includes('nausea')) {
            responseContent = ANALYSIS_RESPONSES.stomach;
        } else if (userMessage.includes('cold') || userMessage.includes('cough') || userMessage.includes('flu')) {
            responseContent = ANALYSIS_RESPONSES.cold;
        }

        res.json({ content: responseContent });

    } catch (error) {
        console.error('Error in local analysis:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



app.post('/api/auth/delete', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = await db.getUserByEmail(email);

        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        await db.deleteUser(user.id);

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start Server
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
        console.log(`Open http://localhost:${port}/index.html in your browser`);
    });
}

module.exports = app;
