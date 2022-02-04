import React, { useEffect, useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Pressable, Text, SafeAreaView } from "react-native";
import { ListPokemons } from "./listPokemons";

interface Pokemon {
    results: object,
    previous: string,
    next: string
}

interface RegistrationProps {
    navigation: any;
}

export const Home = ({ navigation :  { navigate }} : RegistrationProps) => {
    const [listPokemons, setListPokemons] = useState<Pokemon>();
    const [searchPokemon, changeSearchPokemon] = useState('');
    const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/?limit=99999');

    useEffect(() => {
        fetch(url)
        .then(response => response.json())
        .catch(err => console.log(err))
        .then(response => setListPokemons(response));
    }, [url, searchPokemon]);

    if(listPokemons){
        let disabledPrevious = listPokemons.previous == null ? true : false;
        let disabledNext = listPokemons.next == null ? true : false;

        return(
            <View style={styles.container}>
                <TextInput
                    placeholder="Search pokemón"
                    style={styles.input}
                    onChangeText={changeSearchPokemon}
                    value={searchPokemon}
                />
                
                <ListPokemons list={listPokemons} search={searchPokemon} myNavigate={navigate} />
    
                <SafeAreaView style={ styles.wrapperPagination }>
                    <Pressable
                        disabled={ disabledPrevious }
                        style={ disabledPrevious ? styles.buttonDisabled : styles.button }
                        onPress={() => setUrl(listPokemons.previous)}
                    >
                        <Text style={styles.text}> Previous </Text>
                    </Pressable>
                    <TouchableOpacity
                        disabled={ disabledNext }
                        style={ disabledNext ? styles.buttonDisabled : styles.button }
                        onPress={() => setUrl(listPokemons.next)}
                    >
                        <Text style={styles.text}> Next </Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </View>
        );
    }

    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Text> Is loading... </Text></View>
    );
}

const styles = StyleSheet.create({ 
    container: {
        flex: 1,
    },
    input: {
        height: 60,
        margin: 16,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        color: '#FFF',
        fontSize: 24,
    },  
    wrapperPagination: {
        flex: 1,
        width: "100%",
        height: 50,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    buttonDisabled: {
        width: "40%",
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        backgroundColor: '#F5F5F5'
    },
    button: {
        width: "40%",
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        backgroundColor: '#F2C744'
      },
      text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#FFF',
      },
  });