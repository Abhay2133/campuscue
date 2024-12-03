import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FC } from "react";

const features = [
  {
    title: "Event Management",
    description: "Plan, schedule, and track campus events effortlessly.",
  },
  {
    title: "Seamless Communication",
    description:
      "Stay updated with real-time announcements and notifications.",
  },
  {
    title: "Task Collaboration",
    description: "Assign tasks, set deadlines, and collaborate with teams.",
  },
  {
    title: "Centralized Resources",
    description:
      "Access important documents, schedules, and faculty details.",
  },
  {
    title: "Analytics Dashboard",
    description: "Track performance, attendance, and event engagement.",
  },
];

const FeaturesSection: FC = () => {
  return (
    <section id="features" className="py-16 px-6 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-8">
        Why Choose CampusCue?
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="hover:shadow-lg transition-shadow duration-300"
          >
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
