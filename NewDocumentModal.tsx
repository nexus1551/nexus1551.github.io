import React, { useState } from 'react';
import { Plus, X, FileText, FileCode, Sparkles } from 'lucide-react';
import { DocItem, FileExtension, DocumentCategory, Folder } from '../types';

interface NewDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (doc: DocItem) => void;
  folders: Folder[];
}

const TEMPLATES = [
  {
    id: 'blank-txt',
    name: 'Пустой TXT документ',
    ext: 'txt' as FileExtension,
    category: 'Technical & Code' as DocumentCategory,
    initialContent: 'Новый текстовый документ TXT...\n'
  },
  {
    id: 'blank-docx',
    name: 'Пустой DOCX документ',
    ext: 'docx' as FileExtension,
    category: 'Project Management' as DocumentCategory,
    initialContent: '# ЗАГОЛОВОК НОВОГО ДОКУМЕНТА DOCX\n\nВведите основной текст документа здесь.\n'
  },
  {
    id: 'template-contract',
    name: 'Шаблон Договора (Contract Draft)',
    ext: 'docx' as FileExtension,
    category: 'Legal & Contracts' as DocumentCategory,
    initialContent: `# ДОГОВОР ОКАЗАНИЯ УСЛУГ № ___

**г. Москва**                                                      **"__" ________ 2026 г.**

ООО «Исполнитель», в лице Генерального директора ______________, и ООО «Заказчик» заключили настоящий Договор:

---

## 1. ПРЕДМЕТ ДОГОВОРА
1.1. Исполнитель обязуется оказать услуги по...
`
  },
  {
    id: 'template-meeting',
    name: 'Протокол встречи (Meeting Notes)',
    ext: 'txt' as FileExtension,
    category: 'Project Management' as DocumentCategory,
    initialContent: `ПРОТОКОЛ ВСТРЕЧИ КОМАНДЫ
Дата: ${new Date().toLocaleDateString('ru-RU')}
Участники: ...

ПОВЕСТКА:
1. ...
2. ...

РЕШЕНИЯ И ЗАДАЧИ:
[ ] Задача 1: ...
[ ] Задача 2: ...
`
  },
  {
    id: 'template-tech-spec',
    name: 'Техническая спецификация (Tech Spec)',
    ext: 'docx' as FileExtension,
    category: 'Technical & Code' as DocumentCategory,
    initialContent: `# ТЕХНИЧЕСКАЯ СПЕЦИФИКАЦИЯ ПРОЕКТА

## 1. Введение и Обзор
Описание архитектуры и функциональных требований.

---

## 2. Ключевые Модули
- Модуль A: ...
- Модуль B: ...
`
  }
];

export default function NewDocumentModal({
  isOpen,
  onClose,
  onCreate,
  folders
}: NewDocumentModalProps) {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [extension, setExtension] = useState<FileExtension>('docx');
  const [category, setCategory] = useState<DocumentCategory>('Project Management');
  const [folderId, setFolderId] = useState<string>(folders[0]?.id || 'all');
  const [tagsInput, setTagsInput] = useState('Черновик, 2026');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('blank-docx');
  const [content, setContent] = useState('# НОВЫЙ ДОКУМЕНТ DOCX\n\n');

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
    const tmpl = TEMPLATES.find(t => t.id === templateId);
    if (tmpl) {
      setExtension(tmpl.ext);
      setCategory(tmpl.category);
      setContent(tmpl.initialContent);
      if (!title) {
        setTitle(tmpl.name);
      }
    }
  };

  const handleCreate = () => {
    const finalTitle = title.trim() || 'Новый документ';
    const filename = `${finalTitle.replace(/\s+/g, '_')}.${extension}`;
    const words = content.trim() ? content.trim().split(/\s+/).length : 0;
    const tags = tagsInput.split(',').map(t => t.trim().replace(/^#/, '')).filter(Boolean);

    const newDoc: DocItem = {
      id: `doc-created-${Date.now()}`,
      title: finalTitle,
      filename: filename,
      extension: extension,
      folderId: folderId,
      category: category,
      tags: tags,
      status: 'Draft',
      author: 'Пользователь',
      sizeBytes: new Blob([content]).size,
      wordCount: words,
      characterCount: content.length,
      lineCount: content.split('\n').length,
      readingTimeMinutes: Math.max(1, Math.ceil(words / 200)),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isFavorite: false,
      isArchived: false,
      comments: [],
      versions: [],
      content: content
    };

    onCreate(newDoc);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-xl p-6 shadow-2xl space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-blue-600" />
            <h2 className="font-bold text-slate-900 dark:text-slate-100 text-base">
              Создать новый документ TXT / DOCX
            </h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Template Quick Select */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-2">
            Выберите готовый шаблон:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {TEMPLATES.map((tmpl) => (
              <button
                key={tmpl.id}
                onClick={() => handleSelectTemplate(tmpl.id)}
                className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                  selectedTemplate === tmpl.id
                    ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-500 font-semibold text-blue-700 dark:text-blue-300'
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <div className="font-bold mb-1 truncate">{tmpl.name}</div>
                <span className={`px-1.5 py-0.2 rounded text-[10px] uppercase font-mono ${
                  tmpl.ext === 'docx' ? 'bg-blue-200 dark:bg-blue-900 text-blue-800 dark:text-blue-200' : 'bg-emerald-200 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200'
                }`}>
                  .{tmpl.ext}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Name and Format */}
        <div className="space-y-3 text-xs">
          <div>
            <label className="block text-slate-600 dark:text-slate-300 font-medium mb-1">
              Название документа
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Например: Договор поставки 2026 или Заметки встречи"
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-slate-100 font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-600 dark:text-slate-300 font-medium mb-1">
                Расширение файла
              </label>
              <select
                value={extension}
                onChange={(e) => setExtension(e.target.value as FileExtension)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2 text-slate-800 dark:text-slate-200"
              >
                <option value="docx">.DOCX (Microsoft Word)</option>
                <option value="txt">.TXT (Plain Text)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-600 dark:text-slate-300 font-medium mb-1">
                Папка назначения
              </label>
              <select
                value={folderId}
                onChange={(e) => setFolderId(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2 text-slate-800 dark:text-slate-200"
              >
                {folders.map(f => (
                  <option key={f.id} value={f.id}>{f.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-600 dark:text-slate-300 font-medium mb-1">
              Теги (через запятую)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="Контракт, 2026, Важно"
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-slate-100"
            />
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium rounded-xl"
          >
            Отмена
          </button>
          <button
            onClick={handleCreate}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow-sm"
          >
            Создать документ
          </button>
        </div>
      </div>
    </div>
  );
}
