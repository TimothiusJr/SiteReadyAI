ALTER TABLE scenarios
    ADD COLUMN IF NOT EXISTS learning_cards JSONB NOT NULL DEFAULT '[]'::jsonb;

UPDATE scenarios
SET learning_cards = $cards$
[
  {
    "id": "indications",
    "section": "PI Section 1",
    "title": "Indications and patient fit",
    "summary": "TECVAYLI has separate labeled populations for combination treatment and monotherapy in adults with relapsed or refractory multiple myeloma.",
    "keyPoints": [
      "Combination with daratumumab and hyaluronidase-fihj: at least one prior line including a proteasome inhibitor and an immunomodulatory agent.",
      "Monotherapy: at least four prior lines including a proteasome inhibitor, an immunomodulatory agent, and an anti-CD38 monoclonal antibody."
    ],
    "milApplication": "Confirm that site education separates the combination and monotherapy indications so staff do not apply one treatment history requirement to the other.",
    "reference": "PI Section 1"
  },
  {
    "id": "dosing-schedules",
    "section": "PI Sections 2.1-2.3",
    "title": "Step-up dosing and monitoring",
    "summary": "TECVAYLI uses a subcutaneous step-up schedule, pretreatment, and defined monitoring to reduce the incidence and severity of CRS.",
    "keyPoints": [
      "Pretreatment is given 1 to 3 hours before step-up dose 1, step-up dose 2, and the first treatment dose.",
      "Patients should be hospitalized for 48 hours after step-up doses 1 and 2.",
      "After the first treatment dose, patients should remain near a healthcare facility and be monitored daily for 48 hours."
    ],
    "milApplication": "Ask the site to map hospitalization, nearby-facility access, daily monitoring, and pretreatment ownership before the first patient is scheduled.",
    "reference": "PI Sections 2.1-2.3"
  },
  {
    "id": "combination-schedule",
    "section": "PI Section 2.2, Table 1",
    "title": "Combination dosing timeline",
    "summary": "The combination regimen changes dose and frequency across the step-up, weekly, every-two-week, and every-four-week phases.",
    "keyPoints": [
      "Day 0: daratumumab and hyaluronidase-fihj; Day 1: TECVAYLI 0.06 mg/kg; Day 3: 0.3 mg/kg; Day 7: 1.5 mg/kg.",
      "Weeks 2-8: TECVAYLI 1.5 mg/kg weekly.",
      "Weeks 9-24: 3 mg/kg every two weeks; Week 25 onward: 3 mg/kg every four weeks."
    ],
    "milApplication": "Use the timeline to test scheduling templates and confirm that staff can distinguish TECVAYLI timing from the concomitant therapy schedule.",
    "reference": "PI Section 2.2, Table 1"
  },
  {
    "id": "dose-delays",
    "section": "PI Section 2.4, Table 3",
    "title": "Restarting after a dose delay",
    "summary": "The restart point depends on the last administered dose and the elapsed time since that dose.",
    "keyPoints": [
      "A weekly treatment dose delayed 29 to 56 days restarts at step-up dose 2 (0.3 mg/kg).",
      "A weekly treatment dose delayed more than 56 days restarts at step-up dose 1 (0.06 mg/kg).",
      "Restarted step-up doses require the indicated pretreatment and monitoring; Table 3 also calls for benefit-risk consideration for specified longer delays."
    ],
    "milApplication": "Check that the site has a dose-delay escalation path and uses the PI table before rescheduling rather than resuming from memory.",
    "reference": "PI Section 2.4, Table 3"
  },
  {
    "id": "preparation-strengths",
    "section": "PI Sections 2.6 and 3",
    "title": "Preparation, administration, and strengths",
    "summary": "TECVAYLI is supplied in two single-dose vial strengths and is prepared for subcutaneous administration using weight-based tables.",
    "keyPoints": [
      "Available vials: 30 mg/3 mL (10 mg/mL) and 153 mg/1.7 mL (90 mg/mL).",
      "Allow the vial to reach ambient temperature for at least 15 minutes, then gently swirl for about 10 seconds.",
      "Do not warm the vial by another method, shake it, or mix it with another medication in the same syringe."
    ],
    "milApplication": "Review pharmacy storage, vial selection, preparation space, independent checks, and handoff to the administering clinician.",
    "reference": "PI Sections 2.6 and 3"
  },
  {
    "id": "contraindications",
    "section": "PI Section 4",
    "title": "Contraindications",
    "summary": "The TECVAYLI Prescribing Information lists no contraindications.",
    "keyPoints": [
      "A lack of listed contraindications does not replace patient assessment.",
      "Warnings, precautions, infections, laboratory findings, pregnancy status, and treatment history still inform care."
    ],
    "milApplication": "Help the site distinguish a formal contraindication from a warning, precaution, temporary hold, or reason for benefit-risk review.",
    "reference": "PI Section 4"
  },
  {
    "id": "safety-readiness",
    "section": "PI Sections 5.1-5.6",
    "title": "Safety and REMS readiness",
    "summary": "Site readiness includes recognition and management of CRS, neurologic toxicity including ICANS, hepatotoxicity, infections, and neutropenia, plus REMS compliance.",
    "keyPoints": [
      "Withhold TECVAYLI until suspected CRS or neurologic toxicity resolves, or permanently discontinue based on severity.",
      "TECVAYLI is available only through the TECVAYLI and TALVEY REMS because of CRS and neurologic toxicity risks.",
      "Monitor liver tests, bilirubin, and complete blood counts as directed in the PI; monitor for infection and withhold treatment in specified situations."
    ],
    "milApplication": "Ask the site to identify emergency escalation, REMS roles, laboratory review ownership, infection procedures, and access to supportive care.",
    "reference": "PI Sections 5.1-5.6"
  },
  {
    "id": "administration-pregnancy",
    "section": "PI Sections 5.7-5.8",
    "title": "Administration reactions and fetal risk",
    "summary": "TECVAYLI can cause systemic administration-related reactions, local injection-site reactions, and fetal harm.",
    "keyPoints": [
      "Withhold TECVAYLI or consider permanent discontinuation for administration reactions based on severity.",
      "Advise pregnant patients of potential fetal risk.",
      "Females of reproductive potential should use effective contraception during treatment and for 5 months after the last dose."
    ],
    "milApplication": "Confirm that site workflows cover reaction assessment, pregnancy-status verification, counseling, and documentation before treatment.",
    "reference": "PI Sections 5.7-5.8"
  }
]
$cards$::jsonb
WHERE title = 'TECVAYLI TEC3 Prescribing Information Challenge';

