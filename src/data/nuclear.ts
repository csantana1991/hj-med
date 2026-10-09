import type { Lecture, Program, Track } from "@/data/catalog";

export const nmLectures: Lecture[] = [
  {
    id: "l2OVu-JSU2Y",
    title: "What is Nuclear Medicine and Molecular Imaging?",
    channel: "Society of Nuclear Medicine and Molecular Imaging",
    sec: 2802,
    tags: ["nm"],
  },
  {
    id: "JHgMaWFsDNQ",
    title: "Is Nuclear Medicine Safe? What You Need to Know",
    channel: "Society of Nuclear Medicine and Molecular Imaging",
    sec: 2920,
    tags: ["nm"],
  },
  {
    id: "ncwug5jutfA",
    title: "How Does Nuclear Medicine Work?",
    channel: "Society of Nuclear Medicine and Molecular Imaging",
    sec: 1257,
    tags: ["nm"],
  },
  {
    id: "eOwNLRNOg98",
    title: "Normal PET Scans",
    channel: "Nuclear MD",
    sec: 428,
    tags: ["nm"],
  },
  {
    id: "KG8VP7NeMVk",
    title: "FDG PET/CT Pitfalls and Artifacts",
    channel: "Nuclear MD",
    sec: 1381,
    tags: ["nm"],
  },
  {
    id: "uJWX4jG1hZ8",
    title: "Nuclear Cardiology: Understanding the Basics — John Mahmarian, MD",
    channel: "Houston Methodist DeBakey CV Education",
    sec: 3380,
    tags: ["nm"],
  },
  {
    id: "a4HogkQ1qV0",
    title: "MPI Teaching File from Nuclear Medicine Handbook",
    channel: "Nuclear MD",
    sec: 2193,
    tags: ["nm"],
  },
  {
    id: "q8KM8Ghy5hg",
    title: "Nuclear Cardiac Imaging: Using Nuclear Imaging to Guide Interventions",
    channel: "Houston Methodist DeBakey CV Education",
    sec: 1469,
    tags: ["nm"],
  },
  {
    id: "Zxhar2StZyY",
    title: "PSMA PET-CT",
    channel: "Nuclear MD",
    sec: 928,
    tags: ["nm"],
  },
  {
    id: "El-Gf50TOI8",
    title: "Nuclear Medicine Physician Discusses PSMA Scans for Prostate Cancer",
    channel: "Society of Nuclear Medicine and Molecular Imaging",
    sec: 2676,
    tags: ["nm"],
  },
  {
    id: "s6a_y2vAS4s",
    title: "Visualizing Prostate Cancer: Why Image with PSMA PET?",
    channel: "Society of Nuclear Medicine and Molecular Imaging",
    sec: 745,
    tags: ["nm"],
  },
  {
    id: "c490waFVgwY",
    title: "Molecular Imaging for Prostate Cancer",
    channel: "Grand Rounds in Urology",
    sec: 597,
    tags: ["nm"],
  },
  {
    id: "sPLLpM3t_4s",
    title: "Catch Prostate Cancer Early with Nuclear Medicine",
    channel: "Society of Nuclear Medicine and Molecular Imaging",
    sec: 1005,
    tags: ["nm"],
  },
  {
    id: "EpJqUM05bBo",
    title: "Imaging Biochemical Recurrence Post Prostatectomy",
    channel: "Nuclear MD",
    sec: 479,
    tags: ["nm"],
  },
  {
    id: "61pUcveoXHw",
    title: "Ga-68 DOTATATE PET/CT",
    channel: "Nuclear MD",
    sec: 295,
    tags: ["nm"],
  },
  {
    id: "1NWXjGaH0Ww",
    title: "Nuclear Medicine Theranostics: Intro and Lu-177 DOTATATE",
    channel: "The Radiology Review Podcast",
    sec: 1490,
    tags: ["nm"],
  },
  {
    id: "nIpVloqdp4Q",
    title: "PET/CT Cases",
    channel: "Nuclear MD",
    sec: 829,
    tags: ["nm"],
  },
  {
    id: "9yfZI8HvFR0",
    title: "PET Imaging in Breast Cancer",
    channel: "Society of Nuclear Medicine and Molecular Imaging",
    sec: 959,
    tags: ["nm"],
  },
  {
    id: "rK7EEqoRzo8",
    title: "Radio-Iodine Treatment: Graves Disease vs Thyroid Cancer",
    channel: "Nuclear MD",
    sec: 166,
    tags: ["nm"],
  },
  {
    id: "cZS1eDJSFuc",
    title: "Graves Disease and Suppressed Thyroid Nodule",
    channel: "Nuclear MD",
    sec: 264,
    tags: ["nm"],
  },
  {
    id: "px-tuxYIQ2o",
    title: "Alzheimer's Disease",
    channel: "Nuclear MD",
    sec: 261,
    tags: ["nm"],
  },
  {
    id: "Yh8GjEdb7qc",
    title: "DaT Scan",
    channel: "Nuclear MD",
    sec: 440,
    tags: ["nm"],
  },
];

