import React from 'react';
import { 
  Folder as FolderIcon, 
  FileText, 
  FileCode, 
  Tag, 
  BarChart3, 
  GitCompare, 
  Layers, 
  Sparkles, 
  Plus, 
  HardDrive,
  Trash2,
  CheckCircle2,
  Clock,
  Bookmark
} from 'lucide-react';
import { Folder, ViewMode, FileExtension, DocumentStatus } from '../types';

interface SidebarProps {
  folders: Folder[];
  activeFolderId: string;
  onSelectFolder: (id: string) => void;
  activeExtension: FileExtension | 'all';
  onSelectExtension: (ext: FileExtension | 'all') => void;
  activeStatus: DocumentStatus | 'all';
  onSelectStatus: (status: DocumentStatus | 'all') => void;
  viewMode: ViewMode;
  onSelectViewMode: (mode: ViewMode) => void;
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
  allTags: string[];
  totalDocs: number;
  txtCount: number;
  docxCount: number;
  totalStorageKB: number;
  onOpenNewDocModal: () => void;
  onOpenUploader: () => void;
  showFavoritesOnly: boolean;
  onToggleFavoritesOnly: () => void;
}

export default function Sidebar({
  folders,
  activeFolderId,
  onSelectFolder,
  activeExtension,
  onSelectExtension,
  activeStatus,
  onSelectStatus,
  viewMode,
  onSelectViewMode,
  selectedTag,
  onSelectTag,
  allTags,
  totalDocs,
  txtCount,
  docxCount,
  totalStorageKB,
  onOpenNewDocModal,
  onOpenUploader,
  showFavoritesOnly,
  onToggleFavoritesOnly
}: SidebarProps) {

  return (
    <aside className="w-64 bg-slate-900 text-slate-200 border-r border-slate-800 flex flex-col h-screen shrink-0 select-none">
      {/* App Header Logo */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-500 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white font-bold text-lg">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-slate-100 text-base leading-tight">DocHub by nexus</h1>
            <p className="text-[11px] text-slate-400 font-mono">TXT & DOCX nexus</p>
          </div>
        </div>
      </div>

      {/* Main Create & Import Quick Action */}
      <div className="p-3 gap-2 flex flex-col">
        <button
          onClick={onOpenNewDocModal}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 px-3.5 rounded-lg flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 transition-all active:scale-[0.98] text-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Создать документ</span>
        </button>
        <button
          onClick={onOpenUploader}
          className="w-full bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white font-medium py-2 px-3 rounded-lg flex items-center justify-center gap-2 border border-slate-700/60 transition-all text-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Загрузить / Импорт</span>
        </button>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-5 text-xs">
        {/* Workspace Views */}
        <div>
          <div className="px-2 text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Режимы работы
          </div>
          <nav className="space-y-0.5">
            <button
              onClick={() => onSelectViewMode('explorer')}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md font-medium transition-colors ${
                viewMode === 'explorer' && !showFavoritesOnly
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' 
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-400" />
                <span>Все файлы</span>
              </div>
              <span className="text-[11px] px-1.5 py-0.2 bg-slate-800 text-slate-400 rounded-full font-mono">
                {totalDocs}
              </span>
            </button>

            <button
              onClick={onToggleFavoritesOnly}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md font-medium transition-colors ${
                showFavoritesOnly
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-amber-400 fill-amber-400/20" />
                <span>Избранное</span>
              </div>
            </button>

            <button
              onClick={() => { onSelectViewMode('analytics'); }}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md font-medium transition-colors ${
                viewMode === 'analytics' 
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' 
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-purple-400" />
                <span>Аналитика & Статистика</span>
              </div>
            </button>

            <button
              onClick={() => { onSelectViewMode('compare'); }}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md font-medium transition-colors ${
                viewMode === 'compare' 
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' 
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <GitCompare className="w-4 h-4 text-emerald-400" />
                <span>Сравнение файлов (Diff)</span>
              </div>
            </button>
          </nav>
        </div>

        {/* File Formats Filter */}
        <div>
          <div className="px-2 text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Формат файла
          </div>
          <div className="grid grid-cols-3 gap-1 px-1">
            <button
              onClick={() => onSelectExtension('all')}
              className={`py-1.5 px-2 rounded text-[11px] font-medium transition-all ${
                activeExtension === 'all'
                  ? 'bg-slate-700 text-white font-semibold'
                  : 'bg-slate-800/40 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              Все
            </button>
            <button
              onClick={() => onSelectExtension('docx')}
              className={`py-1.5 px-2 rounded text-[11px] font-medium flex items-center justify-center gap-1 transition-all ${
                activeExtension === 'docx'
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'bg-slate-800/40 text-blue-400 hover:bg-slate-800'
              }`}
            >
              <FileText className="w-3 h-3 text-blue-300" />
              <span>DOCX ({docxCount})</span>
            </button>
            <button
              onClick={() => onSelectExtension('txt')}
              className={`py-1.5 px-2 rounded text-[11px] font-medium flex items-center justify-center gap-1 transition-all ${
                activeExtension === 'txt'
                  ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                  : 'bg-slate-800/40 text-emerald-400 hover:bg-slate-800'
              }`}
            >
              <FileCode className="w-3 h-3 text-emerald-300" />
              <span>TXT ({txtCount})</span>
            </button>
          </div>
        </div>

        {/* Folder Hierarchy */}
        <div>
          <div className="px-2 text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center justify-between">
            <span>Папки хранения</span>
            <span className="text-slate-600 font-mono">{folders.length - 1}</span>
          </div>
          <nav className="space-y-0.5">
            {folders.map((folder) => {
              const isActive = activeFolderId === folder.id && viewMode === 'explorer';
              return (
                <button
                  key={folder.id}
                  onClick={() => {
                    onSelectFolder(folder.id);
                    onSelectViewMode('explorer');
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-slate-800 text-white font-semibold border-l-2 border-blue-500' 
                      : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <FolderIcon 
                      className="w-3.5 h-3.5 shrink-0" 
                      style={{ color: folder.color || '#94a3b8' }} 
                    />
                    <span className="truncate">{folder.name}</span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Status Filter */}
        <div>
          <div className="px-2 text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Статус документа
          </div>
          <div className="flex flex-wrap gap-1 px-1">
            {(['all', 'Draft', 'In Review', 'Final', 'Approved', 'Archived'] as const).map((st) => (
              <button
                key={st}
                onClick={() => onSelectStatus(st)}
                className={`text-[10px] px-2 py-0.5 rounded-full border transition-all ${
                  activeStatus === st
                    ? 'bg-slate-200 text-slate-900 border-slate-200 font-semibold'
                    : 'bg-slate-800/50 text-slate-400 border-slate-700/50 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {st === 'all' ? 'Все статусы' : st}
              </button>
            ))}
          </div>
        </div>

        {/* Tags */}
        {allTags.length > 0 && (
          <div>
            <div className="px-2 text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span>Теги ({allTags.length})</span>
              {selectedTag && (
                <button 
                  onClick={() => onSelectTag(null)}
                  className="text-blue-400 hover:underline text-[10px]"
                >
                  Сбросить
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-1 px-1 max-h-36 overflow-y-auto">
              {allTags.map((tag) => {
                const isSelected = selectedTag === tag;
                return (
                  <button
                    key={tag}
                    onClick={() => onSelectTag(isSelected ? null : tag)}
                    className={`text-[10px] px-2 py-0.5 rounded transition-colors flex items-center gap-1 ${
                      isSelected
                        ? 'bg-blue-500 text-white font-medium'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    <Tag className="w-2.5 h-2.5 opacity-60" />
                    <span>{tag}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Storage & System info Footer */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/50">
        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
          <div className="flex items-center gap-1.5">
            <HardDrive className="w-3.5 h-3.5 text-blue-400" />
            <span>Память хаба</span>
          </div>
          <span className="font-mono text-slate-300">{Math.round(totalStorageKB)} KB</span>
        </div>
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" 
            style={{ width: `${Math.min(100, (totalStorageKB / 500) * 100)}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-[10px] text-slate-500 mt-2">
          <span>DOCX: {docxCount} шт</span>
          <span>TXT: {txtCount} шт</span>
        </div>
      </div>
    </aside>
  );
}
