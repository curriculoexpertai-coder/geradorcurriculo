async function testGetUser() {
    // ID do usuário criado no teste anterior
    const userId = 'test-firebase-uid-123';

    const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();
    console.log('Get User Response:', response.status, data);
}

testGetUser();
