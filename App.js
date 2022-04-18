import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import params from './src/params';
import MineField from './src/components/MineField';
import { 
    createMinedBoard,
    cloneBoard, 
    openField, 
    hadExplosion, 
    showMines, 
    wonGame, 
    invertFlag,
    flagsUsed
} from './src/functions';
import Header from './src/components/Header';
import LevelSelect from './src/screens/LevelSelect';


export default function App() {
  
  minesAmount = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return Math.ceil(cols * rows * params.difficultLevel)
  }
  
  createState = () =>{
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return {
      board : createMinedBoard(rows, cols, minesAmount()),
      won: false,
      lost: false,
      showLevelSelection:false
    }
  }
  let [states, setState] = useState(createState())

  onOpenField = (row, column)=>{
    const board = cloneBoard(states.board)
    openField(board, row, column)
    const lost = hadExplosion(board)
    const won = wonGame(board)

    if(lost){
      showMines(board)
      Alert.alert('Perdeuuu !!!!', 'Errou')
    }

    if(won){
      Alert.alert('Parabéns','Você ganhou!!!')
    }

    setState({board, lost, won})
  }

  onSelectField = (row, column) => {
    const board = cloneBoard(states.board)
    invertFlag(board,row,column)
    const won = wonGame(board)

    if(won){
      Alert.alert('Parabéns', 'você ganhou!!!')
    }
    setState({board, won})
  }

  onLevelSelected = level => {
      params.difficultLevel = level
      setState(createState())
  }
  return (
    <View style={estilo.container}>
       <LevelSelect isVisible={states.showLevelSelection}
                  onLevelSelected={onLevelSelected}
                  onCalcel={()=>setState({showLevelSelection:false})}
      /> 
      <Header 
        flagsLeft={minesAmount() - flagsUsed(states.board)}
        onNewGame={()=>setState(createState())}
        onFlagPress={()=> setState({showLevelSelection:true})}
      />
      <View style={estilo.board}>
        <MineField board={states.board} 
                  onOpenField={onOpenField}
                  onSelectField={onSelectField} 
          />
      </View>
      <StatusBar style="auto" />
    </View>
  )
}

const estilo = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  board:{
    alignItems:'center',
    backgroundColor:'#AAA'
  }
});