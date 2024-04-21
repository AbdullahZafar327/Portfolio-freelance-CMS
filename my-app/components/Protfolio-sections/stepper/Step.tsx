import { Eye, PersonStanding } from "lucide-react";
import React from "react";

interface StepProps {
  currentStep: number;
  numberOfSteps: number;
}

const Step = ({ currentStep, numberOfSteps }: StepProps) => {
  const steps = [
    { name: "Sign Up", icon: <Eye /> },
    { name: "Create", icon: <PersonStanding /> },
    { name: "Payment", icon: <Eye /> },
    { name: "dashboard", icon: <PersonStanding /> },
    { name: "Download", icon: <Eye /> },
    // Add more steps as needed
  ];

  const activeColor = (index: number) =>
    currentStep >= index ? "bg-blue-500" : "bg-gray-300";

  return (
    <>
    <div className="flex  flex-col md:flex-row w-full items-center justify-center">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
            <div className="flex md:flex-col flex-row items-center justify-center md:w-fit w-full ">
             <div className="flex items-center text-center">
             <p>{step.name}</p>
             </div>
            <div className="flex md:flex-row flex-col items-center justify-center md:w-fit w-full">
              <div
                className={`w-12 h-12 rounded-full items-center justify-center text-2xl font-bold text-white text-center ${activeColor(
                  index
                )}`}
              >
                {index + 1}
              </div>
              <div
                className={`md:w-24 md:h-2 w-2 h-24 ${activeColor(index)}`}
              />
            </div>
            </div>
        </React.Fragment>
      ))}
      </div>
    </>
  );
};

export default Step;
