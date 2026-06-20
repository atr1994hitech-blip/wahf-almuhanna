import React from 'react';
import { ChevronLeft } from 'lucide-react';

export default function CategoryCard({ category, fileCount, onSelect }) {
  return (
    <button
      onClick={onSelect}
      className="bg-white border border-teal-200 rounded-xl p-6 hover:shadow-lg hover:border-teal-400 transition transform hover:-translate-y-1 cursor-pointer group text-right"
    >
      <div className="flex items-center justify-between mb-4">
        <ChevronLeft className="text-teal-500 group-hover:text-teal-700 transition" size={24} />
        <span className="text-5xl">{category.icon}</span>
      </div>
      <h3 className="text-lg font-bold text-teal-900 mb-2">{category.name}</h3>
      <p className="text-sm text-gray-600">{fileCount} ملف</p>
    </button>
  );
}