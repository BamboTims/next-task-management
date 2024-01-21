import { selectTask, setMode } from "@/lib/features/tasks/tasksSlices";
import Dropdown from "../Dropdown/dropdown";
import { useAppDispatch } from "@/lib/hooks";
import { convertDate } from "@/utils/utils";

const statusClassNames = {
  completed: "text-green-600 bg-green-200",
  pending: "text-yellow-600 bg-yellow-200",
  late: "text-red-600 bg-red-200",
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const ListItem = ({ id, name, dueDate, desc, status }) => {
  const shouldTruncate = desc.split("").length >= 10;

  const dueDateString = `${
    daysOfWeek[convertDate(dueDate).getDay()]
  }, ${convertDate(dueDate).getDate()}
  ${convertDate(dueDate).getFullYear()}`;

  const descString = shouldTruncate ? `${desc.substring(0, 15)}....` : desc;

  const dispatch = useAppDispatch();

  return (
    <li className="flex justify-between gap-x-6 py-5">
      <div className="flex min-w-0 gap-x-4">
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">
            {name}
            <span className={`${statusClassNames[status]} px-1.5 rounded-lg`}>
              {status}
            </span>
          </p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
            Due on {dueDateString} . {descString}
          </p>
        </div>
      </div>
      <div className="shrink-0 flex items-center">
        <button
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          onClick={() => {
            dispatch(setMode("show-task"));
            dispatch(selectTask(id));
          }}
        >
          View Project
        </button>
        <Dropdown id={id} />
      </div>
    </li>
  );
};

export default ListItem;
