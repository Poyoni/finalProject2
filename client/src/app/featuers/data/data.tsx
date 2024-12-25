import React, { useState } from "react";

const Page: React.FC = () => {
  const [currentComponent, setCurrentComponent] = useState<null | "Component2" | "Component3">(null);

  return (
    <div>
      {/* קומפוננטה ראשונה */}
      <div style={{ display: currentComponent ? "none" : "block" }}>
        <h1>קומפוננטה ראשונה</h1>
        <button onClick={() => setCurrentComponent("Component2")}>הצג קומפוננטה שנייה</button>
        <button onClick={() => setCurrentComponent("Component3")}>הצג קומפוננטה שלישית</button>
      </div>

      {/* קומפוננטה שנייה */}
      {currentComponent === "Component2" && (
        <div>
          <h1>קומפוננטה שנייה</h1>
          <button onClick={() => setCurrentComponent(null)}>חזור לקומפוננטה ראשונה</button>
        </div>
      )}

      {/* קומפוננטה שלישית */}
      {currentComponent === "Component3" && (
        <div>
          <h1>קומפוננטה שלישית</h1>
          <button onClick={() => setCurrentComponent(null)}>חזור לקומפוננטה ראשונה</button>
        </div>
      )}
    </div>
  );
};

export default Page;
