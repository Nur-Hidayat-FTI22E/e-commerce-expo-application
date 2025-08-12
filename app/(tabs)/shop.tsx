import { Feather } from '@expo/vector-icons';
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const categoriesList = [
	"Tops",
	"Shirts & Blouses",
	"Cardigans & Sweaters",
	"Knitwear",
	"Blazers",
	"Outerwear",
	"Pants",
	"Jeans",
	"Shorts",
	"Skirts",
	"Dresses",
];

export default function ShopCategoryList() {
	return (
		<View style={styles.container}>
			{/* Header */}
			<View style={styles.header}>
				<TouchableOpacity>
					<Feather name="arrow-left" size={24} color="#222" />
				</TouchableOpacity>
				<Text style={styles.headerTitle}>Categories</Text>
				<TouchableOpacity>
					<Feather name="search" size={24} color="#222" />
				</TouchableOpacity>
			</View>
			{/* View All Button */}
			<TouchableOpacity style={styles.viewAllBtn}>
				<Text style={styles.viewAllText}>VIEW ALL ITEMS</Text>
			</TouchableOpacity>
			<Text style={styles.chooseText}>Choose category</Text>
			{/* Category List */}
			<ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
				{categoriesList.map((cat, idx) => (
					<TouchableOpacity
						key={cat}
						style={styles.catItem}
					>
						<Text style={styles.catText}>{cat}</Text>
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
	viewAllBtn: {
		backgroundColor: '#E53935',
		borderRadius: 24,
		paddingVertical: 12,
		alignItems: 'center',
		marginHorizontal: 24,
		marginBottom: 16,
		elevation: 2,
	},
	viewAllText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: 'bold',
		letterSpacing: 1,
	},
	chooseText: {
		color: '#888',
		fontSize: 14,
		marginLeft: 24,
		marginBottom: 8,
	},
	scroll: {
		paddingHorizontal: 0,
	},
	catItem: {
		backgroundColor: '#fff',
		borderRadius: 12,
		paddingVertical: 16,
		paddingHorizontal: 24,
		marginBottom: 8,
		elevation: 1,
		shadowColor: '#222',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 2,
	},
	catText: {
		fontSize: 16,
		color: '#222',
	},
});