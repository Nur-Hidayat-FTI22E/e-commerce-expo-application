import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, FlatList, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

type ImageItem = {
  url: string;
};

const { width, height } = Dimensions.get('window');

const productData = [
  {
    id: 's1',
    name: 'Evening Dress',
    images: [
      require('../assets/images/product/sale1.png'),
      require('../assets/images/product/sale1.png'),
      require('../assets/images/product/sale1.png'),
    ],
    brand: 'Dorothy Perkins',
    price: 125,
    oldPrice: 155,
    discount: 20,
    colorOptions: ['Black', 'Navy', 'Red'], // Tambahkan opsi warna untuk pengujian
    sizeOptions: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Elegant evening dress, perfect for formal events.',
    rating: 4.5,
    ratingCount: 10,
    reviews: [
      {
        user: 'Helene Moore',
        date: 'June 5, 2019',
        rating: 5,
        text: 'The dress is great! Very classy and comfortable.',
        helpful: true,
        withPhoto: true,
      },
      {
        user: 'Kate Doe',
        date: 'June 2, 2019',
        rating: 4,
        text: 'Nice dress, but a bit tight on the waist.',
        helpful: false,
        withPhoto: false,
      },
    ],
    ratingBreakdown: [7, 2, 1, 0, 0],
  },
  {
    id: 's2',
    name: 'Sport Dress',
    images: [
      require('../assets/images/product/sale2.png'),
      require('../assets/images/product/sale2.png'),
      require('../assets/images/product/sale2.png'),
    ],
    brand: 'Silly',
    price: 195,
    oldPrice: 229,
    discount: 15,
    colorOptions: ['Blue', 'Green', 'White'],
    sizeOptions: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Comfortable sport dress for casual wear or workouts.',
    rating: 4.0,
    ratingCount: 5,
    reviews: [
      {
        user: 'John Smith',
        date: 'July 10, 2020',
        rating: 4,
        text: 'Comfortable and stylish, great for summer activities.',
        helpful: true,
        withPhoto: false,
      },
      {
        user: 'Anna Johnson',
        date: 'July 8, 2020',
        rating: 5,
        text: 'Loved it! The material feels amazing.',
        helpful: true,
        withPhoto: true,
      },
    ],
    ratingBreakdown: [3, 1, 1, 0, 0],
  },
  {
    id: 's3',
    name: 'Sport Dress',
    images: [
      require('../assets/images/product/sale3.png'),
      require('../assets/images/product/sale3.png'),
      require('../assets/images/product/sale3.png'),
    ],
    brand: 'Silly',
    price: 195,
    oldPrice: 229,
    discount: 15,
    colorOptions: ['Pink', 'Black', 'Gray'],
    sizeOptions: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Comfortable sport dress for casual wear or workouts.',
    rating: 4.0,
    ratingCount: 5,
    reviews: [
      {
        user: 'Emily Carter',
        date: 'May 15, 2021',
        rating: 4,
        text: 'Fits nicely and very breathable fabric.',
        helpful: false,
        withPhoto: false,
      },
      {
        user: 'Sarah Lee',
        date: 'May 14, 2021',
        rating: 5,
        text: 'Great purchase! Would recommend.',
        helpful: true,
        withPhoto: false,
      },
    ],
    ratingBreakdown: [3, 1, 1, 0, 0],
  },
  {
    id: 'p1',
    name: 'Red Stripe Shirt',
    images: [
      require('../assets/images/product/product1.png'),
      require('../assets/images/product/product1.png'),
      require('../assets/images/product/product1.png'),
    ],
    brand: 'Unknown',
    price: 29.99,
    colorOptions: ['Red', 'Blue', 'White'],
    sizeOptions: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Casual red stripe shirt, perfect for everyday wear.',
    rating: 4.2,
    ratingCount: 8,
    reviews: [
      {
        user: 'Michael Brown',
        date: 'April 20, 2022',
        rating: 4,
        text: 'Nice shirt, but color fades after several washes.',
        helpful: true,
        withPhoto: false,
      },
      {
        user: 'Jessica Wilson',
        date: 'April 18, 2022',
        rating: 5,
        text: 'Good quality and fits perfectly.',
        helpful: true,
        withPhoto: true,
      },
    ],
    ratingBreakdown: [5, 2, 1, 0, 0],
  },
  {
    id: 'p2',
    name: 'White T-Shirt',
    images: [
      require('../assets/images/product/product2.png'),
      require('../assets/images/product/product2.png'),
      require('../assets/images/product/product2.png'),
    ],
    brand: 'Unknown',
    price: 19.99,
    colorOptions: ['White', 'Black', 'Gray'],
    sizeOptions: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Classic white T-shirt, comfortable and versatile.',
    rating: 4.5,
    ratingCount: 15,
    reviews: [
      {
        user: 'David Thomas',
        date: 'March 10, 2023',
        rating: 5,
        text: 'Super comfy and looks great with everything.',
        helpful: true,
        withPhoto: false,
      },
      {
        user: 'Sophia White',
        date: 'March 8, 2023',
        rating: 4,
        text: 'Good quality but a bit transparent.',
        helpful: false,
        withPhoto: false,
      },
    ],
    ratingBreakdown: [10, 3, 2, 0, 0],
  },
  {
    id: 'p3',
    name: 'Summer Dress',
    images: [
      require('../assets/images/product/product3.png'),
      require('../assets/images/product/product3.png'),
      require('../assets/images/product/product3.png'),
    ],
    brand: 'Unknown',
    price: 39.99,
    colorOptions: ['Yellow', 'Green', 'Blue'],
    sizeOptions: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Lightweight summer dress for hot weather.',
    rating: 4.7,
    ratingCount: 12,
    reviews: [
      {
        user: 'Olivia Martin',
        date: 'August 5, 2021',
        rating: 5,
        text: 'Perfect for summer! Very breathable and cute.',
        helpful: true,
        withPhoto: true,
      },
      {
        user: 'Lucas Adams',
        date: 'August 3, 2021',
        rating: 4,
        text: 'Looks great but slightly loose at the waist.',
        helpful: false,
        withPhoto: false,
      },
    ],
    ratingBreakdown: [8, 3, 1, 0, 0],
  },
];

