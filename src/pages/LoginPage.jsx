import React, { useState } from 'react';
import { Mail, User } from 'lucide-react';

export default function LoginPage({ onLogin }) {
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users') || '[]'));

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('يرجى إدخال البريد الإلكتروني');
      return;
    }

    const userExists = users.find(u => u.email === email);
    if (!userExists) {
      setError('البريد الإلكتروني غير مسجل. يرجى التسجيل أولاً.');
      return;
    }

    setStep('verify');
  };

  const handleVerify = (e) => {
    e.preventDefault();
    setError('');

    const user = users.find(u => u.email === email);
    if (user) {
      localStorage.setItem('isLoggedIn', 'true');
      onLogin(user);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('يرجى إدخال الاسم');
      return;
    }

    if (!email.trim()) {
      setError('يرجى إدخال البريد الإلكتروني');
      return;
    }

    const userExists = users.find(u => u.email === email);
    if (userExists) {
      setError('هذا البريد الإلكتروني مسجل بالفعل');
      return;
    }

    const newUser = {
      id: Date.now(),
      name: name,
      email: email,
      isAdmin: users.length === 0
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    localStorage.setItem('isLoggedIn', 'true');
    onLogin(newUser);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-teal-100 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <p className="text-4xl font-bold mb-2" style={{ color: '#D4AF37', fontFamily: 'Cairo' }}>المهنا</p>
          <p className="text-teal-700 font-semibold text-lg">منصة أرشيف وقف</p>
        </div>

        {step === 'email' && (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">البريد الإلكتروني</label>
              <div className="relative">
                <Mail className="absolute right-3 top-3 text-teal-500" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="w-full px-4 py-2 pr-10 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-right"
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2.5 rounded-lg transition mt-6"
            >
              دخول
            </button>

            <button
              type="button"
              onClick={() => { setStep('register'); setError(''); }}
              className="w-full text-teal-600 font-semibold py-2"
            >
              أو إنشاء حساب جديد
            </button>
          </form>
        )}

        {step === 'register' && (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">الاسم</label>
              <div className="relative">
                <User className="absolute right-3 top-3 text-teal-500" size={20} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="اسمك الكامل"
                  className="w-full px-4 py-2 pr-10 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-right"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">البريد الإلكتروني</label>
              <div className="relative">
                <Mail className="absolute right-3 top-3 text-teal-500" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="w-full px-4 py-2 pr-10 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-right"
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2.5 rounded-lg transition mt-6"
            >
              إنشاء حساب
            </button>

            <button
              type="button"
              onClick={() => { setStep('email'); setError(''); setName(''); }}
              className="w-full text-teal-600 font-semibold py-2"
            >
              عودة للدخول
            </button>
          </form>
        )}

        {step === 'verify' && (
          <form onSubmit={handleVerify} className="space-y-4">
            <p className="text-center text-gray-600 mb-4">أهلاً وسهلاً! سيتم دخولك مباشرة بدون الحاجة للتحقق.</p>
            
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2.5 rounded-lg transition"
            >
              دخول
            </button>

            <button
              type="button"
              onClick={() => { setStep('email'); setError(''); }}
              className="w-full text-teal-600 font-semibold py-2"
            >
              عودة
            </button>
          </form>
        )}
      </div>
    </div>
  );
}