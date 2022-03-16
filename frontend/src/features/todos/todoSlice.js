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
export const getTodo = createAsyncThunk("todo/getAll", async (body, thunkAPI) => {
  try {
    return await todoService.getTodo(body);
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

// Toggle todo
export const toggleTodo = createAsyncThunk(
  "todo/complete",
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

// Edit todo
export const editTodo = createAsyncThunk(
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

export const setFilteredTodoList = createAsyncThunk(
  "todo/filter",
  async (id, body, thunkAPI) => {
    try {} catch {}
  }
)

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    reset: (state) => initialState,
    // setFilteredTodoList(state, action) {
    //   console.log(state.todoList);
    //   if (action.payload === "completed") {
    //     state.todoList = state.todoList.filter(
    //       (todo) => todo.completed === true
    //     );
    //   } else if (action.payload === "uncompleted") {
    //     state.todoList = state.todoList.filter(
    //       (todo) => todo.completed === false
    //     );
    //   }
    //   console.log(state.todoList);
    // },
  },

  extraReducers: (builder) => {
    builder
      .addCase(setFilteredTodoList.fulfilled, (state, action) => {
        if (action.payload === "completed") {
          state.todoList = state.todoList.filter(
            (todo) => todo.completed === true
          );
        } else if (action.payload === "uncompleted") {
          state.todoList = state.todoList.filter(
            (todo) => todo.completed === false
          );
        }
      })
      .addCase(createTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
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
          (todo) => todo._id !== action.payload._id
        );
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(toggleTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.todoList = state.todoList.map((todo) => {
          if (todo._id === action.payload._id) {
            return {
              ...todo,
              complete: !todo.complete,
            };
          }
          return todo;
        });
      })
      .addCase(toggleTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(editTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.todoList = state.todoList.map((todo) => {
          if (todo._id === action.payload._id) {
            return {
              ...todo,
              text: action.payload.text,
            };
          }
          return todo;
        });
      })
      .addCase(editTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = todoSlice.actions;
export default todoSlice.reducer;
