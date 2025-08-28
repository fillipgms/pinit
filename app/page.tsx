"use client";

import { useState, useEffect } from "react";
import Music from "../components/Music";

interface MusicItem {
    id: string;
    title: string;
    artist: string;
    coverUrl: string;
    isFavorite: boolean;
    createdAt: Date;
}

interface MusicList {
    id: string;
    name: string;
    musics: MusicItem[];
    createdAt: Date;
    isShared: boolean;
}

export default function Home() {
    const [lists, setLists] = useState<MusicList[]>([]);
    const [currentListId, setCurrentListId] = useState<string>("");
    const [newMusicTitle, setNewMusicTitle] = useState("");
    const [newMusicArtist, setNewMusicArtist] = useState("");
    const [newMusicCoverUrl, setNewMusicCoverUrl] = useState("");
    const [filter, setFilter] = useState<"all" | "favorites" | "others">("all");
    const [showListManager, setShowListManager] = useState(false);
    const [newListName, setNewListName] = useState("");
    const [showShareModal, setShowShareModal] = useState(false);
    const [showImportModal, setShowImportModal] = useState(false);
    const [importUrl, setImportUrl] = useState("");

    // Inicializar com uma lista padrão
    useEffect(() => {
        const savedLists = localStorage.getItem("musicLists");
        if (savedLists) {
            const parsedLists = JSON.parse(savedLists).map((list: any) => ({
                ...list,
                createdAt: new Date(list.createdAt),
                musics: list.musics.map((music: any) => ({
                    ...music,
                    createdAt: new Date(music.createdAt),
                })),
            }));
            setLists(parsedLists);
            if (parsedLists.length > 0) {
                setCurrentListId(parsedLists[0].id);
            }
        } else {
            // Criar lista padrão
            const defaultList: MusicList = {
                id: "default",
                name: "Minhas Músicas",
                musics: [],
                createdAt: new Date(),
                isShared: false,
            };
            setLists([defaultList]);
            setCurrentListId("default");
        }
    }, []);

    useEffect(() => {
        if (lists.length > 0) {
            localStorage.setItem("musicLists", JSON.stringify(lists));
        }
    }, [lists]);

    // Verificar se há lista compartilhada na URL
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const sharedListId = urlParams.get("list");
        if (sharedListId && lists.length > 0) {
            const sharedList = lists.find((list) => list.id === sharedListId);
            if (sharedList) {
                setCurrentListId(sharedListId);
            }
        }
    }, [lists]);

    const currentList = lists.find((list) => list.id === currentListId);
    const currentMusics = currentList?.musics || [];

    const addMusic = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMusicTitle.trim() && newMusicArtist.trim() && currentList) {
            const newMusic: MusicItem = {
                id: Date.now().toString(),
                title: newMusicTitle.trim(),
                artist: newMusicArtist.trim(),
                coverUrl: newMusicCoverUrl.trim(),
                isFavorite: false,
                createdAt: new Date(),
            };

            setLists(
                lists.map((list) =>
                    list.id === currentListId
                        ? { ...list, musics: [newMusic, ...list.musics] }
                        : list
                )
            );

            setNewMusicTitle("");
            setNewMusicArtist("");
            setNewMusicCoverUrl("");
        }
    };

    const toggleFavorite = (id: string) => {
        setLists(
            lists.map((list) =>
                list.id === currentListId
                    ? {
                          ...list,
                          musics: list.musics.map((music) =>
                              music.id === id
                                  ? { ...music, isFavorite: !music.isFavorite }
                                  : music
                          ),
                      }
                    : list
            )
        );
    };

    const deleteMusic = (id: string) => {
        setLists(
            lists.map((list) =>
                list.id === currentListId
                    ? {
                          ...list,
                          musics: list.musics.filter(
                              (music) => music.id !== id
                          ),
                      }
                    : list
            )
        );
    };

    const editMusic = (
        id: string,
        newTitle: string,
        newArtist: string,
        newCoverUrl: string
    ) => {
        setLists(
            lists.map((list) =>
                list.id === currentListId
                    ? {
                          ...list,
                          musics: list.musics.map((music) =>
                              music.id === id
                                  ? {
                                        ...music,
                                        title: newTitle,
                                        artist: newArtist,
                                        coverUrl: newCoverUrl,
                                    }
                                  : music
                          ),
                      }
                    : list
            )
        );
    };

    const clearNonFavorites = () => {
        setLists(
            lists.map((list) =>
                list.id === currentListId
                    ? {
                          ...list,
                          musics: list.musics.filter(
                              (music) => music.isFavorite
                          ),
                      }
                    : list
            )
        );
    };

    const createNewList = () => {
        if (newListName.trim()) {
            const newList: MusicList = {
                id: Date.now().toString(),
                name: newListName.trim(),
                musics: [],
                createdAt: new Date(),
                isShared: false,
            };

            setLists([...lists, newList]);
            setCurrentListId(newList.id);
            setNewListName("");
            setShowListManager(false);
        }
    };

    const deleteList = (listId: string) => {
        if (lists.length > 1) {
            const newLists = lists.filter((list) => list.id !== listId);
            setLists(newLists);
            if (currentListId === listId) {
                setCurrentListId(newLists[0].id);
            }
        }
    };

    const shareList = () => {
        if (currentList) {
            // Criar um código de compartilhamento com os dados da lista
            const shareData = {
                name: currentList.name,
                musics: currentList.musics,
                sharedAt: new Date().toISOString(),
            };

            // Codificar os dados em base64
            const encodedData = btoa(JSON.stringify(shareData));
            const shareCode = `musiclist_${encodedData}`;

            navigator.clipboard.writeText(shareCode);
            setShowShareModal(false);
            alert(
                "Código de compartilhamento copiado para a área de transferência!"
            );
        }
    };

    const importList = () => {
        if (importUrl.trim()) {
            try {
                // Verificar se é um código de compartilhamento
                if (importUrl.startsWith("musiclist_")) {
                    const encodedData = importUrl.replace("musiclist_", "");
                    const decodedData = JSON.parse(atob(encodedData));

                    if (
                        decodedData.musics &&
                        Array.isArray(decodedData.musics)
                    ) {
                        // Detectar duplicatas
                        const duplicates = decodedData.musics.filter(
                            (sharedMusic: MusicItem) =>
                                currentMusics.some(
                                    (currentMusic) =>
                                        currentMusic.title.toLowerCase() ===
                                            sharedMusic.title.toLowerCase() &&
                                        currentMusic.artist.toLowerCase() ===
                                            sharedMusic.artist.toLowerCase()
                                )
                        );

                        if (duplicates.length > 0) {
                            const shouldImport = confirm(
                                `Encontradas ${duplicates.length} músicas que já existem na sua lista. Deseja importar mesmo assim?`
                            );
                            if (!shouldImport) return;
                        }

                        // Importar músicas únicas
                        const newMusics = decodedData.musics.filter(
                            (sharedMusic: MusicItem) =>
                                !currentMusics.some(
                                    (currentMusic) =>
                                        currentMusic.title.toLowerCase() ===
                                            sharedMusic.title.toLowerCase() &&
                                        currentMusic.artist.toLowerCase() ===
                                            sharedMusic.artist.toLowerCase()
                                )
                        );

                        setLists(
                            lists.map((list) =>
                                list.id === currentListId
                                    ? {
                                          ...list,
                                          musics: [
                                              ...list.musics,
                                              ...newMusics,
                                          ],
                                      }
                                    : list
                            )
                        );

                        setImportUrl("");
                        setShowImportModal(false);
                        alert(
                            `Importadas ${newMusics.length} músicas da lista "${decodedData.name}"!`
                        );
                        return;
                    }
                }

                // Fallback para URLs antigas (se existirem)
                const url = new URL(importUrl);
                const listId = url.searchParams.get("list");
                if (listId) {
                    const sharedList = lists.find((list) => list.id === listId);
                    if (sharedList) {
                        // Detectar duplicatas
                        const duplicates = sharedList.musics.filter(
                            (sharedMusic) =>
                                currentMusics.some(
                                    (currentMusic) =>
                                        currentMusic.title.toLowerCase() ===
                                            sharedMusic.title.toLowerCase() &&
                                        currentMusic.artist.toLowerCase() ===
                                            sharedMusic.artist.toLowerCase()
                                )
                        );

                        if (duplicates.length > 0) {
                            const shouldImport = confirm(
                                `Encontradas ${duplicates.length} músicas que já existem na sua lista. Deseja importar mesmo assim?`
                            );
                            if (!shouldImport) return;
                        }

                        // Importar músicas únicas
                        const newMusics = sharedList.musics.filter(
                            (sharedMusic) =>
                                !currentMusics.some(
                                    (currentMusic) =>
                                        currentMusic.title.toLowerCase() ===
                                            sharedMusic.title.toLowerCase() &&
                                        currentMusic.artist.toLowerCase() ===
                                            sharedMusic.artist.toLowerCase()
                                )
                        );

                        setLists(
                            lists.map((list) =>
                                list.id === currentListId
                                    ? {
                                          ...list,
                                          musics: [
                                              ...list.musics,
                                              ...newMusics,
                                          ],
                                      }
                                    : list
                            )
                        );

                        setImportUrl("");
                        setShowImportModal(false);
                        alert(`Importadas ${newMusics.length} músicas!`);
                    } else {
                        alert("Lista não encontrada!");
                    }
                } else {
                    alert("Código ou URL inválida!");
                }
            } catch (error) {
                alert("Código ou URL inválida!");
            }
        }
    };

    const filteredMusics = currentMusics.filter((music) => {
        if (filter === "favorites") return music.isFavorite;
        if (filter === "others") return !music.isFavorite;
        return true;
    });

    const favoritesCount = currentMusics.filter(
        (music) => music.isFavorite
    ).length;
    const othersCount = currentMusics.filter(
        (music) => !music.isFavorite
    ).length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-400 to-pink-600 p-2 sm:p-4 font-mono">
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

            <div className="relative z-10 max-w-4xl mx-auto space-y-4 sm:space-y-6">
                {/* Header */}
                <div className="bg-gray-200 border-2 border-gray-400 retro-shadow">
                    <div className="bg-gray-400 px-3 py-2 sm:py-1 flex justify-between items-center border-b-2 border-gray-400">
                        <h1 className="font-bold text-gray-800 text-base sm:text-lg tracking-wider">
                            LISTA DE MÚSICAS FAVORITAS
                        </h1>
                        <div className="w-6 h-6 bg-red-500 border-2 border-gray-600 flex items-center justify-center text-white text-xs font-bold cursor-pointer hover:bg-red-600 retro-button">
                            ×
                        </div>
                    </div>
                    <div className="p-3 sm:p-4 bg-gray-100">
                        <p className="text-gray-700 text-sm">
                            Olá, amigo! Vamos organizar suas músicas favoritas
                        </p>
                    </div>
                </div>

                {/* Seletor de Lista */}
                <div className="bg-gray-200 border-2 border-gray-400 retro-shadow">
                    <div className="bg-gray-400 px-3 py-2 sm:py-1 flex flex-col sm:flex-row sm:justify-between sm:items-center border-b-2 border-gray-400 gap-2">
                        <h2 className="font-bold text-gray-800 tracking-wider text-sm sm:text-base">
                            LISTAS
                        </h2>
                        <div className="flex gap-1 sm:gap-2 flex-wrap">
                            <button
                                onClick={() => setShowListManager(true)}
                                className="px-2 py-1 sm:px-3 bg-blue-600 text-white border-2 border-gray-600 font-bold text-xs hover:bg-blue-700 active:bg-blue-800 retro-button"
                            >
                                GERENCIAR
                            </button>
                            <button
                                onClick={() => setShowShareModal(true)}
                                className="px-2 py-1 sm:px-3 bg-green-600 text-white border-2 border-gray-600 font-bold text-xs hover:bg-green-700 active:bg-green-800 retro-button"
                            >
                                COMPARTILHAR
                            </button>
                            <button
                                onClick={() => setShowImportModal(true)}
                                className="px-2 py-1 sm:px-3 bg-orange-600 text-white border-2 border-gray-600 font-bold text-xs hover:bg-orange-700 active:bg-orange-800 retro-button"
                            >
                                IMPORTAR
                            </button>
                        </div>
                    </div>
                    <div className="p-3 sm:p-4 bg-gray-100">
                        <select
                            value={currentListId}
                            onChange={(e) => setCurrentListId(e.target.value)}
                            className="w-full px-3 py-3 sm:py-2 bg-white border-2 border-gray-400 focus:border-purple-600 outline-none font-mono text-sm retro-input"
                        >
                            {lists.map((list) => (
                                <option key={list.id} value={list.id}>
                                    {list.name} ({list.musics.length} músicas)
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Lista de Músicas */}
                <div className="bg-gray-200 border-2 border-gray-400 retro-shadow">
                    <div className="bg-gray-400 px-3 py-2 sm:py-1 flex justify-between items-center border-b-2 border-gray-400">
                        <h2 className="font-bold text-gray-800 tracking-wider text-sm sm:text-base">
                            MÚSICAS - {currentList?.name}
                        </h2>
                        <div className="w-6 h-6 bg-red-500 border-2 border-gray-600 flex items-center justify-center text-white text-xs font-bold cursor-pointer hover:bg-red-600 retro-button">
                            ×
                        </div>
                    </div>

                    <div className="p-3 sm:p-4 bg-gray-100 space-y-4">
                        {/* Formulário de Adicionar Música */}
                        <form onSubmit={addMusic} className="space-y-3">
                            <div className="grid grid-cols-1 gap-3">
                                <input
                                    type="text"
                                    value={newMusicTitle}
                                    onChange={(e) =>
                                        setNewMusicTitle(e.target.value)
                                    }
                                    placeholder="Título da música"
                                    maxLength={100}
                                    className="w-full px-3 py-3 sm:py-2 bg-white border-2 border-gray-400 focus:border-purple-600 outline-none font-mono text-sm retro-input"
                                />
                                <input
                                    type="text"
                                    value={newMusicArtist}
                                    onChange={(e) =>
                                        setNewMusicArtist(e.target.value)
                                    }
                                    placeholder="Artista"
                                    maxLength={100}
                                    className="w-full px-3 py-3 sm:py-2 bg-white border-2 border-gray-400 focus:border-purple-600 outline-none font-mono text-sm retro-input"
                                />
                                <input
                                    type="url"
                                    value={newMusicCoverUrl}
                                    onChange={(e) =>
                                        setNewMusicCoverUrl(e.target.value)
                                    }
                                    placeholder="URL da capa (opcional)"
                                    className="w-full px-3 py-3 sm:py-2 bg-white border-2 border-gray-400 focus:border-purple-600 outline-none font-mono text-sm retro-input"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={
                                        !newMusicTitle.trim() ||
                                        !newMusicArtist.trim()
                                    }
                                    className="w-full sm:w-auto px-6 py-3 sm:py-2 bg-purple-600 text-white border-2 border-gray-600 font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-700 active:bg-purple-800 retro-button"
                                >
                                    ADICIONAR MÚSICA
                                </button>
                            </div>
                        </form>

                        {/* Filtros */}
                        <div className="flex gap-2 flex-wrap">
                            <button
                                onClick={() => setFilter("all")}
                                className={`px-3 py-2 sm:py-1 text-sm font-bold border-2 retro-button ${
                                    filter === "all"
                                        ? "bg-purple-600 text-white border-gray-600"
                                        : "bg-gray-300 text-gray-700 border-gray-400 hover:bg-gray-400"
                                }`}
                            >
                                TODAS ({currentMusics.length})
                            </button>
                            <button
                                onClick={() => setFilter("favorites")}
                                className={`px-3 py-2 sm:py-1 text-sm font-bold border-2 retro-button ${
                                    filter === "favorites"
                                        ? "bg-purple-600 text-white border-gray-600"
                                        : "bg-gray-300 text-gray-700 border-gray-400 hover:bg-gray-400"
                                }`}
                            >
                                FAVORITAS ({favoritesCount})
                            </button>
                            <button
                                onClick={() => setFilter("others")}
                                className={`px-3 py-2 sm:py-1 text-sm font-bold border-2 retro-button ${
                                    filter === "others"
                                        ? "bg-purple-600 text-white border-gray-600"
                                        : "bg-gray-300 text-gray-700 border-gray-400 hover:bg-gray-400"
                                }`}
                            >
                                OUTRAS ({othersCount})
                            </button>
                        </div>

                        {/* Lista de Músicas */}
                        <div className="space-y-2">
                            <h3 className="font-bold text-gray-800 text-sm">
                                {filter === "all" && "SUAS MÚSICAS"}
                                {filter === "favorites" && "MÚSICAS FAVORITAS"}
                                {filter === "others" && "OUTRAS MÚSICAS"}
                            </h3>

                            {filteredMusics.length === 0 ? (
                                <div className="bg-white border-2 border-gray-400 p-4 text-center">
                                    <h4 className="font-bold text-gray-700 text-sm mb-2">
                                        {filter === "all" &&
                                            "NENHUMA MÚSICA AINDA"}
                                        {filter === "favorites" &&
                                            "NENHUMA MÚSICA FAVORITA"}
                                        {filter === "others" &&
                                            "NENHUMA OUTRA MÚSICA"}
                                    </h4>
                                    <p className="text-gray-600 text-xs">
                                        {filter === "all" &&
                                            "Comece sua coleção adicionando sua primeira música acima."}
                                        {filter === "favorites" &&
                                            "Suas músicas favoritas aparecerão aqui."}
                                        {filter === "others" &&
                                            "Suas outras músicas aparecerão aqui."}
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {filteredMusics.map((music) => (
                                        <Music
                                            key={music.id}
                                            id={music.id}
                                            title={music.title}
                                            artist={music.artist}
                                            coverUrl={music.coverUrl}
                                            isFavorite={music.isFavorite}
                                            onToggleFavorite={toggleFavorite}
                                            onDelete={deleteMusic}
                                            onEdit={editMusic}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Estatísticas */}
                        {currentMusics.length > 0 && (
                            <div className="bg-white border-2 border-gray-400 p-4 space-y-3">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                                    <div className="text-sm font-bold text-gray-700">
                                        COLECÇÃO: {favoritesCount} FAVORITAS de{" "}
                                        {currentMusics.length} MÚSICAS
                                    </div>
                                    {othersCount > 0 && (
                                        <button
                                            onClick={clearNonFavorites}
                                            className="w-full sm:w-auto px-3 py-2 bg-red-600 text-white border-2 border-gray-600 font-bold text-xs hover:bg-red-700 active:bg-red-800 retro-button"
                                        >
                                            LIMPAR OUTRAS
                                        </button>
                                    )}
                                </div>

                                <div className="w-full bg-gray-300 border-2 border-gray-400 h-4">
                                    <div
                                        className="h-full bg-purple-600 transition-all duration-300 retro-progress"
                                        style={{
                                            width: `${
                                                (favoritesCount /
                                                    currentMusics.length) *
                                                100
                                            }%`,
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal Gerenciar Listas */}
            {showListManager && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-200 border-2 border-gray-400 p-4 sm:p-6 w-full max-w-md mx-auto retro-shadow">
                        <div className="bg-gray-400 px-3 py-2 flex justify-between items-center border-b-2 border-gray-400 mb-4">
                            <h3 className="font-bold text-gray-800 text-sm sm:text-base">
                                GERENCIAR LISTAS
                            </h3>
                            <button
                                onClick={() => setShowListManager(false)}
                                className="w-6 h-6 bg-red-500 border-2 border-gray-600 flex items-center justify-center text-white text-xs font-bold cursor-pointer hover:bg-red-600 retro-button"
                            >
                                ×
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <input
                                    type="text"
                                    value={newListName}
                                    onChange={(e) =>
                                        setNewListName(e.target.value)
                                    }
                                    placeholder="Nome da nova lista"
                                    className="w-full px-3 py-3 sm:py-2 bg-white border-2 border-gray-400 focus:border-purple-600 outline-none font-mono text-sm retro-input"
                                />
                                <button
                                    onClick={createNewList}
                                    disabled={!newListName.trim()}
                                    className="w-full mt-2 px-4 py-3 sm:py-2 bg-purple-600 text-white border-2 border-gray-600 font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-700 active:bg-purple-800 retro-button"
                                >
                                    CRIAR LISTA
                                </button>
                            </div>

                            <div className="space-y-2">
                                <h4 className="font-bold text-gray-800 text-sm">
                                    SUAS LISTAS:
                                </h4>
                                {lists.map((list) => (
                                    <div
                                        key={list.id}
                                        className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white border-2 border-gray-400 p-3 gap-2"
                                    >
                                        <span className="font-mono text-sm">
                                            {list.name} ({list.musics.length})
                                        </span>
                                        {lists.length > 1 && (
                                            <button
                                                onClick={() =>
                                                    deleteList(list.id)
                                                }
                                                className="w-full sm:w-auto px-3 py-2 bg-red-600 text-white border-2 border-gray-600 font-bold text-xs hover:bg-red-700 active:bg-red-800 retro-button"
                                            >
                                                EXCLUIR
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Compartilhar */}
            {showShareModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-200 border-2 border-gray-400 p-4 sm:p-6 w-full max-w-md mx-auto retro-shadow">
                        <div className="bg-gray-400 px-3 py-2 flex justify-between items-center border-b-2 border-gray-400 mb-4">
                            <h3 className="font-bold text-gray-800 text-sm sm:text-base">
                                COMPARTILHAR LISTA
                            </h3>
                            <button
                                onClick={() => setShowShareModal(false)}
                                className="w-6 h-6 bg-red-500 border-2 border-gray-600 flex items-center justify-center text-white text-xs font-bold cursor-pointer hover:bg-red-600 retro-button"
                            >
                                ×
                            </button>
                        </div>

                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm">
                                Compartilhe sua lista "{currentList?.name}" com
                                outras pessoas!
                            </p>
                            <p className="text-gray-600 text-xs">
                                O código será copiado para a área de
                                transferência. Cole-o em qualquer lugar para
                                compartilhar!
                            </p>
                            <button
                                onClick={shareList}
                                className="w-full px-4 py-3 sm:py-2 bg-green-600 text-white border-2 border-gray-600 font-bold text-sm hover:bg-green-700 active:bg-green-800 retro-button"
                            >
                                COPIAR CÓDIGO
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Importar */}
            {showImportModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-200 border-2 border-gray-400 p-4 sm:p-6 w-full max-w-md mx-auto retro-shadow">
                        <div className="bg-gray-400 px-3 py-2 flex justify-between items-center border-b-2 border-gray-400 mb-4">
                            <h3 className="font-bold text-gray-800 text-sm sm:text-base">
                                IMPORTAR LISTA
                            </h3>
                            <button
                                onClick={() => setShowImportModal(false)}
                                className="w-6 h-6 bg-red-500 border-2 border-gray-600 flex items-center justify-center text-white text-xs font-bold cursor-pointer hover:bg-red-600 retro-button"
                            >
                                ×
                            </button>
                        </div>

                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm">
                                Cole o código de compartilhamento para importar
                                as músicas:
                            </p>
                            <p className="text-gray-600 text-xs">
                                O código deve começar com "musiclist_". Cole-o
                                aqui para importar a lista completa!
                            </p>
                            <input
                                type="text"
                                value={importUrl}
                                onChange={(e) => setImportUrl(e.target.value)}
                                placeholder="musiclist_eyJ..."
                                className="w-full px-3 py-3 sm:py-2 bg-white border-2 border-gray-400 focus:border-purple-600 outline-none font-mono text-sm retro-input"
                            />
                            <button
                                onClick={importList}
                                disabled={!importUrl.trim()}
                                className="w-full px-4 py-3 sm:py-2 bg-orange-600 text-white border-2 border-gray-600 font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-700 active:bg-orange-800 retro-button"
                            >
                                IMPORTAR MÚSICAS
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
