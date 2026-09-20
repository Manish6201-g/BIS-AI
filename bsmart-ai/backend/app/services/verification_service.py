import re
from typing import Dict, Any, Optional
from sqlalchemy.orm import Session
from app.models.models import VerificationRecord

# Curated Authentic Demo Data for Hackathon Verification Showcases
SAMPLE_ISI_DATABASE = {
    "8400123": {
        "cml_number": "CM/L-8400123",
        "status": "VERIFIED",
        "is_valid": True,
        "manufacturer_name": "Hawkins Cookers Limited",
        "factory_address": "Plot No. 101, Industrial Area, Thane, Maharashtra 400601",
        "product_name": "Domestic Pressure Cooker (Aluminium Alloy & Stainless Steel)",
        "is_standard": "IS 2347:2017",
        "valid_from": "2021-04-01",
        "valid_until": "2027-03-31",
        "operative_status": "OPERATIVE (Active Licence)",
        "source": "BIS National Conformity Assessment Records (Official Portal Mirror)",
        "remarks": "License is operative and verified under Pressure Cookers (Quality Control) Order, 2020."
    },
    "7123456": {
        "cml_number": "CM/L-7123456",
        "status": "VERIFIED",
        "is_valid": True,
        "manufacturer_name": "UltraTech Cement Limited",
        "factory_address": "Awarpur Cement Works, Chandrapur, Maharashtra 442917",
        "product_name": "Ordinary Portland Cement, 43 Grade",
        "is_standard": "IS 269:2015",
        "valid_from": "2019-10-15",
        "valid_until": "2026-10-14",
        "operative_status": "OPERATIVE (Active Licence)",
        "source": "BIS National Conformity Assessment Records (Official Portal Mirror)",
        "remarks": "Standard under mandatory certification scheme. Product complies with compressive strength and chemical criteria."
    },
    "9554321": {
        "cml_number": "CM/L-9554321",
        "status": "VERIFIED",
        "is_valid": True,
        "manufacturer_name": "Tata Steel Limited (Tubes Division)",
        "factory_address": "Jamshedpur Works, East Singhbhum, Jharkhand 831001",
        "product_name": "Steel Tubes for Water and Gas",
        "is_standard": "IS 1239 (Part 1):2004",
        "valid_from": "2018-05-12",
        "valid_until": "2028-05-11",
        "operative_status": "OPERATIVE (Active Licence)",
        "source": "BIS National Conformity Assessment Records",
        "remarks": "High-pressure testing and zinc coating verified under Scheme-I."
    },
    "6001122": {
        "cml_number": "CM/L-6001122",
        "status": "VERIFIED",
        "is_valid": True,
        "manufacturer_name": "Bisleri International Pvt Ltd",
        "factory_address": "Western Express Highway, Andheri East, Mumbai 400099",
        "product_name": "Packaged Drinking Water (Other than Packaged Natural Mineral Water)",
        "is_standard": "IS 14543:2016",
        "valid_from": "2020-01-01",
        "valid_until": "2026-12-31",
        "operative_status": "OPERATIVE (Active Licence)",
        "source": "BIS National Conformity Assessment Records",
        "remarks": "Mandatory certification under Food Safety & BIS Standards Act."
    },
    "5009988": {
        "cml_number": "CM/L-5009988",
        "status": "INVALID_MISMATCH",
        "is_valid": False,
        "manufacturer_name": "Apex Appliances (Unregistered Entity)",
        "factory_address": "Unknown / Unverified Location",
        "product_name": "Electric Immersion Water Heater",
        "is_standard": "IS 302 (Part 2/Sec 201)",
        "valid_from": "2018-01-01",
        "valid_until": "2020-12-31",
        "operative_status": "EXPIRED / DEFERRED",
        "source": "BIS National Conformity Assessment Records",
        "remarks": "WARNING: This CM/L licence has expired and is NOT operative. Selling products with this mark is an offence under the BIS Act, 2016."
    }
}

