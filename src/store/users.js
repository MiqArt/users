import { createSlice } from '@reduxjs/toolkit';
import Storage from './Storage';

const slice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    edit: {
      editing: false,
      template: {}
    },
    search: {
      searching: false,
      findedUsers: []
    },
    filter: ""
  },
  reducers: {
    getUsers(state, action) {
      if (action.payload === "ALL_DATA" || !state.search.findedUsers.length) {
        const res = Storage.getData("usersAdminTask");
        state.users = res;
      } else {
        state.users = state.search.findedUsers
      }
    },
    createUser(state, action) {
      Storage.setItem("usersAdminTask", action.payload);
      state.users.push(action.payload);
    },
    editUser(state, action) {
      Storage.editItem("usersAdminTask", action.payload.id, action.payload);
      state.users.map(el => el.id === action.payload.id ? { ...el, ...action.payload, } : el);
    },
    removeUser(state, action) {
      Storage.removeItem("usersAdminTask", action.payload);
      return {
        ...state,
        users: state.users.filter(el => el.id !== action.payload)
      }
    },
    setEditing(state, action) {
      state.edit = action.payload
    },
    searchUsers(state, action) {
      if (action.payload) {
        const findedData = state.users.filter(el => el.email.toLowerCase().includes(action.payload) || el.phone.includes(action.payload));
        return {
          ...state,
          users: findedData,
          search: {
            searching: true,
            findedUsers: findedData
          }
        }
      } else {
        return {
          ...state,
          search: {
            searching: false,
            findedUsers: []
          }
        }
      }
    },
    filterUsers(state, action) {
      state.filter = action.payload
    }
  }
});

export default slice.reducer;
export const { getUsers, createUser, editUser, removeUser, setEditing, searchUsers, filterUsers } = slice.actions;
