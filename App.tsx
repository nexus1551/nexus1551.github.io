import React, { useState, useMemo, useEffect } from 'react';
import { 
  FileText, 
  FileCode, 
  Search, 
  Grid, 
  List, 
  AlignJustify, 
  Plus, 
  Sparkles, 
  Moon, 
  Sun, 
  Download, 
  Upload, 
  GitCompare, 
  BarChart3, 
  PieChart, 
  Tag as TagIcon, 
  Folder as FolderIcon, 
  Star, 
  Clock, 
  HardDrive, 
  Trash2, 
  Eye, 
  Edit3, 
  BarChart2, 
  MessageSquare, 
  Bookmark, 
  Check, 
  Copy, 
  ZoomIn, 
  ZoomOut, 
  CheckSquare, 
  Square, 
  ArrowUpDown, 
  X, 
  ArrowRight, 
  BookOpen, 
  TrendingUp, 
  CheckCircle2, 
  FileCheck 
} from 'lucide-react';

// ============================================================================
// TYPES
// ============================================================================
export type FileExtension = 'txt' | 'docx';

export type DocumentCategory = 
  | 'Legal & Contracts'
  | 'Technical & Code'
  | 'Project Management'
  | 'Reports & Analytics'
  | 'Creative & Notes'
  | 'HR & Onboarding'
  | 'Marketing & Content';

export type DocumentStatus = 'Draft' | 'In Review' | 'Approved' | 'Archived' | 'Final';

