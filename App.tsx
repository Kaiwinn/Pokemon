import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import PokemonList from './components/PokemonList';
import {store} from './myApp/store';
import {Provider} from 'react-redux';
const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView>
        <View>
          <PokemonList />
        </View>
      </SafeAreaView>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
