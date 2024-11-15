"use client";

import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  LineChart,
  Megaphone,
  RefreshCw,
  Settings,
  Users,
} from "lucide-react";
import { useState } from "react";

const steps = [
  {
    title: "User Registration",
    icon: Users,
    description:
      "Register new users and manage their profiles with ease. This step ensures that all user data is securely stored and easily accessible for future reference.",
  },
  {
    title: "Data Synchronization",
    icon: RefreshCw,
    description:
      "Seamlessly synchronize data across multiple platforms. This process guarantees that all information is up-to-date and consistent, regardless of where it is accessed.",
  },
  {
    title: "System Configuration",
    icon: Settings,
    description:
      "Configure system settings and preferences efficiently. This step allows for customization of the system to meet specific needs and optimize performance.",
  },
  {
    title: "Performance Analysis",
    icon: LineChart,
    description:
      "Analyze system performance and generate detailed reports. This step provides insights into system efficiency and helps identify areas for improvement.",
  },
  {
    title: "Marketing Campaign",
    icon: Megaphone,
    description:
      "Effectively launch and manage marketing campaigns. This step includes planning, execution, and monitoring of campaigns to ensure maximum reach and impact.",
  },
];

export default function ProductionSlider() {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    setCurrentStep((prev) => (prev === steps.length - 1 ? prev : prev + 1));
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev === 0 ? prev : prev - 1));
  };

  const goToStep = (index: number) => {
    setCurrentStep(index);
  };

  const getProgressWidth = () => {
    const visibleStepsArray = visibleSteps();
    const firstVisibleIndex = steps.indexOf(visibleStepsArray[0]);
    const lastVisibleIndex = steps.indexOf(
      visibleStepsArray[visibleStepsArray.length - 1]
    );
    const currentPosition = currentStep - firstVisibleIndex;

    if (currentStep < firstVisibleIndex) return "0%";
    if (currentStep > lastVisibleIndex) return "100%";

    return `${(currentPosition / (visibleStepsArray.length - 1)) * 100}%`;
  };

  const isStepActive = (step: (typeof steps)[0]) => {
    const stepIndex = steps.indexOf(step);
    const visibleStepsArray = visibleSteps();
    const firstVisibleIndex = steps.indexOf(visibleStepsArray[0]);
    const currentVisibleIndex = stepIndex - firstVisibleIndex;

    return currentVisibleIndex <= currentStep - firstVisibleIndex;
  };

  const visibleSteps = () => {
    const start = Math.max(0, Math.min(currentStep - 2, steps.length - 5));
    return steps.slice(start, start + 5);
  };
  return (
    <section className="min-h-screen bg-[#1a1f24] bg-[url('/bg-pattern.png')] bg-cover bg-center text-white py-20 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          className="text-6xl font-light text-center mb-32 tracking-wider"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          PRODUCTION
        </motion.h1>

        <div className="relative px-8">
          {/* Steps with icons and connecting lines */}
          <div className="flex justify-between items-start mb-32 relative">
            {visibleSteps().map((step, index) => {
              const Icon = step.icon;
              const stepActive = isStepActive(step);
              const stepIndex = steps.indexOf(step);

              return (
                <motion.div
                  key={stepIndex}
                  className="relative flex flex-col items-center"
                  style={{ width: "20%" }}
                  initial={{
                    x: index === 4 ? 100 : 0,
                    opacity: index === 4 ? 0 : 1,
                  }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{
                    x: index === 0 ? -100 : 0,
                    opacity: index === 0 ? 0 : 1,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className={`w-16 h-16 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-300 ${
                      stepActive ? "bg-[#37b25c] scale-[1.5]" : "bg-gray-600"
                    }`}
                    whileHover={{ scale: 1.5 }}
                    onClick={() => goToStep(stepIndex)}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>

                  <div
                    className={`h-16 w-[2px] transition-colors duration-300 ${
                      stepActive ? "bg-[#37b24d]" : "bg-gray-600"
                    }`}
                  />

                  <p
                    className={`text-center text-sm font-light tracking-wide transition-colors duration-300 ${
                      stepActive ? "text-white" : "text-gray-400"
                    }`}
                  >
                    {step.title}
                  </p>

                  <div
                    className={`h-16 w-[2px] transition-colors duration-300 ${
                      stepActive ? "bg-[#37b24d]" : "bg-gray-600"
                    }`}
                  />

                  <motion.div
                    className={`absolute z-50 bottom-0 w-6 h-6 rounded-full transition-colors duration-300 ${
                      stepActive ? "bg-[#37b24d]" : "bg-gray-600"
                    }`}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => goToStep(stepIndex)}
                  />
                </motion.div>
              );
            })}

            <div className="absolute bottom-[6px] left-[2%] right-[2%] h-[10px] rounded-md">
              <div className="absolute w-full h-full bg-white/90 rounded-md" />
              <motion.div
                className="absolute h-full bg-[#37b24d] origin-left rounded-md"
                initial={{ width: "0%" }}
                animate={{
                  width:
                    currentStep === 0
                      ? "9%"
                      : currentStep === 1
                      ? "29.9%"
                      : getProgressWidth(),
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </div>
            <button
              onClick={prevStep}
              className="absolute left-0 -bottom-5 transform -translate-y-1/2 -translate-x-full"
              disabled={currentStep === 0}
            >
              <ChevronLeft
                className={`w-8 h-8 ${
                  currentStep === 0 ? "text-gray-600" : "text-white"
                }`}
              />
            </button>
            <button
              onClick={nextStep}
              className="absolute right-0 -bottom-5 transform -translate-y-1/2 translate-x-full"
              disabled={currentStep === steps.length - 1}
            >
              <ChevronRight
                className={`w-8 h-8 ${
                  currentStep === steps.length - 1
                    ? "text-gray-600"
                    : "text-white"
                }`}
              />
            </button>
          </div>
        </div>

        <motion.div
          key={currentStep}
          className="text-center max-w-4xl mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-4xl font-light mb-8">Parts Assemble</h2>
          <p className="text-gray-300 leading-relaxed text-center">
            {steps[currentStep].description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
