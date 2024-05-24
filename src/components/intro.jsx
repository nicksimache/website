import React, { useRef, useEffect, useState } from 'react';
import '../App.scss';
import FadeIn from 'react-fade-in/lib/FadeIn';
import Reveal from './Reveal';

const Intro = () => {

    return (
        <Reveal>
            <h1 className='name'>
                Nick Sima<em>.</em>
            </h1>
            <p className='linklist'>
                <a className='link' href='https://github.com/nicksimache'>Github⤴</a>
                <a className ='link' href='https://www.linkedin.com/in/nick-sima-a64613235/'>LinkedIn⤴</a>
            </p>
        </Reveal>
    );
}

export default Intro;