export const parseBackground = (background: string | number) => {
    console.log("Background:", background, "Type:", typeof background);
  
    if (typeof background !== "string") {
      return {
        gradient: false,
        direction: "to right",
        color1: "#ffffff",
        color2: "#ffffff",
        opacity1: 1,
        opacity2: 1,
        image: "",
        ImageSize: "cover",
      };
    }
  
    const gradientRegex = /linear-gradient\(([^)]+)\)/;
    const urlRegex = /url\(["']?(.*?)["']?\)/;
  
    const gradientMatch = background.match(gradientRegex);
    const urlMatch = background.match(urlRegex);
  
    let gradient = false;
    let direction = "to right";
    let color1 = "#ffffff";
    let color2 = "#ffffff";
    let opacity1 = 1;
    let opacity2 = 1;
    let image = "";
    let ImageSize = "cover";
  
    if (gradientMatch) {
      gradient = true;
      const gradientParts = gradientMatch[1].split(",");
      direction = gradientParts[0].trim(); // Extract direction
  
      const extractColorOpacity = (color: string) => {
        const rgbaMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
        const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  
        if (rgbaMatch) {
          const [r, g, b, a] = rgbaMatch.slice(1).map((c) => c.trim());
          return { color: `rgb(${r}, ${g}, ${b})`, opacity: parseFloat(a) };
        }
  
        if (rgbMatch) {
          const [r, g, b] = rgbMatch.slice(1).map((c) => c.trim());
          return { color: `rgb(${r}, ${g}, ${b})`, opacity: 1 }; // Default opacity is 1 for `rgb()`
        }
  
        return { color, opacity: 1 }; // Fallback
      };
  
      if (gradientParts.length >= 2) {
        const { color, opacity } = extractColorOpacity(gradientParts[1].trim());
        color1 = color;
        opacity1 = opacity;
      }
  
      if (gradientParts.length >= 3) {
        const { color, opacity } = extractColorOpacity(gradientParts[2].trim() || "#ffffff"); // Ensures valid input
        color2 = color;
        opacity2 = opacity;
      }
    }
  
    if (urlMatch) {
      image = urlMatch[1];
    }
  
    return {
      gradient,
      direction,
      color1,
      color2,
      opacity1,
      opacity2,
      image,
      ImageSize,
    };
  };
  