import { useEffect, useState } from "react";
import deviceTemplate from "./DeviceProperties";
import resizer from "./Resizer";

export default () => {
  const [deviceProperties, setDeviceProperties] = useState({
    ...deviceTemplate
  });

  useEffect(() => {
    const handleResize = () => {
      const properties = resizer(deviceProperties);
      setDeviceProperties(data => ({
        ...data,
        ...properties
      }));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  return deviceProperties;
};
