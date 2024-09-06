"use client";

import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

export const useGetCalls = () => {
  const [calls, setcalls] = useState<Call[]>([]);
  const client = useStreamVideoClient();
  const [isloading, setLoading] = useState(false);

  const { user } = useUser();

  useEffect(() => {
    (async () => {
      if (!client || !user?.id) return;

      setLoading(true);

      try {
        const { calls: _calls } = await client.queryCalls({
          sort: [{ field: "starts_at", direction: -1 }],
          filter_conditions: {
            starts_at: { $exists: true },
            $or: [
              { created_by_user_id: user.id },
              { members: { $in: [user.id] } },
            ],
          },
        });

        setcalls(_calls);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [client, user?.id]);

  const now = new Date();

  const endedCalls = calls?.filter(({ state: { startsAt, endedAt } }: Call) => {
    return (startsAt && new Date(startsAt) < now) || !!endedAt
  })

  const upcommingCalls = calls?.filter(({ state: { startsAt,endedAt } }: Call) => {
    return startsAt && new Date(startsAt) > now && !!!endedAt;
  });

  return {
    endedCalls,
    upcommingCalls,
    Recordings: calls,
    isloading,
  };
};
