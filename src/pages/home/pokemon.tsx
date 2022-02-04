import React, { useState, useEffect } from "react";
import { StyleSheet, Text, Image, View } from "react-native";

interface Pokemon {
  name: String,
  abilities: [String],
  types: [String]
}

const sprites = [
  'back_default',
  'back_female',
  'back_female',
  'back_shiny_female',
  'front_default',
  'front_female',
  'front_shiny',
  'front_shiny_female',

]

const colors = {
  'fire': '#EC8484',
  'water': '#6698FC',
  'grass': '#4E9A35',
  'electric': '#FDFA99',
  'ground': '#CC9966',
  'psychic': '#1E4318',
  'dark': '#333333',
  'steel': '#808080',
  'rock': '#D67B3C',
  'poison': '#C596BD',
  'ghost': '#5D6CB4',
  'ice': '#61CBBA',
  'bug': '#7FBD0A',
  'flying': '#44D2F2',
  'fighting': '#CE3E2C',
  'normal': '#563317',
  'dragon': '#186CC3',
  'fairy': '#E753CA',
  'unknown': '#5D6CB4',
}


export const Pokemon = (props : any) => {
    const linkPokemon = props.route.params.linkPokemon;
    const [pokemon, setPokemon] = useState<Pokemon>();
    const pokemonNumber = linkPokemon.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', '');
    const imgPokemon = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/'+pokemonNumber+'.png';

    useEffect(() => {
        fetch(linkPokemon)
        .then(response => response.json())
        .catch(err => console.log(err))
        .then(response => setPokemon(response));
    }, []);

  if(pokemon == null){
    return null
  }

  return (
    <View style={ styles.container}>
      <Text style={ styles.name }> { pokemon.name } </Text>
      <Image style={ styles.image } source={{ uri: imgPokemon }} />

      <View style={ styles.descriptions }>
        <Text style={ styles.title }> Abilities: </Text>
        {
          pokemon.abilities.map((item, index) => (<Text style={ styles.descriptionsText } key={index}> &#8226; { item.ability.name }</Text>))
        }
      </View>

      <Text style={ styles.title }> Types: </Text>
      <View style={ styles.wrapperTypes }>
        {
          pokemon.types.map((item, index) => (<Text style={[ styles.descriptionsType, {backgroundColor: colors[item.type.name] } ]} key={index}>{ item.type.name }</Text>))
        }
      </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center",paddingHorizontal: 16, backgroundColor: '#262626'},
  image: { width: 300, height: 300},
  name: { fontSize: 64, color: '#F5F5F5'},
  title: { width: '100%', color: '#FFF', fontSize: 32, marginBottom: 8},
  descriptions: { width: '100%', marginBottom: 32},
  descriptionsText: { fontSize: 24, color: '#FFF'},
  wrapperTypes: {flexDirection: 'row',  alignSelf: 'stretch', marginBottom: 32},
  descriptionsType: { color: '#FFF', fontSize: 16, borderRadius: 8, paddingHorizontal: 32, paddingVertical: 8, marginRight: 16},
});