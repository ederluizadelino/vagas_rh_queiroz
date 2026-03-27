import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function formatDateTime(value) {
  if (!value) return "-";
  return format(new Date(value), "dd/MM/yyyy HH:mm", { locale: ptBR });
}
