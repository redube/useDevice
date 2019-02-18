const Resizer = function({ state, breakpoints = [] }) {
  const client = {};

  let width = window.innerWidth;
  let height = window.innerHeight;

  if (state.os === "iOS") {
    width = screen.width;
    height = screen.height;
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
    if (!min)
      console.warning(
        "If you dont define a min, the min value will be -Infinity"
      );

    if (width > minLimit && width <= maxLimit) return true;
  });

  return { ...client, width, height, breakpoint: breakpoint.name || null };
};

export default Resizer;
