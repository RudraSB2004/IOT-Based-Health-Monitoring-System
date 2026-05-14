import { Bell, AlertTriangle } from "lucide-react";

const NotificationPanel = ({ alerts = [] }) => {
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
      {/* HEADER */}

      <div
        className="
        flex
        items-center
        gap-3
        mb-6
        "
      >
        <Bell className="text-cyan-400" />

        <h2
          className="
          text-2xl
          text-cyan-400
          "
        >
          Emergency Alerts
        </h2>
      </div>

      {/* EMPTY STATE */}

      {alerts.length === 0 ? (
        <div className="h-[250px] flex flex-col items-center justify-center text-gray-500">
          <AlertTriangle size={40} className="mb-4 opacity-40" />

          <p>No active alerts</p>

          <p className="text-sm mt-2">AI monitoring active</p>
        </div>
      ) : (
        <div
          className="
          space-y-4
          "
        >
          {alerts.map((alert, index) => (
            <div
              key={index}
              className={`
                p-4
                rounded-xl
                border
                backdrop-blur-md

                ${
                  alert.status === "critical"
                    ? "bg-red-500/20 border-red-500"
                    : "bg-yellow-500/20 border-yellow-500"
                }
                `}
            >
              <div className="flex justify-between items-center mb-2">
                <p className="font-bold">
                  {alert.status === "critical"
                    ? "Critical Condition"
                    : "Warning Detected"}
                </p>

                <span className="text-xs text-gray-400">
                  {new Date(alert.createdAt || Date.now()).toLocaleTimeString()}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <p>
                  HR: <span className="text-red-300">{alert.heartRate}</span>
                </p>

                <p>
                  SpO2: <span className="text-cyan-300">{alert.spo2}%</span>
                </p>

                <p>Temp: {alert.temperature}°C</p>

                <p>Status: {alert.status}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;
