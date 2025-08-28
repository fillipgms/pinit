"use client";

import { useState, useEffect } from "react";
import Task from "../components/Task";

interface TaskItem {
    id: string;
    text: string;
    completed: boolean;
    createdAt: Date;
}

export default function Home() {
    const [tasks, setTasks] = useState<TaskItem[]>([]);
    const [newTaskText, setNewTaskText] = useState("");
    const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

    useEffect(() => {
        const savedTasks = localStorage.getItem("tasks");
        if (savedTasks) {
            const parsedTasks = JSON.parse(savedTasks).map((task: any) => ({
                ...task,
                createdAt: new Date(task.createdAt),
            }));
            setTasks(parsedTasks);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (newTaskText.trim()) {
            const newTask: TaskItem = {
                id: Date.now().toString(),
                text: newTaskText.trim(),
                completed: false,
                createdAt: new Date(),
            };
            setTasks([newTask, ...tasks]);
            setNewTaskText("");
        }
    };

    const toggleTask = (id: string) => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const deleteTask = (id: string) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    const editTask = (id: string, newText: string) => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, text: newText } : task
            )
        );
    };

    const clearCompleted = () => {
        setTasks(tasks.filter((task) => !task.completed));
    };

    const filteredTasks = tasks.filter((task) => {
        if (filter === "active") return !task.completed;
        if (filter === "completed") return task.completed;
        return true;
    });

    const completedCount = tasks.filter((task) => task.completed).length;
    const activeCount = tasks.filter((task) => !task.completed).length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-400 to-blue-600 p-4 font-mono">
            <div className="fixed inset-0 opacity-10">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: `
                        linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
                    `,
                        backgroundSize: "20px 20px",
                    }}
                ></div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto space-y-6">
                <div className="bg-gray-200 border-2 border-gray-400 retro-shadow">
                    <div className="bg-gray-400 px-3 py-1 flex justify-between items-center border-b-2 border-gray-400">
                        <h1 className="font-bold text-gray-800 text-lg tracking-wider">
                            GERENCIADOR DE TAREFAS
                        </h1>
                        <div className="w-6 h-6 bg-red-500 border-2 border-gray-600 flex items-center justify-center text-white text-xs font-bold cursor-pointer hover:bg-red-600 retro-button">
                            ×
                        </div>
                    </div>
                    <div className="p-4 bg-gray-100">
                        <p className="text-gray-700 text-sm">
                            Olá, amigo! Vamos colocar as coisas pra andar
                        </p>
                    </div>
                </div>

                <div className="bg-gray-200 border-2 border-gray-400 retro-shadow">
                    <div className="bg-gray-400 px-3 py-1 flex justify-between items-center border-b-2 border-gray-400">
                        <h2 className="font-bold text-gray-800 tracking-wider">
                            TAREFAS
                        </h2>
                        <div className="w-6 h-6 bg-red-500 border-2 border-gray-600 flex items-center justify-center text-white text-xs font-bold cursor-pointer hover:bg-red-600 retro-button">
                            ×
                        </div>
                    </div>

                    <div className="p-4 bg-gray-100 space-y-4">
                        <form onSubmit={addTask} className="space-y-3">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newTaskText}
                                    onChange={(e) =>
                                        setNewTaskText(e.target.value)
                                    }
                                    placeholder="O que você gostaria de fazer hoje?"
                                    maxLength={200}
                                    className="flex-1 px-3 py-2 bg-white border-2 border-gray-400 focus:border-blue-600 outline-none font-mono text-sm retro-input"
                                />
                                <button
                                    type="submit"
                                    disabled={!newTaskText.trim()}
                                    className="px-4 py-2 bg-blue-600 text-white border-2 border-gray-600 font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 active:bg-blue-800 retro-button"
                                >
                                    ADICIONAR
                                </button>
                            </div>
                        </form>

                        <div className="flex gap-2 flex-wrap">
                            <button
                                onClick={() => setFilter("all")}
                                className={`px-3 py-1 text-sm font-bold border-2 retro-button ${
                                    filter === "all"
                                        ? "bg-blue-600 text-white border-gray-600"
                                        : "bg-gray-300 text-gray-700 border-gray-400 hover:bg-gray-400"
                                }`}
                            >
                                TODAS ({tasks.length})
                            </button>
                            <button
                                onClick={() => setFilter("active")}
                                className={`px-3 py-1 text-sm font-bold border-2 retro-button ${
                                    filter === "active"
                                        ? "bg-blue-600 text-white border-gray-600"
                                        : "bg-gray-300 text-gray-700 border-gray-400 hover:bg-gray-400"
                                }`}
                            >
                                A FAZER ({activeCount})
                            </button>
                            <button
                                onClick={() => setFilter("completed")}
                                className={`px-3 py-1 text-sm font-bold border-2 retro-button ${
                                    filter === "completed"
                                        ? "bg-blue-600 text-white border-gray-600"
                                        : "bg-gray-300 text-gray-700 border-gray-400 hover:bg-gray-400"
                                }`}
                            >
                                CONCLUÍDAS ({completedCount})
                            </button>
                        </div>

                        <div className="space-y-2">
                            <h3 className="font-bold text-gray-800 text-sm">
                                {filter === "all" && "SUAS TAREFAS"}
                                {filter === "active" && "TAREFAS A FAZER"}
                                {filter === "completed" && "TAREFAS CONCLUÍDAS"}
                            </h3>

                            {filteredTasks.length === 0 ? (
                                <div className="bg-white border-2 border-gray-400 p-4 text-center">
                                    <h4 className="font-bold text-gray-700 text-sm mb-2">
                                        {filter === "all" &&
                                            "NENHUMA TAREFA AINDA"}
                                        {filter === "active" && "TUDO EM DIA!"}
                                        {filter === "completed" &&
                                            "NENHUMA TAREFA CONCLUÍDA"}
                                    </h4>
                                    <p className="text-gray-600 text-xs">
                                        {filter === "all" &&
                                            "Comece sua jornada adicionando sua primeira tarefa acima."}
                                        {filter === "active" &&
                                            "Você está em dia! Hora de dar uma pausa."}
                                        {filter === "completed" &&
                                            "Suas tarefas concluídas aparecerão aqui."}
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {filteredTasks.map((task) => (
                                        <Task
                                            key={task.id}
                                            id={task.id}
                                            text={task.text}
                                            completed={task.completed}
                                            onToggle={toggleTask}
                                            onDelete={deleteTask}
                                            onEdit={editTask}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {tasks.length > 0 && (
                            <div className="bg-white border-2 border-gray-400 p-4 space-y-3">
                                <div className="flex justify-between items-center">
                                    <div className="text-sm font-bold text-gray-700">
                                        PROGRESSO: {completedCount} de{" "}
                                        {tasks.length} CONCLUÍDAS
                                    </div>
                                    {completedCount > 0 && (
                                        <button
                                            onClick={clearCompleted}
                                            className="px-3 py-1 bg-red-600 text-white border-2 border-gray-600 font-bold text-xs hover:bg-red-700 active:bg-red-800 retro-button"
                                        >
                                            LIMPAR
                                        </button>
                                    )}
                                </div>

                                <div className="w-full bg-gray-300 border-2 border-gray-400 h-4">
                                    <div
                                        className="h-full bg-blue-600 transition-all duration-300 retro-progress"
                                        style={{
                                            width: `${
                                                (completedCount /
                                                    tasks.length) *
                                                100
                                            }%`,
                                        }}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="bg-white border-2 border-gray-400 p-4 text-center">
                            <p className="text-gray-700 text-sm italic">
                                "A jornada de mil milhas começa com um único
                                passo." — Lao Tzu
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
