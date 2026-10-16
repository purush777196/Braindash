
import { useEffect, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  CircleHelp,
  Clock3,
  RotateCcw,
  Trophy,
  XCircle,
  Zap,
} from "lucide-react";
import { categories, questions } from "./questions";
import "./App.css";

export default function App() {
  const [category, setCategory] = useState("all");
  const [difficulty, setDifficulty] = useState("All");
  const [screen, setScreen] = useState("home");
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [name, setName] = useState(
    localStorage.getItem("braindash-name") || "Player"
  );

  const current = quizQuestions[index];
  const best = Number(localStorage.getItem("braindash-best") || 0);

  function startQuiz() {
    let filtered = questions.filter((q) => {
      const categoryMatch =
        category === "all" || q.category === category;
      const difficultyMatch =
        difficulty === "All" || q.difficulty === difficulty;

      return categoryMatch && difficultyMatch;
    });

    filtered = [...filtered].sort(() => Math.random() - 0.5);
    filtered = filtered.slice(0, 10);

    if (filtered.length === 0) return;

    setQuizQuestions(filtered);
    setIndex(0);
    setSelected(null);
    setAnswers([]);
    setScore(0);
    setTimeLeft(20);
    setScreen("quiz");
  }

  function chooseAnswer(optionIndex) {
    if (selected !== null) return;

    setSelected(optionIndex);

    const correct = optionIndex === current.answer;
    const earned = correct ? 100 + timeLeft * 5 : 0;

    setAnswers((previous) => [
      ...previous,
      {
        question: current.question,
        chosen: optionIndex,
        correctAnswer: current.answer,
        options: current.options,
        explanation: current.explanation,
        correct,
      },
    ]);

    setScore((previous) => previous + earned);
  }

  function finishQuiz(finalScore) {
    const updatedBest = Math.max(best, finalScore);

    localStorage.setItem("braindash-best", String(updatedBest));
    setScreen("result");
  }

  function nextQuestion() {
    if (index + 1 < quizQuestions.length) {
      setIndex((previous) => previous + 1);
      setSelected(null);
      setTimeLeft(20);
    } else {
      finishQuiz(score);
    }
  }

  useEffect(() => {
    if (screen !== "quiz" || selected !== null) return;

    const timer = setInterval(() => {
      setTimeLeft((previous) => {
        if (previous <= 1) {
          clearInterval(timer);
          return 0;
        }
        return previous - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [screen, index, selected]);

  useEffect(() => {
    if (screen === "quiz" && timeLeft === 0 && selected === null) {
      chooseAnswer(-1);
    }
  }, [timeLeft, screen, selected]);

  const correctCount = answers.filter((a) => a.correct).length;
  const accuracy = answers.length
    ? Math.round((correctCount / answers.length) * 100)
    : 0;

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={() => setScreen("home")}>
          <span className="brand-icon"><Zap size={23} /></span>
          Brain<span>Dash</span>
        </button>

        <div className="player">
          <span className="avatar">👤</span>
          <input
            aria-label="Player name"
            value={name}
            maxLength={20}
            onChange={(e) => {
              setName(e.target.value);
              localStorage.setItem("braindash-name", e.target.value);
            }}
          />
        </div>
      </header>

      <main className="main-content">
        {screen === "home" && (
          <>
            <section className="hero">
              <div className="eyebrow"><Zap size={15} /> THINK FAST. LEARN MORE.</div>
              <h1>Your brain.<br /><span>Your next level.</span></h1>
              <p>
                Challenge yourself with quick quizzes, discover new things,
                and build your knowledge one question at a time.
              </p>
              <div className="hero-stats">
                <div><strong>{questions.length}+</strong><small>Questions</small></div>
                <div><strong>4</strong><small>Categories</small></div>
                <div><strong>20s</strong><small>Per question</small></div>
              </div>
            </section>

            <section className="setup-panel">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">YOUR NEXT CHALLENGE</span>
                  <h2>Choose your quiz</h2>
                </div>
                <span className="pill"><CircleHelp size={15} /> Test your skills</span>
              </div>

              <div className="category-grid">
                {categories.map((item) => (
                  <button
                    key={item.id}
                    className={`category-card ${category === item.id ? "active" : ""}`}
                    onClick={() => setCategory(item.id)}
                  >
                    <span className="category-emoji">{item.icon}</span>
                    <strong>{item.name}</strong>
                    <span className="category-arrow"><ArrowRight size={16} /></span>
                  </button>
                ))}
              </div>

              <div className="difficulty-row">
                <div>
                  <h3>Difficulty level</h3>
                  <p>Choose how challenging you want it to be.</p>
                </div>
                <div className="difficulty-options">
                  {["All", "Easy", "Medium", "Hard"].map((level) => (
                    <button
                      key={level}
                      onClick={() => setDifficulty(level)}
                      className={difficulty === level ? "selected" : ""}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <button className="primary-button" onClick={startQuiz}>
                Start the challenge <ArrowRight size={19} />
              </button>

              <p className="setup-note">No pressure. Just you versus the questions.</p>
            </section>
          </>
        )}

        {screen === "quiz" && current && (
          <section className="quiz-panel">
            <div className="quiz-top">
              <button className="text-button" onClick={() => setScreen("home")}>
                ← Exit quiz
              </button>
              <span className="pill">Question {index + 1} of {quizQuestions.length}</span>
              <span className="score-label"><Zap size={16} /> {score} XP</span>
            </div>

            <div className="progress-track">
              <div style={{ width: `${((index + 1) / quizQuestions.length) * 100}%` }} />
            </div>

            <div className="timer-row">
              <span>QUESTION {String(index + 1).padStart(2, "0")}</span>
              <span className={timeLeft <= 5 ? "timer danger" : "timer"}>
                <Clock3 size={17} /> 00:{String(timeLeft).padStart(2, "0")}
              </span>
            </div>

            <h2 className="question-title">{current.question}</h2>

            <div className="answer-grid">
              {current.options.map((option, optionIndex) => {
                let stateClass = "";
                if (selected !== null && optionIndex === current.answer) {
                  stateClass = "correct";
                } else if (selected === optionIndex) {
                  stateClass = "wrong";
                }

                return (
                  <button
                    key={option}
                    disabled={selected !== null}
                    className={`answer-option ${stateClass}`}
                    onClick={() => chooseAnswer(optionIndex)}
                  >
                    <span className="option-letter">
                      {String.fromCharCode(65 + optionIndex)}
                    </span>
                    <span>{option}</span>
                    {selected !== null && optionIndex === current.answer &&
                      <CheckCircle2 className="answer-status" size={20} />}
                    {selected === optionIndex && optionIndex !== current.answer &&
                      <XCircle className="answer-status" size={20} />}
                  </button>
                );
              })}
            </div>

            {selected !== null && (
              <div className="feedback">
                <strong>
                  {selected === current.answer ? "Correct! Nice work." :
                    selected === -1 ? "Time's up!" : "Not quite this time."}
                </strong>
                <p>{current.explanation}</p>
                <button className="primary-button" onClick={nextQuestion}>
                  {index + 1 === quizQuestions.length ? "See results" : "Next question"}
                  <ArrowRight size={18} />
                </button>
              </div>
            )}
          </section>
        )}

        {screen === "result" && (
          <section className="result-panel">
            <div className="result-icon"><Trophy size={38} /></div>
            <span className="eyebrow">CHALLENGE COMPLETED</span>
            <h1>Well played, {name.trim() || "Player"}!</h1>
            <p>Every question is another opportunity to learn.</p>

            <div className="result-score">
              <span>YOUR SCORE</span>
              <strong>{score.toLocaleString()}</strong>
              <small>XP POINTS</small>
            </div>

            <div className="result-stats">
              <div><strong>{correctCount}/{answers.length}</strong><span>Correct answers</span></div>
              <div><strong>{accuracy}%</strong><span>Accuracy</span></div>
              <div><strong>{Math.max(best, score).toLocaleString()}</strong><span>Personal best</span></div>
            </div>

            <h3>Answer review</h3>
            <div className="review-list">
              {answers.map((answer, i) => (
                <div className="review-item" key={i}>
                  <span className={answer.correct ? "review-check good" : "review-check bad"}>
                    {answer.correct ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
                  </span>
                  <div>
                    <strong>{answer.question}</strong>
                    <p>Your answer: {answer.chosen === -1 ? "Time ran out" : answer.options[answer.chosen]}</p>
                    <small>Correct answer: {answer.options[answer.correctAnswer]}</small>
                    <p className="explanation">{answer.explanation}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="primary-button" onClick={() => setScreen("home")}>
              <RotateCcw size={18} /> Play again
            </button>
          </section>
        )}
      </main>

      <footer>
        <span>⚡ BrainDash</span>
        <span>Keep learning. Keep growing.</span>
      </footer>
    </div>
  );
}
