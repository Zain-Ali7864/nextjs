"use client"
import React, { useState, FormEvent, ChangeEvent } from "react";

interface Task {
  title: string;
  desc: string;
}

const Page = () => {
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [mainTask, setMainTask] = useState<Task[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    if (editIndex !== null) {
      const updatedTasks = [...mainTask];
      if (editIndex >= 0 && editIndex < updatedTasks.length) {
        updatedTasks[editIndex] = { title, desc };
        setMainTask(updatedTasks);
        setEditIndex(null);
      }
    } else {
      setMainTask([...mainTask, { title, desc }]);
    }
    setTitle("");
    setDesc("");
  };

  const deleteHandler = (i: number) => {
    const copytask = [...mainTask];
    copytask.splice(i, 1);
    setMainTask(copytask);
  };

  const editHandler = (k: number) => {
    const taskToEdit = mainTask[k];
    setTitle(taskToEdit.title);
    setDesc(taskToEdit.desc);
    setEditIndex(k);
  };

  const cancelEditHandler = () => {
    setEditIndex(null);
    setTitle("");
    setDesc("");
  };

  let renderTask=<h2>No Task Exist</h2>

  if (mainTask.length > 0) {
    renderTask = (
      <ul>
        {mainTask.map((t, i) => (
          <li key={i} className="flex items-center justify-between p-4 border-b border-gray-800">
            <div className="flex items-center justify-between w-2/3">
              <h5 className="text-2xl font-semibold">{t.title}</h5>
              <h6 className="text-xl font-semibold">{t.desc}</h6>
            </div>
            <button
              onClick={() => deleteHandler(i)}
              className="bg-red-700 text-white px-3 py-2 rounded font-bold"
            >
              Delete
            </button>
            <button
              onClick={() => editHandler(i)}
              className="bg-blue-500 text-white px-3 py-2 rounded font-bold"
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <>
      <div className="bg-blue-300">
        <h1 className="text-sky-700 p-5 text-center font-bold text-5xl">
          Todo-List App
        </h1>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            className="text-2xl border-2 border-black  m-4 px-3 py-1"
            placeholder="Enter Your Task Here..."
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          />
          <input
            type="text"
            className="text-2xl border-2 border-black  m-4 px-3 py-1"
            placeholder="Enter Your Description Here..."
            value={desc}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setDesc(e.target.value)}
          />
          <button className="bg-cyan-900 text-green-500 px-4 py-3 text-2xl font-bold rounded m-5">
            {editIndex !== null ? "Update Task" : "Add Task"}
          </button>
          {editIndex !== null && (
            <button
              type="button"
              onClick={cancelEditHandler}
              className="bg-gray-500 text-white px-4 py-3 text-2xl font-bold rounded m-5"
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      <div className="flex text-lg font-semibold px-4 lg:gap-[845px] md:gap-[780px] gap-[160px]">
        <div>Task</div>
        <div>Description</div>
      </div>

      <div className="bg-sky-200 p-1 ">
        <div className="ml-2">{renderTask}</div>
      </div>
    </>
  );
};

export default Page;
