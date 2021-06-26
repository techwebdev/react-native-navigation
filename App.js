/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect, useMemo} from 'react';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MainTabScreen from './screens/MainTabScreen';
import DrawerContent from './screens/DrawerContent';
import SupportScreen from './screens/SupportScreen';
import SettingsScreen from './screens/SettingsScreen';
import BookmarksScreen from './screens/BookmarksScreen';
import RootStackScreen from './screens/RootStackScreen';
import {ActivityIndicator} from 'react-native-paper';
import {View} from 'react-native';
import {AuthContext} from './components/context';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Provider as PapperProvider,
  DarkTheme as PapperDarkTheme,
  DefaultTheme as PapperDefaultTheme,
} from 'react-native-paper';
const Drawer = createDrawerNavigator();

const App = () => {
  // const [isLoading, setIsLoading] = useState(true);
  // const [userToken, setUserToken] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PapperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PapperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333',
    },
  };

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PapperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PapperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff',
    },
  };

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const loginReducer = (preState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...preState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...preState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...preState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...preState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );
  const authContext = useMemo(
    () => ({
      signIn: async foundUser => {
        const userToken = String(foundUser?.[0]?.userToken);
        const userName = foundUser?.[0]?.email;
        try {
          await AsyncStorage.setItem('userToken', userToken);
        } catch (error) {
          console.log({error});
        }

        dispatch({type: 'LOGIN', id: userName, token: userToken});
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('userToken');
        } catch (error) {
          console.log({error});
        }
        dispatch({type: 'LOGOUT'});
        // setUserToken(null);
        // setIsLoading(false);
      },
      signUp: (userName, password) => {
        let userToken = null;
        if (userName === 'amit' && password === 'password') {
          userToken = 'qwert';
        }
        dispatch({type: 'REGISTER', id: userName, token: userToken});
      },
      toggleTheme: () => {
        setIsDarkTheme(isDarkTheme => !isDarkTheme);
      },
    }),
    [],
  );

  useEffect(() => {
    setTimeout(async () => {
      // setIsLoading(false);
      let userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (error) {
        console.log({error});
      }
      dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#009387" />
      </View>
    );
  }

  return (
    <PapperProvider theme={theme}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer theme={theme}>
          {loginState.userToken != null ? (
            <Drawer.Navigator
              drawerContent={props => <DrawerContent {...props} />}>
              <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
              <Drawer.Screen name="Support" component={SupportScreen} />
              <Drawer.Screen name="Settings" component={SettingsScreen} />
              <Drawer.Screen name="Bookmarks" component={BookmarksScreen} />
            </Drawer.Navigator>
          ) : (
            <RootStackScreen />
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    </PapperProvider>
  );
};

export default App;
