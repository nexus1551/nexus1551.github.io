import React from 'react';
import { 
  BarChart3, 
  FileText, 
  FileCode, 
  Tag, 
  Folder, 
  Layers, 
  Clock, 
  PieChart, 
  HardDrive,
  TrendingUp,
  CheckCircle2
} from 'lucide-react';
import { DocItem } from '../types';

interface AnalyticsDashboardProps {
  documents: DocItem[];
}

export default function AnalyticsDashboard({ documents }: AnalyticsDashboardProps) {
  const totalDocs = documents.length;
  const docxCount = documents.filter(d => d.extension === 'docx').length;
  const txtCount = documents.filter(d => d.extension === 'txt').length;

  const totalWords = documents.reduce((acc, d) => acc + d.wordCount, 0);
  const totalBytes = documents.reduce((acc, d) => acc + d.sizeBytes, 0);
  const totalReadingMins = documents.reduce((acc, d) => acc + d.readingTimeMinutes, 0);

  // Category counts
  const categoryMap: Record<string, number> = {};
  documents.forEach(d => {
    categoryMap[d.category] = (categoryMap[d.category] || 0) + 1;
  });

  // Status counts
  const statusMap: Record<string, number> = {};
  documents.forEach(d => {
    statusMap[d.status] = (statusMap[d.status] || 0) + 1;
  });

  // Top Tags
  const tagMap: Record<string, number> = {};
  documents.forEach(d => {
    d.tags.forEach(t => {
      tagMap[t] = (tagMap[t] || 0) + 1;
    });
  });

  const sortedTags = Object.entries(tagMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12);

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-slate-50 dark:bg-slate-950 space-y-6">
      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Всего документов</span>
            <FileText className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-slate-100">
            {totalDocs}
          </div>
          <div className="mt-2 text-[11px] text-slate-500 flex items-center gap-2">
            <span className="text-blue-600 font-semibold">{docxCount} DOCX</span>
            <span>•</span>
            <span className="text-emerald-600 font-semibold">{txtCount} TXT</span>
          </div>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Общий объём слов</span>
            <TrendingUp className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-slate-100">
            {totalWords.toLocaleString('ru-RU')}
          </div>
          <div className="mt-2 text-[11px] text-slate-500">
            Средний размер файла: {Math.round(totalWords / (totalDocs || 1))} слов
          </div>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Время изучения текста</span>
            <Clock className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-slate-100">
            ~{totalReadingMins} мин
          </div>
          <div className="mt-2 text-[11px] text-slate-500">
            ~{(totalReadingMins / 60).toFixed(1)} часов нерерывного чтения
          </div>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Размер на диске</span>
            <HardDrive className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-slate-100">
            {(totalBytes / 1024).toFixed(1)} KB
          </div>
          <div className="mt-2 text-[11px] text-slate-500">
            Индекс хранилища оптимизирован
          </div>
        </div>
      </div>

      {/* Visual Breakdown Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Format Breakdown Progress */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <PieChart className="w-4 h-4 text-blue-500" />
            <span>Соотношение форматов (.DOCX vs .TXT)</span>
          </h3>

          <div className="space-y-3 pt-2">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-blue-600 dark:text-blue-400">Microsoft Word (.DOCX)</span>
                <span className="font-mono">{docxCount} шт ({Math.round((docxCount / (totalDocs || 1)) * 100)}%)</span>
              </div>
              <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600 rounded-full" 
                  style={{ width: `${(docxCount / (totalDocs || 1)) * 100}%` }} 
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-emerald-600 dark:text-emerald-400">Текстовые документы (.TXT)</span>
                <span className="font-mono">{txtCount} шт ({Math.round((txtCount / (totalDocs || 1)) * 100)}%)</span>
              </div>
              <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-600 rounded-full" 
                  style={{ width: `${(txtCount / (totalDocs || 1)) * 100}%` }} 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Categories Bar Chart */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Layers className="w-4 h-4 text-purple-500" />
            <span>Распределение по категориям</span>
          </h3>

          <div className="space-y-2 pt-2">
            {Object.entries(categoryMap).map(([cat, count]) => (
              <div key={cat} className="flex items-center justify-between text-xs">
                <span className="text-slate-600 dark:text-slate-300 font-medium truncate max-w-[200px]">{cat}</span>
                <div className="flex items-center gap-2">
                  <div className="w-28 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-purple-500 rounded-full" 
                      style={{ width: `${(count / (totalDocs || 1)) * 100}%` }} 
                    />
                  </div>
                  <span className="font-mono font-bold w-6 text-right text-slate-700 dark:text-slate-200">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Tags & Status Funnel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Popular Tags */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Tag className="w-4 h-4 text-amber-500" />
            <span>Облако популярных тегов</span>
          </h3>

          <div className="flex flex-wrap gap-2 pt-2">
            {sortedTags.map(([tag, count]) => (
              <div 
                key={tag} 
                className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 text-slate-800 dark:text-slate-200 text-xs font-medium flex items-center gap-2"
              >
                <span>#{tag}</span>
                <span className="px-1.5 py-0.2 bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-300 rounded-md font-mono text-[10px] font-bold">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Status Funnel */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Статусы и жизненный цикл</span>
          </h3>

          <div className="space-y-3 pt-2">
            {Object.entries(statusMap).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700 dark:text-slate-300">{status}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 rounded-full" 
                      style={{ width: `${(count / (totalDocs || 1)) * 100}%` }} 
                    />
                  </div>
                  <span className="font-mono text-slate-500 w-8 text-right font-bold">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
