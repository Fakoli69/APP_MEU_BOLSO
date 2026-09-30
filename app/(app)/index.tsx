import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import AppButton from '@/src/components/AppButton';
import { signOut } from '@/src/service/authService';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu Bolso</Text>
      <Text style={styles.message}>Login realizado com sucesso!</Text>
      <Text style={styles.description}>Esta é a página inicial temporária.</Text>
      <AppButton
        title="Sair"
        onPress={async () => {
          await signOut();
          router.replace('/');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 16,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#2f3640',
  },
  message: {
    fontSize: 20,
    fontWeight: '700',
    color: '#00b894',
    textAlign: 'center',
  },
  description: {
    color: '#7f8c8d',
  },
});
