import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch(
    "https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data"
  );
  const users = await response.json();
  return users;
});

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async ({ id }) => {
    return await fetch(
      `https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data/${id}`,
      {
        method: "DELETE",
      }
    ).then((res) => res.json());
  }
);

export const createUser = createAsyncThunk("users/createUser", async (user) => {
  return await fetch(
    `https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
      }),
    }
  ).then((res) => res.json());
});

export const updateUser = createAsyncThunk("users/updateUser", async (user) => {
  return await fetch(
    `https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data/${user.id}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: user.name,
        username: user.username,
        email: user.email,
        city: user.city,
      }),
    }
  ).then((res) => res.json());
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
  },
  reducers: {
    userAdded(state, action) {
      state.users.push(action.payload);
    },
    userUpdated(state, action) {
      const { id, name, email, username, city } = action.payload;
      const existingUser = state.users.find((user) => user.id === id);
      if (existingUser) {
        existingUser.name = name;
        existingUser.email = email;
        existingUser.username = username;
        existingUser.address.city = city;
      }
    },
    userDeleted(state, action) {
      const { id } = action.payload;
      const existingUser = state.users.find((user) => user.id === id);
      if (existingUser) {
        state.users = state.users.filter((user) => user.id !== id);
      }
    },
  },
  extraReducers: {
    [fetchUsers.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = [...state.users, ...action.payload];
    },
    [fetchUsers.rejected]: (state, action) => {
      state.loading = false;
    },
    [deleteUser.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = [...state.users];
    },
    [deleteUser.rejected]: (state, action) => {
      state.loading = false;
    },
    [createUser.pending]: (state, action) => {
      state.loading = true;
    },
    [createUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = [...state.users];
    },
    [createUser.rejected]: (state, action) => {
      state.loading = false;
    },
    [updateUser.pending]: (state, action) => {
      state.loading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = [...state.users];
    },
    [updateUser.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export const { userAdded, userUpdated, userDeleted } = usersSlice.actions;

export default usersSlice.reducer;
