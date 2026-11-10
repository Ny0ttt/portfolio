import { type CollectionEntry, getCollection } from "astro:content";

export type Post = CollectionEntry<"posts">;
export type Project = CollectionEntry<"projects">;

const pad = (n: number, width: number) => String(n).padStart(width, "0");

/**
 * Published posts, newest first. Each carries a stable logbook id
 * (LOG-001 = the oldest post), so ids don't shift when new posts land.
 */
export async function getPosts(): Promise<(Post & { logId: string })[]> {
	// Drafts show up in `pnpm dev` so they can be previewed, never in a build.
	const posts = await getCollection(
		"posts",
		(p) => import.meta.env.DEV || p.data.draft !== true,
	);
	return posts
		.sort((a, b) => a.data.createdAt.getTime() - b.data.createdAt.getTime())
		.map((post, i) => ({ ...post, logId: `LOG-${pad(i + 1, 3)}` }))
		.reverse();
}

/**
 * Projects, newest first. B-01 = the oldest build, same reasoning as logIds.
 */
export async function getProjects(): Promise<
	(Project & { buildId: string })[]
> {
	const projects = await getCollection("projects");
	return projects
		.sort((a, b) => a.data.date.getTime() - b.data.date.getTime())
		.map((project, i) => ({ ...project, buildId: `B-${pad(i + 1, 2)}` }))
		.reverse();
}

/** The first `info` entry of every project is its stack line. */
export const stackOf = (project: Project) => project.data.info[0]?.text;

export function formatDate(date: Date): string {
	return date.toLocaleDateString("en-GB", {
		day: "2-digit",
		month: "short",
		year: "numeric",
	});
}

/**
 * Minutes to read: 200 words per minute, plus a little for images and
 * code blocks. Same heuristic the old template used.
 */
export function readingTime(body = ""): number {
	const words = body
		.replace(/```[\s\S]*?```/g, "")
		.replace(/<[^>]+>/g, "")
		.split(/\s+/)
		.filter(Boolean).length;
	const images = body.match(/!\[/g)?.length ?? 0;
	const codeBlocks = (body.match(/```/g)?.length ?? 0) / 2;
	return Math.max(
		1,
		Math.ceil(words / 200) + Math.ceil(images / 6) + Math.ceil(codeBlocks / 3),
	);
}
