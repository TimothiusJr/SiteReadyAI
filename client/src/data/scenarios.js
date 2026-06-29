export const scenarios = [
    {
        id: 1,
        title: 'Community Oncology Site Readiness',
        description:
            'A community oncology practice wants to begin outpatient bispecific step-up dosing.',

        siteDetails: [
            '2 oncologists',
            '4 infusion chairs',
            'Limited nursing staff',
            'No weekend monitoring',
            'No formal CRS escalation protocol',
            'Nearest hospital is 40 minutes away',
        ],

        questions: [
            'What barriers do you identify?',
            'Is this site ready? Why or why not?',
            'What action plan would you recommend?',
        ],
    },

    {
        id: 2,
        title: 'Bispecific Step-Up Dosing Preparation',

        description:
            'Assess whether a community practice is prepared to safely implement bispecific step-up dosing.',

        siteDetails: [
            'Pharmacy has limited experience',
            'CRS protocol drafted but not approved',
            'Infusion center open Monday-Friday',
            'Emergency Department nearby',
        ],

        questions: [
            'What implementation risks exist?',
            'Which stakeholders should be involved?',
            'What would you recommend before launch?',
        ],
    },

    {
        id: 3,
        title: 'Stakeholder Alignment',

        description:
            'Several departments disagree on implementation priorities for a new therapy.',

        siteDetails: [
            'Pharmacy concerned about staffing',
            'Nursing requests additional training',
            'Leadership wants rapid implementation',
            'Practice manager concerned about scheduling',
        ],

        questions: [
            'What barriers do you identify?',
            'Who should be engaged first?',
            'How would you build consensus?',
        ],
    },
]