export default function ProductDetail() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const productId = params.id;
  const product = productData.find(p => p.id === productId);
  const [selectedSize, setSelectedSize] = useState('Size');
  const [selectedColor, setSelectedColor] = useState('');
  const [sizeModal, setSizeModal] = useState(false);
  const [colorModal, setColorModal] = useState(false);
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Cek apakah ukuran dan warna sudah dipilih
  const isAddToCartEnabled = selectedSize !== 'Size' && selectedColor !== '';

  if (!product) {
    return (
      <View style={{ flex: 1, backgroundColor: '#F7F7F7', justifyContent: 'center', alignItems: 'center', padding: 24 }}>
        <Text style={styles.notFound}>Product not found.</Text>
        <TouchableOpacity onPress={() => router.back()} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
          <Feather name="arrow-left" size={24} color="#222" />
          <Text style={{ fontSize: 16, color: '#222', marginLeft: 8 }}>Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const openImage = (index: number) => {
    setCurrentIndex(index);
    setVisible(true);
  };

  const imageViewerImages: ImageItem[] = product.images.map(img => ({
    url: Image.resolveAssetSource(img).uri, // Gunakan 'url' sesuai kebutuhan ImageViewer
  }));

  return (
    <View style={styles.container}>
      <ScrollView style={styles.page} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()} style={styles.headerBtn}>
            <Feather name="arrow-left" size={24} color="#222" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{product.name}</Text>
          <TouchableOpacity style={styles.headerBtn}>
            <Feather name="share-2" size={22} color="#222" />
          </TouchableOpacity>
        </View>

        {/* Image Gallery */}
        <View>
          <FlatList
            data={product.images}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_: any, index: { toString: () => any; }) => index.toString()}
            renderItem={({ item, index }: { item: any; index: number }) => (
              <View style={{
                width,
                height: 450,
                overflow: 'hidden',
                alignItems: 'flex-start',
                borderRadius: 12,
                marginRight: 12,
                backgroundColor: '#fff',
              }}>
                <TouchableOpacity activeOpacity={1} onPress={() => openImage(index)}>
                  <Image
                    source={item}
                    style={styles.galleryImage}
                  />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>

        {/* Image Viewer Modal */}
        <Modal
          visible={visible}
          transparent={true}
          onRequestClose={() => setVisible(false)}
        >
          <View style={styles.imageViewerContainer}>
            <ImageViewer
              imageUrls={imageViewerImages}
              index={currentIndex}
              onSwipeDown={() => setVisible(false)}
              enableSwipeDown
              backgroundColor="rgba(0,0,0,0.9)"
              renderHeader={() => (
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setVisible(false)}
                >
                  <Feather name="x" size={30} color="#fff" />
                </TouchableOpacity>
              )}
            />
          </View>
        </Modal>

        {/* Dropdowns */}
        <View style={styles.dropdownRow}>
          <TouchableOpacity style={styles.dropdown} onPress={() => setSizeModal(true)}>
            <Text style={styles.dropdownText}>{selectedSize}</Text>
            <Feather name="chevron-down" size={18} color="#222" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropdown} onPress={() => setColorModal(true)}>
            <Text style={styles.dropdownText}>{selectedColor || 'Color'}</Text>
            <Feather name="chevron-down" size={18} color="#222" />
          </TouchableOpacity>
        </View>

        {/* Product Info */}
        <View style={styles.infoRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.brand}>{product.brand}</Text>
            <Text style={styles.subBrand}>Short black dress</Text>
            <View style={styles.ratingRow}>
              <Feather name="star" size={14} color="#FFC107" />
              <Text style={styles.ratingText}>({product.ratingCount})</Text>
            </View>
          </View>
          <Text style={styles.price}>${product.price}</Text>
        </View>
        <Text style={styles.description}>{product.description}</Text>

        {/* Rating & Reviews Section */}
        <View style={styles.reviewSection}>
          <Text style={styles.reviewTitle}>Rating&Reviews</Text>
          <View style={styles.ratingSummaryRow}>
            <Text style={styles.ratingScore}>{product.rating}</Text>
            <View style={styles.ratingStarsCol}>
              {product.ratingBreakdown.map((count, i) => (
                <View key={i} style={styles.ratingBarRow}>
                  <Feather name="star" size={14} color="#FFC107" />
                  <View style={styles.ratingBarBg}>
                    <View style={[styles.ratingBarFill, { width: count * 8 }]} />
                  </View>
                  <Text style={styles.ratingBarCount}>{count}</Text>
                </View>
              ))}
            </View>
            <Text style={styles.ratingCount}>{product.ratingCount} ratings</Text>
          </View>
          <Text style={styles.reviewCount}>{product.reviews.length} reviews</Text>
          <View style={styles.reviewList}>
            {product.reviews.map((r, idx) => (
              <View key={idx} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <View style={styles.reviewAvatar} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.reviewUser}>{r.user}</Text>
                    <Text style={styles.reviewDate}>{r.date}</Text>
                  </View>
                  <Feather name="star" size={14} color="#FFC107" />
                  <Text style={styles.reviewRating}>{r.rating}</Text>
                </View>
                <Text style={styles.reviewText}>{r.text}</Text>
                <View style={styles.reviewFooter}>
                  {r.withPhoto && <Text style={styles.reviewPhoto}>With photo</Text>}
                  {r.helpful && <Text style={styles.reviewHelpful}>Helpful</Text>}
                </View>
              </View>
            ))}
          </View>
          <TouchableOpacity style={styles.writeReviewBtn}>
            <Text style={styles.writeReviewText}>Write a review</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Fixed Add to Cart Button */}
      <TouchableOpacity
        style={[styles.fixedCartBtn, { backgroundColor: isAddToCartEnabled ? '#E53935' : '#ccc' }]}
        disabled={!isAddToCartEnabled}
      >
        <Text style={styles.cartText}>ADD TO CART</Text>
      </TouchableOpacity>

      {/* Size Modal */}
      <Modal visible={sizeModal} animationType="slide" transparent onRequestClose={() => setSizeModal(false)}>
        <View style={styles.sizeModalOverlay}>
          <View style={styles.sizeModalContent}>
            <Text style={styles.sizeModalTitle}>Select size</Text>
            <View style={styles.sizeGrid}>
              {product.sizeOptions.map(size => (
                <TouchableOpacity
                  key={size}
                  style={[styles.sizeBtn, selectedSize === size && styles.sizeBtnActive]}
                  onPress={() => { setSelectedSize(size) }}
                >
                  <Text style={[styles.sizeText, selectedSize === size && styles.sizeTextActive]}>{size}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.sizeInfo}>Size info</Text>
            <TouchableOpacity style={styles.confirmBtn} onPress={() => setSizeModal(false)}>
              <Text style={styles.confirmText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Color Modal */}
      <Modal visible={colorModal} animationType="slide" transparent onRequestClose={() => setColorModal(false)}>
        <View style={styles.sizeModalOverlay}>
          <View style={styles.sizeModalContent}>
            <Text style={styles.sizeModalTitle}>Select color</Text>
            <View style={styles.sizeGrid}>
              {product.colorOptions.map(color => (
                <TouchableOpacity
                  key={color}
                  style={[styles.sizeBtn, selectedColor === color && styles.sizeBtnActive]}
                  onPress={() => { setSelectedColor(color) }}
                >
                  <Text style={[styles.sizeText, selectedColor === color && styles.sizeTextActive]}>{color}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.confirmBtn} onPress={() => setColorModal(false)}>
              <Text style={styles.confirmText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  page: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  scrollContent: {
    paddingBottom: 80,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 24,
    marginBottom: 8,
  },
  headerBtn: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  galleryImage: {
    width: width,
    height: 450,
    borderRadius: 12,
    marginRight: 12,
    resizeMode: 'cover',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  dropdownRow: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
    marginTop: 8,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flex: 1,
    elevation: 1,
    shadowColor: '#222',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  dropdownText: {
    fontSize: 15,
    color: '#222',
    flex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 4,
  },
  brand: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
  },
  subBrand: {
    fontSize: 13,
    color: '#888',
    marginBottom: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  ratingText: {
    fontSize: 12,
    color: '#888',
    marginLeft: 4,
  },
  price: {
    fontSize: 22,
    color: '#E53935',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  description: {
    fontSize: 14,
    color: '#444',
    marginBottom: 16,
    paddingHorizontal: 16,
    textAlign: 'left',
  },
  fixedCartBtn: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#222',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cartText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  confirmBtn: {
    backgroundColor: '#E53935',
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 24,
    elevation: 2,
  },
  confirmText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  sizeModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.15)',
    justifyContent: 'flex-end',
  },
  sizeModalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 32,
    width: '100%',
    elevation: 8,
  },
  sizeModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 16,
    textAlign: 'center',
  },
  sizeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sizeBtn: {
    backgroundColor: '#F7F7F7',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 8,
    marginRight: 8,
    minWidth: 56,
    alignItems: 'center',
  },
  sizeBtnActive: {
    backgroundColor: '#E53935',
  },
  sizeText: {
    fontSize: 16,
    color: '#222',
    fontWeight: 'bold',
  },
  sizeTextActive: {
    color: '#fff',
  },
  sizeInfo: {
    fontSize: 14,
    color: '#888',
    marginBottom: 16,
    textAlign: 'center',
  },
  reviewSection: {
    backgroundColor: '#fff',
    borderRadius: 24,
    marginHorizontal: 16,
    marginBottom: 32,
    padding: 24,
    elevation: 2,
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
  },
  ratingSummaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 12,
  },
  ratingScore: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#222',
    marginRight: 8,
  },
  ratingStarsCol: {
    flex: 1,
    justifyContent: 'center',
  },
  ratingBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  ratingBarBg: {
    height: 8,
    width: 64,
    backgroundColor: '#eee',
    borderRadius: 4,
    marginHorizontal: 4,
    overflow: 'hidden',
  },
  ratingBarFill: {
    height: 8,
    backgroundColor: '#E53935',
    borderRadius: 4,
  },
  ratingBarCount: {
    fontSize: 12,
    color: '#888',
    marginLeft: 4,
  },
  ratingCount: {
    fontSize: 14,
    color: '#888',
    marginLeft: 8,
  },
  reviewCount: {
    fontSize: 14,
    color: '#222',
    marginBottom: 8,
  },
  reviewList: {
    marginBottom: 8,
  },
  reviewCard: {
    backgroundColor: '#F7F7F7',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  reviewAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ddd',
    marginRight: 8,
  },
  reviewUser: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222',
  },
  reviewDate: {
    fontSize: 12,
    color: '#888',
  },
  reviewRating: {
    fontSize: 14,
    color: '#222',
    marginLeft: 2,
  },
  reviewText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 8,
  },
  reviewFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  reviewPhoto: {
    fontSize: 12,
    color: '#E53935',
    fontWeight: 'bold',
  },
  reviewHelpful: {
    fontSize: 12,
    color: '#888',
    fontWeight: 'bold',
  },
  writeReviewBtn: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    marginTop: 8,
  },
  writeReviewText: {
    color: '#E53935',
    fontSize: 16,
    fontWeight: 'bold',
  },
  notFound: {
    fontSize: 20,
    color: '#888',
    marginBottom: 24,
    textAlign: 'center',
  },
  imageViewerContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
    padding: 10,
  },
});