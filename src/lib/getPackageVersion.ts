/**
 * The site's displayed version mirrors the *published* PyPI package exactly:
 * `agent-trajectory-diff`'s latest release is fetched once at build time and
 * baked into the static HTML, so every deploy shows what `pip install`
 * actually ships today.
 *
 * The version used to be read from the product repo's `__init__.py` back
 * when this site lived inside that monorepo; after the split, PyPI is the
 * single source of truth. Falls back to a pinned version if PyPI is
 * unreachable during the build (CI always has network, so this only fires
 * in weird environments — and fails visibly in review).
 */

const PYPI_JSON_URL = "https://pypi.org/pypi/agent-trajectory-diff/json";
const FALLBACK_VERSION = "0.5.0";

let memo: Promise<string> | null = null;

export function getPackageVersion(): Promise<string> {
  memo ??= (async () => {
    try {
      const res = await fetch(PYPI_JSON_URL, {
        signal: AbortSignal.timeout(5_000),
      });
      if (!res.ok) return FALLBACK_VERSION;
      const data = (await res.json()) as { info?: { version?: string } };
      const version = data.info?.version;
      return typeof version === "string" && /^\d+\.\d+\.\d+/.test(version)
        ? version
        : FALLBACK_VERSION;
    } catch {
      return FALLBACK_VERSION;
    }
  })();
  return memo;
}
