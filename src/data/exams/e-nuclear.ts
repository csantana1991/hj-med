import type { Exam } from "./types";

export const nuclearExam: Exam = {
  board: "American Board of Nuclear Medicine",
  pass: 70,
  minutes: 24,
  items: [
    {
      id: "nm-01",
      blueprint: "Theranostics",
      stem: "A post-therapy Lu-177 PSMA SPECT shows intense foci in sclerotic bones, plus uptake in salivary glands and renal cortex. What is the correct read?",
      choices: [
        "Avid bone metastases with expected salivary and renal excretion",
        "Only salivary disease; bone uptake is free technetium",
        "Renal failure, because kidneys must be blank on PSMA",
        "Brain metastases, because PSMA never leaves the skull",
        "A failed injection, because any bone uptake is artifact",
      ],
      answer: 0,
      explain:
        "Lu-177 PSMA targets PSMA-expressing prostate cancer in bone and nodes. Salivary glands and kidneys are physiologic excretion, not extra tumors. They are still organs that limit dose.",
    },
    {
      id: "nm-02",
      blueprint: "Theranostics",
      stem: "Which pair is the somatostatin-receptor theranostic pair used for well-differentiated neuroendocrine tumors?",
      choices: [
        "Ga-68 or Cu-64 DOTATATE imaging, then Lu-177 DOTATATE therapy",
        "FDG PET, then Ra-223",
        "Tc-99m PYP, then I-131",
        "In-111 WBC scan, then Lu-177 PSMA",
        "DaTscan, then cold iodine",
      ],
      answer: 0,
      explain:
        "DOTATATE images the somatostatin receptor. Lu-177 DOTATATE treats receptor-positive neuroendocrine tumors. FDG is a better fit for poorly differentiated, high-grade disease that has lost the receptor.",
    },
    {
      id: "nm-03",
      blueprint: "Theranostics",
      stem: "Ra-223 dichloride in castration-resistant prostate cancer is best described as what?",
      choices: [
        "An alpha-emitting calcium mimetic for symptomatic bone metastases",
        "A gamma camera tracer for lymph nodes",
        "A pure beta emitter given for liver metastases",
        "A somatostatin antagonist",
        "Oral iodine for Graves disease",
      ],
      answer: 0,
      explain:
        "Ra-223 is an alpha emitter that follows calcium into bone. It is for symptomatic osteoblastic metastases, not for nodal disease and not a diagnostic imaging agent.",
    },
    {
      id: "nm-04",
      blueprint: "Oncologic PET",
      stem: "An FDG brain PET shows symmetric hypometabolism in the temporoparietal cortex and posterior cingulate, with the sensorimotor strip spared. Which dementia fits?",
      choices: [
        "Alzheimer disease",
        "Frontotemporal dementia, which hits the frontal and anterior temporal lobes first",
        "A middle-cerebral-artery stroke, which is bilateral and symmetric",
        "Essential tremor",
        "Normal aging, which erases the posterior cingulate first",
      ],
      answer: 0,
      explain:
        "The Alzheimer pattern is posterior: temporoparietal and posterior cingulate, relatively sparing the primary sensorimotor cortex. Frontotemporal dementia is anterior.",
    },
    {
      id: "nm-05",
      blueprint: "Nuclear cardiology",
      stem: "Tc-99m PYP at 3 hours shows myocardial uptake brighter than the ribs and no blood-pool activity. Heart-to-contralateral ratio is 1.8. What is required before this is called ATTR amyloid?",
      choices: [
        "Serum and urine testing that excludes a light-chain clone",
        "A brain FDG PET",
        "A positive DaTscan",
        "Nothing; grade 3 uptake diagnoses AL amyloid by itself",
        "A radioactive iodine uptake, which must be high",
      ],
      answer: 0,
      explain:
        "Grade 3 PYP (heart greater than rib, elevated heart-to-contralateral ratio) is specific for ATTR only after AL amyloid is excluded with free light chains and immunofixation. The Radiopaedia ATTR file in this course is that pattern.",
    },
    {
      id: "nm-06",
      blueprint: "Thyroid",
      stem: "A technetium thyroid scan shows one hot nodule and suppression of the rest of the gland. The patient is thyrotoxic. What is the lesion?",
      choices: [
        "An autonomous toxic nodule",
        "Graves disease, which is a single cold nodule",
        "Hashimoto thyroiditis, which is a solitary hot nodule with suppression",
        "Medullary thyroid cancer, the usual hot nodule",
        "A parathyroid adenoma, which concentrates pertechnetate like thyroid",
      ],
      answer: 0,
      explain:
        "A toxic adenoma is focal uptake with the rest of the gland shut off. Graves disease is diffuse uptake. Cold nodules are the ones that need a biopsy pathway, not this hot suppressed pattern.",
    },
    {
      id: "nm-07",
      blueprint: "PET pitfalls",
      stem: "Symmetric FDG uptake in the supraclavicular fat of a thin patient scanned in a cold room. What is it?",
      choices: [
        "Brown fat, physiologic",
        "Bilateral Virchow nodes",
        "A leak of FDG at both antecubital fossae",
        "PSMA physiologic salivary uptake",
        "Grade 3 cardiac amyloid",
      ],
      answer: 0,
      explain:
        "Activated brown fat is symmetric, in fat, and worse when the patient is cold. Nodes are focal and not confined to fat. Warming the room, or sometimes a benzodiazepine, is the practical fix.",
    },
    {
      id: "nm-08",
      blueprint: "PSMA",
      stem: "Where is intense uptake allowed on a PSMA PET without calling disease?",
      choices: [
        "Kidneys, ureters, salivary glands, and often small bowel or celiac ganglia",
        "Only in the prostate; any other focus is metastasis",
        "Only in the brain",
        "Only in the lungs",
        "Nowhere; PSMA is silent in normal organs",
      ],
      answer: 0,
      explain:
        "PSMA is a misnomer. Kidneys and salivary glands are routinely avid, and celiac ganglia can mimic nodes. The bone or pelvic node that is avid on top of that map is the cancer.",
    },
    {
      id: "nm-09",
      blueprint: "Lung",
      stem: "A V/Q scan shows a segmental perfusion defect with normal ventilation in that segment. What is the classic interpretation?",
      choices: [
        "Mismatched defect, high concern for pulmonary embolism",
        "Reverse mismatch, which is a clot",
        "A normal study",
        "Cardiac amyloid",
        "Alzheimer pattern in the lung",
      ],
      answer: 0,
      explain:
        "Embolism stops blood flow and leaves air in the segment: perfusion defect, ventilation preserved. Airway disease is the opposite, a reverse mismatch, or matched defects.",
    },
    {
      id: "nm-10",
      blueprint: "Brain SPECT",
      stem: "A DaTscan shows loss of putaminal uptake in a patient with rest tremor and rigidity. What does a normal DaTscan favor instead?",
      choices: [
        "Essential tremor or drug-induced parkinsonism rather than a presynaptic dopamine deficit",
        "Alzheimer disease, which is a DaTscan diagnosis",
        "Graves disease",
        "A pulmonary embolus",
        "ATTR amyloid of the heart",
      ],
      answer: 0,
      explain:
        "DaTscan looks at presynaptic dopamine transporters. Loss supports degenerative parkinsonism. A normal scan pushes the diagnosis toward essential tremor or a drug effect, not toward Alzheimer disease.",
    },
    {
      id: "nm-11",
      blueprint: "Safety",
      stem: "Before I-131 is given to a patient who can become pregnant, what has to be documented?",
      choices: [
        "A negative pregnancy test within the window the written directive requires",
        "A normal chest radiograph only",
        "A DaTscan",
        "Brown-fat suppression with a cold room",
        "Nothing if the dose is under 5 mCi",
      ],
      answer: 0,
      explain:
        "I-131 crosses the placenta and ablates the fetal thyroid. A pregnancy test is part of the therapy checklist, including for doses used in hyperthyroidism. The written directive is not optional.",
    },
    {
      id: "nm-12",
      blueprint: "Oncologic PET",
      stem: "A well-differentiated small-bowel neuroendocrine tumor is being staged. Which tracer matches the tumor biology?",
      choices: [
        "Ga-68 DOTATATE",
        "Tc-99m PYP",
        "I-123 ioflupane",
        "Tc-99m MAG3 as a tumor agent",
        "Xe-133 ventilation",
      ],
      answer: 0,
      explain:
        "Well-differentiated neuroendocrine tumors overexpress somatostatin receptors, which DOTATATE images. PYP is for cardiac amyloid. Ioflupane is DaTscan. MAG3 is renal function. Xenon is ventilation.",
    },
  ],
};
