import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, RefreshControl, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import Main1 from '../main1';
import Main2 from '../main2';
import Main3 from '../main3';

export default function Home() {
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1500);
    };

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={['#E53935']}
                        tintColor="#E53935"
                        title="Refreshing..."
                        titleColor="#E53935"
                    />
                }
            >
                <Main1 />
                <Main2 />
                <Main3 />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
    },
    scrollView: {
        flex: 1,
    },
});