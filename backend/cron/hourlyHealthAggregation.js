const cron = require("node-cron");

const RealtimeHealthData = require("../models/RealtimeHealthData");

const HourlyHealthSummary = require("../models/HourlyHealthSummary");

// =====================================
// RUN EVERY HOUR
// =====================================

cron.schedule("0 * * * *", async () => {
  console.log("🕒 Running hourly aggregation...");

  try {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

    // =====================================
    // GET DISTINCT PATIENTS
    // =====================================

    const patients = await RealtimeHealthData.distinct("patient", {
      createdAt: {
        $gte: oneHourAgo,
      },
    });

    // =====================================
    // PROCESS EACH PATIENT
    // =====================================

    for (const patientId of patients) {
      const records = await RealtimeHealthData.find({
        patient: patientId,

        createdAt: {
          $gte: oneHourAgo,
        },
      });

      // =====================================
      // SKIP IF NO RECORDS
      // =====================================

      if (!records.length) continue;

      // =====================================
      // INITIALIZE VALUES
      // =====================================

      let totalTemp = 0;

      let totalHum = 0;

      let totalHR = 0;

      let totalSpo2 = 0;

      let validHRCount = 0;

      let validSpo2Count = 0;

      let minHR = Infinity;

      let maxHR = -Infinity;

      let minSpo2 = Infinity;

      let warnings = 0;

      let criticals = 0;

      // =====================================
      // PROCESS RECORDS
      // =====================================

      for (const r of records) {
        const temp = Number(r.temperature) || 0;

        const hum = Number(r.humidity) || 0;

        const hr = Number(r.heartRate);

        const oxygen = Number(r.spo2);

        // =================================
        // TEMPERATURE
        // =================================

        totalTemp += temp;

        // =================================
        // HUMIDITY
        // =================================

        totalHum += hum;

        // =================================
        // HEART RATE
        // =================================

        if (!isNaN(hr)) {
          totalHR += hr;

          validHRCount++;

          minHR = Math.min(minHR, hr);

          maxHR = Math.max(maxHR, hr);
        }

        // =================================
        // SPO2
        // =================================

        if (!isNaN(oxygen)) {
          totalSpo2 += oxygen;

          validSpo2Count++;

          minSpo2 = Math.min(minSpo2, oxygen);
        }

        // =================================
        // STATUS COUNTS
        // =================================

        if (r.status === "warning") {
          warnings++;
        }

        if (r.status === "critical") {
          criticals++;
        }
      }

      // =====================================
      // STORE SUMMARY
      // =====================================

      await HourlyHealthSummary.create({
        patient: patientId,

        hourStart: oneHourAgo,

        avgTemperature: totalTemp / records.length,

        avgHumidity: totalHum / records.length,

        avgHeartRate: validHRCount > 0 ? totalHR / validHRCount : 0,

        minHeartRate: minHR === Infinity ? 0 : minHR,

        maxHeartRate: maxHR === -Infinity ? 0 : maxHR,

        avgSpo2: validSpo2Count > 0 ? totalSpo2 / validSpo2Count : 0,

        minSpo2: minSpo2 === Infinity ? 0 : minSpo2,

        warnings,

        criticals,

        totalRecords: records.length,
      });

      console.log(`✅ Hourly summary created for patient ${patientId}`);
    }
  } catch (error) {
    console.error("❌ Hourly Aggregation Error:", error);
  }
});
