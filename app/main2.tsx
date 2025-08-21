import { Feather, FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState, useEffect } from "react";
import { Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Asumsi gambar ini sudah ada di folder assets Anda
const streetClothesBanner = require("../assets/images/product/street-clothes-banner.jpg");
const saleProducts = [
    {
        id: 's1',
        name: "Evening Dress",
        brand: "Dorothy Perkins",
        image: require("../assets/images/product/sale1.png"),
        discount: 20,
        oldPrice: 155,
        price: 125,
        rating: 4.5,
        reviews: 10,
        sizeOptions: ['XS', 'S', 'M', 'L', 'XL'],
        colorOptions: ['Black', 'Navy', 'Red'],
    },
    {
        id: 's2',
        name: "Sport Dress",
        brand: "Silly",
        image: require("../assets/images/product/sale2.png"),
        discount: 15,
        oldPrice: 229,
        price: 195,
        rating: 4.0,
        reviews: 5,
        sizeOptions: ['XS', 'S', 'M', 'L', 'XL'],
        colorOptions: ['Blue', 'Green', 'White'],
    },
    {
        id: 's3',
        name: "Sport Dress",
        brand: "Silly",
        image: require("../assets/images/product/sale3.png"),
        discount: 15,
        oldPrice: 229,
        price: 195,
        rating: 4.0,
        reviews: 5,
        sizeOptions: ['XS', 'S', 'M', 'L', 'XL'],
        colorOptions: ['Pink', 'Black', 'Gray'],
    },
];
const products = [
    {
        id: 'p1',
        name: "Red Stripe Shirt",
        image: require("../assets/images/product/product1.png"),
        isNew: true,
    },
    {
        id: 'p2',
        name: "White T-Shirt",
        image: require("../assets/images/product/product2.png"),
        isNew: true,
    },
    {
        id: 'p3',
        name: "Summer Dress",
        image: require("../assets/images/product/product3.png"),
        isNew: false,
    },
];

export default function Main2() {
    const [likedProducts, setLikedProducts] = useState<{ [key: string]: boolean }>({});

    // Load favorites dari AsyncStorage saat komponen dimuat
    useEffect(() => {
        const loadFavorites = async () => {
            try {
                const data = await AsyncStorage.getItem('likedProducts');
                if (data) setLikedProducts(JSON.parse(data));
            } catch (e) {
                console.error('Failed to load favorites', e);
            }
        };
        loadFavorites();
    }, []);

    // Simpan favorites ke AsyncStorage saat berubah
    useEffect(() => {
        const saveFavorites = async () => {
            try {
                await AsyncStorage.setItem('likedProducts', JSON.stringify(likedProducts));
            } catch (e) {
                console.error('Failed to save favorites', e);
            }
        };
        saveFavorites();
    }, [likedProducts]);

    // Fungsi toggleLike sekarang bisa langsung ada di sini
    const toggleLike = (productId: string) => {
        setLikedProducts(prev => ({
            ...prev,
            [productId]: !prev[productId],
        }));
    };

    return (
        <View style={styles.container}>
            {/* Banner Street Clothes */}
            <ImageBackground source={streetClothesBanner} style={styles.banner} imageStyle={styles.bannerImg}>
                <View style={styles.bannerContent}>
                    <Text style={styles.bannerTitle}>Street clothes</Text>
                </View>
            </ImageBackground>

            {/* Section Sale */}
            <View style={styles.sectionHeader}>
                <View>
                    <Text style={styles.sectionTitle}>Sale</Text>
                    <Text style={styles.sectionSubtitle}>Super summer sale</Text>
                </View>
                <TouchableOpacity>
                    <Text style={styles.viewAll}>View all</Text>
                </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.saleScroll}>
                {saleProducts.map(product => (
                    <TouchableOpacity
                        key={product.id}
                        style={styles.saleCard}
                        onPress={() => router.push({ pathname: '/product-detail', params: { id: product.id } })}
                    >
                        <Image source={product.image} style={styles.saleImage} />
                        <View style={styles.discountBadge}>
                            <Text style={styles.discountText}>-{product.discount}%</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.favoriteBtn}
                            onPress={() => toggleLike(product.id)}
                        >
                            {likedProducts[product.id] ? (
                                <FontAwesome name="heart" size={20} color="#E53935" />
                            ) : (
                                <Feather name="heart" size={20} color="#ccc" />
                            )}
                        </TouchableOpacity>
                        <View style={styles.saleInfo}>
                            <View style={styles.ratingRow}>
                                {[...Array(5)].map((_, i) => (
                                    <FontAwesome
                                        key={i}
                                        name="star"
                                        size={14}
                                        color={i < Math.round(product.rating) ? "#FFC107" : "#eee"}
                                    />
                                ))}
                                <Text style={styles.ratingText}>({product.reviews})</Text>
                            </View>
                            <Text style={styles.saleBrand}>{product.brand}</Text>
                            <Text style={styles.saleName}>{product.name}</Text>
                            <View style={styles.priceRow}>
                                <Text style={styles.oldPrice}>{product.oldPrice}$</Text>
                                <Text style={styles.salePrice}>{product.price}$</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Section New */}
            <View style={styles.sectionHeader}>
                <View>
                    <Text style={styles.sectionTitle}>New</Text>
                    <Text style={styles.sectionSubtitle}>You've never seen it before!</Text>
                </View>
                <TouchableOpacity>
                    <Text style={styles.viewAll}>View all</Text>
                </TouchableOpacity>
            </View>

            {/* Produk Baru */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productScroll}>
                {products.map(product => (
                    <TouchableOpacity
                        key={product.id}
                        style={styles.productCard}
                        onPress={() => router.push({ pathname: '/product-detail', params: { id: product.id } })}
                    >
                        <Image source={product.image} style={styles.productImage} />
                        {product.isNew && (
                            <View style={styles.newBadge}>
                                <Text style={styles.newBadgeText}>NEW</Text>
                            </View>
                        )}
                        <Text style={styles.productName}>{product.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
    },
    banner: {
        height: 250, // Ukuran lebih kecil untuk Main 2
        justifyContent: 'flex-end',
        marginBottom: 16,
        overflow: 'hidden',
    },
    bannerImg: {
        resizeMode: 'cover',
    },
    bannerContent: {
        padding: 24,
    },
    bannerTitle: {
        color: '#fff',
        fontSize: 30, // Ukuran font disesuaikan
        fontWeight: 'bold',
        marginBottom: 12,
        lineHeight: 32,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingHorizontal: 24,
        marginBottom: 8,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#222',
    },
    sectionSubtitle: {
        fontSize: 12,
        color: '#888',
    },
    viewAll: {
        color: '#E53935',
        fontSize: 14,
        fontWeight: 'bold',
    },
    saleScroll: {
        paddingLeft: 24,
        marginBottom: 24,
    },
    saleCard: {
        width: 160,
        marginRight: 16,
        marginBottom: 3,
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 0,
        elevation: 2,
        position: 'relative',
    },
    saleImage: {
        width: 160,
        height: 175,
        borderRadius: 12,
        marginBottom: 8,
        resizeMode: 'cover',
    },
    discountBadge: {
        position: 'absolute',
        top: 12,
        left: 12,
        backgroundColor: '#E53935',
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 2,
        zIndex: 2,
    },
    discountText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    favoriteBtn: {
        position: 'absolute',
        top: 12,
        right: 12,
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 4,
        elevation: 2,
        zIndex: 2,
    },
    saleInfo: {
        margin: 10,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,
    },
    ratingText: {
        fontSize: 10,
        color: '#888',
        marginLeft: 4,
    },
    saleBrand: {
        fontSize: 10,
        color: '#888',
        marginBottom: 2,
    },
    saleName: {
        fontSize: 14,
        color: '#222',
        fontWeight: 'bold',
        marginBottom: 2,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    oldPrice: {
        fontSize: 12,
        color: '#888',
        textDecorationLine: 'line-through',
        marginRight: 4,
    },
    salePrice: {
        fontSize: 14,
        color: '#E53935',
        fontWeight: 'bold',
    },
    productScroll: {
        paddingLeft: 24,
        marginBottom: 24,
    },
    productCard: {
        width: 120,
        marginRight: 16,
        marginBottom: 3,
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 0,
        alignItems: 'center',
        elevation: 2,
        position: 'relative',
    },
    productImage: {
        width: 120,
        height: 120,
        borderRadius: 12,
        marginBottom: 8,
        resizeMode: 'cover',
    },
    newBadge: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: '#E53935',
        borderRadius: 8,
        paddingHorizontal: 6,
        paddingVertical: 2,
        zIndex: 2,
    },
    newBadgeText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
    productName: {
        fontSize: 14,
        color: '#222',
        fontWeight: '500',
        textAlign: 'center',
        margin: 5,
    },
});