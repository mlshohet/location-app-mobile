import * as FileSystem from 'expo-file-system';

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';

import { insertPlace, fetchPlaces } from '../helpers/db';

export const addPlace = (title, image) => {
	return async dispatch => {
		const fileName = image.split('/').pop();
		const newPath = FileSystem.documentDirectory + fileName;

		let dbResult;
		try {
			await FileSystem.moveAsync({
				from: image,
				to: newPath
			});

			dbResult = await insertPlace(
				title, 
				newPath, 
				'Dummy address', 
				15.6, 
				12.3
			);

			console.log(dbResult);

		} catch(err) {
			console.log(err);
			throw err;
		}

		dispatch({
			type: ADD_PLACE,
			placeData: {
				id: dbResult.insertId,
				title: title,
				image: newPath,
			}
		})
	};
};

export const loadPlaces = () => {
	return async dispatch => {
		let dbResult;
		try {
			dbResult = await fetchPlaces();
			console.log(dbResult);
			dispatch({ 
			type: SET_PLACES,
			places: dbResult.rows._array,
		});
		} catch (err) {
			throw err;
		}
	};
};



