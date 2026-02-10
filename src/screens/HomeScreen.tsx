import React from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import apiClient from '../api/client';
import useStore from '../store/useStore';

const fetchPosts = async () => {
    const { data } = await apiClient.get('/posts?_limit=5');
    return data;
};

const HomeScreen = () => {
    const { count, increment, decrement } = useStore();
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>React Native + Zustand + TanStack Query</Text>

            <View style={styles.counterContainer}>
                <Text style={styles.counterText}>Zustand Count: {count}</Text>
                <View style={styles.buttonRow}>
                    <Button title="Increment" onPress={increment} />
                    <Button title="Decrement" onPress={decrement} />
                </View>
            </View>

            <View style={styles.apiContainer}>
                <Text style={styles.subtitle}>API Data (TanStack Query):</Text>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : error ? (
                    <Text style={styles.errorText}>Error fetching data</Text>
                ) : (
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.postItem}>
                                <Text style={styles.postTitle}>{item.title}</Text>
                            </View>
                        )}
                        ListFooterComponent={<Button title="Refetch" onPress={() => refetch()} />}
                    />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    counterContainer: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    counterText: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 10,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    apiContainer: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        elevation: 2,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
        color: '#333',
    },
    postItem: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    postTitle: {
        fontSize: 14,
        color: '#444',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
    },
});

export default HomeScreen;
