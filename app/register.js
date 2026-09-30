import React, { useState } from 'react'
import {
    StyleSheet,
    View,
    Text,
    KeyboardAvoidingView,
    Platform,
    Alert,
    TouchableOpacity,
} from 'react-native'
import { useRouter } from 'expo-router'

import AppInput from '../src/components/AppInput'
import AppButton from '../src/components/AppButton'
import { signUp } from '../src/service/authService'
import { COLORS } from '../src/constants/theme'

export default function Register() {
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleRegister() {
        // Verifica se todos os campos foram preenchidos
        if (
            !email.trim() ||
            !password.trim() ||
            !confirmPassword.trim()
        ) {
            Alert.alert(
                'Atenção',
                'Preencha todos os campos.'
            )
            return
        }

        // Verifica tamanho da senha
        if (password.length < 6) {
            Alert.alert(
                'Atenção',
                'A senha deve ter no mínimo 6 caracteres.'
            )
            return
        }

        // Verifica confirmação da senha
        if (password !== confirmPassword) {
            Alert.alert(
                'Atenção',
                'As senhas não conferem.'
            )
            return
        }

        try {
            setLoading(true)

            // Cria a conta
            const { error } = await signUp(
                email.trim(),
                password
            )

            // Se houver erro no cadastro
            if (error) {
                console.log(
                    'Erro no cadastro:',
                    error.message
                )

                Alert.alert(
                    'Erro no cadastro',
                    error.message
                )

                return
            }

            // Cadastro realizado com sucesso
            Alert.alert(
                'Sucesso',
                'Conta criada com sucesso. Faça o login para continuar.',
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            router.replace('/')
                        },
                    },
                ]
            )
        } catch (error) {
            console.log(
                'Erro inesperado:',
                error
            )

            Alert.alert(
                'Erro',
                'Ocorreu um erro inesperado ao criar a conta.'
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={
                Platform.OS === 'ios'
                    ? 'padding'
                    : undefined
            }
        >
            <View style={styles.content}>

                <Text style={styles.title}>
                    Criar Nova Conta
                </Text>

                <Text style={styles.subtitle}>
                    Preencha os dados para começar
                </Text>

                <AppInput
                    label="Email"
                    placeholder="seu@email.com"
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />

                <AppInput
                    label="Senha"
                    placeholder="********"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                <AppInput
                    label="Confirmar senha"
                    placeholder="********"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />

                <AppButton
                    title="Criar conta"
                    loading={loading}
                    onPress={handleRegister}
                />

                <TouchableOpacity
                    style={styles.loginLink}
                    onPress={() => router.replace('/')}
                    disabled={loading}
                >
                    <Text style={styles.loginText}>
                        Já tem uma conta? <Text style={styles.loginTextStrong}>Entrar</Text>
                    </Text>
                </TouchableOpacity>

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

    content: {
        width: '100%',
    },

    title: {
        fontSize: 34,
        fontWeight: '900',
        color: '#2f3640',
        textAlign: 'center',
        marginBottom: 8,
    },

    subtitle: {
        color: '#7f8c8d',
        textAlign: 'center',
        marginBottom: 32,
        fontSize: 15,
    },

    loginLink: {
        alignItems: 'center',
        marginTop: 20,
        padding: 8,
    },

    loginText: {
        color: '#7f8c8d',
        fontSize: 15,
    },

    loginTextStrong: {
        color: COLORS.primary,
        fontWeight: '700',
    },
})
