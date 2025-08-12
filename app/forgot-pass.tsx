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

            <Text style={styles.description}>Please, enter your email address. You will receive a link to create a new password via email.</Text>

            {/* Form */}
            <View style={styles.form}>
                {/* Email Input */}
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Email</Text>
                    <TextInput
                        style={[styles.input, emailTouched && !isEmailValid ? styles.inputError : null]}
                        value={email}
                        onChangeText={setEmail}
                        onBlur={() => setEmailTouched(true)}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    {emailTouched && !isEmailValid && (
                        <Text style={styles.errorText}>Not a valid email address. Should be your@email.com</Text>
                    )}
                </View>
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
    description: {
        fontSize: 12,
        color: '#aaa',
        marginBottom: 20,
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
    inputError: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 2,
        marginLeft: 2,
    },
    submitButton: {
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
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
});

export default ForgotPass;
