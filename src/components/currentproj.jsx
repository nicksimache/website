import React, { useEffect, useState } from 'react';
import '../App.scss';
import Reveal from './Reveal';

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
        width: showDiv ? '80vw' : '0',
        height: showDiv ? '80vh' : '0',
        backgroundColor: 'rgb(36,36,36)',
        display: 'flex',
        overflow: 'hidden',
        transition: 'width 0.2s ease-in-out, height 0.2s ease-in-out',
        borderRadius: '10px',
    };
    
    const handleClick = () => {
        setShowDiv(!showDiv)
        
    };

    const handleDivClick = (e) => {
        e.stopPropagation();
    };

    return (
        <Reveal>
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
                onClick={handleDivClick}
            >
                <img
                    src={'../../public/dungeongenerateexample.png'} 
                    alt="Current Project"
                    style={{height:'100%',
                            width:'60vw',
                            left: '0'
                        }}
                >
                </img>
                <div
                    style={{
                        color: 'rgb(200,200,200)',
                    }}
                >
                    <img
                        src={'../../public/X.png'} 
                        alt="Current Project"
                        style={{right: '0',
                                top: '0',
                                width:'30px', 
                                height:'30px',
                                position: 'absolute',
                                padding: '5px',
                                cursor: 'pointer',
                        }}
                        onClick={handleClick}
                    >
                    </img>
                    <h1 
                        style={{
                            padding: '30px',
                            fontFamily: 'NunitoSans, sans-serif',
                            fontSize: '40px',
                            
                        }}
                    
                    >
                        Crypt Crawlers
                    </h1>
                    <p
                        style={{
                            padding: '30px',
                            paddingLeft: '30px',
                            fontFamily: 'NunitoSans, sans-serif',
                            fontFize: '10px',
                        }}
                    >
                        
                    </p>
                </div>
                
                
            </div>}
        </div>
        </Reveal>
    );
}

export default CurrentProject;