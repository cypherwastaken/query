function sendCommand() {
    const sessionId = document.getElementById('session-id').value;
    const command = document.getElementById('command').value;
    const args = document.getElementById('args').value;

    const data = {
        [command]: {
            ShouldExecute: true,
            ...JSON.parse(args)
        }
    };

    fetch(`https://zumix-4aa16-default-rtdb.firebaseio.com/sessions/${sessionId}.json`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
