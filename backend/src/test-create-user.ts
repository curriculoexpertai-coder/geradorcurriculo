async function testCreateUser() {
    const response = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: 'test-firebase-uid-123',
            email: 'test@example.com',
            name: 'Test User'
        })
    });

    const data = await response.json();
    console.log('Create User Response:', response.status, data);
}

testCreateUser();
