"use client";

import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

interface Transaction {
  id: number;
  type: "tushum" | "xarajat" | "oylik";
  amount: number;
  description: string;
  date: string;
}

export default function ExcelPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("transactions");
      if (stored) {
        return JSON.parse(stored);
      }
    }
    return [];
  });
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      window.location.href = "/login";
    }
  }, []);

  // Calculate totals
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

  const exportToExcel = () => {
    if (transactions.length === 0) {
      alert("Ma'lumotlar mavjud emas!");
      return;
    }

    const wb = XLSX.utils.book_new();

    // Sheet 1: Barcha Tranzaksiyalar
    const allData = transactions.map((t) => ({
      Sanasi: t.date,
      Turi: t.type === "tushum" ? "Tushum" : t.type === "xarajat" ? "Xarajat" : "Oylik",
      Tavsif: t.description,
      Summa: t.amount,
    }));
    const ws1 = XLSX.utils.json_to_sheet(allData);
    XLSX.utils.book_append_sheet(wb, ws1, "Barcha Tranzaksiyalar");

    // Sheet 2: Tushumlar
    const tushumData = transactions
      .filter((t) => t.type === "tushum")
      .map((t) => ({
        Sanasi: t.date,
        Tavsif: t.description,
        Summa: t.amount,
      }));
    const ws2 = XLSX.utils.json_to_sheet(tushumData);
    XLSX.utils.book_append_sheet(wb, ws2, "Tushumlar");

    // Sheet 3: Xarajatlar
    const xarajatData = transactions
      .filter((t) => t.type === "xarajat")
      .map((t) => ({
        Sanasi: t.date,
        Tavsif: t.description,
        Summa: t.amount,
      }));
    const ws3 = XLSX.utils.json_to_sheet(xarajatData);
    XLSX.utils.book_append_sheet(wb, ws3, "Xarajatlar");

    // Sheet 4: Oyliklar
    const oylikData = transactions
      .filter((t) => t.type === "oylik")
      .map((t) => ({
        Sanasi: t.date,
        Tavsif: t.description,
        Summa: t.amount,
      }));
    const ws4 = XLSX.utils.json_to_sheet(oylikData);
    XLSX.utils.book_append_sheet(wb, ws4, "Oyliklar");

    // Sheet 5: Xulosa
    const summaryData = [
      { Kategoriya: "Jami Tushum", Summa: totalTushum },
      { Kategoriya: "Jami Xarajat", Summa: totalXarajat },
      { Kategoriya: "Ishchilarga Oylik", Summa: totalOylik },
      { Kategoriya: "Sof Foyda", Summa: foyda },
    ];
    const ws5 = XLSX.utils.json_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, ws5, "Xulosa");

    // Download
    XLSX.writeFile(wb, `Menga_Bugalteriya_${new Date().toISOString().split("T")[0]}.xlsx`);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Save Excel</h1>
        <p className="text-neutral-400">
          Bu yerda ma'lumotlarni Excel fayli sifatida yuklab olishingiz mumkin
        </p>
      </div>

      {showSuccess && (
        <div className="mb-6 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-center">
          Excel fayli muvaffaqiyatli yuklab olindi!
        </div>
      )}

      {/* Preview Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-neutral-800 rounded-2xl p-6 border border-neutral-700">
          <div className="text-neutral-400 text-sm mb-1">Jami Tushum</div>
          <div className="text-2xl font-bold text-green-400">
            {totalTushum.toLocaleString()} so'm
          </div>
        </div>
        <div className="bg-neutral-800 rounded-2xl p-6 border border-neutral-700">
          <div className="text-neutral-400 text-sm mb-1">Jami Xarajat</div>
          <div className="text-2xl font-bold text-red-400">
            {totalXarajat.toLocaleString()} so'm
          </div>
        </div>
        <div className="bg-neutral-800 rounded-2xl p-6 border border-neutral-700">
          <div className="text-neutral-400 text-sm mb-1">Ishchilarga Oylik</div>
          <div className="text-2xl font-bold text-orange-400">
            {totalOylik.toLocaleString()} so'm
          </div>
        </div>
        <div className="bg-neutral-800 rounded-2xl p-6 border border-neutral-700">
          <div className="text-neutral-400 text-sm mb-1">Sof Foyda</div>
          <div className="text-2xl font-bold text-cyan-400">
            {foyda.toLocaleString()} so'm
          </div>
        </div>
      </div>

      {/* Export Button */}
      <div className="bg-neutral-800 rounded-2xl p-6 border border-neutral-700">
        <h2 className="text-xl font-semibold text-white mb-6">
          Excel Faylini Yuklab Olish
        </h2>

        {transactions.length === 0 ? (
          <div className="text-center py-12 text-neutral-400">
            <p className="text-4xl mb-4">📊</p>
            <p>Hozircha ma'lumotlar mavjud emas</p>
            <p className="text-sm mt-2">Kassa bo'limida ma'lumot qo'shing</p>
          </div>
        ) : (
          <div>
            <p className="text-neutral-400 mb-6">
              Excel faylida quyidagi sahifalar bo'ladi:
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-neutral-300">
                <span className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center text-green-400">✓</span>
                Barcha Tranzaksiyalar - barcha kiritilgan ma'lumotlar
              </li>
              <li className="flex items-center gap-3 text-neutral-300">
                <span className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center text-green-400">✓</span>
                Tushumlar - pul kelishlari
              </li>
              <li className="flex items-center gap-3 text-neutral-300">
                <span className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center text-red-400">✓</span>
                Xarajatlar - pul chiqishlari
              </li>
              <li className="flex items-center gap-3 text-neutral-300">
                <span className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center text-orange-400">✓</span>
                Oyliklar - ishchilarga berilgan oyliklar
              </li>
              <li className="flex items-center gap-3 text-neutral-300">
                <span className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center text-cyan-400">✓</span>
                Xulosa - jami statistika
              </li>
            </ul>

            <button
              onClick={exportToExcel}
              className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity text-lg flex items-center justify-center gap-3"
            >
              <span className="text-2xl">📥</span>
              Excel Yuklab Olish
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
