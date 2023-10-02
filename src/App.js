import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const token = uuidv4();

function App() {
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');

  function handleInputChanged(event) {
    const value = event.target.value;
    if (value.length < 10) setInput(value);
    else setMessage('TOO LONG NUMBER INPUT');
  }

  async function getIsPrimeFromAPI() {
    const requestBody = JSON.stringify({ input, token });

    try {
      const response = await fetch('http://localhost:8080/api/isPrime', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestBody,
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data);
      } else {
        setMessage('ERROR MAKING REQUEST');
        console.error('Error making POST request:', response.statusText);
      }
    } catch (error) {
      setMessage('ERROR MAKING REQUEST');
      console.error('Error making POST request:', error);
    }
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <TextField
          label='Enter a number'
          variant='outlined'
          style={{ marginBottom: '20px' }}
          value={input}
          onChange={handleInputChanged}
        />
        <Button variant='contained' onClick={getIsPrimeFromAPI}>
          TEST
        </Button>
        <Typography variant='h6' style={{ marginTop: '20px' }}>
          {message}
        </Typography>
      </header>
    </div>
  );
}

export default App;
