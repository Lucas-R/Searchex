import React from "react";
import { FlatList, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';

export const ListPokemons = ({ list, search, myNavigate }) => {

  const viewPokemon = (link) => {
    myNavigate('pokemon', { linkPokemon: link });
  }

  let data = list.results.filter((item)=> {
    return item.name.indexOf(search.toLowerCase()) >= 0;
  })

  const renderItem = ( item ) => {

    const { name, url } = item.item;
    const pokemonNumber = url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', '');
    const imgPokemon = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/'+pokemonNumber+'.png';

    return (
    <TouchableOpacity style={ styles.card } onPress={() => viewPokemon(url)}> 
      <Image style={{ width: 100, height: 100}} source={{ uri: imgPokemon }} />
      <Text 
        style={ styles.namePokemon }
      > { name } </Text>
    </TouchableOpacity>
  )};

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
    />
  );
}

const styles = StyleSheet.create({
    card: {
      flexDirection: 'row', 
      backgroundColor: '#5C8EF2', 
      alignItems: "center",
      marginBottom: 5,
      borderRadius: 5,
    },
    namePokemon: {
        color: '#FFF',
        fontSize: 24
    }
})