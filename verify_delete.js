
const API_URL = 'http://localhost:5000/api';

async function testDeleteAccount() {
    const email = `testdelete_${Date.now()}@example.com`;
    const password = 'password123';

    console.log(`Testing with user: ${email}`);

    // 1. Register
    console.log('1. Registering user...');
    const regRes = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name: 'Test User' })
    });

    if (!regRes.ok) {
        console.error('Registration failed:', await regRes.text());
        return;
    }
    const regData = await regRes.json();
    const userId = regData.user.id;
    console.log('   User registered with ID:', userId);

    // 2. Try delete with wrong password
    console.log('2. Testing delete with wrong password...');
    const wrongPassRes = await fetch(`${API_URL}/auth/delete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: 'wrongpassword' })
    });

    if (wrongPassRes.status === 401) {
        console.log('   Success: Server rejected wrong password.');
    } else {
        console.error('   Failed: Expected 401, got', wrongPassRes.status);
        console.error(await wrongPassRes.text());
        return;
    }

    // 3. Delete with correct password
    console.log('3. Testing delete with correct password...');
    const deleteRes = await fetch(`${API_URL}/auth/delete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    if (deleteRes.ok) {
        console.log('   Success: Account deleted.');
    } else {
        console.error('   Failed to delete:', await deleteRes.text());
        return;
    }

    // 4. Verify login failed
    console.log('4. Verifying account is gone (login should fail)...');
    const loginRes = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    if (loginRes.status === 401) {
        console.log('   Success: Login failed as expected.');
    } else {
        console.error('   Failed: Login succeeded or got unexpected status:', loginRes.status);
    }

    console.log('✅ Verification passed!');
}

testDeleteAccount();
