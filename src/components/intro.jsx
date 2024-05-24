import React, { useRef, useEffect, useState } from 'react';
import '../App.scss';
import FadeIn from 'react-fade-in/lib/FadeIn';
import Reveal from './Reveal';

const Intro = () => {

    return (
        <Reveal>
            <ul>
                <FadeIn>
                    <li>
                        123
                    </li>
                    <li>
                        123
                    </li>
                    <li>
                        123
                    </li>
                </FadeIn>

            </ul>
        </Reveal>
    );
}

export default Intro;