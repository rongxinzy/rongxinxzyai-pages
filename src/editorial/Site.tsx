import type { SiteSiteProps } from "../shared/site-types";
import { COPY } from "./copy";
import { Header, Footer } from "./SiteChrome";
import { Home } from "./Home";
import { Enterprise } from "./Enterprise";
import "./site.css";

export function EditorialSite(props: SiteSiteProps) {
  const copy = COPY[props.locale];
  return (
    <div className="editorial-site" data-locale={props.locale}>
      <a className="skip-link" href="#main">
        {copy.skip}
      </a>
      <Header locale={props.locale} page={props.page} copy={copy} />
      {props.page === "home" ? (
        <Home {...props} copy={copy} />
      ) : (
        <Enterprise copy={copy} />
      )}
      <Footer locale={props.locale} copy={copy} />
    </div>
  );
}
