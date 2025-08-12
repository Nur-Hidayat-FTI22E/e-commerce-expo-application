import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from "react";
import { ActivityIndicator, Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { createUser } from '../services/authService';

export default function Index() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const isNameValid = name.length > 0;

    const handleSignUp = async () => {
        if (!name || !email || !password) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }
        setLoading(true);
        const result = await createUser({ nama: name, email, password });
        setLoading(false);
        if (result.status === 'OK') {
            Alert.alert('Success', 'Account created successfully');
            router.push('/login');
        } else {
            Alert.alert('Error', result.message || 'Failed to create account');
        }
    };

    return (
        <View style={styles.container}>
            {/* Title */}
            <Text style={styles.title}>Sign up</Text>

            {/* Form */}
            <View style={styles.form}>
                {/* Name Input */}
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Name</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                    />
                    {isNameValid && (
                        <Text style={styles.checkMark}>✔️</Text>
                    )}
                </View>
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

            {/* Already have account */}
            <TouchableOpacity style={styles.loginRow} onPress={() => router.push('/login')}>
                <Text style={styles.loginText}>Already have an account?</Text>
                <Feather name="arrow-right" size={16} color="#E53935" style={styles.loginArrow} />
            </TouchableOpacity>

            {/* Sign Up Button */}
            <TouchableOpacity style={styles.signupButton} onPress={handleSignUp} disabled={loading}>
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.signupButtonText}>SIGN UP</Text>}
            </TouchableOpacity>

            {/* Social Login */}
            <Text style={styles.socialText}>Or sign up with social account</Text>
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
    checkMark: {
        position: 'absolute',
        right: 10,
        top: 28,
        fontSize: 18,
        color: 'green',
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
    signupButton: {
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
    signupButtonText: {
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
        resizeMode: 'cover',
    },
});
