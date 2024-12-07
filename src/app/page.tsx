'use client'
import Editor from "./components/Editor";

export default function Home() {
  return (
    <div className="py-10">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-xl md:text-3xl font-semibold pb-4">
          CodeSkilled Note App
        </h1>
        <Editor />
      </main>
    </div>
  );
}
