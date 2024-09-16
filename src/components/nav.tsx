import Link from "next/link";
import React from "react";

export default function Nav() {
  return (
    <nav className="flex justify-center mt-10">
      <ul className="flex space-x-10">
        <li className="text-white font-semibold">
          <Link href="/">User KPI&#39;s</Link>
        </li>
        <li className="text-white font-semibold">
          <Link href="/leaderboard">Leaderboard</Link>
        </li>
      </ul>
    </nav>
  );
}
