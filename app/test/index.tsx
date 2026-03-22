import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import signsData from "@/data/signs.json";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";

interface Sign {
  id: string;
  name: string;
  category: string;
  image: string;
}

const signImages: Record<string, any> = {
  "544px-PL_road_sign_A-1.svg.png": require("@/assets/signs/warning/544px-PL_road_sign_A-1.svg.png"),
  "544px-PL_road_sign_A-2.svg.png": require("@/assets/signs/warning/544px-PL_road_sign_A-2.svg.png"),
  "544px-PL_road_sign_A-3.svg.png": require("@/assets/signs/warning/544px-PL_road_sign_A-3.svg.png"),
  "544px-PL_road_sign_A-4.svg.png": require("@/assets/signs/warning/544px-PL_road_sign_A-4.svg.png"),
  "544px-PL_road_sign_A-5.svg.png": require("@/assets/signs/warning/544px-PL_road_sign_A-5.svg.png"),
  "544px-PL_road_sign_A-6a.svg.png": require("@/assets/signs/warning/544px-PL_road_sign_A-6a.svg.png"),
  "544px-PL_road_sign_A-6b.svg.png": require("@/assets/signs/warning/544px-PL_road_sign_A-6b.svg.png"),
  "544px-PL_road_sign_A-6c.svg.png": require("@/assets/signs/warning/544px-PL_road_sign_A-6c.svg.png"),
  "544px-PL_road_sign_A-6d.svg.png": require("@/assets/signs/warning/544px-PL_road_sign_A-6d.svg.png"),
  "544px-PL_road_sign_A-6e.svg.png": require("@/assets/signs/warning/544px-PL_road_sign_A-6e.svg.png"),
  "544px-PL_road_sign_A-7.svg.png": require("@/assets/signs/warning/544px-PL_road_sign_A-7.svg.png"),
  "544px-PL_road_sign_A-8.svg.png": require("@/assets/signs/warning/544px-PL_road_sign_A-8.svg.png"),
  "544px-PL_road_sign_A-9.svg.png": require("@/assets/signs/warning/544px-PL_road_sign_A-9.svg.png"),
  "544px-PL_road_sign_A-10.svg.png": require("@/assets/signs/warning/544px-PL_road_sign_A-10.svg.png"),
  "544px-PL_road_sign_A-11.svg.png": require("@/assets/signs/warning/544px-PL_road_sign_A-11.svg.png"),
  "544px-PL_road_sign_A-11a.svg.png": require("@/assets/signs/warning/544px-PL_road_sign_A-11a.svg.png"),
  "544px-PL_road_sign_A-12a.svg.png": require("@/assets/signs/warning/544px-PL_road_sign_A-12a.svg.png"),
  "544px-PL_road_sign_A-12b.svg.png": require("@/assets/signs/warning/544px-PL_road_sign_A-12b.svg.png"),
  "544px-PL_road_sign_A-12c.svg.png": require("@/assets/signs/warning/544px-PL_road_sign_A-12c.svg.png"),
  "544px-PL_road_sign_A-13.svg.png": require("@/assets/signs/warning/544px-PL_road_sign_A-13.svg.png"),
  "544px-PL_road_sign_A-14.svg.png": require("@/assets/signs/warning/544px-PL_road_sign_A-14.svg.png"),
  "544px-PL_road_sign_A-15.svg.png": require("@/assets/signs/warning/544px-PL_road_sign_A-15.svg.png"),
  "544px-PL_road_sign_A-16.svg.png": require("@/assets/signs/warning/544px-PL_road_sign_A-16.svg.png"),
  "544px-PL_road_sign_A-17.svg.png": require("@/assets/signs/warning/544px-PL_road_sign_A-17.svg.png"),
  "544px-PL_road_sign_A-18a.svg.png": require("@/assets/signs/warning/544px-PL_road_sign_A-18a.svg.png"),
  "544px-PL_road_sign_A-18b.svg.png": require("@/assets/signs/warning/544px-PL_road_sign_A-18b.svg.png"),
  "544px-PL_road_sign_A-19.svg.png": require("@/assets/signs/warning/544px-PL_road_sign_A-19.svg.png"),
  "544px-PL_road_sign_A-20.svg.png": require("@/assets/signs/warning/544px-PL_road_sign_A-20.svg.png"),
  "544px-PL_road_sign_A-21.svg.png": require("@/assets/signs/warning/544px-PL_road_sign_A-21.svg.png"),
  "544px-PL_road_sign_A-22.svg.png": require("@/assets/signs/warning/544px-PL_road_sign_A-22.svg.png"),
  "544px-PL_road_sign_A-23.svg.png": require("@/assets/signs/warning/544px-PL_road_sign_A-23.svg.png"),
  "544px-PL_road_sign_A-24.svg.png": require("@/assets/signs/warning/544px-PL_road_sign_A-24.svg.png"),
  "544px-PL_road_sign_A-25.svg.png": require("@/assets/signs/warning/544px-PL_road_sign_A-25.svg.png"),
  "544px-PL_road_sign_A-26.svg.png": require("@/assets/signs/warning/544px-PL_road_sign_A-26.svg.png"),
  "544px-PL_road_sign_A-27.svg.png": require("@/assets/signs/warning/544px-PL_road_sign_A-27.svg.png"),
  "544px-PL_road_sign_A-28.svg.png": require("@/assets/signs/warning/544px-PL_road_sign_A-28.svg.png"),
  "544px-PL_road_sign_A-29.svg.png": require("@/assets/signs/warning/544px-PL_road_sign_A-29.svg.png"),
  "544px-PL_road_sign_A-30.svg.png": require("@/assets/signs/warning/544px-PL_road_sign_A-30.svg.png"),
  "544px-PL_road_sign_A-31.svg.png": require("@/assets/signs/warning/544px-PL_road_sign_A-31.svg.png"),
  "544px-PL_road_sign_A-32.svg.png": require("@/assets/signs/warning/544px-PL_road_sign_A-32.svg.png"),
  "544px-PL_road_sign_A-33.svg.png": require("@/assets/signs/warning/544px-PL_road_sign_A-33.svg.png"),
  "544px-PL_road_sign_A-34.svg.png": require("@/assets/signs/warning/544px-PL_road_sign_A-34.svg.png"),
  "B-1.png": require("@/assets/signs/prohibition/B-1.png"),
  "B-2.png": require("@/assets/signs/prohibition/B-2.png"),
  "B-3.png": require("@/assets/signs/prohibition/B-3.png"),
  "B-3a.png": require("@/assets/signs/prohibition/B-3a.png"),
  "B-4.png": require("@/assets/signs/prohibition/B-4.png"),
  "B-5.png": require("@/assets/signs/prohibition/B-5.png"),
  "B-6.png": require("@/assets/signs/prohibition/B-6.png"),
  "B-7.png": require("@/assets/signs/prohibition/B-7.png"),
  "B-8.png": require("@/assets/signs/prohibition/B-8.png"),
  "B-9.png": require("@/assets/signs/prohibition/B-9.png"),
  "B-10.png": require("@/assets/signs/prohibition/B-10.png"),
  "B-11.png": require("@/assets/signs/prohibition/B-11.png"),
  "B-12.png": require("@/assets/signs/prohibition/B-12.png"),
  "B-13.png": require("@/assets/signs/prohibition/B-13.png"),
  "B-13a.png": require("@/assets/signs/prohibition/B-13a.png"),
  "B-14.png": require("@/assets/signs/prohibition/B-14.png"),
  "B-15.png": require("@/assets/signs/prohibition/B-15.png"),
  "B-16.png": require("@/assets/signs/prohibition/B-16.png"),
  "B-17.png": require("@/assets/signs/prohibition/B-17.png"),
  "B-18.png": require("@/assets/signs/prohibition/B-18.png"),
  "B-19.png": require("@/assets/signs/prohibition/B-19.png"),
  "B-20.png": require("@/assets/signs/prohibition/B-20.png"),
  "B-21.png": require("@/assets/signs/prohibition/B-21.png"),
  "B-22.png": require("@/assets/signs/prohibition/B-22.png"),
  "B-23.png": require("@/assets/signs/prohibition/B-23.png"),
  "B-24.png": require("@/assets/signs/prohibition/B-24.png"),
  "B-25.png": require("@/assets/signs/prohibition/B-25.png"),
  "B-26.png": require("@/assets/signs/prohibition/B-26.png"),
  "B-27.png": require("@/assets/signs/prohibition/B-27.png"),
  "B-28.png": require("@/assets/signs/prohibition/B-28.png"),
  "B-29.png": require("@/assets/signs/prohibition/B-29.png"),
  "B-30.png": require("@/assets/signs/prohibition/B-30.png"),
  "B-31.png": require("@/assets/signs/prohibition/B-31.png"),
  "B-32.png": require("@/assets/signs/prohibition/B-32.png"),
  "B-33.png": require("@/assets/signs/prohibition/B-33.png"),
  "B-34.png": require("@/assets/signs/prohibition/B-34.png"),
  "B-35.png": require("@/assets/signs/prohibition/B-35.png"),
  "B-36.png": require("@/assets/signs/prohibition/B-36.png"),
  "B-37.png": require("@/assets/signs/prohibition/B-37.png"),
  "B-38.png": require("@/assets/signs/prohibition/B-38.png"),
  "B-39.png": require("@/assets/signs/prohibition/B-39.png"),
  "B-40.png": require("@/assets/signs/prohibition/B-40.png"),
  "B-41.png": require("@/assets/signs/prohibition/B-41.png"),
  "B-42.png": require("@/assets/signs/prohibition/B-42.png"),
  "B-43.png": require("@/assets/signs/prohibition/B-43.png"),
  "B-44.png": require("@/assets/signs/prohibition/B-44.png"),
};

