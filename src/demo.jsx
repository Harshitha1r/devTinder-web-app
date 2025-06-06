import React, { useState, useRef } from 'react';

const SwipeCard = () => {
  const [x, setX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const cardRef = useRef(null);

  const threshold = 100; // Swipe threshold in px

  // Touch Events
  const handleTouchStart = (e) => {
    setIsDragging(true);
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const delta = e.touches[0].clientX - startX.current;
    setX(delta);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (x > threshold) {
      swipe("right");
    } else if (x < -threshold) {
      swipe("left");
    } else {
      setX(0); // Reset position
    }
  };

  // Mouse Events
  const handleMouseDown = (e) => {
    setIsDragging(true);
    startX.current = e.clientX;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const delta = e.clientX - startX.current;
    setX(delta);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (x > threshold) {
      swipe("right");
    } else if (x < -threshold) {
      swipe("left");
    } else {
      setX(0);
    }
  };

  const swipe = (direction) => {
    console.log("Swiped", direction);
    const endX = direction === "left" ? -1000 : 1000;
    setX(endX); // animate out
    setTimeout(() => {
      // optionally remove the card
      setX(0); // reset or remove card
    }, 300);
  };

  return (
    <div
      ref={cardRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: `translate(-50%, -50%) translateX(${x}px)`,
        width: "400px",
        height: "400px",
        backgroundColor: "Crimson",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "24px",
        borderRadius: "20px",
        transition: isDragging ? "none" : "transform 0.3s ease",
        cursor: "grab",
      }}
    >
      Swipe Me
    </div>
  );
};
function AppSec() {
  return (
    <div className="h-screen w-screen bg-gray-100 relative overflow-hidden">
      <SwipeCard />
    </div>
  );
}

export default AppSec