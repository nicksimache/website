import React, { useEffect, useState } from 'react';
import '../App.scss';

const CurrentProject = () => {

    const [hovered, setHovered] = useState(false);
    const [showDiv, setShowDiv] = useState(false);  

    const overlay_style = {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: hovered ? 'rgb(225, 225, 225)' : 'rgb(191, 191, 191)',
        background: hovered ? 'rgba(50, 50, 50, 0.5)' : 'rgba(0, 0, 0, 0.5)',
        cursor: hovered ? 'pointer' : 'default',
        fontFamily: 'NunitoSans, sans-serif',
        fontFize: '40px',
        boxSizing: 'border-box',
        borderRadius: '10px',
        pointerEvents: 'auto',

    }

    const expandedDiv = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: showDiv ? '90vw' : '0',
        height: showDiv ? '90vh' : '0',
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        transition: 'width 0.2s ease-in-out, height 0.2s ease-in-out'
    };
    
    const handleClick = () => {
        setShowDiv(!showDiv);
    };

    return (
        <div 
            className='currentProject'
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={handleClick}
        >
            <div 
                className='overlay'
                style={overlay_style}
            >
                <h2>Currently Working On</h2>
            </div>
            <img 
                src={'../../public/dungeongenerateexample.png'} 
                alt="Current Project" 
                className='project-image' 
            />
            {showDiv && 
            <div
                style={expandedDiv}
                onClick={handleClick}
            >
                
                
            </div>}
        </div>
    );
}

export default CurrentProject;