import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import jsPDF from "jspdf";
import useUnsavedChanges from "./shared/hooks/useUnsavedChanges";
import { stableStringify } from "./shared/utils/stableStringify";

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
          skill: "Multiple Variable Interactions",
          tooltip: "Multiple variables in interactions",
  }
},
  "Operators": {
    "Beginner-Beginner": {
      skill: "Random, ><=",
      tooltip: "Uses > < = and/or",
    },
      "Beginner-Intermediate": {
        skill: "And, Or, Not, +-/*",
        tooltip: "Uses logic ops + - * /",
      },
        "Beginner-Advanced": {
          skill: "Text Operators",
          tooltip: "Uses text for booleans",
  }
},
  "Control": {
    "Beginner-Beginner": {
      skill: "Forever, Repeat Blocks",
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
          tooltip: "Game goes through state controlled changes (i.e. Levels)",
  }
},
  "Sensing": {
    "Beginner-Beginner": {
      skill: "Touching, Mouse Down",
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
        skill: "Uses clones for projectiles, (delete)",
        tooltip: "Uses clones for projectiles, (delete)",
      },
        "Beginner-Advanced": {
          skill: "Multi-costumed clones",
          tooltip: "Clones create clones with different costumes",
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
          skill: "Coordinate Multiple Sprites",
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
        skill: "Uses test variable to help debug",
        tooltip: "Debugs the code with the variable",
      },
        "Beginner-Advanced": {
          skill: "Fix and Explain",
          tooltip: "Fixes bug, explains fix",
  }
},
Intermediate: {

  // Intermediate-only categories
  "Advanced Logic & State Management": {
    SubGoals: [
      {
        skill: "Use multi-state systems",
        tooltip:
          "Mastery criteria: Correctly implements game state transitions and manages them without bugs.\nExample project idea: Create a game with multiple game states: menu, play, pause, and game over",
      },
      {
        skill: "Use complex conditionals and nested logic",
        tooltip:
          "Mastery criteria: Can structure and debug nested conditionals with multiple outcomes.\nExample project idea: Build a mini-game where outcomes depend on multiple variables and conditions",
      },
      {
        skill: "Manage global/local variables and flags",
        tooltip:
          "Mastery criteria: Uses flags/variables to clearly manage project-wide behaviors and modes.\nExample project idea: Design a simulation where characters behave differently based on flags",
      },
    ],
  },
  "AI & Behavior Systems": {
    SubGoals: [
      {
        skill: "Program patrolling or chasing enemies",
        tooltip:
          "Mastery criteria: Creates AI that reliably detects and reacts to players.\nExample project idea: Create a stealth game where enemies follow a path and react to the player",
      },
      {
        skill: "React to player actions over time",
        tooltip:
          "Mastery criteria: Designs enemies or systems that change based on player performance.\nExample project idea: Develop an enemy that becomes harder as the player gets more points",
      },
      {
        skill: "Use simple AI decision rules",
        tooltip:
          "Mastery criteria: Implements basic decision trees or rule-based behavior reliably.\nExample project idea: Make an NPC that chooses actions based on game state",
      },
    ],
  },
  "Game Systems & Mechanics": {
    SubGoals: [
      {
        skill: "Implement health, score, and inventory systems",
        tooltip:
          "Mastery criteria: Tracks and updates multiple systems (score, health, inventory) simultaneously.\nExample project idea: Design an adventure game with health bar and collectable items",
      },
      {
        skill: "Add cooldowns and difficulty scaling",
        tooltip:
          "Mastery criteria: Implements functional cooldown timers and smooth difficulty scaling.\nExample project idea: Add timed power-ups and enemies that become faster",
      },
      {
        skill: "Create turn-based or time-based mechanics",
        tooltip:
          "Mastery criteria: Designs a complete, fair turn-based system involving multiple actors.\nExample project idea: Build a board game or battle system using turns",
      },
    ],
  },
  "Math & Movement Patterns": {
    SubGoals: [
      {
        skill: "Use trigonometry for motion",
        tooltip:
          "Mastery criteria: Applies trigonometric logic accurately to control motion paths.\nExample project idea: Create a project where a sprite moves in a spiral or circle",
      },
      {
        skill: "Track position on a grid",
        tooltip:
          "Mastery criteria: Successfully tracks position on a logical 2D grid and moves accordingly.\nExample project idea: Build a puzzle game with grid-based movement",
      },
      {
        skill: "Use angles and direction for targeting",
        tooltip:
          "Mastery criteria: Uses angles and trigonometry for targeting with consistent results.\nExample project idea: Make a shooter game where projectiles aim toward the cursor",
      },
    ],
  },
  "Cloning & Instance Management": {
    SubGoals: [
      {
        skill: "Use clones with unique behaviors",
        tooltip:
          "Mastery criteria: Manages multiple clones with individual behavior and minimal bugs.\nExample project idea: Make a game where enemies spawn with different patterns",
      },
      {
        skill: "Detect and respond to clone interactions",
        tooltip:
          "Mastery criteria: Uses sensing, loops, and logic to detect areas and apply effects.\nExample project idea: Create a tower defense game with enemy waves and area checks",
      },
      {
        skill: "Manage lifecycle and data of clones",
        tooltip:
          "Mastery criteria: Properly tracks, resets, and recycles clones during a session.\nExample project idea: Build a simulation with multiple interacting agents",
      },
    ],
  },
  "Player Interaction & Input Logic": {
    SubGoals: [
      {
        skill: "Use complex control inputs",
        tooltip:
          "Mastery criteria: Implements and explains complex control patterns and user inputs.\nExample project idea: Design a game with double-tap dash or input combos",
      },
      {
        skill: "Use mouse input and drag events",
        tooltip:
          "Mastery criteria: Uses mouse input and drag events cleanly and responsively.\nExample project idea: Make a physics-based dragging game",
      },
      {
        skill: "Implement multi-player control",
        tooltip:
          "Mastery criteria: Allows two players to play using different control schemes.\nExample project idea: Create a local 2-player competitive or co-op game",
      },
    ],
  },
  "UI & UX Design": {
    SubGoals: [
      {
        skill: "Create menus and navigation systems",
        tooltip:
          "Mastery criteria: Designs functional and navigable menu systems with visual clarity.\nExample project idea: Build a game with a title screen, instructions, and settings",
      },
      {
        skill: "Use visual feedback for game events",
        tooltip:
          "Mastery criteria: Implements real-time visual/audio feedback for in-game actions.\nExample project idea: Show animations and effects when a player scores or takes damage",
      },
      {
        skill: "Display real-time data with custom UI",
        tooltip:
          "Mastery criteria: Displays up-to-date values (score, time) with visual clarity.\nExample project idea: Design a scoreboard or health bar with custom graphics",
      },
    ],
  },
  "World-Building & Level Design": {
    SubGoals: [
      {
        skill: "Allow user-generated levels",
        tooltip:
          "Mastery criteria: Supports creating, storing, and replaying user-designed levels.\nExample project idea: Let the player place items and design a level to play",
      },
      {
        skill: "Use checkpoints and transitions",
        tooltip:
          "Mastery criteria: Correctly resets or restores player state at key checkpoints.\nExample project idea: Add save points and level transitions in a platformer",
      },
      {
        skill: "Generate levels with procedural logic",
        tooltip:
          "Mastery criteria: Creates unpredictable but playable levels using random logic.\nExample project idea: Create a random terrain or maze generator",
      },
    ],
  },
  "Narrative & Dialogue Systems": {
    SubGoals: [
      {
        skill: "Use branching dialogue",
        tooltip:
          "Mastery criteria: Implements dialogue that branches and remembers player choices.\nExample project idea: Create a story-based game with player choices that matter",
      },
      {
        skill: "Persist story progress",
        tooltip:
          "Mastery criteria: Persists game state or decisions across scenes or reloads.\nExample project idea: Allow players to return to the story at their progress point",
      },
      {
        skill: "Build cutscene systems",
        tooltip:
          "Mastery criteria: Sequences scenes and transitions to tell a story effectively.\nExample project idea: Sequence a story scene with animations and dialogue",
      },
    ],
  },
  "Optimization & Project Architecture": {
    SubGoals: [
      {
        skill: "Organize code into reusable blocks",
        tooltip:
          "Mastery criteria: Creates projects using clean, modular, and readable code blocks.\nExample project idea: Refactor a project to use custom blocks for actions",
      },
      {
        skill: "Maintain performance with many sprites",
        tooltip:
          "Mastery criteria: Minimizes lag in sprite-heavy games using techniques like clone culling.\nExample project idea: Test and optimize a clone-heavy project",
      },
      {
        skill: "Structure complex projects cleanly",
        tooltip:
          "Mastery criteria: Separates logic for stages, players, UI, and systems effectively.\nExample project idea: Build a multi-level game with clearly separated scripts",
      },
    ],
  },
}
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
  Intermediate: {
    "Advanced Logic & State Management": {
    "SubGoals": [
      {
        "skill": "Use flags, state variables, and conditional flows",
        "tooltip": "Mastery criteria: Implements game states and transitions using boolean flags and control logic."
      },
      {
        "skill": "Create systems with multi-phase logic",
        "tooltip": "Mastery criteria: Uses sequential logic to manage project phases cleanly."
      },
      {
        "skill": "Use branching paths in games or apps",
        "tooltip": "Mastery criteria: Designs and implements multi-branch conditionals and transitions."
      },

    ]
  },
        "Math & Movement Patterns": {
    "SubGoals": [
      {
        "skill": "Use coordinates, vectors, and angles",
        "tooltip": "Mastery criteria: Applies geometry and math to simulate physical behavior."
      },
      {
        "skill": "Generate procedural patterns or levels",
        "tooltip": "Mastery criteria: Uses loops and random logic to generate complex structures."
      },
      {
        "skill": "Simulate spiral, circular, or wave motion",
        "tooltip": "Mastery criteria: Implements mathematical motion models using sin/cos functions."
      }
    ]
  },
  "Cloning & Instance Management": {
    "SubGoals": [
      {
        "skill": "Work with object-oriented class instances",
        "tooltip": "Mastery criteria: Uses classes and object lists to manage multiple entities."
      },
      {
        "skill": "Use lists to manage many objects",
        "tooltip": "Mastery criteria: Efficiently adds, removes, and updates elements in a list."
      },
      {
        "skill": "Detect collisions and proximity between instances",
        "tooltip": "Mastery criteria: Implements position-based interaction between many objects."
      }
    ]
  },
  "AI & Behavior Systems": {
    "SubGoals": [
      {
        "skill": "Simulate NPC behavior with decision trees",
        "tooltip": "Mastery criteria: Implements decision trees to simulate AI choices."
      },
      {
        "skill": "Implement adaptive difficulty or enemy scaling",
        "tooltip": "Mastery criteria: Uses player stats to modify NPC behavior or challenge."
      },
      {
        "skill": "Build agent systems using logic rules",
        "tooltip": "Mastery criteria: Creates logical behaviors for autonomous characters."
      }
    ]
  },
   "Game Systems & Mechanics": {
    "SubGoals": [
      {
        "skill": "Track resources, inventory, and status",
        "tooltip": "Mastery criteria: Uses data structures to manage multiple game variables."
      },
      {
        "skill": "Use timers and cooldown systems",
        "tooltip": "Mastery criteria: Manages countdowns and time-based logic for game elements."
      },
      {
        "skill": "Design scoring, power-ups, or level-ups",
        "tooltip": "Mastery criteria: Implements evolving mechanics using tracked variables."
      }
    ]
  },
  "Player Interaction & Input Logic": {
    "SubGoals": [
      {
        "skill": "Capture and respond to user input",
        "tooltip": "Mastery criteria: Reads and handles keyboard input through state control."
      },
      {
        "skill": "Build interactive input-based mini-games",
        "tooltip": "Mastery criteria: Handles sequence-sensitive input correctly and responsively."
      },
      {
        "skill": "Use mouse interaction and GUI events",
        "tooltip": "Mastery criteria: Implements mouse tracking and event response via libraries."
      }
    ]
  },
  "UI & UX Design": {
    "SubGoals": [
      {
        "skill": "Display data and status through GUI",
        "tooltip": "Mastery criteria: Displays changing program state visually using a GUI toolkit."
      },
      {
        "skill": "Create interfaces with visual feedback",
        "tooltip": "Mastery criteria: Provides visual feedback for user actions and outcomes."
      },
      {
        "skill": "Use layout systems in GUI design",
        "tooltip": "Mastery criteria: Organizes UI components clearly using layout managers."
      }
    ]
  },
  "World-Building & Level Design": {
    "SubGoals": [
      {
        "skill": "Implement level progression and unlocks",
        "tooltip": "Mastery criteria: Uses logic to control access and game flow."
      },
      {
        "skill": "Design editable or user-generated levels",
        "tooltip": "Mastery criteria: Implements user input for level creation and storage."
      },
      {
        "skill": "Store and reload progress or level data",
        "tooltip": "Mastery criteria: Uses file handling to store and reload structured data."
      }
    ]
  },
  "Narrative & Dialogue Systems": {
    "SubGoals": [
      {
        "skill": "Build branching dialogue using structured logic",
        "tooltip": "Mastery criteria: Uses dictionaries or functions to manage branching paths."
      },
      {
        "skill": "Persist player decisions or dialogue state",
        "tooltip": "Mastery criteria: Stores persistent data using flags, variables, or files."
      },
      {
        "skill": "Sequence events and conversations",
        "tooltip": "Mastery criteria: Creates time-controlled outputs and dialog systems."
      }
    ]
  },
  "Optimization & Project Architecture": {
    "SubGoals": [
      {
        "skill": "Organize code into modules and packages",
        "tooltip": "Mastery criteria: Uses clear module structure with imports and reusable logic."
      },
      {
        "skill": "Use custom functions and classes for reuse",
        "tooltip": "Mastery criteria: Creates reusable components for larger projects."
      },
      {
        "skill": "Reduce redundancy and improve performance",
        "tooltip": "Mastery criteria: Identifies bottlenecks and minimizes redundant logic."
      }
    ]
  },
  },
  Advanced: {
  "Testing & Validation": {
    "SubGoals": [
      {
        "skill": "Write unit tests with unittest module",
        "tooltip": "Mastery criteria: Creates automated tests to verify correctness."
      },
      {
        "skill": "Test edge cases and invalid inputs",
        "tooltip": "Mastery criteria: Designs comprehensive test sets with valid and invalid cases."
      },
      {
        "skill": "Refactor code based on test results",
        "tooltip": "Mastery criteria: Can diagnose and resolve issues using test outcomes."
      }
    ]
  },


  "Data Structures & Algorithms": {
    "SubGoals": [
      {
        "skill": "Use lists, dictionaries, and tuples effectively",
        "tooltip": "Mastery criteria: Can create, update, and access structured data in complex scenarios."
      },
      {
        "skill": "Implement basic search and sort algorithms",
        "tooltip": "Mastery criteria: Can implement and explain time complexity of common algorithms."
      },
      {
        "skill": "Work with nested and multidimensional data",
        "tooltip": "Mastery criteria: Accesses and manipulates nested data structures with precision."
      }
    ]
  },
  "Functions & Modularity": {
    "SubGoals": [

      {
        "skill": "Break down problems using custom functions",
        "tooltip": "Mastery criteria: Uses reusable, well-scoped functions with parameters and return values."
      },
      {
        "skill": "Use parameters, default values, and returns",
        "tooltip": "Mastery criteria: Understands function signatures and scope management."
      },
      {
        "skill": "Implement reusable utilities and tools",
        "tooltip": "Mastery criteria: Uses helper functions for clarity and modular design."
      }
    ]
  },
  "Error Handling & Debugging": {
    "SubGoals": [

      {
        "skill": "Use try/except for input and runtime errors",
        "tooltip": "Mastery criteria: Uses multiple exception types and logical fallbacks."
      },
      {
        "skill": "Implement and use assertions",
        "tooltip": "Mastery criteria: Writes meaningful assertions to catch invalid program states."
      },
      {
        "skill": "Log errors and debug output to files",
        "tooltip": "Mastery criteria: Implements logging to assist in debugging and audits."
      }
    ]
  },

  "OOP & Abstraction": {
    "SubGoals": [
      {
        "skill": "Design and use classes with attributes and methods",
        "tooltip": "Mastery criteria: Defines and instantiates classes with appropriate encapsulation."
      },
      {
        "skill": "Use inheritance to organize related classes",
        "tooltip": "Mastery criteria: Implements inheritance and uses super() correctly."
      },
      {
        "skill": "Use __init__, __str__, and other special methods",
        "tooltip": "Mastery criteria: Demonstrates use of dunder methods for user-friendly class design."
      }
    ]
  },

  "Advanced Concepts": {
    "SubGoals": [
      {
        "skill": "Understand and apply recursion",
        "tooltip": "Mastery criteria: Identifies base and recursive cases correctly."
      },
      {
        "skill": "Use lambda, map, filter, and comprehension",
        "tooltip": "Mastery criteria: Applies functional tools for compact, readable logic."
      },
      {
        "skill": "Use decorators and higher-order functions",
        "tooltip": "Mastery criteria: Demonstrates higher-order programming in real use cases."
      }
    ]
  },



  "APIs & Web Access": {
    "SubGoals": [
      {
        "skill": "Use requests to access web APIs",
        "tooltip": "Mastery criteria: Sends GET requests and handles basic responses."
      },
      {
        "skill": "Parse and process JSON responses",
        "tooltip": "Mastery criteria: Can iterate over JSON data and extract required information."
      },
      {
        "skill": "Handle API errors and edge cases",
        "tooltip": "Mastery criteria: Implements response status checks and fallback logic."
      }
    ]
  },

  "File Handling & Persistence": {
    "SubGoals": [
      {
        "skill": "Read from and write to text files",
        "tooltip": "Mastery criteria: Uses open, read, write, and with-statement correctly."
      },
      {
        "skill": "Work with CSV and JSON data",
        "tooltip": "Mastery criteria: Can parse structured file formats and handle common errors."
      },
      {
        "skill": "Persist program state across sessions",
        "tooltip": "Mastery criteria: Stores and loads persistent data accurately and safely."
      }
    ]
  },
  "Project Architecture": {
    "SubGoals": [
      {
        "skill": "Structure programs using modules",
        "tooltip": "Mastery criteria: Organizes projects into reusable, manageable components."
      },
      {
        "skill": "Use import/export across files",
        "tooltip": "Mastery criteria: Knows how to import correctly using absolute/relative paths."
      },
      {
        "skill": "Document code using comments and docstrings",
        "tooltip": "Mastery criteria: Consistently uses documentation for clarity and collaboration."
      }
    ]
  }
}
};



