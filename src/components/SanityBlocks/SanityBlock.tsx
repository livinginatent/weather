// components/PortableTextComponents.js

import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import React from "react";

export const SanityBlocks = {
  types: {
    image: ({ value }:any) => (
      <Image
        src={urlFor(value).url()}
        alt={value.alt || "Image"}
        style={{ maxWidth: "100%", height: "auto" }}
      />
    ),
  },
  block: {
    // Customize block types (e.g., paragraphs, headings)
    h1: ({ children }:any) => (
      <h1 style={{ fontSize: "2em", color: "#333" }}>{children}</h1>
    ),
    h2: ({ children }:any) => (
      <h2 style={{ fontSize: "1.5em", color: "black" }}>{children}</h2>
    ),
    h3: ({ children }:any) => (
      <h2 style={{ fontSize: "1.5em", color: "black" }}>{children}</h2>
    ),
    h4: ({ children }:any) => (
      <h2 style={{ fontSize: "1.5em", color: "black" }}>{children}</h2>
    ),
    normal: ({ children }:any) => <p style={{ lineHeight: "1.6" }}>{children}</p>,
    blockquote: ({ children }:any) => (
      <blockquote style={{ fontStyle: "italic", margin: "1em 0" }}>
        {children}
      </blockquote>
    ),
  },
  marks: {
    // Customize text styles (e.g., bold, italic)
    strong: ({ children }:any) => (
      <strong style={{ fontWeight: "bold" }}>{children}</strong>
    ),
    em: ({ children }:any) => <em style={{ fontStyle: "italic" }}>{children}</em>,
    link: ({ value, children }:any) => {
      const target = value?.href?.startsWith("http") ? "_blank" : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target && "noopener noreferrer"}
        >
          {children}
        </a>
      );
    },
  },
  list: {
    // Customize list styles
    bullet: ({ children }:any) => (
      <ul style={{ listStyleType: "disc", marginLeft: "1em" }}>{children}</ul>
    ),
    number: ({ children }:any) => (
      <ol style={{ listStyleType: "decimal", marginLeft: "1em" }}>
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }:any) => <li>{children}</li>,
    number: ({ children }:any) => <li>{children}</li>,
  },
};
