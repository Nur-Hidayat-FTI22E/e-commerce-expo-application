import { Feather } from '@expo/vector-icons';
import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const bagItems = [
    {
        name: "Pullover",
        color: "Black",
        size: "L",
        price: 51,
        image: require("../../assets/images/product/product1.png"),
        qty: 1,
    },
    {
        name: "T-Shirt",
        color: "Gray",
        size: "M",
        price: 30,
        image: require("../../assets/images/product/product2.png"),
        qty: 1,
    },
    {
        name: "Sport Dress",
        color: "Black",
        size: "M",
        price: 43,
        image: require("../../assets/images/product/product3.png"),
        qty: 1,
    },
];

export default function Bag() {
    const [items, setItems] = useState(bagItems);
    const [promo, setPromo] = useState("");
    const [promoSheet, setPromoSheet] = useState(false);
    const [menuIdx, setMenuIdx] = useState<number|null>(null);

    const updateQty = (idx: number, delta: number) => {
        setItems(items => items.map((item, i) => i === idx ? { ...item, qty: Math.max(1, item.qty + delta) } : item));
    };

    const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

    // Example promo codes
    const promoCodes = [
        { code: 'SUMMER50', desc: '50% off summer sale' },
        { code: 'FREESHIP', desc: 'Free shipping' },
        { code: 'WELCOME10', desc: '10% off first order' },
    ];

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Bag</Text>
                <TouchableOpacity>
                    <Feather name="search" size={22} color="#222" />
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                {/* Bag Items */}
                {items.map((item, idx) => (
                    <View key={item.name} style={styles.bagCard}>
                        <Image source={item.image} style={styles.bagImage} />
                        <View style={styles.bagInfo}>
                            <Text style={styles.bagName}>{item.name}</Text>
                            <Text style={styles.bagDetail}>Color: {item.color}   Size: {item.size}</Text>
                            <View style={styles.qtyRow}>
                                <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQty(idx, -1)}>
                                    <Feather name="minus" size={18} color="#222" />
                                </TouchableOpacity>
                                <Text style={styles.qtyText}>{item.qty}</Text>
                                <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQty(idx, 1)}>
                                    <Feather name="plus" size={18} color="#222" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.bagRight}>
                            <Text style={styles.bagPrice}>{item.price * item.qty}$</Text>
                            <TouchableOpacity onPress={() => setMenuIdx(idx)}>
                                <Feather name="more-vertical" size={20} color="#888" />
                            </TouchableOpacity>
                        </View>
                        {menuIdx === idx && (
                            <View style={styles.popupMenu}>
                                <TouchableOpacity style={styles.popupMenuItem} onPress={() => { setMenuIdx(null); }}>
                                    <Text style={styles.popupMenuText}>Add to favorites</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.popupMenuItem} onPress={() => {
                                    setItems(items => items.filter((_, i) => i !== idx));
                                    setMenuIdx(null);
                                }}>
                                    <Text style={styles.popupMenuText}>Delete from the list</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                ))}

                {/* Promo Code Input */}
                <View style={styles.promoRow}>
                    <TextInput
                        style={styles.promoInput}
                        placeholder="Enter your promo code"
                        value={promo}
                        onChangeText={setPromo}
                        placeholderTextColor="#bbb"
                        onFocus={() => setPromoSheet(true)}
                    />
                    <TouchableOpacity style={styles.promoBtn} onPress={() => setPromoSheet(true)}>
                        <Feather name="arrow-right" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>

                {/* Total Amount */}
                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Total amount:</Text>
                    <Text style={styles.totalValue}>{total}$</Text>
                </View>

                {/* Checkout Button */}
                <TouchableOpacity style={styles.checkoutBtn}>
                    <Text style={styles.checkoutText}>CHECK OUT</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Promo Bottom Sheet */}
            {promoSheet && (
                <View style={styles.promoSheetOverlay}>
                    <View style={styles.promoSheetContent}>
                        <View style={styles.promoSheetHeader}>
                            <Text style={styles.promoSheetTitle}>Your Promo Codes</Text>
                            <TouchableOpacity onPress={() => setPromoSheet(false)} style={styles.promoSheetCloseBtn}>
                                <Feather name="x" size={22} color="#888" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.promoRow}>
                            <TextInput
                                style={styles.promoInput}
                                placeholder="Enter your promo code"
                                value={promo}
                                onChangeText={setPromo}
                                placeholderTextColor="#bbb"
                                onFocus={() => setPromoSheet(true)}
                            />
                            <TouchableOpacity style={styles.promoBtn} onPress={() => setPromoSheet(false)}>
                                <Feather name="arrow-right" size={20} color="#fff" />
                            </TouchableOpacity>
                        </View>
                        {promoCodes.map((p) => (
                            <TouchableOpacity key={p.code} style={styles.promoSheetItem} onPress={() => { setPromo(p.code); setPromoSheet(false); }}>
                                <Text style={styles.promoSheetCode}>{p.code}</Text>
                                <Text style={styles.promoSheetDesc}>{p.desc}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    popupMenu: {
        position: 'absolute',
        top: 20,
        right: 40,
        backgroundColor: '#fff',
        borderRadius: 12,
        elevation: 8,
        shadowColor: '#222',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        zIndex: 100,
    },
    popupMenuItem: {
        paddingVertical: 10,
    },
    popupMenuText: {
        fontSize: 15,
        color: '#222',
    },
    promoSheetCloseBtn: {
        marginLeft: 12,
        padding: 4,
    },
    promoSheetOverlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        backgroundColor: 'rgba(0,0,0,0.15)',
        justifyContent: 'flex-end',
        zIndex: 100,
    },
    promoSheetContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        paddingBottom: 32,
        width: '100%',
        elevation: 8,
    },
    promoSheetHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    promoSheetTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#222',
    },
    promoSheetItem: {
        backgroundColor: '#F7F7F7',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
    },
    promoSheetCode: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#E53935',
        marginBottom: 4,
    },
    promoSheetDesc: {
        fontSize: 14,
        color: '#888',
    },
    promoModalOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
    },
    promoModalContent: {
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 32,
        width: '80%',
        alignItems: 'center',
        elevation: 8,
    },
    promoModalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#222',
        marginBottom: 16,
    },
    promoModalInput: {
        width: '100%',
        fontSize: 16,
        color: '#222',
        backgroundColor: '#F7F7F7',
        borderRadius: 16,
        paddingVertical: 10,
        paddingHorizontal: 16,
        marginBottom: 24,
    },
    promoModalBtn: {
        backgroundColor: '#E53935',
        borderRadius: 24,
        paddingVertical: 10,
        paddingHorizontal: 24,
        alignItems: 'center',
        marginBottom: 8,
    },
    promoModalClose: {
        position: 'absolute',
        top: 12,
        right: 12,
        padding: 8,
    },
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
        paddingTop: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        marginBottom: 12,
    },
    headerTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#222',
    },
    scroll: {
        paddingHorizontal: 24,
    },
    bagCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 16,
        marginBottom: 16,
        padding: 12,
        elevation: 2,
        shadowColor: '#222',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
    },
    bagImage: {
        width: 60,
        height: 60,
        borderRadius: 12,
        marginRight: 12,
        resizeMode: 'cover',
    },
    bagInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    bagName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#222',
        marginBottom: 2,
    },
    bagDetail: {
        fontSize: 13,
        color: '#888',
        marginBottom: 8,
    },
    qtyRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F7F7F7',
        borderRadius: 24,
        paddingVertical: 4,
        paddingHorizontal: 12,
        width: 110,
        justifyContent: 'space-between',
    },
    qtyBtn: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 4,
        elevation: 1,
        shadowColor: '#222',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 2,
    },
    qtyText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#222',
        marginHorizontal: 8,
    },
    bagRight: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        height: 60,
        marginLeft: 8,
    },
    bagPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#222',
        marginBottom: 8,
    },
    promoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 24,
        paddingHorizontal: 16,
        paddingVertical: 4,
        marginBottom: 16,
        marginTop: 8,
        elevation: 1,
    },
    promoInput: {
        flex: 1,
        fontSize: 15,
        color: '#222',
        paddingVertical: 8,
        backgroundColor: 'transparent',
    },
    promoBtn: {
        backgroundColor: '#222',
        borderRadius: 20,
        padding: 8,
        marginLeft: 8,
        elevation: 2,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    totalLabel: {
        fontSize: 16,
        color: '#888',
    },
    totalValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#222',
    },
    checkoutBtn: {
        backgroundColor: '#E53935',
        borderRadius: 24,
        paddingVertical: 14,
        alignItems: 'center',
        marginBottom: 24,
        elevation: 2,
    },
    checkoutText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
});
