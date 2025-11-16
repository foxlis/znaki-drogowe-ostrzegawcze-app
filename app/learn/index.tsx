import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import signsData from '@/data/signs.json';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

interface Sign {
  id: string;
  name: string;
  category: string;
  image: string;
}

// Mapa obrazów znaków - React Native wymaga statycznych require()
const signImages: Record<string, any> = {
  '544px-PL_road_sign_A-1.svg.png': require('@/assets/signs/544px-PL_road_sign_A-1.svg.png'),
  '544px-PL_road_sign_A-2.svg.png': require('@/assets/signs/544px-PL_road_sign_A-2.svg.png'),
  '544px-PL_road_sign_A-3.svg.png': require('@/assets/signs/544px-PL_road_sign_A-3.svg.png'),
  '544px-PL_road_sign_A-4.svg.png': require('@/assets/signs/544px-PL_road_sign_A-4.svg.png'),
  '544px-PL_road_sign_A-5.svg.png': require('@/assets/signs/544px-PL_road_sign_A-5.svg.png'),
  '544px-PL_road_sign_A-6a.svg.png': require('@/assets/signs/544px-PL_road_sign_A-6a.svg.png'),
  '544px-PL_road_sign_A-6b.svg.png': require('@/assets/signs/544px-PL_road_sign_A-6b.svg.png'),
  '544px-PL_road_sign_A-6c.svg.png': require('@/assets/signs/544px-PL_road_sign_A-6c.svg.png'),
  '544px-PL_road_sign_A-6d.svg.png': require('@/assets/signs/544px-PL_road_sign_A-6d.svg.png'),
  '544px-PL_road_sign_A-6e.svg.png': require('@/assets/signs/544px-PL_road_sign_A-6e.svg.png'),
  '544px-PL_road_sign_A-7.svg.png': require('@/assets/signs/544px-PL_road_sign_A-7.svg.png'),
  '544px-PL_road_sign_A-8.svg.png': require('@/assets/signs/544px-PL_road_sign_A-8.svg.png'),
  '544px-PL_road_sign_A-9.svg.png': require('@/assets/signs/544px-PL_road_sign_A-9.svg.png'),
  '544px-PL_road_sign_A-10.svg.png': require('@/assets/signs/544px-PL_road_sign_A-10.svg.png'),
  '544px-PL_road_sign_A-11.svg.png': require('@/assets/signs/544px-PL_road_sign_A-11.svg.png'),
  '544px-PL_road_sign_A-11a.svg.png': require('@/assets/signs/544px-PL_road_sign_A-11a.svg.png'),
  '544px-PL_road_sign_A-12a.svg.png': require('@/assets/signs/544px-PL_road_sign_A-12a.svg.png'),
  '544px-PL_road_sign_A-12b.svg.png': require('@/assets/signs/544px-PL_road_sign_A-12b.svg.png'),
  '544px-PL_road_sign_A-12c.svg.png': require('@/assets/signs/544px-PL_road_sign_A-12c.svg.png'),
  '544px-PL_road_sign_A-13.svg.png': require('@/assets/signs/544px-PL_road_sign_A-13.svg.png'),
  '544px-PL_road_sign_A-14.svg.png': require('@/assets/signs/544px-PL_road_sign_A-14.svg.png'),
  '544px-PL_road_sign_A-15.svg.png': require('@/assets/signs/544px-PL_road_sign_A-15.svg.png'),
  '544px-PL_road_sign_A-16.svg.png': require('@/assets/signs/544px-PL_road_sign_A-16.svg.png'),
  '544px-PL_road_sign_A-17.svg.png': require('@/assets/signs/544px-PL_road_sign_A-17.svg.png'),
  '544px-PL_road_sign_A-18a.svg.png': require('@/assets/signs/544px-PL_road_sign_A-18a.svg.png'),
  '544px-PL_road_sign_A-18b.svg.png': require('@/assets/signs/544px-PL_road_sign_A-18b.svg.png'),
  '544px-PL_road_sign_A-19.svg.png': require('@/assets/signs/544px-PL_road_sign_A-19.svg.png'),
  '544px-PL_road_sign_A-20.svg.png': require('@/assets/signs/544px-PL_road_sign_A-20.svg.png'),
  '544px-PL_road_sign_A-21.svg.png': require('@/assets/signs/544px-PL_road_sign_A-21.svg.png'),
  '544px-PL_road_sign_A-22.svg.png': require('@/assets/signs/544px-PL_road_sign_A-22.svg.png'),
  '544px-PL_road_sign_A-23.svg.png': require('@/assets/signs/544px-PL_road_sign_A-23.svg.png'),
  '544px-PL_road_sign_A-24.svg.png': require('@/assets/signs/544px-PL_road_sign_A-24.svg.png'),
  '544px-PL_road_sign_A-25.svg.png': require('@/assets/signs/544px-PL_road_sign_A-25.svg.png'),
  '544px-PL_road_sign_A-26.svg.png': require('@/assets/signs/544px-PL_road_sign_A-26.svg.png'),
  '544px-PL_road_sign_A-27.svg.png': require('@/assets/signs/544px-PL_road_sign_A-27.svg.png'),
  '544px-PL_road_sign_A-28.svg.png': require('@/assets/signs/544px-PL_road_sign_A-28.svg.png'),
  '544px-PL_road_sign_A-29.svg.png': require('@/assets/signs/544px-PL_road_sign_A-29.svg.png'),
  '544px-PL_road_sign_A-30.svg.png': require('@/assets/signs/544px-PL_road_sign_A-30.svg.png'),
  '544px-PL_road_sign_A-31.svg.png': require('@/assets/signs/544px-PL_road_sign_A-31.svg.png'),
  '544px-PL_road_sign_A-32.svg.png': require('@/assets/signs/544px-PL_road_sign_A-32.svg.png'),
  '544px-PL_road_sign_A-33.svg.png': require('@/assets/signs/544px-PL_road_sign_A-33.svg.png'),
  '544px-PL_road_sign_A-34.svg.png': require('@/assets/signs/544px-PL_road_sign_A-34.svg.png'),
};

