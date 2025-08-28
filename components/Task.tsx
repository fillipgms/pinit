"use client";

import { useState } from "react";

interface TaskProps {
    id: string;
    text: string;
    completed: boolean;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string, newText: string) => void;
}

export default function Task({
    id,
    text,
    completed,
    onToggle,
    onDelete,
    onEdit,
}: TaskProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(text);

    const handleEdit = () => {
        if (editText.trim()) {
            onEdit(id, editText.trim());
            setIsEditing(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleEdit();
        } else if (e.key === "Escape") {
            setEditText(text);
            setIsEditing(false);
        }
    };

    return (
        <div className="bg-white border-2 border-gray-400 p-3 hover:border-gray-500 transition-colors">
            <div className="flex items-center gap-3">
                <button
                    onClick={() => onToggle(id)}
                    aria-label={
                        completed
                            ? "Marcar como incompleta"
                            : "Marcar como completa"
                    }
                    className={`w-5 h-5 border-2 flex items-center justify-center text-xs font-bold transition-colors retro-checkbox ${
                        completed
                            ? "bg-green-600 border-gray-600 text-white"
                            : "bg-white border-gray-400 text-gray-400 hover:border-gray-600"
                    }`}
                >
                    {completed ? "✓" : ""}
                </button>

                <div className="flex-1 min-w-0">
                    {isEditing ? (
                        <input
                            type="text"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            onKeyDown={handleKeyPress}
                            onBlur={handleEdit}
                            autoFocus
                            className="w-full px-2 py-1 bg-white border-2 border-blue-600 focus:outline-none font-mono text-sm retro-input"
                        />
                    ) : (
                        <span
                            onClick={() => setIsEditing(true)}
                            className={`block cursor-pointer font-mono text-sm ${
                                completed
                                    ? "line-through text-gray-500"
                                    : "text-gray-800"
                            } hover:text-blue-600 transition-colors`}
                        >
                            {text}
                        </span>
                    )}
                </div>

                <div className="flex gap-1">
                    <button
                        onClick={() => setIsEditing(true)}
                        title="Editar tarefa"
                        className="px-2 py-1 bg-blue-600 text-white border-2 border-gray-600 font-bold text-xs hover:bg-blue-700 active:bg-blue-800 retro-button"
                    >
                        EDITAR
                    </button>
                    <button
                        onClick={() => onDelete(id)}
                        title="Excluir tarefa"
                        className="px-2 py-1 bg-red-600 text-white border-2 border-gray-600 font-bold text-xs hover:bg-red-700 active:bg-red-800 retro-button"
                    >
                        EXCLUIR
                    </button>
                </div>
            </div>
        </div>
    );
}
