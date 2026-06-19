import CardsList from "@/components/CardsList";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 min-h-screen items-center justify-center bg-zinc-950 text-white font-sans pt-8">
      <main className="p-6">
        <header className="mb-8 flex flex-col gap-1">
          <h1 className="text-5xl font-bold">Galería Gatuna 😻</h1>
          <p className="text-lg text-gray-300">¡Aquí podrás disfrutar de algunas imagenes de gatos recogidos de una API externa para prácticar consumo y renderizado en React!</p>
        </header>
        <CardsList />
      </main>
    </div>
  );
}