export default function TestScreen() {
  const router = useRouter();
  const [signs, setSigns] = useState<Sign[]>([]);
  const [currentSign, setCurrentSign] = useState<Sign | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [usedSigns, setUsedSigns] = useState<Set<number>>(new Set());

  useEffect(() => {
    const warningSigns = signsData.signs.filter(
      (sign) => sign.category === "ostrzegawcze" || sign.category === "zakaz",
    );
    setSigns(warningSigns);
    if (warningSigns.length > 0) {
      loadNewQuestion(warningSigns);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadNewQuestion = (availableSigns: Sign[]) => {
    // Znajdź znaki, które jeszcze nie były użyte
    const unusedIndices = availableSigns
      .map((_, index) => index)
      .filter((index) => !usedSigns.has(index));

    // Jeśli wszystkie znaki były użyte, zresetuj
    if (unusedIndices.length === 0) {
      setUsedSigns(new Set());
      unusedIndices.push(...availableSigns.map((_, index) => index));
    }

    // Wybierz losowy znak z nieużywanych
    const randomIndex =
      unusedIndices[Math.floor(Math.random() * unusedIndices.length)];
    const sign = availableSigns[randomIndex];

    setCurrentSign(sign);
    setUsedSigns((prev) => new Set([...prev, randomIndex]));

    // Generuj 4 odpowiedzi (1 poprawna + 3 losowe)
    const wrongAnswers = availableSigns
      .filter((s) => s.id !== sign.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((s) => s.name);

    const allAnswers = [sign.name, ...wrongAnswers].sort(
      () => Math.random() - 0.5,
    );
    setAnswers(allAnswers);
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  const handleAnswerSelect = (answer: string) => {
    if (selectedAnswer !== null) return; // Już wybrano odpowiedź

    setSelectedAnswer(answer);
    const correct = answer === currentSign?.name;
    setIsCorrect(correct);
  };

  const handleNext = () => {
    if (isCorrect && currentSign) {
      loadNewQuestion(signs);
    }
  };

  if (signs.length === 0 || !currentSign) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Ładowanie...</ThemedText>
      </ThemedView>
    );
  }

  const imageSource = signImages[currentSign.image];

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.subtitle}>
          Wybierz poprawną nazwę znaku
        </ThemedText>
      </ThemedView>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ThemedView style={styles.signContainer}>
          <Image
            source={imageSource}
            style={styles.signImage}
            contentFit="contain"
          />
        </ThemedView>

        <ThemedView style={styles.answersContainer}>
          {answers.map((answer, index) => {
            const isSelected = selectedAnswer === answer;
            const isAnswerCorrect = answer === currentSign.name;
            const buttonStyle = isSelected
              ? isAnswerCorrect
                ? [styles.answerButton, styles.answerButtonCorrect]
                : [styles.answerButton, styles.answerButtonWrong]
              : styles.answerButton;
            const textStyle = isSelected
              ? isAnswerCorrect
                ? [styles.answerText, styles.answerTextCorrect]
                : [styles.answerText, styles.answerTextWrong]
              : styles.answerText;

            return (
              <TouchableOpacity
                key={index}
                style={buttonStyle}
                onPress={() => handleAnswerSelect(answer)}
                disabled={selectedAnswer !== null}
              >
                <ThemedText type="defaultSemiBold" style={textStyle}>
                  {answer}
                </ThemedText>
              </TouchableOpacity>
            );
          })}
        </ThemedView>

        {isCorrect !== null && (
          <ThemedView style={styles.feedbackContainer}>
            <ThemedText
              type="defaultSemiBold"
              style={[
                styles.feedbackText,
                isCorrect ? styles.feedbackCorrect : styles.feedbackWrong,
              ]}
            >
              {isCorrect ? "✓ Poprawna odpowiedź!" : "✗ Niepoprawna odpowiedź"}
            </ThemedText>
            {isCorrect && (
              <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <ThemedText
                  type="defaultSemiBold"
                  style={styles.nextButtonText}
                >
                  Następne pytanie
                </ThemedText>
              </TouchableOpacity>
            )}
          </ThemedView>
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push("/" as any)}
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
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
  },
  signContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    borderRadius: 15,
    minHeight: 150,
  },
  signImage: {
    width: 150,
    height: 150,
  },
  answersContainer: {
    width: "100%",
    gap: 10,
    marginBottom: 5,
  },
  answerButton: {
    backgroundColor: "#E8E8E8",
    padding: 2,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#CCCCCC",
  },
  answerButtonCorrect: {
    backgroundColor: "#C3E6CB",
    borderColor: "#28A745",
  },
  answerButtonWrong: {
    backgroundColor: "#F5C6CB",
    borderColor: "#DC3545",
  },
  answerText: {
    fontSize: 14,
    textAlign: "center",
    color: "#1A1A1A",
    fontWeight: "500",
  },
  answerTextCorrect: {
    color: "#0F5132",
    fontWeight: "700",
  },
  answerTextWrong: {
    color: "#842029",
    fontWeight: "700",
  },
  feedbackContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  feedbackText: {
    fontSize: 14,
    marginBottom: 10,
  },
  feedbackCorrect: {
    color: "#28A745",
  },
  feedbackWrong: {
    color: "#DC3545",
  },
  nextButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    minWidth: 200,
    alignItems: "center",
  },
  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  backButton: {
    backgroundColor: "#8E8E93",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  backButtonText: {
    color: "#FFFFFF",
  },
});
