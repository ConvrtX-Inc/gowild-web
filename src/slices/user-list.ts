import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { getAllUsers, getStatusById, getUsersByPage } from 'src/api/user-list';
import { UserFilterTab } from 'src/enums/user-list';
import { EndUser } from 'src/types/end-user';

interface UserListState {
  userFilterTab: UserFilterTab;
  users: EndUser[];
  filteredUsers: EndUser[];
  user: EndUser;
  isFiltered: boolean;
  isLoading: boolean;
}

const initialState: UserListState = {
  userFilterTab: UserFilterTab.ALL,
  users: [],
  user: null,
  filteredUsers: [],
  isFiltered: false,
  isLoading: true
};

export const fetchUsers = createAsyncThunk('userList/fetchUsers', async () => {
  const response: AxiosResponse = await getAllUsers();
  if (response.status === 200) return response.data;
  return [];
});

export const fetchUsersByPage = createAsyncThunk(
  'userList/fetchUsersByPage',
  async ({ limit, page }: { limit: number; page: number }) => {
    const response: AxiosResponse = await getUsersByPage(limit, page);
    if (response.status === 200) return response.data.data;
    return [];
  }
);

export const getUserStatus = createAsyncThunk('userList/getUserStatus', async (id: string) => {
  const res = await getStatusById(id);
  if (res.status === 200) return res.data;
  return null;
});

const slice = createSlice({
  name: 'userList',
  initialState,
  reducers: {
    onUserFilterChange: (state, action) => {
      state.userFilterTab = action.payload;
      // if (action.payload !== UserFilterTab.ALL) {
      //   state.isFiltered = true;
      // }
    },
    toggleFilter: (state) => {
      state.isFiltered = !state.isFiltered;
    },
    onViewUser: (state, action) => {
      const id = action.payload;
      const found = state.users.find((user: EndUser) => user.id === id);
      state.user = found;
    },
    onSearchFilter: (state, action) => {
      if (action.payload && action.payload.length > 0) {
        state.filteredUsers = state.users.filter((obj) =>
          Object.keys(obj).some((key) => {
            if (obj[key] && typeof obj[key] === 'string') {
              return obj[key].includes(action.payload);
            }
            return false;
          })
        );
      } else {
        state.filteredUsers = state.users;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = [...action.payload];
        state.isLoading = false;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      });

    builder.addCase(fetchUsersByPage.fulfilled, (state, action) => {
      state.users = [...action.payload];
    });
    builder.addCase(getUserStatus.fulfilled, (state, action) => {
      state.users = state.users.map((user: EndUser) => {
        if (user.id === action.payload.id) {
          return {
            ...user,
            status: action.payload
          };
        }
        return user;
      });
    });
  }
});

export const { reducer } = slice;
export const { onUserFilterChange, onViewUser, onSearchFilter, toggleFilter } = slice.actions;

export default slice;
