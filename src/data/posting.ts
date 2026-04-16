// AUTO-GENERATED — do not edit directly.
// Source: MegaVault/Projects/Mini/tesla-portfolio-site/content/posting.md
// Rebuild: node scripts/build-content.js

export type Segment = {
  text: string;
  skillId?: string;
  hint?: boolean;
};

export type PostingSection = {
  heading: string;
  bullets: Segment[][];
};

export type PostingMeta = {
  company: string;
  team: string;
  location: string;
  term: string;
  title: string;
  applicant: string;
  school: string;
  year: string;
};

export type Posting = {
  meta: PostingMeta;
  intro: string;
  sections: PostingSection[];
};

export const posting: Posting = {
  "meta": {
    "company": "Tesla",
    "team": "Optimus Actuator Design",
    "location": "Palo Alto",
    "term": "Summer 2026",
    "title": "Internship, Actuator Mechanical Design Engineer, Optimus",
    "applicant": "Russell Bilinski",
    "school": "University of Victoria",
    "year": "2026"
  },
  "intro": "During your internship for the Optimus Actuator Design Team at Tesla, you will be working on interesting new robotic electromechanical actuator designs that power Tesla's Optimus humanoid robot. We are seeking driven and accomplished engineering student candidates who will thrive in a fast paced and engaging design environment.",
  "sections": [
    {
      "heading": "What You'll Do",
      "bullets": [
        [
          {
            "text": "CAD design",
            "skillId": "cad",
            "hint": true
          },
          {
            "text": " of actuator components"
          }
        ],
        [
          {
            "text": "Prototype assembling and testing",
            "skillId": "hands-on"
          }
        ],
        [
          {
            "text": "Python and Matlab test script and actuator model development",
            "skillId": "python"
          }
        ]
      ]
    },
    {
      "heading": "What You'll Bring",
      "bullets": [
        [
          {
            "text": "Excellent "
          },
          {
            "text": "CAD skills",
            "skillId": "cad"
          },
          {
            "text": " in (CATIA or Solidworks)"
          }
        ],
        [
          {
            "text": "Mechanical design experience, both in "
          },
          {
            "text": "part optimization",
            "skillId": "mech-design"
          },
          {
            "text": " and "
          },
          {
            "text": "design for manufacturing",
            "skillId": "mech-design"
          },
          {
            "text": " ("
          },
          {
            "text": "design, drawings, GD&T",
            "skillId": "mech-design"
          },
          {
            "text": ")"
          }
        ],
        [
          {
            "text": "Experience with "
          },
          {
            "text": "FEA based part design and optimization"
          }
        ],
        [
          {
            "text": "Python/Matlab knowledge, both in "
          },
          {
            "text": "data structure management",
            "skillId": "python"
          },
          {
            "text": ", "
          },
          {
            "text": "UI development",
            "skillId": "python"
          },
          {
            "text": ", "
          },
          {
            "text": "symbolic equations",
            "skillId": "python"
          },
          {
            "text": ", and "
          },
          {
            "text": "iterative solvers",
            "skillId": "python"
          }
        ],
        [
          {
            "text": "Handy, with previous "
          },
          {
            "text": "machining/shop experience",
            "skillId": "hands-on"
          },
          {
            "text": " / "
          },
          {
            "text": "3D printed part design experience",
            "skillId": "hands-on"
          }
        ],
        [
          {
            "text": "Hands on actuator and component (motor, gear, sensors) testing",
            "skillId": "testing"
          }
        ],
        [
          {
            "text": "Problem solving with first principles thinking",
            "skillId": "first-principles"
          }
        ],
        [
          {
            "text": "Experience in Robotics",
            "skillId": "robotics"
          },
          {
            "text": " is preferred"
          }
        ],
        [
          {
            "text": "Experience in "
          },
          {
            "text": "Control Theory with basic understanding of motor and motion control",
            "skillId": "controls"
          },
          {
            "text": " is preferred"
          }
        ],
        [
          {
            "text": "Curious and communicative",
            "skillId": "communicative"
          }
        ]
      ]
    }
  ]
};
