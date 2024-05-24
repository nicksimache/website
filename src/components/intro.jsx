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
            <h2 className='namesubheading'>
                <em>Mathematics and Computer Science</em> student at <em>UVic</em>
            </h2>

            <p className='description'>
                I am a freshman at UVic driven by the goal of creating futuristic sci-fi technology.
            </p>

            <p className='description'>
                When I'm not immersed in coding and problem-solving, you can find me weightlifting or exploring new cuisines.
            </p>
            <p className='linklist'>
                <a className='link' href='https://github.com/nicksimache'>Github</a>
                <a className ='link' href='https://www.linkedin.com/in/nick-sima-a64613235/'>LinkedIn</a>
            </p>
        </Reveal>
    );
}

export default Intro;