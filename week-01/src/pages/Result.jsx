// Result.jsx
import React from 'react'
import { useLocation } from 'react-router-dom';

const Result = () => {
    const location = useLocation();
    const { formData } = location.state || {};

    return (
        <div className="result flex justify-center items-center p-4">
            <div className="success">
                <h1 className='text-sky-400'>Form Submitted Successfully</h1>
                <ul>
                    {Object.entries(formData).map(([key, value]) => (
                        <li key={key}><strong>{key}</strong>: {value}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Result;
