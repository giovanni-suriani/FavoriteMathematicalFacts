declare module "react-native-math-view" {
    import { ComponentType } from "react";
    type Props = {
      math: string;
      style?: any;
      inline?: boolean;
      renderError?: (error: any) => JSX.Element;
    } & Record<string, any>;
  
    const MathView: ComponentType<Props>;
    export default MathView;
  }
  