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

### Breakpoints

You can pass an array of breakpoints to the hook

```
import useDevice from 'usedevice';

const breakpoints = [
  {name: 'miniphone', min: 0, max: 320},
  {name: 'phone', min: 320, max: 640},
  {name: 'tablet', min: 640, max: 1080},
  {name: 'desktop', min: 1080, max: Infinity},
];

const Component = () => {
  const device = useDevice(breakpoints);

  return (
    <section>...</section>
  );
};
```

In the constant device you will receive the prop breakpoint with the name of the breakpoint matching, if multiple breakpoints match the name is from the first match.

```
{
  breakpoint: 'desktop'
  width: 1292,
}

{
  breakpoint: 'phone'
  width: 540,
}
```
