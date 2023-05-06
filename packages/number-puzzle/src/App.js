import * as React from 'react'
import { useState, useEffect } from 'react'
import { Box, Button } from '@mui/material'
import { addIndex, map } from 'ramda'

import './App.css'

const key = [
  80, 210, 17, 76, 214, 3, 208, 197, 46, 113, 211, 10, 157, 31, 25,
  30, 7, 216, 28, 8, 175, 180, 72, 134, 91, 83, 27, 222, 150, 152,
  18, 58, 133, 225, 99, 128, 33, 57, 29, 32, 224, 116, 44, 207, 100,
  59, 71, 92, 19, 142, 2, 120, 196, 192, 52, 190, 199, 49, '', '',
]
const lock = [
  'S', 5, 6, 1, 10, 17, 24, 22, 4, 20, 16,13, 7, 2, 'W',
  13, 18, 20, 8, 3, 166, 1, 17, 12, 19, 11, 14, 5, 23, 9,
  15, 15, 24, 26, 35, 146, 6, 71, 16, 9, 100, 7, 2, 21, 17,
  18, 198, 2, 15, 8, 21, 24, 4, 11, 3, 12, 20, 23, 14, 8,
  13, 27, 101, 87, 2, 11, 16, 22, 199, 3, 5, 26, 7, 83, 116,
  5, 39, 16, 179, 20, 8, 154, 15, 9, 24, 7, 50, 0, 128, 29,
  18, 20, 99, 88, 2, 22, 25, 1, 19, 15, 13, 12, 17, 14, 30,
  11, 21, 63, 32, 10, 11, 73, 'H', 7, 23, 15, 3, 73, 37, 5,
  177, 3, 22, 44, 52, 66, 26, 9, 4, 7, 89, 48, 15, 5, 12,
  21, 16, 19, 9, 2, 7, 18, 20, 147, 17, 8, 107, 4, 18, 14,
  33, 5, 55, 22, 144, 17, 23, 146, 1, 1, 24, 13, 43, 50, 18,
  37, 68, 39, 49, 25, 9, 51, 200, 6, 5, 9, 8, 4, 6, 14,
  11, 16, 3, 61, 7, 26, 92, 109, 13, 20, 22, 9, 190, 60, 12,
  19, 21, 78, 23, 10, 2, 11, 14, 25, 16, 10, 18, 15, 1, 8,
  'E', 17, 23, 5, 14, 19, 21, 13, 11, 122, 12, 9, 3, 6, 'N',
]
const COLS = 15
const KEY_ROWS = 4

const Cell = ({ value, highlight }) => (
  <Box sx={{ border: 1, borderColor: highlight ? "#282c34" : "#151618", backgroundColor: highlight ? "#151618" : "#30353F", width: 40, height: 40, fontSize: 16, display: "flex", flexDirection: "column", justifyContent: "center" }} gridColumn="span 1">{value}</Box>
)

const computeData = ({ overlay: [overlayStart, OverlayEnd], mod,  }) => addIndex(map)((x, i) => {
  const isOverlayed = i >= overlayStart && i < OverlayEnd
  const y = key[i - overlayStart]
  const notNumbers = isNaN(y) || isNaN(x)
  const invalid = notNumbers || !isOverlayed || mod === 'nothing'
  const value = invalid ? x : (
    mod === 'add' ? x + y : (mod === 'subtract' ? x - y : y - x)
  )
  return { value, highlight: isOverlayed }
})

function App() {
  const [overlay, setOverlay] = useState([0, COLS * KEY_ROWS])
  const [mod, setMod] = useState('nothing')
  const [data, setData] = useState(lock)
  useEffect(() => {
    setData(computeData({ overlay, mod })(lock))
  }, [overlay, mod])
  const up = () => {
    setOverlay([overlay[0] - COLS, overlay[1] - COLS])
  }
  const down = () => {
    setOverlay([overlay[0] + COLS, overlay[1] + COLS])
  }
  const nothing = () => { setMod('nothing') }
  const add = () => { setMod('add') }
  const subtract = () => { setMod('subtract') }
  const subtract2 = () => { setMod('subtract2') }
  return (
    <div className="App">
      <Box display="grid" gridTemplateColumns="repeat(6, 1fr)" gap={2}>
        <Box gridColumn="span 1"><Button variant="outlined" onClick={up}>UP</Button></Box>
        <Box gridColumn="span 1"><Button variant="outlined" onClick={down}>DOWN</Button></Box>
        <Box gridColumn="span 1"><Button variant={mod === 'nothing' ? "contained" : "outlined"} onClick={nothing}>b</Button></Box>
        <Box gridColumn="span 1"><Button variant={mod === 'add' ? "contained" : "outlined"} onClick={add}>a + b</Button></Box>
        <Box gridColumn="span 1"><Button variant={mod === 'subtract' ? "contained" : "outlined"} onClick={subtract}>a - b</Button></Box>
        <Box gridColumn="span 1"><Button variant={mod === 'subtract2' ? "contained" : "outlined"} onClick={subtract2}>b - a</Button></Box>
      </Box>
      <br/>
      <Box display="grid" gridTemplateColumns="repeat(16, 1fr)" gap={2}>
        <Box gridColumn="span 1" sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>A</Box>
        <Box gridColumn="span 15">
          <Box display="grid" gridTemplateColumns="repeat(15, 1fr)" gap={0}>
            {map(x => <Cell value={x} highlight="true" />)(key)}
          </Box>
        </Box>
      </Box>
      <br/>
      <Box display="grid" gridTemplateColumns="repeat(16, 1fr)" gap={2}>
        <Box gridColumn="span 1" sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>B</Box>
        <Box gridColumn="span 15">
          <Box display="grid" gridTemplateColumns="repeat(15, 1fr)" gap={0}>
            {map((props) => <Cell {...props} />)(data)}
          </Box>
        </Box>
      </Box>
    </div>
  )
}

export default App
