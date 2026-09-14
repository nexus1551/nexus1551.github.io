import React, { useState } from 'react';
import { GitCompare, ArrowRight, Check, X, FileText } from 'lucide-react';
import { DocItem } from '../types';

interface DocumentComparerModalProps {
  documents: DocItem[];
  onClose: () => void;
}

export default function DocumentComparerModal({
  documents,
  onClose
}: DocumentComparerModalProps) {
  const [doc1Id, setDoc1Id] = useState<string>(documents[0]?.id || '');
  const [doc2Id, setDoc2Id] = useState<string>(documents[1]?.id || documents[0]?.id || '');

  const doc1 = documents.find(d => d.id === doc1Id);
  const doc2 = documents.find(d => d.id === doc2Id);

  const lines1 = doc1 ? doc1.content.split('\n') : [];
  const lines2 = doc2 ? doc2.content.split('\n') : [];
  const maxLines = Math.max(lines1.length, lines2.length);

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* Header Selector */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-wrap items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-2">
          <GitCompare className="w-5 h-5 text-emerald-500" />
          <h2 className="font-bold text-slate-800 dark:text-slate-100 text-sm">
            Сравнение двух документов (Side-by-Side Text Diff)
          </h2>
        </div>

        <div className="flex items-center gap-3 text-xs">
          {/* Doc 1 Dropdown */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-medium">Документ A:</span>
            <select
              value={doc1Id}
              onChange={(e) => setDoc1Id(e.target.value)}
              className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 font-medium max-w-xs"
            >
              {documents.map(d => (
                <option key={d.id} value={d.id}>
                  .{d.extension} - {d.title}
                </option>
              ))}
            </select>
          </div>

          <ArrowRight className="w-4 h-4 text-slate-400" />

          {/* Doc 2 Dropdown */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-medium">Документ B:</span>
            <select
              value={doc2Id}
              onChange={(e) => setDoc2Id(e.target.value)}
              className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 font-medium max-w-xs"
            >
              {documents.map(d => (
                <option key={d.id} value={d.id}>
                  .{d.extension} - {d.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Comparison Body */}
      <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Document A Column */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col">
          <div className="pb-3 mb-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="px-2 py-0.5 rounded text-[10px] uppercase font-mono font-bold bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                .{doc1?.extension}
              </span>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mt-1">
                {doc1?.title}
              </h3>
            </div>
            <div className="text-xs font-mono text-slate-400">
              Слов: {doc1?.wordCount} | Строк: {doc1?.lineCount}
            </div>
          </div>

          <div className="font-mono text-xs leading-relaxed space-y-1 overflow-x-auto flex-1">
            {Array.from({ length: maxLines }).map((_, idx) => {
              const lineA = lines1[idx] ?? '';
              const lineB = lines2[idx] ?? '';
              const isMatch = lineA === lineB;
              return (
                <div
                  key={idx}
                  className={`p-1 rounded flex gap-3 ${
                    !isMatch && lineA
                      ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 font-semibold'
                      : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span className="text-slate-400 text-[10px] w-6 shrink-0 select-none text-right">
                    {idx + 1}
                  </span>
                  <span className="whitespace-pre-wrap">{lineA || <span className="italic text-slate-400">[пусто]</span>}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Document B Column */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col">
          <div className="pb-3 mb-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="px-2 py-0.5 rounded text-[10px] uppercase font-mono font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                .{doc2?.extension}
              </span>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mt-1">
                {doc2?.title}
              </h3>
            </div>
            <div className="text-xs font-mono text-slate-400">
              Слов: {doc2?.wordCount} | Строк: {doc2?.lineCount}
            </div>
          </div>

          <div className="font-mono text-xs leading-relaxed space-y-1 overflow-x-auto flex-1">
            {Array.from({ length: maxLines }).map((_, idx) => {
              const lineA = lines1[idx] ?? '';
              const lineB = lines2[idx] ?? '';
              const isMatch = lineA === lineB;
              return (
                <div
                  key={idx}
                  className={`p-1 rounded flex gap-3 ${
                    !isMatch && lineB
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-semibold'
                      : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span className="text-slate-400 text-[10px] w-6 shrink-0 select-none text-right">
                    {idx + 1}
                  </span>
                  <span className="whitespace-pre-wrap">{lineB || <span className="italic text-slate-400">[пусто]</span>}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
