ALTER TABLE scenarios
    ADD COLUMN IF NOT EXISTS simulation_data JSONB NOT NULL DEFAULT '{}'::jsonb;

INSERT INTO scenarios (title, description)
SELECT
    'TECVAYLI Community Site Readiness Simulation',
    'Apply TECVAYLI Prescribing Information to assess a community oncology site, select pre-launch actions, and make a readiness decision.'
WHERE NOT EXISTS (
    SELECT 1 FROM scenarios
    WHERE title = 'TECVAYLI Community Site Readiness Simulation'
);

UPDATE scenarios
SET
    source_url = 'https://www.jnjlabels.com/package-insert/product-monograph/prescribing-information/TECVAYLI-pi.pdf',
    source_label = 'TECVAYLI Prescribing Information',
    source_note = 'Use the March 2026 U.S. Prescribing Information. Simulation feedback cites Sections 1-5.',
    simulation_data = $simulation$
{
  "title": "Community oncology launch assessment",
  "instructions": "Review the site profile, make each operational decision, select the required actions, and assign a readiness status.",
  "siteProfile": [
    "The site plans to treat an eligible adult patient using TECVAYLI monotherapy.",
    "The infusion center operates Monday through Friday and has no inpatient beds.",
    "The nearest affiliated hospital is 40 minutes away.",
    "Nursing staff have general infusion-reaction training but no documented TECVAYLI CRS or ICANS workflow.",
    "Pharmacy can receive refrigerated single-dose vials but has not completed a TECVAYLI preparation competency.",
    "The site has not assigned ownership for REMS verification or post-dose follow-up."
  ],
  "decisions": [
    {
      "id": "monitoring-plan",
      "prompt": "What is the main gap in the proposed step-up monitoring plan?",
      "options": [
        {"id": "a", "text": "No gap; routine infusion-center observation is sufficient"},
        {"id": "b", "text": "The site lacks a plan for 48-hour hospitalization after both step-up doses and proximity plus daily monitoring after the first treatment dose"},
        {"id": "c", "text": "The site needs 30 days of inpatient monitoring after every dose"}
      ],
      "correctOptionId": "b",
      "explanation": "The PI calls for 48-hour hospitalization after step-up doses 1 and 2, followed by proximity to a healthcare facility and daily monitoring for 48 hours after the first treatment dose.",
      "reference": "PI Section 2.1",
      "learningCardId": "dosing-schedules",
      "competency": "Monitoring readiness"
    },
    {
      "id": "safety-escalation",
      "prompt": "What should the MIL require before the first patient is scheduled?",
      "options": [
        {"id": "a", "text": "A documented CRS and neurologic-toxicity recognition, escalation, and transfer workflow"},
        {"id": "b", "text": "Only a general infusion-reaction handout"},
        {"id": "c", "text": "No additional process because the hospital is within driving distance"}
      ],
      "correctOptionId": "a",
      "explanation": "The boxed warning and Sections 5.1-5.2 require monitoring and severity-based management for CRS and neurologic toxicity, including ICANS.",
      "reference": "PI Sections 5.1-5.2",
      "learningCardId": "safety-readiness",
      "competency": "Safety escalation"
    },
    {
      "id": "rems-ownership",
      "prompt": "How should the unresolved REMS responsibility affect readiness?",
      "options": [
        {"id": "a", "text": "It can be assigned after treatment begins"},
        {"id": "b", "text": "It is a pre-launch gap because TECVAYLI is available only through the TECVAYLI and TALVEY REMS"},
        {"id": "c", "text": "REMS applies only to the patient, not the care setting"}
      ],
      "correctOptionId": "b",
      "explanation": "The site must address REMS requirements before treatment. The restricted program exists because of CRS and neurologic toxicity risks.",
      "reference": "PI Section 5.3",
      "learningCardId": "safety-readiness",
      "competency": "REMS readiness"
    },
    {
      "id": "pharmacy-readiness",
      "prompt": "Which pharmacy action best addresses the preparation gap?",
      "options": [
        {"id": "a", "text": "Use the same process as any intravenous product"},
        {"id": "b", "text": "Validate vial selection, weight-based preparation, ambient-temperature handling, gentle swirling, and subcutaneous handoff"},
        {"id": "c", "text": "Shake and warm each vial to speed preparation"}
      ],
      "correctOptionId": "b",
      "explanation": "Section 2.6 provides weight-based preparation instructions and directs ambient-temperature equilibration and gentle swirling without other warming or shaking.",
      "reference": "PI Sections 2.6 and 3",
      "learningCardId": "preparation-strengths",
      "competency": "Pharmacy readiness"
    },
    {
      "id": "dose-delay-process",
      "prompt": "Why should the site create a dose-delay decision process before launch?",
      "options": [
        {"id": "a", "text": "Every delayed dose automatically resumes at the previous dose"},
        {"id": "b", "text": "The restart dose depends on the last dose and elapsed time, with specified pretreatment and monitoring"},
        {"id": "c", "text": "Any delay permanently ends treatment"}
      ],
      "correctOptionId": "b",
      "explanation": "Table 3 uses the last administered dose and time since that dose to determine the restart point and related pretreatment and monitoring.",
      "reference": "PI Section 2.4, Table 3",
      "learningCardId": "dose-delays",
      "competency": "Continuity of treatment"
    }
  ],
  "checklist": [
    {"id": "hospital-plan", "label": "Confirm an inpatient plan for the required step-up-dose monitoring", "required": true, "reference": "PI Section 2.1"},
    {"id": "escalation-workflow", "label": "Approve CRS and neurologic-toxicity escalation and transfer workflows", "required": true, "reference": "PI Sections 5.1-5.2"},
    {"id": "rems-owner", "label": "Assign and verify REMS responsibilities", "required": true, "reference": "PI Section 5.3"},
    {"id": "pharmacy-competency", "label": "Complete pharmacy preparation and administration competency", "required": true, "reference": "PI Sections 2.6 and 3"},
    {"id": "follow-up-owner", "label": "Assign post-dose monitoring and patient follow-up ownership", "required": true, "reference": "PI Section 2.1"},
    {"id": "delay-workflow", "label": "Add a PI-based dose-delay restart workflow", "required": true, "reference": "PI Section 2.4"},
    {"id": "increase-dose", "label": "Increase the first treatment dose to compensate for monitoring limitations", "required": false, "reference": "PI Section 2.2"}
  ],
  "readiness": {
    "prompt": "What is this site's current readiness status?",
    "options": [
      {"id": "ready", "text": "Ready to launch now"},
      {"id": "conditional", "text": "Conditionally ready after the identified actions are completed and verified"},
      {"id": "never", "text": "Permanently unsuitable for TECVAYLI treatment"}
    ],
    "correctOptionId": "conditional"
  }
}
$simulation$::jsonb
WHERE title = 'TECVAYLI Community Site Readiness Simulation';
