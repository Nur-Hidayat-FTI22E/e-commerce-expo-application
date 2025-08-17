import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

const allCategories = [
  { title: 'New', image: require('../../assets/images/product/shop-product-new.png'), category: 'Women' },
  { title: 'Clotes', image: require('../../assets/images/product/shop-product-clothes.png'), category: 'Women' },
  { title: 'Shoes', image: require('../../assets/images/product/shop-product-shoes.png'), category: 'Men' },
  { title: 'Accesories', image: require('../../assets/images/product/shop-product-accesories.png'), category: 'Kids' },
];

export default function ShopCategoryList() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Women');

  const filteredCategories = allCategories.filter(cat => cat.category === activeTab || activeTab === 'All');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
          <Feather name="arrow-left" size={24} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Categories</Text>
        <TouchableOpacity>
          <Feather name="search" size={24} color="#222" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <View style={styles.tabs}>
          <TouchableOpacity style={[styles.tab, activeTab === 'All' && styles.activeTab]} onPress={() => setActiveTab('All')}>
            <Text style={[styles.tabText, activeTab === 'All' && styles.activeTabText]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tab, activeTab === 'Women' && styles.activeTab]} onPress={() => setActiveTab('Women')}>
            <Text style={[styles.tabText, activeTab === 'Women' && styles.activeTabText]}>Women</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tab, activeTab === 'Men' && styles.activeTab]} onPress={() => setActiveTab('Men')}>
            <Text style={[styles.tabText, activeTab === 'Men' && styles.activeTabText]}>Men</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tab, activeTab === 'Kids' && styles.activeTab]} onPress={() => setActiveTab('Kids')}>
            <Text style={[styles.tabText, activeTab === 'Kids' && styles.activeTabText]}>Kids</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Summer Sales Banner */}
      <TouchableOpacity style={styles.saleBanner}>
        <Text style={styles.saleText}>SUMMER SALES</Text>
        <Text style={styles.saleSubText}>Up to 50% off</Text>
      </TouchableOpacity>

      {/* Category List */}
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {filteredCategories.map((cat, idx) => (
          <TouchableOpacity key={cat.title} style={styles.catItem}>
            <View style={styles.contentContainer}>
              <Text style={styles.catText}>{cat.title}</Text>
              <Image source={cat.image} style={styles.catImage} />
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },
  tabContainer: {
    backgroundColor: '#EDEDED',
    paddingVertical: 8,
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#E53935',
  },
  tabText: {
    fontSize: 16,
    color: '#222',
  },
  activeTabText: {
    fontWeight: 'bold',
    color: '#E53935',
  },
  saleBanner: {
    backgroundColor: '#E53935',
    borderRadius: 12,
    paddingVertical: 30,
    alignItems: 'center',
    marginHorizontal: 24,
    marginBottom: 16,
    elevation: 2,
  },
  saleText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  saleSubText: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.8,
  },
  scroll: {
    paddingHorizontal: 0,
  },
  catItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingLeft: 24,
    marginBottom: 12,
    marginHorizontal: 24,
    elevation: 1,
    shadowColor: '#222',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 95,
    overflow: 'hidden',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
  },
  catImage: {
    width: 155,
    height: 155,
  },
  catText: {
    fontSize: 18,
    color: '#222',
    flex: 1,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
});