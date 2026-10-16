
export const categories = [
  { id: "all", name: "Mixed Challenge", icon: "🎯" },
  { id: "science", name: "Science", icon: "🔬" },
  { id: "technology", name: "Technology", icon: "💻" },
  { id: "geography", name: "Geography", icon: "🌍" },
  { id: "logic", name: "Logic & Numbers", icon: "🧠" },
];

export const questions = [
  {
    id: 1,
    category: "science",
    difficulty: "Easy",
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Mercury"],
    answer: 1,
    explanation: "Mars looks reddish because its surface contains iron oxide."
  },
  {
    id: 2,
    category: "technology",
    difficulty: "Easy",
    question: "What does CPU stand for?",
    options: [
      "Central Processing Unit",
      "Computer Personal Unit",
      "Central Program Utility",
      "Core Processing Utility"
    ],
    answer: 0,
    explanation: "The CPU executes instructions and processes data in a computer."
  },
  {
    id: 3,
    category: "geography",
    difficulty: "Easy",
    question: "What is the largest ocean on Earth?",
    options: [
      "Atlantic Ocean",
      "Indian Ocean",
      "Pacific Ocean",
      "Arctic Ocean"
    ],
    answer: 2,
    explanation: "The Pacific Ocean is the largest and deepest ocean on Earth."
  },
  {
    id: 4,
    category: "logic",
    difficulty: "Easy",
    question: "What number comes next: 2, 4, 6, 8, __?",
    options: ["9", "10", "12", "14"],
    answer: 1,
    explanation: "Each number increases by 2, so the next number is 10."
  },
  {
    id: 5,
    category: "science",
    difficulty: "Medium",
    question: "Which gas do plants primarily absorb during photosynthesis?",
    options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
    answer: 2,
    explanation: "Plants use carbon dioxide, water, and light to produce sugars."
  },
  {
    id: 6,
    category: "technology",
    difficulty: "Medium",
    question: "Which language is primarily used to structure web pages?",
    options: ["HTML", "Python", "SQL", "C++"],
    answer: 0,
    explanation: "HTML defines the structure and content of web pages."
  },
  {
    id: 7,
    category: "geography",
    difficulty: "Medium",
    question: "Which is the capital of Japan?",
    options: ["Kyoto", "Osaka", "Tokyo", "Nagoya"],
    answer: 2,
    explanation: "Tokyo is the capital of Japan."
  },
  {
    id: 8,
    category: "logic",
    difficulty: "Medium",
    question: "If 5 machines make 5 items in 5 minutes, how long do 100 machines take to make 100 items?",
    options: ["5 minutes", "20 minutes", "100 minutes", "1 minute"],
    answer: 0,
    explanation: "Each machine makes one item in 5 minutes, so 100 machines make 100 items in 5 minutes."
  },
  {
    id: 9,
    category: "science",
    difficulty: "Hard",
    question: "What is the approximate speed of light in a vacuum?",
    options: ["30,000 km/s", "150,000 km/s", "300,000 km/s", "500,000 km/s"],
    answer: 2,
    explanation: "Light travels at approximately 300,000 kilometres per second in a vacuum."
  },
  {
    id: 10,
    category: "technology",
    difficulty: "Hard",
    question: "Which data structure follows LIFO order?",
    options: ["Queue", "Stack", "Linked list", "Graph"],
    answer: 1,
    explanation: "A stack follows Last In, First Out (LIFO)."
  },
  {
    id: 11,
    category: "geography",
    difficulty: "Hard",
    question: "Which country has the largest land area?",
    options: ["Canada", "China", "United States", "Russia"],
    answer: 3,
    explanation: "Russia is the world's largest country by land area."
  },
  {
    id: 12,
    category: "logic",
    difficulty: "Hard",
    question: "What is the next prime number after 13?",
    options: ["14", "15", "17", "19"],
    answer: 2,
    explanation: "17 is prime because its only positive divisors are 1 and 17."
  },
];