const ids = (...list: string[]) => list;

export const nmTrack: Track = {
  key: "nm",
  boardHours: 25,
  scope:
    "Public nuclear medicine tapes for the Emory residency and the Harvard Joint Program: how a scan is acquired, nuclear cardiology, PSMA and DOTATATE theranostics, radioiodine, and brain PET. Not a recording from either hospital, and not the ABNM certificate.",
  gaps: [
    "About 25 hours is a commercial nuclear review. These public tapes are shorter. The gap is named, not padded with repeats.",
    "Full dosimetry workstations, written-directive logs, and the Emory or Mass General case volume are not on YouTube.",
    "Ra-223, Y-90 microspheres, and quantitative SPECT reconstruction are in the sitting and the rotation map, not in a dedicated long lecture here.",
  ],
  modules: [
    {
      title: "How a scan is made",
      lectureIds: ids(
        "l2OVu-JSU2Y",
        "JHgMaWFsDNQ",
        "ncwug5jutfA",
        "eOwNLRNOg98",
        "KG8VP7NeMVk",
      ),
    },
    {
      title: "Nuclear cardiology",
      lectureIds: ids("uJWX4jG1hZ8", "a4HogkQ1qV0", "q8KM8Ghy5hg"),
    },
    {
      title: "Theranostics, PET, and radioiodine",
      lectureIds: ids(
        "Zxhar2StZyY",
        "El-Gf50TOI8",
        "s6a_y2vAS4s",
        "c490waFVgwY",
        "sPLLpM3t_4s",
        "EpJqUM05bBo",
        "61pUcveoXHw",
        "1NWXjGaH0Ww",
        "nIpVloqdp4Q",
        "9yfZI8HvFR0",
        "rK7EEqoRzo8",
        "cZS1eDJSFuc",
      ),
    },
    {
      title: "Brain PET and dopamine imaging",
      lectureIds: ids("px-tuxYIQ2o", "Yh8GjEdb7qc"),
    },
  ],
};

/** Existing atlas rows that should sit on the nuclear course. */
export const programPatches: Record<string, Partial<Program>> = {
  "harvard-nuclear-radiology": {
    track: "nm",
    name: "Nuclear Radiology — Harvard Joint Program",
    site: "Mass General, Brigham, and Boston Children's",
  },
};

