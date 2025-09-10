import React, { useState } from 'react';
import axios from 'axios';

import { URL } from '../func';

function APITwoCall() {
    const [userNumber, setUserNumber] = useState('');
    const [workerNumber, setWorkerNumber] = useState('');
    const [status, setStatus] = useState('');

    const handleCall = async (e) => {
        e.preventDefault();

        setStatus('Initiating call...');
        try {
            const response = await axios.post(`${URL}/call/mask-call`, {
                callingPhone: userNumber,
                recievingPhone: workerNumber
            });

            if (response.data.success) {
                setStatus('Call initiated successfully');
            } else {
                setStatus('Failed to initiate call');
            }
        } catch (error) {
            setStatus('Error: ' + error.message);
        }

    };

    return (
        <div>
            <h2>Initiate a Masked Call</h2>
            <form onSubmit={handleCall}>
                <div>
                    <label>Your Phone Number:</label>
                    <input
                        type="text"
                        value={userNumber}
                        onChange={(e) => setUserNumber(e.target.value)}
                        placeholder="Enter your number"
                        required
                    />
                </div>
                <div>
                    <label>Worker's Phone Number:</label>
                    <input
                        type="text"
                        value={workerNumber}
                        onChange={(e) => setWorkerNumber(e.target.value)}
                        placeholder="Enter worker's number"
                        required
                    />
                </div>
                <button type="submit">Start Call</button>
            </form>
            {status && <p>{status}</p>}
        </div>
    );
}

export default APITwoCall;
