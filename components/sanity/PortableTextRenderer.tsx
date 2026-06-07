"use client";

import { PortableText } from "@portabletext/react";

export function PortableTextRenderer({ value }: { value: any }) {
  return (
    <PortableText
      value={value}
      components={{
        marks: {
          link: ({ children, value }) => (
            <a
              href={value?.href}
              target="_blank"
              rel="noopener noreferrer"
              className="
                text-[#c49aae]
                underline
                underline-offset-4
                decoration-[#c49aae]/50
                transition-colors
                hover:text-[#e3bfd0]
              "
            >
              {children}
            </a>
          ),
        },
    
        types: {
          image: ({ value }) => {
            const imageUrl = value?.asset?._ref
              ? `https://cdn.sanity.io/images/bbkdosxv/production/${value.asset._ref
                  .replace("image-", "")
                  .replace("-jpg", ".jpg")
                  .replace("-png", ".png")
                  .replace("-webp", ".webp")}`
              : "";

            if (!imageUrl) return null;

            return (
              <figure className="my-10">
                <img
                  src={imageUrl}
                  alt=""
                  className="mx-auto max-h-[520px] w-auto max-w-full border border-white/10 object-contain"
                />
              </figure>
            );
          },
        },
        block: {
          normal: ({ children }) => (
            <p className="my-6 text-sm leading-8 text-neutral-300">
              {children}
            </p>
          ),
          h2: ({ children }) => (
            <h2 className="mt-14 mb-5 text-2xl uppercase tracking-[0.16em] text-neutral-100">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-10 mb-4 font-serif text-xl italic tracking-[0.08em] text-[#c49aae]">
              {children}
            </h3>
          ),
        },
      }}
    />
  );
}