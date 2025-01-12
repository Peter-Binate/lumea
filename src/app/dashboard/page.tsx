'use client';

import ProtectedRoute from '@/app/components/ProtectedRoute/ProtectedRoute';

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <section>
        <h1>Dashboard</h1>
      </section>
    </ProtectedRoute>
  );
}
