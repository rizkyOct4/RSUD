"use client";

import {
  useQuery,
  useInfiniteQuery,
  keepPreviousData,
} from "@tanstack/react-query";
import axios from "axios";
import { useState, useMemo, useEffect } from "react";
import { ROUTES_AUTH } from "../../config-route/route.config";
import type { TProfileData } from "../../types/auth.types";

export const useQueryAuth = ({ publicId }: { publicId: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: profile, isFetching: isFetchingProfile } = useQuery({
    queryKey: ["keyProfileUsers", publicId],
    queryFn: async () => {
      const URL = ROUTES_AUTH.GET({
        key: "profile",
      });
      const { data } = await axios.get(URL);
      return data;
    },
    enabled: !!publicId && isOpen,
    refetchOnWindowFocus: false, // Tidak refetch saat kembali ke aplikasi
    refetchOnMount: false, // "always" => refetch jika stale saja
    retry: false,
    placeholderData: keepPreviousData,
  });

  const ProfileData: TProfileData[] = useMemo(() => profile ?? [], [profile]);

  return { ProfileData, isFetchingProfile, isOpen, setIsOpen };
};
