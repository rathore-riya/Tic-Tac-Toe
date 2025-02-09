import React, { useState } from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import Icons from './components/Icons';


function App(): JSX.Element {
  const [iscross, SetIsCross] = useState<boolean>(false)
  const [gamewinner, setGameWinner] = useState<string>('')
  const [gameState, SetGameState] = useState(new Array(9).fill('empty', 0, 9))

  const reloadgame = () => {
    SetIsCross(false)
    setGameWinner('')
    SetGameState(new Array(9).fill('empty', 0, 9))
  }

  const checkIsWinner = () => {
    if (
      gameState[0] === gameState[1] &&
      gameState[0] === gameState[2] &&
      gameState[0] !== 'empty'
    ) {
      setGameWinner(`${gameState[0]} won the game! 🥳`);
    } else if (
      gameState[3] !== 'empty' &&
      gameState[3] === gameState[4] &&
      gameState[4] === gameState[5]
    ) {
      setGameWinner(`${gameState[3]} won the game! 🥳`);
    } else if (
      gameState[6] !== 'empty' &&
      gameState[6] === gameState[7] &&
      gameState[7] === gameState[8]
    ) {
      setGameWinner(`${gameState[6]} won the game! 🥳`);
    } else if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[3] &&
      gameState[3] === gameState[6]
    ) {
      setGameWinner(`${gameState[0]} won the game! 🥳`);
    } else if (
      gameState[1] !== 'empty' &&
      gameState[1] === gameState[4] &&
      gameState[4] === gameState[7]
    ) {
      setGameWinner(`${gameState[1]} won the game! 🥳`);
    } else if (
      gameState[2] !== 'empty' &&
      gameState[2] === gameState[5] &&
      gameState[5] === gameState[8]
    ) {
      setGameWinner(`${gameState[2]} won the game! 🥳`);
    } else if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[4] &&
      gameState[4] === gameState[8]
    ) {
      setGameWinner(`${gameState[0]} won the game! 🥳`);
    } else if (
      gameState[2] !== 'empty' &&
      gameState[2] === gameState[4] &&
      gameState[4] === gameState[6]
    ) {
      setGameWinner(`${gameState[2]} won the game! 🥳`);
    } else if (!gameState.includes('empty', 0)) {
      setGameWinner('Draw game... ⌛️');
    }
  }

  const onChangeItem = (itemNumber: number) => {
    if (gamewinner) {
      return Snackbar.show({
        text: gamewinner,
        backgroundColor: '#000000',
        textColor: '#FFFFFF'
      })
    }
    if(gameState[itemNumber]==='empty'){
      gameState[itemNumber] = iscross ? 'cross' : 'circle'
      SetIsCross(!iscross)
    }
    else {
      return Snackbar.show({
        text: "Place is already filled",
        backgroundColor: "red",
        textColor: "#FFF"
      })
    }
      checkIsWinner()
    }

  return (
    <SafeAreaView >
      <StatusBar />
      {gamewinner ? (
        <View style={[styles.playerInfo, styles.winnerInfo]}>
          <Text style={styles.winnerTxt}>{gamewinner}</Text>
        </View>
      ) : (
        <View style={[
          styles.playerInfo,
          iscross ? styles.playerX : styles.playerO]}>
          <Text style={styles.gameTurnTxt}>
            Player {iscross ? "X" : " O"}'s turn
          </Text>
        </View>
      )}

      <FlatList 
      numColumns={3}
      data={gameState}
      style={styles.grid}
      renderItem={({item,index}) => (
        <Pressable
        key={index}
        style={styles.card}
        onPress={ () => onChangeItem(index)
        }>
          <Icons name={item} />
        </Pressable>
      )}
      />

      <Pressable
      style={styles.gameBtn}
      onPress={reloadgame}>
        <Text style={styles.gameBtnText}>
          {gamewinner ? 'Start new game':'Reload new game'}
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  playerInfo: {
    height: 56,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 4,
    paddingVertical: 8,
    marginVertical: 12,
    marginHorizontal: 14,

    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  gameTurnTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  playerX: {
    backgroundColor: '#38CC77',
  },
  playerO: {
    backgroundColor: '#F7CD2E',
  },
  grid: {
    margin: 12,
  },
  card: {
    height: 100,
    width: '33.33%',

    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 1,
    borderColor: '#333',
  },
  winnerInfo: {
    borderRadius: 8,
    backgroundColor: '#38CC77',

    shadowOpacity: 0.1,
  },
  winnerTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  gameBtn: {
    alignItems: 'center',

    padding: 10,
    borderRadius: 8,
    marginHorizontal: 36,
    backgroundColor: '#8D3DAF',
  },
  gameBtnText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});

export default App;
