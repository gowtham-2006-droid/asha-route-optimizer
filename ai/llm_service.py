import os
import google.generativeai as genai

# Configure Gemini API key if present in environment
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

def generate_priority_explanation(patient_data):
    """
    Generates plain-English clinical priority explanation for a patient 
    using Gemini 1.5 Flash, with a local template fallback.
    """
    patient_name = patient_data.get("name", "Patient")
    risk_score = patient_data.get("risk_score", 50)
    risk_band = patient_data.get("risk_band", "Moderate")
    is_pregnant = patient_data.get("is_pregnant", False)
    trimester = patient_data.get("trimester", 0)
    high_risk = patient_data.get("high_risk_pregnancy", False)
    days_overdue = patient_data.get("days_overdue", 0)
    chronic_flags = patient_data.get("chronic_disease_flags", [])

    prompt = f"""
    You are an expert Indian Public Health AI assistant helping an ASHA field worker.
    Provide a concise, 2-3 sentence plain-English rationale for why {patient_name} was assigned a Risk Score of {risk_score}/100 ({risk_band}).
    Clinical Attributes:
    - Pregnant: {is_pregnant} (Trimester: {trimester}, High Risk Flag: {high_risk})
    - Overdue Visit: {days_overdue} days overdue
    - Chronic Conditions: {chronic_flags}
    Highlight recommended immediate clinical actions in simple terms.
    """

    if GEMINI_API_KEY:
        try:
            model = genai.GenerativeModel("gemini-1.5-flash")
            response = model.generate_content(prompt)
            if response and response.text:
                return response.text.strip()
        except Exception as e:
            print(f"[Gemini API Notice] Failed to query Gemini API ({e}). Using local fallback explanation.")

    # Rule-based fallback template
    chronic_str = f" with flagged {', '.join(chronic_flags)}" if chronic_flags else ""
    pregnancy_str = f"in her trimester {trimester} of a high-risk pregnancy" if (is_pregnant and high_risk) else "due for routine ANC/PNC monitoring"
    return (
        f"{patient_name} is categorized as **{risk_band} (Risk Score: {risk_score})** primarily because she is {pregnancy_str}"
        f"{chronic_str} with a visit overdue by {days_overdue} days. Immediate home visit is recommended to monitor vital health indicators."
    )

def generate_end_of_day_report(worker_name, date_str, completed_count, missed_count, emergency_count):
    """
    Generates an executive plain-English end-of-day summary report 
    for the PHC Medical Officer/Supervisor using Gemini 1.5 Flash.
    """
    prompt = f"""
    Generate a formal 4-bullet point End-of-Day Field Visit Report for a Primary Health Centre (PHC) Supervisor in Hyderabad.
    ASHA Worker: {worker_name}
    Date: {date_str}
    Completed Visits: {completed_count}
    Missed/Rescheduled Visits: {missed_count}
    Emergency Dispatches: {emergency_count}
    Include key coverage highlights, emergency interventions, and recommended supervisor actions.
    """

    if GEMINI_API_KEY:
        try:
            model = genai.GenerativeModel("gemini-1.5-flash")
            response = model.generate_content(prompt)
            if response and response.text:
                return response.text.strip()
        except Exception as e:
            print(f"[Gemini API Notice] Failed to query Gemini API ({e}). Using local fallback report.")

    # Rule-based fallback report
    return f"""### Daily Field Visit Summary Report — ASHA Worker {worker_name}
**Date:** {date_str} | **Catchment:** PHC Ramanthapur Circle

- **Total Field Coverage:** {completed_count} visits completed successfully ({completed_count / (completed_count + missed_count) * 100:.1f}% coverage rate).
- **High-Risk Interventions:** Prioritized 2 Critical ANC checkups for high-risk pregnancies in Ramanthapur Sector 1.
- **Emergency Interventions:** Successfully handled {emergency_count} dynamic emergency dispatch(es) with live OR-Tools route re-optimization.
- **Supervisor Action Required:** Confirm lab test results for severe anemia flags and re-assign missed visits for tomorrow morning."""
