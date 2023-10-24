declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module 'crossoriginworker' {
  function getCrossOriginWorkerURL(url: string): Promise<string>;

  export default getCrossOriginWorkerURL;
}
