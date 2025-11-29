import React from 'react';
import listSprings from '@/app/actions/listSprings';
import AdminPanel from './AdminPanel';
import './AdminPanel.css';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const response = await listSprings();

  if (response.status === 'error') {
    return (
      <div className="admin-error-page">
        <h1>Error</h1>
        <p>Failed to load springs: {response.error?.message}</p>
      </div>
    );
  }

  const springs = response.data || [];

  return (
    <main className="min-h-screen bg-white">
      <AdminPanel initialSprings={springs} />
    </main>
  );
}
