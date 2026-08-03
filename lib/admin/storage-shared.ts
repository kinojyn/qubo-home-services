import { join } from "path";

export const CONTENT_DIR = join(process.cwd(), "content");
export const DRAFTS_DIR = join(CONTENT_DIR, "drafts");
export const VERSIONS_DIR = join(CONTENT_DIR, "versions");
export const MEDIA_DIR = join(CONTENT_DIR, "media");
