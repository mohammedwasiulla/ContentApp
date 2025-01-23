import React, { useState, useEffect } from 'react';
import AdComponent from './AdComponent';

const AppWithAd = ({ children }) => {
    const [showAd, setShowAd] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShowAd(false), 5000); // Show ad for 5 seconds
        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            {showAd ? (
                <div className="fixed top-0 left-0 w-full h-full bg-white flex items-center justify-center">
                    <AdComponent />
                </div>
            ) : (
                children
            )}
        </div>
    );
};

export default AppWithAd;
