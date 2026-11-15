INDUSPULSE

NISAR-Based Polarimetric Radar Visualization Platform

NASA Space Apps Challenge 2026 | Team Orbital Intelligence

INDUSPULSE is an interactive geospatial visualization platform developed to explore NISAR L-band Geocoded Polarimetric Covariance (GCOV) data over the Lower Indus Basin region of Sindh, Pakistan.

The platform presents four radar-derived visualization layers through an interactive web map, helping users explore polarimetric radar information in a more accessible way.

Live Application: https://nasa-space-app-challenge-2026-pi.vercel.app

---

Project Overview

Synthetic Aperture Radar (SAR) provides valuable Earth observation information independently of daylight and, within sensor and acquisition limitations, through cloud cover.

INDUSPULSE focuses on visualizing selected NISAR GCOV polarimetric information over a defined region of the Lower Indus Basin.

The application provides an interactive interface for exploring four raster layers:

- HHHH
- HVHV
- Polarization Ratio (PR)
- Polarization Ratio in Decibels (PR_dB)

The goal is to make radar-derived geospatial information easier to inspect and understand through a web-based visualization platform.

Key Features

- Interactive geospatial map powered by MapLibre GL JS.
- Four radar visualization layers.
- Dynamic layer switching.
- Layer opacity controls.
- Map coordinate display.
- Zoom-level display.
- Supabase-hosted raster tile integration.
- Methodology information interface.
- Data-lineage information interface.
- Responsive web interface.
- Vercel deployment.

Feature availability should be checked against the current live deployment.

Data Source

Satellite: NASA-ISRO Synthetic Aperture Radar (NISAR)

Product: Level-2 Geocoded Polarimetric Covariance (GCOV)

Radar Band: L-band

Reported Acquisition Date: 30 October 2026

Reported Granule ID:

NISAR_L2_PR_GCOV_034_092_D_076_4005_DHDH_A_20261030T141414_20261030T141436_P05036_N_P_J_001

The project uses intermediate raster layers reported to be associated with the selected GCOV acquisition.

For authoritative product details and metadata, consult the official NASA and ASF data records.

Area of Interest

Region: Lower Indus Basin, Sindh, Pakistan.

The project-defined bounding coordinates are:

Boundary| Coordinate
West| 67.4999° E
East| 68.0662° E
South| 23.5000° N
North| 26.3220° N

These coordinates define the project's intended area of interest. They should not be interpreted as proof that the entire region is covered by valid data from the selected acquisition.

Visualization Layers

1. HHHH

Represents the HH co-polarization diagonal covariance term.

2. HVHV

Represents the HV cross-polarization diagonal covariance term.

3. PR — Polarization Ratio

The reported calculation is:

[
PR = \frac{HHHH}{HVHV}
]

This calculation requires compatible linear-power inputs from the same acquisition, frequency/channel, grid and processing basis.

4. PR_dB — Polarization Ratio in Decibels

The reported conversion is:

[
PR_{dB}=10\log_{10}(PR)
]

If the input layers are already in decibels, the calculation must be adapted accordingly. The source units and processing implementation should be checked before interpreting the resulting values.

Data Processing Workflow

The reported project workflow is:

NISAR GCOV Acquisition
          |
          v
Intermediate GeoTIFF Layers
          |
          v
HHHH and HVHV Layers
          |
          v
PR and PR_dB Calculation
          |
          v
PNG Raster Tile Generation
          |
          v
Supabase Storage
          |
          v
React + MapLibre Web Application
          |
          v
Vercel Deployment

Reported tile configuration:

Parameter| Reported Value
Raster layers| 4
Tiles per layer| 27
Total PNG tiles| 108
Zoom levels| 10, 11, 12
Tile format| PNG
Storage| Supabase Storage
Bucket| induspulse-tiles

These values describe the reported processing configuration and should be checked against the actual stored files and processing records.

Technology Stack

Component| Technology
Frontend| React
Build Tool| Vite
Styling| Tailwind CSS
Geospatial Visualization| MapLibre GL JS
Raster Tile Storage| Supabase Storage
Deployment| Vercel

System Architecture

The application follows a web-based geospatial visualization architecture.

