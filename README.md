# useDevice
React Hook for detect device properties

### Install

```
npm install -S usedevice
```

### Usage

```
import useDevice from 'usedevice';

const Component = () => {
  const device = useDevice();
  
  return (
    <section>...</section>
  );
};
```

Device wil have the following properties

```
{
  browser: "Chrome",
  device: "desktop",
  height: 438,
  isIE: false,
  isMobileAgent: false,
  isOrientationCapable: true,
  isTouch: false,
  orientation: "landscape",
  os: "Mac OS X",
  screenSize: "desktop",
  version: "10_11_5",
  width: 1292,
}
```

In every resize the hook will execute and return a new object with the new properties
