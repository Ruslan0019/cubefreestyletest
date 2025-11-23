import { getLocale } from "next-intl/server";
import { getCollection } from "@/../../lib/content";
import ContactFormClient from "./ContactFormClient";

export default async function ContactForm() {
  const locale = await getLocale();

  const servicesData = await getCollection("services", locale);

  const services = servicesData.map((service) => ({
    value: service.title,
    label: service.title,
  }));

  return <ContactFormClient services={services} />;
}
