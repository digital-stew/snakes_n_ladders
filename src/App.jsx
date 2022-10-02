import { useEffect, useRef, useState } from "react";
  const numbers = [100,99,98,97,96,95,94,93,92,91,
                   81,82,83,84,85,86,87,88,89,90,
                   80,79,78,77,76,75,74,73,72,71,
                   61,62,63,64,65,66,67,68,69,70,
                   60,59,58,57,56,55,54,53,52,51,
                   41,42,43,44,45,46,47,48,49,50,
                   40,39,38,37,36,35,34,33,32,31,
                   21,22,23,24,25,26,27,28,29,30,
                   20,19,18,17,16,15,14,13,12,11,
                   1,2,3,4,5,6,7,8,9,10
                  ]
  const ladders = {1:38,4:14,9:31,21:42,28:84,51:67,72:91,80:99}
  const snakes = {98:79,95:75,93:73,87:36,64:60,62:19,54:34,17:7}
function App() {
 const [playerPosition,setplayerPosition] = useState(0)
 const roll = useRef(0)
 const rollCount = useRef(0)
 const snakesTaken = useRef(0)
 const laddersTaken = useRef(0)
 const [showroll, setShowroll] = useState(true)
 const [showSnake, setShowSnake] = useState(false)
 const [showLadder, setShowLadder] = useState(false) 
  

 useEffect(()=>{
  for (const property in ladders) {
    if(playerPosition === parseInt(property)){
      setplayerPosition(playerPosition+1) //?bug fix
      setShowLadder(true)
      laddersTaken.current++
      setShowroll(false)
      setTimeout(() => {
        setplayerPosition(ladders[property])
        setShowroll(true)
        setShowLadder(false)
      }, 1500);
      
    }
  }
  for (const property in snakes) {
    if(playerPosition === parseInt(property)){
      setplayerPosition(playerPosition-1) //?bug fix
      setShowSnake(true)
      snakesTaken.current++
      setShowroll(false)
      setTimeout(() => {
        setplayerPosition(snakes[property])
        setShowroll(true)
        setShowSnake(false)
      }, 1500);
    }
  } 
  if(playerPosition > 100) {
    alert(`you won!! \n 
          rolls:${rollCount.current} \n 
          ladders taken:${laddersTaken.current} \n
          snakes taken:${snakesTaken.current}`)
    laddersTaken.current = 0
    snakesTaken.current = 0
    rollCount.current = 0
    roll.current = 0
    setplayerPosition(0)
  }
 },[playerPosition]) 

 function handleRoll(){
  roll.current = Math.floor((Math.random() * 6) + 1);
  setplayerPosition(playerPosition+roll.current)
  rollCount.current++
 }
 
  return (
    <>
    <h1>snakes and ladders</h1>
    <h3>can you make it to the end?</h3>
    <div className="game" >
      {showSnake && <div className="snake"> </div>}
      {showLadder && <div className="ladder"> </div>}
      <div className="image"></div>
      {numbers.map(number =>{
        let playerPos = null
        if(playerPosition == number)  playerPos = 'player' 
        
        return(
          <div key={number} className={`box ${number} ${playerPos} `}></div>
        )
      })}
    </div>
    <div className="controles">
      <div className="noSelect">ladders taken: {laddersTaken.current} snakes taken: {snakesTaken.current}</div>
      <div className="noSelect">roll count: {rollCount.current}  </div>
      <div className="noSelect">your roll: {roll.current}</div>
      {showroll && <div className="btn" onClick={handleRoll}>roll</div> }
      <div>thanx to <a href="https://www.shutterstock.com">shutterstock.com </a> </div>
      </div>
      
    </>
  );
}

export default App;

