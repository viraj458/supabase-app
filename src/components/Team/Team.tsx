'use client';

import { DataTable } from '@/components/Datatable';
import LoadingTeam from '@/components/Loading/Team';
import { columns } from '@/components/Team/Members/Columns';
import NewMember from '@/components/Team/NewMember';
import { useHelpers } from '@/hooks/useHelpers';
import { supabase } from '@/lib/supabase/client';
import { useCallback, useEffect, useState } from 'react';

const Team = () => {
  const [team, setTeam] = useState({
    name: 'Team One',
    id: '7e0de95d-8157-4a44-908b-b9383ecdf10b',
  });
  const [members, setMembers] = useState([]);
  const { loading, setLoading } = useHelpers();

  const fetchTeam = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error }: any = await supabase
        .from('teams')
        .select('*, team_members(*)')
        .eq('id', '7e0de95d-8157-4a44-908b-b9383ecdf10b')
        .single();

      if (data) {
        const { team_members, ...teamData } = data;
        setTeam(teamData);
        setMembers(team_members);
      }
    } catch (error: any) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  }, [setLoading]);
  useEffect(() => {
    fetchTeam();
    supabase
      .channel('channel_team_members')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'team_members',
          filter: `team_id=eq.${team.id}`,
        },
        (payload: any) => {
          fetchTeam();
        },
      )
      .subscribe();
  }, [fetchTeam, team.id]);
  if (loading) return <LoadingTeam />;
  return (
    <div className="grid gap-6 border rounded-lg shadow px-5 py-4 w-full max-w-[800px]">
      <header className="flex items-start justify-between">
        <div className="grid gap-1">
          <h1 className="text-2xl">{team.name || 'Team'}</h1>
          <p>Invite new members in your team.</p>
        </div>
        <NewMember team_id={team.id} />
      </header>
      <main>
        <DataTable columns={columns} data={members} />
      </main>
    </div>
  );
};
export default Team;
