import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.database.database import SessionLocal, init_db
from app.models.models import User, Standard, StandardClause, Product, QCO, Document, DocumentChunk, VerificationRecord
from app.auth.security import get_password_hash

def seed_database():
    db = SessionLocal()
    try:
        # Check if already seeded
        if db.query(User).filter(User.email == "consumer@bismart.gov.in").first():
            print("Database already contains seed data. Skipping seed.")
            return

        print("Seeding BISmart AI initial demo database...")

        # 1. Users
        users = [
            User(
                email="consumer@bismart.gov.in",
                hashed_password=get_password_hash("Demo1234!"),
                full_name="Aarav Sharma",
                role="consumer",
                organization="Consumer Citizen Forum"
            ),
            User(
                email="industry@bismart.gov.in",
                hashed_password=get_password_hash("Demo1234!"),
                full_name="Priya Patel",
                role="industry",
                organization="Apex Kitchenware & Manufacturing Ltd"
            ),
            User(
                email="admin@bismart.gov.in",
                hashed_password=get_password_hash("Admin1234!"),
                full_name="Rajesh Verma (BIS Scientist E)",
                role="admin",
                organization="Bureau of Indian Standards (Central HQ, Manak Bhavan)"
            )
        ]
        db.add_all(users)
        db.commit()

        # 2. Standards & Clauses
        standards_data = [
            {
                "is_number": "IS 2347:2017",
                "title": "Domestic Pressure Cookers — Specification (Fifth Revision)",
                "year": 2017,
                "category": "Mechanical Engineering & Consumer Products",
                "scope": "Specifies requirements for domestic pressure cookers made of aluminium alloy, stainless steel, or composite materials up to 30-litre nominal capacity.",
                "status": "Active",
                "mandatory_status": True,
                "qco_reference": "Pressure Cookers (Quality Control) Order, 2020",
                "source_url": "https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/2347",
                "clauses": [
                    {
                        "clause_number": "4.1",
                        "title": "Material Requirements",
                        "content": "All components in contact with steam or food shall be manufactured from non-toxic materials. Aluminium alloy sheets shall conform to IS 21; Stainless steel shall conform to IS 6911 grade 304 or superior.",
                        "page_number": 4,
                        "is_mandatory": True
                    },
                    {
                        "clause_number": "5.1",
                        "title": "Operating Pressure & Safety Release Device",
                        "content": "Cookers shall operate at a nominal cooking gauge pressure of 1.0 kgf/cm² ± 0.1 kgf/cm². A secondary safety device (fusible plug or spring-loaded valve) must safely release pressure between 1.5 to 3.0 times normal operating pressure.",
                        "page_number": 7,
                        "is_mandatory": True
                    },
                    {
                        "clause_number": "8.4",
                        "title": "Thermal Insulation of Handles",
                        "content": "When operated under continuous maximum rated steam release for 30 minutes, handle surface temperature shall not exceed 55°C at hand grip points.",
                        "page_number": 12,
                        "is_mandatory": True
                    },
                    {
                        "clause_number": "9.1",
                        "title": "Marking and ISI Standard Mark",
                        "content": "Each pressure cooker body and lid shall be permanently and legibly marked with the manufacturer's name, registered trademark, nominal capacity, and the BIS Standard Mark (ISI) with CM/L licence number.",
                        "page_number": 15,
                        "is_mandatory": True
                    }
                ]
            },
            {
                "is_number": "IS 269:2015",
                "title": "Ordinary Portland Cement — Specification (Sixth Revision)",
                "year": 2015,
                "category": "Civil Engineering & Construction Materials",
                "scope": "Covers manufacture and chemical/physical requirements of 33 Grade, 43 Grade, and 53 Grade Ordinary Portland Cement.",
                "status": "Active",
                "mandatory_status": True,
                "qco_reference": "Cement (Quality Control) Order, 2003",
                "source_url": "https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/269",
                "clauses": [
                    {
                        "clause_number": "5.1",
                        "title": "Chemical Requirements",
                        "content": "The lime saturation factor (LSF) shall be between 0.66 and 1.02. Insoluble residue shall not exceed 5.0% by mass, and total loss on ignition shall not exceed 5.0%.",
                        "page_number": 4,
                        "is_mandatory": True
                    },
                    {
                        "clause_number": "6.2",
                        "title": "Compressive Strength & Setting Time",
                        "content": "Compressive strength of standard mortar cubes: 3-day strength >= 23 MPa (43 Grade), 7-day strength >= 33 MPa, 28-day strength >= 43 MPa. Initial setting time shall not be less than 30 minutes; final setting time <= 600 minutes.",
                        "page_number": 6,
                        "is_mandatory": True
                    }
                ]
            },
            {
                "is_number": "IS 14543:2016",
                "title": "Packaged Drinking Water (Other than Packaged Natural Mineral Water)",
                "year": 2016,
                "category": "Food & Agriculture Standards",
                "scope": "Prescribes microbiological, chemical, and physical parameters for packaged water for direct human consumption.",
                "status": "Active",
                "mandatory_status": True,
                "qco_reference": "Mandatory Certification Scheme under FSSAI / BIS",
                "source_url": "https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/14543",
                "clauses": [
                    {
                        "clause_number": "4.1",
                        "title": "Microbiological Criteria",
                        "content": "Total coliform, E. coli, Faecal Streptococci, and Pseudomonas aeruginosa shall be totally absent in 250 ml sample. Total viable colony count at 37°C shall not exceed 20 CFU/ml.",
                        "page_number": 6,
                        "is_mandatory": True
                    },
                    {
                        "clause_number": "5.2",
                        "title": "Pesticide Residue Limits",
                        "content": "Individual pesticide residues tested by GC-MS/MS or LC-MS/MS shall not exceed 0.0001 mg/litre; total pesticide residues shall not exceed 0.0005 mg/litre.",
                        "page_number": 9,
                        "is_mandatory": True
                    }
                ]
            },
            {
                "is_number": "IS 1239 (Part 1):2004",
                "title": "Steel Tubes, Tubulars and Other Wrought Steel Fittings",
                "year": 2004,
                "category": "Metallurgical Engineering",
                "scope": "Requirements for welded and seamless screwed and socketed steel tubes for water, gas, steam, and air lines.",
                "status": "Active",
                "mandatory_status": True,
                "qco_reference": "Steel and Steel Products (Quality Control) Order, 2020",
                "source_url": "https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/1239",
                "clauses": [
                    {
                        "clause_number": "8.1",
                        "title": "Tensile and Cold Flattening Test",
                        "content": "Minimum tensile strength of 320 MPa; weld seam must pass cold flattening test without signs of fracture.",
                        "page_number": 7,
                        "is_mandatory": True
                    },
                    {
                        "clause_number": "9.2",
                        "title": "Hydrostatic Proof Pressure Test",
                        "content": "Every tube shall be hydrostatically tested at minimum 5 MPa (50 bar) pressure without leak or weeping.",
                        "page_number": 9,
                        "is_mandatory": True
                    }
                ]
            },
            {
                "is_number": "IS 15820:2009",
                "title": "General Requirements for Competence of Assaying and Hallmarking Centres",
                "year": 2009,
                "category": "Hallmarking & Precious Metals",
                "scope": "Operational and technical requirements for gold and silver assaying, fire assay methodology, and 6-digit HUID code generation.",
                "status": "Active",
                "mandatory_status": True,
                "qco_reference": "Hallmarking of Gold Jewellery Order, 2020",
                "source_url": "https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/hallmarking",
                "clauses": [
                    {
                        "clause_number": "5.1",
                        "title": "Fire Assay Protocol",
                        "content": "Lead cupellation fire assay method shall be employed as the primary referee method for gold fineness determination.",
                        "page_number": 8,
                        "is_mandatory": True
                    },
                    {
                        "clause_number": "7.2",
                        "title": "HUID Laser Engraving & Traceability",
                        "content": "Every article must bear the BIS mark, purity grade (e.g., 22K916), and a unique 6-character alphanumeric code (HUID) registered on the central portal.",
                        "page_number": 11,
                        "is_mandatory": True
                    }
                ]
            },
            {
                "is_number": "IS 16046 (Part 2):2018",
                "title": "Secondary Cells and Batteries Containing Alkaline or Other Non-Acid Electrolytes (Lithium Systems)",
                "year": 2018,
                "category": "Electronics & Information Technology (CRS)",
                "scope": "Safety requirements for portable sealed secondary lithium cells and batteries used in electronic devices.",
                "status": "Active",
                "mandatory_status": True,
                "qco_reference": "Electronics & IT Goods Compulsory Registration Order",
                "source_url": "https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/crs",
                "clauses": [
                    {
                        "clause_number": "7.3.2",
                        "title": "External Short Circuit Test",
                        "content": "Tested at 55°C ± 5°C with external circuit resistance < 80 mΩ. Cells must not ignite, burst, or explode.",
                        "page_number": 14,
                        "is_mandatory": True
                    }
                ]
            },
            {
                "is_number": "IS 9873 (Part 1):2019",
                "title": "Safety Aspects Related to Mechanical and Physical Properties of Toys",
                "year": 2019,
                "category": "Consumer Products & Toys Safety",
                "scope": "Safety criteria for mechanical and physical properties of toys intended for children under 14 years.",
                "status": "Active",
                "mandatory_status": True,
                "qco_reference": "Toys (Quality Control) Order, 2020",
                "source_url": "https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/9873",
                "clauses": [
                    {
                        "clause_number": "4.4",
                        "title": "Small Parts Hazard for Infants",
                        "content": "No detachable part may fit completely within the specified small parts truncated cylinder for children under 36 months.",
                        "page_number": 10,
                        "is_mandatory": True
                    }
                ]
            }
        ]

        for s_data in standards_data:
            clauses_data = s_data.pop("clauses")
            std = Standard(**s_data)
            db.add(std)
            db.commit()
            db.refresh(std)

            for c_data in clauses_data:
                clause = StandardClause(
                    standard_id=std.id,
                    **c_data
                )
                db.add(clause)
            db.commit()

        # 3. Products
        cooker_std = db.query(Standard).filter(Standard.is_number == "IS 2347:2017").first()
        cement_std = db.query(Standard).filter(Standard.is_number == "IS 269:2015").first()
        water_std = db.query(Standard).filter(Standard.is_number == "IS 14543:2016").first()

        products = [
            Product(
                name="Pressure Cooker",
                category="Kitchen Appliances",
                sub_category="Cookware",
                material="Aluminium Alloy / Stainless Steel 304",
                capacity="1 to 20 Litres",
                intended_use="Domestic steam pressure cooking",
                applicable_standard_id=cooker_std.id if cooker_std else None,
                qco_order_name="Pressure Cookers (Quality Control) Order, 2020",
                qco_date="01 February 2021",
                mandatory_certification=True
            ),
            Product(
                name="Ordinary Portland Cement (43 Grade)",
                category="Civil Construction",
                sub_category="Binding Materials",
                material="Clinker and Gypsum",
                capacity="50 kg HDPE Bags",
                intended_use="Structural concrete, masonry, and plastering",
                applicable_standard_id=cement_std.id if cement_std else None,
                qco_order_name="Cement (Quality Control) Order, 2003",
                qco_date="17 February 2004",
                mandatory_certification=True
            ),
            Product(
                name="Packaged Drinking Water",
                category="Food & Beverages",
                sub_category="Bottled Water",
                material="PET / Polycarbonate",
                capacity="250ml, 500ml, 1L, 20L jars",
                intended_use="Direct human drinking water consumption",
                applicable_standard_id=water_std.id if water_std else None,
                qco_order_name="Packaged Drinking Water Regulations",
                qco_date="29 March 2001",
                mandatory_certification=True
            )
        ]
        db.add_all(products)
        db.commit()

        # 4. QCOs
        qcos = [
            QCO(
                order_name="Pressure Cookers (Quality Control) Order, 2020",
                ministry="Ministry of Commerce and Industry (DPIIT)",
                notification_date="2020-01-21",
                enforcement_date="2021-02-01",
                is_numbers="IS 2347:2017",
                products_covered="Domestic Pressure Cookers (Aluminium and Stainless Steel)",
                summary="Prohibits manufacture, import, distribution, sale, or lease of domestic pressure cookers without BIS ISI Mark.",
                penalties_summary="Imprisonment up to two years or fine up to two lakh rupees as per Section 29 of the BIS Act, 2016."
            ),
            QCO(
                order_name="Toys (Quality Control) Order, 2020",
                ministry="Ministry of Commerce and Industry (DPIIT)",
                notification_date="2020-02-25",
                enforcement_date="2021-01-01",
                is_numbers="IS 9873 (Part 1, 2, 3, 4, 7, 9) & IS 15644",
                products_covered="All non-electric and electric toys for children under 14 years",
                summary="Mandates Scheme-I ISI Mark certification for both domestic and foreign manufacturers.",
                penalties_summary="Seizure of uncertified goods and prosecution under BIS Act, 2016."
            ),
            QCO(
                order_name="Steel and Steel Products (Quality Control) Order, 2020",
                ministry="Ministry of Steel",
                notification_date="2020-05-08",
                enforcement_date="2021-05-08",
                is_numbers="IS 1239 (Part 1), IS 2062, IS 1786",
                products_covered="Steel tubes, TMT re-bars, structural steel",
                summary="Requires mandatory BIS certification for all structural steel products used in infrastructure and construction.",
                penalties_summary="Penalties under Section 29 of the BIS Act 2016."
            )
        ]
        db.add_all(qcos)
        db.commit()

        # 5. Sample Initial Verification Records
        verifs = [
            VerificationRecord(
                verification_type="ISI",
                query_identifier="8400123",
                result_status="VERIFIED",
                metadata_json='{"cml_number": "CM/L-8400123", "manufacturer": "Hawkins Cookers Limited", "product": "Domestic Pressure Cooker", "is_standard": "IS 2347:2017"}'
            ),
            VerificationRecord(
                verification_type="HUID",
                query_identifier="AA1234",
                result_status="VERIFIED",
                metadata_json='{"huid": "AA1234", "purity": "22K 916", "centre": "National Assaying & Hallmarking Centre, Mumbai"}'
            )
        ]
        db.add_all(verifs)
        db.commit()

        print("Initial demo database successfully populated with 7 standards, clauses, QCOs, and verification records!")

    finally:
        db.close()

if __name__ == "__main__":
    init_db()
    seed_database()
