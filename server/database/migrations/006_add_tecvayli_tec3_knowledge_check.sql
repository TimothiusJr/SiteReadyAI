ALTER TABLE scenarios
    ADD COLUMN IF NOT EXISTS source_url TEXT,
    ADD COLUMN IF NOT EXISTS source_label VARCHAR(255),
    ADD COLUMN IF NOT EXISTS source_note TEXT,
    ADD COLUMN IF NOT EXISTS quiz_questions JSONB NOT NULL DEFAULT '[]'::jsonb;

INSERT INTO scenarios (title, description)
SELECT
    'TECVAYLI TEC3 Prescribing Information Challenge',
    'Test your ability to respond to medical-information questions using TECVAYLI Prescribing Information Sections 1 through 5.'
WHERE NOT EXISTS (
    SELECT 1
    FROM scenarios
    WHERE title = 'TECVAYLI TEC3 Prescribing Information Challenge'
);

UPDATE scenarios
SET
    source_url = 'https://www.jnjlabels.com/package-insert/product-monograph/prescribing-information/TECVAYLI-pi.pdf',
    source_label = 'TECVAYLI Prescribing Information',
    source_note = 'Use the March 2026 U.S. Prescribing Information. This challenge is limited to Sections 1–5.',
    quiz_questions = $quiz$
