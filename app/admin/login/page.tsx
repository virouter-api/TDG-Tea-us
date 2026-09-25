import { Suspense } from "react"
import { AdminLoginForm } from "@/components/admin/login-form"

export const dynamic = "force-dynamic"

export default function AdminLoginPage() {
  return (
    <Suspense>
      <AdminLoginForm />
    </Suspense>
  )
}
