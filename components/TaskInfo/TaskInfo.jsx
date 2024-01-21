import { clearSelectedTask } from "@/lib/features/tasks/tasksSlices";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { convertDate } from "@/utils/utils";

const TaskInfo = () => {
  const { title, desc, status, dueDate } = useAppSelector(
    (state) => state.tasks.selectedTask
  );

  const dispatch = useAppDispatch();

  return (
    <div className="w-full py-4 bg-gray-100 lg:w-1/2 flex flex-col items-center justify-center">
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Applicant Information
        </h3>
        <p className="mt-1 max-w-2xl text-lg leading-6 text-gray-500">
          Personal details and application.
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-lg font-medium leading-6 text-gray-900">
              Title:
            </dt>
            <dd className="mt-1 text-lg leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {title}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-lg font-medium leading-6 text-gray-900">
              Description:
            </dt>
            <dd className="mt-1 text-lg leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {desc}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-lg font-medium leading-6 text-gray-900">
              Status:
            </dt>
            <dd className="mt-1 text-lg leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {status.toUpperCase()}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-lg font-medium leading-6 text-gray-900">
              Due date:
            </dt>
            <dd className="mt-1 text-lg leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {convertDate(dueDate).toISOString().split("T")[0]}
            </dd>
          </div>
        </dl>
      </div>
      <div className="block text-black text-lg border-lg border-2 border-black px-4 py-2">
        <button onClick={() => dispatch(clearSelectedTask())}>Close x </button>
      </div>
    </div>
  );
};

export default TaskInfo;
