"use client";
import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button"; // Optional shadcn button component
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function LandingPage() {
  const { setAppState } = useAppContext();
  useEffect(() => {
    setAppState((old) => ({ ...old, hasSidebar: false }));
  }, []);
  return (
    <main className="bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
        <div className="text-2xl font-bold">CampusCue</div>
        <nav className="space-x-6 hidden md:flex">
          <a href="#features" className="hover:text-blue-600">
            Features
          </a>
          <a href="#about" className="hover:text-blue-600">
            About Us
          </a>
          <a href="#testimonials" className="hover:text-blue-600">
            Testimonials
          </a>
          <a href="#contact" className="hover:text-blue-600">
            Contact
          </a>
        </nav>
        <div className="space-x-4">
          <Link href="/auth/login">
            <Button variant="outline" className="hidden sm:inline-block">
              Login
            </Button>
          </Link>
          <Link href="/auth/signup">
            <Button>Sign Up</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center p-5 bg-blue-50 flex flex-col md:flex-row items-center justify-around gap-10">
        <div className="max-w-[500px]">
          <h1 className="text-4xl font-bold mb-4">
            Streamline Your Campus Experience with CampusCue!
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Your one-stop solution for managing events, communication, and
            campus resources.
          </p>
          <div className="space-x-4">
            <Link href={"/auth/login"}>
              <Button className="bg-blue-600 text-white">Get Started</Button>
            </Link>
            <Link href="#">
              <Button variant="outline">Explore Features</Button>
            </Link>
          </div>
        </div>
        <Image
          src="/imgs/hero-illustration.webp" // Replace with your image
          alt="Campus collaboration"
          width={400}
          height={400}
          className="rounded-3xl"
        />
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-6 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-8">
          Why Choose CampusCue?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Event Management",
              description:
                "Plan, schedule, and track campus events effortlessly.",
            },
            {
              title: "QnA Forums",
              description:
                "Engage in discussions, ask questions, and find answers within the campus community.",
            },
            {
              title: "Seamless Communication",
              description:
                "Stay updated with real-time announcements and notifications.",
            },
            {
              title: "Task Collaboration",
              description:
                "Assign tasks, set deadlines, and collaborate with teams.",
            },
            {
              title: "Centralized Resources",
              description:
                "Access important documents, schedules, and faculty details.",
            },
            {
              title: "Analytics Dashboard",
              description:
                "Track performance, attendance, and event engagement.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow hover:shadow-lg"
            >
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-16 px-6 bg-white">
        <h2 className="text-3xl font-bold text-center mb-8">
          Built for Campuses, by Campus Enthusiasts!
        </h2>
        <p className="text-lg text-center text-gray-600 mx-auto max-w-3xl">
          CampusCue was developed to solve common challenges faced by students,
          faculty, and administrators in managing campus activities and
          resources. Our mission is to make campus life smoother and more
          productive for everyone.
        </p>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="py-16 px-6 bg-blue-50 text-gray-800"
      >
        <h2 className="text-3xl font-bold text-center mb-8">
          Hear What Our Users Say!
        </h2>
        <div className="flex flex-col md:flex-row justify-center gap-8">
          {[
            "CampusCue has transformed how we manage campus events!",
            "I never miss an announcement or deadline thanks to CampusCue!",
          ].map((testimonial, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow hover:shadow-lg text-center"
            >
              <p className="text-gray-600">&quot;{testimonial}&quot;</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 text-center bg-blue-600 text-white">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Simplify Campus Life?
        </h2>
        <p className="text-lg mb-6">
          Join CampusCue today and make your campus experience seamless!
        </p>
        <div className="space-x-4">
          <Button className="bg-white text-blue-600">Sign Up Now</Button>
          <Button variant="outline" className="text-white border-white">
            Request a Demo
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-6 text-center">
        <p>&copy; 2024 CampusCue. All Rights Reserved.</p>
        <div className="mt-4 space-x-4">
          <a href="#" className="hover:text-white">
            LinkedIn
          </a>
          <a href="#" className="hover:text-white">
            Twitter
          </a>
          <a href="#" className="hover:text-white">
            Instagram
          </a>
        </div>
      </footer>

      {/* loader while check if user is logged in  */}
      {/* <div className="min-h-screen w-full fixed bg-primary centered flex-col z-auto top-0 left-0">
      <Loader message={"CampusCue"}/>
      asldkfjl;dsfj
    </div> */}
      <div className="fixed bottom-3 left-3">
        <ModeToggle />
      </div>
    </main>
  );
}
