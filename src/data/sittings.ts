import type { Lecture } from "@/data/catalog";

/** Public lectures that were not in the generated catalog. They count. */
export const extraLectures: Lecture[] = [
  {
    id: "pdNptrG--VU",
    title: "22/23 FINALS CRASH COURSE SERIES: Palliative Care",
    channel: "Med Crash Course",
    sec: 4162,
    tags: ["hpm"],
  },
  {
    id: "PViG3SqAR4o",
    title: "Introduction to Clinical Informatics and the American Medical Informatics Association (AMIA)",
    channel: "American Physician Scientists Association",
    sec: 3495,
    tags: ["informatics"],
  },
  {
    id: "clIkuoAdwBw",
    title: "Geriatric Review of Systems - Complete Lecture",
    channel: "Health4TheWorld Academy",
    sec: 3666,
    tags: ["geri"],
  },
];

export const extraById: Record<string, Lecture> = Object.fromEntries(
  extraLectures.map((lecture) => [lecture.id, lecture]),
);

/** Track key → lecture id added on top of the generated catalog. */
export const extraByTrack: Record<string, string> = {
  hpm: "pdNptrG--VU",
  informatics: "PViG3SqAR4o",
  geri: "clIkuoAdwBw",
};

/**
 * Featured full-length public lecture for each track.
 * Ids already in the catalog are the longest on-topic tape.
 * hpm, informatics, and geri point at extraLectures.
 */
export const flagshipId: Record<string, string> = {
  "internal-medicine": "uTOFL7l0zjY",
  cardiology: "iaO8110iSzI",
  ep: "-n_ciSV3oDE",
  "heart-failure": "Gsu8NT1yYes",
  gi: "e-P-L0oGXgo",
  hepatology: "e-P-L0oGXgo",
  pulm: "uTOFL7l0zjY",
  heme: "_kN2Nnz0nk8",
  neph: "DTgPBOmPRcg",
  id: "Tg76jhm8KPI",
  endo: "epWJ2v5qy5E",
  rheum: "FJRIg-HCy7g",
  allergy: "7_hiaCq2rew",
  geri: "clIkuoAdwBw",
  sleep: "qIGX9PwUaV8",
  neuro: "WQjcaCblig8",
  peds: "UCzg7T6mzhM",
  psych: "1_9d5VMrR_Q",
  em: "WSTRmmicv2s",
  surgery: "5BoaZmvbi20",
  anes: "Yb-QdmiglyY",
  ob: "MO-UbMtTjRU",
  ortho: "sol2EPG5wCQ",
  ophtho: "bigy-lBQuAI",
  ent: "UCzg7T6mzhM",
  uro: "unFGw52Z-I8",
  derm: "jBzorLUeMBs",
  rad: "Y5cv0SRQ4d8",
  nm: "l2OVu-JSU2Y",
  radonc: "dO2-upHgt0o",
  path: "ECILVABYPPI",
  pmr: "KUdwcpv0qmc",
  nsg: "1Z6xhYVO-SQ",
  plastics: "a23M51EKT_A",
  fm: "u2InL4kVQn8",
  "med-peds": "WSTRmmicv2s",
  "med-derm": "jBzorLUeMBs",
  "child-neuro": "fMF04LiaLFY",
  nicu: "hgmVTD1MsFI",
  "cards-peds": "orjnzBGSNx4",
  "peds-cc": "hgmVTD1MsFI",
  "peds-surg": "WSTRmmicv2s",
  pem: "WSTRmmicv2s",
  pain: "Yb-QdmiglyY",
  tox: "ukFzex4Z0Wk",
  omfs: "q7qcQhR2M-Q",
  transplant: "5BoaZmvbi20",
  hpm: "pdNptrG--VU",
  addiction: "1_9d5VMrR_Q",
  informatics: "PViG3SqAR4o",
  genetics: "e-P-L0oGXgo",
  ndd: "WSTRmmicv2s",
  transitional: "5BoaZmvbi20",
};