1. NISAR-derived raster information is prepared as intermediate layers.
2. The reported raster outputs are converted into PNG map tiles.
3. Raster tiles are hosted in Supabase Storage.
4. The React frontend integrates the hosted raster data.
5. MapLibre GL JS renders the layers in the interactive map.
6. The application is deployed through Vercel.

The current project documentation does not establish a separate custom backend/API service.

Getting Started

Prerequisites

- Node.js
- npm
- Git
- A code editor such as Visual Studio Code

Installation

Clone the repository:

git clone github.com/khudabuxmahar912-prog/NASA-Space-app-challenge-2026

Navigate into the project directory:https://nasa-space-app-challenge-2026-pi.vercel.app/

cd 

Install dependencies:

npm install

Create the environment configuration file if required by the application:

cp .env.example .env

Configure the environment variable names according to the actual project source code. Do not commit secret credentials.

Start the development server:

npm run dev

Build the production application:

npm run build

Preview the production build:

npm run preview

Note: These are standard Vite workflow commands. Confirm that each command exists in the actual "package.json" before publishing this README as the exact project setup guide.

Environment Variables

Use only the variable names actually referenced by the source code.

Examples of possible configuration names include:

VITE_SUPABASE_URL=https://supabase.com/dashboard/org/cxlgpacxnsnetdkqajvb

These are examples, not confirmed project configuration. Replace them with the exact names found in the application.

Never publish private service-role keys, passwords, access tokens or other secrets in GitHub.

Repository Structure

The following is an illustrative structure. Update it to match the actual repository:

INDUSPULSE/
│
├── public/
├── src/
│   ├── components/
│   │   └── MapPanel.tsx
│   ├── App.tsx
│   └── main.tsx
│
├── package.json
├── package-lock.json
├── index.html
├── vite.config.ts
├── README.md
└── .gitignore

Scientific Scope and Limitations

INDUSPULSE is a visualization and exploration platform. Its current reported dataset is a single acquisition dated 30 October 2026.

Accordingly, the platform should not be interpreted as a validated system for:

- Temporal surface-change detection.
- Before-and-after change analysis.
- Confirmed flood detection.
- Soil salinity measurement.
- Waterlogging detection.
- Crop-health diagnosis.
- Validated soil-moisture estimation.

Such applications require suitable scientific methods, additional observations and independent validation.

The displayed polarization ratio is a derived quantity. Its scientific interpretation depends on the input data, units, preprocessing, acquisition conditions and other relevant factors.

The selected granule's actual spatial coverage must also be evaluated against the project AOI.

Evidence and Validation

The project documentation maintains a distinction between reported implementation and independently verified results.

Relevant supporting evidence includes:

- Official NISAR granule metadata.
- ASF Search acquisition record.
- Source GeoTIFF metadata.
- Processing scripts and calculations.
- AOI and acquisition footprint comparison.
- Raster coverage evidence.
- Tile directory structure.
- Supabase Storage screenshots.
- Working public tile URL.
- MapPanel.tsx implementation.
- Live application screenshots.
- Test report and issues log.

Unverified processing details should remain explicitly marked as pending until their supporting evidence is available.

Team — Orbital Intelligence

Member| Role
Khuda Bux Mahar| Team Lead
Ayesha Mubashara| Researcher / Analyst
Malaika Jannat| GIS Specialist
Abdul Wahab| Systems Engineer

AI Tools Disclosure

AI tools used by individual team members should be listed accurately in the final competition submission, according to their actual contributions.

No AI tool should be attributed to a team member without confirmation.

Acknowledgements

We acknowledge NASA, ISRO and the NISAR mission teams for making Earth observation data and scientific resources available to the research and development community.

We also acknowledge the NASA Space Apps Challenge for providing an opportunity to explore Earth science through collaborative innovation.

Project Links

- Live Application: https://nasa-space-app-challenge-2026-pi.vercel.app
- GitHub Repository: github.com/khudabuxmahar912-prog/NASA-Space-challenge-2026
- Project Documentation: https://drive.google.com/drive/folders/11f4aVFegTNLNZ8cFgkRFGA49_PclTYOC?usp=sharing

---

INDUSPULSE — Exploring NISAR Radar Information Through Interactive Geospatial Visualization.

NASA Space Apps Challenge 2026 | Orbital Intelligence