export const nmPrograms: Program[] = [
  {
    slug: "emory-nm",
    school: "emory",
    kind: "residency",
    name: "Nuclear Medicine — Emory",
    site: "Emory University Hospital and Winship",
    years: 3,
    board: "American Board of Nuclear Medicine",
    track: "nm",
    group: "Imaging",
  },
  {
    slug: "emory-mim",
    school: "emory",
    kind: "residency",
    name: "Molecular Imaging Track — Emory",
    site: "Emory diagnostic radiology, dual-board path",
    years: 5,
    board: "ABR Diagnostic Radiology and ABNM",
    track: "nm",
    group: "Imaging",
  },
  {
    slug: "emory-rad",
    school: "emory",
    kind: "residency",
    name: "Diagnostic Radiology — Emory",
    site: "Emory University Hospital, Grady, and Midtown",
    years: 5,
    board: "ABR Diagnostic Radiology",
    track: "rad",
    group: "Imaging",
  },
  {
    slug: "harvard-jpnm",
    school: "harvard",
    kind: "residency",
    name: "Nuclear Medicine — Harvard Joint Program",
    site: "Brigham, Dana-Farber, Mass General, Boston Children's",
    years: 3,
    board: "American Board of Nuclear Medicine",
    track: "nm",
    group: "Imaging",
  },
  {
    slug: "emory-nuclear-radiology",
    school: "emory",
    kind: "fellowship",
    name: "Nuclear Radiology — Emory",
    site: "Emory University Hospital",
    years: 1,
    board: "ABR Nuclear Radiology",
    track: "nm",
    group: "Imaging",
  },
  {
    slug: "emory-pet-ct",
    school: "emory",
    kind: "fellowship",
    name: "PET/CT and Theragnostics — Emory",
    site: "Emory PET Center and Winship",
    years: 1,
    board: "PET/CT fellowship",
    track: "nm",
    group: "Imaging",
  },
  {
    slug: "emory-abdominal",
    school: "emory",
    kind: "fellowship",
    name: "Abdominal Imaging — Emory",
    site: "Emory University Hospital",
    years: 1,
    board: "Abdominal radiology fellowship",
    track: "rad",
    group: "Imaging",
  },
  {
    slug: "emory-breast",
    school: "emory",
    kind: "fellowship",
    name: "Breast Imaging — Emory",
    site: "Emory breast imaging",
    years: 1,
    board: "Breast imaging fellowship",
    track: "rad",
    group: "Imaging",
  },
  {
    slug: "emory-cardiothoracic",
    school: "emory",
    kind: "fellowship",
    name: "Cardiothoracic Imaging — Emory",
    site: "Emory University Hospital",
    years: 1,
    board: "Cardiothoracic imaging fellowship",
    track: "rad",
    group: "Imaging",
  },
  {
    slug: "emory-emergency",
    school: "emory",
    kind: "fellowship",
    name: "Emergency and Trauma Imaging — Emory",
    site: "Grady Memorial and Emory Midtown",
    years: 1,
    board: "Emergency radiology fellowship",
    track: "rad",
    group: "Imaging",
  },
  {
    slug: "emory-ir",
    school: "emory",
    kind: "fellowship",
    name: "Interventional Radiology — Independent — Emory",
    site: "Emory and Grady",
    years: 2,
    board: "ABR Interventional Radiology",
    track: "rad",
    group: "Imaging",
  },
  {
    slug: "emory-msk",
    school: "emory",
    kind: "fellowship",
    name: "Musculoskeletal Imaging — Emory",
    site: "Emory University Hospital",
    years: 1,
    board: "Musculoskeletal radiology fellowship",
    track: "rad",
    group: "Imaging",
  },
  {
    slug: "emory-neurorad",
    school: "emory",
    kind: "fellowship",
    name: "Neuroradiology — Emory",
    site: "Emory University Hospital",
    years: 1,
    board: "ABR Neuroradiology",
    track: "rad",
    group: "Imaging",
  },
  {
    slug: "emory-peds-rad",
    school: "emory",
    kind: "fellowship",
    name: "Pediatric Radiology — Emory",
    site: "Children's Healthcare of Atlanta and Emory",
    years: 1,
    board: "ABR Pediatric Radiology",
    track: "rad",
    group: "Imaging",
  },
  {
    slug: "emory-informatics",
    school: "emory",
    kind: "fellowship",
    name: "Imaging Informatics — Emory",
    site: "Emory imaging informatics, hybrid with a clinical fellowship",
    years: 1,
    board: "Imaging informatics fellowship",
    track: "informatics",
    group: "Imaging",
  },
  {
    slug: "harvard-emergency-radiology",
    school: "harvard",
    kind: "fellowship",
    name: "Emergency Radiology — Massachusetts General",
    site: "Massachusetts General Hospital",
    years: 1,
    board: "Emergency radiology fellowship",
    track: "rad",
    group: "Imaging",
  },
  {
    slug: "harvard-head-neck",
    school: "harvard",
    kind: "fellowship",
    name: "Head and Neck Imaging — Mass General Brigham",
    site: "Mass General Brigham",
    years: 1,
    board: "Head and neck imaging fellowship",
    track: "rad",
    group: "Imaging",
  },
  {
    slug: "harvard-cardiothoracic",
    school: "harvard",
    kind: "fellowship",
    name: "Thoracic and Cardiovascular Imaging — Massachusetts General",
    site: "Massachusetts General Hospital",
    years: 1,
    board: "Cardiothoracic imaging fellowship",
    track: "rad",
    group: "Imaging",
  },
  {
    slug: "harvard-nuclear-cardiology",
    school: "harvard",
    kind: "fellowship",
    name: "Nuclear Cardiology — Massachusetts General",
    site: "Corrigan Minehan Heart Center",
    years: 1,
    board: "Nuclear cardiology fellowship",
    track: "nm",
    group: "Imaging",
  },
];

export type CourseLink = { label: string; href: string };

export type Rotation = {
  slug: string;
  rotations: string[];
  volume: string;
  signature: string;
  plateIds: string[];
  links: CourseLink[];
  ai: string;
};

