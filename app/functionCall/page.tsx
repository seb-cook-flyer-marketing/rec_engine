import Chat from "@/app/components/functionCall";

export default async function Page() {
  return (
    <div className="flex min-h-full">
      <div className="flex min-w-full pt-10">
        <Chat />
      </div>
    </div>
  );
}
