import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import jsPDF from "jspdf";

const beginnerLevels = ["Beginner-Beginner", "Beginner-Intermediate", "Beginner-Advanced"];
const levels = ["Beginner", "Intermediate", "Advanced"];
const API_BASE = import.meta.env.VITE_BACKEND_URL;



const scratchConcepts = {
  // Beginner categories
  "Data Types": {
    "Beginner-Beginner": {
      skill: "Number",
      tooltip: "Uses variables for name/score",
    },
      "Beginner-Intermediate": {
        skill: "Boolean",
        tooltip: "Uses numbers and text in logic",
      },
        "Beginner-Advanced": {
          skill: "Lists",
          tooltip: "Multiple variables in interactions",
  }
},
  "Operators": {
    "Beginner-Beginner": {
      skill: "Random, ><=",
      tooltip: "Uses + - * /",
    },
      "Beginner-Intermediate": {
        skill: "And, Or, Not, +-/*",
        tooltip: "Uses > < = and/or",
      },
        "Beginner-Advanced": {
          skill: "Text Operators",
          tooltip: "Nested logic with operators",
  }
},
  "Control": {
    "Beginner-Beginner": {
      skill: "Forever, Wait Blocks",
      tooltip: "Uses loops (forever, repeat)",
    },
      "Beginner-Intermediate": {
        skill: "Repeat Until, Wait Until",
        tooltip: "Uses wait/repeat until",
      },
        "Beginner-Advanced": {
          skill: "Nested Loops",
          tooltip: "Nested loops for timing/logic",
  }
},
  "Conditionals": {
    "Beginner-Beginner": {
      skill: "If/Then",
      tooltip: "Uses if block",
    },
      "Beginner-Intermediate": {
        skill: "If/Then/Else",
        tooltip: "Uses if-else block",
      },
        "Beginner-Advanced": {
          skill: "Nested If/Then",
          tooltip: "Multiple/nested if logic",
  }
},
  "Sprite Movement": {
    "Beginner-Beginner": {
      skill: "Arrow Keys, x/y, Gliding",
      tooltip: "Arrow Keys, x/y, Gliding",
    },
      "Beginner-Intermediate": {
        skill: "Basic Gravity, x/y Wrap Around",
        tooltip: "Basic Gravity, x/y Wrap Around",
      },
        "Beginner-Advanced": {
          skill: "Advanced Gravity, Velocity, Friction",
          tooltip: "Advanced Gravity, Velocity, Friction",
  }
},
  "Input/Output": {
    "Beginner-Beginner": {
      skill: "Say, Key Press",
      tooltip: "Say block or key press",
    },
      "Beginner-Intermediate": {
        skill: "Ask & Answer, Mouse Input",
        tooltip: "Ask/answer, mouse input",
      },
        "Beginner-Advanced": {
          skill: "Dynamic responses to input",
          tooltip: "Dynamic responses to input",
  }
},
  "Backdrops": {
    "Beginner-Beginner": {
      skill: "Switch Backdrop",
      tooltip: "Changes backdrops manually",
    },
      "Beginner-Intermediate": {
        skill: "Backdrop with events",
        tooltip: "Backdrop change with events",
      },
        "Beginner-Advanced": {
          skill: "Track Game States",
          tooltip: "Backdrop reflects game state",
  }
},
  "Sensing": {
    "Beginner-Beginner": {
      skill: "Rouching, Mouse Down",
      tooltip: "Touching, Mouse down",
    },
      "Beginner-Intermediate": {
        skill: "Compare Values",
        tooltip: "Sensing in conditionals",
      },
        "Beginner-Advanced": {
          skill: "Dynamic Behaviors",
          tooltip: "Dynamic Behaviors",
  }
},
  "Clones": {
    "Beginner-Beginner": {
      skill: "Create Clone",
      tooltip: "Creates clones",
    },
      "Beginner-Intermediate": {
        skill: "Animate or Multiply",
        tooltip: "Uses clones for projectiles, (delete)",
      },
        "Beginner-Advanced": {
          skill: "Uses clones for projectiles, (delete)",
          tooltip: "Control Clones with Logic, delete clone",
  }
},
  "Functions": {
    "Beginner-Beginner": {
      skill: "Simple Custom Block",
      tooltip: "Simple My Block",
    },
      "Beginner-Intermediate": {
        skill: "Block with Input",
        tooltip: "My Block with input",
      },
        "Beginner-Advanced": {
          skill: "Reusable Logic with Multiple Inputs",
          tooltip: "Reusable logic with Multiple Inputs",
  }
},
  "Events": {
    "Beginner-Beginner": {
      skill: "When flag clicked",
      tooltip: "When flag clicked",
    },
      "Beginner-Intermediate": {
        skill: "Broadcast/Receive",
        tooltip: "Broadcast/receive",
      },
        "Beginner-Advanced": {
          skill: "Coordinate Muultiple Sprites",
          tooltip: "Multi-sprite coordination",
  }
},
  "Costumes": {
    "Beginner-Beginner": {
      skill: "Manual switch",
      tooltip: "Manual costume change",
    },
      "Beginner-Intermediate": {
        skill: "Costume animation",
        tooltip: "Animates with costumes",
      },
        "Beginner-Advanced": {
          skill: "Conditional switch",
          tooltip: "Conditional costume switch",
  }
},
  "Sound": {
    "Beginner-Beginner": {
      skill: "Play sound",
      tooltip: "Plays sound",
    },
      "Beginner-Intermediate": {
        skill: "Feedback or Storytelling",
        tooltip: "Sound for feedback/story",
      },
        "Beginner-Advanced": {
          skill: "Strategic use",
          tooltip: "Intentional sound design",
  }
},
  "Lists": {
    "Beginner-Beginner": {
      skill: "-",
      tooltip: "",
    },
      "Beginner-Intermediate": {
        skill: "Add/Remove Items",
        tooltip: "Creates list, Adds/removes list items",
      },
        "Beginner-Advanced": {
          skill: "Structured Data Storage",
          tooltip: "Uses lists to track data",
  }
},
  "Debugging": {
    "Beginner-Beginner": {
      skill: "Identify Issue",
      tooltip: "Identifies problem",
    },
      "Beginner-Intermediate": {
        skill: "Test Changes",
        tooltip: "Tests and adjusts code",
      },
        "Beginner-Advanced": {
          skill: "Fix and Explain",
          tooltip: "Fixes bug, explains fix",
  }
},

  // Intermediate-only categories
  "Advanced Logic & State Management": {
    Intermediate: {
      skill: "Multi-state systems, nested logic, and variable management",
      tooltip:
        "Sample Projects:\n• Cooking game with prep/cook/serve\n• Sports game with match/result screens\n• Arcade game with game over states",
    },
  },
  "AI & Behavior Systems": {
    Intermediate: {
      skill: "Enemy AI with patrols, decisions, and adaptive behavior",
      tooltip:
        "Sample Projects:\n• Maze game with patrolling guards\n• Zombie chase game\n• Boss that changes attacks as damaged",
    },
  },
  "Game Systems & Mechanics": {
    Intermediate: {
      skill: "Scoring, cooldowns, difficulty scaling, and turn systems",
      tooltip:
        "Sample Projects:\n• Platformer with increasing difficulty\n• Turn-based RPG with enemy/player cycles\n• Game with timed power-ups and recharging abilities",
    },
  },
  "Math & Movement Patterns": {
    Intermediate: {
      skill: "Use of trigonometry, angles, and grid tracking",
      tooltip:
        "Sample Projects:\n• Helicopter orbiting target using sine/cosine\n• Puzzle game with grid-based movement\n• Shooter where projectiles aim at cursor",
    },
  },
  "Cloning & Instance Management": {
    Intermediate: {
      skill: "Manage clones with unique behavior and lifecycle",
      tooltip:
        "Sample Projects:\n• Fish tank with different clone patterns\n• Tower defense with clone waves\n• Wildlife simulation with clone birth/death",
    },
  },
  "Player Interaction & Input Logic": {
    Intermediate: {
      skill: "Complex controls, mouse drag, and multiplayer input",
      tooltip:
        "Sample Projects:\n• Double-tap dash in a fighter\n• Drag-to-snap puzzle game\n• Two-player tag game with shared controls",
    },
  },
  "UI & UX Design": {
    Intermediate: {
      skill: "Menus, feedback effects, and custom real-time UI",
      tooltip:
        "Sample Projects:\n• Health/stamina bar with changing colors\n• Menu system with options/start\n• Platformer with screen shake and particle hit effects",
    },
  },
  "World-Building & Level Design": {
    Intermediate: {
      skill: "Custom levels, checkpoints, and procedural generation",
      tooltip:
        "Sample Projects:\n• Level builder with drag/drop tiles\n• Platformer with save points and stage transitions\n• Random maze generator or terrain map",
    },
  },
  "Narrative & Dialogue Systems": {
    Intermediate: {
      skill: "Branching dialogue, saved progress, and cutscenes",
      tooltip:
        "Sample Projects:\n• RPG with conversation trees and story impact\n• Game that resumes at saved state\n• Visual novel with comic-style cutscenes",
    },
  },
  "Optimization & Project Architecture": {
    Intermediate: {
      skill: "Clean code structure and performance optimization",
      tooltip:
        "Sample Projects:\n• Bullet-hell game optimized for clone count\n• Modular RPG using custom blocks\n• UI system with reusable scripts and buttons",
    },
  },
};


