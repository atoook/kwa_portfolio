import clsx from "clsx";
import React from "react";
import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import Bounded from "@/components/Bounded";
import { isFilled } from "@prismicio/client";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa6";
import { SiQiita } from "react-icons/si";
import type { IconType } from "react-icons";

type Params = {
  lang: string;
};

type SocialLinkProps = {
  field: React.ComponentProps<typeof PrismicNextLink>["field"];
  icon: IconType;
  label: string;
};

function SocialLink({ field, icon: Icon, label }: SocialLinkProps) {
  if (!isFilled.link(field)) {
    return null;
  }

  return (
    <PrismicNextLink
      field={field}
      className="p-2 text-2xl text-slate-300 transition-all duration-150 hover:scale-125 hover:text-yellow-400"
      aria-label={label}
    >
      <Icon />
    </PrismicNextLink>
  );
}

export default async function Footer({ lang }: Params) {
  const client = createClient();
  const settings = await client.getSingle("settings", { lang: lang });
  const socialLinks = [
    {
      field: settings.data.github_link,
      icon: FaGithub,
      label: `${settings.data.name} on GitHub`,
    },
    {
      field: settings.data.twitter_link,
      icon: FaTwitter,
      label: `${settings.data.name} on Twitter`,
    },
    {
      field: settings.data.linkedin_link,
      icon: FaLinkedin,
      label: `${settings.data.name} on LinkedIn`,
    },
    {
      field: settings.data.qiita_link,
      icon: SiQiita,
      label: `${settings.data.name} on Qiita`,
    },
  ];

  return (
    <Bounded as="footer" className="text-slate-600">
      <div className="container mx-auto mt-20 flex flex-col items-center justify-between gap-6 py-8 sm:flex-row">
        <div className="name flex flex-col items-center justify-center gap-x-4 gap-y-2 sm:flex-row sm:justify-self-start">
          <PrismicNextLink
            field={settings.data.home_link}
            className="text-xl font-extrabold tracking-tighter text-slate-100 transition-colors duration-150 hover:text-yellow-400"
          >
            {settings.data.name}
          </PrismicNextLink>
          <span
            className="hidden text-5xl font-extralight leading-[0] text-slate-400 sm:inline"
            aria-hidden={true}
          >
            /
          </span>
          <p className="text-sm text-slate-300">
            © {new Date().getFullYear()} {settings.data.name}
          </p>
        </div>
        <nav className="navigation" aria-label="Footer Navigation">
          <ul className="flex items-center gap-1">
            {settings.data.nav_item.map(({ link, label }, index) => (
              <React.Fragment key={label}>
                <li>
                  <PrismicNextLink
                    className={clsx(
                      "group relative block overflow-hidden rounded px-3 py-1 text-base font-bold text-slate-100 transition-colors duration-150 hover:hover:text-yellow-400",
                    )}
                    field={link}
                  >
                    {label}
                  </PrismicNextLink>
                </li>
                {index < settings.data.nav_item.length - 1 && (
                  <span
                    className="text-4xl font-thin leading-[0] text-slate-400"
                    aria-hidden="true"
                  >
                    /
                  </span>
                )}
              </React.Fragment>
            ))}
          </ul>
        </nav>
        <div className="socials inline-flex justify-center sm:justify-end">
          {socialLinks.map((link) => (
            <SocialLink key={link.label} {...link} />
          ))}
        </div>
      </div>
    </Bounded>
  );
}
