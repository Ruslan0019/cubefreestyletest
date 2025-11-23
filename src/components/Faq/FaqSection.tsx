"use client";

export default function FaqSection({
  faq,
  title,
}: {
  faq: any[];
  title?: string;
}) {
  if (!faq || faq.length === 0) return null;

  const finalTitle = title && title.trim() !== "" ? title : "FAQ";

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <section className="py-16 bg-light">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-4 lg:px-0">
          {/* ---- LEFT TITLE ---- */}
          <div>
            <h2 className="text-3xl font-bold text-dark text-center">
              {finalTitle}
            </h2>
          </div>

          {/* ---- RIGHT FAQ LIST ---- */}
          <div className="md:col-span-2 space-y-6">
            {faq.map((item, index) => (
              <details
                key={index}
                className="group border-b border-gray-300 pb-6 cursor-pointer"
              >
                <summary className="text-xl font-semibold text-dark flex justify-between items-center list-none">
                  {item.question}

                  <span className="text-gray-500 transition-transform duration-200 group-open:rotate-180">
                    ▼
                  </span>
                </summary>

                <p className="mt-3 text-dark leading-relaxed text-base">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />
    </>
  );
}
