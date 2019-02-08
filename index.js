import { useEffect, useState } from "react";
import deviceTemplate from "./DeviceProperties";
import resizer from "./Resizer";

export default () => {
  const [deviceProperties, setDeviceProperties] = useState({
    ...deviceTemplate
  });

  useEffect(() => {
    const handleResize = () => {
      const properties = resizer();
      setDeviceProperties(data => ({
        ...data,
        ...properties
      }));
    };
    window.addEventListener("resize", resizer);
    return () => window.removeEventListener("resize", resizer);
  });

  return deviceProperties;
};