[
  {
    "id": "indication-combination",
    "question": "Which patient meets the labeled indication for TECVAYLI in combination with daratumumab and hyaluronidase-fihj?",
    "options": [
      {"id": "a", "text": "A newly diagnosed pediatric patient"},
      {"id": "b", "text": "An adult with relapsed or refractory multiple myeloma after at least one prior line containing a proteasome inhibitor and an immunomodulatory agent"},
      {"id": "c", "text": "An adult with newly diagnosed multiple myeloma and no prior treatment"},
      {"id": "d", "text": "Any adult with a hematologic malignancy"}
    ],
    "correctOptionId": "b",
    "explanation": "The combination indication covers adults with relapsed or refractory multiple myeloma after at least one prior line that included a proteasome inhibitor and an immunomodulatory agent.",
    "reference": "PI Section 1"
  },
  {
    "id": "indication-monotherapy",
    "question": "Which treatment history meets the labeled TECVAYLI monotherapy indication?",
    "options": [
      {"id": "a", "text": "At least one prior line of any therapy"},
      {"id": "b", "text": "At least two prior lines containing only corticosteroids"},
      {"id": "c", "text": "At least four prior lines containing a proteasome inhibitor, an immunomodulatory agent, and an anti-CD38 monoclonal antibody"},
      {"id": "d", "text": "No prior therapy"}
    ],
    "correctOptionId": "c",
    "explanation": "The monotherapy indication requires at least four prior lines, including a proteasome inhibitor, an immunomodulatory agent, and an anti-CD38 monoclonal antibody.",
    "reference": "PI Section 1"
  },
  {
    "id": "route",
    "question": "How must TECVAYLI be administered?",
    "options": [
      {"id": "a", "text": "Intravenously"},
      {"id": "b", "text": "Intramuscularly"},
      {"id": "c", "text": "Subcutaneously"},
      {"id": "d", "text": "Orally"}
    ],
    "correctOptionId": "c",
    "explanation": "TECVAYLI is for subcutaneous injection only and must be administered by a healthcare provider.",
    "reference": "PI Sections 2.1 and 2.6"
  },
  {
    "id": "step-up-monitoring",
    "question": "Which monitoring plan matches the PI during the TECVAYLI step-up dosing schedule?",
    "options": [
      {"id": "a", "text": "One hour of outpatient observation after every dose"},
      {"id": "b", "text": "Hospitalization for 48 hours after step-up doses 1 and 2, then proximity to a healthcare facility and daily monitoring for 48 hours after the first treatment dose"},
      {"id": "c", "text": "Hospitalization only after the first treatment dose"},
      {"id": "d", "text": "No monitoring unless symptoms develop"}
    ],
    "correctOptionId": "b",
    "explanation": "The PI calls for 48-hour hospitalization after both step-up doses and proximity to a healthcare facility with daily monitoring for 48 hours after the first treatment dose.",
    "reference": "PI Section 2.1"
  },
  {
    "id": "monotherapy-schedule",
    "question": "Which sequence is the recommended TECVAYLI monotherapy step-up schedule?",
    "options": [
      {"id": "a", "text": "Day 1: 0.06 mg/kg; Day 4: 0.3 mg/kg; Day 7: 1.5 mg/kg"},
      {"id": "b", "text": "Day 1: 0.3 mg/kg; Day 2: 0.6 mg/kg; Day 3: 1.5 mg/kg"},
      {"id": "c", "text": "Day 1: 1.5 mg/kg; Day 4: 0.3 mg/kg; Day 7: 0.06 mg/kg"},
      {"id": "d", "text": "Day 1: 3 mg/kg followed by monthly treatment"}
    ],
    "correctOptionId": "a",
    "explanation": "The monotherapy schedule uses 0.06 mg/kg on Day 1, 0.3 mg/kg on Day 4, and the first 1.5 mg/kg treatment dose on Day 7, subject to the timing allowances in the PI.",
    "reference": "PI Section 2.2, Table 2"
  },
  {
    "id": "pretreatment",
    "question": "Which medications are recommended 1 to 3 hours before each dose in the TECVAYLI step-up dosing schedule?",
    "options": [
      {"id": "a", "text": "Dexamethasone, an H1-receptor antagonist, and acetaminophen"},
      {"id": "b", "text": "Aspirin, an antibiotic, and an anticoagulant"},
      {"id": "c", "text": "Dexamethasone only"},
      {"id": "d", "text": "Acetaminophen and an antiviral only"}
    ],
    "correctOptionId": "a",
    "explanation": "Recommended pretreatment consists of dexamethasone 16 mg, diphenhydramine 50 mg or equivalent, and acetaminophen 650 to 1,000 mg.",
    "reference": "PI Section 2.3"
  },
  {
    "id": "dose-reductions",
    "question": "Which statement about TECVAYLI dosage modification matches the PI?",
    "options": [
      {"id": "a", "text": "Reduce every subsequent dose by 50% after toxicity"},
      {"id": "b", "text": "Dosage reductions are not recommended; dosage delays or permanent discontinuation may be required"},
      {"id": "c", "text": "Continue treatment without modification for all toxicities"},
      {"id": "d", "text": "Change to intravenous administration after toxicity"}
    ],
    "correctOptionId": "b",
    "explanation": "The PI does not recommend TECVAYLI dosage reductions. Toxicities may require withholding treatment or permanent discontinuation based on the reaction and severity.",
    "reference": "PI Section 2.5"
  },
  {
    "id": "strengths",
    "question": "Which TECVAYLI dosage forms and strengths are available?",
    "options": [
      {"id": "a", "text": "30 mg/3 mL and 153 mg/1.7 mL single-dose vials"},
      {"id": "b", "text": "10 mg and 50 mg tablets"},
      {"id": "c", "text": "30 mg/mL multidose vial only"},
      {"id": "d", "text": "100 mg/10 mL infusion bag"}
    ],
    "correctOptionId": "a",
    "explanation": "TECVAYLI is supplied as 30 mg/3 mL (10 mg/mL) and 153 mg/1.7 mL (90 mg/mL) single-dose vials.",
    "reference": "PI Section 3"
  },
  {
    "id": "contraindications",
    "question": "What contraindications are listed for TECVAYLI?",
    "options": [
      {"id": "a", "text": "Severe renal impairment"},
      {"id": "b", "text": "Previous anti-CD38 therapy"},
      {"id": "c", "text": "Pregnancy"},
      {"id": "d", "text": "None"}
    ],
    "correctOptionId": "d",
    "explanation": "The TECVAYLI PI lists no contraindications.",
    "reference": "PI Section 4"
  },
  {
    "id": "suspected-crs",
    "question": "What action should be taken when cytokine release syndrome is suspected?",
    "options": [
      {"id": "a", "text": "Increase the TECVAYLI dose"},
      {"id": "b", "text": "Withhold TECVAYLI until CRS resolves and evaluate other causes of fever, hypoxia, and hypotension"},
      {"id": "c", "text": "Permanently discontinue TECVAYLI in every case"},
      {"id": "d", "text": "Continue treatment and reassess at the next visit"}
    ],
    "correctOptionId": "b",
    "explanation": "If CRS is suspected, withhold TECVAYLI until it resolves, evaluate other causes of the presentation, and manage based on severity.",
    "reference": "PI Sections 2.5 and 5.1"
  },
  {
    "id": "neurologic-toxicity",
    "question": "Which response aligns with the PI when neurologic toxicity or ICANS occurs?",
    "options": [
      {"id": "a", "text": "Continue TECVAYLI without further assessment"},
      {"id": "b", "text": "Withhold TECVAYLI until toxicity resolves or permanently discontinue based on severity"},
      {"id": "c", "text": "Reduce the dose by 25%"},
      {"id": "d", "text": "Replace TECVAYLI with an intravenous formulation"}
    ],
    "correctOptionId": "b",
    "explanation": "The PI directs clinicians to monitor for neurologic toxicity and to withhold TECVAYLI until resolution or permanently discontinue it based on severity.",
    "reference": "PI Sections 2.5 and 5.2"
  },
  {
    "id": "rems",
    "question": "Why is TECVAYLI available only through the TECVAYLI and TALVEY REMS?",
    "options": [
      {"id": "a", "text": "Risk of renal failure"},
      {"id": "b", "text": "Risk of CRS and neurologic toxicity, including ICANS"},
      {"id": "c", "text": "Risk of alopecia"},
      {"id": "d", "text": "Risk of hypertension alone"}
    ],
    "correctOptionId": "b",
    "explanation": "The restricted REMS addresses the risks of CRS and neurologic toxicity, including ICANS.",
    "reference": "PI Section 5.3"
  },
  {
    "id": "active-infection",
    "question": "What does the PI direct for a patient with an active infection during the step-up dosing schedule?",
    "options": [
      {"id": "a", "text": "Continue TECVAYLI at the same dose"},
      {"id": "b", "text": "Withhold TECVAYLI"},
      {"id": "c", "text": "Reduce the TECVAYLI dose by half"},
      {"id": "d", "text": "Continue after administering acetaminophen"}
    ],
    "correctOptionId": "b",
    "explanation": "TECVAYLI should be withheld in patients with an active infection during the step-up dosing schedule.",
    "reference": "PI Sections 2.5 and 5.5"
  },
  {
    "id": "laboratory-monitoring",
    "question": "Which laboratory monitoring is specifically recommended for TECVAYLI-associated risks?",
    "options": [
      {"id": "a", "text": "CBC at baseline and periodically, plus liver enzymes and bilirubin at baseline and during treatment as clinically indicated"},
      {"id": "b", "text": "Urinalysis only"},
      {"id": "c", "text": "Thyroid testing before every dose"},
      {"id": "d", "text": "No baseline laboratory testing"}
    ],
    "correctOptionId": "a",
    "explanation": "The PI calls for baseline and periodic CBC monitoring and liver-enzyme and bilirubin monitoring at baseline and during treatment as clinically indicated.",
    "reference": "PI Sections 5.4 and 5.6"
  },
  {
    "id": "preparation",
    "question": "Which TECVAYLI preparation instruction is correct?",
    "options": [
      {"id": "a", "text": "Shake the vial vigorously"},
      {"id": "b", "text": "Warm the vial using a microwave"},
      {"id": "c", "text": "Allow the vial to reach ambient temperature for at least 15 minutes, then gently swirl it for about 10 seconds"},
      {"id": "d", "text": "Mix it with another medication in the same syringe"}
    ],
    "correctOptionId": "c",
    "explanation": "After removal from refrigerated storage, the vial should equilibrate to ambient temperature for at least 15 minutes and then be gently swirled for about 10 seconds. It should not be warmed another way or shaken.",
    "reference": "PI Section 2.6"
  }
]
$quiz$::jsonb
WHERE title = 'TECVAYLI TEC3 Prescribing Information Challenge';
