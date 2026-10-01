import StateMessage from "../components/StateMessage";
import { useSeo } from "../hooks/useSeo";

export default function NotFound() {
  useSeo({ title: "Page Not Found | 02 Automobile Company", description: "The page you are looking for does not exist.", path: "/404", noindex: true });
  return (
    <div className="container-x pb-24 pt-40">
      <p className="font-display text-[8rem] font-bold leading-none text-accent md:text-[12rem]" aria-hidden="true">404</p>
      <StateMessage icon="car" title="Page not found" text="The page you’re looking for doesn’t exist or has moved." action={{ label: "Back to Home", to: "/" }} className="mt-4" />
    </div>
  );
}
