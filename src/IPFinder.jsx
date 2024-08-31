import React, { useState } from 'react';
import './App.css'

const IPFinder = () => {
    const [ip, setIp] = useState('');
    const [data, setData] = useState(null);
    const [error, setError] = useState('');

    const fetchIPData = async (ipAddress) => {
        setError('');
        try {
            const response = await fetch(`https://ipinfo.io/${ipAddress}/json?token=d46be568291d41`);
            const result = await response.json();
            if (response.ok) {
                setData(result);
            } else {
                setError(result.error || 'Failed to fetch data');
            }
        } catch (error) {
            setError('An error occurred while fetching data');
        }
    };

    const handleSearch = () => {
        if (ip) {
            fetchIPData(ip);
        } else {
            setError('Please enter a valid IP address');
        }
    };

    return (
        <div id='back'>
            <h1>IP Address Finder</h1>
            <input
                type="text"
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                placeholder="Enter IP address"
            />
            <button onClick={handleSearch} className='btn'>Search</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {data && (
                <div>
                    <h2>IP Details:</h2>
                    <p><strong>IP:</strong> {data.ip}</p>
                    <p><strong>City:</strong> {data.city}</p>
                    <p><strong>Region:</strong> {data.region}</p>
                    <p><strong>Country:</strong> {data.country}</p>
                    <p><strong>ISP:</strong> {data.org}</p>
                </div>
            )}
        </div>
    );
};

export default IPFinder;
