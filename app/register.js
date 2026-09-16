import React, { useState } from 'react'
import {
    StyleSheet,
    View,
    Text,
    KeyboardAvoidingView,
    Platform,
} from 'react-native'
import AppInput from '../src/components/AppInput'
import AppButton from '../src/components/AppButton'

export default function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading] = useState(false)

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <View>
                <Text style={styles.title}>Criar Nova Conta</Text>
                <Text style={styles.subtitle}>
                    Preencha os dados para começar
                </Text>

                <AppInput
                    label="Email"
                    placeholder="seu@email.com"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />

                <AppInput
                    label="Senha"
                    secureTextEntry
                    placeholder="********"
                    value={password}
                    onChangeText={setPassword}
                />

                <AppInput
                    label="Confirmar senha"
                    secureTextEntry
                    placeholder="********"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />

                <AppButton
                    title="Criar conta"
                    loading={loading}
                />
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
        backgroundColor: '#f8f9fa',
    },
    title: {
        fontSize: 34,
        fontWeight: '900',
        color: '#2f3640',
        textAlign: 'center',
    },
    subtitle: {
        color: '#7f8c8d',
        textAlign: 'center',
        marginBottom: 32,
    },
})