const pythonConcepts = {
  "Variables & Data Types": {
    "Beginner-Beginner": {
      skill: "Assigns int, float, str",
      tooltip: "Can assign and print basic int, float, or string values",
    },
    "Beginner-Intermediate": {
      skill: "Converts and compares types",
      tooltip: "Can convert between types and compare values correctly",
    },
    "Beginner-Advanced": {
      skill: "Uses multiple types effectively",
      tooltip: "Can combine and use multiple data types fluently",
    },
  },
  "Input/Output": {
    "Beginner-Beginner": {
      skill: "Uses input() and print()",
      tooltip: "Can take user input and display output",
    },
    "Beginner-Intermediate": {
      skill: "Formats strings with variables",
      tooltip: "Can format strings with variables in output",
    },
    "Beginner-Advanced": {
      skill: "Builds interactive CLI app",
      tooltip: "Can build a command-line app that interacts with the user",
    },
  },
  "Operators": {
    "Beginner-Beginner": {
      skill: "Uses + - * /",
      tooltip: "Uses arithmetic operators correctly in expressions",
    },
    "Beginner-Intermediate": {
      skill: "Uses > < == and/or",
      tooltip: "Understands and applies comparison and logical operators",
    },
    "Beginner-Advanced": {
      skill: "Combines in expressions",
      tooltip: "Uses complex and combined expressions in logic",
    },
  },
  "Conditionals": {
    "Beginner-Beginner": {
      skill: "Uses if statements",
      tooltip: "Can write simple if statements for decision-making",
    },
    "Beginner-Intermediate": {
      skill: "Adds elif and else",
      tooltip: "Adds elif and else to build multi-condition logic",
    },
    "Beginner-Advanced": {
      skill: "Nested or complex if chains",
      tooltip: "Can construct nested if-else chains for multi-layered logic",
    },
  },
  "Loops": {
    "Beginner-Beginner": {
      skill: "Uses for loop with range()",
      tooltip: "Uses for loop to iterate over a range",
    },
    "Beginner-Intermediate": {
      skill: "Uses while loop",
      tooltip: "Uses while loop for repeated execution based on condition",
    },
    "Beginner-Advanced": {
      skill: "Nested or controlled loops",
      tooltip: "Uses nested loops or advanced loop control",
    },
  },
  "Functions": {
    "Beginner-Beginner": {
      skill: "Defines simple def function()",
      tooltip: "Defines a simple function using def",
    },
    "Beginner-Intermediate": {
      skill: "Passes arguments, returns",
      tooltip: "Defines and uses parameters and return values in functions",
    },
    "Beginner-Advanced": {
      skill: "Uses parameters effectively",
      tooltip: "Creates reusable functions with clear input/output",
    },
  },
  "Lists": {
    "Beginner-Beginner": {
      skill: "Creates and accesses list",
      tooltip: "Uses lists to store and access multiple items",
    },
    "Beginner-Intermediate": {
      skill: "Modifies with append, pop",
      tooltip: "Appends to lists and iterates over them",
    },
    "Beginner-Advanced": {
      skill: "Loops and logic with lists",
      tooltip: "Uses nested lists and understands mutability",
    },
  },
  "Dictionaries": {
    "Beginner-Beginner": {
      skill: "Creates key-value dict",
      tooltip: "Accesses individual characters using indexing",
    },
    "Beginner-Intermediate": {
      skill: "Gets, sets, checks keys",
      tooltip: "Uses string methods like lower(), upper(), find()",
    },
    "Beginner-Advanced": {
      skill: "Nested dict or loops with dict",
      tooltip: "Combines string methods with loops or conditionals to manipulate strings",
    },
  },
  "Strings": {
    "Beginner-Beginner": {
      skill: "Prints and joins strings",
      tooltip: "Writes basic programs that solve small problems",
    },
    "Beginner-Intermediate": {
      skill: "Slices and formats strings",
      tooltip: "Breaks down a problem and plans steps in code",
    },
    "Beginner-Advanced": {
      skill: "Uses methods (split, find, etc.)",
      tooltip: "Implements logic from real-world scenarios in code",
    },
  },
  "Classes & Objects": {
    "Beginner-Beginner": {
      skill: "Defines basic class",
      tooltip: "Follows indentation rules and fixes common typos",
    },
    "Beginner-Intermediate": {
      skill: "Creates objects with __init__",
      tooltip: "Uses print debugging and syntax error messages to fix issues",
    },
    "Beginner-Advanced": {
      skill: "Adds methods and attributes",
      tooltip: "Recognizes runtime vs. syntax errors and fixes them systematically",
    },
  },
  "File I/O": {
    "Beginner-Advanced": {
      skill: "Processes file content logically",
      tooltip: "Writes clean, readable code with inline comments",
    },
  },
  "Advanced Logic & State Management": {
    "Intermediate": {
      skill: "State machines, flags, and adaptive logic",
      tooltip:
        "Sample Projects:\n• RPG with states for dialogue/combat\n• Simulation with setup → simulate → report\n• Quiz app with adaptive question flow",
    },
  },
  "AI & Behavior Systems": {
    "Intermediate": {
      skill: "NPCs, decision trees, and adaptive behaviors",
      tooltip:
        "Sample Projects:\n• Text adventure with reactive characters\n• Game with enemies scaling to player skill\n• Agent sim with hunger/rest logic",
    },
  },
  "Game Systems & Mechanics": {
    "Intermediate": {
      skill: "Health, inventory, cooldowns, and scoring",
      tooltip:
        "Sample Projects:\n• Turn-based game with health/items\n• Platformer with power-ups and score\n• Action game with ability cooldowns",
    },
  },
  "Math & Movement Patterns": {
    "Intermediate": {
      skill: "Coordinates, vectors, and procedural generation",
      tooltip:
        "Sample Projects:\n• 2D motion with trigonometry\n• Maze generator with loops and randomness\n• Orbit sim using sine/cosine waves",
    },
  },
  "Cloning & Instance Management": {
    "Intermediate": {
      skill: "Object management with classes and lists",
      tooltip:
        "Sample Projects:\n• Game with many independent enemies\n• Traffic sim with cars using object lists\n• Battle sim with collision detection",
    },
  },
  "Player Interaction & Input Logic": {
    "Intermediate": {
      skill: "Keyboard, mouse, and game input handling",
      tooltip:
        "Sample Projects:\n• Menu navigation by key press\n• Typing test or memory match\n• GUI with buttons/sliders",
    },
  },
  "UI & UX Design": {
    "Intermediate": {
      skill: "Responsive GUIs with layout and feedback",
      tooltip:
        "Sample Projects:\n• Dashboard that updates in real time\n• Login form with error highlighting\n• Quiz app with frames/grid layout",
    },
  },
  "World-Building & Level Design": {
    "Intermediate": {
      skill: "Level unlocks, editors, and progress saving",
      tooltip:
        "Sample Projects:\n• Puzzle game with sequential levels\n• Tile editor for custom levels\n• Game with file-based save/load",
    },
  },
  "Narrative & Dialogue Systems": {
    "Intermediate": {
      skill: "Dialogue branching, persistence, and cutscenes",
      tooltip:
        "Sample Projects:\n• Story with player-driven outcomes\n• Game tracking choices across scenes\n• Cutscene engine with timed text",
    },
  },
  "Optimization & Project Architecture": {
    "Intermediate": {
      skill: "Clean structure, reusable modules, and performance",
      tooltip:
        "Sample Projects:\n• Modular game engine with utility modules\n• Utility library shared across scripts\n• Sim running 100s of updates/sec optimized for speed",
    },
  },
  "Debugging": {
    "Intermediate": "(coming soon)",
  },
  "Functions & Modularity": {
    "Intermediate": "(coming soon)",
  },
  "Data Structures & Algorithms": {
    "Advanced": {
      skill: "Effective use of lists, dicts, and algorithmic thinking",
      tooltip:
        "Sample Projects:\n• Student records manager using lists/dictionaries\n• Linear search and bubble sort comparison\n• Seating chart tracker using nested lists",
    },
  },
  "Functions & Modularity": {
    "Advanced": {
      skill: "Modular program design with reusable functions",
      tooltip:
        "Sample Projects:\n• Temperature converter with reusable logic\n• Quiz app using parameterized functions\n• Calculator with helper modules",
    },
  },
  "OOP & Abstraction": {
    "Advanced": {
      skill: "Object-oriented design, inheritance, and special methods",
      tooltip:
        "Sample Projects:\n• Pet simulator with class-based behavior\n• Vehicle sim with subclasses and super()\n• Library system using __str__ for output",
    },
  },
  "File Handling & Persistence": {
    "Advanced": {
      skill: "Read/write to files, handle structured formats, persist state",
      tooltip:
        "Sample Projects:\n• Game saving high scores to a file\n• JSON-based data storage for a game\n• To-do app with persistent saved tasks",
    },
  },
  "Error Handling & Debugging": {
    "Advanced": {
      skill: "Safe error handling, assertions, and logging",
      tooltip:
        "Sample Projects:\n• Safe calculator with try/except\n• Assertions in simulation code\n• API error logging to file",
    },
  },
  "APIs & Web Access": {
    "Advanced": {
      skill: "Access and process external APIs with error handling",
      tooltip:
        "Sample Projects:\n• Weather app using a web API\n• Movie info fetcher with JSON parsing\n• Currency converter handling API downtime",
    },
  },
  "Project Architecture": {
    "Advanced": {
      skill: "Modular code structure with documentation and reusability",
      tooltip:
        "Sample Projects:\n• Game split into UI, logic, data modules\n• Shared utility library with import/export\n• Documented mini-library using docstrings",
    },
  },
  "Testing & Validation": {
    "Advanced": {
      skill: "Unit testing and code quality validation",
      tooltip:
        "Sample Projects:\n• Unittest-based testing of math utilities\n• Test suite for string handling edge cases\n• Word counter improved by test feedback",
    },
  },
  "Advanced Concepts": {
    "Advanced": {
      skill: "Functional and recursive techniques for concise code",
      tooltip:
        "Sample Projects:\n• Recursive factorial and Fibonacci\n• Text summarizer using map/filter/comprehensions\n• Decorator to track function calls",
    },
  },
  "Libraries": {
    "Advanced": {
      skill: "Use major Python libraries for data and ML",
      tooltip:
        "Topics:\n• NumPy, Pandas – data manipulation\n• Matplotlib, Seaborn – visualization\n• Scikit-learn, TensorFlow – machine learning",
    },
  },
};



