import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import todoService from "./todoService";

const initialState = {
  todoList: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new todo
export const createTodo = createAsyncThunk(
  "todo/create",
  async (data, thunkAPI) => {
    try {
      return await todoService.createTodo(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user todo
export const getTodo = createAsyncThunk("todo/getAll", async (_, thunkAPI) => {
  try {
    return await todoService.getTodo();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Delete todo
export const deleteTodo = createAsyncThunk(
  "todo/delete",
  async (id, thunkAPI) => {
    try {
      return await todoService.deleteTodo(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update todo
export const updateTodo = createAsyncThunk(
  "todo/update",
  async (id, body, thunkAPI) => {
    try {
      return await todoService.updateTodo(id, body);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(createTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.isSuccess = true;
        state.todoList.push(action.payload);
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.todoList = action.payload;
      })
      .addCase(getTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.todoList = state.todoList.filter(
          (todo) => todo._id !== action.payload.id
        );
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.todoList = state.todoList.map(
          (todo) => {
            if(todo._id === action.payload.id) {
              return {
                ...todo, complete: !todo.complete
              }
            }
          }
        );
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = todoSlice.actions;
export const todoAction = todoSlice.actions;
export default todoSlice.reducer;
