ALTER TABLE scenarios
    ADD COLUMN IF NOT EXISTS decision_lab JSONB NOT NULL DEFAULT '{}'::jsonb;

INSERT INTO scenarios (title, description)
SELECT
    'TECVAYLI Dose-Delay Decision Lab',
    'Practice selecting TECVAYLI restart plans using the last administered dose and elapsed time in PI Section 2.4, Table 3.'
WHERE NOT EXISTS (
    SELECT 1 FROM scenarios
    WHERE title = 'TECVAYLI Dose-Delay Decision Lab'
);

UPDATE scenarios
SET
    source_url = 'https://www.jnjlabels.com/package-insert/product-monograph/prescribing-information/TECVAYLI-pi.pdf',
    source_label = 'TECVAYLI Prescribing Information',
    source_note = 'Use the March 2026 U.S. Prescribing Information, Section 2.4 and Table 3.',
    decision_lab = $lab$
{
  "title": "Choose the correct restart plan",
  "instructions": "Work through one case at a time. Compare the last administered dose and elapsed time with PI Table 3.",
  "cases": [
    {
      "id": "step-up-1-nine-days",
      "title": "Delay during initial step-up dosing",
      "lastDose": "Step-up dose 1 (0.06 mg/kg)",
      "elapsed": "9 days",
      "prompt": "Where should TECVAYLI restart?",
      "options": [
        {"id": "a", "text": "Continue with step-up dose 2"},
        {"id": "b", "text": "Restart at step-up dose 1 (0.06 mg/kg)"},
        {"id": "c", "text": "Begin the first treatment dose"}
      ],
      "correctOptionId": "b",
      "explanation": "When more than 7 days have passed after step-up dose 1, restart the step-up schedule at step-up dose 1 (0.06 mg/kg).",
      "reference": "PI Section 2.4, Table 3"
    },
    {
      "id": "step-up-2-fourteen-days",
      "title": "Moderate delay after step-up dose 2",
      "lastDose": "Step-up dose 2 (0.3 mg/kg)",
      "elapsed": "14 days",
      "prompt": "What is the next dose?",
      "options": [
        {"id": "a", "text": "Repeat step-up dose 2 (0.3 mg/kg), then continue the step-up schedule"},
        {"id": "b", "text": "Restart at step-up dose 1 in every case"},
        {"id": "c", "text": "Resume with a 1.5 mg/kg treatment dose"}
      ],
      "correctOptionId": "a",
      "explanation": "At 8 to 28 days after step-up dose 2, repeat step-up dose 2 (0.3 mg/kg) and continue the step-up schedule.",
      "reference": "PI Section 2.4, Table 3"
    },
    {
      "id": "weekly-thirty-five-days",
      "title": "Delay during weekly treatment",
      "lastDose": "Weekly treatment dose (1.5 mg/kg)",
      "elapsed": "35 days",
      "prompt": "Which restart plan applies?",
      "options": [
        {"id": "a", "text": "Continue directly with 1.5 mg/kg weekly"},
        {"id": "b", "text": "Restart at step-up dose 2 (0.3 mg/kg)"},
        {"id": "c", "text": "Permanently discontinue"}
      ],
      "correctOptionId": "b",
      "explanation": "At 29 to 56 days after a weekly treatment dose, restart at step-up dose 2 (0.3 mg/kg). Administer the indicated pretreatment and monitoring.",
      "reference": "PI Section 2.4, Table 3"
    },
    {
      "id": "weekly-sixty-days",
      "title": "Long delay during weekly treatment",
      "lastDose": "Weekly treatment dose (1.5 mg/kg)",
      "elapsed": "60 days",
      "prompt": "Which restart plan applies?",
      "options": [
        {"id": "a", "text": "Restart at step-up dose 1 (0.06 mg/kg)"},
        {"id": "b", "text": "Restart at step-up dose 2 (0.3 mg/kg)"},
        {"id": "c", "text": "Continue directly with the weekly treatment dose"}
      ],
      "correctOptionId": "a",
      "explanation": "When more than 56 days have passed after a weekly treatment dose, restart at step-up dose 1 (0.06 mg/kg).",
      "reference": "PI Section 2.4, Table 3"
    },
    {
      "id": "extended-schedule-eighty-days",
      "title": "Delay on an extended dosing schedule",
      "lastDose": "Any every-two-week or every-four-week treatment dose",
      "elapsed": "80 days",
      "prompt": "Where should TECVAYLI restart?",
      "options": [
        {"id": "a", "text": "Continue the previous extended schedule"},
        {"id": "b", "text": "Restart at step-up dose 2 (0.3 mg/kg)"},
        {"id": "c", "text": "Restart at step-up dose 1 (0.06 mg/kg)"}
      ],
      "correctOptionId": "b",
      "explanation": "At 64 to 112 days after an every-two-week or every-four-week treatment dose, restart at step-up dose 2 (0.3 mg/kg).",
      "reference": "PI Section 2.4, Table 3"
    }
  ]
}
$lab$::jsonb
WHERE title = 'TECVAYLI Dose-Delay Decision Lab';
