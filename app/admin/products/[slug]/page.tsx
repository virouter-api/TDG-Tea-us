import { products } from "@/lib/catalog"
import { AdminProductEditor } from "@/components/admin/product-editor"

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }))
}

export default async function AdminProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <AdminProductEditor slug={slug} />
}
