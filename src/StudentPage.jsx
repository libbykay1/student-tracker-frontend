import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";

const levels = ["Beginner-Beginner", "Beginner-Intermediate", "Beginner-Advanced", "Intermediate", "Advanced"];
const API_BASE = import.meta.env.VITE_BACKEND_URL;

const scratchConcepts = {
  // Beginner categories
  "Data Types": {
    "Beginner-Beginner": "Uses variables for name/score",
    "Beginner-Intermediate": "Uses numbers and text in logic",
    "Beginner-Advanced": "Multiple variables in interactions",
  },
  "Operators": {
    "Beginner-Beginner": "Uses + - * /",
    "Beginner-Intermediate": "Uses > < = and/or",
    "Beginner-Advanced": "Nested logic with operators",
  },
  "Control": {
    "Beginner-Beginner": "Uses loops (forever, repeat)",
    "Beginner-Intermediate": "Uses wait/repeat until",
    "Beginner-Advanced": "Nested loops for timing/logic",
  },
  "Conditionals": {
    "Beginner-Beginner": "Uses if block",
    "Beginner-Intermediate": "Uses if-else block",
    "Beginner-Advanced": "Multiple/nested if logic",
  },
  "Sprite Movement": {
    "Beginner-Beginner": "Moves/glides sprite",
    "Beginner-Intermediate": "Moves with keys/mouse",
    "Beginner-Advanced": "Gravity, wrap, advanced motion",
  },
  "Input/Output": {
    "Beginner-Beginner": "Say block or key press",
    "Beginner-Intermediate": "Ask/answer, mouse input",
    "Beginner-Advanced": "Dynamic responses to input",
  },
  "Backdrops": {
    "Beginner-Beginner": "Changes backdrops manually",
    "Beginner-Intermediate": "Backdrop change with events",
    "Beginner-Advanced": "Backdrop reflects game state",
  },
  "Sensing": {
    "Beginner-Beginner": "Touching or mouse down",
    "Beginner-Intermediate": "Sensing in conditionals",
    "Beginner-Advanced": "Sensing with logic/actions",
  },
  "Clones": {
    "Beginner-Beginner": "Creates clones",
    "Beginner-Intermediate": "Uses clones for animation",
    "Beginner-Advanced": "Manages clones with events",
  },
  "Functions": {
    "Beginner-Beginner": "Simple My Block",
    "Beginner-Intermediate": "My Block with input",
    "Beginner-Advanced": "Reusable logic with input",
  },
  "Events": {
    "Beginner-Beginner": "When flag clicked",
    "Beginner-Intermediate": "Broadcast/receive",
    "Beginner-Advanced": "Multi-sprite coordination",
  },
  "Costumes": {
    "Beginner-Beginner": "Manual costume change",
    "Beginner-Intermediate": "Animates with costumes",
    "Beginner-Advanced": "Conditional costume switch",
  },
  "Sound": {
    "Beginner-Beginner": "Plays sound",
    "Beginner-Intermediate": "Sound for feedback/story",
    "Beginner-Advanced": "Intentional sound design",
  },
  "Lists": {
    "Beginner-Beginner": "Creates list",
    "Beginner-Intermediate": "Adds/removes list items",
    "Beginner-Advanced": "Uses lists to track data",
  },
  "Debugging": {
    "Beginner-Beginner": "Identifies problem",
    "Beginner-Intermediate": "Tests and adjusts code",
    "Beginner-Advanced": "Fixes bug, explains fix",
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
    "Data Types": {
      "Beginner-Beginner": "Int, Float",
      "Beginner-Intermediate": "Boolean, Lists",
      "Beginner-Advanced": "Nested Lists",
      "Intermediate": "(coming soon)",
      "Advanced": "(coming soon)",
    },
    "Operators": {
      "Beginner-Beginner": "Random, ><=, +-*/",
      "Beginner-Intermediate": "And, Or, Not",
      "Beginner-Advanced": "Text Operators",
      "Intermediate": "(coming soon)",
      "Advanced": "(coming soon)",
    },
    "Control": {
      "Beginner-Beginner": "For Loops",
      "Beginner-Intermediate": "While Loops, Break",
      "Beginner-Advanced": "Nested Loops",
      "Intermediate": "(coming soon)",
      "Advanced": "(coming soon)",
    },
    "Conditionals": {
      "Beginner-Beginner": "If/Then",
      "Beginner-Intermediate": "If/Then/Else",
      "Beginner-Advanced": "Nested",
      "Intermediate": "(coming soon)",
      "Advanced": "(coming soon)",
    },
    "Sprite Movement": {
      "Beginner-Beginner": "Arrow Keys, x/y",
      "Beginner-Intermediate": "Basic Gravity",
      "Beginner-Advanced": "Advanced Gravity, Velocity",
      "Intermediate": "(coming soon)",
      "Advanced": "(coming soon)",
    },
    "Input/Output": {
      "Beginner-Beginner": "Mouse, Keyboard",
      "Beginner-Intermediate": "Text, Sound",
      "Beginner-Advanced": "Files, Other",
      "Intermediate": "(coming soon)",
      "Advanced": "(coming soon)",
    },
    "Backdrops": {
      "Beginner-Beginner": "Changing",
      "Beginner-Intermediate": "Game Start/Over",
      "Beginner-Advanced": "",
      "Intermediate": "(coming soon)",
      "Advanced": "(coming soon)",
    },
    "Sensing": {
      "Beginner-Beginner": "",
      "Beginner-Intermediate": "Collision",
      "Beginner-Advanced": "Distance To",
      "Intermediate": "(coming soon)",
      "Advanced": "(coming soon)",
    },
    "Classes": {
      "Beginner-Beginner": "Basic Spawning/moving",
      "Beginner-Intermediate": "Projectiles",
      "Beginner-Advanced": "Sub Classes",
      "Intermediate": "(coming soon)",
      "Advanced": "(coming soon)",
    },
    "Functions": {
      "Beginner-Beginner": "Basic",
      "Beginner-Intermediate": "Return, Arguments",
      "Beginner-Advanced": "Global/Local Variables, Recursion",
      "Intermediate": "(coming soon)",
      "Advanced": "(coming soon)",
    },
  };



const COLORS = ["red", "yellow", "green"];
const LANGUAGES = ["Scratch", "Python"];

export default function StudentPage() {
  const { slug } = useParams();
  const [progress, setProgress] = useState({ Scratch: {}, Python: {} });
  const [activeLanguage, setActiveLanguage] = useState("Scratch");
  const [activeLevel, setActiveLevel] = useState("Beginner-Beginner");

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
    if (!progress?.Scratch || !progress?.Python) return;

    const priorityOrder = [
      ["Python", "Advanced"],
      ["Python", "Intermediate"],
      ["Python", "Beginner-Advanced"],
      ["Python", "Beginner-Intermediate"],
      ["Python", "Beginner-Beginner"],
      ["Scratch", "Advanced"],
      ["Scratch", "Intermediate"],
      ["Scratch", "Beginner-Advanced"],
      ["Scratch", "Beginner-Intermediate"],
      ["Scratch", "Beginner-Beginner"],
    ];

    for (const [lang, level] of priorityOrder) {
      const hasProgress = Object.entries(progress[lang]).some(
        ([key, { color, sessions }]) =>
          key.endsWith(`|${level}`) && (color !== "red" || sessions > 0)
      );

      if (hasProgress) {
        setActiveLanguage(lang);
        setActiveLevel(level);
        break;
      }
    }
  }, [progress]);


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
    setProgress((prev) => {
      const current = prev[lang][key] || { color: "red", sessions: 0 };
      return {
        ...prev,
        [lang]: {
          ...prev[lang],
          [key]: {
            color: current.color,
            sessions: parseInt(value) || 0,
          },
        },
      };
    });
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
          {levels.map((level) => (
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
        <div className="space-y-4">
          {Object.entries(conceptsByLanguage[activeLanguage]).map(
            ([concept, levelsObj]) => {
              const skill = levelsObj[activeLevel];
              if (!skill) return null;
              const key = `${concept}|${activeLevel}`;
              const { color, sessions } =
                progress[activeLanguage][key] || { color: "red", sessions: 0 };

              return (
                <div
                  key={key}
                  className="flex items-center justify-between border p-3 rounded-md bg-gray-50"
                >
                  <div>
                    <div className="font-semibold text-gray-800">{concept}</div>
                    <div className="text-sm text-gray-500" title={tooltip || ""}>
  {skill}
</div>

                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => cycleColor(activeLanguage, key)}
                      className="w-6 h-6 rounded-full border"
                      style={{ backgroundColor: color }}
                      title={`Progress: ${color}`}
                    ></button>
                    <input
                      type="number"
                      min="0"
                      value={sessions}
                      onChange={(e) => updateSessions(activeLanguage, key, e.target.value)}
                      className="w-16 border border-gray-300 rounded px-2 py-1 text-center text-sm"
                    />
                    <span className="text-sm text-gray-600">sessions</span>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}
