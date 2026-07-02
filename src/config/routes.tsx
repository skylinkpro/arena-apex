import { lazy, Suspense } from "react";
import { RouteObject } from "react-router-dom";

const Index = lazy(() => import("@/pages/Index"));
const Ecosystem = lazy(() => import("@/pages/Ecosystem"));
const NFTs = lazy(() => import("@/pages/NFTs"));
const Marketplace = lazy(() => import("@/pages/Marketplace"));
const DeFiHub = lazy(() => import("@/pages/DeFiHub"));
const Gameplay = lazy(() => import("@/pages/Gameplay"));
const Terms = lazy(() => import("@/pages/Terms"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const Whitepaper = lazy(() => import("@/pages/Whitepaper"));
const AboutUs = lazy(() => import("@/pages/AboutUs"));
const Contact = lazy(() => import("@/pages/Contact"));
const Trading = lazy(() => import("@/pages/Trading"));
const NotFound = lazy(() => import("@/pages/NotFound"));

function PageLoader() {
  return (
    <div className="grid min-h-[40vh] place-items-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  );
}

export const routePaths = {
  home: "/",
  ecosystem: "/ecosystem",
  nfts: "/nfts",
  marketplace: "/marketplace",
  defihub: "/defihub",
  gameplay: "/gameplay",
  terms: "/terms",
  privacy: "/privacy",
  whitepaper: "/whitepaper",
  about: "/about",
  contact: "/contact",
  trading: "/trading",
} as const;

export const routes: RouteObject[] = [
  {
    path: routePaths.home,
    element: (
      <Suspense fallback={<PageLoader />}>
        <Index />
      </Suspense>
    ),
  },
  {
    path: routePaths.ecosystem,
    element: (
      <Suspense fallback={<PageLoader />}>
        <Ecosystem />
      </Suspense>
    ),
  },
  {
    path: routePaths.nfts,
    element: (
      <Suspense fallback={<PageLoader />}>
        <NFTs />
      </Suspense>
    ),
  },
  {
    path: routePaths.marketplace,
    element: (
      <Suspense fallback={<PageLoader />}>
        <Marketplace />
      </Suspense>
    ),
  },
  {
    path: routePaths.defihub,
    element: (
      <Suspense fallback={<PageLoader />}>
        <DeFiHub />
      </Suspense>
    ),
  },
  {
    path: routePaths.gameplay,
    element: (
      <Suspense fallback={<PageLoader />}>
        <Gameplay />
      </Suspense>
    ),
  },
  {
    path: routePaths.terms,
    element: (
      <Suspense fallback={<PageLoader />}>
        <Terms />
      </Suspense>
    ),
  },
  {
    path: routePaths.privacy,
    element: (
      <Suspense fallback={<PageLoader />}>
        <Privacy />
      </Suspense>
    ),
  },
  {
    path: routePaths.whitepaper,
    element: (
      <Suspense fallback={<PageLoader />}>
        <Whitepaper />
      </Suspense>
    ),
  },
  {
    path: routePaths.about,
    element: (
      <Suspense fallback={<PageLoader />}>
        <AboutUs />
      </Suspense>
    ),
  },
  {
    path: routePaths.contact,
    element: (
      <Suspense fallback={<PageLoader />}>
        <Contact />
      </Suspense>
    ),
  },
  {
    path: routePaths.trading,
    element: (
      <Suspense fallback={<PageLoader />}>
        <Trading />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<PageLoader />}>
        <NotFound />
      </Suspense>
    ),
  },
];
