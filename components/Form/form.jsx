"use client";
import {
  addTasks,
  clearSelectedTask,
  editTasks,
} from "@/lib/features/tasks/tasksSlices";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { convertDate } from "@/utils/utils";
import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

const Form = () => {
  const { selectedTask } = useAppSelector((state) => state.tasks);
  const [title, setTitle] = useState(selectedTask?.title ?? "");
  const [desc, setDesc] = useState(selectedTask?.desc ?? "");
  const [date, setDate] = useState(
    convertDate(selectedTask?.dueDate)?.toISOString()?.split("T")[0] ??
      new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    setTitle(selectedTask?.title ?? "");
    setDesc(selectedTask?.desc ?? "");
    setDate(
      convertDate(selectedTask?.dueDate)?.toISOString()?.split("T")[0] ??
        new Date().toISOString().split("T")[0]
    );
  }, [selectedTask]);

  const dispatch = useAppDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    if (title === "" || desc === "")
      return alert("Did not set a title or description");

    const convertedDate = convertDate(date);
    const today = new Date();

    const todayMilliSecs = today.getTime();
    const selectedDateMilliSecs = convertedDate.getTime();

    const status = todayMilliSecs <= selectedDateMilliSecs ? "pending" : "late";

    let submission;

    if (selectedTask) {
      submission = { id: selectedTask.id, title, desc, dueDate: date, status };
      editTasks(submission);
    }

    if (!selectedTask) {
      submission = {
        id: uuid(),
        title,
        desc,
        dueDate: date,
        status,
      };
      dispatch(addTasks(submission));
    }

    setTitle("");
    setDesc("");
    setDate(new Date().toISOString().split("T")[0]);

    if (selectedTask) dispatch(clearSelectedTask());
  };

  return (
    <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
      <div className="max-w-md w-full p-6">
        <h1 className="text-3xl font-semibold mb-6 text-black text-center">
          Create Task
        </h1>
        <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
          Create a Task
        </h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300 text-black"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300 text-black"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Due date:
            </label>
            <input
              type="date"
              id="date"
              name="date"
              className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300 text-black"
              onChange={(e) => setDate(e.target.value)}
              value={date}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
