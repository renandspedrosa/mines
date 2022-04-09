import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import params from './src/params';
import MineField from './src/components/MineField';
import { createMinedBoard, cloneBoard, openField, hadExplosion, showMines, wonGame, invertFlag } from './src/functions';


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
      lost: false
    }
  }
  const [states, setstates] = useState(createState())

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

    setstates({board, lost, won})
  }

  onSelectField = (row, column) => {
    const board = cloneBoard(states.board)
    invertFlag(board,row,column)
    const won = wonGame(board)

    if(won){
      Alert.alert('Parabéns', 'você ganhou!!!')
    }
    setstates({board, won})
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <Text>Iniciando o Mines!</Text>
      <Text>Tamanho da grade: {params.getRowsAmount()} X {params.getColumnsAmount()} </Text>
      <View style={styles.board}>
        <MineField board={states.board} 
                  onOpenField={onOpenField}
                  onSelectField={onSelectField} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  board:{
    alignItems:'center',
    backgroundColor:'#AAA'
  }
});