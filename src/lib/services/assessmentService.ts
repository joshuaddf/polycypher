export interface PcosFormData {
  pcos: "Yes" | "No" | "";
  follicleR: string;
  follicleL: string;
  skinDarkening: "Yes" | "No" | "";
  hairGrowth: "Yes" | "No" | "";
  weightGain: "Yes" | "No" | "";
  cycle: "Regular" | "Irregular" | "";
  fastFood: "Yes" | "No" | "";
  pimples: "Yes" | "No" | "";
  amh: string;
  weight: string;
}

export const saveAssessment = async (formData: PcosFormData, score: string) => {
  try {
    const response = await fetch('/api/assessment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        score: parseFloat(score),
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to save assessment');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error saving assessment:', error);
    throw error;
  }
};

export const getAssessments = async () => {
  try {
    const response = await fetch('/api/assessment');
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.error || `HTTP ${response.status}: ${response.statusText}`;
      throw new Error(`Failed to fetch assessments: ${errorMessage}`);
    }

    const data = await response.json();
    return data.assessments;
  } catch (error) {
    console.error('Error fetching assessments:', error);
    throw error;
  }
};
