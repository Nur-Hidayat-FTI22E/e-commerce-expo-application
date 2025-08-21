import { Feather, FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from "react";
import { Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Asumsi gambar ini sudah ada di folder assets Anda
const bannerImg = require("../assets/images/product/banner-fashion.png");
const products = [
    {
        id: 'p1',
        name: "Red Stripe Shirt",
        brand: "Mango", // Contoh merek
        image: require("../assets/images/product/product1.png"),
        isNew: true,
        rating: 4.2,
        reviews: 8,
        price: 29,
        oldPrice: null,
    },
    {
        id: 'p2',
        name: "White T-Shirt",
        brand: "Nike", // Contoh merek
        image: require("../assets/images/product/product2.png"),
        isNew: true,
        rating: 4.5,
        reviews: 15,
        price: 19,
        oldPrice: null,
    },
    {
        id: 'p3',
        name: "Summer Dress",
        brand: "Zara", // Contoh merek
        image: require("../assets/images/product/product3.png"),
        isNew: false,
        rating: 4.7,
        reviews: 12,
        price: 39,
        oldPrice: null,
    },
];

export default function Main1() {
    return (
        <View style={styles.container}>
            {/* Banner Fashion Sale */}
            <ImageBackground source={bannerImg} style={styles.banner} imageStyle={styles.bannerImg}>
                <View style={styles.bannerContent}>
                    <Text style={styles.bannerTitle}>Fashion{"\n"}sale</Text>
                    <TouchableOpacity style={styles.bannerButton}>
                        <Text style={styles.bannerButtonText}>Check</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>

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
                        <View style={styles.productInfo}>
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
                            <Text style={styles.productBrand}>{product.brand}</Text>
                            <Text style={styles.productName}>{product.name}</Text>
                            <View style={styles.priceRow}>
                                {product.oldPrice && <Text style={styles.oldPrice}>{product.oldPrice}$</Text>}
                                <Text style={styles.salePrice}>{product.price}$</Text>
                            </View>
                        </View>
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
        height: 500,
        justifyContent: 'flex-end',
        marginBottom: 30,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
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
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 12,
        lineHeight: 40,
    },
    bannerButton: {
        backgroundColor: '#E53935',
        borderRadius: 24,
        paddingVertical: 10,
        paddingHorizontal: 32,
        alignSelf: 'flex-start',
        elevation: 2,
        shadowColor: '#E53935',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    bannerButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 1,
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
    productScroll: {
        paddingLeft: 24,
        marginBottom: 24,
    },
    productCard: {
        width: 160, // Diperbesar
        marginRight: 16,
        marginBottom: 3,
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 0,
        elevation: 2,
        position: 'relative',
    },
    productImage: {
        width: 160, // Diperbesar
        height: 175, // Diperbesar
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
    productInfo: {
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
    productBrand: {
        fontSize: 10,
        color: '#888',
        marginBottom: 2,
    },
    productName: {
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
});