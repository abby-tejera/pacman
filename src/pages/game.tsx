import styles from '../styles/Game.module.css'
import { Pacman } from '../components/Pacman'
import { Ghost } from '../components/Ghost'
import { useGame } from '../hooks/useGame'
import { Snack } from '../components/Snack'
import { PowerUp } from '../components/PowerUp'
import { Walls } from '../components/Walls'
import module from 'module'


// import { AudioHTMLAttributes } from 'react'



// import {html} from "./file.html";
// import "src/pacman_beginning.wav"
// Game page (url: '/game')
export default function Game() {
  const {
    containerWidth,
    containerHeight,
    ghosts,
    snacks,
    powerUps,
  } = useGame()

  // const loadFile = "src/pacman_beginning.wav";

  // const audioElement = new Audio("src/pacman_beginning.wav");
  // audioElement.addEventListener("loadeddata", () => {
  //   let duration = audioElement.duration;
  // });
  // audioElement.addEventListener("canplaythrough", (event) => {
    /* the audio is now playable; play it if permissions allow */
    // audioElement.play();
  // });

  // audioElement.addEventListener('playing', function() {
    // console.log(audioElement.duration());
  // }, false);

  
  return (

    <div className={styles.page}>
      {/* audioElement.play() */}
      <svg
        className={styles.container}
        xmlns="http://www.w3.org/2000/svg"
        width={containerWidth}
        height={containerHeight}
      >
        <Walls />

        {snacks.map(snack => (
          <Snack key={snack.id} snack={snack} />
        ))}

        {powerUps.map(powerUp => (
          <PowerUp key={powerUp.id} powerUp={powerUp} />
        ))}

        <Pacman />

        {ghosts.map(ghost => (
          <Ghost key={ghost.id} ghost={ghost} />
        ))}
      </svg>
      <audio preload='auto' controls >
        <source src="../src/pages/Pac_man_Long_Compilation_N_2.mp3" type="audio/mpeg"/>
        Your browser does not support audio tag
      </audio>
    </div>
  )
}
