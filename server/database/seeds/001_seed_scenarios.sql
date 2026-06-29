INSERT INTO scenarios (title, description)
VALUES
    (
        'Community Oncology Site Readiness',
        'A community oncology practice wants to begin outpatient bispecific step-up dosing.'
    ),
    (
        'Academic Medical Center Launch',
        'A large academic center is preparing to launch a new oncology therapy.'
    );

INSERT INTO scenario_details (scenario_id, detail_text)
VALUES
    (1, '2 oncologists'),
    (1, '4 infusion chairs'),
    (1, 'Limited nursing staff'),
    (1, 'No weekend monitoring'),
    (1, 'No formal CRS escalation protocol'),
    (1, 'Nearest hospital is 40 minutes away'),
    (2, 'Large multidisciplinary care team'),
    (2, 'Established pharmacy workflow'),
    (2, 'High patient volume'),
    (2, 'Multiple internal approval steps');

INSERT INTO scenario_questions (scenario_id, question_text)
VALUES
    (1, 'What barriers do you identify?'),
    (1, 'Is this site ready? Why or why not?'),
    (1, 'What action plan would you recommend?'),
    (2, 'What launch risks should be considered?'),
    (2, 'Which stakeholders should be aligned?'),
    (2, 'What implementation plan would you recommend?');