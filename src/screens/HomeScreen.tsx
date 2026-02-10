import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { usePrayerTimes } from '../hooks/usePrayerTimes';
import { getNextPrayer } from '../utils/timeUtils';

const HomeScreen = () => {
    const { data, isLoading, error } = usePrayerTimes();
    const [timeRemaining, setTimeRemaining] = useState('00 : 00 : 00');
    const [nextPrayerInfo, setNextPrayerInfo] = useState<any>(null);

    useEffect(() => {
        if (data?.data?.timings) {
            const updateTimer = () => {
                const { nextPrayer, targetTime } = getNextPrayer(data.data.timings);
                setNextPrayerInfo(nextPrayer);

                const now = new Date();
                const diff = targetTime.getTime() - now.getTime();

                if (diff <= 0) {
                    setTimeRemaining('00 : 00 : 00');
                    return;
                }

                const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((diff / (1000 * 60)) % 60);
                const seconds = Math.floor((diff / 1000) % 60);

                setTimeRemaining(
                    `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`
                );
            };

            updateTimer();
            const interval = setInterval(updateTimer, 1000);
            return () => clearInterval(interval);
        }
    }, [data]);

    if (isLoading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#4A9084" />
            </View>
        );
    }

    if (error) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text>Error loading prayer times</Text>
            </View>
        );
    }

    const { timings, date } = data?.data || {};
    const prayerList = [
        { name: 'Fajr', time: timings?.Fajr, label: 'Fajr' },
        { name: 'Sunrise', time: timings?.Sunrise, label: 'Sunrise' },
        { name: 'Dhuhr', time: timings?.Dhuhr, label: 'Dhuhr' },
        { name: 'Asr', time: timings?.Asr, label: 'Asr' },
        { name: 'Maghrib', time: timings?.Maghrib, label: 'Maghrib' },
        { name: 'Isha', time: timings?.Isha, label: 'Isha' },
    ];

    return (
        <SafeAreaView className="flex-1 bg-background">
            <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>

                {/* Header */}
                <View className="flex-row justify-between items-center mb-5">
                    <View className="flex-row items-center">
                        <Text className="text-xl mr-2 text-secondary">📍</Text>
                        <Text className="text-lg font-bold text-gray-800">Istanbul, TR</Text>
                    </View>
                    <Text className="text-2xl text-secondary">⚙️</Text>
                </View>

                {/* Main Card */}
                <LinearGradient
                    colors={['#4A9084', '#367c70']}
                    style={{ padding: 24, borderRadius: 20, alignItems: 'center', marginBottom: 30, shadowColor: '#4A9084', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 20, elevation: 8 }}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <Text className="text-white/80 text-xs tracking-widest mb-2 font-semibold">NEXT PRAYER</Text>
                    <Text className="text-white text-4xl font-bold mb-4 font-serif">{nextPrayerInfo?.name || 'Loading...'}</Text>

                    <View className="mb-1">
                        <Text className="text-white text-5xl font-light">{timeRemaining}</Text>
                    </View>
                    <View className="flex-row justify-between w-[60%] mb-5 opacity-70">
                        <Text className="text-white text-[10px] font-semibold">HRS</Text>
                        <Text className="text-white text-[10px] font-semibold">MIN</Text>
                        <Text className="text-white text-[10px] font-semibold">SEC</Text>
                    </View>

                    <View className="items-center border-t border-white/20 pt-4 w-full">
                        <Text className="text-white text-sm opacity-90 mb-0.5">{date?.gregorian?.date}</Text>
                        <Text className="text-white text-sm opacity-90">{date?.hijri?.month?.en} {date?.hijri?.year}</Text>
                    </View>
                </LinearGradient>

                {/* Prayer List Header */}
                <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-xl font-bold text-gray-800 font-serif">Prayer Times</Text>
                    <Text className="text-primary text-sm font-medium">Monthly View</Text>
                </View>

                {/* Prayer List */}
                <View className="gap-3">
                    {prayerList.map((prayer, index) => {
                        const isNext = nextPrayerInfo?.name === prayer.name;
                        return (
                            <View
                                key={index}
                                className={`flex-row justify-between items-center bg-white p-4 rounded-2xl shadow-sm ${isNext ? 'bg-teal-50 border-l-4 border-primary' : ''}`}
                            >
                                <View className="flex-row items-center">
                                    <Text className="text-xl mr-4 text-secondary opacity-70">☀</Text>
                                    <View>
                                        <Text className={`text-lg font-medium font-serif ${isNext ? 'text-teal-900 font-bold' : 'text-gray-600'}`}>{prayer.label}</Text>
                                        {isNext && <Text className="text-[10px] text-primary mt-0.5 font-bold tracking-wider">NEXT PRAYER</Text>}
                                    </View>
                                </View>
                                <View className="items-end">
                                    <Text className={`text-lg font-medium ${isNext ? 'text-teal-900 font-bold' : 'text-gray-400'}`}>{prayer.time}</Text>
                                    {isNext && <Text className="text-[10px] text-primary mt-0.5">🔔 Alert On</Text>}
                                </View>
                            </View>
                        );
                    })}
                </View>

                {/* Quote */}
                <View className="mt-8 p-6 bg-gray-100 rounded-2xl items-center">
                    <Text className="text-4xl text-gray-200 mb-2">❝</Text>
                    <Text className="text-sm text-gray-600 text-center italic mb-2 leading-relaxed">
                        Verily, prayer prohibits immorality and wrongdoing, and the remembrance of Allah is greater.
                    </Text>
                    <Text className="text-xs text-primary font-bold tracking-widest">— AL-ANKABUT 29:45</Text>
                </View>

            </ScrollView>

            {/* Bottom Navigation */}
            <View className="absolute bottom-0 left-0 right-0 bg-white flex-row justify-around py-3 pb-6 border-t border-gray-100 shadow-xl">
                <NavItem icon="🏠" label="Home" active />
                <NavItem icon="🧭" label="Qibla" />
                <NavItem icon="∞" label="Dhikr" />
                <NavItem icon="📖" label="Quran" />
            </View>
        </SafeAreaView>
    );
};

const NavItem = ({ icon, label, active }: any) => (
    <TouchableOpacity className="items-center">
        <Text className={`text-2xl mb-1 ${active ? 'text-primary' : 'text-gray-400'}`}>{icon}</Text>
        <Text className={`text-[10px] ${active ? 'text-primary font-semibold' : 'text-gray-400'}`}>{label}</Text>
    </TouchableOpacity>
);

export default HomeScreen;
