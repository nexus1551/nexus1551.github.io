import React from 'react';
import { 
  FileText, 
  FileCode, 
  Star, 
  Tag, 
  Clock, 
  User, 
  MoreVertical, 
  Download, 
  Trash2, 
  Eye, 
  Edit3, 
  CheckSquare, 
  Square,
  ArrowUpDown,
  Folder as FolderIcon,
  Sparkles,
  FileCheck
} from 'lucide-react';
import { DocItem, LayoutMode, SortOption, SortOrder, Folder } from '../types';

interface DocumentListProps {
  documents: DocItem[];
  selectedDocId: string | null;
  onSelectDoc: (id: string) => void;
  layoutMode: LayoutMode;
  sortOption: SortOption;
  onSortOptionChange: (opt: SortOption) => void;
  sortOrder: SortOrder;
  onToggleSortOrder: () => void;
  selectedDocIds: string[];
  onToggleSelectDocId: (id: string) => void;
  onSelectAllDocs: () => void;
  onClearSelection: () => void;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onDeleteDoc: (id: string, e: React.MouseEvent) => void;
  onBatchDelete: () => void;
  onBatchExportTxt: () => void;
  folders: Folder[];
  searchQuery: string;
}

export default function DocumentList({
  documents,
  selectedDocId,
  onSelectDoc,
  layoutMode,
  sortOption,
  onSortOptionChange,
  sortOrder,
  onToggleSortOrder,
  selectedDocIds,
  onToggleSelectDocId,
  onSelectAllDocs,
  onClearSelection,
  onToggleFavorite,
  onDeleteDoc,
  onBatchDelete,
  onBatchExportTxt,
  folders,
  searchQuery
}: DocumentListProps) {
  const isAllSelected = documents.length > 0 && selectedDocIds.length === documents.length;

  const getFolderName = (folderId: string) => {
    return folders.find(f => f.id === folderId)?.name || 'Общая папка';
  };

  // Format file size
  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  // Highlight search matching snippet
  const renderSnippet = (content: string) => {
    if (!searchQuery.trim()) return null;
    const lowerContent = content.toLowerCase();
    const lowerQuery = searchQuery.toLowerCase();
    const matchIdx = lowerContent.indexOf(lowerQuery);
    if (matchIdx === -1) return null;

    const start = Math.max(0, matchIdx - 25);
    const end = Math.min(content.length, matchIdx + searchQuery.length + 35);
    const snippetText = content.slice(start, end);

    return (
      <div className="mt-2 p-2 rounded bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200 font-mono overflow-hidden truncate">
        <span>...{snippetText.slice(0, matchIdx - start)}</span>
        <mark>{snippetText.slice(matchIdx - start, matchIdx - start + searchQuery.length)}</mark>
        <span>{snippetText.slice(matchIdx - start + searchQuery.length)}...</span>
      </div>
    );
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* Sub-header Controls Bar */}
      <div className="px-6 py-3 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3 text-xs">
          <button
            onClick={isAllSelected ? onClearSelection : onSelectAllDocs}
            className="flex items-center gap-1.5 font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
          >
            {isAllSelected ? (
              <CheckSquare className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            ) : (
              <Square className="w-4 h-4 text-slate-400" />
            )}
            <span>Выбрать все ({documents.length})</span>
          </button>

          {selectedDocIds.length > 0 && (
            <div className="flex items-center gap-2 pl-3 border-l border-slate-300 dark:border-slate-700">
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                Выбрано: {selectedDocIds.length}
              </span>
              <button
                onClick={onBatchDelete}
                className="flex items-center gap-1 px-2.5 py-1 bg-red-100 hover:bg-red-200 dark:bg-red-950/50 dark:hover:bg-red-900/60 text-red-600 dark:text-red-300 rounded-md font-medium transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Удалить выбранные</span>
              </button>
              <button
                onClick={onBatchExportTxt}
                className="flex items-center gap-1 px-2.5 py-1 bg-blue-100 hover:bg-blue-200 dark:bg-blue-950/50 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 rounded-md font-medium transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Экспорт списком</span>
              </button>
            </div>
          )}
        </div>

        {/* Sorting options */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">Сортировка:</span>
          <select
            value={sortOption}
            onChange={(e) => onSortOptionChange(e.target.value as SortOption)}
            className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
          >
            <option value="updatedAt">Дата обновления</option>
            <option value="createdAt">Дата создания</option>
            <option value="title">Название</option>
            <option value="size">Размер файла</option>
            <option value="wordCount">Количество слов</option>
          </select>

          <button
            onClick={onToggleSortOrder}
            title={`Порядок: ${sortOrder === 'asc' ? 'Возрастание' : 'Убывание'}`}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main List Display area */}
      <div className="flex-1 overflow-y-auto p-6">
        {documents.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center text-center p-8 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800">
            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mb-3">
              <FileCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-1">
              Документы не найдены
            </h3>
            <p className="text-xs text-slate-500 max-w-sm">
              Попробуйте изменить условия поиска, сбросить фильтры по тегам или создать новый TXT/DOCX файл.
            </p>
          </div>
        ) : layoutMode === 'grid' ? (
          /* Grid View Mode */
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {documents.map((doc) => {
              const isSelected = selectedDocId === doc.id;
              const isChecked = selectedDocIds.includes(doc.id);
              const isDocx = doc.extension === 'docx';

              return (
                <div
                  key={doc.id}
                  onClick={() => onSelectDoc(doc.id)}
                  className={`group relative rounded-xl p-4 transition-all border cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-500 dark:border-blue-500 shadow-md ring-2 ring-blue-500/20'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs hover:shadow-md'
                  }`}
                >
                  {/* Top Bar inside card */}
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleSelectDocId(doc.id);
                          }}
                          className="text-slate-400 hover:text-blue-600 transition-colors"
                        >
                          {isChecked ? (
                            <CheckSquare className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </button>

                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono tracking-wider shrink-0 ${
                            isDocx
                              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300'
                              : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300'
                          }`}
                        >
                          .{doc.extension}
                        </span>

                        <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          {doc.category}
                        </span>
                      </div>

                      {/* Favorite & Actions */}
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={(e) => onToggleFavorite(doc.id, e)}
                          className="p-1 text-slate-300 hover:text-amber-400 transition-colors"
                        >
                          <Star
                            className={`w-4 h-4 ${
                              doc.isFavorite ? 'text-amber-400 fill-amber-400' : ''
                            }`}
                          />
                        </button>
                        <button
                          onClick={(e) => onDeleteDoc(doc.id, e)}
                          className="p-1 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                          title="Удалить файл"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm leading-snug line-clamp-2 mb-1.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {doc.title}
                    </h3>

                    {/* Filename */}
                    <p className="text-[11px] font-mono text-slate-400 dark:text-slate-500 truncate mb-3">
                      {doc.filename}
                    </p>

                    {/* Search snippet highlight if active */}
                    {renderSnippet(doc.content)}
                  </div>

                  {/* Bottom Stats & Tags */}
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-col gap-2">
                    <div className="flex flex-wrap gap-1">
                      {doc.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-1.5 py-0.5 rounded font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                      {doc.tags.length > 3 && (
                        <span className="text-[10px] text-slate-400">+{doc.tags.length - 3}</span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 pt-1">
                      <div className="flex items-center gap-2">
                        <span>{formatSize(doc.sizeBytes)}</span>
                        <span>•</span>
                        <span>{doc.wordCount} слов</span>
                      </div>
                      <div className="flex items-center gap-1 font-mono text-[10px]">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(doc.updatedAt).toLocaleDateString('ru-RU')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : layoutMode === 'table' ? (
          /* Table View Mode */
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3 w-8">
                    <button onClick={isAllSelected ? onClearSelection : onSelectAllDocs}>
                      {isAllSelected ? <CheckSquare className="w-3.5 h-3.5 text-blue-600" /> : <Square className="w-3.5 h-3.5" />}
                    </button>
                  </th>
                  <th className="p-3">Название файла</th>
                  <th className="p-3">Формат</th>
                  <th className="p-3">Папка / Категория</th>
                  <th className="p-3">Размер</th>
                  <th className="p-3">Слов</th>
                  <th className="p-3">Обновлен</th>
                  <th className="p-3 text-right">Действия</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {documents.map((doc) => {
                  const isSelected = selectedDocId === doc.id;
                  const isChecked = selectedDocIds.includes(doc.id);
                  return (
                    <tr
                      key={doc.id}
                      onClick={() => onSelectDoc(doc.id)}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-blue-50/80 dark:bg-blue-950/40 font-medium'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                      }`}
                    >
                      <td className="p-3" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => onToggleSelectDocId(doc.id)}>
                          {isChecked ? <CheckSquare className="w-3.5 h-3.5 text-blue-600" /> : <Square className="w-3.5 h-3.5 text-slate-400" />}
                        </button>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <button onClick={(e) => onToggleFavorite(doc.id, e)}>
                            <Star className={`w-3.5 h-3.5 ${doc.isFavorite ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`} />
                          </button>
                          <div>
                            <div className="font-semibold text-slate-900 dark:text-slate-100">{doc.title}</div>
                            <div className="font-mono text-[10px] text-slate-400">{doc.filename}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold ${
                          doc.extension === 'docx' 
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300' 
                            : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                        }`}>
                          .{doc.extension}
                        </span>
                      </td>
                      <td className="p-3 text-slate-500">{doc.category}</td>
                      <td className="p-3 font-mono text-slate-500">{formatSize(doc.sizeBytes)}</td>
                      <td className="p-3 font-mono text-slate-500">{doc.wordCount}</td>
                      <td className="p-3 font-mono text-slate-400">
                        {new Date(doc.updatedAt).toLocaleDateString('ru-RU')}
                      </td>
                      <td className="p-3 text-right" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={(e) => onDeleteDoc(doc.id, e)}
                          className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          /* Compact Rows Mode */
          <div className="space-y-2">
            {documents.map((doc) => {
              const isSelected = selectedDocId === doc.id;
              const isChecked = selectedDocIds.includes(doc.id);
              return (
                <div
                  key={doc.id}
                  onClick={() => onSelectDoc(doc.id)}
                  className={`p-3 rounded-xl border flex items-center justify-between gap-4 cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-500'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <button onClick={(e) => { e.stopPropagation(); onToggleSelectDocId(doc.id); }}>
                      {isChecked ? <CheckSquare className="w-4 h-4 text-blue-600" /> : <Square className="w-4 h-4 text-slate-400" />}
                    </button>

                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                      doc.extension === 'docx' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      .{doc.extension}
                    </span>

                    <div className="truncate">
                      <h4 className="font-medium text-slate-900 dark:text-slate-100 text-xs truncate">
                        {doc.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono truncate">
                        <span>{doc.filename}</span>
                        <span>•</span>
                        <span>{formatSize(doc.sizeBytes)}</span>
                        <span>•</span>
                        <span>{doc.wordCount} слов</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
                      {new Date(doc.updatedAt).toLocaleDateString('ru-RU')}
                    </span>
                    <button onClick={(e) => onToggleFavorite(doc.id, e)}>
                      <Star className={`w-3.5 h-3.5 ${doc.isFavorite ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
