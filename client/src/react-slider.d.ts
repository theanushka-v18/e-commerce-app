declare module 'react-slider' {
    import * as React from 'react';
  
    interface ReactSliderProps {
      className?: string;
      thumbClassName?: string;
      trackClassName?: string;
      min?: number;
      max?: number;
      value?: number | number[];
      defaultValue?: number | number[];
      onChange?: (value: number | number[]) => void;
      pearling?: boolean;
      minDistance?: number;
      renderThumb?: (props: any, state: any) => JSX.Element;
      renderTrack?: (props: any, state: any) => JSX.Element;
      disabled?: boolean;
      invert?: boolean;
      marks?: boolean;
      step?: number;
    }
  
    const ReactSlider: React.ComponentType<ReactSliderProps>;
  
    export default ReactSlider;
  }