import { useEffect } from 'react';

export const useKeyboardNavigation = (
  items, 
  selectedItem, 
  setSelectedItem
) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      const currentIndex = items.indexOf(selectedItem);
      let nextIndex = currentIndex;

      switch (event.key) {
        case "ArrowUp":
          if (currentIndex > 0) nextIndex--;
          break;
        case "ArrowDown":
          if (currentIndex < items.length - 1) nextIndex++;
          break;
        case "Enter":
          break;
        default:
          return;
      }
      
      setSelectedItem(items[nextIndex]);
    };

    // Attach the event listener
    window.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [items, selectedItem, setSelectedItem]);
};
