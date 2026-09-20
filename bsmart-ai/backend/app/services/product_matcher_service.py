import re
from typing import Dict, Any, List, Optional
from sqlalchemy.orm import Session
from app.models.models import Product, Standard, StandardClause, QCO
from app.schemas.schemas import ProductMatchResponse, StandardResponse, ClauseResponse, MatchedClauseItem

class ProductMatcherService:
    @staticmethod
    def match_product(
        product_name: str,
        category: Optional[str] = None,
        material: Optional[str] = None,
        capacity: Optional[str] = None,
        intended_use: Optional[str] = None,
        db: Optional[Session] = None
    ) -> ProductMatchResponse:
        p_name = product_name.strip().lower()
        
        # Exact and fuzzy knowledge base lookup
        matched_standard = None
        why_text = ""
        mandatory_cert = True
        qco_name = None
        qco_date = None
        key_reqs = []
        matched_clauses = []
        next_steps = []
        confidence = 0.0

        if any(term in p_name for term in ["pressure cooker", "cooker", "कुकर"]):
            is_number = "IS 2347:2017"
            confidence = 0.96
            why_text = (
                "IS 2347:2017 specifies requirements for domestic pressure cookers made of aluminium "
                "alloy, stainless steel, or composite materials up to 30-litre nominal capacity. "
                "Under the Pressure Cookers (Quality Control) Order, 2020 issued by DPIIT, "
                "certification and ISI marking are strictly mandatory for manufacture, import, or sale in India."
            )
            mandatory_cert = True
            qco_name = "Pressure Cookers (Quality Control) Order, 2020"
            qco_date = "Enforced: 01 February 2021"
            key_reqs = [
                "Safety Valve Burst Pressure: Must release safely between 1.5 to 3.0 times normal operating pressure.",
                "Operating Pressure: Nominal operating pressure maintained at 1.0 kgf/cm² ± 0.1 kgf/cm².",
                "Handle Insulation: Handle surface temperature must not exceed 55°C during normal operation.",
                "Material Compliance: Aluminium food contact surfaces must comply with IS 21 or IS 737; Stainless steel with IS 6911."
            ]
            matched_clauses = [
                MatchedClauseItem(
                    clause_number="Clause 4.2",
                    title="Material and Construction",
                    summary="Cooker body, lid, and gasket must be made from non-toxic, food-grade materials resistant to corrosion.",
                    is_mandatory=True
                ),
                MatchedClauseItem(
                    clause_number="Clause 5.1",
                    title="Operating Pressure & Safety Release",
                    summary="Mandatory provision for spring-loaded or fusible safety release devices tested at elevated temperature and pressure.",
                    is_mandatory=True
                ),
                MatchedClauseItem(
                    clause_number="Clause 8.4",
                    title="Thermal Shock & Proof Pressure Test",
                    summary="Body and lid assembly must withstand hydrostatic proof pressure test without leakage or permanent distortion.",
                    is_mandatory=True
                )
            ]
            next_steps = [
                "1. Confirm cooker nominal capacity and material grades (Aluminium vs SS 304).",
                "2. Establish in-house testing facility for safety valve release and hydrostatic pressure testing.",
                "3. Prepare documentation as per BIS Product Manual for IS 2347.",
                "4. Submit Form-V on BIS Manakonline portal for Grant of Licence (Scheme-I)."
            ]
        elif any(term in p_name for term in ["cement", "portland", "opc", "सीमेंट"]):
            is_number = "IS 269:2015"
            confidence = 0.95
            why_text = (
                "IS 269:2015 covers requirements for Ordinary Portland Cement (OPC 33, 43, and 53 grades). "
                "Cement is under mandatory BIS certification as per the Cement (Quality Control) Order notified "
                "by the Ministry of Commerce and Industry."
            )
            mandatory_cert = True
            qco_name = "Cement (Quality Control) Order, 2003 & Amendments"
            qco_date = "Enforced: 17 February 2004"
            key_reqs = [
                "Compressive Strength: Minimum 28-day strength of 33 MPa (33 Grade), 43 MPa (43 Grade), or 53 MPa (53 Grade).",
                "Fineness Test: Specific surface by air permeability method shall not be less than 225 m²/kg.",
                "Soundness: Le Chatelier expansion shall not exceed 10 mm; Autoclave expansion shall not exceed 0.8%.",
                "Chemical Limits: Insoluble residue maximum 5.0%, Total sulphur content max 3.5%."
            ]
            matched_clauses = [
                MatchedClauseItem(
                    clause_number="Clause 5.1",
                    title="Chemical Requirements",
                    summary="Specifies permissible ratios for lime saturation factor, alumina iron ratio, and magnesia limits.",
                    is_mandatory=True
                ),
                MatchedClauseItem(
                    clause_number="Clause 6.2",
                    title="Compressive Strength & Setting Time",
                    summary="Initial setting time must not be less than 30 minutes; final setting time must not exceed 600 minutes.",
                    is_mandatory=True
                )
            ]
            next_steps = [
                "1. Setup complete chemical and physical cement testing laboratory on plant premises.",
                "2. Implement Scheme of Inspection and Testing (SIT) for daily batch verification.",
                "3. Apply on Manakonline for BIS ISI Licence under Scheme-I."
            ]
        elif any(term in p_name for term in ["steel tube", "pipe", "tubular", "पाइप"]):
            is_number = "IS 1239 (Part 1):2004"
            confidence = 0.93
            why_text = (
                "IS 1239 (Part 1):2004 specifies technical delivery conditions for welded and seamless "
                "steel tubes and tubulars suitable for welding or for screwing to BS 21 pipe threads. "
                "Mandatory under Steel and Steel Products (Quality Control) Order."
            )
            mandatory_cert = True
            qco_name = "Steel and Steel Products (Quality Control) Order, 2020"
            qco_date = "Enforced: 08 May 2021"
            key_reqs = [
                "Hydrostatic Test: Each tube shall be hydrostatically tested at a minimum test pressure of 5 MPa without leak.",
                "Tensile Strength: Minimum tensile strength of 320 MPa and minimum elongation of 20%.",
                "Galvanizing/Coating: Hot-dip zinc coating mass must comply with Clause 11 for galvanized pipes."
            ]
            matched_clauses = [
                MatchedClauseItem(
                    clause_number="Clause 8.1",
                    title="Tensile & Flattening Test",
                    summary="Mandatory cold flattening test without signs of crack or flaw on the weld seam.",
                    is_mandatory=True
                ),
                MatchedClauseItem(
                    clause_number="Clause 9.2",
                    title="Hydrostatic Pressure Test",
                    summary="Online non-destructive eddy-current or hydrostatic test at designated pressures.",
                    is_mandatory=True
                )
            ]
            next_steps = [
                "1. Ensure factory has continuous tube mill and automatic hydrostatic pressure testing bench.",
                "2. Apply for BIS Scheme-I licensing."
            ]
        elif any(term in p_name for term in ["water", "drinking water", "packaged water", "पानी", "पेयजल"]):
            is_number = "IS 14543:2016"
            confidence = 0.97
            why_text = (
                "IS 14543:2016 specifies microbiological, physical, and chemical requirements for "
                "Packaged Drinking Water (other than Packaged Natural Mineral Water). "
                "Under Food Safety and Standards (FSSAI) and BIS regulations, ISI mark is legally mandatory."
            )
            mandatory_cert = True
            qco_name = "Packaged Drinking Water Mandatory Certification Scheme (FSSAI/BIS)"
            qco_date = "Enforced: Mandatory since 2001"
            key_reqs = [
                "Microbiological Limits: Total coliform, E. coli, Faecal Streptococci, and Pseudomonas aeruginosa must be absent in 250 ml.",
                "Total Dissolved Solids (TDS): Must remain within 75 to 500 mg/l.",
                "Pesticide Residues: Individual pesticide residues shall not exceed 0.0001 mg/l; total pesticides max 0.0005 mg/l.",
                "Ozone & Disinfection: Residual ozone level controlled between 0.2 to 0.4 mg/l at bottling."
            ]
            matched_clauses = [
                MatchedClauseItem(
                    clause_number="Clause 4.1",
                    title="Microbiological Requirements",
                    summary="Strict zero-tolerance limits for pathogenic organisms in bottles.",
                    is_mandatory=True
                ),
                MatchedClauseItem(
                    clause_number="Clause 5.2",
                    title="Pesticide Residue Limits",
                    summary="Mandatory GC-MS / LC-MS testing for banned pesticide residues.",
                    is_mandatory=True
                )
            ]
            next_steps = [
                "1. Establish in-house microbiological and chemical testing laboratory with qualified chemist.",
                "2. Verify source water test report from NABL-accredited laboratory.",
                "3. Apply for BIS ISI certification under Scheme-I."
            ]
        elif any(term in p_name for term in ["gold", "jewellery", "jewelry", "huid", "hallmark", "सोना", "आभूषण"]):
            is_number = "IS 15820:2009"
            confidence = 0.98
            why_text = (
                "IS 15820:2009 and IS 1417 govern the Hallmarking of Gold and Gold Alloys. "
                "Government of India has made 6-digit alphanumeric HUID (Hallmark Unique Identification) "
                "mandatory for all 14k, 18k, 20k, 22k, 23k, and 24k gold jewellery sold in hallmarking notified districts."
            )
            mandatory_cert = True
            qco_name = "Hallmarking of Gold Jewellery and Gold Artefacts Order, 2020"
            qco_date = "Enforced: 23 June 2021 (Phased across districts)"
            key_reqs = [
                "Purity Verification: Must undergo fire assay or XRF testing at BIS-recognized AHC.",
                "Three Mandatory Marks: BIS Standard Logo, Purity in Karat and Fineness (e.g., 22K916), and 6-digit HUID.",
                "Laser Engraving: Traceable 6-digit laser-etched alphanumeric identifier on each piece."
            ]
            matched_clauses = [
                MatchedClauseItem(
                    clause_number="Clause 5.1",
                    title="Assaying & Fineness Determination",
                    summary="Prescribes lead cupellation fire assay method for gold fineness accuracy.",
                    is_mandatory=True
                ),
                MatchedClauseItem(
                    clause_number="Clause 7.2",
                    title="Marking & Traceability",
                    summary="Directs the generation and registration of 6-digit HUID code on the central BIS Hallmarking Portal.",
                    is_mandatory=True
                )
            ]
            next_steps = [
                "1. Jeweller registers on Manakonline Hallmarking portal (zero government fee for micro-enterprises).",
                "2. Submit jewellery lots to a BIS-recognized Assaying and Hallmarking Centre (AHC).",
                "3. Verify laser-marked HUID codes prior to retail display."
            ]
        elif any(term in p_name for term in ["battery", "lithium", "cell", "power bank", "बैटरी"]):
            is_number = "IS 16046 (Part 2):2018"
            confidence = 0.94
            why_text = (
                "IS 16046 (Part 2):2018 / IEC 62133-2 covers secondary cells and batteries containing alkaline "
                "or other non-acid electrolytes for use in portable applications. "
                "Mandatory under the Compulsory Registration Scheme (CRS) of MeitY/BIS."
            )
            mandatory_cert = True
            qco_name = "Electronics and Information Technology Goods (Requirement for Compulsory Registration) Order"
            qco_date = "Enforced: 01 April 2021"
            key_reqs = [
                "Continuous Charging Test: Cells shall not ignite or burst when subjected to prolonged charging.",
                "External Short Circuit: Must withstand external short circuit at 55°C without catching fire.",
                "Drop and Mechanical Shock: Must pass drop test onto concrete floor from 1.0 meter."
            ]
            matched_clauses = [
                MatchedClauseItem(
                    clause_number="Clause 7.3.2",
                    title="External Short Circuit",
                    summary="Test cell connected across resistance < 80 mΩ at elevated ambient temperature.",
                    is_mandatory=True
                ),
                MatchedClauseItem(
                    clause_number="Clause 7.3.8",
                    title="Mechanical Impact & Crush Test",
                    summary="Evaluates resistance to mechanical puncture and deformation.",
                    is_mandatory=True
                )
            ]
            next_steps = [
                "1. Send battery samples to a BIS-recognized testing lab for CRS safety testing.",
                "2. Obtain test report and file application on BIS CRS portal."
            ]
        elif any(term in p_name for term in ["toy", "toys", "खिलौने"]):
            is_number = "IS 9873 (Part 1):2019"
            confidence = 0.96
            why_text = (
                "IS 9873 (Part 1):2019 specifies safety aspects related to mechanical and physical properties of toys. "
                "Mandatory under Toys (Quality Control) Order, 2020. No toy can be manufactured, sold, or imported "
                "without BIS Standard Mark (ISI Scheme-I)."
            )
            mandatory_cert = True
            qco_name = "Toys (Quality Control) Order, 2020"
            qco_date = "Enforced: 01 January 2021"
            key_reqs = [
                "Small Parts Test: No removable component small enough to enter the small parts cylinder for children under 36 months.",
                "Sharp Edges & Points: Prohibition of hazardous accessible sharp edges or sharp points.",
                "Chemical Safety: Heavy metal migration limits (Lead, Cadmium, Mercury, Arsenic) as per IS 9873 (Part 3)."
            ]
            matched_clauses = [
                MatchedClauseItem(
                    clause_number="Clause 4.4",
                    title="Small Parts Hazard",
                    summary="Specifies dimensions and ingestion hazards for infant toys.",
                    is_mandatory=True
                ),
                MatchedClauseItem(
                    clause_number="Clause 4.7",
                    title="Edges and Sharp Projections",
                    summary="Mechanical testing for sharpness of edges accessible to child contact.",
                    is_mandatory=True
                )
            ]
            next_steps = [
                "1. Set up factory inspection equipment for physical and mechanical toy testing.",
                "2. Apply for Scheme-I certification under Toys QCO."
            ]
        else:
            # Query database for standards if db available
            if db:
                db_std = db.query(Standard).filter(
                    (Standard.title.ilike(f"%{product_name}%")) | 
                    (Standard.category.ilike(f"%{category or product_name}%"))
                ).first()
                if db_std:
                    return ProductMatchResponse(
                        product_name=product_name,
                        matched_standard=StandardResponse.from_orm(db_std),
                        confidence_score=0.82,
                        why_this_standard=f"Matched standard {db_std.is_number} based on product keywords and category.",
                        mandatory_certification=db_std.mandatory_status,
                        applicable_qco=db_std.qco_reference,
                        qco_enforcement_date="Refer to official ministry QCO notification",
                        key_reqs=["Review standard scope and clause requirements for details."],
                        relevant_clauses=[],
                        next_steps=["Check detailed clauses in Standards Explorer."]
                    )

            # Safe grounded response when not found
            return ProductMatchResponse(
                product_name=product_name,
                matched_standard=None,
                confidence_score=0.0,
                why_this_standard="I could not find sufficient information in the available BIS sources to answer this reliably.",
                mandatory_certification=False,
                applicable_qco=None,
                qco_enforcement_date=None,
                key_reqs=[],
                relevant_clauses=[],
                next_steps=["Verify product classification or consult the official BIS portal (manakonline.in)."]
            )

        std_obj = StandardResponse(
            id="std-matched",
            is_number=is_number,
            title=why_text.split(" specifies ")[0].split(" covers ")[0].strip(),
            year=2020,
            category=category or "Standard Specification",
            scope=why_text,
            status="Active",
            mandatory_status=mandatory_cert,
            qco_reference=qco_name,
            source_url="https://www.services.bis.gov.in/",
            clauses=[]
        )

        return ProductMatchResponse(
            product_name=product_name,
            matched_standard=std_obj,
            confidence_score=confidence,
            why_this_standard=why_text,
            mandatory_certification=mandatory_cert,
            applicable_qco=qco_name,
            qco_enforcement_date=qco_date,
            key_requirements=key_reqs,
            relevant_clauses=matched_clauses,
            next_steps=next_steps
        )

product_matcher = ProductMatcherService()
