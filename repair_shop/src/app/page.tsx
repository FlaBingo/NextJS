import Link from "next/link";

export default function Home() {
  return (
    <div>
      <main>
        <div>
          <h1>Flabingo&apos;s Computer <br />Repair Shop</h1>
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