UPDATE scenarios
SET quiz_questions = COALESCE(
    (
        SELECT jsonb_agg(
            question || jsonb_build_object(
                'learningCardId',
                CASE
                    WHEN question->>'id' LIKE 'indication-%' THEN 'indications'
                    WHEN question->>'id' IN ('route', 'step-up-monitoring', 'monotherapy-schedule', 'pretreatment') THEN 'dosing-schedules'
                    WHEN question->>'id' = 'dose-reductions' THEN 'dose-delays'
                    WHEN question->>'id' IN ('strengths', 'preparation') THEN 'preparation-strengths'
                    WHEN question->>'id' = 'contraindications' THEN 'contraindications'
                    ELSE 'safety-readiness'
                END,
                'competency',
                CASE
                    WHEN question->>'id' LIKE 'indication-%' THEN 'Indications'
                    WHEN question->>'id' IN ('route', 'step-up-monitoring', 'monotherapy-schedule', 'pretreatment', 'dose-reductions', 'preparation') THEN 'Dosing and administration'
                    WHEN question->>'id' = 'strengths' THEN 'Dosage forms and strengths'
                    WHEN question->>'id' = 'contraindications' THEN 'Contraindications'
                    ELSE 'Warnings and precautions'
                END
            )
        )
        FROM jsonb_array_elements(quiz_questions) AS items(question)
    ),
    '[]'::jsonb
)
WHERE title = 'TECVAYLI TEC3 Prescribing Information Challenge';

