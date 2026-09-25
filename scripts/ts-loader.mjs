import { existsSync } from "node:fs"
import { dirname, extname, resolve as resolvePath } from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

const root = resolvePath(import.meta.dirname, "..")

function candidateFiles(base) {
  const ext = extname(base)
  if (ext) return [base]
  return [`${base}.ts`, `${base}.tsx`, `${base}.js`, `${base}.mjs`, `${base}/index.ts`]
}

export async function resolve(specifier, context, nextResolve) {
  let mapped = specifier
  if (specifier.startsWith("@/")) {
    mapped = pathToFileURL(resolvePath(root, specifier.slice(2))).href
  } else if (specifier.startsWith(".") && context.parentURL) {
    mapped = pathToFileURL(resolvePath(dirname(fileURLToPath(context.parentURL)), specifier)).href
  }

  if (mapped.startsWith("file:")) {
    const path = fileURLToPath(mapped)
    for (const candidate of candidateFiles(path)) {
      if (existsSync(candidate)) {
        return {
          url: pathToFileURL(candidate).href,
          format: "module",
          shortCircuit: true,
        }
      }
    }
  }

  return nextResolve(specifier, context)
}

export async function load(url, context, nextLoad) {
  if (url.endsWith(".ts") || url.endsWith(".tsx")) {
    return nextLoad(url, { ...context, format: "module" })
  }
  return nextLoad(url, context)
}
