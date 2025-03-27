declare module '*.css' {
    const content: Record<string, string>;
    export default content;
  }
  
  // Для SVG
  declare module '*.svg' {
    const content: string; // URL файла
    export default content;
  }
  
  declare module '*.module.css' {
    const classes: Record<string, string>;
    export default classes;
  }