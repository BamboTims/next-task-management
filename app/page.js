"use client";

import Form from "@/components/Form/form";
import List from "@/components/Lists/Lists";
import TaskInfo from "@/components/TaskInfo/TaskInfo";
import { useAppSelector } from "@/lib/hooks";

export default function Home() {
  const mode = useAppSelector((state) => state.tasks.mode);

  return (
    <div className="flex h-screen flex-col lg:flex-row scrollbar-hide">
      <List />
      {mode !== "form" ? <TaskInfo /> : <Form />}
    </div>
  );
}
