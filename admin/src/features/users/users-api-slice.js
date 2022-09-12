import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';

import { apiSlice } from '../../app/api/api-slice';

const usersAdapter = createEntityAdapter({});

const initialState = usersAdapter.getInitialState();
