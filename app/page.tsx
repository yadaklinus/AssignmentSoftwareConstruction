import { SurveyForm } from "@/components/SurveyForm";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-8 py-8 md:py-16">
      <div className="w-full max-w-4xl px-4">
        <SurveyForm />
      </div>
    </section>
  );
}
