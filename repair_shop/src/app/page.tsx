import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-black text-white bg-[url('/matrix-bg.jpg')] bg-cover bg-center ">
      <main className="flex flex-col justify-center items-center text-center max-w-5xl mx-auto h-dvh">
        <div className="flex flex-col gap-6 p-12 rounded-xl bg-black/10 w-4/5 sm:max-w-96 mx-auto backdrop-blur-xs">
          <h1 className="text-4xl font-bold">
            Flabingo&apos;s Computer <br />
            Repair Shop
          </h1>
          <br />
          <address>
            servey no.123/123 Random Colony <br />
            Chandani Chowk, Near China
          </address>
          <Link href={"tel:1234561234"} className="hover:underline">
            123-456-1234
          </Link>
        </div>
      </main>
    </div>
  );
}
