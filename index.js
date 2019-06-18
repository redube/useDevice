import { useEffect, useState } from "react";
import deviceTemplate from "./deviceTemplate";
import resizer from "./resizerFunction";

/*****
 * @param {Object} params
 * @param {Array}  params.breakpoints      - List of breakpoints
 * @param {String} params.breakpoints.name - Name of breakpoint
 * @param {Number} params.breakpoints.min  - >  Amount of pixel
 * @param {Number} params.breakpoints.max  - <= Amount of pixel
 *****/

export default (props = {}) => {
  const { breakpoints = [], userAgent } = props || {};
  const template = deviceTemplate(userAgent);

  const { breakpoint } = resizer({
    deviceProperties: template,
    breakpoints
  });

  if (userAgent)
    return {
      ...template,
      breakpoint
    };

  const [deviceProperties, setDeviceProperties] = useState({
    ...template,
    breakpoint
  });

  useEffect(() => {
    const handleResize = () => {
      const properties = resizer({ deviceProperties, breakpoints });
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
