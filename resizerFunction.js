const Resizer = function({ deviceProperties: state, breakpoints = [] }) {
  const client = {};

  let width = state.width;
  let height = state.height;

  if (state.os === "iOS") {
    width = (window.screen && screen.width) || width;
    height = (window.screen && screen.height) || height;
  }

  if (!state.isMobileAgent) {
    if (width > 1200) client.screenSize = "desktop";
    else if (width < 815) client.screenSize = "phone";
    else client.screenSize = "tablet";
  }

  if (width < height) client.orientation = "portrait";
  else client.orientation = "landscape";

  const breakpoint = breakpoints.find(({ name, min, max }) => {
    if (!name) throw new Error("You need to define a name for your breakpoint");
    const maxLimit = max || Infinity;
    const minLimit = min || -Infinity;

    if (!max)
      console.warning(
        "If you dont define a max, the max value will be Infinity"
      );
    if (!min && min !== 0)
      console.warning(
        "If you dont define a min, the min value will be -Infinity"
      );

    if (width > minLimit && width <= maxLimit) return true;
  });

  return {
    ...client,
    width,
    height,
    breakpoint: (breakpoint && breakpoint.name) || null
  };
};

export default Resizer;
