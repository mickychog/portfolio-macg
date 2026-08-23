/**
 * Lightweight in-memory page-view counter.
 *
 * The count persists for the lifetime of the Cloudflare Worker isolate and
 * resets on each deployment.  For durable persistence, swap the module-level
 * variable for a Cloudflare KV or D1 read/write.
 */

let views = 0;

export async function GET() {
  return Response.json({ views });
}

export async function POST() {
  views += 1;
  return Response.json({ views });
}
