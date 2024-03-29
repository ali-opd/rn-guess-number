import React, { useState } from 'react';
import { View, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert, Dimensions } from 'react-native';

import Colors from '../constants/colors';
import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

function StartGameScreen(props) {
  const [enteredValue, setEnterValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(null);

  function numberInputHandler(inputText) {
    setEnterValue(inputText.replace(/[^0-9]/g, ''));
  }

  function resetInputHandler() {
    setEnterValue('');
    setConfirmed(true);
  }

  function confirmInputHandler() {
    const choosenNumber = parseInt(enteredValue);
    if (isNaN(choosenNumber) || choosenNumber <= 0 || choosenNumber > 99) {
      Alert.alert('Invalid number!', 'Number has to be a number between 1 and 99.', [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]);
      return;
    }

    setConfirmed(true);
    setSelectedNumber(choosenNumber);
    setEnterValue('');
    Keyboard.dismiss();
  }

  let confirmedOutput;
  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <BodyText>Choosen Number: {selectedNumber}</BodyText>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton onPress={props.onStartGame.bind(this, selectedNumber)}>START GAME</MainButton>
      </Card>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <TitleText style={styles.title}>Start a New Game</TitleText>
        <Card style={styles.inputContainer}>
          <BodyText>Select a Number</BodyText>
          <Input
            onChangeText={numberInputHandler}
            value={enteredValue}
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            maxLength={2}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button onPress={resetInputHandler} title="Reset" color={Colors.accent} />
            </View>
            <View style={styles.button}>
              <Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary} />
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: 'open-sans-bold',
  },
  inputContainer: {
    width: '80%',
    // maxWidth: '80%',
    maxWidth: '95%',
    minWidth: 300,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  button: {
    // width: 90,
    width: Dimensions.get('window').width / 4,
  },
  input: {
    width: 50,
    textAlign: 'center',
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  text: {
    fontFamily: 'open-sans',
  },
});

export default StartGameScreen;
