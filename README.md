# INDUSPULSE

### NISAR-Powered Surface Change Explorer

**NASA Space Apps Challenge 2026**  
**Challenge Track:** Dancing with the SARs  
**Team Name:** Orbital Intelligence  
**Team Leader:** Khuda Bux Mahar (KB mahar)

---

## 🛰️ Project Objective

**INDUSPULSE** is a professional web dashboard designed to visualize and analyze actual NASA-ISRO NISAR synthetic aperture radar (SAR) data over the Lower Indus Basin / Indus Delta corridor in Sindh, Pakistan (from Sukkur to Keti Bandar).

The platform bridges raw spaceborne radar observations with accessible scientific exploration, empowering researchers and disaster-monitoring teams to inspect surface backscatter characteristics with strict scientific rigor.

---

## 📍 Proposed Study Area (AOI)

- **Region:** Lower Indus Basin & Indus Delta, Sindh, Pakistan
- **Corridor:** Sukkur down to Keti Bandar
- **Bounding Box / WKT:** `POLYGON((67.0 24.0, 69.5 24.0, ...))`

---

## 🔬 Dataset Verification & Scientific Integrity

To maintain absolute scientific validity during the hackathon, INDUSPULSE adheres to strict principles:

- **Primary Scene:** NISAR L2 GCOV (L-Band, Validated Data Maturity, Production Configuration).
- **Granule ID:** `NISAR_L2_PR_GCOV_034_041_A_014_4005_DHDH_A_20261027T004446_20261027T004521_P05036_N_F_J_001`
- **Acquisition Date:** October 27, 2026
- **Polarization:** HH / HV (Dual Polarization)
- **File Size / Format:** 6.40 GB HDF5
- **Processing Workflow:** Large HDF5 files are processed via dedicated Google Colab Python notebooks (`h5py`, `NumPy`, `rasterio`) to extract validated spatial layers and metadata JSONs, avoiding heavy local computations.

---

## 🛠️ Technology Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Mapping:** MapLibre GL JS (Interactive spatial rendering)
- **Icons:** Lucide React
- **Data Processing:** Python, Google Colab, GDAL / rasterio
- **Version Control:** Git & GitHub

---

## 📂 Initial Project Structure

```text
induspulse/
├── public/
├── src/
│   ├── assets/
│   ├── components/       # Reusable UI modules (Header, Sidebar, Panels)
│   ├── pages/            # Full-view application screens
│   ├── services/         # Data integration & API connectors
│   ├── hooks/            # Custom React hooks
│   ├── types/            # TypeScript interfaces for NISAR metadata
│   ├── styles/           # Tailwind & global stylesheet configurations
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
└── README.md
```
