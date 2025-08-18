import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const ForgotPass = () => {
    const [email, setEmail] = useState("");
    const [emailTouched, setEmailTouched] = useState(false);
    const router = useRouter();

    function validateEmail(email: string) {
        return /^\S+@\S+\.\S+$/.test(email);
    }
    const isEmailValid = validateEmail(email);

    return (
        <View style={styles.container}>
            {/* Back Arrow */}
            <TouchableOpacity style={styles.backArrow} onPress={() => router.back()}>
                <Feather name="arrow-left" size={28} color="#222" />
            </TouchableOpacity>

            {/* Title */}
            <Text style={styles.title}>Forgot Password</Text>

            <Text style={styles.description}>
                Please, enter your email address. You will receive a link to create a new password via email.
            </Text>

            {/* Email Input */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={[styles.input, emailTouched && !isEmailValid ? styles.inputError : null]}
                    value={email}
                    onChangeText={setEmail}
                    onBlur={() => setEmailTouched(true)}
                    keyboardType="email-address"
                    placeholder='Email'
                    autoCapitalize="none"
                />
                {emailTouched && !isEmailValid && (
                    <Text style={styles.errorText}>
                        Not a valid email address. Should be your@email.com
                    </Text>
                )}
            </View>

            {/* Submit Button */}
            <TouchableOpacity style={styles.submitButton}>
                <Text style={styles.submitButtonText}>SEND</Text>
            </TouchableOpacity>
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
        marginBottom: 16,
        color: '#222',
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginBottom: 24,
        lineHeight: 20,
    },
    inputContainer: {
        marginBottom: 16,
    },
    inputLabel: {
        fontSize: 12,
        color: '#777',
        marginBottom: 6,
    },
    input: {
        height: 55,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: 'transparent',
        fontSize: 16,
    },
    inputError: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 4,
    },
    submitButton: {
        backgroundColor: '#E53935',
        borderRadius: 24,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 12,
        elevation: 3,
        shadowColor: '#E53935',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
});

export default ForgotPass;