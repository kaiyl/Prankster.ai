import React from "react";
import Analytics from '../Analytics/analytics';

const LDBetaBanner = ({ effectiveFlag }) => {
    return (
        <div style={{ 
            width: '100%',
            backgroundColor: effectiveFlag ? '#00844B' : '#373841',
            color: 'white',
            padding: '10px 20px',
            textAlign: 'center',
            fontSize: '1.2em',
            fontWeight: 'bold',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 1000,
            boxSizing: 'border-box'
        }}>
            <span style={{ 
                display: 'inline-block',
                margin: '0 auto'
            }}>
                --- Prank Recommendation Engine Enabled (BETA) ---
            </span>
        </div>
    );
};

export default LDBetaBanner;