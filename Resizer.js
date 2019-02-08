const Resizer = function() {
  const client = {};
  let width = window.innerWidth;
  let height = window.innerHeight;

  if (state.os === "iOS") {
    width = screen.width;
    height = screen.height;
  }

  if (!state.isMobileAgent) {
    if (width > 1200) {
      client.screenSize = "desktop";
    } else if (width < 815) {
      client.screenSize = "phone";
    } else {
      client.screenSize = "tablet";
    }
  }

  if (width < height) {
    client.orientation = "portrait";
  } else {
    client.orientation = "landscape";
  }

  return { ...client, width, height };
};

export default Resizer;
