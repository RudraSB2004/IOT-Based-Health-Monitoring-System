export const analyzeHealth = (data) => {
  let condition = "Healthy";

  let score = 100;

  let recommendation = "Normal";

  // Heart rate
  if (data.heartRate > 120) {
    score -= 30;

    condition = "Critical";

    recommendation = "Immediate medical attention required";
  }

  // SpO2
  if (data.spo2 < 90) {
    score -= 40;

    condition = "Danger";
  }

  // Temperature
  if (data.temperature > 38) {
    score -= 20;
  }

  return {
    condition,
    score,
    recommendation,
  };
};
