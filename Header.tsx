import React from 'react';
import { 
  Search, 
  Grid, 
  List, 
  AlignJustify, 
  Plus, 
  Sparkles, 
  Moon, 
  Sun, 
  Layers, 
  Download, 
  FileText,
  FileCode,
  FolderPlus
} from 'lucide-react';
import { LayoutMode, ViewMode } from '../types';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  layoutMode: LayoutMode;
  onLayoutChange: (mode: LayoutMode) => void;
  viewMode: ViewMode;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenNewModal: () => void;
  onOpenBatchModal: () => void;
  onExportAllJson: () => void;
  totalFilteredCount: number;
}

export default function Header({
  searchQuery,
  onSearchChange,
  layoutMode,
  onLayoutChange,
  viewMode,
  isDarkMode,
  onToggleDarkMode,
  onOpenNewModal,
  onOpenBatchModal,
  onExportAllJson,
  totalFilteredCount
}: HeaderProps) {
  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 flex items-center justify-between shrink-0 gap-4 shadow-xs">
      {/* Search Input */}
      <div className="flex-1 max-w-xl relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Поиск по названию, тегам, автору или содержимому файлов..."
          className="w-full pl-10 pr-10 py-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm rounded-xl border border-slate-200 dark:border-slate-700/80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-400"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-200 dark:bg-slate-700 rounded-full w-4 h-4 flex items-center justify-center"
          >
            ✕
          </button>
        )}
      </div>

      {/* Center status badge */}
      <div className="hidden lg:flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-200/80 dark:border-slate-700/50">
        <span className="font-semibold text-slate-800 dark:text-slate-200">{totalFilteredCount}</span>
        <span>документов найдено</span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2">
        {/* Layout Mode Selector (Only when in explorer) */}
        {viewMode === 'explorer' && (
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700/80">
            <button
              onClick={() => onLayoutChange('grid')}
              title="Сетка карт"
              className={`p-1.5 rounded-md transition-colors ${
                layoutMode === 'grid' 
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onLayoutChange('table')}
              title="Таблица документов"
              className={`p-1.5 rounded-md transition-colors ${
                layoutMode === 'table' 
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => onLayoutChange('cards')}
              title="Компактные строки"
              className={`p-1.5 rounded-md transition-colors ${
                layoutMode === 'cards' 
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <AlignJustify className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Batch Operations Button */}
        <button
          onClick={onOpenBatchModal}
          className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium rounded-xl border border-slate-200 dark:border-slate-700/80 transition-colors"
          title="Массовые операции и генератор файлов"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Генератор & Масс-Пак</span>
        </button>

        {/* Export Backup button */}
        <button
          onClick={onExportAllJson}
          className="hidden md:flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium rounded-xl border border-slate-200 dark:border-slate-700/80 transition-colors"
          title="Скачать весь архив хаба в JSON"
        >
          <Download className="w-3.5 h-3.5 text-blue-500" />
          <span>Экспорт JSON</span>
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={onToggleDarkMode}
          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80 transition-colors"
          title={isDarkMode ? 'Светлая тема' : 'Тёмная тема'}
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
        </button>

        {/* Create Document CTA Button */}
        <button
          onClick={onOpenNewModal}
          className="flex items-center gap-2 px-3.5 py-2 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-medium text-xs rounded-xl shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Новый файл</span>
        </button>
      </div>
    </header>
  );
}
