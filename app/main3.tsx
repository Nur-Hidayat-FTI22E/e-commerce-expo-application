import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
// Menggunakan Image dari 'expo-image' untuk kontrol contentPosition
import { Image } from 'expo-image';

const { width } = Dimensions.get('window');

const promoItems = [
    {
        title: 'New collection',
        image: require('../assets/images/promo-new-collection.png'),
    },
    {
        title: 'Summer sale',
        // Asumsi Anda memiliki gambar ini
        image: require('../assets/images/summer-sales.png'),
    },
    {
        title: 'Men’s hoodies',
        image: require('../assets/images/promo-hoodie.png'),
    },
    {
        title: 'Black',
        image: require('../assets/images/promo-black.png'),
    },
];

export default function Main3() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            {/* Banner Utama: New collection */}
            <TouchableOpacity style={styles.bannerContainer}>
                <Image
                    source={promoItems[0].image}
                    style={styles.bannerImage}
                    contentFit="cover"
                    contentPosition={{ top: '50%', left: '50%' }}
                />
                <Text style={styles.bannerText}>{promoItems[0].title}</Text>
            </TouchableOpacity>

            <View style={styles.promoGrid}>
                {/* Kolom Kiri: Summer sale dan Black */}
                <View style={styles.promoColumnLeft}>
                    <TouchableOpacity style={[styles.promoItem, styles.promoLeftItem]}>
                        <Image
                            source={promoItems[1].image}
                            style={styles.promoImageSmall}
                            contentFit="cover"
                            contentPosition={{ top: '50%', left: '50%' }}
                        />
                        <Text style={styles.promoTextLarge}>{promoItems[1].title}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.promoItem, styles.promoLeftItem, styles.blackItem]}>
                         <Image
                            source={promoItems[3].image}
                            style={styles.promoImageSmall}
                            contentFit="cover"
                            contentPosition={{ top: '50%', left: '50%' }}
                        />
                        <Text style={styles.promoTextSmall}>{promoItems[3].title}</Text>
                    </TouchableOpacity>
                </View>

                {/* Kolom Kanan: Men's Hoodies */}
                <View style={styles.promoColumnRight}>
                    <TouchableOpacity style={[styles.promoItem, styles.hoodieItem]}>
                        <Image
                            source={promoItems[2].image}
                            style={styles.promoImageLarge}
                            contentFit="cover"
                            contentPosition={{ top: '50%', left: '50%' }}
                        />
                        <Text style={styles.promoTextSmall}>{promoItems[2].title}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
    },
    bannerContainer: {
        height: 450,
        // marginBottom: 16,
        // marginHorizontal: 16,
        // borderRadius: 12,
        overflow: 'hidden',
        justifyContent: 'flex-end',
    },
    bannerImage: {
        ...StyleSheet.absoluteFillObject,
    },
    bannerText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'right',
        padding: 24,
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    promoGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        // marginHorizontal: 16,
    },
    promoColumnLeft: {
        width: '50%',
        justifyContent: 'space-between',
    },
    promoColumnRight: {
        width: '50%',
    },
    promoItem: {
        // borderRadius: 12,
        overflow: 'hidden',
        justifyContent: 'center',
        // alignItems: 'center',
        position: 'relative',
    },
    promoLeftItem: {
        width: '100%',
        height: 208,
        // marginBottom: 16,
    },
    blackItem: {
        backgroundColor: '#000',
        // paddingLeft: 0,
    },
    hoodieItem: {
        width: '100%',
        height: 416, 
    },
    promoImageSmall: {
        ...StyleSheet.absoluteFillObject,
    },
    promoImageLarge: {
        ...StyleSheet.absoluteFillObject,
    },
    promoTextLarge: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#E53935',
        textAlign: 'left',
        marginLeft: 20,
    },
    promoTextSmall: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#fff',
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
        zIndex: 1,
        marginLeft: 20,
    },
});
