"use client";

import { useState, useEffect } from "react";

interface Transaction {
  id: number;
  type: "tushum" | "xarajat" | "oylik";
  amount: number;
  description: string;
  date: string;
}

export default function DashboardHome() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("transactions");
      if (stored) {
        return JSON.parse(stored);
      }
    }
    return [];
  });

  // Calculate statistics
  const totalTushum = transactions
    .filter((t) => t.type === "tushum")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalXarajat = transactions
    .filter((t) => t.type === "xarajat")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalOylik = transactions
    .filter((t) => t.type === "oylik")
    .reduce((sum, t) => sum + t.amount, 0);

  const foyda = totalTushum - totalXarajat - totalOylik;

  const stats = [
    {
      label: "Jami Tushum",
      value: totalTushum.toLocaleString() + " so'm",
      icon: "💵",
      color: "from-green-500 to-emerald-600",
    },
    {
      label: "Jami Xarajat",
      value: totalXarajat.toLocaleString() + " so'm",
      icon: "💸",
      color: "from-red-500 to-rose-600",
    },
    {
      label: "Ishchilarga Oylik",
      value: totalOylik.toLocaleString() + " so'm",
      icon: "👷",
      color: "from-orange-500 to-amber-600",
    },
    {
      label: "Sof Foyda",
      value: foyda.toLocaleString() + " so'm",
      icon: "📈",
      color: "from-cyan-500 to-blue-600",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          A.S-Mebel Bugalteriyasiga hush kelibsiz!
        </h1>
        <p className="text-neutral-400">
          Bu sahifada moliyaviy statistikani ko'rishingiz mumkin
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-neutral-800 rounded-2xl p-6 border border-neutral-700"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-2xl`}>
                {stat.icon}
              </div>
            </div>
            <div className="text-neutral-400 text-sm mb-1">{stat.label}</div>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Recent Transactions */}
      <div className="bg-neutral-800 rounded-2xl p-6 border border-neutral-700">
        <h2 className="text-xl font-semibold text-white mb-6">
          So& apos;nggi Tranzaksiyalar
        </h2>
        {transactions.length === 0 ? (
          <div className="text-center py-12 text-neutral-400">
            <p className="text-4xl mb-4">📋</p>
            <p>Hozircha tranzaksiyalar mavjud emas</p>
            <p className="text-sm mt-2">Kassa bo'limida ma'lumot qo'shing</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-700">
                  <th className="text-left py-3 px-4 text-neutral-400 font-medium">Sanasi</th>
                  <th className="text-left py-3 px-4 text-neutral-400 font-medium">Turi</th>
                  <th className="text-left py-3 px-4 text-neutral-400 font-medium">Tavsif</th>
                  <th className="text-right py-3 px-4 text-neutral-400 font-medium">Summa</th>
                </tr>
              </thead>
              <tbody>
                {transactions.slice(-10).reverse().map((t) => (
                  <tr key={t.id} className="border-b border-neutral-700/50">
                    <td className="py-3 px-4 text-white">{t.date}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          t.type === "tushum"
                            ? "bg-green-500/20 text-green-400"
                            : t.type === "xarajat"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-orange-500/20 text-orange-400"
                        }`}
                      >
                        {t.type === "tushum"
                          ? "Tushum"
                          : t.type === "xarajat"
                          ? "Xarajat"
                          : "Oylik"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-neutral-300">{t.description}</td>
                    <td className="py-3 px-4 text-right font-medium text-white">
                      {t.type === "xarajat" || t.type === "oylik" ? "-" : "+"}
                      {t.amount.toLocaleString()} so'm
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
