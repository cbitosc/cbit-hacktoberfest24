import React, { useState, useCallback } from "react";
import { useFormContext, useWatch } from "react-hook-form";

const TechStackSelection = React.memo(() => {
  const { register, setValue } = useFormContext();
  const [customTechStack, setCustomTechStack] = useState("");
  const techStacks = [
    "Frontend Development",
    "Backend Development",
    "UI/UX",
    "Machine Learning and Artificial Intelligence",
    "Other",
  ];

  const selectedTechStack = useWatch({ name: "techStack" });

  const handleCustomTechStackChange = useCallback((e) => {
    setCustomTechStack(e.target.value);
  }, []);

  const handleTechStackChange = useCallback((e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    const currentTechStack = selectedTechStack || [];

    if (value === "Other" && isChecked) {
      setValue("techStack", [...currentTechStack.filter(item => item !== "Other"), "Other"], { shouldValidate: true });
    } else if (value === "Other" && !isChecked) {
      setValue("techStack", currentTechStack.filter(item => item !== "Other" && item !== customTechStack), { shouldValidate: true });
      setCustomTechStack("");
    } else {
      setValue("techStack", 
        isChecked 
          ? [...currentTechStack, value]
          : currentTechStack.filter(item => item !== value),
        { shouldValidate: true }
      );
    }
  }, [setValue, selectedTechStack, customTechStack]);

  const handleCustomTechStackBlur = useCallback(() => {
    if (customTechStack.trim() !== "") {
      const currentTechStack = selectedTechStack || [];
      setValue("techStack", [...currentTechStack.filter(item => item !== "Other"), customTechStack], { shouldValidate: true });
    }
  }, [setValue, selectedTechStack, customTechStack]);

  return (
    <div className="mb-6">
      <label className="text-white block mb-2">
        Team Tech Stack
      </label>
      <div className="p-4 border border-green rounded-md">
        {techStacks.map((stack, idx) => (
          <label key={idx} className="flex items-center space-x-2">
            <input
              type="checkbox"
              value={stack}
              checked={selectedTechStack?.includes(stack)}
              onChange={handleTechStackChange}
              className="form-checkbox"
            />
            <span className="text-white">{stack}</span>
          </label>
        ))}
        {selectedTechStack?.includes("Other") && (
          <input
            type="text"
            value={customTechStack}
            onChange={handleCustomTechStackChange}
            onBlur={handleCustomTechStackBlur}
            placeholder="Enter custom tech stack"
            className="mt-2 w-full px-3 py-2 border border-green text-white bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-pink"
          />
        )}
      </div>
    </div>
  );
});

export default TechStackSelection;