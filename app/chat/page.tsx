import Chat from "@/app/components/chat";

export default async function Page() {
  return (
    <div className="flex min-h-full w-full">
      <div className="flex w-full pt-10">
        <Chat />
      </div>
    </div>
  );
}
