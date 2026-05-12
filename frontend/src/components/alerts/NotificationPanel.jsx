import { Bell } from "lucide-react";

const NotificationPanel = ({ alerts }) => {
  return (
    <div
      className="
    glass
    rounded-3xl
    p-6
    glow
    h-[400px]
    overflow-y-auto
    "
    >
      <div
        className="
      flex
      items-center
      gap-3
      mb-6
      "
      >
        <Bell />

        <h2
          className="
        text-2xl
        text-cyan-400
        "
        >
          Emergency Alerts
        </h2>
      </div>

      <div
        className="
      space-y-4
      "
      >
        {alerts.map((alert, index) => (
          <div
            key={index}
            className="
                bg-red-500/20
                border
                border-red-500
                p-4
                rounded-xl
                "
          >
            <p>Critical condition detected</p>

            <p
              className="
                text-sm
                text-gray-400
                "
            >
              HR:
              {alert.heartRate}| SpO2:
              {alert.spo2}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPanel;
