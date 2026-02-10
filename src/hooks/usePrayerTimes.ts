import { useQuery } from '@tanstack/react-query';
import apiClient from '../api/client';
import useStore from '../store/useStore';
import { PrayerApiResponse } from '../types/prayer';
import { useEffect } from 'react';

const fetchPrayerTimes = async (): Promise<PrayerApiResponse> => {
    // Method 13 is Diyanet Isleri Baskanligi, Turkey
    const { data } = await apiClient.get<PrayerApiResponse>('/timingsByCity?city=Istanbul&country=Turkey&method=13');
    return data;
};

export const usePrayerTimes = () => {
    const setPrayerData = useStore((state) => state.setPrayerData);

    const query = useQuery({
        queryKey: ['prayerTimes'],
        queryFn: fetchPrayerTimes,
        staleTime: 1000 * 60 * 60, // 1 hour
    });

    useEffect(() => {
        if (query.data?.data) {
            setPrayerData(query.data.data);
        }
    }, [query.data, setPrayerData]);

    return query;
};
