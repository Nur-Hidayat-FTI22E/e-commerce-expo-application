import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from "react";
import { Image, ImageBackground, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const bannerImg = require("../../assets/images/product/banner-fashion.png"); // Ganti dengan gambar banner fashion sale
const saleProducts = [
    {
        id: 's1',
        name: "Evening Dress",
        brand: "Dorothy Perkins",
        image: require("../../assets/images/product/sale1.png"),
        discount: 20,
        oldPrice: 155,
        price: 125,
        rating: 4.5,
        reviews: 10,
    },
    {
        id: 's2',
        name: "Sport Dress",
        brand: "Silly",
        image: require("../../assets/images/product/sale2.png"),
        discount: 15,
        oldPrice: 229,
        price: 195,
        rating: 4.0,
        reviews: 5,
    },
    {
        id: 's3',
        name: "Sport Dress",
        brand: "Silly",
        image: require("../../assets/images/product/sale3.png"),
        discount: 15,
        oldPrice: 229,
        price: 195,
        rating: 4.0,
        reviews: 5,
    },
];

const products = [
    {
        id: 'p1',
        name: "Red Stripe Shirt",
        image: require("../../assets/images/product/product1.png"),
        isNew: true,
    },
    {
        id: 'p2',
        name: "White T-Shirt",
        image: require("../../assets/images/product/product2.png"),
        isNew: true,
    },
    {
        id: 'p3',
        name: "Summer Dress",
        image: require("../../assets/images/product/product3.png"),
        isNew: false,
    },
];

export default function Home() {
    const [refreshing, setRefreshing] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1500); 
    };
    return (
        <>
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={["#E53935"]}
                    tintColor="#E53935"
                    title="Refreshing..."
                    titleColor="#E53935"
                />
            }
        >
            {/* Banner Fashion Sale */}
            <ImageBackground source={bannerImg} style={styles.banner} imageStyle={styles.bannerImg}>
                <View style={styles.bannerContent}>
                    <Text style={styles.bannerTitle}>Fashion{"\n"}sale</Text>
                    <TouchableOpacity style={styles.bannerButton} onPress={() => setModalVisible(true)}>
                        <Text style={styles.bannerButtonText}>Check</Text>
                    </TouchableOpacity>
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
                    <TouchableOpacity key={product.id} style={styles.saleCard} onPress={() => router.push({ pathname: '/product-detail', params: { id: product.id } })}>
                        <Image source={product.image} style={styles.saleImage} />
                        <View style={styles.discountBadge}>
                            <Text style={styles.discountText}>-{product.discount}%</Text>
                        </View>
                        <TouchableOpacity style={styles.favoriteBtn}>
                            <Feather name="heart" size={20} color="#ccc" />
                        </TouchableOpacity>
                        <View style={styles.saleInfo}>
                            <View style={styles.ratingRow}>
                                {[...Array(5)].map((_, i) => (
                                    <Feather
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
                    <View key={product.id} style={styles.productCard}>
                        <Image source={product.image} style={styles.productImage} />
                        {product.isNew && (
                            <View style={styles.newBadge}>
                                <Text style={styles.newBadgeText}>NEW</Text>
                            </View>
                        )}
                        <Text style={styles.productName}>{product.name}</Text>
                    </View>
                ))}
            </ScrollView>
            {/* ...existing code... */}
        </ScrollView>

        </>
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
        marginBottom: 16,
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
        width: 120,
        marginRight: 16,
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 10,
        alignItems: 'center',
        elevation: 2,
        position: 'relative',
    },
    productImage: {
        width: 80,
        height: 100,
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
    },
    saleScroll: {
        paddingLeft: 24,
        marginBottom: 24,
    },
    saleCard: {
        width: 160,
        marginRight: 16,
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 10,
        elevation: 2,
        position: 'relative',
    },
    saleImage: {
        width: 140,
        height: 160,
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
        marginTop: 4,
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
});