import React, { useState } from 'react';
import '../App.scss';

const Navbar = () => {

    const listItems = [
        { text: 'About' },
        { text: 'Current' },
        { text: 'Skills' }
    ];

    return (
        <div className="navbar">
            <ul className='navbarul'>
                {listItems.map((item, index) => (
                    <li
                        key={index}
                    >
                        {item.text}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Navbar;
