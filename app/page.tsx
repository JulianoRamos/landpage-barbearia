import { getContent } from "@/lib/store";
import { isAuthenticated } from "@/lib/auth";
import { EditProvider } from "@/components/edit/EditProvider";
import { EditToolbar } from "@/components/edit/EditToolbar";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Gallery } from "@/components/sections/Gallery";
import { Team } from "@/components/sections/Team";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export const dynamic = "force-dynamic";

export default async function HomePage({
  searchParams,
}: {
  searchParams: { edit?: string };
}) {
  const content = await getContent();
  const admin = isAuthenticated();
  const initialEditing = admin && searchParams.edit === "1";

  return (
    <EditProvider
      initialContent={content}
      isAdmin={admin}
      initialEditing={initialEditing}
    >
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Gallery />
        <Team />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <EditToolbar />
    </EditProvider>
  );
}
