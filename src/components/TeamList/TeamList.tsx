import Image from "next/image";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

type Locale = "uk" | "ru";

type TeamMember = {
  slug: string;
  thumbnail: string;
  name: string;
  status: string;
};

type TeamListProps = {
  team?: TeamMember[];
  locale?: Locale;
};

export default async function TeamList({
  team = [],
  locale = "uk",
}: TeamListProps) {
  // если передали locale — используем его, иначе next-intl возьмёт из контекста
  const t = await getTranslations({ locale });

  return (
    <section className="w-full bg-white">
      <h2 className="text-4xl lg:text-5xl font-bold text-center text-[#001F54] mb-8 lg:mb-14">
        {t("TeamList.title")}
      </h2>

      <div
        className="
          grid grid-cols-2 gap-[7px]
          max-w-[343px] mx-auto
          lg:flex lg:flex-wrap lg:justify-center lg:gap-4
          lg:max-w-[1024px] xl:max-w-[1392px]
        "
      >
        {team.map((member, index) => (
          <Link
            key={member.slug}
            href={`/team/${member.slug}`}
            className="
              group block overflow-hidden rounded-xl shadow-md hover:shadow-lg
               hover:scale-[1.02]
              w-full
              lg:w-[240px] xl:w-[336px] active:scale-90 active:text-primary/80 transition-all duration-500 ease-in-out
            "
          >
            <div className="relative aspect-[4/5] w-full">
              <Image
                src={member.thumbnail}
                alt={member.name}
                fill
                // приоритет только для первой фотки, остальные ленивые — лучше для перформанса
                priority={index === 0}
                sizes="(min-width: 1280px) 336px, (min-width: 1024px) 240px, 50vw"
                className="object-cover"
              />

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent text-white px-3 py-3">
                <p className="font-semibold text-base leading-tight flex items-center gap-1">
                  {member.name}
                  <span className="opacity-80 group-hover:translate-x-1 transition">
                    →
                  </span>
                </p>
                <span className="bg-blue-600 text-xs font-semibold px-2 py-[2px] rounded mt-1 inline-block">
                  {member.status}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
