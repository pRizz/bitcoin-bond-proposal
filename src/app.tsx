import { MetaProvider } from "@solidjs/meta";
import { A, Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";

import { SiteFooter } from "./components/editorial/SiteFooter";
import { SiteHeader } from "./components/editorial/SiteHeader";
import { siteNavigation } from "./lib/site/navigation";
import "./styles/app.css";

export default function App() {
  return (
    <MetaProvider>
      <Router
        root={(props) => (
          <div class="min-h-screen bg-canvas text-ink antialiased">
            <a
              href="#content"
              class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-accent-strong focus:px-4 focus:py-2 focus:text-[0.78rem] focus:font-semibold focus:text-ink"
            >
              Skip to content
            </a>
            <SiteHeader
              links={siteNavigation}
              brand={
                <>
                  Bitcoin Bond
                  <span class="text-ink-subtle">Proposal</span>
                </>
              }
            />
            <main
              id="content"
              class="mx-auto flex w-full max-w-7xl flex-col px-4 pb-16 pt-8 sm:px-6 lg:px-8"
            >
              <Suspense>{props.children}</Suspense>
            </main>
            <SiteFooter
              links={siteNavigation}
              secondary={
                <>
                  Featured packet:
                  <A class="underline-offset-4 hover:underline" href="/packet/illinois">
                    Illinois model
                  </A>
                </>
              }
            />
          </div>
        )}
      >
        <FileRoutes />
      </Router>
    </MetaProvider>
  );
}