const COLORS = ["red", "yellow", "green"];
const LANGUAGES = ["Scratch", "Python"];

export default function StudentPage() {
  const { slug } = useParams();
  const [progress, setProgress] = useState({ Scratch: {}, Python: {} });
  const [initialSnapshot, setInitialSnapshot] = useState(null);   // NEW baseline
  const [saving, setSaving] = useState(false);                    // NEW saving state
  const [activeLanguage, setActiveLanguage] = useState("Scratch");
  const [activeLevel, setActiveLevel] = useState("Beginner");
  const hasInitialized = useRef(false);

  const conceptsByLanguage = { Scratch: scratchConcepts, Python: pythonConcepts };

  const displayName = slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  useEffect(() => {
    document.title = `Student Tracker – ${displayName}`;
  }, [displayName]);

  // Load from server (progress object)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const res = await fetch(`${API_BASE}/students/${slug}`);
      const data = await res.json();

      // Build initial grid if nothing stored yet
      let next = {};
      if (data && (data.Scratch || data.Python)) {
        next = { Scratch: data.Scratch || {}, Python: data.Python || {} };
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
        next = initial;
      }
      if (!cancelled) {
        setProgress(next);
        setInitialSnapshot(next); // snapshot for “dirty” compare
      }
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  // Determine if there are unsaved changes
  const dirty =
    initialSnapshot &&
    stableStringify(progress) !== stableStringify(initialSnapshot);

  // Warn on leave if dirty
  useUnsavedChanges(!!dirty);

  // Optional: ⌘S / Ctrl+S to save
  useEffect(() => {
    const onKey = (e) => {
      const mac = navigator.platform.toUpperCase().includes("MAC");
      const meta = mac ? e.metaKey : e.ctrlKey;
      if (meta && e.key.toLowerCase() === "s") {
        e.preventDefault();
        if (dirty && !saving) handleSave();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dirty, saving]);

  // Choose first tab with progress
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



  async function handleSave() {
    try {
      setSaving(true);
      const res = await fetch(`${API_BASE}/students/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(progress),
      });
      if (!res.ok) throw new Error(`Save failed (${res.status})`);
      // reset baseline so changes are no longer "dirty"
      setInitialSnapshot(progress);
    } catch (e) {
      alert(e.message || "Save failed");
    } finally {
      setSaving(false);
    }
  }

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
        [key]: { ...current, sessions: sanitized },
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
          const key = `${concept}|${level}`;
          const { color = "red", sessions = 0 } = progress[lang][key] || {};
          doc.setFontSize(11);
          doc.text(`• ${concept}: ${skill} — Progress: ${color}, Sessions: ${sessions}`, 16, y);
          y += 6;
          if (y > 270) { doc.addPage(); y = 20; }
        });
        y += 4;
      });
    });
    doc.save(`${displayName.replace(/\s+/g, "_").toLowerCase()}_progress.pdf`);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100 overflow-x-auto">
      <div className="w-full max-w-screen-2xl mx-auto bg-white shadow-md rounded-lg p-6">
        {/* Top bar: + Save button */}
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <div className="text-xl font-bold text-gray-800">{displayName}</div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex gap-2">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveLanguage(lang)}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold transition border ${
                    activeLanguage === lang
                      ? "bg-blue-700 text-white shadow"
                      : "bg-white text-blue-700 border-blue-600 hover:bg-blue-50"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              {levels
                .filter((level) => activeLanguage !== "Scratch" || level !== "Advanced")
                .map((level) => (
                  <button
                    key={level}
                    onClick={() => setActiveLevel(level)}
                    className={`px-3 py-1 rounded text-sm font-medium transition border ${
                      activeLevel === level
                        ? "bg-gray-700 text-white shadow"
                        : "bg-white text-gray-700 border-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    {level}
                  </button>
                ))}
            </div>
          </div>

          {/* Save & Export */}
          <div className="flex gap-2 items-center">
            <button
              onClick={handleSave}
              disabled={!dirty || saving}
              className={`px-3 py-1 text-sm rounded ${
                dirty && !saving
                  ? "bg-emerald-600 text-white hover:bg-emerald-700"
                  : "bg-gray-200 text-gray-600 cursor-not-allowed"
              }`}
              title={!dirty ? "No changes to save" : "Save changes"}
            >
              {saving ? "Saving…" : "Save"}
            </button>

            <button
              onClick={() => exportToPDF(["Scratch"])}
              className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
            >
              Scratch PDF
            </button>
            <button
              onClick={() => exportToPDF(["Python"])}
              className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded hover:bg-green-200"
            >
              Python PDF
            </button>
            <button
              onClick={() => exportToPDF(["Scratch", "Python"])}
              className="px-2 py-1 text-xs bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Export Both
            </button>
          </div>
        </div>

        {/* Legend */}
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
          {dirty && (
            <div className="text-amber-700 bg-amber-50 border border-amber-200 rounded px-2 py-1">
              Unsaved changes
            </div>
          )}
        </div>

      {/* Main content: Beginner view vs Intermediate vs Advanced */}
      <div className="space-y-4">
        {activeLevel === "Beginner" ? (
          /* Beginner View: Show concept and levels (Beginner, Intermediate, Advanced) */
          <div className="space-y-2">
            {/* Table header for Beginner view */}
            <div className="grid grid-cols-11 gap-x-6 font-semibold text-gray-700 text-sm px-2 mb-2">
              <div className="col-span-2">Concept</div>
              <div className="col-span-3 text-center">Beginner</div>
              <div className="col-span-3 text-center">Intermediate</div>
              <div className="col-span-3 text-center">Advanced</div>
            </div>
            {/* List all concepts that have any defined level (Beginner/Intermediate/Advanced) */}
            {Object.entries(conceptsByLanguage[activeLanguage]).map(([concept, levelsObj]) => {
              const isBeginnerConcept = beginnerLevels.some((lvl) => levelsObj[lvl]);
              if (!isBeginnerConcept) return null;
              return (
                <div
                  key={concept}
                  className="grid grid-cols-11 gap-x-6 items-center bg-gray-50 px-2 py-2 border rounded-md"
                >
                  <div className="col-span-2 font-medium text-gray-800 text-sm truncate">{concept}</div>
                  {beginnerLevels.map((lvl) => {
                    const skillEntry = levelsObj[lvl];
                    if (!skillEntry) {
                      return <div key={lvl} />; /* empty cell if concept not present at this level */
                    }
                    const key = `${concept}|${lvl}`;
                    const { color, sessions } = progress[activeLanguage][key] || { color: "red", sessions: 0 };
                    const skill = typeof skillEntry === "string" ? skillEntry : skillEntry.skill;
                    const tooltip =
                      typeof skillEntry === "object" && skillEntry.tooltip ? skillEntry.tooltip : null;
                    return (
                      <div key={lvl} className="col-span-3 flex items-center gap-2 text-sm text-gray-700">
                        {/* Skill name with tooltip (if any) */}
                        <div className="relative group">
                          <span>{skill}</span>
                          {tooltip && (
                            <div className="absolute z-10 hidden group-hover:block bg-white border border-gray-300 rounded p-2 shadow text-xs text-gray-700 whitespace-pre-line w-64 top-full left-0 mt-1">
                              {tooltip}
                            </div>
                          )}
                        </div>
                        {/* Progress color dot */}
                        <button
                          onClick={() => cycleColor(activeLanguage, key)}
                          className="w-4 h-4 rounded-full border"
                          style={{ backgroundColor: color }}
                        />
                        {/* Session decrement button */}
                        <button
                          onClick={() => updateSessions(activeLanguage, key, sessions - 1)}
                          className="w-5 h-5 rounded-full border text-xs bg-white hover:bg-gray-100"
                          disabled={sessions <= 0}
                        >
                          −
                        </button>
                        {/* Sessions count */}
                        <div className="min-w-[1.5rem] text-center">{sessions}</div>
                        {/* Session increment button */}
                        <button
                          onClick={() => updateSessions(activeLanguage, key, sessions + 1)}
                          className="w-5 h-5 rounded-full border text-xs bg-white hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        ) : activeLevel === "Intermediate" ? (
          /* Intermediate View: Show categories and their sub-goals (3 columns) */
          <div className="space-y-2">
            {/* Table header for Intermediate view */}
            <div className="grid grid-cols-11 gap-x-6 font-semibold text-gray-700 text-sm px-2 mb-2">
              <div className="col-span-2">Category</div>
              <div className="col-span-9 text-center">Sub Goals</div>

            </div>
            {/* List each category with up to 3 sub-goals */}
            {Object.entries(conceptsByLanguage[activeLanguage][activeLevel] || {}).map(([category, levelsObj]) => {
              if (!levelsObj?.SubGoals) return null;
              return (
                <div
                  key={category}
                  className="grid grid-cols-11 gap-x-6 items-start bg-gray-50 px-2 py-2 border rounded-md"
                >
                  <div className="col-span-2 font-bold text-gray-900 text-sm whitespace-normal break-words">
  {category}
</div>

                  {/* Sub Goal columns */}
                  {levelsObj.SubGoals.map((goal, idx) => {
                    const key = `${category}-${goal.skill}`;
                    const { color, sessions } = progress[activeLanguage][key] || { color: "red", sessions: 0 };
                    return (
                     <div key={idx} className="col-span-3">
  <div className="flex items-start gap-2 text-sm text-gray-700 relative group w-full">
    {/* Sub-goal text with tooltip */}
    <div className="flex-1 text-wrap text-gray-800">
      <div className="font-medium whitespace-normal">{goal.skill}</div>
      {goal.tooltip && (
        <div className="absolute z-10 hidden group-hover:block bg-white border border-gray-300 rounded p-2 shadow text-xs text-gray-700 whitespace-pre-line w-64 top-full left-0 mt-1">
          {goal.tooltip}
        </div>
      )}
    </div>

    {/* Progress controls */}
    <div className="flex items-center gap-1 text-xs">
      <button
        onClick={() => cycleColor(activeLanguage, key)}
        className="w-4 h-4 rounded-full border"
        style={{ backgroundColor: color }}
        title={`Progress: ${color}`}
      />
      <button
        onClick={() => updateSessions(activeLanguage, key, sessions - 1)}
        className="w-4 h-4 flex items-center justify-center rounded-full border bg-white hover:bg-gray-100"
        disabled={sessions <= 0}
      >
        −
      </button>
      <div className="w-5 text-center">{sessions}</div>
      <button
        onClick={() => updateSessions(activeLanguage, key, sessions + 1)}
        className="w-4 h-4 flex items-center justify-center rounded-full border bg-white hover:bg-gray-100"
      >
        +
      </button>
    </div>
  </div>
</div>

                    );
                  })}
                  {/* If fewer than 3 sub-goals, add empty columns to preserve layout */}
                  {levelsObj.SubGoals.length < 3 &&
                    [...Array(3 - levelsObj.SubGoals.length)].map((_, i) => (
                      <div key={`empty-${i}`} className="col-span-3" />
                    ))}
                </div>
              );
            })}
          </div>
        ) : (
          /* Advanced View (Python Advanced): same layout as Intermediate */
          <div className="space-y-2">
            {/* Table header for Advanced view */}
            <div className="grid grid-cols-11 gap-x-6 font-semibold text-gray-700 text-sm px-2 mb-2">
              <div className="col-span-2">Category</div>
              <div className="col-span-9 text-center">Sub Goals</div>

            </div>
            {/* List each category with up to 3 sub-goals (same structure as Intermediate) */}
            {Object.entries(conceptsByLanguage[activeLanguage][activeLevel] || {}).map(([category, levelsObj]) => {
              if (!levelsObj?.SubGoals) return null;
              return (
                <div
                  key={category}
                  className="grid grid-cols-11 gap-x-6 items-start bg-gray-50 px-2 py-2 border rounded-md"
                >
                  <div className="col-span-2 font-medium text-gray-800 text-sm truncate">{category}</div>
                  {levelsObj.SubGoals.map((goal, idx) => {
                    const key = `${category}-${goal.skill}`;
                    const { color, sessions } = progress[activeLanguage][key] || { color: "red", sessions: 0 };
                    return (
                      <div key={idx} className="col-span-3">
                        <div className="flex items-start gap-2 text-sm text-gray-700 relative group w-full">
                         <div className="flex-1 text-wrap text-gray-800">
      <div className="font-medium whitespace-normal">{goal.skill}</div>
      {goal.tooltip && (
        <div className="absolute z-10 hidden group-hover:block bg-white border border-gray-300 rounded p-2 shadow text-xs text-gray-700 whitespace-pre-line w-64 top-full left-0 mt-1">
          {goal.tooltip}
        </div>
      )}
    </div>
                          <div className="flex items-center gap-1 text-xs">
      <button
        onClick={() => cycleColor(activeLanguage, key)}
        className="w-4 h-4 rounded-full border"
        style={{ backgroundColor: color }}
        title={`Progress: ${color}`}
      />
      <button
        onClick={() => updateSessions(activeLanguage, key, sessions - 1)}
        className="w-4 h-4 flex items-center justify-center rounded-full border bg-white hover:bg-gray-100"
        disabled={sessions <= 0}
      >
        −
      </button>
      <div className="w-5 text-center">{sessions}</div>
      <button
        onClick={() => updateSessions(activeLanguage, key, sessions + 1)}
        className="w-4 h-4 flex items-center justify-center rounded-full border bg-white hover:bg-gray-100"
      >
        +
      </button>
    </div>
  </div>
</div>);
                  })}
                  {levelsObj.SubGoals.length < 3 &&
                    [...Array(3 - levelsObj.SubGoals.length)].map((_, i) => (
                      <div key={`empty-${i}`} className="col-span-3" />
                    ))}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  </div>
);

}
