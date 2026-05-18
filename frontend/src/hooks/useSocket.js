import { useEffect, useRef } from "react";

import socket from "../services/socket";

import { useDispatch } from "react-redux";

import {
  setLiveData,
  addAlert,
  setConnectionStatus,
} from "../redux/slices/healthSlice";

import toast from "react-hot-toast";

const useSocket = () => {

  const dispatch = useDispatch();

  // ====================================
  // PREVENT TOAST SPAM
  // ====================================

  const lastAlertTime = useRef(0);

  useEffect(() => {

    // ==================================
    // CONNECT
    // ==================================

    socket.on("connect", () => {

      console.log("Socket Connected:", socket.id);

      dispatch(setConnectionStatus(true));

      toast.success("Realtime Connected");
    });

    // ==================================
    // DISCONNECT
    // ==================================

    socket.on("disconnect", () => {

      console.log("Socket Disconnected");

      dispatch(setConnectionStatus(false));

      toast.error("Realtime Disconnected");
    });

    // ==================================
    // HEALTH DATA EVENT
    // ==================================

    const handleHealthData = (data) => {

      console.log("Live Health Data:", data);

      // ================================
      // UPDATE REDUX
      // ================================

      dispatch(setLiveData(data));

      // ================================
      // ALERT LOGIC
      // ================================

      const now = Date.now();

      // Prevent spam

      if (now - lastAlertTime.current < 10000) {
        return;
      }

      // ================================
      // CRITICAL
      // ================================

      if (data.status === "critical") {

        dispatch(addAlert(data));

        toast.error("Critical Patient Condition!");

        lastAlertTime.current = now;
      }

      // ================================
      // LOW SPO2
      // ================================

      if (data.spo2 < 90) {

        toast.error("Low Oxygen Detected!");

        lastAlertTime.current = now;
      }

      // ================================
      // HIGH HEART RATE
      // ================================

      if (data.heartRate > 120) {

        toast.error("Abnormal Heart Rate!");

        lastAlertTime.current = now;
      }
    };

    // ==================================
    // REGISTER LISTENER
    // ==================================

    socket.on("newHealthData", handleHealthData);

    // ==================================
    // CLEANUP
    // ==================================

    return () => {

      socket.off("newHealthData", handleHealthData);

      socket.off("connect");

      socket.off("disconnect");
    };

  }, [dispatch]);
};

export default useSocket;
