import React, { useState } from 'react';
import './navbar.css';

const Navbar = () => {

    const [hoverStates, setHoverStates] = useState([false, false, false, false]);

    const handleMouseEnter = (index) => {
        const updatedStates = [...hoverStates];
        updatedStates[index] = true;
        setHoverStates(updatedStates);
    };

    const handleMouseLeave = (index) => {
        const updatedStates = [...hoverStates];
        updatedStates[index] = false;
        setHoverStates(updatedStates);
    };

    const listItems = [
        { text: 'About' },
        { text: 'Current' },
        { text: 'Project' },
        { text: 'Skills' }
    ];

    return (
        <div className="navbar">
            <ul>
                {listItems.map((item, index) => (
                    <li
                        key={index}
                        style={{
                            color: hoverStates[index] ? 'rgb(210, 210, 210)' : 'rgb(135, 135, 135)',
                            backgroundColor: hoverStates[index] ? 'rgb(35, 35, 35)' : 'transparent',
                            borderRadius: '2px',
                            display: 'inline-block',
                            margin: '10px 10px',
                            fontSize: '18px',
                            cursor: 'pointer',
                            padding: '7px 12px 7px 12px',
                            fontFamily: 'NunitoSans, sans-serif',
                        }}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={() => handleMouseLeave(index)}
                    >
                        {item.text}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Navbar;
