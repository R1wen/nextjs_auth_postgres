'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Compte créé avec succès !');
        router.push('/dashboard');
      } else {
        setError(data.message || 'Échec de l\'enregistrement.');
      }
    } catch (err) {
      console.error('Erreur de la requête:', err);
      setError('Une erreur réseau est survenue. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
      router.push('/auth/login')
    }
  };

  return (
    <div className='text-black bg-gray-200 flex flex-col justify-center items-center h-screen w-screen'>
      <form onSubmit={handleSubmit} className='flex flex-col bg-white p-20 rounded-2xl shadow-2xl w-[500px]'>
        <h1 className='font-semibold text-xl mb-10 text-center'>Créer un compte</h1>
        <label htmlFor="name" className='font-bold mb-2'>Nom (Optionnel)</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='p-2 mb-5 border rounded-lg'
        />

        <label htmlFor="email" className='font-bold mb-2'>Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className='p-2 mb-5 border rounded-lg'
        />

        <label htmlFor="password" className='font-bold mb-2'>Mot de passe</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          className='p-2 mb-5 border rounded-lg'
        />

        {error && <p className='text-red-700 m-3 text-center'>{error}</p>}

        <button type="submit" disabled={isLoading} className='bg-blue-800 p-3 rounded-2xl m-4 text-white hover:bg-blue-600 duration-150'>
          {isLoading ? 'Enregistrement...' : 'S\'enregistrer'}
        </button>
        <p className='text-[10px] text-center mt-5'>Vous avez déjà un compte ? <a href="/auth/login" className='text-blue-700'>Connectez-vous</a></p>
      </form>
    </div>
  );
}