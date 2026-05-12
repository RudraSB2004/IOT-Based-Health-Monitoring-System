import { useEffect } from "react";

import socket from "../services/socket";

import { useDispatch } from "react-redux";

import { setLiveData, addAlert } from "../redux/slices/healthSlice";

import toast from "react-hot-toast";

const useSocket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("health-data", (data) => {
      dispatch(setLiveData(data));

      // Critical alerts
      if (data.status === "critical") {
        dispatch(addAlert(data));

        toast.error("Critical Patient Condition!");
      }

      if (data.spo2 < 90) {
        toast.error("Low Oxygen Detected!");
      }

      if (data.heartRate > 120) {
        toast.error("Abnormal Heart Rate!");
      }
    });

    return () => {
      socket.off("health-data");
    };
  }, []);
};

export default useSocket;
