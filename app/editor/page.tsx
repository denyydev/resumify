import { ResumeForm } from "@/components/resume/ResumeForm";
import { ResumePreview } from "@/components/resume/ResumePreview";

export default function EditorPage() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-100">
      <header className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold tracking-tight">
            Resume Builder
          </h1>
          <span className="text-sm text-slate-500">
            MVP · Local state (Zustand)
          </span>
        </div>
      </header>

      <section className="flex-1">
        <div className="max-w-6xl mx-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border p-4 lg:p-6">
            <ResumeForm />
          </div>

          <div className="bg-slate-50 rounded-xl border p-4 lg:p-6 overflow-auto">
            <ResumePreview />
          </div>
        </div>
      </section>
    </main>
  );
}