export const rotations: Record<string, Rotation> = {
  "emory-nm": {
    slug: "emory-nm",
    rotations: [
      "Planar, SPECT, SPECT/CT, and PET/CT for oncology, brain, and inflammation at Emory University Hospital, Midtown, and the Atlanta VA.",
      "Nuclear cardiology: myocardial perfusion, viability, and cardiac PET.",
      "Theragnostics at a SNMMI Comprehensive Radiopharmaceutical Therapy Center: Lu-177 PSMA, Lu-177 DOTATATE, Ra-223, and I-131.",
    ],
    volume:
      "Course target for a nuclear track, not an Emory audit: 1,500–2,000 nuclear and PET studies across residency, inside a department whose diagnostic residents are aimed at well past ACGME floors.",
    signature: "PSMA-avid bone and nodal disease, with salivary and renal excretion left unlabeled as tumor.",
    plateIds: ["psma", "dotatate", "pyp"],
    links: [
      {
        label: "Emory nuclear medicine residency",
        href: "https://med.emory.edu/departments/radiology/education/nuclear-medicine-residency",
      },
      {
        label: "Emory nuclear medicine division",
        href: "https://med.emory.edu/departments/radiology/clinical_divisions/nuclear-medicine/index.html",
      },
    ],
    ai: "The Integrated Imaging Informatics Track and the Emory Empathetic AI for Health Institute sit beside the reading room: tool validation, radiomics, and whether a model is allowed into the workflow. They do not replace the hot-seat.",
  },
  "emory-mim": {
    slug: "emory-mim",
    rotations: [
      "MIM4 or MIM5: at least 32 months of diagnostic radiology and 16 months of nuclear medicine.",
      "Dual-board aim: ABR diagnostic radiology and ABNM.",
      "Same theragnostic service as the nuclear medicine residency, plus the diagnostic call the nuclear-only path does not cover.",
    ],
    volume:
      "Use the diagnostic targets on this page for the radiology months, and the 1,500–2,000 nuclear target for the molecular months. Emory does not publish those sums as a quota.",
    signature: "A resident who can read the CT and the PET on the same study without handing the CT away.",
    plateIds: ["psma", "hcc"],
    links: [
      {
        label: "Molecular Imaging in Medicine track",
        href: "https://med.emory.edu/departments/radiology/education/diagnostic-radiology-residency/residency-tracks/mim.html",
      },
    ],
    ai: "MIM residents can cross into the informatics track. The point is a model that fails closed, not a slide that says artificial intelligence.",
  },
  "emory-rad": {
    slug: "emory-rad",
    rotations: [
      "Diagnostic radiology across Emory University Hospital, Grady, and Emory Midtown.",
      "Molecular imaging is a track (MIM), not a rumor in the elective book.",
      "Call at Grady is the trauma volume. It is not the nuclear therapy list.",
    ],
    volume:
      "High-volume academic target used in this course: on the order of 38,000–48,000 studies over four diagnostic years. That is a reading target, not an Emory case log.",
    signature: "The plain film and the CT still decide most overnight calls. Nuclear medicine is the smaller, higher-stakes pile.",
    plateIds: ["dissection", "gbm"],
    links: [
      {
        label: "Emory fellowship directory",
        href: "https://med.emory.edu/departments/radiology/education/fellowships/index.html",
      },
    ],
    ai: "I3T residents are the liaison between the residency and imaging informatics. Application is in the first year, not a separate career imagined later.",
  },
  "harvard-jpnm": {
    slug: "harvard-jpnm",
    rotations: [
      "Joint Program based at Brigham and Women's, integrated with Dana-Farber, Mass General, Boston Children's, Beth Israel Deaconess, and VA Boston.",
      "Theranostic service: Lu-177 PSMA, Lu-177 DOTATATE, and Ra-223, plus radioactive iodine.",
      "Hybrid imaging including PET/MR at the Martinos Center, and an optional NIH T32 research year for qualifying fellows.",
    ],
    volume:
      "Same nuclear target as Emory in this course: 1,500–2,000 molecular studies, plus the conferences. Mass General Brigham does not hand this atlas its RVU report.",
    signature: "DOTATATE mapping of a neuroendocrine tumor, physiologic uncinate process left alone.",
    plateIds: ["dotatate", "psma", "pyp"],
    links: [
      {
        label: "Joint Program in Nuclear Medicine",
        href: "https://www.brighamandwomens.org/radiology/nuclear-medicine/joint-program-in-nuclear-medicine-jpnm-residency",
      },
      {
        label: "MGH nuclear medicine division",
        href: "https://www.massgeneral.org/imaging/approach/nuclear-medicine-molecular-imaging",
      },
    ],
    ai: "The Artificial Intelligence in Medicine program across Mass General and Harvard Medical School is where segmentation and triage models are tested. A fellow joins a project. The project does not sign the report.",
  },
  "harvard-nuclear-radiology": {
    slug: "harvard-nuclear-radiology",
    rotations: [
      "One nuclear radiology year across MGH and Brigham after diagnostic radiology.",
      "SPECT/CT, PET/CT, cardiac nuclear imaging, and the theragnostic list.",
      "Physics, radiopharmaceutical chemistry, and instrument quality control are part of the fellowship, not a weekend cram.",
    ],
    volume:
      "Fellowship add-on in this course: the nuclear 1,500–2,000 is the residency nuclear number; a dedicated year is additional specialized studies, not a second full diagnostic residency.",
    signature: "Post-therapy distribution that matches the pre-therapy PET, or the therapy does not go forward.",
    plateIds: ["psma", "dotatate"],
    links: [
      {
        label: "MGH radiology fellowships",
        href: "https://www.massgeneral.org/imaging/education/fellowships/radiology-fellowships",
      },
      {
        label: "Joint Program in Nuclear Medicine",
        href: "https://www.brighamandwomens.org/radiology/nuclear-medicine/joint-program-in-nuclear-medicine-jpnm-residency",
      },
    ],
    ai: "Same AIM bench as the joint program. Validation means a held-out set and a failure mode, not a screenshot of a heatmap.",
  },
  "emory-nuclear-radiology": {
    slug: "emory-nuclear-radiology",
    rotations: [
      "ABR nuclear radiology year, with ABNM eligibility for trainees who complete the residency path.",
      "General nuclear medicine plus the therapy clinic.",
      "Pediatric nuclear medicine is in the Emory experience, not farmed out as a rumor.",
    ],
    volume: "One year on the therapy and PET services. Count studies you dictated, not studies that scrolled past.",
    signature: "I-131 whole-body scan: salivary, gastric, and bowel activity are not metastases until they persist and make sense.",
    plateIds: ["psma", "pyp"],
    links: [
      {
        label: "Emory nuclear radiology fellowship",
        href: "https://med.emory.edu/departments/radiology/education/fellowships/nuclear-radiology.html",
      },
    ],
    ai: "Informatics fellowship can be paired. It is a second acceptance, not an automatic add-on.",
  },
  "emory-pet-ct": {
    slug: "emory-pet-ct",
    rotations: [
      "PET/CT interpretation with protected research time and novel tracers.",
      "Theragnostics at the PET Center, Midtown, Saint Joseph's, Johns Creek, Grady, and the Atlanta VA.",
      "A second year is discretionary, not promised.",
    ],
    volume: "PET-heavy year. Oncologic FDG, PSMA, and DOTATATE should be ordinary, not a field trip.",
    signature: "Somatostatin-receptor map of a neuroendocrine tumor. High-grade disease may need FDG instead.",
    plateIds: ["dotatate", "psma"],
    links: [
      {
        label: "Emory PET/CT fellowship",
        href: "https://med.emory.edu/departments/radiology/education/fellowships/pet-ct.html",
      },
    ],
    ai: "Quantitative PET belongs next to the informatics group when a biomarker is going to be believed. SUVmax copied into a note is not a biomarker.",
  },
  "emory-abdominal": {
    slug: "emory-abdominal",
    rotations: [
      "CT, MRI, and ultrasound of liver, pancreas, kidney, and pelvis.",
      "PET/MRI when the cancer question is both metabolic and anatomic.",
      "Multiphasic liver technique until wash-in and wash-out are reflex.",
    ],
    volume: "Course target: 10,000–12,000 body studies in residency, plus about 4,000 in a body fellowship. Not an Emory printout.",
    signature: "Hepatocellular carcinoma: arterial hyperenhancement, later washout, and a look at the portal vein.",
    plateIds: ["hcc"],
    links: [
      {
        label: "Emory abdominal imaging fellowship",
        href: "https://med.emory.edu/departments/radiology/education/fellowships/abdominal-imaging.html",
      },
    ],
    ai: "Segmentation tools are judged on missed lesions, not on a demo liver.",
  },
  "harvard-abdominal-radiology": {
    slug: "harvard-abdominal-radiology",
    rotations: [
      "Multimodality abdomen and pelvis, with biopsies, drains, and ablations on the intervention side of the fellowship.",
      "Liver, pancreas, and renal protocols read against LI-RADS and the actual prior.",
      "Tumor board is part of the week, not an elective.",
    ],
    volume: "Same body target: 10,000–12,000 residency studies and about 4,000 in the fellowship year.",
    signature: "Know a hemangioma by peripheral puddling and fill-in so it is not called a metastasis.",
    plateIds: ["hcc"],
    links: [
      {
        label: "MGH radiology fellowships",
        href: "https://www.massgeneral.org/imaging/education/fellowships/radiology-fellowships",
      },
    ],
    ai: "AIM projects on this service are segmentation and triage. They do not assign LI-RADS.",
  },
  "emory-breast": {
    slug: "emory-breast",
    rotations: [
      "Tomosynthesis, diagnostic mammography, ultrasound, and MRI-guided biopsy.",
      "BI-RADS as a decision, including what to do with a discordant biopsy.",
    ],
    volume: "Course target: 2,500–3,500 breast studies in residency and about 1,500 in fellowship.",
    signature: "Irregular high-density mass with distortion. This file is invasive carcinoma, not a calcification-only DCIS case.",
    plateIds: ["breastca"],
    links: [
      {
        label: "Emory breast imaging fellowship",
        href: "https://med.emory.edu/departments/radiology/education/fellowships/breast-imaging.html",
      },
    ],
    ai: "A mammography model is unsafe until someone has counted the cancers it skipped.",
  },
  "harvard-breast-imaging": {
    slug: "harvard-breast-imaging",
    rotations: [
      "Screening and diagnostic breast imaging, biopsy, and MRI localization.",
      "The lexicon is BI-RADS. The job is the next step, not a synonym for the finding.",
    ],
    volume: "Same breast target as the Emory year.",
    signature: "Spiculated mass and skin retraction for invasive ductal carcinoma. Linear pleomorphic calcifications are the DCIS pattern to know even when this still does not show them.",
    plateIds: ["breastca"],
    links: [
      {
        label: "MGH radiology fellowships",
        href: "https://www.massgeneral.org/imaging/education/fellowships/radiology-fellowships",
      },
    ],
    ai: "Computer-aided detection is an old lesson: sensitivity without a false-positive count is a brochure.",
  },
  "emory-cardiothoracic": {
    slug: "emory-cardiothoracic",
    rotations: [
      "Cardiac MRI, cardiac CT, thoracic oncology, and interstitial lung disease on HRCT.",
      "Pulmonary embolism, aortic dissection, and viability are the calls that cannot wait on a conference.",
    ],
    volume: "Course target: 8,000–10,000 cardiothoracic studies in residency and about 3,000 in fellowship.",
    signature: "Stanford A dissection: flap in the ascending aorta. UIP is subpleural basilar honeycombing; the fibrosis file here is a mixed fibrosing case, so do not pretend it is the classic honeycomb slide.",
    plateIds: ["dissection", "fibrosis"],
    links: [
      {
        label: "Emory cardiothoracic fellowship",
        href: "https://med.emory.edu/departments/radiology/education/fellowships/cardiothoracic-imaging.html",
      },
    ],
    ai: "Nodule detectors need a site-specific false-positive rate before they change a Fleischner decision.",
  },
  "harvard-cardiothoracic": {
    slug: "harvard-cardiothoracic",
    rotations: [
      "Thoracic and cardiovascular imaging, including cardiac CT and MRI.",
      "ILD pattern, PE risk on CTPA, and viability on late gadolinium enhancement.",
    ],
    volume: "Same chest target: 8,000–10,000 plus about 3,000 in the fellowship year.",
    signature: "Intimal flap through the ascending aorta. Cardiac amyloid on MRI is subendocardial late gadolinium; the nuclear counterpart is the PYP file on the nuclear course.",
    plateIds: ["dissection", "fibrosis"],
    links: [
      {
        label: "MGH radiology fellowships",
        href: "https://www.massgeneral.org/imaging/education/fellowships/radiology-fellowships",
      },
    ],
    ai: "PE and dissection algorithms are triage. A negative algorithm does not cancel the scan you were going to read.",
  },
  "emory-emergency": {
    slug: "emory-emergency",
    rotations: [
      "Overnight and daytime trauma and emergency CT at Grady and Emory Midtown.",
      "The report is a decision: operate, watch, or send home.",
    ],
    volume: "Trauma CT is where the plain-film and CT targets get made. Speed without a miss log is not a skill.",
    signature: "Stanford A flap and the tension pneumothorax pattern already in the radiology teaching files.",
    plateIds: ["dissection"],
    links: [
      {
        label: "Emory emergency and trauma imaging",
        href: "https://med.emory.edu/departments/radiology/education/fellowships/er.html",
      },
    ],
    ai: "Worklist triage that hides a positive study is a safety event, not an efficiency.",
  },
  "harvard-emergency-radiology": {
    slug: "harvard-emergency-radiology",
    rotations: [
      "Emergency radiology at Mass General, including trauma and dual-energy or photon-counting CT when the scanner is that one.",
      "The first emergency radiology fellowship in the country still reads the undifferentiated night list.",
    ],
    volume: "High overnight CT volume. The course does not invent an MGH tally.",
    signature: "A dissection flap or an intracranial bleed has to be named in the first lines of the report.",
    plateIds: ["dissection", "mca"],
    links: [
      {
        label: "MGH radiology fellowships",
        href: "https://www.massgeneral.org/imaging/education/fellowships/radiology-fellowships",
      },
    ],
    ai: "Decision support on the emergency list is allowed only with a known miss rate.",
  },
  "emory-ir": {
    slug: "emory-ir",
    rotations: [
      "Independent interventional radiology: oncologic, vascular, and nonvascular procedures.",
      "Y-90 microspheres are done with nuclear medicine, not instead of it.",
    ],
    volume: "Procedure log, not a diagnostic study count. A biopsy you did not perform is not your number.",
    signature: "The map before a liver therapy is the nuclear scan. The puncture is not the dosimetry.",
    plateIds: ["hcc"],
    links: [
      {
        label: "Emory interventional radiology fellowship",
        href: "https://med.emory.edu/departments/radiology/education/fellowships/ir-image-guided-medicine.html",
      },
    ],
    ai: "Navigation tools do not choose the vessel.",
  },
  "emory-msk": {
    slug: "emory-msk",
    rotations: [
      "MRI, CT, and radiographs of joints, sports injury, and bone and soft-tissue tumors.",
      "Image-guided bone and soft-tissue biopsy.",
    ],
    volume: "Course target: 5,000–6,000 MSK studies in residency and about 2,500 in fellowship.",
    signature: "Osteosarcoma: medullary destruction, soft-tissue mass, Codman triangle or sunburst. This radiograph is the mineralized humeral lesion.",
    plateIds: ["osteosarcoma", "ra"],
    links: [
      {
        label: "Emory musculoskeletal fellowship",
        href: "https://med.emory.edu/departments/radiology/education/fellowships/musculoskeletal-radiology.html",
      },
    ],
    ai: "Fracture detectors on plain film are the easy demo. Tumor matrix is not.",
  },
  "harvard-musculoskeletal-radiology": {
    slug: "harvard-musculoskeletal-radiology",
    rotations: [
      "Orthopedic, tumor, and sports MRI, plus arthrography, spine procedures, and soft-tissue biopsy.",
      "Matrix first: osteoid, chondroid, fibrous. Then the margin.",
    ],
    volume: "Same MSK target: 5,000–6,000 plus about 2,500.",
    signature: "Chondroid matrix is rings and arcs. Rheumatoid hands are symmetric marginal erosions, which this file shows.",
    plateIds: ["osteosarcoma", "ra"],
    links: [
      {
        label: "MGH radiology fellowships",
        href: "https://www.massgeneral.org/imaging/education/fellowships/radiology-fellowships",
      },
    ],
    ai: "A bone-age model is not a tumor model. Do not reuse the claim.",
  },
  "emory-neurorad": {
    slug: "emory-neurorad",
    rotations: [
      "Brain, spine, head and neck, and pediatric neuroimaging.",
      "Stroke MRI as diffusion and ADC together, not a bright spot alone.",
    ],
    volume: "Course target: 9,000–11,000 neuroradiology studies in residency and about 3,500 in fellowship.",
    signature: "Ring-enhancing necrotic glioma. The board butterfly crosses the corpus callosum; this Radiopaedia file is multicentric glioblastoma, a sibling pattern.",
    plateIds: ["gbm", "mca"],
    links: [
      {
        label: "Emory neuroradiology fellowship",
        href: "https://med.emory.edu/departments/radiology/education/fellowships/neuroradiology/index.html",
      },
    ],
    ai: "Stroke triage tools get a clock time and a false-negative count, or they stay off the list.",
  },
  "harvard-neuroradiology": {
    slug: "harvard-neuroradiology",
    rotations: [
      "Neuro-oncology, stroke, head and neck, and advanced MRI across Mass General Brigham.",
      "Functional and skull-base work is a year, not a chapter.",
    ],
    volume: "Same neuro target: 9,000–11,000 plus about 3,500.",
    signature: "Restricted diffusion with a dark ADC is cytotoxic edema. Dawson's fingers are the MS pattern to name even without a dedicated still in this set.",
    plateIds: ["gbm", "mca"],
    links: [
      {
        label: "MGH radiology fellowships",
        href: "https://www.massgeneral.org/imaging/education/fellowships/radiology-fellowships",
      },
    ],
    ai: "AIM segmentation of a glioma is research until a neuroradiologist has compared it with the volume they would contour.",
  },
  "harvard-head-neck": {
    slug: "harvard-head-neck",
    rotations: [
      "Skull base, temporal bone, and aerodigestive tract on high-resolution CT and MRI.",
      "Perineural spread and cartilage invasion are the misses that change an operation.",
    ],
    volume: "Counted inside the neuroradiology total, not a separate 10,000.",
    signature: "Name the space. A node and a primary are different sentences.",
    plateIds: ["gbm"],
    links: [
      {
        label: "MGH radiology fellowships",
        href: "https://www.massgeneral.org/imaging/education/fellowships/radiology-fellowships",
      },
    ],
    ai: "No head-and-neck model replaces the cranial-nerve map.",
  },
  "emory-peds-rad": {
    slug: "emory-peds-rad",
    rotations: [
      "Pediatric body CT, MRI, ultrasound, and fluoroscopy, with interventional or neuroradiology options.",
      "Dose is a clinical decision in a child, not a footer on the dose report.",
    ],
    volume: "Pediatric studies are part of the residency totals. A fellowship year is children, not a repeat of the adult list.",
    signature: "Intussusception target sign and the neonate who cannot be imaged like an adult.",
    plateIds: ["intuss"],
    links: [
      {
        label: "Emory pediatric radiology fellowships",
        href: "https://med.emory.edu/departments/radiology/education/fellowships/pediatric-radiology/index.html",
      },
    ],
    ai: "Adult-trained detectors do not transfer to a newborn chest.",
  },
  "harvard-pediatric-radiology": {
    slug: "harvard-pediatric-radiology",
    rotations: [
      "Boston Children's and Mass General Brigham: fetal MR, pediatric cardiovascular imaging, and dose control.",
      "Lines, guts, and bones. The adult cancer protocols are the wrong habit.",
    ],
    volume: "A year of children. Do not quote the adult 12,000 CT number here.",
    signature: "Target sign of intussusception. Necrotizing enterocolitis is the other film already on the pediatric tracks.",
    plateIds: ["intuss"],
    links: [
      {
        label: "MGH radiology fellowships",
        href: "https://www.massgeneral.org/imaging/education/fellowships/radiology-fellowships",
      },
    ],
    ai: "Bone-age tools are the one pediatric model with a narrow job. They still need a local check.",
  },
  "emory-informatics": {
    slug: "emory-informatics",
    rotations: [
      "Half the year is imaging informatics, half is a clinical fellowship you were also accepted to.",
      "DICOM, PACS, governance, and a project that ships or is killed with a reason.",
    ],
    volume: "Not a study count. The output is a tool in the workflow or a written decision not to deploy it.",
    signature: "A teaching-file case with a series, a key image, and a license. That is the data model before any model.",
    plateIds: ["pe"],
    links: [
      {
        label: "Emory imaging informatics fellowship",
        href: "https://med.emory.edu/departments/radiology/education/fellowships/imaging-informatics.html",
      },
      {
        label: "Integrated Imaging Informatics Track",
        href: "https://med.emory.edu/departments/radiology/education/diagnostic-radiology-residency/residency-tracks/imaging-informatics-integrated-track.html",
      },
    ],
    ai: "This is the AI year. Governance means who is allowed to turn the model on, and who reads the cases it changed.",
  },
  "harvard-nuclear-cardiology": {
    slug: "harvard-nuclear-cardiology",
    rotations: [
      "SPECT myocardial perfusion, cardiac PET, stress supervision, and molecular cardiac imaging at the Corrigan Minehan Heart Center.",
      "Not an ABR or ABIM certificate. It is a one-year clinical fellowship, with an optional PET second year.",
      "Viability versus scar, and PYP for ATTR amyloid, are the patterns that change a drug.",
    ],
    volume: "A cardiology fellow's nuclear year, not the 12,000-CT diagnostic number.",
    signature: "Grade 3 PYP: heart brighter than ribs, blood pool gone. Exclude light-chain amyloid with blood tests before the scan is allowed to stand alone.",
    plateIds: ["pyp"],
    links: [
      {
        label: "MGH nuclear cardiology fellowship",
        href: "https://www.massgeneral.org/heart-center/education-and-training/nuclear-cardiology-fellowship",
      },
    ],
    ai: "Flow and scar models are quantitative only after the reconstruction and the attenuation correction are trusted.",
  },
};