UPDATE scenarios
SET quiz_questions = quiz_questions || $questions$
[
  {
    "id": "combination-dose-timeline",
    "question": "Which sequence matches the TECVAYLI combination dosing schedule after step-up dosing?",
    "options": [
      {"id": "a", "text": "1.5 mg/kg weekly for Weeks 2-8, 3 mg/kg every two weeks for Weeks 9-24, then 3 mg/kg every four weeks from Week 25"},
      {"id": "b", "text": "1.5 mg/kg every four weeks from Week 2 onward"},
      {"id": "c", "text": "3 mg/kg weekly for Weeks 2-24, then stop treatment"},
      {"id": "d", "text": "0.3 mg/kg every two weeks for all subsequent doses"}
    ],
    "correctOptionId": "a",
    "explanation": "In combination, TECVAYLI is given at 1.5 mg/kg weekly during Weeks 2-8, 3 mg/kg every two weeks during Weeks 9-24, and 3 mg/kg every four weeks from Week 25 onward.",
    "reference": "PI Section 2.2, Table 1",
    "learningCardId": "combination-schedule",
    "competency": "Dosing and administration"
  },
  {
    "id": "weekly-dose-delay-restart",
    "question": "A patient receiving weekly TECVAYLI has gone 35 days since the last treatment dose. According to Table 3, where should therapy restart?",
    "options": [
      {"id": "a", "text": "Continue directly with 1.5 mg/kg once weekly"},
      {"id": "b", "text": "Restart at step-up dose 2 (0.3 mg/kg), with the indicated pretreatment and monitoring"},
      {"id": "c", "text": "Restart at step-up dose 1 (0.06 mg/kg) in every case"},
      {"id": "d", "text": "Permanently discontinue TECVAYLI"}
    ],
    "correctOptionId": "b",
    "explanation": "For a weekly treatment dose delayed 29 to 56 days, Table 3 directs restarting at step-up dose 2 (0.3 mg/kg). The indicated pretreatment and monitoring apply.",
    "reference": "PI Section 2.4, Table 3",
    "learningCardId": "dose-delays",
    "competency": "Dosing and administration"
  },
  {
    "id": "administration-reactions",
    "question": "Which statement reflects the PI guidance for TECVAYLI administration reactions?",
    "options": [
      {"id": "a", "text": "Only systemic reactions can occur"},
      {"id": "b", "text": "Only local injection-site reactions can occur"},
      {"id": "c", "text": "Systemic and local injection-site reactions can occur; withhold or consider permanent discontinuation based on severity"},
      {"id": "d", "text": "Administration reactions require an automatic 50% dose reduction"}
    ],
    "correctOptionId": "c",
    "explanation": "TECVAYLI can cause systemic administration-related reactions and local injection-site reactions. The PI directs withholding or considering permanent discontinuation based on severity.",
    "reference": "PI Section 5.7",
    "learningCardId": "administration-pregnancy",
    "competency": "Warnings and precautions"
  },
  {
    "id": "embryo-fetal-risk",
    "question": "What counseling does the PI provide for females of reproductive potential receiving TECVAYLI?",
    "options": [
      {"id": "a", "text": "Use effective contraception only during the step-up schedule"},
      {"id": "b", "text": "Use effective contraception during treatment and for 5 months after the last dose"},
      {"id": "c", "text": "No contraception guidance is provided"},
      {"id": "d", "text": "Use effective contraception for 30 days after the first dose"}
    ],
    "correctOptionId": "b",
    "explanation": "Because TECVAYLI may cause fetal harm, females of reproductive potential should use effective contraception during treatment and for 5 months after the last dose.",
    "reference": "PI Section 5.8",
    "learningCardId": "administration-pregnancy",
    "competency": "Warnings and precautions"
  }
]
$questions$::jsonb
WHERE title = 'TECVAYLI TEC3 Prescribing Information Challenge'
  AND NOT quiz_questions @> '[{"id":"combination-dose-timeline"}]'::jsonb;
