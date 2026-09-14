import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  FileCode, 
  Eye, 
  Edit3, 
  BarChart2, 
  MessageSquare, 
  History, 
  Download, 
  Printer, 
  Copy, 
  Check, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Minimize2, 
  Tag as TagIcon, 
  Folder as FolderIcon,
  Trash2,
  Clock,
  User,
  Plus,
  Bookmark,
  Share2,
  BookOpen,
  Type,
  FileCheck2,
  Layers,
  Sparkles
} from 'lucide-react';
import { DocItem, Folder } from '../types';

interface DocumentViewerProps {
  doc: DocItem | null;
  folders: Folder[];
  onUpdateDoc: (updated: DocItem) => void;
  onDeleteDoc: (id: string, e: React.MouseEvent) => void;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onCloseViewer?: () => void;
}

export default function DocumentViewer({
  doc,
  folders,
  onUpdateDoc,
  onDeleteDoc,
  onToggleFavorite
}: DocumentViewerProps) {
  if (!doc) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-12 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 text-center">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-slate-800 text-blue-500 flex items-center justify-center mb-4">
          <BookOpen className="w-8 h-8" />
        </div>
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">
          Выберите документ для просмотра
        </h2>
        <p className="text-xs text-slate-500 max-w-md">
          Выберите текстовый файл (.txt) или документ Word (.docx) из списка слева для полноценного чтения, форматированного редактирования, анализа статистики и экспорта.
        </p>
      </div>
    );
  }

  // Active Tab State
  const [activeTab, setActiveTab] = useState<'preview' | 'edit' | 'stats' | 'comments' | 'history'>('preview');

  // Editor State
  const [content, setContent] = useState(doc.content);
  const [title, setTitle] = useState(doc.title);
  const [isCopied, setIsCopied] = useState(false);
  const [newTagInput, setNewTagInput] = useState('');
  const [newCommentInput, setNewCommentInput] = useState('');

  // Reader Customization State
  const [fontFamily, setFontFamily] = useState<'sans' | 'serif' | 'mono'>('sans');
  const [fontSize, setFontSize] = useState<number>(14);
  const [isDistractionFree, setIsDistractionFree] = useState(false);
  const [isDarkPreviewCanvas, setIsDarkPreviewCanvas] = useState(false);

  useEffect(() => {
    setContent(doc.content);
    setTitle(doc.title);
  }, [doc.id]);

  // Recalculate stats on content change
  const handleContentChange = (newVal: string) => {
    setContent(newVal);
    const words = newVal.trim() ? newVal.trim().split(/\s+/).length : 0;
    const chars = newVal.length;
    const lines = newVal.split('\n').length;
    const readingMins = Math.max(1, Math.ceil(words / 200));

    onUpdateDoc({
      ...doc,
      content: newVal,
      title: title,
      wordCount: words,
      characterCount: chars,
      lineCount: lines,
      readingTimeMinutes: readingMins,
      sizeBytes: new Blob([newVal]).size,
      updatedAt: new Date().toISOString()
    });
  };

  const handleTitleBlur = () => {
    if (title.trim() !== doc.title) {
      onUpdateDoc({
        ...doc,
        title: title.trim(),
        updatedAt: new Date().toISOString()
      });
    }
  };

  // Copy content to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Download File as Real .TXT
  const handleDownloadTxt = () => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = doc.filename.endsWith('.txt') ? doc.filename : `${doc.title}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Download File as DOCX simulation
  const handleDownloadDocx = () => {
    const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Doc Export</title></head><body>";
    const footer = "</body></html>";
    const html = header + content.replace(/\n/g, '<br/>') + footer;
    const blob = new Blob(['\ufeff' + html], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = doc.filename.endsWith('.docx') ? doc.filename : `${doc.title}.docx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Add Comment
  const handleAddComment = () => {
    if (!newCommentInput.trim()) return;
    const newComment = {
      id: `comm-${Date.now()}`,
      author: 'Текущий Пользователь',
      text: newCommentInput.trim(),
      createdAt: new Date().toISOString()
    };
    onUpdateDoc({
      ...doc,
      comments: [newComment, ...doc.comments]
    });
    setNewCommentInput('');
  };

  // Add Tag
  const handleAddTag = () => {
    if (!newTagInput.trim()) return;
    const tag = newTagInput.trim().replace(/^#/, '');
    if (!doc.tags.includes(tag)) {
      onUpdateDoc({
        ...doc,
        tags: [...doc.tags, tag]
      });
    }
    setNewTagInput('');
  };

  // Remove Tag
  const handleRemoveTag = (tagToRemove: string) => {
    onUpdateDoc({
      ...doc,
      tags: doc.tags.filter(t => t !== tagToRemove)
    });
  };

  // Render markdown headings / basic markdown preview formatting
  const renderFormattedPreview = (raw: string) => {
    const lines = raw.split('\n');
    return lines.map((line, idx) => {
      if (line.startsWith('# ')) {
        return <h1 key={idx} className="text-2xl font-bold mt-4 mb-2 border-b pb-1 border-slate-200 dark:border-slate-800">{line.replace('# ', '')}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={idx} className="text-xl font-semibold mt-3 mb-1.5 text-blue-600 dark:text-blue-400">{line.replace('## ', '')}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={idx} className="text-lg font-semibold mt-2 mb-1">{line.replace('### ', '')}</h3>;
      }
      if (line.startsWith('---')) {
        return <hr key={idx} className="my-4 border-slate-300 dark:border-slate-800" />;
      }
      if (line.startsWith('- ') || line.startsWith('* ')) {
        return (
          <li key={idx} className="ml-5 list-disc my-0.5">
            {line.substring(2)}
          </li>
        );
      }
      if (line.startsWith('> ')) {
        return (
          <blockquote key={idx} className="border-l-4 border-blue-500 pl-3 italic my-2 text-slate-600 dark:text-slate-400 bg-blue-50/50 dark:bg-blue-950/30 py-1 rounded-r">
            {line.substring(2)}
          </blockquote>
        );
      }
      if (!line.trim()) {
        return <div key={idx} className="h-3" />;
      }
      return (
        <p key={idx} className="my-1 leading-relaxed">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 overflow-hidden">
      {/* Top Header of Selected Document */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/90 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <span
            className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase font-mono tracking-wider shrink-0 ${
              doc.extension === 'docx'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-emerald-600 text-white shadow-xs'
            }`}
          >
            .{doc.extension}
          </span>

          <div className="min-w-0 flex-1">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={handleTitleBlur}
              className="font-bold text-base text-slate-900 dark:text-slate-100 bg-transparent border-b border-transparent hover:border-slate-300 dark:hover:border-slate-700 focus:border-blue-500 focus:outline-none w-full truncate transition-all"
            />
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
              <span>{doc.filename}</span>
              <span>•</span>
              <span>{doc.category}</span>
              <span>•</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">{doc.status}</span>
            </div>
          </div>
        </div>

        {/* Toolbar buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => onToggleFavorite(doc.id, e)}
            className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-amber-500 transition-colors"
            title="Добавить в Избранное"
          >
            <Bookmark className={`w-4 h-4 ${doc.isFavorite ? 'text-amber-400 fill-amber-400' : ''}`} />
          </button>

          <button
            onClick={handleCopy}
            className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 transition-colors flex items-center gap-1.5 text-xs font-medium"
            title="Копировать текст"
          >
            {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            <span className="hidden sm:inline">{isCopied ? 'Скопировано' : 'Копия'}</span>
          </button>

          {/* Download Options */}
          <button
            onClick={handleDownloadTxt}
            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium flex items-center gap-1.5 transition-colors shadow-xs"
            title="Скачать исходный .TXT файл"
          >
            <Download className="w-3.5 h-3.5" />
            <span>.TXT</span>
          </button>

          <button
            onClick={handleDownloadDocx}
            className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium flex items-center gap-1.5 transition-colors shadow-xs"
            title="Экспортировать как .DOCX"
          >
            <Download className="w-3.5 h-3.5" />
            <span>.DOCX</span>
          </button>

          <button
            onClick={(e) => onDeleteDoc(doc.id, e)}
            className="p-2 rounded-lg bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-900/60 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50 transition-colors"
            title="Удалить файл"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tabs & Reader Options Bar */}
      <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-all ${
              activeTab === 'preview'
                ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Просмотр</span>
          </button>

          <button
            onClick={() => setActiveTab('edit')}
            className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-all ${
              activeTab === 'edit'
                ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Редактор</span>
          </button>

          <button
            onClick={() => setActiveTab('stats')}
            className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-all ${
              activeTab === 'stats'
                ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>Статистика</span>
          </button>

          <button
            onClick={() => setActiveTab('comments')}
            className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-all ${
              activeTab === 'comments'
                ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Заметки ({doc.comments.length})</span>
          </button>
        </div>

        {/* Customization controls for preview mode */}
        {activeTab === 'preview' && (
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setFontFamily('sans')}
                className={`px-2 py-0.5 rounded font-sans text-[11px] ${fontFamily === 'sans' ? 'bg-white dark:bg-slate-700 font-semibold shadow-xs' : 'text-slate-500'}`}
              >
                Sans
              </button>
              <button
                onClick={() => setFontFamily('serif')}
                className={`px-2 py-0.5 rounded font-serif text-[11px] ${fontFamily === 'serif' ? 'bg-white dark:bg-slate-700 font-semibold shadow-xs' : 'text-slate-500'}`}
              >
                Serif
              </button>
              <button
                onClick={() => setFontFamily('mono')}
                className={`px-2 py-0.5 rounded font-mono text-[11px] ${fontFamily === 'mono' ? 'bg-white dark:bg-slate-700 font-semibold shadow-xs' : 'text-slate-500'}`}
              >
                Mono
              </button>
            </div>

            <div className="flex items-center gap-1 text-slate-500 bg-slate-100 dark:bg-slate-800 rounded-lg px-2 py-0.5 border border-slate-200 dark:border-slate-700">
              <button onClick={() => setFontSize(Math.max(11, fontSize - 1))} className="hover:text-slate-900 dark:hover:text-white">
                <ZoomOut className="w-3 h-3" />
              </button>
              <span className="font-mono text-[11px] w-6 text-center">{fontSize}px</span>
              <button onClick={() => setFontSize(Math.min(24, fontSize + 1))} className="hover:text-slate-900 dark:hover:text-white">
                <ZoomIn className="w-3 h-3" />
              </button>
            </div>

            <button
              onClick={() => setIsDarkPreviewCanvas(!isDarkPreviewCanvas)}
              className={`px-2 py-1 rounded-lg border text-[11px] font-medium transition-colors ${
                isDarkPreviewCanvas
                  ? 'bg-slate-800 text-white border-slate-700'
                  : 'bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              {isDarkPreviewCanvas ? 'Тёмный лист' : 'Светлый лист'}
            </button>
          </div>
        )}
      </div>

      {/* Main Tab Content View */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'preview' && (
          <div className="max-w-4xl mx-auto">
            {/* Simulated Word Sheet Paper Container */}
            <div
              className={`p-8 md:p-12 rounded-2xl border shadow-sm transition-all min-h-[600px] ${
                isDarkPreviewCanvas
                  ? 'bg-slate-950 text-slate-100 border-slate-800'
                  : 'bg-white text-slate-900 border-slate-200'
              } ${
                fontFamily === 'serif'
                  ? 'font-serif'
                  : fontFamily === 'mono'
                  ? 'font-mono'
                  : 'font-sans'
              }`}
              style={{ fontSize: `${fontSize}px` }}
            >
              {renderFormattedPreview(content)}
            </div>
          </div>
        )}

        {activeTab === 'edit' && (
          <div className="max-w-4xl mx-auto h-full flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
              <div className="flex items-center gap-3">
                <span>Строк: {doc.lineCount}</span>
                <span>Слов: {doc.wordCount}</span>
                <span>Символов: {doc.characterCount}</span>
              </div>
              <span className="text-emerald-500 font-medium">● Автосохранение включено</span>
            </div>

            <textarea
              value={content}
              onChange={(e) => handleContentChange(e.target.value)}
              className="w-full flex-1 min-h-[500px] p-5 font-mono text-sm leading-relaxed bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
              placeholder="Введите или вставьте текст файла здесь..."
            />
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                <div className="text-xs text-slate-500 mb-1">Всего слов</div>
                <div className="text-2xl font-bold font-mono text-blue-600 dark:text-blue-400">
                  {doc.wordCount}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                <div className="text-xs text-slate-500 mb-1">Символов</div>
                <div className="text-2xl font-bold font-mono text-indigo-600 dark:text-indigo-400">
                  {doc.characterCount}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                <div className="text-xs text-slate-500 mb-1">Время чтения</div>
                <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
                  ~{doc.readingTimeMinutes} мин
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                <div className="text-xs text-slate-500 mb-1">Размер диска</div>
                <div className="text-2xl font-bold font-mono text-amber-600 dark:text-amber-400">
                  {(doc.sizeBytes / 1024).toFixed(1)} KB
                </div>
              </div>
            </div>

            {/* Folder & Status assigners */}
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-4">
              <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">
                Метаданные и Управление
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-500 mb-1">Папка хранения</label>
                  <select
                    value={doc.folderId}
                    onChange={(e) => onUpdateDoc({ ...doc, folderId: e.target.value })}
                    className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-slate-800 dark:text-slate-200"
                  >
                    {folders.map(f => (
                      <option key={f.id} value={f.id}>{f.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-500 mb-1">Статус документа</label>
                  <select
                    value={doc.status}
                    onChange={(e) => onUpdateDoc({ ...doc, status: e.target.value as any })}
                    className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-slate-800 dark:text-slate-200"
                  >
                    <option value="Draft">Draft (Черновик)</option>
                    <option value="In Review">In Review (На проверке)</option>
                    <option value="Approved">Approved (Утвержден)</option>
                    <option value="Final">Final (Финальный)</option>
                    <option value="Archived">Archived (В архиве)</option>
                  </select>
                </div>
              </div>

              {/* Tags Manager */}
              <div>
                <label className="block text-slate-500 mb-1 text-xs">Теги документа</label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {doc.tags.map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs px-2 py-0.5 rounded-md font-medium">
                      #{tag}
                      <button onClick={() => handleRemoveTag(tag)} className="hover:text-red-500">✕</button>
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 max-w-sm">
                  <input
                    type="text"
                    value={newTagInput}
                    onChange={(e) => setNewTagInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                    placeholder="Добавить новый тег..."
                    className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-xs"
                  />
                  <button onClick={handleAddTag} className="px-3 py-1 bg-blue-600 text-white text-xs rounded-lg font-medium">
                    + Тег
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'comments' && (
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newCommentInput}
                onChange={(e) => setNewCommentInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                placeholder="Оставить заметку или комментарий к файлу..."
                className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs"
              />
              <button
                onClick={handleAddComment}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs rounded-xl"
              >
                Отправить
              </button>
            </div>

            <div className="space-y-3">
              {doc.comments.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-6">Заметок к этому документу пока нет.</p>
              ) : (
                doc.comments.map(c => (
                  <div key={c.id} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                    <div className="flex items-center justify-between font-semibold text-slate-800 dark:text-slate-200">
                      <span>{c.author}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{new Date(c.createdAt).toLocaleString('ru-RU')}</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300">{c.text}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
