import { Badge } from "@/components/ui/badge"
import { statusLabel, type OrderStatus } from "@/lib/admin"
import { cn } from "@/lib/utils"

const styles: Record<OrderStatus, string> = {
  pending: "border-transparent bg-amber-100 text-amber-900",
  processing: "border-transparent bg-sky-100 text-sky-900",
  shipped: "border-transparent bg-indigo-100 text-indigo-900",
  delivered: "border-transparent bg-emerald-100 text-emerald-900",
  cancelled: "border-transparent bg-rose-100 text-rose-900",
}

export function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <Badge variant="outline" className={cn("capitalize", styles[status])}>
      {statusLabel(status)}
    </Badge>
  )
}
