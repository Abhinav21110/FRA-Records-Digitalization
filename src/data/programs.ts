export type ProgramStat = {
  id: string;
  name: string;
  beneficiaries: number;
  budgetCr: number; // in crores
};

export const samplePrograms: ProgramStat[] = [
  { id: "pmkisan", name: "PM-KISAN", beneficiaries: 2000000, budgetCr: 4500 },
  { id: "jaljeevan", name: "Jal Jeevan Mission", beneficiaries: 1250000, budgetCr: 6200 },
  { id: "infra", name: "Rural Infra Dev.", beneficiaries: 750000, budgetCr: 3100 },
];


