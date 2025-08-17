import { Feather, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import {
    Image,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

export default function Favorite() {
    const router = useRouter();
    const [likedProducts, setLikedProducts] = useState<{ [key: string]: boolean }>({});
    const [refreshing, setRefreshing] = useState(false);

    const allProducts = [
        {
            id: 's1',
            name: 'Evening Dress',
            brand: 'Dorothy Perkins',
            image: require('../../assets/images/product/sale1.png'),
            discount: 20,
            oldPrice: 155,
            price: 125,
            rating: 4.5,
            reviews: 10,
        },
        {
            id: 's2',
            name: 'Sport Dress',
            brand: 'Silly',
            image: require('../../assets/images/product/sale2.png'),
            discount: 15,
            oldPrice: 229,
            price: 195,
            rating: 4.0,
            reviews: 5,
        },
        {
            id: 's3',
            name: 'Sport Dress',
            brand: 'Silly',
            image: require('../../assets/images/product/sale3.png'),
            discount: 15,
            oldPrice: 229,
            price: 195,
            rating: 4.0,
            reviews: 5,
        },
    ];

    const favoriteProducts = allProducts.filter(product => likedProducts[product.id]);

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

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1500);
    };

    const toggleLike = (productId: string) => {
        setLikedProducts(prev => {
            const newLikedProducts = { ...prev, [productId]: !prev[productId] };
            return newLikedProducts;
        });
    };

    return (
        <View style={styles.container}>
            {/* Sticky Header */}
            <View style={styles.stickyHeader}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
                        <Feather name="arrow-left" size={24} color="#222" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Favorites</Text>
                    <Feather name="search" size={22} color="#222" />
                </View>

                {/* Filter Chips */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.filterChips}
                >
                    {['Summer', 'T-Shirts', 'Shirts', 'Jeans', 'Jackets'].map((item, index) => (
                        <TouchableOpacity key={index} style={styles.chip}>
                            <Text style={styles.chipText}>{item}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Sort & Filter Bar */}
                <View style={styles.filterBar}>
                    <TouchableOpacity style={styles.filterOption}>
                        <Feather name="sliders" size={16} color="#222" />
                        <Text style={styles.filterText}>Filters</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.filterOption}>
                        <MaterialCommunityIcons name="arrow-up-down" size={16} color="#222" />
                        <Text style={styles.filterText}>Price: lowest to high</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Feather name="grid" size={18} color="#222" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Content with Scroll */}
            <ScrollView
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: 140 }} // kasih space untuk sticky header
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={['#E53935']}
                        tintColor="#E53935"
                    />
                }
            >
                {favoriteProducts.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Feather name="heart" size={50} color="#ccc" />
                        <Text style={styles.emptyText}>No favorite products yet.</Text>
                        <Text style={styles.emptySubText}>
                            Add products to your favorites from the home page!
                        </Text>
                        <TouchableOpacity
                            style={styles.emptyButton}
                            onPress={() => router.push('/home')}
                        >
                            <Text style={styles.emptyButtonText}>Go to Home</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.gridContainer}>
                        {favoriteProducts.map(product => (
                            <TouchableOpacity
                                key={product.id}
                                style={styles.card}
                                onPress={() =>
                                    router.push({ pathname: '/product-detail', params: { id: product.id } })
                                }
                            >
                                <Image source={product.image} style={styles.productImage} />

                                <View style={styles.discountBadge}>
                                    <Text style={styles.discountText}>-{product.discount}%</Text>
                                </View>

                                <TouchableOpacity
                                    style={styles.favoriteBtn}
                                    onPress={() => toggleLike(product.id)}
                                >
                                    <FontAwesome
                                        name="heart"
                                        size={18}
                                        color={likedProducts[product.id] ? '#E53935' : '#ccc'}
                                    />
                                </TouchableOpacity>

                                <View style={styles.productInfo}>
                                    <Text style={styles.productName}>{product.name}</Text>
                                    <Text style={styles.productBrand}>{product.brand}</Text>
                                    <View style={styles.priceRow}>
                                        <Text style={styles.oldPrice}>{product.oldPrice}$</Text>
                                        <Text style={styles.salePrice}>{product.price}$</Text>
                                    </View>
                                    <View style={styles.ratingRow}>
                                        {[...Array(5)].map((_, i) => (
                                            <FontAwesome
                                                key={i}
                                                name="star"
                                                size={12}
                                                color={i < Math.round(product.rating) ? '#FFC107' : '#eee'}
                                            />
                                        ))}
                                        <Text style={styles.ratingText}>({product.reviews})</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },

    stickyHeader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        zIndex: 10,
        elevation: 4,
        paddingBottom: 8,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        paddingTop: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#222' },

    filterChips: {
        paddingVertical: 8,
        paddingHorizontal: 8,
    },
    chip: {
        backgroundColor: '#222',
        borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 6,
        marginRight: 8,
    },
    chipText: { color: '#fff', fontSize: 14, fontWeight: '500' },

    filterBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 6,
    },
    filterOption: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    filterText: { fontSize: 13, color: '#222' },

    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 16,
        justifyContent: 'space-between',
    },
    card: {
        width: CARD_WIDTH,
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        overflow: 'hidden',
        position: 'relative',
    },
    productImage: { width: '100%', height: 140, resizeMode: 'cover' },
    discountBadge: {
        position: 'absolute',
        top: 8,
        left: 8,
        backgroundColor: '#E53935',
        borderRadius: 6,
        paddingHorizontal: 6,
        paddingVertical: 2,
        zIndex: 2,
    },
    discountText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
    favoriteBtn: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 4,
        elevation: 3,
        zIndex: 2,
    },
    productInfo: { padding: 8 },
    productName: { fontSize: 14, fontWeight: 'bold', color: '#222' },
    productBrand: { fontSize: 12, color: '#888', marginBottom: 4 },
    priceRow: { flexDirection: 'row', alignItems: 'center' },
    oldPrice: {
        fontSize: 12,
        color: '#888',
        textDecorationLine: 'line-through',
        marginRight: 6,
    },
    salePrice: { fontSize: 14, color: '#E53935', fontWeight: 'bold' },
    ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
    ratingText: { fontSize: 12, color: '#888', marginLeft: 4 },

    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
    emptyText: { fontSize: 18, color: '#222', fontWeight: 'bold', marginVertical: 8 },
    emptySubText: { fontSize: 14, color: '#888', textAlign: 'center', marginBottom: 16 },
    emptyButton: {
        backgroundColor: '#E53935',
        borderRadius: 24,
        paddingVertical: 12,
        paddingHorizontal: 24,
        elevation: 2,
    },
    emptyButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});