// components/PortableTextComponents.js

import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import React from "react";

export const SanityBlocks = {
  types: {
    image: ({ value }: any) => (
      <div
        style={{ display: "flex", justifyContent: "center", margin: "1em 0" }}
      >
        <Image
          src={urlFor(value).url()}
          alt={value.alt || "Image"}
          width={1000}
          height={100}
          style={{ objectFit: "contain" }}
        />
      </div>
    ),
  },
  block: {
    // Customize block types (e.g., paragraphs, headings)
    h1: ({ children }: any) => (
      <div
        style={{ display: "flex", justifyContent: "center", margin: "1em 0" }}
      >
        <h1 style={{ fontSize: "2em", color: "#333" }}>{children}</h1>
      </div>
    ),
    h2: ({ children }: any) => (
      <div
        style={{ display: "flex", justifyContent: "center", margin: "1em 0" }}
      >
        <h2 style={{ fontSize: "1.9em", color: "black" }}>{children}</h2>
      </div>
    ),
    h3: ({ children }: any) => (
      <div
        style={{ display: "flex", justifyContent: "center", margin: "1em 0" }}
      >
        <h3 style={{ fontSize: "1.6em", color: "black" }}>{children}</h3>
      </div>
    ),
    h4: ({ children }: any) => (
      
      <h4 style={{ fontSize: "1em", color: "black" }}>{children}</h4>
    ),
    normal: ({ children }: any) => (
      <p style={{ lineHeight: "1.6" }}>{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote style={{ fontStyle: "italic", margin: "1em 0" }}>
        {children}
      </blockquote>
    ),
  },
  marks: {
    // Customize text styles (e.g., bold, italic)
    strong: ({ children }: any) => (
      <strong style={{ fontWeight: "bold" }}>{children}</strong>
    ),
    em: ({ children }: any) => (
      <em style={{ fontStyle: "italic" }}>{children}</em>
    ),
    link: ({ value, children }: any) => {
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
    bullet: ({ children }: any) => (
      <ul style={{ listStyleType: "disc", marginLeft: "1em" }}>{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol style={{ listStyleType: "decimal", marginLeft: "1em" }}>
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li>{children}</li>,
    number: ({ children }: any) => <li>{children}</li>,
  },
};
