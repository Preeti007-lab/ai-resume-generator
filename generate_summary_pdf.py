import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable

def generate_pdf(output_filename="ResuBloom_Architecture_and_Design_Summary.pdf"):
    doc = SimpleDocTemplate(
        output_filename,
        pagesize=letter,
        rightMargin=40,
        leftMargin=40,
        topMargin=40,
        bottomMargin=40
    )
    
    styles = getSampleStyleSheet()
    
    # Custom Brand Colors
    PRIMARY = colors.HexColor("#6b21a8")      # Deep Purple / Lavender
    SECONDARY = colors.HexColor("#854d0e")    # Deep Warm Gold
    TEXT_DARK = colors.HexColor("#0f172a")    # Slate 900
    TEXT_MUTED = colors.HexColor("#475569")   # Slate 600
    BG_PURPLE = colors.HexColor("#faf5ff")    # Light Lavender
    BORDER_PURPLE = colors.HexColor("#d8b4fe")# Lavender Border
    
    # Custom Styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=PRIMARY,
        spaceAfter=4
    )
    
    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        textColor=TEXT_MUTED,
        spaceAfter=12
    )
    
    heading_style = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=PRIMARY,
        spaceBefore=10,
        spaceAfter=6
    )
    
    body_style = ParagraphStyle(
        'BodyText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=TEXT_DARK,
        spaceAfter=6
    )
    
    bullet_style = ParagraphStyle(
        'BulletText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12.5,
        textColor=TEXT_DARK,
        leftIndent=12,
        spaceAfter=4
    )
    
    table_text = ParagraphStyle(
        'TableText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=11,
        textColor=TEXT_DARK
    )
    
    table_header = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=12,
        textColor=colors.white
    )

    story = []
    
    # Header & Title Banner
    story.append(Paragraph("🌸 ResuBloom — Architecture, AI & Design Summary", title_style))
    story.append(Paragraph("<b>Executive Overview:</b> Full-Stack Architecture, Groq AI Integration & Key Engineering Decisions", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=PRIMARY, spaceBefore=0, spaceAfter=10))
    
    # 1. Architecture
    story.append(Paragraph("1. System Architecture", heading_style))
    story.append(Paragraph(
        "ResuBloom is designed as a decoupled, high-performance <b>Full-Stack Client-Server Application</b>:",
        body_style
    ))
    story.append(Paragraph("• <b>Frontend SPA (React 18 + Vite 6):</b> Fast Single-Page Application with optimized Rollup vendor chunk splitting, responsive multi-step wizard, and real-time paper rendering canvas.", bullet_style))
    story.append(Paragraph("• <b>Backend REST API (Node.js + Express 5):</b> Stateless microservice deployed on Render handling rate limiting, schema validation, and health diagnostics.", bullet_style))
    story.append(Paragraph("• <b>Database (MongoDB Atlas):</b> User-isolated document database indexing resumes by <code>clerkUserId</code> and creation timestamp.", bullet_style))
    story.append(Paragraph("• <b>Authentication (Clerk):</b> JWT-based zero-trust session validation securing backend endpoints.", bullet_style))
    
    story.append(Spacer(1, 6))

    # 2. AI Integration
    story.append(Paragraph("2. AI Integration Strategy", heading_style))
    story.append(Paragraph(
        "The AI synthesis engine is built for <b>sub-2-second latency</b>, <b>zero hallucinations</b>, and <b>ATS compliance</b>:",
        body_style
    ))
    story.append(Paragraph("• <b>Groq LPU™ & LLaMA 3.3 70B:</b> Leverages Groq's high-speed inference engine to generate and format full resumes in under 2 seconds.", bullet_style))
    story.append(Paragraph("• <b>Strict JSON Output Schema:</b> Uses native JSON mode (<code>response_format: { type: 'json_object' }</code>) with strict schema normalization in <code>groqService.js</code>, eliminating formatting parsing errors.", bullet_style))
    story.append(Paragraph("• <b>ATS Action-Verb Optimization:</b> Contextually converts passive phrases into high-impact executive verbs (<i>'Architected'</i>, <i>'Spearheaded'</i>, <i>'Accelerated'</i>) while maintaining factual fidelity.", bullet_style))
    story.append(Paragraph("• <b>Quantifiable Impact Extraction:</b> Extracts and emphasizes metrics, scale, and performance outcomes to maximize keyword screening score.", bullet_style))
    
    story.append(Spacer(1, 6))

    # 3. Key Design Decisions
    story.append(Paragraph("3. Key Design Decisions & Strategic Rationale", heading_style))
    
    table_data = [
        [
            Paragraph("Decision Area", table_header),
            Paragraph("Technical Choice", table_header),
            Paragraph("Strategic Rationale", table_header)
        ],
        [
            Paragraph("<b>Dual-State ATS Presentation</b>", table_text),
            Paragraph("<code>@media print</code> CSS separation", table_text),
            Paragraph("Allows vibrant glassmorphism while editing, but strips all noise during PDF export for a 99% ATS-compliant white paper format.", table_text)
        ],
        [
            Paragraph("<b>Progressive UX Workflow</b>", table_text),
            Paragraph("4-Step Wizard + Split Preview", table_text),
            Paragraph("Reduces cognitive load by segmenting input into Personal, Experience, Skills & Projects with instant visual paper feedback.", table_text)
        ],
        [
            Paragraph("<b>Botanical Floral Palette</b>", table_text),
            Paragraph("Pastel Lavender & Soft Yellow", table_text),
            Paragraph("Replaces generic dark corporate styling with a calming, creative, and memorable brand identity (<i>ResuBloom</i>).", table_text)
        ],
        [
            Paragraph("<b>Zero-Trust Security</b>", table_text),
            Paragraph("Clerk JWT Middleware", table_text),
            Paragraph("Authenticates at the Express middleware layer, guaranteeing strict privacy and isolation of candidate career documents.", table_text)
        ]
    ]
    
    t = Table(table_data, colWidths=[130, 140, 260])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
        ('BACKGROUND', (0, 1), (-1, 1), BG_PURPLE),
        ('BACKGROUND', (0, 2), (-1, 2), colors.white),
        ('BACKGROUND', (0, 3), (-1, 3), BG_PURPLE),
        ('BACKGROUND', (0, 4), (-1, 4), colors.white),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER_PURPLE),
    ]))
    story.append(t)

    # Build Document
    doc.build(story)
    print(f"Generated PDF successfully: {output_filename}")

if __name__ == "__main__":
    generate_pdf()