export interface DocumentComment {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

export interface DocItem {
  id: string;
  title: string;
  filename: string;
  extension: FileExtension;
  folderId: string;
  category: DocumentCategory;
  tags: string[];
  status: DocumentStatus;
  author: string;
  sizeBytes: number;
  wordCount: number;
  characterCount: number;
  lineCount: number;
  readingTimeMinutes: number;
  createdAt: string;
  updatedAt: string;
  isFavorite: boolean;
  comments: DocumentComment[];
  content: string;
}

export interface Folder {
  id: string;
  name: string;
  color?: string;
}

export type ViewMode = 'explorer' | 'analytics' | 'compare';
export type LayoutMode = 'grid' | 'table' | 'cards';
export type SortOption = 'updatedAt' | 'createdAt' | 'title' | 'size' | 'wordCount';
export type SortOrder = 'asc' | 'desc';

// ============================================================================
// INITIAL DATA
// ============================================================================
const INITIAL_FOLDERS: Folder[] = [
  { id: 'all', name: 'Все файлы (All Files)' },
  { id: 'f-contracts', name: 'Договоры и Право (Contracts)', color: '#3b82f6' },
  { id: 'f-tech', name: 'Техническая документация (Tech Spec)', color: '#10b981' },
  { id: 'f-reports', name: 'Отчеты и Аналитика (Reports)', color: '#f59e0b' },
  { id: 'f-meeting', name: 'Протоколы и Встречи (Meeting Notes)', color: '#8b5cf6' },
  { id: 'f-creative', name: 'Черновики и Заметки (Drafts & Notes)', color: '#ec4899' },
  { id: 'f-hr', name: 'Регламенты и HR (HR Policies)', color: '#6366f1' },
];

const INITIAL_DOCUMENTS: DocItem[] = [
  {
    id: 'doc-1',
    title: 'Договор оказания услуг N 2026-402',
    filename: 'Договор_оказания_услуг_2026.docx',
    extension: 'docx',
    folderId: 'f-contracts',
    category: 'Legal & Contracts',
    tags: ['Контракт', '2026', 'Юриспруденция', 'Подписано'],
    status: 'Final',
    author: 'Алексей Смирнов',
    sizeBytes: 48500,
    wordCount: 1420,
    characterCount: 9850,
    lineCount: 180,
    readingTimeMinutes: 6,
    createdAt: '2026-01-15T10:30:00Z',
    updatedAt: '2026-02-10T14:22:00Z',
    isFavorite: true,
    comments: [
      { id: 'c1', author: 'Елена (Юрист)', text: 'Проверить пункт 2.2 на предмет налоговых рисков УСН.', createdAt: '2026-01-16T09:12:00Z' }
    ],
    content: `# ДОГОВОР ОКАЗАНИЯ УСЛУГ № 2026-402

**г. Москва**                                                      **"15" января 2026 г.**

Общество с ограниченной ответственностью «ТехноИнновации», именуемое в дальнейшем «Исполнитель», в лице Генерального директора Иванова И.И., действующего на основании Устава, с одной стороны, и ООО «ВекторРазвития», именуемое в дальнейшем «Заказчик», заключили настоящий Договор о нижеследующем:

---

## 1. ПРЕДМЕТ ДОГОВОРА
1.1. Исполнитель обязуется по заданию Заказчика оказать комплексные консультационные и инжиниринговые услуги по разработке программного обеспечения и интеграции облачной инфраструктуры, а Заказчик обязуется принять и оплатить эти услуги в порядке и на условиях, предусмотренных настоящим Договором.

---

## 2. СТОИМОСТЬ УСЛУГ И ПОРЯДОК РАСЧЕТОВ
2.1. Общая стоимость услуг по настоящему Договору составляет **2 450 000 (Два миллиона четыреста пятьдесят тысяч) рублей 00 копеек**, без НДС (применение УСН).

2.2. Оплата производится поэтапно согласно Графику платежей:
- **Этап 1 (Предоплата):** 30% в течение 5 банковских дней с момента подписания Договора;
- **Этап 2 (Промежуточная приемка):** 40% после сдачи модулей Архитектуры и API;
- **Этап 3 (Финальный расчет):** 30% в течение 10 дней после подписания итогового Акта сдачи-приемки.

---

## 3. ПОДПИСИ И РЕКВИЗИТЫ СТОРОН
- Исполнитель: ООО «ТехноИнновации» (ИНН 7701234567)
- Заказчик: ООО «ВекторРазвития» (ИНН 7709876543)`
  },
  {
    id: 'doc-2',
    title: 'Техническое задание на разработку API и БД',
    filename: 'System_Architecture_Spec_v3.docx',
    extension: 'docx',
    folderId: 'f-tech',
    category: 'Technical & Code',
    tags: ['Архитектура', 'API', 'PostgreSQL', 'Vite', 'React'],
    status: 'In Review',
    author: 'Мария Корнеева',
    sizeBytes: 32400,
    wordCount: 1150,
    characterCount: 8200,
    lineCount: 145,
    readingTimeMinutes: 5,
    createdAt: '2026-02-01T11:00:00Z',
    updatedAt: '2026-03-01T09:15:00Z',
    isFavorite: true,
    comments: [],
    content: `# ТЕХНИЧЕСКОЕ ЗАДАНИЕ: МИКРОСЕРВИСНАЯ СИСТЕМА И API v3

## 1. Введение и Цели
Настоящий документ описывает архитектуру high-load бэкенд сервиса для обработки и полнотекстового индексирования документов формата TXT и DOCX.

### Ключевые требования к производительности:
- Время отклика при поиске по 100,000+ документам: **< 120ms**
- Пропускная способность закачки файлов: **не менее 500 req/sec**

---

## 2. Стек Технологий
1. **Frontend:** React 19, TypeScript 5.7, Vite 8, Tailwind CSS v4.
2. **Backend API:** Node.js (Fastify / Express framework).
3. **База данных:** PostgreSQL 16 с расширением pgvector.`
  },
  {
    id: 'doc-3',
    title: 'Конфигурация сервера и логи сбоя systemd.txt',
    filename: 'server_deployment_notes.txt',
    extension: 'txt',
    folderId: 'f-tech',
    category: 'Technical & Code',
    tags: ['Linux', 'DevOps', 'Logs', 'Nginx', 'Configuration'],
    status: 'Approved',
    author: 'Дмитрий Волков',
    sizeBytes: 18200,
    wordCount: 890,
    characterCount: 6400,
    lineCount: 120,
    readingTimeMinutes: 4,
    createdAt: '2026-02-14T16:00:00Z',
    updatedAt: '2026-02-14T16:45:00Z',
    isFavorite: false,
    comments: [],
    content: `===================================================================
DEPLOYMENT & SYSTEM LOGS REPORT - PRODUCTION CLUSTER 04
Generated at: 2026-02-14 16:45:12 UTC
Server IP: 192.168.10.42 (node-prod-east)
===================================================================

[ENV CONFIGURATION]
NODE_ENV=production
PORT=8443
MAX_FILE_UPLOAD_SIZE=50MB
ALLOWED_EXTENSIONS=.txt,.docx

[SYSTEMD HEALTH CHECK LOGS]
● docx-worker.service - Docx Processing & Parsing Queue
   Loaded: loaded (/etc/systemd/system/docx-worker.service; enabled)
   Active: active (running) since Thu 2026-02-12 08:00:00 UTC

Feb 14 14:02:11 node-prod-east docx-worker: [INFO] Successfully parsed Contract_2026.docx
Feb 14 14:15:33 node-prod-east docx-worker: [INFO] Batch job finished. 45 documents processed. Zero errors.`
  },
  {
    id: 'doc-4',
    title: 'Отчет о финансовых результатах Q1 2026',
    filename: 'Financial_Report_Q1_2026.docx',
    extension: 'docx',
    folderId: 'f-reports',
    category: 'Reports & Analytics',
    tags: ['Финансы', 'Q1', 'Отчет', 'Бюджет', 'KPI'],
    status: 'Final',
    author: 'Ольга Васильева',
    sizeBytes: 52100,
    wordCount: 1850,
    characterCount: 13200,
    lineCount: 210,
    readingTimeMinutes: 8,
    createdAt: '2026-03-01T08:00:00Z',
    updatedAt: '2026-03-05T12:00:00Z',
    isFavorite: true,
    comments: [],
    content: `# ФИНАНСОВЫЙ ОТЧЕТ И АНАЛИЗ ПОКАЗАТЕЛЕЙ ЗА I КВАРТАЛ 2026 ГОДА

## 1. Резюме Руководства
В первом квартале 2026 года выручка компании увеличилась на **+24.8%** по сравнению с аналогичным периодом прошлого года и составила **48.2 млн рублей**.

---

## 2. Финансовые Показатели
- Выручка (Revenue): **48.2 млн руб.** (+9.5% к плану)
- Валовая прибыль: **31.8 млн руб.** (+11.5% к плану)
- EBITDA: **16.0 млн руб.** (+28.0% к плану)`
  },
  {
    id: 'doc-5',
    title: 'Протокол встречи команды разработки 02.03.2026.txt',
    filename: 'Meeting_Notes_2026_03_02.txt',
    extension: 'txt',
    folderId: 'f-meeting',
    category: 'Project Management',
    tags: ['Спринт', 'Meeting', 'Agile', 'Задачи'],
    status: 'Approved',
    author: 'Анна Кузнецова',
    sizeBytes: 9400,
    wordCount: 520,
    characterCount: 3800,
    lineCount: 75,
    readingTimeMinutes: 3,
    createdAt: '2026-03-02T15:00:00Z',
    updatedAt: '2026-03-02T16:20:00Z',
    isFavorite: false,
    comments: [],
    content: `ПРОТОКОЛ ЕЖЕНЕДЕЛЬНОЙ ВСТРЕЧИ КОМАНДЫ РАЗРАБОТКИ
Дата: 02 марта 2026 г.
Участники: Алексей, Мария, Дмитрий, Ольга, Анна

ПОВЕСТКА ДНЯ:
1. Итоги Спринта #42 (Поддержка DOCX и TXT файлов)
2. Демо функционала массовой загрузки и сравнения

ПРИНЯТЫЕ РЕШЕНИЯ:
[x] Реализовать встроенный просмотрщик с подсветкой слов.
[x] Добавить выгрузку в формате DOCX и TXT.`
  }
];

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

ООО «Исполнитель» и ООО «Заказчик» заключили настоящий Договор:
`
  }
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function App() {
  const [documents, setDocuments] = useState<DocItem[]>(() => {
    const saved = localStorage.getItem('dochub_documents_v1');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return INITIAL_DOCUMENTS;
  });

  const [folders] = useState<Folder[]>(INITIAL_FOLDERS);
  const [selectedDocId, setSelectedDocId] = useState<string | null>(documents[0]?.id || null);
  const [activeFolderId, setActiveFolderId] = useState<string>('all');
  const [activeExtension, setActiveExtension] = useState<FileExtension | 'all'>('all');
  const [activeStatus, setActiveStatus] = useState<DocumentStatus | 'all'>('all');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [viewMode, setViewMode] = useState<ViewMode>('explorer');
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('grid');
  const [sortOption, setSortOption] = useState<SortOption>('updatedAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [selectedDocIds, setSelectedDocIds] = useState<string[]>([]);

  // Modals
  const [isUploaderOpen, setIsUploaderOpen] = useState(false);
  const [isNewDocModalOpen, setIsNewDocModalOpen] = useState(false);

  // Viewer state
  const [viewerTab, setViewerTab] = useState<'preview' | 'edit' | 'stats' | 'comments'>('preview');
  const [fontFamily, setFontFamily] = useState<'sans' | 'serif' | 'mono'>('sans');
  const [fontSize, setFontSize] = useState<number>(14);
  const [isDarkPreviewCanvas, setIsDarkPreviewCanvas] = useState(false);
  const [editContent, setContent] = useState('');
  const [editTitle, setTitle] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [newCommentInput, setNewCommentInput] = useState('');
  const [newTagInput, setNewTagInput] = useState('');

  // Comparer state
  const [doc1Id, setDoc1Id] = useState<string>(documents[0]?.id || '');
  const [doc2Id, setDoc2Id] = useState<string>(documents[1]?.id || documents[0]?.id || '');

  // New Doc state
  const [newDocTitle, setNewDocTitle] = useState('');
  const [newDocExt, setNewDocExt] = useState<FileExtension>('docx');
  const [newDocFolder, setNewDocFolder] = useState('all');
  const [newDocTags, setNewDocTags] = useState('Черновик, 2026');
  const [newDocTemplate, setNewDocTemplate] = useState('blank-docx');
  const [newDocContent, setNewDocContent] = useState('# НОВЫЙ ДОКУМЕНТ DOCX\n\n');

  // Uploader state
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  useEffect(() => {
    localStorage.setItem('dochub_documents_v1', JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const selectedDoc = useMemo(() => documents.find(d => d.id === selectedDocId) || null, [documents, selectedDocId]);

  useEffect(() => {
    if (selectedDoc) {
      setContent(selectedDoc.content);
      setTitle(selectedDoc.title);
    }
  }, [selectedDocId]);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    documents.forEach(d => d.tags.forEach(t => set.add(t)));
    return Array.from(set).sort();
  }, [documents]);

  const totalStorageKB = useMemo(() => documents.reduce((acc, d) => acc + d.sizeBytes, 0) / 1024, [documents]);
  const txtCount = useMemo(() => documents.filter(d => d.extension === 'txt').length, [documents]);
  const docxCount = useMemo(() => documents.filter(d => d.extension === 'docx').length, [documents]);

  const filteredDocuments = useMemo(() => {
    return documents.filter(doc => {
      if (activeFolderId !== 'all' && doc.folderId !== activeFolderId) return false;
      if (activeExtension !== 'all' && doc.extension !== activeExtension) return false;
      if (activeStatus !== 'all' && doc.status !== activeStatus) return false;
      if (selectedTag && !doc.tags.includes(selectedTag)) return false;
      if (showFavoritesOnly && !doc.isFavorite) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = doc.title.toLowerCase().includes(q);
        const matchesFilename = doc.filename.toLowerCase().includes(q);
        const matchesTag = doc.tags.some(t => t.toLowerCase().includes(q));
        const matchesContent = doc.content.toLowerCase().includes(q);
        if (!matchesTitle && !matchesFilename && !matchesTag && !matchesContent) return false;
      }
      return true;
    }).sort((a, b) => {
      let valA: any = a[sortOption];
      let valB: any = b[sortOption];
      if (sortOption === 'updatedAt' || sortOption === 'createdAt') {
        valA = new Date(valA).getTime();
        valB = new Date(valB).getTime();
      }
      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [documents, activeFolderId, activeExtension, activeStatus, selectedTag, showFavoritesOnly, searchQuery, sortOption, sortOrder]);

  // Handlers
  const handleUpdateDoc = (updated: DocItem) => {
    setDocuments(prev => prev.map(d => d.id === updated.id ? updated : d));
  };

  const handleDeleteDoc = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setDocuments(prev => prev.filter(d => d.id !== id));
    setSelectedDocIds(prev => prev.filter(i => i !== id));
    if (selectedDocId === id) setSelectedDocId(null);
  };

  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDocuments(prev => prev.map(d => d.id === id ? { ...d, isFavorite: !d.isFavorite } : d));
  };

  const handleContentChange = (val: string) => {
    setContent(val);
    if (!selectedDoc) return;
    const words = val.trim() ? val.trim().split(/\s+/).length : 0;
    const chars = val.length;
    const lines = val.split('\n').length;
    handleUpdateDoc({
      ...selectedDoc,
      content: val,
      wordCount: words,
      characterCount: chars,
      lineCount: lines,
      sizeBytes: new Blob([val]).size,
      updatedAt: new Date().toISOString()
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(editContent);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    if (!selectedDoc) return;
    const blob = new Blob([editContent], { type: 'text/plain;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = selectedDoc.filename.endsWith('.txt') ? selectedDoc.filename : `${selectedDoc.title}.txt`;
    a.click();
  };

  const handleDownloadDocx = () => {
    if (!selectedDoc) return;
    const html = `<html><body>${editContent.replace(/\n/g, '<br/>')}</body></html>`;
    const blob = new Blob(['\ufeff' + html], { type: 'application/msword' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = selectedDoc.filename.endsWith('.docx') ? selectedDoc.filename : `${selectedDoc.title}.docx`;
    a.click();
  };

  const handleGenerateSamples = (count: number) => {
    const generated: DocItem[] = [];
    for (let i = 1; i <= count; i++) {
      const isDocx = i % 2 === 0;
      const ext: FileExtension = isDocx ? 'docx' : 'txt';
      const words = 100 + i * 20;
      const body = isDocx
        ? `# СГЕНЕРИРОВАННЫЙ ДОКУМЕНТ WORD #${i}\n\nФайл для тестирования обработки информации в хабе.\n\n## Секция ${i}\n- Статус: Активен\n- Тип: Microsoft Word`
        : `ТЕКСТОВЫЙ ФАЙЛ TXT #${i}\n-------------------------------\nТекст файла #${i} для проверки работы поиска.`;
      generated.push({
        id: `gen-${Date.now()}-${i}`,
        title: `Файл #${i} (${isDocx ? 'Docx' : 'Txt'})`,
        filename: `Generated_${i}.${ext}`,
        extension: ext,
        folderId: 'all',
        category: 'Project Management',
        tags: ['Тест', ext.toUpperCase()],
        status: 'Draft',
        author: 'Генератор',
        sizeBytes: new Blob([body]).size,
        wordCount: words,
        characterCount: body.length,
        lineCount: body.split('\n').length,
        readingTimeMinutes: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isFavorite: false,
        comments: [],
        content: body
      });
    }
    setDocuments(prev => [...generated, ...prev]);
    if (generated.length > 0) setSelectedDocId(generated[0].id);
  };

  const handleCreateNewDoc = () => {
    const title = newDocTitle.trim() || 'Новый документ';
    const filename = `${title.replace(/\s+/g, '_')}.${newDocExt}`;
    const words = newDocContent.trim() ? newDocContent.trim().split(/\s+/).length : 0;
    const tags = newDocTags.split(',').map(t => t.trim().replace(/^#/, '')).filter(Boolean);

    const doc: DocItem = {
      id: `doc-${Date.now()}`,
      title: title,
      filename: filename,
      extension: newDocExt,
      folderId: newDocFolder,
      category: 'Project Management',
      tags: tags,
      status: 'Draft',
      author: 'Пользователь',
      sizeBytes: new Blob([newDocContent]).size,
      wordCount: words,
      characterCount: newDocContent.length,
      lineCount: newDocContent.split('\n').length,
      readingTimeMinutes: Math.max(1, Math.ceil(words / 200)),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isFavorite: false,
      comments: [],
      content: newDocContent
    };

    setDocuments(prev => [doc, ...prev]);
    setSelectedDocId(doc.id);
    setIsNewDocModalOpen(false);
    setViewMode('explorer');
  };

  // Render Markdown preview
  const renderPreview = (raw: string) => {
    return raw.split('\n').map((line, idx) => {
      if (line.startsWith('# ')) return <h1 key={idx} className="text-2xl font-bold mt-4 mb-2 border-b pb-1 border-slate-200 dark:border-slate-800">{line.slice(2)}</h1>;
      if (line.startsWith('## ')) return <h2 key={idx} className="text-xl font-semibold mt-3 mb-1 text-blue-600 dark:text-blue-400">{line.slice(3)}</h2>;
      if (line.startsWith('---')) return <hr key={idx} className="my-4 border-slate-300 dark:border-slate-800" />;
      if (line.startsWith('- ')) return <li key={idx} className="ml-5 list-disc my-0.5">{line.slice(2)}</li>;
      if (!line.trim()) return <div key={idx} className="h-3" />;
      return <p key={idx} className="my-1 leading-relaxed">{line}</p>;
    });
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-900 font-sans text-slate-100 select-none">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-200 border-r border-slate-800 flex flex-col h-screen shrink-0">
        <div className="p-4 border-b border-slate-800 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-500 flex items-center justify-center shadow-lg text-white font-bold">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-slate-100 text-base leading-tight">DocHub Ultra</h1>
            <p className="text-[11px] text-slate-400 font-mono">TXT & DOCX Hub</p>
          </div>
        </div>

        <div className="p-3 gap-2 flex flex-col">
          <button
            onClick={() => setIsNewDocModalOpen(true)}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 px-3.5 rounded-lg flex items-center justify-center gap-2 shadow-md text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Создать документ</span>
          </button>
          <button
            onClick={() => setIsUploaderOpen(true)}
            className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium py-2 px-3 rounded-lg flex items-center justify-center gap-2 border border-slate-700/60 text-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Загрузить / Пакет</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-5 text-xs">
          <div>
            <div className="px-2 text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Режимы</div>
            <nav className="space-y-0.5">
              <button
                onClick={() => { setViewMode('explorer'); setShowFavoritesOnly(false); }}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md font-medium ${viewMode === 'explorer' && !showFavoritesOnly ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-slate-300 hover:bg-slate-800'}`}
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-400" />
                  <span>Все файлы</span>
                </div>
                <span className="text-[11px] px-1.5 py-0.2 bg-slate-800 text-slate-400 rounded-full font-mono">{documents.length}</span>
              </button>
              <button
                onClick={() => { setShowFavoritesOnly(true); setViewMode('explorer'); }}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md font-medium ${showFavoritesOnly ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-slate-300 hover:bg-slate-800'}`}
              >
                <div className="flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-amber-400" />
                  <span>Избранное</span>
                </div>
              </button>
              <button
                onClick={() => setViewMode('analytics')}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md font-medium ${viewMode === 'analytics' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-slate-300 hover:bg-slate-800'}`}
              >
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-purple-400" />
                  <span>Аналитика</span>
                </div>
              </button>
              <button
                onClick={() => setViewMode('compare')}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md font-medium ${viewMode === 'compare' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-slate-300 hover:bg-slate-800'}`}
              >
                <div className="flex items-center gap-2">
                  <GitCompare className="w-4 h-4 text-emerald-400" />
                  <span>Сравнение (Diff)</span>
                </div>
              </button>
            </nav>
          </div>

          <div>
            <div className="px-2 text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Формат</div>
            <div className="grid grid-cols-3 gap-1 px-1">
              <button onClick={() => setActiveExtension('all')} className={`py-1 rounded text-[11px] ${activeExtension === 'all' ? 'bg-slate-700 text-white font-bold' : 'bg-slate-800/40 text-slate-400'}`}>Все</button>
              <button onClick={() => setActiveExtension('docx')} className={`py-1 rounded text-[11px] ${activeExtension === 'docx' ? 'bg-blue-600 text-white font-bold' : 'bg-slate-800/40 text-blue-400'}`}>DOCX</button>
              <button onClick={() => setActiveExtension('txt')} className={`py-1 rounded text-[11px] ${activeExtension === 'txt' ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-800/40 text-emerald-400'}`}>TXT</button>
            </div>
          </div>

          <div>
            <div className="px-2 text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Папки</div>
            <nav className="space-y-0.5">
              {folders.map(f => (
                <button
                  key={f.id}
                  onClick={() => { setActiveFolderId(f.id); setViewMode('explorer'); }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-slate-300 hover:bg-slate-800 ${activeFolderId === f.id && viewMode === 'explorer' ? 'bg-slate-800 text-white font-bold border-l-2 border-blue-500' : ''}`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <FolderIcon className="w-3.5 h-3.5 shrink-0" style={{ color: f.color || '#94a3b8' }} />
                    <span className="truncate">{f.name}</span>
                  </div>
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="p-3 border-t border-slate-800 bg-slate-950/50 text-[11px] text-slate-400">
          <div className="flex justify-between mb-1">
            <span>Объём папок</span>
            <span className="font-mono text-slate-200">{Math.round(totalStorageKB)} KB</span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.min(100, (totalStorageKB / 300) * 100)}%` }} />
          </div>
        </div>
      </aside>

      {/* Main Panel */}
      <div className="flex-1 flex flex-col h-full min-w-0">
        {/* Header */}
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 flex items-center justify-between gap-4">
          <div className="flex-1 max-w-xl relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по названию, тегам или содержимому файлов..."
              className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsNewDocModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs rounded-xl shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Создать файл</span>
            </button>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 flex overflow-hidden">
          {viewMode === 'explorer' ? (
            <div className="flex-1 flex h-full">
              {/* Document List */}
              <div className="w-80 border-r border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-col h-full overflow-hidden">
                <div className="p-3 border-b border-slate-200 dark:border-slate-800 text-xs flex justify-between items-center text-slate-500">
                  <span>Документы ({filteredDocuments.length})</span>
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value as any)}
                    className="bg-transparent text-slate-700 dark:text-slate-300 font-medium"
                  >
                    <option value="updatedAt">Дата</option>
                    <option value="title">Название</option>
                    <option value="wordCount">Слова</option>
                  </select>
                </div>

                <div className="flex-1 overflow-y-auto p-3 space-y-2">
                  {filteredDocuments.map((doc) => {
                    const isSelected = selectedDocId === doc.id;
                    return (
                      <div
                        key={doc.id}
                        onClick={() => setSelectedDocId(doc.id)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-500 shadow-xs'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase ${
                            doc.extension === 'docx' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-200'
                          }`}>
                            .{doc.extension}
                          </span>
                          <button onClick={(e) => handleToggleFavorite(doc.id, e)}>
                            <Star className={`w-3.5 h-3.5 ${doc.isFavorite ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`} />
                          </button>
                        </div>
                        <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-xs truncate mb-1">
                          {doc.title}
                        </h4>
                        <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                          <span>{doc.wordCount} слов</span>
                          <span>{new Date(doc.updatedAt).toLocaleDateString('ru-RU')}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Document Reader / Editor Workspace */}
              <div className="flex-1 flex flex-col h-full bg-white dark:bg-slate-900 overflow-hidden">
                {selectedDoc ? (
                  <>
                    <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
                      <div>
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setTitle(e.target.value)}
                          onBlur={() => handleUpdateDoc({ ...selectedDoc, title: editTitle })}
                          className="font-bold text-base text-slate-900 dark:text-slate-100 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-500 focus:outline-none"
                        />
                        <div className="text-xs text-slate-400 font-mono">{selectedDoc.filename}</div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button onClick={handleCopy} className="p-2 rounded bg-slate-100 dark:bg-slate-800 text-xs">
                          {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                        </button>
                        <button onClick={handleDownloadTxt} className="px-3 py-1.5 bg-emerald-600 text-white rounded text-xs font-bold">
                          .TXT
                        </button>
                        <button onClick={handleDownloadDocx} className="px-3 py-1.5 bg-blue-600 text-white rounded text-xs font-bold">
                          .DOCX
                        </button>
                        <button onClick={(e) => handleDeleteDoc(selectedDoc.id, e)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 rounded">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 text-xs">
                      <button onClick={() => setViewerTab('preview')} className={`px-3 py-1 rounded ${viewerTab === 'preview' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400'}`}>Просмотр</button>
                      <button onClick={() => setViewerTab('edit')} className={`px-3 py-1 rounded ${viewerTab === 'edit' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400'}`}>Редактор</button>
                      <button onClick={() => setViewerTab('stats')} className={`px-3 py-1 rounded ${viewerTab === 'stats' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400'}`}>Инфо</button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6">
                      {viewerTab === 'preview' ? (
                        <div className="max-w-3xl mx-auto p-8 rounded-2xl border shadow-sm bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 border-slate-200 dark:border-slate-800">
                          {renderPreview(editContent)}
                        </div>
                      ) : viewerTab === 'edit' ? (
                        <textarea
                          value={editContent}
                          onChange={(e) => handleContentChange(e.target.value)}
                          className="w-full h-full min-h-[500px] p-4 font-mono text-sm leading-relaxed bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none"
                        />
                      ) : (
                        <div className="max-w-xl mx-auto space-y-4">
                          <div className="grid grid-cols-3 gap-3 text-center">
                            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
                              <div className="text-xs text-slate-400">Слов</div>
                              <div className="text-xl font-bold font-mono text-blue-500">{selectedDoc.wordCount}</div>
                            </div>
                            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
                              <div className="text-xs text-slate-400">Символов</div>
                              <div className="text-xl font-bold font-mono text-indigo-500">{selectedDoc.characterCount}</div>
                            </div>
                            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
                              <div className="text-xs text-slate-400">Строк</div>
                              <div className="text-xl font-bold font-mono text-emerald-500">{selectedDoc.lineCount}</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">
                    Выберите документ из списка слева
                  </div>
                )}
              </div>
            </div>
          ) : viewMode === 'analytics' ? (
            <div className="flex-1 p-8 overflow-y-auto space-y-6 bg-slate-950">
              <h2 className="text-lg font-bold">Аналитика документов (.TXT & .DOCX)</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl">
                  <div className="text-xs text-slate-400">Всего документов</div>
                  <div className="text-3xl font-mono font-bold text-blue-400 mt-1">{documents.length}</div>
                </div>
                <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl">
                  <div className="text-xs text-slate-400">DOCX Документов</div>
                  <div className="text-3xl font-mono font-bold text-indigo-400 mt-1">{docxCount}</div>
                </div>
                <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl">
                  <div className="text-xs text-slate-400">TXT Текстовых файлов</div>
                  <div className="text-3xl font-mono font-bold text-emerald-400 mt-1">{txtCount}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-950">
              <h2 className="text-lg font-bold">Сравнение файлов Side-by-Side</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs">
                  <h4 className="font-bold mb-2">Файл A: {documents[0]?.title}</h4>
                  <pre className="whitespace-pre-wrap">{documents[0]?.content}</pre>
                </div>
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs">
                  <h4 className="font-bold mb-2">Файл B: {documents[1]?.title}</h4>
                  <pre className="whitespace-pre-wrap">{documents[1]?.content}</pre>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* New Doc Modal */}
      {isNewDocModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <h3 className="font-bold text-sm">Новый документ</h3>
              <button onClick={() => setIsNewDocModalOpen(false)}>✕</button>
            </div>
            <input
              type="text"
              value={newDocTitle}
              onChange={(e) => setNewDocTitle(e.target.value)}
              placeholder="Название файла"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs"
            />
            <div className="flex gap-2">
              <select value={newDocExt} onChange={(e) => setNewDocExt(e.target.value as any)} className="bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs flex-1">
                <option value="docx">.DOCX</option>
                <option value="txt">.TXT</option>
              </select>
            </div>
            <button onClick={handleCreateNewDoc} className="w-full py-2 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-xs">
              Создать
            </button>
          </div>
        </div>
      )}

      {/* Uploader / Generator Modal */}
      {isUploaderOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <h3 className="font-bold text-sm">Генератор и Пакетный Импорт</h3>
              <button onClick={() => setIsUploaderOpen(false)}>✕</button>
            </div>
            <p className="text-xs text-slate-400">Сгенерируйте множество тестовых файлов (.txt и .docx) для проверки работы:</p>
            <div className="flex gap-2">
              <button onClick={() => { handleGenerateSamples(10); setIsUploaderOpen(false); }} className="flex-1 py-2 bg-amber-600 text-xs font-bold rounded-xl">
                +10 Файлов
              </button>
              <button onClick={() => { handleGenerateSamples(25); setIsUploaderOpen(false); }} className="flex-1 py-2 bg-indigo-600 text-xs font-bold rounded-xl">
                +25 Файлов
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
