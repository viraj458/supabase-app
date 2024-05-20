'use client';

import { DataTable } from '@/components/Datatable';
import { columns } from '@/components/Team/Members/Columns';
import NewMember from '@/components/Team/NewMember';
import { useState } from 'react';

const Team = () => {
  const [members, setMembers] = useState([
    {
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      role: 'admin',
      status: 'active',
    },
    {
      name: 'Bob Smith',
      email: 'bob.smith@example.com',
      role: 'manager',
      status: 'pending',
    },
    {
      name: 'Charlie Brown',
      email: 'charlie.brown@example.com',
      role: 'member',
      status: 'removed',
    },
  ]);
  return (
    <div className="grid gap-6 border rounded-lg shadow px-5 py-4 w-full max-w-[800px]">
      <header className="flex items-start justify-between">
        <div className="grid gap-1">
          <h1 className="text-2xl">Team</h1>
          <p>Invite new members in your team.</p>
        </div>
        <NewMember />
      </header>
      <main>
        <DataTable columns={columns} data={members} />
      </main>
    </div>
  );
};
export default Team;
