import GlobalLayout from "@/components/GlobalLayout";
import Providers from "@/lib/providers";

// If loading a variable font, you don't need to specify the font weight

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <GlobalLayout>{children}</GlobalLayout>
    </Providers>
  );
}
