'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface UserData {
  id: string;
  email: string;
  name?: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const localUserData = localStorage.getItem('user_data');
      if (!localUserData) {
        router.push('/auth/login');
        return;
      }

      try {
        const userData = JSON.parse(localUserData);
        setUser(userData);
      } catch (e) {
        console.error("Erreur de parsing des données utilisateur:", e);
        router.push('/auth/login');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user_data');
    router.push('/auth/login');
  };

  if (isLoading) {
    return (
      <div style={styles.container}>
        <p>Chargement...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Tableau de bord</h1>
        
        <div style={styles.userInfo}>
          <img 
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name || user.email}`}
            alt="Avatar"
            style={styles.avatar}
          />
          
          <div style={styles.userDetails}>
            {user.name && (
              <p style={styles.name}>{user.name}</p>
            )}
            <p style={styles.email}>{user.email}</p>
            <p style={styles.id}>ID: {user.id}</p>
          </div>
        </div>

        <button 
          onClick={handleLogout}
          style={styles.logoutButton}
        >
          Se déconnecter
        </button>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f4f6f8',
    padding: '20px',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '30px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '500px',
  },
  title: {
    color: '#1a1a1a',
    fontSize: '24px',
    marginBottom: '30px',
    textAlign: 'center',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '30px',
  },
  avatar: {
    width: '80px',
    height: '80px',
    borderRadius: '40px',
    marginRight: '20px',
  },
  userDetails: {
    flex: 1,
  },
  name: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: '5px',
  },
  email: {
    fontSize: '16px',
    color: '#666',
    marginBottom: '5px',
  },
  id: {
    fontSize: '14px',
    color: '#999',
  },
  logoutButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#ff4444',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};