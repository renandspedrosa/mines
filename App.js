import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import params from './src/params';
import MineField from './src/components/MineField';
import { createMinedBoard } from './src/functions';


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
    }
  }
  
  const [states, setstates] = useState(createState())

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <Text>Iniciando o Mines!</Text>
      <Text>Tamanho da grade: {params.getRowsAmount()} X {params.getColumnsAmount()} </Text>
      <View style={styles.board}>
        <MineField board={states.board} />
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