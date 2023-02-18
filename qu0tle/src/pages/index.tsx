import styles from '@/styles/Home.module.css'
import CharacterGrid from '@/components/CharacterGrid'
import React from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

interface Phrase {
  readonly startingPhrase: string;
  readonly actualPhrase: string;
}

interface IndexProps {
  readonly One: Phrase;
  readonly Two: Phrase;
  readonly Three: Phrase;
  readonly Four: Phrase;
}

export default function Home(props: IndexProps) {
  const [currentPhrase, setCurrentPhrase] = React.useState(props.One.startingPhrase);
  const [success, setSuccess] = React.useState(false)
  const [matched, setMatched] = React.useState(false)

  function handleSwap(newPhrase: string) {
    setCurrentPhrase(newPhrase)
    if (newPhrase == props.Four.actualPhrase) setSuccess(true)
    else if (newPhrase == props.Three.actualPhrase) gotoNextPhrase(props.Four)
    else if (newPhrase == props.Two.actualPhrase) gotoNextPhrase(props.Three)
    else if (newPhrase == props.One.actualPhrase) gotoNextPhrase(props.Two)
  }

  function gotoNextPhrase(nextPhrase: Phrase) {
    setMatched(true)
    setTimeout(() => {
      setCurrentPhrase(nextPhrase.startingPhrase)
      setMatched(false)
    }, 2000)
  }

  return (
    <>
      <main>
        <div className={styles.center}>
          <Box>
            <CharacterGrid phrase={currentPhrase} onSwap={handleSwap} matched={matched}></CharacterGrid>
          </Box>
        </div>
        <Alert hidden={!success} severity="success">You got it!</Alert>
      </main>
    </>
  )
}

export async function getStaticProps() {
  const props: IndexProps = {
    One: {
      startingPhrase: "2mR? o3o7",
      actualPhrase: "Room 237?"
    },
    Two: {
      startingPhrase: ".ehtmGebvai e t ",
      actualPhrase: "Give me the bat."
    },
    Three: {
      startingPhrase: "aF.cheheeFurn  cKspi trdn",
      actualPhrase: "French Fries and Ketchup."
    },
    Four: {
      startingPhrase: " oi.ltmgOsh.ue..alw  drsohiol llb or",
      actualPhrase: "Oh...well this is our gold ballroom."
    },
  }
  return {
    props: props
  }
}