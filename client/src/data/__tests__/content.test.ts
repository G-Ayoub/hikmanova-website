import { describe, expect, it } from "vitest";
import type { Localized } from "@/lib/i18n";
import { solutions } from "../solutions";
import { services } from "../services";
import { industries } from "../industries";
import { posts } from "../posts";
import { existsSync } from "node:fs";
import path from "node:path";
import { allPaths, pageMeta, staticRoutes } from "../routes";

/** Recursively collect every Localized value in an object. */
function localizedValues(value: unknown, out: Localized[] = []): Localized[] {
  if (Array.isArray(value)) value.forEach((v) => localizedValues(v, out));
  else if (value && typeof value === "object") {
    const o = value as Record<string, unknown>;
    if (typeof o.en === "string" && typeof o.ar === "string") out.push(o as Localized);
    else Object.values(o).forEach((v) => localizedValues(v, out));
  }
  return out;
}

const unique = (xs: string[]) => new Set(xs).size === xs.length;

describe("content data", () => {
  it.each([
    ["solutions", solutions],
    ["services", services],
    ["industries", industries],
    ["posts", posts],
  ] as const)("%s have English and Arabic text everywhere", (_, data) => {
    const values = localizedValues(data);
    expect(values.length).toBeGreaterThan(0);
    for (const v of values) {
      expect(v.en.trim(), JSON.stringify(v)).not.toBe("");
      expect(v.ar.trim(), JSON.stringify(v)).not.toBe("");
    }
  });

  it("slugs are unique", () => {
    expect(unique(solutions.map((s) => s.slug))).toBe(true);
    expect(unique(services.map((s) => s.slug))).toBe(true);
    expect(unique(industries.map((s) => s.slug))).toBe(true);
    expect(unique(posts.map((s) => s.slug))).toBe(true);
  });

  it("cross-references point to existing entries", () => {
    const serviceSlugs = new Set(services.map((s) => s.slug));
    const industrySlugs = new Set(industries.map((s) => s.slug));
    for (const s of solutions) {
      s.services.forEach((x) => expect(serviceSlugs, `${s.slug} -> ${x}`).toContain(x));
      s.industries.forEach((x) => expect(industrySlugs, `${s.slug} -> ${x}`).toContain(x));
    }
    for (const i of industries) {
      i.services.forEach((x) => expect(serviceSlugs, `${i.slug} -> ${x}`).toContain(x));
    }
  });

  it("every industry has at least one solution or service", () => {
    for (const i of industries) {
      const hasSolution = solutions.some((s) => s.industries.includes(i.slug));
      expect(hasSolution || i.services.length > 0).toBe(true);
    }
  });

  it("sitemap covers every page and detail route", () => {
    const paths = allPaths();
    expect(unique(paths)).toBe(true);
    expect(paths.length).toBe(staticRoutes.length + solutions.length + services.length + posts.length);
    solutions.forEach((s) => expect(paths).toContain(`/solutions/${s.slug}`));
    services.forEach((s) => expect(paths).toContain(`/services/${s.slug}`));
  });

  it("images are local, kebab-case files", () => {
    for (const img of [...solutions, ...services, ...posts].map((x) => x.image)) {
      expect(img).toMatch(/^\/images\/[a-z0-9-]+\.(jpg|png|webp|svg)$/);
    }
  });

  it("every page has a title, description and share image (run `pnpm og` after adding content)", () => {
    const publicDir = path.resolve(__dirname, "../../../public");
    for (const route of allPaths()) {
      const meta = pageMeta(route);
      expect(meta, route).toBeDefined();
      if (route !== "/") expect(meta!.title.en.trim(), route).not.toBe("");
      expect(meta!.description.en.trim(), route).not.toBe("");
      expect(meta!.description.ar.trim(), route).not.toBe("");
      expect(existsSync(path.join(publicDir, meta!.image)), `${route}: missing ${meta!.image}`).toBe(true);
    }
  });
});
