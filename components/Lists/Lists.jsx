"use client";

import { useAppSelector } from "@/lib/hooks";
import SelectMenu from "../SelectMenu/SelectMenu";
import ListItem from "../ListItem/ListItem";

const List = () => {
  const { tasks, filterBy } = useAppSelector((state) => state.tasks);

  console.log(filterBy, tasks);

  const filteredTasks =
    filterBy === null ? tasks : tasks.filter((el) => el.status === filterBy);
  const isTasksSaved = filteredTasks.length;

  return (
    <div className="flex flex-col items-center  bg-gray-100 w-full lg:w-1/2 text-black border-b-4 lg:border-r-4 px-3 h-full lg:h-full ">
      <div className="w-full sm:w-3/4 flex justify-between items-center py-2">
        <h2 className="text-xl">Tasks</h2>
        <SelectMenu />
      </div>
      {isTasksSaved ? (
        <ul
          role="list"
          className="divide-y divide-gray-100 w-full sm:w-3/4 h-3/4 overflow-y-auto scroll-m-5"
        >
          {filteredTasks.map((el) => (
            <ListItem
              key={el.id}
              id={el.id}
              name={el.title}
              dueDate={el.dueDate}
              status={el.status}
              desc={el.desc}
            />
          ))}
        </ul>
      ) : (
        <div className="mt-2">You need to create tasks</div>
      )}
    </div>
  );
};

export default List;
