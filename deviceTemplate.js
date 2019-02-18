var isMobile = (function() {
  var u = navigator.userAgent;
  var b =
    u.match(/Android/i) ||
    u.match(/webOS/i) ||
    u.match(/iPhone/i) ||
    u.match(/iPad/i) ||
    u.match(/iPod/i) ||
    u.match(/BlackBerry/i) ||
    u.match(/Windows Phone/i);
  if (b) return true;
  else return false;
})();

var os = (function() {
  var nAgt = navigator.userAgent;
  var nVer = navigator.appVersion;
  var os;

  var clientStrings = [
    { s: "Windows 10", r: /(Windows 10.0|Windows NT 10.0)/ },
    { s: "Windows 8.1", r: /(Windows 8.1|Windows NT 6.3)/ },
    { s: "Windows 8", r: /(Windows 8|Windows NT 6.2)/ },
    { s: "Windows 7", r: /(Windows 7|Windows NT 6.1)/ },
    { s: "Windows Vista", r: /Windows NT 6.0/ },
    { s: "Windows Server 2003", r: /Windows NT 5.2/ },
    { s: "Windows XP", r: /(Windows NT 5.1|Windows XP)/ },
    { s: "Windows 2000", r: /(Windows NT 5.0|Windows 2000)/ },
    { s: "Windows ME", r: /(Win 9x 4.90|Windows ME)/ },
    { s: "Windows 98", r: /(Windows 98|Win98)/ },
    { s: "Windows 95", r: /(Windows 95|Win95|Windows_95)/ },
    { s: "Windows NT 4.0", r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ },
    { s: "Windows CE", r: /Windows CE/ },
    { s: "Windows 3.11", r: /Win16/ },
    { s: "Android", r: /Android/ },
    { s: "Open BSD", r: /OpenBSD/ },
    { s: "Sun OS", r: /SunOS/ },
    { s: "Linux", r: /(Linux|X11)/ },
    { s: "iOS", r: /(iPhone|iPad|iPod)/ },
    { s: "Mac OS X", r: /Mac OS X/ },
    { s: "Mac OS", r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
    { s: "QNX", r: /QNX/ },
    { s: "UNIX", r: /UNIX/ },
    { s: "BeOS", r: /BeOS/ },
    { s: "OS/2", r: /OS\/2/ },
    {
      s: "Search Bot",
      r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/
    }
  ];

  for (var id in clientStrings) {
    var cs = clientStrings[id];
    if (cs.r.test(nAgt)) {
      os = cs.s;
      break;
    }
  }

  var osVersion = "unknown";

  if (/Windows/.test(os)) {
    osVersion = /Windows (.*)/.exec(os)[1];
    os = "Windows";
  }

  switch (os) {
    case "Mac OS X":
      osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
      break;

    case "Android":
      osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
      break;

    case "iOS":
      osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
      osVersion = osVersion[1] + "." + osVersion[2] + "." + (osVersion[3] | 0);
      break;
  }

  var browser = "unknow";

  if (nAgt.indexOf("Opera") != -1) {
    browser = "Opera";
  } else if (nAgt.indexOf("MSIE") != -1) {
    browser = "Microsoft Internet Explorer";
  } else if (nAgt.indexOf("Chrome") != -1) {
    browser = "Chrome";
  } else if (nAgt.indexOf("Safari") != -1) {
    browser = "Safari";
  } else if (nAgt.indexOf("Firefox") != -1) {
    browser = "Firefox";
  } else if (nAgt.indexOf("Trident/") != -1) {
    browser = "Microsoft Internet Explorer +11";
  }

  return {
    os: os,
    version: osVersion,
    browser: browser
  };
})();

var device = (function() {
  if (isMobile) {
    var width;
    if (window.matchMedia("(orientation: portrait)").matches) {
      width = window.innerWidth;
      if (os.os === "iOS") width = screen.width;
    } else {
      width = window.innerHeight;
      if (os.os === "iOS") width = screen.height;
    }
    if (width < 650) return "phone";
    else return "tablet";
  } else {
    if (window.innerWidth > 1200) return "desktop";
    else if (window.innerWidth < 815) return "phone";
    else return "tablet";
  }
})();

export default {
  isTouch: (function() {
    var b =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0;
    if (b) return true;
    else return false;
  })(),
  isMobileAgent: isMobile,
  isIE: (function() {
    var myNav = navigator.userAgent.toLowerCase();
    return myNav.indexOf("msie") != -1
      ? parseInt(myNav.split("msie")[1])
      : false;
  })(),
  device,
  width: (os.os === "iOS" && screen.width) || window.innerWidth,
  height: (os.os === "iOS" && screen.height) || window.innerHeight,
  screenSize: device,
  isOrientationCapable: (function() {
    if (typeof window.matchMedia === "undefined") return false;
    else return true;
  })(),
  orientation: (function() {
    if (typeof window.matchMedia === "undefined") return "NOT_COMPATIBLE";
    else {
      if (window.matchMedia("(orientation: portrait)").matches)
        return "portrait";
      else return "landscape";
    }
  })(),
  browser: os.browser,
  os: os.os,
  version: os.version
};