SAMPLE_HUID_DATABASE = {
    "AA1234": {
        "huid": "AA1234",
        "status": "VERIFIED",
        "is_valid": True,
        "article_type": "Gold Ring / Bangle",
        "purity_fineness": "22K 916 (91.6% Pure Gold)",
        "hallmarking_centre": "National Assaying & Hallmarking Centre, Zaveri Bazaar, Mumbai",
        "ahc_registration_number": "AHC-MH-MUM-042",
        "jeweller_registration_number": "JWL-MH-8921",
        "hallmarking_date": "2024-02-14",
        "source": "BIS Hallmarking Portal Records (Official Manakonline Mirror)",
        "remarks": "Authentic BIS Hallmarked article. Contains BIS Logo, Purity Mark (22K916), and 6-digit HUID."
    },
    "B7K89M": {
        "huid": "B7K89M",
        "status": "VERIFIED",
        "is_valid": True,
        "article_type": "Gold Necklace (Handcrafted)",
        "purity_fineness": "18K 750 (75.0% Pure Gold)",
        "hallmarking_centre": "Southern Precious Metals Assaying Centre, T. Nagar, Chennai",
        "ahc_registration_number": "AHC-TN-CHE-019",
        "jeweller_registration_number": "JWL-TN-4431",
        "hallmarking_date": "2024-08-20",
        "source": "BIS Hallmarking Portal Records",
        "remarks": "Authentic BIS Hallmarked article with verified laser engraved alphanumeric code."
    },
    "X9Y1Z2": {
        "huid": "X9Y1Z2",
        "status": "VERIFIED",
        "is_valid": True,
        "article_type": "Gold Coin / Medallion",
        "purity_fineness": "24K 999 (99.9% Pure Gold)",
        "hallmarking_centre": "Delhi Hallmark Assay Lab, Karol Bagh, New Delhi",
        "ahc_registration_number": "AHC-DL-DEL-005",
        "jeweller_registration_number": "JWL-DL-1104",
        "hallmarking_date": "2024-11-05",
        "source": "BIS Hallmarking Portal Records",
        "remarks": "Authentic 24K pure gold article hallmarked as per IS 1417 / IS 15820."
    }
}

class VerificationService:
    @staticmethod
    def verify_isi(cml_raw: str, db: Session, product_hint: Optional[str] = None) -> Dict[str, Any]:
        cleaned = re.sub(r'[^0-9]', '', cml_raw)
        
        # Check in curated database
        if cleaned in SAMPLE_ISI_DATABASE:
            record = SAMPLE_ISI_DATABASE[cleaned]
        else:
            # Check format validity (BIS CM/L numbers are typically 7 digits)
            if len(cleaned) == 7:
                record = {
                    "cml_number": f"CM/L-{cleaned}",
                    "status": "UNVERIFIED",
                    "is_valid": False,
                    "manufacturer_name": None,
                    "factory_address": None,
                    "product_name": product_hint or "Unspecified Product",
                    "is_standard": None,
                    "valid_from": None,
                    "valid_until": None,
                    "operative_status": "RECORD NOT FOUND",
                    "source": "BIS National Conformity Assessment Records",
                    "remarks": "This CM/L number was not found in the demo verified registry. Verify directly on BIS Care App or Manakonline portal."
                }
            else:
                record = {
                    "cml_number": cml_raw,
                    "status": "INVALID_MISMATCH",
                    "is_valid": False,
                    "manufacturer_name": None,
                    "factory_address": None,
                    "product_name": None,
                    "is_standard": None,
                    "valid_from": None,
                    "valid_until": None,
                    "operative_status": "INVALID FORMAT",
                    "source": "BIS Verification Validator",
                    "remarks": "A valid BIS CM/L licence number contains exactly 7 numerical digits (e.g., CM/L-8400123)."
                }
        
        # Store audit verification record
        audit = VerificationRecord(
            verification_type="ISI",
            query_identifier=cml_raw,
            result_status=record["status"],
            metadata_json=str(record)
        )
        db.add(audit)
        db.commit()

        return record

    @staticmethod
    def verify_huid(huid_raw: str, db: Session) -> Dict[str, Any]:
        code = huid_raw.strip().upper()
        
        # Authentic 6-character alphanumeric pattern
        if not re.match(r'^[A-Z0-9]{6}$', code):
            record = {
                "huid": code,
                "status": "INVALID_FORMAT",
                "is_valid": False,
                "article_type": None,
                "purity_fineness": None,
                "hallmarking_centre": None,
                "ahc_registration_number": None,
                "jeweller_registration_number": None,
                "hallmarking_date": None,
                "source": "BIS Hallmarking Validator",
                "remarks": "HUID must be a 6-character alphanumeric code (e.g. AA1234 or B7K89M)."
            }
        elif code in SAMPLE_HUID_DATABASE:
            record = SAMPLE_HUID_DATABASE[code]
        else:
            record = {
                "huid": code,
                "status": "UNVERIFIED",
                "is_valid": False,
                "article_type": "Gold Article",
                "purity_fineness": "Unregistered / Pending Entry",
                "hallmarking_centre": "AHC Records Not Available",
                "ahc_registration_number": None,
                "jeweller_registration_number": None,
                "hallmarking_date": None,
                "source": "BIS Hallmarking Portal Records",
                "remarks": f"No registered hallmarking record found for HUID '{code}'. Please check spelling or verify on the official BIS Care app."
            }

        # Store audit
        audit = VerificationRecord(
            verification_type="HUID",
            query_identifier=code,
            result_status=record["status"],
            metadata_json=str(record)
        )
        db.add(audit)
        db.commit()

        return record

verification_service = VerificationService()
