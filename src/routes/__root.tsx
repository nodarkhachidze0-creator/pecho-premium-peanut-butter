import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { I18nProvider } from "../lib/i18n";
import { CartProvider } from "../lib/cart";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-cream px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-display font-bold text-brand-roast">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-brand-roast">Page not found</h2>
        <p className="mt-2 text-sm text-brand-roast/60">
          This page doesn't exist. Maybe you were looking for a jar?
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-brand-toast px-6 py-3 text-sm font-semibold text-white transition-colors hover:brightness-110"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-cream px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-brand-roast">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-brand-roast/60">
          Something went wrong on our end. Try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-brand-toast px-6 py-3 text-sm font-semibold text-white transition-colors hover:brightness-110"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-brand-roast/20 bg-transparent px-6 py-3 text-sm font-semibold text-brand-roast transition-colors hover:bg-brand-paper"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Pecho — Premium Peanut Butter from Georgia" },
      {
        name: "description",
        content:
          "Small-batch, single-origin peanut butter crafted in Tbilisi. Delivered across Georgia in 2–3 days. Cash or Card on Delivery.",
      },
      { name: "author", content: "Pecho" },
      { property: "og:site_name", content: "Pecho" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Pecho — Premium Peanut Butter from Georgia" },
      {
        property: "og:description",
        content:
          "Small-batch, single-origin peanut butter crafted in Tbilisi. Delivered across Georgia in 2–3 days.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#fdfcf8" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..800;1,9..144,400..700&family=Inter:wght@300;400;500;600;700&family=Noto+Sans+Georgian:wght@300;400;500;600;700&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Pecho",
          url: "/",
          description:
            "Premium peanut butter brand from Tbilisi, Georgia. Small-batch, single-origin.",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Tbilisi",
            addressCountry: "GE",
          },
          email: "hello@pecho.ge",
          telephone: "+995 555 123 456",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ka">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <CartProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              <Outlet />
            </main>
            <Footer />
          </div>
          <Toaster position="top-center" richColors />
        </CartProvider>
      </I18nProvider>
    </QueryClientProvider>
  );
}