export const houses: { school: "emory" | "harvard"; slugs: string[] }[] = [
  {
    school: "emory",
    slugs: [
      "emory-nm",
      "emory-mim",
      "emory-rad",
      "emory-nuclear-radiology",
      "emory-pet-ct",
      "emory-abdominal",
      "emory-breast",
      "emory-cardiothoracic",
      "emory-emergency",
      "emory-ir",
      "emory-msk",
      "emory-neurorad",
      "emory-peds-rad",
      "emory-informatics",
    ],
  },
  {
    school: "harvard",
    slugs: [
      "harvard-jpnm",
      "harvard-nuclear-radiology",
      "harvard-nuclear-cardiology",
      "harvard-abdominal-radiology",
      "harvard-musculoskeletal-radiology",
      "harvard-breast-imaging",
      "harvard-neuroradiology",
      "harvard-head-neck",
      "harvard-pediatric-radiology",
      "harvard-emergency-radiology",
      "harvard-cardiothoracic",
    ],
  },
];

export const modalityTargets: { name: string; range: string; kinds: string }[] = [
  {
    name: "Radiographs and fluoroscopy",
    range: "18,000–20,000",
    kinds: "Chest films, trauma series, pediatric bones, barium, arthrograms",
  },
  {
    name: "CT",
    range: "12,000–14,000",
    kinds: "Head, CTA, perfusion, abdomen and pelvis, HRCT",
  },
  {
    name: "MRI",
    range: "4,500–5,500",
    kinds: "Brain and spine, prostate, joints, cardiac",
  },
  {
    name: "Ultrasound",
    range: "3,500–4,500",
    kinds: "Abdomen, pelvic, DVT, thyroid, early pregnancy",
  },
  {
    name: "Nuclear medicine and PET",
    range: "1,200–1,800",
    kinds: "FDG, PSMA, DOTATATE, perfusion SPECT, V/Q, bone, post-therapy scans",
  },
  {
    name: "Breast imaging",
    range: "1,200–1,500",
    kinds: "Tomosynthesis, diagnostic mammogram, ultrasound, MRI biopsy",
  },
];

