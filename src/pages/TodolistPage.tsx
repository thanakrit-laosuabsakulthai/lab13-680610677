
import TaskCard from "../components/TaskCard";
import { type TaskCardProps } from "../libs/Todolist";
import TodoModal from "../components/Modal";
import { useEffect, useState } from "react";

const STORAGE_KEY = "lab13.tasks";

// อ่านค่าเก่าจาก localStorage (เก็บได้แค่ string จึงต้อง JSON.parse กลับเป็น array)
function loadTasks(): TaskCardProps[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : defaultTasks;
  } catch {
    return defaultTasks; // เผื่อข้อมูลใน localStorage เสีย
  }
}
// ข้อมูลตั้งต้น
const defaultTasks: TaskCardProps[] = [
  {
    id: "1",
    title: "react todo list",
    description: "react todo list app homework",
    isDone: false,
  },
  {
    id: "2",
    title: "Read a book",
    description: "Vite + React + TS",
    isDone: true,
  }
];

function App() {
  const [tasks, setTasks] = useState<TaskCardProps[]>(loadTasks);
  
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);
  
  const handleAdd = (newTask: TaskCardProps) => setTasks([...tasks, newTask]);

  const deleteTask = (taskId: string) =>
    setTasks(tasks.filter((t) => t.id !== taskId));

  const toggleDoneTask = (taskId: string) =>
    setTasks(
      tasks.map((t) => (t.id === taskId ? { ...t, isDone: !t.isDone } : t)),
    );

  return (
    <div className="col-12 m-2 p-0">
      <div className="container text-center">
        <h2>Todo List</h2>
        <span className="m-2 badge bg-primary">All : {tasks.length}</span>
        <span className="m-2 badge bg-success">Done : {tasks.filter((t) => t.isDone).length}</span>
      </div>
      <hr />
      
      <div className="container text-center">
        <div>
          <button
            type="button"
            className="btn btn-primary my-3"
            data-bs-toggle="modal"
            data-bs-target="#todoModal"
          >
            Add
          </button>
        </div>

        <TodoModal onAdd={handleAdd} />
        <>
          {tasks.map((task) => (
            <TaskCard
              id={task.id}
              title={task.title}
              description={task.description}
              deleteTaskFunc={deleteTask}
              toggleDoneTaskFunc={toggleDoneTask}
              isDone={task.isDone}
              key={task.id}
            />
          ))}
        </>
      </div>
    </div>
  );
}

export default App;
