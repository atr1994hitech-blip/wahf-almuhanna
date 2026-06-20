import React, { useState } from 'react';
import { X, Edit2, Trash2, Download } from 'lucide-react';

export default function FilePreview({ file, onClose, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(file);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSaveEdit = (e) => {
    e.preventDefault();
    onEdit(file.id, editData);
    setIsEditing(false);
  };

  const handleConfirmDelete = () => {
    onDelete(file.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-screen overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-teal-200 p-6 flex items-center justify-between">
          <h3 className="text-2xl font-bold text-teal-900 flex-1 truncate">{file.name}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition flex-shrink-0">
            <X size={28} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {isEditing ? (
            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">اسم الملف</label>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">الوصف</label>
                <textarea
                  value={editData.description}
                  onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                  rows="4"
                  className="w-full px-4 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition font-semibold"
                >
                  حفظ التعديلات
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg transition font-semibold"
                >
                  إلغاء
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold text-gray-600">القسم</p>
                  <p className="text-gray-800">{file.categoryName}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-600">نوع الملف</p>
                  <p className="text-gray-800">{file.type || 'غير محدد'}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-600">تاريخ الرفع</p>
                  <p className="text-gray-800">{file.uploadDate}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-600">تم الرفع بواسطة</p>
                  <p className="text-gray-800">{file.uploadedBy}</p>
                </div>
              </div>

              <div>
                <p className="font-semibold text-gray-600 mb-2">الوصف</p>
                <p className="text-gray-800 bg-gray-50 p-3 rounded-lg">{file.description || 'لا يوجد وصف'}</p>
              </div>

              {file.attachments?.length > 0 && (
                <div>
                  <p className="font-semibold text-gray-600 mb-2">المرفقات</p>
                  <div className="space-y-2">
                    {file.attachments.map((att, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition">
                        <span className="text-gray-800 text-sm">{att.name}</span>
                        <Download className="text-teal-600 cursor-pointer hover:text-teal-800 transition" size={18} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-teal-100 hover:bg-teal-200 text-teal-700 rounded-lg transition font-semibold"
                >
                  <Edit2 size={18} /> تعديل
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition font-semibold"
                >
                  <Trash2 size={18} /> حذف
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm text-center shadow-xl">
            <h4 className="text-xl font-bold text-gray-800 mb-4">تأكيد الحذف</h4>
            <p className="text-gray-600 mb-6">هل أنت متأكد من رغبتك في حذف الملف "{file.name}"؟</p>
            <div className="flex gap-3">
              <button
                onClick={handleConfirmDelete}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition"
              >
                حذف نهائياً
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded-lg transition"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}