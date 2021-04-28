import 'react-native-gesture-handler';

import * as React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import placesReducer from './store/places-reducer';

import { NavigationContainer } from '@react-navigation/native';
import PlacesNavigator from './navigation/PlacesNavigator';

const rootReducer = combineReducers({
	places: placesReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
  		<Provider store={store}>
	  		<NavigationContainer>
	  			<PlacesNavigator />
	  		</NavigationContainer>
	  	</Provider>
  	);
}