"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ClipboardList, Store, Tags } from "lucide-react";
import clsx from "clsx";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/lancamentos", label: "Lançamentos", icon: ClipboardList },
  { href: "/cadastros/lojas", label: "Lojas", icon: Store },
  { href: "/cadastros/tipos-vaga", label: "Tipos de vaga", icon: Tags },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="panel hidden w-[280px] shrink-0 flex-col justify-between p-5 lg:flex">
      <div>
        <div className="mb-8 rounded-[24px] bg-zinc-950 px-4 py-5 text-white">
          <Image src="/logo.png" alt="Logo da empresa" width={164} height={40} />
          <p className="mt-4 text-sm text-zinc-300">Gestão moderna de vagas com visão rápida, filtros e lançamentos.</p>
        </div>
        <nav className="space-y-2">
          {links.map((link) => {
            const Icon = link.icon;
            const active = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} className={clsx("sidebar-link", active && "sidebar-link-active")}>
                <Icon size={18} />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="rounded-[24px] bg-[var(--muted)] p-4">
        <p className="text-sm font-semibold text-zinc-800">Stack do projeto</p>
        <p className="mt-2 text-sm text-zinc-600">Next.js, Prisma, Neon, Tailwind CSS e Recharts.</p>
      </div>
    </aside>
  );
}
