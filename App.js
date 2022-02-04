import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Home } from './src/pages/home';
import { Pokemon } from "./src/pages/home/pokemon";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="pokemonList" 
          component={Home} 
          options={{
            title: 'Pokemón list',
          }}
        />
        <Stack.Screen 
          name="pokemon" 
          component={Pokemon} 
          pokemonSelected={({ params }) => params}
          options={{
            title: 'Pokemón',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}