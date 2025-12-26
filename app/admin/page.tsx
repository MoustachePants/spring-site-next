import React from 'react';
import { notFound } from 'next/navigation';
import listSprings from '@/app/actions/listSprings';
import AdminPanel from './AdminPanel';
import './AdminPanel.css';
import { env } from '@/lib/env.config';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  if (!env.isDevelopment) {
    notFound();
  }

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
