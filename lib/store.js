import { configureStore } from "@reduxjs/toolkit";
import tasksSlices from "./features/tasks/tasksSlices";

const makeStore = () => {
  return configureStore({
    reducer: {
      tasks: tasksSlices,
    },
  });
};

export default makeStore;
