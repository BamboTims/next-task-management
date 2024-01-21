import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    selectedTask: null,
    filterBy: null,
    mode: "form",
  },
  reducers: {
    addTasks: (state, action) => {
      state.tasks = [...state.tasks, action.payload];
    },
    removeTasks: (state, action) => {
      state.tasks = state.tasks.filter((el) => el.id !== action.payload);
    },
    selectTask: (state, action) => {
      state.selectedTask = state.tasks.find((el) => el.id === action.payload);
    },
    clearSelectedTask: (state) => {
      state.selectedTask = null;
      state.mode = "form";
    },
    selectFilterByCategory: (state, action) => {
      state.filterBy = action.payload;
    },
    setTaskAsCompleted: (state, action) => {
      state.tasks = state.tasks.map((el) => {
        if (el.id === action.payload) {
          return {
            ...el,
            status: "completed",
          };
        } else {
          return el;
        }
      });
    },
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    editTasks: (state, action) => {
      state.tasks = state.tasks.map((el) => {
        if (el.id === action.payload.id) {
          return action.payload;
        } else {
          return el;
        }
      });
    },
  },
});

export const {
  addTasks,
  removeTasks,
  selectTask,
  clearSelectedTask,
  selectFilterByCategory,
  setTaskAsCompleted,
  setMode,
  editTasks,
} = taskSlice.actions;
export default taskSlice.reducer;
