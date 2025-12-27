// Icon.js
import { 
    ArrowBigUp,
    Sparkles,
    Mic,
    X
    } from "lucide-react";
  
  const ICON_MAP = {
    submitButton: ArrowBigUp,
    ai: Sparkles,
    mic: Mic,
    cross: X,
  };
  
  export default function Icon({ name, size = 20, color = "var(--text-color)", marginLeft = "o", marginRight = "0", ...props }) {
    const IconComponent = ICON_MAP[name];
    if (!IconComponent) return null;
  
    return (
      <IconComponent
        size={size}
        style={{
          marginRight,
          marginLeft,
          verticalAlign: "middle",
          flexShrink: 0,
          transition: "color 0.2s ease",
          ...props.style
        }}
        {...props}
      />
    );
  }
  