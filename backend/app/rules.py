RISK_ORDER = ["minimal", "limited", "high", "prohibited"]

#"not sure" is treated like "yes" on purpose: we surface potential risk rather than hide it
TRIGGERING_ANSWERS = ("yes", "not_sure")

#the questionnaire
QUESTIONS = [
    {
        "id": "q1",
        "text": "Do employees use general AI tools (ChatGPT, Copilot, Gemini) at work?",
        "help": "Even informal use counts.",
        "area": "General AI tools",
        "risk": "minimal",
    },
    {
        "id": "q2",
        "text": "Do you use a customer-facing chatbot?",
        "help": "A bot that talks to your users/customers.",
        "area": "Customer-facing chatbot",
        "risk": "limited",
    },
    {
        "id": "q3",
        "text": "Do you publish AI-generated content (text, images, video)?",
        "help": "Content created or heavily edited by AI.",
        "area": "AI-generated content",
        "risk": "limited",
    },
    {
        "id": "q4",
        "text": "Does AI help select or screen job candidates?",
        "help": "e.g. CV filtering, ranking applicants.",
        "area": "AI in hiring / candidate screening",
        "risk": "high",
    },
    {
        "id": "q5",
        "text": "Does AI assess customers for creditworthiness or access to essential services?",
        "help": "e.g. scoring who gets a loan/service.",
        "area": "AI for creditworthiness / essential services",
        "risk": "high",
    },
    {
        "id": "q6",
        "text": "Do you use AI to grade, score, or assess people (e.g. in education)?",
        "help": "Exams, evaluations, eligibility scoring.",
        "area": "AI grading / assessment of people",
        "risk": "high",
    },
    {
        "id": "q7",
        "text": "Do you use facial recognition or biometric identification of people?",
        "help": "Identifying people by face/fingerprint etc.",
        "area": "Facial recognition / biometric identification",
        "risk": "prohibited",
    },
    {
        "id": "q8",
        "text": "Does AI control critical infrastructure (power, water, transport)?",
        "help": "Safety-critical systems.",
        "area": "AI in critical infrastructure",
        "risk": "high",
    },
]

OBLIGATIONS = {
    "prohibited": [
        "Do not deploy this system until you have legal confirmation it is allowed.",
        "Consult a lawyer specialised in the EU AI Act — some biometric uses are banned.",
    ],
    "high": [
        "Complete a conformity assessment before the system goes live.",
        "Keep technical documentation describing the system and its risks.",
        "Ensure meaningful human oversight of the AI's decisions.",
        "Register the system in the EU database where required.",
        "Deadline: be ready by 2 August 2026.",
    ],
    "limited": [
        "Clearly tell users when they are interacting with AI (e.g. label the chatbot).",
        "Label AI-generated content as AI-generated.",
    ],
    "minimal": [
        "No specific obligations, but follow the general duties below.",
    ],
}

GENERAL_OBLIGATIONS = [
    "Provide AI literacy training so staff understand AI's risks and limits — "
    "a legal obligation under Article 4 (in force since Feb 2025).",
    "Recommended good practice: maintain an inventory of all AI tools used across "
    "the company. This is the practical basis for every other obligation, though "
    "not itself a standalone legal requirement.",
]

NO_AI_MESSAGE = (
    "No EU AI Act obligations identified right now. Re-check whenever you adopt new tools."
)

DISCLAIMER = "This is an informational self-assessment, not legal advice."

def _highest_risk(risks):
    for tier in reversed(RISK_ORDER):  #prohibited -> high -> limited -> minimal
        if tier in risks:
            return tier
    return "none"

def assess(answers):
    systems = []
    triggered_risks = set()

    for question in QUESTIONS:
        answer = answers.get(question["id"], "no")
        if answer in TRIGGERING_ANSWERS:
            risk = question["risk"]
            triggered_risks.add(risk)
            systems.append(
                {
                    "id": question["id"],
                    "area": question["area"],
                    "answer": answer,
                    "risk": risk,
                    "obligations": OBLIGATIONS[risk],
                }
            )

    if not systems:
        return {
            "overall_risk": "none",
            "systems": [],
            "general_obligations": [],
            "no_ai_message": NO_AI_MESSAGE,
            "disclaimer": DISCLAIMER,
        }

    return {
        "overall_risk": _highest_risk(triggered_risks),
        "systems": systems,
        "general_obligations": GENERAL_OBLIGATIONS,
        "no_ai_message": None,
        "disclaimer": DISCLAIMER,
    }

def public_questions():
    return [
        {"id": q["id"], "text": q["text"], "help": q["help"]} for q in QUESTIONS
    ]
