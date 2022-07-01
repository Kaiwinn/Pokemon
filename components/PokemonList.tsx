import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {PokemonClient} from 'pokenode-ts';
import Pokemon, {Stats} from '../models/Pokemon';
import {useAppDispatch, useAppSelector} from '../myApp/hooks';
import {setPokemon} from '../features/pokemon/pokemonSlice';
import {
  decrement,
  decrementByAmount,
  increment,
  incrementByAmount,
  reset,
} from '../features/counter/counterSlice';
import {colors} from '../constants/colors';

const PokemonList = () => {
  const dispatch = useAppDispatch();
  const currentPokemon = useAppSelector(state => state.pokemon);
  const counter = useAppSelector(state => state.counter.value);

  useEffect(() => {
    const fetchPokemon = async () => {
      const api = new PokemonClient();
      await api
        .getPokemonById(counter)
        .then(pokemon => {
          const currentPokemonStats: Stats = {
            hp: pokemon.stats[0].base_stat,
            attack: pokemon.stats[1].base_stat,
            defense: pokemon.stats[2].base_stat,
            specialAttack: pokemon.stats[3].base_stat,
            specialDefense: pokemon.stats[4].base_stat,
            speed: pokemon.stats[5].base_stat,
          };
          const newPokemon: Pokemon = {
            id: pokemon.id,
            name: pokemon.name,
            image: pokemon?.sprites?.front_default?.toString(),
            height: pokemon.height,
            weight: pokemon.weight,
            type: pokemon?.types[0]?.type?.name?.toString(),
            move: pokemon?.moves[0]?.move?.name?.toString(),
            stats: currentPokemonStats,

            color:
              pokemon?.types[0]?.type?.name?.toString() == 'grass'
                ? colors.grass
                : pokemon?.types[0]?.type?.name?.toString() == 'fire'
                ? colors.fire
                : pokemon?.types[0]?.type?.name?.toString() == 'water'
                ? colors.water
                : pokemon?.types[0]?.type?.name?.toString() == 'electric'
                ? colors.electric
                : pokemon?.types[0]?.type?.name?.toString() == 'ice'
                ? colors.ice
                : pokemon?.types[0]?.type?.name?.toString() == 'fighting'
                ? colors.fighting
                : pokemon?.types[0]?.type?.name?.toString() == 'poison'
                ? colors.poison
                : pokemon?.types[0]?.type?.name?.toString() == 'ground'
                ? colors.ground
                : pokemon?.types[0]?.type?.name?.toString() == 'flying'
                ? colors.flying
                : pokemon?.types[0]?.type?.name?.toString() == 'psychic'
                ? colors.psychic
                : pokemon?.types[0]?.type?.name?.toString() == 'bug'
                ? colors.bug
                : pokemon?.types[0]?.type?.name?.toString() == 'rock'
                ? colors.rock
                : pokemon?.types[0]?.type?.name?.toString() == 'ghost'
                ? colors.ghost
                : pokemon?.types[0]?.type?.name?.toString() == 'dragon'
                ? colors.dragon
                : pokemon?.types[0]?.type?.name?.toString() == 'dark'
                ? colors.dark
                : pokemon?.types[0]?.type?.name?.toString() == 'steel'
                ? colors.steel
                : pokemon?.types[0]?.type?.name?.toString() == 'fairy'
                ? colors.fairy
                : pokemon?.types[0]?.type?.name?.toString() == 'normal'
                ? colors.normal
                : colors.black,
          };
          dispatch(setPokemon(newPokemon));
        })
        .catch(err => {
          console.log(err);
        });
    };
    fetchPokemon();
  }, [counter, dispatch]);

  const handleNextButton = () => {
    dispatch(increment());
  };

  const handlePrevButton = () => {
    dispatch(decrement());
  };

  const handleIncrementByAmount = (value: number) => {
    dispatch(incrementByAmount(value));
  };

  const handleDecrementByAmount = (value: number) => {
    dispatch(decrementByAmount(value));
  };

  const StatLine = (props: {
    number: number | undefined;
    color: string | undefined;
  }) => {
    return (
      <View
        style={{
          width: props.number,
          height: 5,
          marginVertical: 8,
          marginLeft: 10,
          borderRadius: 5,
          backgroundColor: props.color,
        }}
      />
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: currentPokemon.color,
        },
      ]}>
      <StatusBar barStyle={'light-content'} />
      <Image
        style={styles.pokeball}
        source={require('../constants/images/Pokeball.png')}
      />
      <View style={styles.whiteSheet} />
      <SafeAreaView>
        {/* name and number*/}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: 5,
          }}>
          <Text style={styles.pokeName}>
            {currentPokemon.name.charAt(0).toUpperCase() +
              currentPokemon.name.slice(1)}
          </Text>
          <Text
            style={[
              styles.pokeName,
              {textAlign: 'right', fontSize: 25, marginHorizontal: 20},
            ]}>
            #{currentPokemon.id}
          </Text>
        </View>
        {/* image and button*/}
        <View
          style={[
            styles.row,
            {
              height: 265,
            },
          ]}>
          <View>
            <TouchableOpacity style={styles.button} onPress={handlePrevButton}>
              <Image
                style={styles.btnImage}
                source={require('../constants/images/prev.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleDecrementByAmount(10)}>
              <Image
                style={styles.btnImage}
                source={require('../constants/images/left.png')}
              />
            </TouchableOpacity>
          </View>
          <Image
            source={{uri: currentPokemon.image}}
            style={styles.pokemonImage}
          />
          <View>
            <TouchableOpacity style={styles.button} onPress={handleNextButton}>
              <Image
                style={styles.btnImage}
                source={require('../constants/images/next.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleIncrementByAmount(10)}>
              <Image
                style={styles.btnImage}
                source={require('../constants/images/right.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* Pokemon types*/}
        <View
          style={[
            styles.pokemonTypeContainer,
            {
              alignSelf: 'center',
              backgroundColor: currentPokemon.color,
            },
          ]}>
          <Text style={styles.textType}>{currentPokemon.type}</Text>
        </View>

        {/* Pokemon About */}

        <View
          style={[
            styles.row,
            {
              justifyContent: 'center',
              marginTop: 10,
            },
          ]}>
          <View
            style={{
              alignItems: 'center',
              marginHorizontal: 10,
            }}>
            <Text
              style={{
                color: 'black',
              }}>
              ⚖️{' '}
              {currentPokemon.weight
                ?.toString()
                .slice(0, currentPokemon.weight.toString().length - 1)}
              .
              {currentPokemon.weight
                ?.toString()
                .slice(
                  currentPokemon.weight.toString().length - 1,
                  currentPokemon.weight.toString().length,
                )}{' '}
              kg
            </Text>
            <Text style={[styles.status, {marginStart: 5}]}>Weight</Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              marginHorizontal: 10,
            }}>
            <Text
              style={{
                color: 'black',
              }}>
              📏
              {currentPokemon.height
                ?.toString()
                .slice(0, currentPokemon.height.toString().length - 1)}
              .
              {currentPokemon.height
                ?.toString()
                .slice(
                  currentPokemon.height.toString().length - 1,
                  currentPokemon.height.toString().length,
                )}{' '}
              m
            </Text>

            <Text style={[styles.status, {marginStart: 5}]}>Height</Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              marginHorizontal: 10,
            }}>
            <Text
              style={{
                color: 'black',
              }}>
              {currentPokemon.move}
            </Text>
            <Text style={styles.status}>Move</Text>
          </View>
        </View>

        {/* Pokemon Abilities */}
        <View>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 20,
              marginTop: 20,
              color: currentPokemon.color,
            }}>
            Base stats
          </Text>
          <View
            style={[
              styles.row,
              {
                justifyContent: 'flex-start',
                marginHorizontal: 30,
                marginTop: 20,
              },
            ]}>
            <View
              style={{
                alignItems: 'flex-end',
                marginRight: 10,
              }}>
              <Text>HP</Text>
              <Text>Attack</Text>
              <Text>Defense</Text>
              <Text>Special Attack</Text>
              <Text>Special Defense</Text>
              <Text>Speed</Text>
            </View>
            <View
              style={{
                height: 100,
                width: 2,
                backgroundColor: '#b1b1b1',
                marginRight: 10,
              }}
            />
            <View>
              <Text>{currentPokemon.stats?.hp}</Text>
              <Text>{currentPokemon.stats?.attack}</Text>
              <Text>{currentPokemon.stats?.defense}</Text>
              <Text>{currentPokemon.stats?.specialAttack}</Text>
              <Text>{currentPokemon.stats?.specialDefense}</Text>
              <Text>{currentPokemon.stats?.speed}</Text>
            </View>

            <View>
              <StatLine
                number={currentPokemon.stats?.hp}
                color={currentPokemon.color}
              />
              <StatLine
                number={currentPokemon.stats?.attack}
                color={currentPokemon.color}
              />
              <StatLine
                number={currentPokemon.stats?.defense}
                color={currentPokemon.color}
              />
              <StatLine
                number={currentPokemon.stats?.specialAttack}
                color={currentPokemon.color}
              />
              <StatLine
                number={currentPokemon.stats?.specialDefense}
                color={currentPokemon.color}
              />
              <StatLine
                number={currentPokemon.stats?.speed}
                color={currentPokemon.color}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default PokemonList;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
  },
  pokeball: {
    position: 'absolute',
    right: 20,
    top: 50,
    height: 200,
    width: 200,
    opacity: 0.6,
  },
  pokeName: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'white',
    marginHorizontal: 20,
    textAlign: 'left',
  },
  pokemonImage: {
    width: 235,
    height: 235,
  },
  button: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 40,
  },
  btnImage: {
    width: 30,
    height: 30,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textType: {
    color: 'white',
    paddingHorizontal: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pokemonTypeContainer: {
    position: 'absolute',
    top: 280,
    height: 30,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  whiteSheet: {
    position: 'absolute',
    bottom: 30,
    borderRadius: 20,
    left: 10,
    backgroundColor: 'white',
    width: '94%',
    height: '60%',
  },
  status: {
    color: '#7e7e7e',
    marginTop: 10,
    fontSize: 12,
  },
});
