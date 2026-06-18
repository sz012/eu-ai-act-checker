from datetime import date
from io import BytesIO
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm
from reportlab.platypus import (
    ListFlowable,
    ListItem,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

RISK_LABEL = {
    "prohibited": "Potentially prohibited",
    "high": "High risk",
    "limited": "Limited risk",
    "minimal": "Minimal risk",
    "none": "No AI systems found",
}

def build_pdf(result):
    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=A4, title="EU AI Act self-assessment")
    styles = getSampleStyleSheet()
    story = []

    story.append(Paragraph("EU AI Act self-assessment report", styles["Title"]))
    story.append(Paragraph(f"Generated on {date.today().isoformat()}", styles["Normal"]))
    story.append(Spacer(1, 0.5 * cm))

    overall = RISK_LABEL.get(result["overall_risk"], result["overall_risk"])
    story.append(Paragraph(f"<b>Overall risk level:</b> {overall}", styles["Normal"]))
    story.append(Spacer(1, 0.5 * cm))

    if result["systems"]:
        cell = ParagraphStyle("cell", parent=styles["Normal"], fontSize=9, leading=12)
        head = ParagraphStyle("head", parent=cell, textColor=colors.white)

        data = [[Paragraph("AI area", head), Paragraph("Risk", head), Paragraph("What to do", head)]]
        for system in result["systems"]:
            todo = "<br/>".join(f"&bull; {o}" for o in system["obligations"])
            data.append([
                Paragraph(system["area"], cell),
                Paragraph(system["risk"].capitalize(), cell),
                Paragraph(todo, cell),
            ])

        table = Table(data, colWidths=[4.5 * cm, 2.5 * cm, 9 * cm])
        table.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#444441")),
            ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#cccccc")),
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#f7f6f1")]),
            ("LEFTPADDING", (0, 0), (-1, -1), 6),
            ("RIGHTPADDING", (0, 0), (-1, -1), 6),
            ("TOPPADDING", (0, 0), (-1, -1), 5),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ]))
        story.append(table)
    else:
        story.append(Paragraph(result.get("no_ai_message") or "No AI systems found.", styles["Normal"]))

    story.append(Spacer(1, 0.6 * cm))

    if result["general_obligations"]:
        story.append(Paragraph("<b>Applies to everyone using AI</b>", styles["Normal"]))
        items = [ListItem(Paragraph(o, styles["Normal"])) for o in result["general_obligations"]]
        story.append(ListFlowable(items, bulletType="bullet"))

    story.append(Spacer(1, 1 * cm))
    footer = ParagraphStyle("footer", parent=styles["Normal"], fontSize=8, textColor=colors.grey)
    story.append(Paragraph(result["disclaimer"], footer))

    doc.build(story)
    return buffer.getvalue()
