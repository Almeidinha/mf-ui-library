const encodeSvg = (svg: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

export const indeterminateSvg = encodeSvg(`
  <svg xmlns='http://www.w3.org/2000/svg' width='14' height='16' viewBox='0 0 10 8'>
    <rect fill='white' width='10' height='2' rx='1'/>
  </svg>
`);

export const checkSvg = encodeSvg(`
  <svg xmlns='http://www.w3.org/2000/svg' width='14' height='16' viewBox='0 0 10 8'>
    <path d='M4.5 7.3L1 4l1.4-1.4 2.1 2.1L8.6 0l1.4 1.4z' fill='white'/>
  </svg>
`);
