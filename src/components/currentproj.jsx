import React, { useEffect, useState } from 'react';
import '../App.scss';

const CurrentProject = () => {

    const [hovered, setHovered] = useState(false);
    const [hoverStart, setHoverStart] = useState(null);
    const [hoverTime, setHoverTime] = useState(0);

    let hoverClass;

    useEffect(() => {
        let timer1;
        let timer2;

        if (hovered) {
            setHoverStart(Date.now());

            timer1 = setTimeout(() => {
                hoverClass = "hover1";
            }, 1000);

            timer2 = setTimeout(() => {
                hoverClass = "hover2";
            }, 5000)

        } else {
            setHoverStart(null);
            setHoverTime(0);
            clearTimeout(timer1);
            clearTimeout(timer2);
        }

        return (() => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        })
    }, [hovered]);

    return (
        <div 
            className={'CurrentProject ${hoverClass}'}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <h1>h1</h1>
        </div>
    );
}

export default CurrentProject;