import React from 'react';
import { DrawerNavigator, StackNavigator } from 'react-navigation';

import Courses from './screens/Courses';
import GameModes from './screens/GameModes';
import Home from './screens/Home';
import Levels from './screens/Levels';
import Login from './screens/Login';
import Logout from './screens/Logout';
import Profile from './screens/Profile';
import Settings from './screens/Settings';
import Signin from './screens/Signin';



const Root = StackNavigator({
  Login: {
    screen: Login,
  },
  Signin: {
    screen: Signin,
  },
  Home: {
    screen: Home,
  },
  GameModes: {
    screen: GameModes,
  },
  Levels: {
    screen: Levels,
  },
  Courses: {
    screen: Courses,
  },
  Profile: {
    screen: Profile,
  },
  Settings: {
    screen: Settings,
  },
  Logout: {
    screen: Logout,
  },

},
{
  initialRouteName: 'Login',
  navigationOptions: {
    headerVisible: true,
  },
})

/* Block the BACK action on the Home screen (don't go back to Login) */
Root.router = {
  ...Root.router,
   getStateForAction(action, state) {
    console.log('IN THE GET_STATE_FOR_ACTION FUNCTION !');
    if (
      state.routeName === 'Home' &&
      action.type === NavigationActions.BACK 
    ) {
      return null;
    }
    return Root.router.getStateForAction(action, state);
  },
};

export { Root };

/*
export const PlayStack = StackNavigator({
  GameModes: {
    screen: GameModes,
  },
  Levels: {
    screen: Levels,
  },
  Courses: {
    screen: Courses,
  },
},
{
  initialRouteName: 'GameModes',
  navigationOptions: {
    headerVisible: true,
  },
})


export const HamburgerStack = DrawerNavigator({
  Profile: {
    screen: Profile,
  },
  Settings: {
    screen: Settings,
  },
  Logout: {
    screen: Logout,
  },
},);

export const MainStack = StackNavigator({
  Home: {
    screen: Home,
  },
  GameModes: {
    screen: GameModes,
  },
  Levels: {
    screen: Levels,
  },
  Courses: {
    screen: Courses,
  },
  Profile: {
    screen: Profile,
  },
  Settings: {
    screen: Settings,
  },
  Logout: {
    screen: Logout,
  },
},
{
  initialRouteName: 'Home',
  navigationOptions: {
    headerVisible: true,
  },
})
*/

