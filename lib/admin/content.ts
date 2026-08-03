"use server";

import type { ContentDraft, DraftMeta, SectionDraft, VersionRecord } from "@/types/admin";
import { createDefaultDraft } from "@/lib/admin/defaults";
import {
  readDraft,
  writeDraft,
  publishDraft,
  saveVersion,
  readVersions,
} from "@/lib/admin/storage";
import { getSession } from "@/lib/admin/auth";

const DRAFT_KEY = "draft";
const PUBLISHED_KEY = "published";

async function requireAuth() {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");
  return session;
}

export async function getDraft(): Promise<ContentDraft> {
  const draft = await readDraft<ContentDraft | null>(DRAFT_KEY, null);
  if (!draft) {
    const defaults = createDefaultDraft();
    await writeDraft(DRAFT_KEY, defaults);
    return defaults;
  }
  return draft;
}

export async function getPublished(): Promise<ContentDraft | null> {
  return readDraft<ContentDraft | null>(PUBLISHED_KEY, null);
}

export async function updateSection(
  page: keyof ContentDraft,
  sectionId: string,
  content: Record<string, unknown>,
) {
  const session = await requireAuth();
  const draft = await getDraft();
  const pageData = draft[page];
  if (!pageData || !("sections" in pageData)) throw new Error("Invalid page");

  const sections = pageData.sections as SectionDraft[];
  const idx = sections.findIndex((s) => s.id === sectionId);
  if (idx === -1) throw new Error("Section not found");

  sections[idx] = { ...sections[idx], content: { ...sections[idx].content, ...content } };
  pageData.meta = makeMeta(session.username);
  draft.meta = makeMeta(session.username);
  await writeDraft(DRAFT_KEY, draft);
  return draft;
}

export async function toggleSectionVisibility(page: keyof ContentDraft, sectionId: string) {
  const session = await requireAuth();
  const draft = await getDraft();
  const pageData = draft[page];
  if (!pageData || !("sections" in pageData)) throw new Error("Invalid page");

  const sections = pageData.sections as SectionDraft[];
  const idx = sections.findIndex((s) => s.id === sectionId);
  if (idx === -1) throw new Error("Section not found");

  sections[idx] = { ...sections[idx], visible: !sections[idx].visible };
  pageData.meta = makeMeta(session.username);
  draft.meta = makeMeta(session.username);
  await writeDraft(DRAFT_KEY, draft);
  return draft;
}

export async function reorderSections(page: keyof ContentDraft, orderedIds: string[]) {
  const session = await requireAuth();
  const draft = await getDraft();
  const pageData = draft[page];
  if (!pageData || !("sections" in pageData)) throw new Error("Invalid page");

  const sections = pageData.sections as SectionDraft[];
  const reordered = orderedIds
    .map((id, idx) => {
      const existing = sections.find((s) => s.id === id);
      return existing ? { ...existing, order: idx } : null;
    })
    .filter(Boolean) as SectionDraft[];

  pageData.sections = reordered as unknown as typeof pageData.sections;
  pageData.meta = makeMeta(session.username);
  draft.meta = makeMeta(session.username);
  await writeDraft(DRAFT_KEY, draft);
  return draft;
}

export async function publishCurrent() {
  const session = await requireAuth();
  const draft = await getDraft();
  const version: VersionRecord = {
    id: `v${Date.now()}`,
    timestamp: Date.now(),
    user: session.username,
    label: `Published ${new Date().toLocaleString("it-IT")}`,
    snapshot: JSON.parse(JSON.stringify(draft)),
  };
  await publishDraft(PUBLISHED_KEY, draft);
  await saveVersion("versions", version);
  return version;
}

export async function getVersions(): Promise<VersionRecord[]> {
  await requireAuth();
  return (await readVersions("versions")) as VersionRecord[];
}

export async function restoreVersion(versionId: string) {
  await requireAuth();
  const versions = await getVersions();
  const version = versions.find((v) => v.id === versionId);
  if (!version) throw new Error("Version not found");
  await writeDraft(DRAFT_KEY, version.snapshot);
  return version.snapshot;
}

function makeMeta(username: string): DraftMeta {
  return { updatedAt: Date.now(), updatedBy: username, version: Date.now() };
}
