"use client";

import { Link } from "@/i18n/routing";

export default function Pagination({ currentPage, totalPages, basePath }) {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 1) {
      pages.push(i);
    } else if (
      (i === 2 && currentPage > 3) ||
      (i === totalPages - 1 && currentPage < totalPages - 2)
    ) {
      pages.push("...");
    }
  }

  return (
    <div className="flex gap-3 mt-8">
      {pages.map((p, idx) =>
        p === "..." ? (
          <span key={idx}>…</span>
        ) : (
          <Link
            key={idx}
            href={p === 1 ? basePath : `${basePath}/page-${p}`}
            className={`px-3 py-1 rounded ${
              p === currentPage ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {p}
          </Link>
        )
      )}
    </div>
  );
}
