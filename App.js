import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Start from './component/startingscreen';
import SignupScreen from './component/signin';

const Stack = createStackNavigator();
 // Create your Redux store with the root reducer

const App = () => {
  return (
     <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Start"
            component={Start}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="sigin"
            component={SignupScreen}
            options={{
              headerShown: false,
            }}
          />
         
          {/* <Stack.Screen
            name="Map"
            component={MapScreen}
            options={{
              headerShown: false,
            }}
          /> */} 
        </Stack.Navigator>
      </NavigationContainer>
  
  );
};

export default App;