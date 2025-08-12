import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { loginUser } from '../services/authService';

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleLogin = async () => {
		if (!email || !password) {
			alert('Please enter email and password');
			return;
		}
		setLoading(true);
		const result = await loginUser({ email, password });
		setLoading(false);
		if (result.status === 'OK' && result.data) {
			await AsyncStorage.setItem('jwt_token', result.data);
			alert('Login successful');
			router.push('/home');
		} else {
			alert(result.message || 'Login failed');
		}
	};

	return (
		<View style={styles.container}>
			{/* Back Arrow */}
			<TouchableOpacity style={styles.backArrow} onPress={() => router.back()}>
				<Feather name="arrow-left" size={28} color="#222" />
			</TouchableOpacity>

			{/* Title */}
			<Text style={styles.title}>Login</Text>

			{/* Form */}
			<View style={styles.form}>
				{/* Email Input */}
				<View style={styles.inputContainer}>
					<Text style={styles.inputLabel}>Email</Text>
					<TextInput
						style={styles.input}
						value={email}
						onChangeText={setEmail}
						keyboardType="email-address"
						autoCapitalize="none"
					/>
				</View>
				{/* Password Input */}
				<View style={styles.inputContainer}>
					<Text style={styles.inputLabel}>Password</Text>
					<TextInput
						style={styles.input}
						value={password}
						onChangeText={setPassword}
						secureTextEntry
					/>
				</View>
			</View>

			{/* Belum punya akun */}
			<TouchableOpacity style={styles.loginRow} onPress={() => router.push('/forgot-pass')}>
				<Text style={styles.loginText}>Forgot your password</Text>
				<Feather name="arrow-right" size={16} color="#E53935" style={styles.loginArrow} />
			</TouchableOpacity>

			{/* Login Button */}
			<TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
				{loading ? <Text style={styles.loginButtonText}>Loading...</Text> : <Text style={styles.loginButtonText}>LOGIN</Text>}
			</TouchableOpacity>

			{/* Social Login */}
			<Text style={styles.socialText}>Or login with social account</Text>
			<View style={styles.socialRow}>
				<TouchableOpacity style={styles.socialButton}>
					<Image
						source={require("../assets/images/google.png")}
						style={styles.socialIcon}
					/>
				</TouchableOpacity>
				<TouchableOpacity style={styles.socialButton}>
					<Image
						source={require("../assets/images/facebook.png")}
						style={styles.socialIcon}
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F7F7F7',
		paddingHorizontal: 24,
		paddingTop: 48,
	},
	backArrow: {
		position: 'absolute',
		top: 48,
		left: 16,
		zIndex: 1,
	},
	title: {
		fontSize: 32,
		fontWeight: 'bold',
		marginTop: 48,
		marginBottom: 32,
		color: '#222',
	},
	form: {
		backgroundColor: '#fff',
		borderRadius: 8,
		padding: 16,
		marginBottom: 16,
		elevation: 2,
	},
	inputContainer: {
		marginBottom: 12,
		position: 'relative',
	},
	inputLabel: {
		fontSize: 12,
		color: '#aaa',
		marginBottom: 2,
	},
	input: {
		height: 40,
		borderWidth: 1,
		borderColor: '#eee',
		borderRadius: 6,
		paddingHorizontal: 10,
		backgroundColor: '#fff',
		fontSize: 16,
	},
	loginRow: {
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'flex-end',
		marginBottom: 16,
	},
	loginText: {
		fontSize: 14,
		color: '#888',
		marginRight: 4,
	},
	loginArrow: {
		fontSize: 16,
		color: '#E53935',
	},
	loginButton: {
		backgroundColor: '#E53935',
		borderRadius: 24,
		paddingVertical: 12,
		alignItems: 'center',
		marginBottom: 24,
		elevation: 3,
		shadowColor: '#E53935',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 4,
	},
	loginButtonText: {
		color: '#fff',
		fontSize: 18,
		fontWeight: 'bold',
		letterSpacing: 1,
	},
	socialText: {
		textAlign: 'center',
		color: '#888',
		marginBottom: 12,
		fontSize: 14,
	},
	socialRow: {
		flexDirection: 'row',
		justifyContent: 'center',
		gap: 16,
	},
	socialButton: {
		backgroundColor: '#fff',
		borderRadius: 12,
		padding: 12,
		marginHorizontal: 8,
		elevation: 2,
	},
	socialIcon: {
		width: 32,
		height: 32,
		resizeMode: 'contain',
	},
});