export const libraries: CourseLink[] = [
  { label: "Radiopaedia", href: "https://radiopaedia.org/" },
  { label: "MedPix", href: "https://medpix.nlm.nih.gov/" },
  { label: "ARRS GoldMiner", href: "https://goldminer.arrs.org/" },
  { label: "Radiology Assistant", href: "https://radiologyassistant.nl/" },
  { label: "SNMMI", href: "https://www.snmmi.org/" },
];

export const readSteps: { title: string; body: string; plateId: string }[] = [
  {
    title: "Name the tracer before the picture",
    body: "PSMA, DOTATATE, FDG, PYP, and pertechnetate answer different questions. A hot focus means nothing until the radiopharmaceutical and the hour are written down.",
    plateId: "dotatate",
  },
  {
    title: "Mark what the body always does",
    body: "DOTATATE belongs in spleen, kidneys, pituitary, and the uncinate process. PSMA belongs in salivary glands, kidneys, and small bowel. Call those tumor and the rest of the read is noise.",
    plateId: "psma",
  },
  {
    title: "Then say what treatment the picture allows",
    body: "Avid disease on the diagnostic pair is what justifies Lu-177. Grade 3 PYP, after light chains are excluded, is what justifies treating transthyretin amyloid. The still is the indication, not a decoration.",
    plateId: "pyp",
  },
];
