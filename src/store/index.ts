import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { coursesReducer } from './courses/reducer';
import thunk from 'redux-thunk';
import { authorsReducer } from './authors/reducer';
import { CoursesAction } from './courses/coursesActions.interface';
import { AuthorsAction } from './authors/authorsActions.interface';
import { userReducer } from './user/reducer';
import { UserAction } from './user/userActions.interface';

const rootReducer = combineReducers({
	courses: coursesReducer,
	authors: authorsReducer,
	user: userReducer,
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppActions = CoursesAction | AuthorsAction | UserAction;
