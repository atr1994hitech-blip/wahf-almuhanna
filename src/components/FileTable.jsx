import React from 'react';
import { FileText, Eye } from 'lucide-react';

export default function FileTable({ files, onSelectFile }) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-teal-100">
      {files.length === 0 ? (
        <div className="p-12 text-center text-gray-500">
          <FileText size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-lg font-semibold">لا توجد ملفات في هذا القسم</p>
        </div>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="bg-teal-50 border-b-2 border-teal-200">
              <th className="px-6 py-4 text-right font-semibold text-teal-900">اسم الملف</th>
              <th className="px-6 py-4 text-right font-semibold text-teal-900">نوع الملف</th>
              <th className="px-6 py-4 text-right font-semibold text-teal-900">تاريخ الرفع</th>
              <th className="px-6 py-4 text-right font-semibold text-teal-900">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {files.map(file => (
              <tr key={file.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-right font-semibold text-gray-800">{file.name}</td>
                <td className="px-6 py-4 text-right text-sm text-gray-600">{file.type || 'غير محدد'}</td>
                <td className="px-6 py-4 text-right text-sm text-gray-600">{file.uploadDate}</td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => onSelectFile(file)}
                    className="flex items-center gap-2 text-teal-600 hover:text-teal-800 font-semibold transition"
                  >
                    <Eye size={18} /> عرض
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}