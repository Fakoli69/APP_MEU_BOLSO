import React, { useState } from 'react'
import { router } from 'expo-router'
import { StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import AppInput from '../src/components/AppInput'
import AppButton from '../src/components/AppButton'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading] = useState(false)

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <View>
                <Text style={styles.title}>Meu Bolso</Text>
                <Text style={styles.subtitle}>Controle suas finanças.</Text>
                <AppInput label='Email' placeholder='seu@email.com' autoCapitalize='none' keyboardType='email-address' value={email} onChangeText={setEmail} />
                <AppInput label='Senha' secureTextEntry placeholder='********' value={password} onChangeText={setPassword} />
                <AppButton title='Entrar' loading={loading} />
                <TouchableOpacity onPress={() => router.push('/register')}>
                    <Text style={styles.link}>Criar nova conta</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#f8f9fa' },
    title: { fontSize: 34, fontWeight: '900', color: '#2f3640', textAlign: 'center' },
    subtitle: { color: '#7f8c8d', textAlign: 'center', marginBottom: 32 },
    link: { color: '#008f72', textAlign: 'center', marginTop: 20, fontWeight: '700' },
})
