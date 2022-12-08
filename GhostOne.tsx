import { useEffect, Dispatch, SetStateAction } from 'react'

import { Gif } from 'make-a-gif'

import g1R1 from '/public/ghost_one/g1R1.png'

import g1R2 from '/public/ghost_one/g1R2.png'

import g1L1 from '/public/ghost_one/g1L1.png'

import g1L2 from '/public/ghost_one/g1L2.png'

import g1U1 from '/public/ghost_one/g1U1.png'

import g1U2 from '/public/ghost_one/g1U2.png'

import g1D1 from '/public/ghost_one/g1D1.png'

import g1D2 from '/public/ghost_one/g1D2.png'


import React from 'react';

import PropTypes from 'prop-types';

import { imageConfigDefault } from 'next/dist/shared/lib/image-config'



type Props = {
    x: number
    y: number
    setX: Dispatch<SetStateAction<number>>
    setY: Dispatch<SetStateAction<number>>
    containerWidth: number
    containerHeight: number
}

console.log(g1R1)

//CREATE GIFS:
//right ghost:
var test = [g1R1.src, g1R2.src];

//const r_ghost = new Gif(2000,2500)

//r_ghost.setLoops(-1);
//r_ghost.setFrames(test);

//var gifTest: string =  r_ghost

//contains all the png frames of the ghost, divided into groups of 2 frames based on the direction:
// var images = {
//     "right": {
//         1: r_ghost,
//         2: r_ghost
//     },
//     "left": {
//         "1": g1L1.src,
//         "2": g1L2.src
//     },
//     "up": {
//         1: g1U1.src,
//         2: g1U2.src
//     },
//     "down": {
//         1: g1D1.src,
//         2: g1D2.src
//     }
// }

var hi = "right"
// const step = 10
// const radius = 25

// var right: Array<string> = [
//     require('../../public/ghost_one/g1R1.jpeg'),
//     require('../../public/ghost_one/g1R2.jpeg')
// ];

// var right = [<img src={g1R1.src}/>, <img src={g1R2.src}/>]
// var right = [<div>hi</div>]

//PSEUDOCODE FOR FLAGS:
// have an useState with 4 different states: 0-left, 1-right, 2-up, 3-down, -1-init state
// use this state information and make a while loop alternating between corresponding frames:
// eg: state = 0

// function(state): --> call this function every time that state changes 
// while (state ==0 ):
// alternate between two frames
// while (state ==1 ):
// .. ..
//PSEUDOCODE FOR FLAGS

var counter = 0;
var frame1: Boolean = true;

//var picture = (images["up"][1]);
var run = 1;


//FUNCTION FOR MAKING THE GIT:
export function GhostOne({x, y, setX, setY, containerWidth, containerHeight}: Props): JSX.Element {
    // Performing action on first page load.
    // useEffect(() => {       
    //     return () => {
    //         document.removeEventListener("keydown", () => {});
    //     }
    // }, [setX, setY, containerWidth, containerHeight])
    // var hi = right[0]

    // for (let i = 0; i < 10000; i++) {
    //     if (counter < 5) {
    //         counter += 1;
    //     }
    //     else{
    //         counter = 0;

    //         if (frame1) {
    //             frame1 = false;
    //         }
    //         else {
    //             frame1 = true;
    //         }
    //     }

    //     if (frame1) {
    //         picture = (images["right"][1]);
            
    //     }
    //     else {
    //         picture = (images["right"][2])
    //     }

    //     return (
    //         <div>
    //             <img src={picture} height={145}></img>
    //         </div>
    //     )
    // }

    return (
        <div>
            {<img src={test[1]} height={145}></img>}
        </div>
    )
}

// return (
//     <div>
//         <img src={picture} height={145}></img>
//     </div>
// )

//var r_one: HTMLImageElement = new Image(25,25);
//var r_two: HTMLImageElement = new Image(25,25);





// const GhostOne: HTMLImageElement = () => {
//     return (right[0])
// }

// export default GhostOne;
// function preload() {
//     r_one = g1R1;
//     r_two = g1R2;
// }

// function draw() {
//     image(animation[]r_one, 0, 0);


// }