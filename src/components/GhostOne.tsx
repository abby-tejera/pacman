import g1R1 from '/public/ghost_one/g1R1.png'

import g1R2 from '/public/ghost_one/g1R2.png'

import g1L1 from '/public/ghost_one/g1L1.png'

import g1L2 from '/public/ghost_one/g1L2.png'

import g1U1 from '/public/ghost_one/g1U1.png'

import g1U2 from '/public/ghost_one/g1U2.png'

import g1D1 from '/public/ghost_one/g1D1.png'

import g1D2 from '/public/ghost_one/g1D2.png'

import React from 'react';


//GHOST FRAME ARRAYS:
var right = [g1R1.src, g1R2.src];
var left = [g1L1.src, g1L2.src]; 
var up = [g1U1.src, g1U2.src]; 
var down = [g1D1.src, g1D2.src]; 

//OTHER VARIABLES NEEDED:
var index = 1; //keeps track of what frame we should return
var h = 145; //height of the image

//FUNCTION FOR RETURNING THE CORRECT FRAME:
export function display_one(state: Number): JSX.Element {
    //update the frame:
    index += 1;

    //moving to the left:
    if (state == 0) {
        return (
            <div>
                {<img src={left[(index + 1 % 2)]} height={h}></img>}
            </div>
        )
    }

    //moving to the right:
    else if (state == 1) {
        return (
            <div>
                {<img src={right[(index + 1 % 2)]} height={h}></img>}
            </div>
        )
    }

    //moving up:
    else if (state == 2) {
        return (
            <div>
                {<img src={up[(index + 1 % 2)]} height={h}></img>}
            </div>
        )
    }

    //moving down:
    else if (state == 3) {
        return (
            <div>
                {<img src={down[(index + 1 % 2)]} height={h}></img>}
            </div>
        )
    }
    //neutral/initial state: 
    else {
        return (
            <div>
                {<img src={right[(index + 1 % 2)]} height={h}></img>}
            </div>
        )
    }
}

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
