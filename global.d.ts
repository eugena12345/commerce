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

  declare module '*.module.scss' {
    const classes: Record<string, string>;
    export default classes;
  }

  declare module 'components/*' {
    const content: any;
    export default content;
  }
  
  declare module 'config/*' {
    const content: any;
    export default content;
  }
  
  declare module 'styles/*' {
    const content: any;
    export default content;
  }
  
  declare module 'utils/*' {
    const content: any;
    export default content;
  }
  
  declare module 'models/*' {
    const content: any;
    export default content;
  }
  
  declare module 'store/*' {
    const content: any;
    export default content;
  }
  
  declare module 'pages/*' {
    const content: any;
    export default content;
  }
  
  declare module 'assets/*' {
    const content: any;
    export default content;
  }