export default function LearnScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [signs, setSigns] = useState<Sign[]>([]);

  useEffect(() => {
    // Filtruj tylko znaki ostrzegawcze
    const warningSigns = signsData.signs.filter(sign => sign.category === 'ostrzegawcze');
    setSigns(warningSigns);
  }, []);

  const currentSign = signs[currentIndex];
  const totalSigns = signs.length;

  const goToNext = () => {
    if (currentIndex < totalSigns - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (signs.length === 0) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Ładowanie...</ThemedText>
      </ThemedView>
    );
  }

  const imageSource = currentSign ? signImages[currentSign.image] : null;

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>
          Nauka Znaków Drogowych
        </ThemedText>
        <ThemedText style={styles.counter}>
          {currentIndex + 1} / {totalSigns}
        </ThemedText>
      </ThemedView>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {currentSign && imageSource && (
          <>
            <ThemedView style={styles.signContainer}>
              <Image
                source={imageSource}
                style={styles.signImage}
                contentFit="contain"
              />
            </ThemedView>

            <ThemedView style={styles.infoContainer}>
              <ThemedText type="subtitle" style={styles.signId}>
                {currentSign.id}
              </ThemedText>
              <ThemedText type="defaultSemiBold" style={styles.signName}>
                {currentSign.name}
              </ThemedText>
              <ThemedText style={styles.category}>
                Kategoria: {currentSign.category}
              </ThemedText>
            </ThemedView>
          </>
        )}
      </ScrollView>

      <ThemedView style={styles.navigationContainer}>
        <TouchableOpacity
          style={[styles.navButton, currentIndex === 0 && styles.navButtonDisabled]}
          onPress={goToPrevious}
          disabled={currentIndex === 0}
        >
          <ThemedText type="defaultSemiBold" style={[
            styles.navButtonText,
            currentIndex === 0 && styles.navButtonTextDisabled
          ]}>
            Poprzedni
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, currentIndex === totalSigns - 1 && styles.navButtonDisabled]}
          onPress={goToNext}
          disabled={currentIndex === totalSigns - 1}
        >
          <ThemedText type="defaultSemiBold" style={[
            styles.navButtonText,
            currentIndex === totalSigns - 1 && styles.navButtonTextDisabled
          ]}>
            Następny
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push('/' as any)}
      >
        <ThemedText type="defaultSemiBold" style={styles.backButtonText}>
          Powrót
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    marginBottom: 10,
    textAlign: 'center',
  },
  counter: {
    fontSize: 16,
    opacity: 0.7,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
  },
  signContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 15,
    minHeight: 300,
  },
  signImage: {
    width: 250,
    height: 250,
  },
  infoContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  signId: {
    fontSize: 24,
    marginBottom: 10,
    opacity: 0.8,
  },
  signName: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  category: {
    fontSize: 14,
    opacity: 0.6,
    textTransform: 'capitalize',
  },
  navigationContainer: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 15,
  },
  navButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  navButtonDisabled: {
    backgroundColor: '#C7C7CC',
    opacity: 0.5,
  },
  navButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  navButtonTextDisabled: {
    color: '#8E8E93',
  },
  backButton: {
    backgroundColor: '#8E8E93',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#FFFFFF',
  },
});
