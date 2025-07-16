import React, { useState, useEffect, useRef } from 'react';

export default function App() {
  // Timer state
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef(null);

  // Task list state
  const [taskInput, setTaskInput] = useState('');
  const [tasks, setTasks] = useState([]);

  // Quote state
  const [quote, setQuote] = useState('Loading quote...');

  // Timer effect
  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current);
            setIsActive(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isActive]);

  const startTimer = () => {
    setIsActive(true);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTime(25 * 60);
    clearInterval(timerRef.current);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  // Task functions
  const addTask = () => {
    if (taskInput.trim()) {
      setTasks([...tasks, taskInput.trim()]);
      setTaskInput('');
    }
  };

  const removeTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  // Load motivational quote (static for now)
  useEffect(() => {
    // Simulate fetching quote
    setTimeout(() => {
      setQuote(
        '“Don’t watch the clock; do what it does. Keep going.” – Sam Levenson'
      );
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <header className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          FocusFlow – Your Digital Study Companion
        </h1>
      </header>

      <main className="w-full max-w-md space-y-6">
        {/* Pomodoro Timer */}
        <section className="bg-white p-6 rounded-xl shadow-md text-center">
          <div id="time" className="text-6xl font-bold text-blue-600 mb-4">
            {formatTime(time)}
          </div>
          <div className="flex justify-center gap-3">
            <button
              id="startBtn"
              onClick={startTimer}
              disabled={isActive}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition disabled:opacity-50"
            >
              Start
            </button>
            <button
              id="resetBtn"
              onClick={resetTimer}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
            >
              Reset
            </button>
          </div>
        </section>

        {/* To-Do List */}
        <section className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-3 text-gray-700">To-Do List</h2>
          <div className="flex gap-2 mb-4">
            <input
              id="taskInput"
              type="text"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              placeholder="Enter a task..."
              className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              id="addTaskBtn"
              onClick={addTask}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
            >
              Add
            </button>
          </div>
          <ul id="taskList" className="space-y-2">
            {tasks.length === 0 ? (
              <p className="text-gray-400 text-sm">No tasks yet</p>
            ) : (
              tasks.map((task, index) => (
                <li
                  key={index}
                  className="bg-gray-100 p-2 rounded-md flex justify-between items-center"
                >
                  <span>{task}</span>
                  <button
                    onClick={() => removeTask(index)}
                    className="text-sm text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </li>
              ))
            )}
          </ul>
        </section>

        {/* Motivational Quote */}
        <section className="bg-white p-6 rounded-xl shadow-md">
          <div
            id="dailyQuote"
            className="italic text-gray-600 text-center transition-opacity duration-500 ease-in-out"
          >
            {quote}
          </div>
        </section>
      </main>
    </div>
  );
}