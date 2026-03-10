import { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { WelcomeScreen } from './components/quiz/WelcomeScreen';
import { QuestionScreen } from './components/quiz/QuestionScreen';
import { ResultsScreen } from './components/quiz/ResultsScreen';
import { Progress } from './components/ui/progress';
import type { QuizState, Question } from './types';
import quizDataRaw from './data/QuizModule3.json';

// Cast the imported raw data directly
const quizData: Question[] = quizDataRaw as Question[];
const LOCAL_STORAGE_KEY = 'quiz-app-state-v1';

function App() {
  const loadState = () => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load state', e);
    }
    return null;
  };

  const initialState = loadState();

  const [phase, setPhase] = useState<QuizState>(initialState?.phase || 'welcome');
  const [currentIndex, setCurrentIndex] = useState(initialState?.currentIndex || 0);
  const [score, setScore] = useState(initialState?.score || 0);
  const [answers, setAnswers] = useState<{ questionNo: number; selectedOption: string; isCorrect: boolean }[]>(initialState?.answers || []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ phase, currentIndex, score, answers }));
  }, [phase, currentIndex, score, answers]);

  const handleStart = () => {
    setCurrentIndex(0);
    setScore(0);
    setAnswers([]);
    setPhase('playing');
  };

  const handleRetry = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    handleStart();
  };

  const handleAnswerSubmit = (isCorrect: boolean, selectedOption: string) => {
    if (isCorrect) setScore((prev: number) => prev + 1);
    
    setAnswers((prev) => [
      ...prev,
      {
        questionNo: quizData[currentIndex].No,
        selectedOption,
        isCorrect,
      },
    ]);
  };

  const handleNextQuestion = () => {
    if (currentIndex < quizData.length - 1) {
      setCurrentIndex((prev: number) => prev + 1);
    } else {
      setPhase('results');
    }
  };

  const currentQuestion = quizData[currentIndex];
  // Calculate progress relative to current question being answered
  const progressPercentage = phase === 'playing' ? ((currentIndex) / quizData.length) * 100 : 0;

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Header />
      
      {phase === 'playing' && (
        <div className="w-full bg-muted/40 border-b">
          <Progress value={progressPercentage} className="rounded-none h-1.5" />
        </div>
      )}

      <main className="flex-1 w-full max-w-5xl mx-auto p-4 md:p-6 lg:p-8 flex flex-col justify-center">
        {phase === 'welcome' && (
          <WelcomeScreen 
            onStart={handleStart} 
            totalQuestions={quizData.length} 
          />
        )}
        
        {phase === 'playing' && currentQuestion && (
          <QuestionScreen
            question={currentQuestion}
            questionNumber={currentIndex + 1}
            totalQuestions={quizData.length}
            onAnswerSubmit={handleAnswerSubmit}
            onNextQuestion={handleNextQuestion}
          />
        )}

        {phase === 'results' && (
          <ResultsScreen
            score={score}
            totalQuestions={quizData.length}
            answers={answers}
            onRetry={handleRetry}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
