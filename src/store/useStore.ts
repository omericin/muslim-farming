import { create } from 'zustand';
import { PrayerData } from '../types/prayer';

interface PrayerStore {
    prayerData: PrayerData | null;
    setPrayerData: (data: PrayerData) => void;
    nextPrayerName: string | null;
    setNextPrayerName: (name: string | null) => void;
    timeRemaining: string; // Formatting HH:mm:ss
    setTimeRemaining: (time: string) => void;
}

const useStore = create<PrayerStore>((set) => ({
    prayerData: null,
    setPrayerData: (data) => set({ prayerData: data }),
    nextPrayerName: null,
    setNextPrayerName: (name) => set({ nextPrayerName: name }),
    timeRemaining: '00:00:00',
    setTimeRemaining: (time) => set({ timeRemaining: time }),
}));

export default useStore;