const COLORS = ["red", "yellow", "green"];
const LANGUAGES = ["Scratch", "Python"];

export default function StudentPage() {
  const { slug } = useParams();
  const [progress, setProgress] = useState({ Scratch: {}, Python: {} });
  const [activeLanguage, setActiveLanguage] = useState("Scratch");
  const [activeLevel, setActiveLevel] = useState("Beginner");
  const hasInitialized = useRef(false);

  const conceptsByLanguage = {
    Scratch: scratchConcepts,
    Python: pythonConcepts,
  };

  const displayName = slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  useEffect(() => {
    fetch(`${API_BASE}/students/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && (data.Scratch || data.Python)) {
          setProgress({
            Scratch: data.Scratch || {},
            Python: data.Python || {},
          });
        } else {
          const initial = {};
          LANGUAGES.forEach((lang) => {
            initial[lang] = {};
            Object.entries(conceptsByLanguage[lang]).forEach(([concept, levelMap]) => {
              Object.entries(levelMap).forEach(([level, skill]) => {
                if (skill) {
                  const key = `${concept}|${level}`;
                  initial[lang][key] = { color: "red", sessions: 0 };
                }
              });
            });
          });
          setProgress(initial);
        }
      });
  }, [slug]);

useEffect(() => {
  if (hasInitialized.current || !progress?.Scratch || !progress?.Python) return;

  const priorityOrder = [
    ["Python", "Advanced"],
    ["Python", "Intermediate"],
    ["Python", "Beginner"],
    ["Scratch", "Intermediate"],
    ["Scratch", "Beginner"],
  ];

  for (const [lang, level] of priorityOrder) {
    const hasProgress = Object.entries(progress[lang]).some(([key, { color, sessions }]) => {
      const [, lvl] = key.split("|");
      const isMatch = level === "Beginner" ? beginnerLevels.includes(lvl) : lvl === level;
      return isMatch && (color !== "red" || sessions > 0);
    });

    if (hasProgress) {
      setActiveLanguage(lang);
      setActiveLevel(level);
      hasInitialized.current = true;
      break;
    }
  }
}, [progress]);


  useEffect(() => {
    if (activeLanguage === "Scratch" && activeLevel === "Advanced") {
      setActiveLevel("Beginner");
    }
  }, [activeLanguage, activeLevel]);



  useEffect(() => {
    if (!progress || !progress.Scratch || !progress.Python) return;

    fetch(`${API_BASE}/students/${slug}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(progress),
    });
  }, [progress, slug]);
  useEffect(() => {
    document.title = `${displayName} – Progress Tracker`;
  }, [displayName]);

  const cycleColor = (lang, key) => {
    setProgress((prev) => {
      const current = prev[lang][key] || { color: "red", sessions: 0 };
      const nextColor = COLORS[(COLORS.indexOf(current.color) + 1) % COLORS.length];
      return {
        ...prev,
        [lang]: {
          ...prev[lang],
          [key]: { ...current, color: nextColor },
        },
      };
    });
  };

  const updateSessions = (lang, key, value) => {
    const current = progress[lang][key] || { color: "red", sessions: 0 };
    const sanitized = Math.max(0, parseInt(value) || 0);

    setProgress((prev) => ({
      ...prev,
      [lang]: {
        ...prev[lang],
        [key]: {
          ...current,
          sessions: sanitized,
        },
      },
    }));
  };


  const exportToPDF = (selectedLanguages) => {
    const doc = new jsPDF();
    let y = 20;

    doc.setFontSize(16);
    doc.text(`${displayName} – Student Progress`, 14, y);
    y += 10;

    selectedLanguages.forEach((lang) => {
      doc.setFontSize(14);
      doc.text(lang, 14, y);
      y += 8;

      levels.forEach((level) => {
        doc.setFontSize(13);
        doc.text(level, 14, y);
        y += 7;

        Object.entries(conceptsByLanguage[lang]).forEach(([concept, levelsObj]) => {
          const skillEntry = levelsObj[activeLevel];
          if (!skillEntry) return null;

          const skill = typeof skillEntry === "string" ? skillEntry : skillEntry.skill;
          const tooltip = typeof skillEntry === "object" && skillEntry.tooltip ? skillEntry.tooltip : null;


          const key = `${concept}|${level}`;
          const { color = "red", sessions = 0 } = progress[lang][key] || {};

          doc.setFontSize(11);
          doc.text(
            `• ${concept}: ${skill} — Progress: ${color}, Sessions: ${sessions}`,
            16,
            y
          );
          y += 6;

          if (y > 270) {
            doc.addPage();
            y = 20;
          }
        });
        y += 4;
      });
    });

    doc.save(`${displayName.replace(/\s+/g, "_").toLowerCase()}_progress.pdf`);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          {displayName} - Student Progress
        </h1>

        {/* Language Tabs */}
        <div className="flex justify-center space-x-4 mb-4">
          {LANGUAGES.map((lang) => (
            <button
              key={lang}
              onClick={() => setActiveLanguage(lang)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                activeLanguage === lang
                  ? "bg-blue-600 text-white shadow"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>

        {/* Level Tabs */}
        <div className="flex justify-center space-x-2 mb-6 flex-wrap">
        {levels
  .filter((level) => activeLanguage !== "Scratch" || level !== "Advanced")
  .map((level) => (
    <button
      key={level}
      onClick={() => setActiveLevel(level)}
      className={`px-3 py-1 rounded-full text-xs font-medium transition ${
        activeLevel === level
          ? "bg-blue-500 text-white shadow"
          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
      }`}
    >
      {level}
    </button>
))}

        </div>

        {/* Export Buttons */}
        <div className="flex justify-center gap-3 mb-6">
          <button
            onClick={() => exportToPDF(["Scratch"])}
            className="px-3 py-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
          >
            Export Scratch
          </button>
          <button
            onClick={() => exportToPDF(["Python"])}
            className="px-3 py-2 bg-green-100 text-green-800 rounded hover:bg-green-200"
          >
            Export Python
          </button>
          <button
            onClick={() => exportToPDF(["Scratch", "Python"])}
            className="px-3 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Export Both
          </button>
        </div>

        {/* Concept List */}
        <div className="flex justify-center gap-6 mb-4 text-sm text-gray-700">
  <div className="flex items-center gap-2">
    <span className="w-4 h-4 rounded-full border bg-red-500" /> Needs Work
  </div>
  <div className="flex items-center gap-2">
    <span className="w-4 h-4 rounded-full border bg-yellow-400" /> In Progress
  </div>
  <div className="flex items-center gap-2">
    <span className="w-4 h-4 rounded-full border bg-green-500" /> Mastered
  </div>
</div>

        <div className="space-y-4">
         {activeLevel === "Beginner" ? (
  Object.entries(conceptsByLanguage[activeLanguage]).map(([concept, levelsObj]) => {
    const isBeginnerOnly = beginnerLevels.some((lvl) => levelsObj[lvl]);
    if (!isBeginnerOnly) return null;

    return (
      <div key={concept} className="border p-3 rounded-md bg-gray-50">
        <div className="font-semibold text-gray-800 mb-2">{concept}</div>
        <div className="grid grid-cols-3 gap-4">
          {beginnerLevels.map((lvl) => {
            const skillEntry = levelsObj[lvl];
            if (!skillEntry) return <div key={lvl}></div>;

            const key = `${concept}|${lvl}`;
            const { color, sessions } = progress[activeLanguage][key] || { color: "red", sessions: 0 };
            const skill = typeof skillEntry === "string" ? skillEntry : skillEntry.skill;
            const tooltip = typeof skillEntry === "object" && skillEntry.tooltip ? skillEntry.tooltip : null;

            return (
              <div key={lvl} className="space-y-1 text-sm">
                <div className="font-medium">{lvl.replace("Beginner-", "")}</div>
                <div className="relative group text-gray-600">
                  {skill}
                  {tooltip && (
                    <div className="absolute left-0 mt-1 max-w-xs z-10 hidden group-hover:block bg-white border border-gray-300 rounded p-2 shadow text-xs text-gray-700 whitespace-pre-line">
                      {tooltip}
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <button
                    onClick={() => cycleColor(activeLanguage, key)}
                    className="w-5 h-5 rounded-full border"
                    style={{ backgroundColor: color }}
                  />
                  <button
                    onClick={() => updateSessions(activeLanguage, key, sessions - 1)}
                    className="w-6 h-6 rounded-full border text-sm bg-white hover:bg-gray-100"
                    disabled={sessions <= 0}
                  >−</button>
                  <div className="min-w-[2rem] text-center">{sessions}</div>
                  <button
                    onClick={() => updateSessions(activeLanguage, key, sessions + 1)}
                    className="w-6 h-6 rounded-full border text-sm bg-white hover:bg-gray-100"
                  >+</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  })
) : (
  Object.entries(conceptsByLanguage[activeLanguage]).map(([concept, levelsObj]) => {
    const skillEntry = levelsObj[activeLevel];
    if (!skillEntry) return null;

    const skill = typeof skillEntry === "string" ? skillEntry : skillEntry.skill;
    const tooltip = typeof skillEntry === "object" && skillEntry.tooltip ? skillEntry.tooltip : null;

    const key = `${concept}|${activeLevel}`;
    const { color, sessions } = progress[activeLanguage][key] || { color: "red", sessions: 0 };

    return (
      <div key={key} className="flex items-center justify-between border p-3 rounded-md bg-gray-50">
        <div>
          <div className="font-semibold text-gray-800">{concept}</div>
          <div className="relative group text-sm text-gray-500">
            {skill}
            {tooltip && (
              <div className="absolute left-0 mt-1 max-w-xs z-10 hidden group-hover:block bg-white border border-gray-300 rounded p-2 shadow text-xs text-gray-700 whitespace-pre-line">
                {tooltip}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => cycleColor(activeLanguage, key)}
            className="w-6 h-6 rounded-full border"
            style={{ backgroundColor: color }}
            title={`Progress: ${color}`}
          />
          <div className="flex items-center space-x-2">
            <button
              onClick={() => updateSessions(activeLanguage, key, sessions - 1)}
              className="w-6 h-6 flex items-center justify-center rounded-full border text-sm bg-white hover:bg-gray-100"
              disabled={sessions <= 0}
            >−</button>
            <div className="min-w-[2rem] text-center text-sm">{sessions}</div>
            <button
              onClick={() => updateSessions(activeLanguage, key, sessions + 1)}
              className="w-6 h-6 flex items-center justify-center rounded-full border text-sm bg-white hover:bg-gray-100"
            >+</button>
          </div>
          <span className="text-sm text-gray-600">sessions</span>
        </div>
      </div>
    );
  })
)}

        </div>
      </div>
    </div>
  );
}
