"use client";

import { useState } from "react";

interface MusicProps {
    id: string;
    title: string;
    artist: string;
    coverUrl: string;
    isFavorite: boolean;
    onToggleFavorite: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (
        id: string,
        newTitle: string,
        newArtist: string,
        newCoverUrl: string
    ) => void;
}

export default function Music({
    id,
    title,
    artist,
    coverUrl,
    isFavorite,
    onToggleFavorite,
    onDelete,
    onEdit,
}: MusicProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [editTitle, setEditTitle] = useState(title);
    const [editArtist, setEditArtist] = useState(artist);
    const [editCoverUrl, setEditCoverUrl] = useState(coverUrl);

    const handleEdit = () => {
        if (editTitle.trim() && editArtist.trim()) {
            onEdit(
                id,
                editTitle.trim(),
                editArtist.trim(),
                editCoverUrl.trim()
            );
            setIsEditing(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleEdit();
        } else if (e.key === "Escape") {
            setEditTitle(title);
            setEditArtist(artist);
            setEditCoverUrl(coverUrl);
            setIsEditing(false);
        }
    };

    if (isEditing) {
        return (
            <div className="bg-white border-2 border-gray-400 p-4 retro-shadow">
                <div className="space-y-3">
                    <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Título da música"
                        className="w-full px-3 py-3 bg-white border-2 border-blue-600 focus:outline-none font-mono text-sm retro-input"
                    />
                    <input
                        type="text"
                        value={editArtist}
                        onChange={(e) => setEditArtist(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Artista"
                        className="w-full px-3 py-3 bg-white border-2 border-blue-600 focus:outline-none font-mono text-sm retro-input"
                    />
                    <input
                        type="url"
                        value={editCoverUrl}
                        onChange={(e) => setEditCoverUrl(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="URL da capa (opcional)"
                        className="w-full px-3 py-3 bg-white border-2 border-blue-600 focus:outline-none font-mono text-sm retro-input"
                    />
                    <div className="flex gap-2">
                        <button
                            onClick={handleEdit}
                            className="flex-1 px-3 py-2 bg-green-600 text-white border-2 border-gray-600 font-bold text-sm hover:bg-green-700 active:bg-green-800 retro-button"
                        >
                            SALVAR
                        </button>
                        <button
                            onClick={() => {
                                setEditTitle(title);
                                setEditArtist(artist);
                                setEditCoverUrl(coverUrl);
                                setIsEditing(false);
                            }}
                            className="flex-1 px-3 py-2 bg-gray-600 text-white border-2 border-gray-600 font-bold text-sm hover:bg-gray-700 active:bg-gray-800 retro-button"
                        >
                            CANCELAR
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white border-2 border-gray-400 p-3 hover:border-gray-500 transition-colors retro-shadow">
            <div className="flex items-center gap-3">
                {/* Botão de Favorito */}
                <button
                    onClick={() => onToggleFavorite(id)}
                    aria-label={
                        isFavorite
                            ? "Remover dos favoritos"
                            : "Adicionar aos favoritos"
                    }
                    className={`w-8 h-8 border-2 flex items-center justify-center text-sm font-bold transition-colors retro-checkbox flex-shrink-0 ${
                        isFavorite
                            ? "bg-red-600 border-gray-600 text-white"
                            : "bg-white border-gray-400 text-gray-400 hover:border-gray-600"
                    }`}
                >
                    {isFavorite ? "♥" : "♡"}
                </button>

                {/* Capa da música */}
                <div className="flex-shrink-0">
                    {coverUrl ? (
                        <img
                            src={coverUrl}
                            alt={`Capa de ${title}`}
                            className="w-12 h-12 object-cover border border-gray-300"
                            onError={(e) => {
                                e.currentTarget.style.display = "none";
                            }}
                        />
                    ) : (
                        <div className="w-12 h-12 bg-gray-200 border border-gray-300 flex items-center justify-center">
                            <span className="text-gray-500 text-xs">🎵</span>
                        </div>
                    )}
                </div>

                {/* Informações da música */}
                <div className="flex-1 min-w-0">
                    <div
                        onClick={() => setIsEditing(true)}
                        className={`cursor-pointer font-mono text-sm font-bold truncate ${
                            isFavorite ? "text-red-600" : "text-gray-800"
                        } hover:text-blue-600 transition-colors`}
                        title={title}
                    >
                        {title}
                    </div>
                    <div
                        onClick={() => setIsEditing(true)}
                        className={`cursor-pointer font-mono text-xs truncate ${
                            isFavorite ? "text-red-500" : "text-gray-600"
                        } hover:text-blue-600 transition-colors`}
                        title={artist}
                    >
                        {artist}
                    </div>
                </div>

                {/* Menu de três pontos */}
                <div className="relative flex-shrink-0">
                    <button
                        onClick={() => setShowMenu(!showMenu)}
                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors"
                        aria-label="Menu de opções"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                    </button>

                    {/* Dropdown menu */}
                    {showMenu && (
                        <div className="absolute right-0 top-full mt-1 w-32 bg-white border-2 border-gray-400 shadow-lg z-10 retro-shadow">
                            <button
                                onClick={() => {
                                    setIsEditing(true);
                                    setShowMenu(false);
                                }}
                                className="w-full px-3 py-2 text-left text-sm font-mono hover:bg-gray-100 border-b border-gray-200 retro-button"
                            >
                                ✏️ Editar
                            </button>
                            <button
                                onClick={() => {
                                    onDelete(id);
                                    setShowMenu(false);
                                }}
                                className="w-full px-3 py-2 text-left text-sm font-mono hover:bg-gray-100 text-red-600 retro-button"
                            >
                                🗑️ Excluir
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Overlay para fechar o menu quando clicar fora */}
            {showMenu && (
                <div
                    className="fixed inset-0 z-0"
                    onClick={() => setShowMenu(false)}
                />
            )}
        </div>
    );
}
