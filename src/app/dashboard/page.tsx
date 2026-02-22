"use client";

import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Users, DollarSign, ArrowUpRight, ArrowDownRight, Calculator } from "lucide-react";

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
      icon: TrendingUp,
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-500/10",
      textColor: "text-green-400",
    },
    {
      label: "Jami Xarajat",
      value: totalXarajat.toLocaleString() + " so'm",
      icon: TrendingDown,
      color: "from-red-500 to-rose-600",
      bgColor: "bg-red-500/10",
      textColor: "text-red-400",
    },
    {
      label: "Ishchilarga Oylik",
      value: totalOylik.toLocaleString() + " so'm",
      icon: Users,
      color: "from-orange-500 to-amber-600",
      bgColor: "bg-orange-500/10",
      textColor: "text-orange-400",
    },
    {
      label: "Sof Foyda",
      value: foyda.toLocaleString() + " so'm",
      icon: DollarSign,
      color: foyda >= 0 ? "from-cyan-500 to-blue-600" : "from-purple-500 to-pink-600",
      bgColor: foyda >= 0 ? "bg-cyan-500/10" : "bg-purple-500/10",
      textColor: foyda >= 0 ? "text-cyan-400" : "text-purple-400",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">
              A.S-Mebel Bugalteriyasiga hush kelibsiz!
            </h1>
          </div>
        </div>
        <p className="text-neutral-400 ml-15">
          Bu sahifada moliyaviy statistikani ko'rishingiz mumkin
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-neutral-800/80 backdrop-blur-xl rounded-2xl p-5 lg:p-6 border border-neutral-700/50 hover:border-neutral-600/50 transition-all hover:shadow-xl hover:shadow-black/20"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${stat.bgColor} ${stat.textColor}`}>
                  {stat.label}
                </span>
              </div>
              <div className="text-neutral-400 text-sm mb-1">{stat.label}</div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
            </div>
          );
        })}
      </div>

      {/* Recent Transactions */}
      <div className="bg-neutral-800/80 backdrop-blur-xl rounded-2xl p-5 lg:p-6 border border-neutral-700/50">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <span>So'nggi Tranzaksiyalar</span>
          <span className="text-sm font-normal text-neutral-400">
            ({transactions.length} ta)
          </span>
        </h2>
        {transactions.length === 0 ? (
          <div className="text-center py-12 text-neutral-400">
            <div className="w-20 h-20 bg-neutral-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calculator className="w-10 h-10 text-neutral-500" />
            </div>
            <p className="text-lg mb-2">Hozircha tranzaksiyalar mavjud emas</p>
            <p className="text-sm">Kassa bo'limida ma'lumot qo'shing</p>
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
                  <tr key={t.id} className="border-b border-neutral-700/50 hover:bg-neutral-700/30 transition-colors">
                    <td className="py-3 px-4 text-white">{t.date}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1 ${
                          t.type === "tushum"
                            ? "bg-green-500/20 text-green-400"
                            : t.type === "xarajat"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-orange-500/20 text-orange-400"
                        }`}
                      >
                        {t.type === "tushum" ? <ArrowUpRight className="w-3 h-3" /> : t.type === "xarajat" ? <ArrowDownRight className="w-3 h-3" /> : null}
                        {t.type === "tushum"
                          ? "Tushum"
                          : t.type === "xarajat"
                          ? "Xarajat"
                          : "Oylik"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-neutral-300">{t.description}</td>
                    <td className="py-3 px-4 text-right font-medium text-white">
                      <span className={t.type === "xarajat" || t.type === "oylik" ? "text-red-400" : "text-green-400"}>
                        {t.type === "xarajat" || t.type === "oylik" ? "-" : "+"}
                        {t.amount.toLocaleString()} so'm
                      </span>
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
