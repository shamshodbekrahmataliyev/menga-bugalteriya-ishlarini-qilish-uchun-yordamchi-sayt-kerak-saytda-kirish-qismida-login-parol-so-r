"use client";

import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { FileSpreadsheet, Download, Loader2, Check, TrendingUp, TrendingDown, Users, DollarSign } from "lucide-react";

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
  const [isExporting, setIsExporting] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
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

  const exportToExcel = async () => {
    if (transactions.length === 0) {
      alert("Ma'lumotlar mavjud emas!");
      return;
    }

    setIsExporting(true);
    
    // Small delay to show loading state
    await new Promise(resolve => setTimeout(resolve, 500));

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
    XLSX.writeFile(wb, `A.S_Mebel_Bugalteriya_${new Date().toISOString().split("T")[0]}.xlsx`);
    setIsExporting(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <div className="text-white">Yuklanmoqda...</div>
      </div>
    );
  }

  const statCards = [
    { label: "Jami Tushum", value: totalTushum, icon: TrendingUp, color: "green" },
    { label: "Jami Xarajat", value: totalXarajat, icon: TrendingDown, color: "red" },
    { label: "Ishchilarga Oylik", value: totalOylik, icon: Users, color: "orange" },
    { label: "Sof Foyda", value: foyda, icon: DollarSign, color: "cyan" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <FileSpreadsheet className="w-8 h-8 text-amber-500" />
          Excel Yuklash
        </h1>
        <p className="text-neutral-400">
          Bu yerda ma'lumotlarni Excel fayli sifatida yuklab olishingiz mumkin
        </p>
      </div>

      {showSuccess && (
        <div className="mb-6 p-3 bg-green-500/20 border border-green-500/50 rounded-xl text-green-400 text-center flex items-center justify-center gap-2">
          <Check className="w-5 h-5" />
          Excel fayli muvaffaqiyatli yuklab olindi!
        </div>
      )}

      {/* Preview Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-neutral-800/80 backdrop-blur-xl rounded-2xl p-5 lg:p-6 border border-neutral-700/50"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  stat.color === 'green' ? 'bg-green-500/20 text-green-400' :
                  stat.color === 'red' ? 'bg-red-500/20 text-red-400' :
                  stat.color === 'orange' ? 'bg-orange-500/20 text-orange-400' :
                  'bg-cyan-500/20 text-cyan-400'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-neutral-400 text-sm">{stat.label}</span>
              </div>
              <div className={`text-2xl font-bold ${
                stat.color === 'green' ? 'text-green-400' :
                stat.color === 'red' ? 'text-red-400' :
                stat.color === 'orange' ? 'text-orange-400' :
                'text-cyan-400'
              }`}>
                {stat.value.toLocaleString()} so'm
              </div>
            </div>
          );
        })}
      </div>

      {/* Export Button */}
      <div className="bg-neutral-800/80 backdrop-blur-xl rounded-2xl p-5 lg:p-6 border border-neutral-700/50">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <Download className="w-5 h-5 text-amber-500" />
          Excel Faylini Yuklab Olish
        </h2>

        {transactions.length === 0 ? (
          <div className="text-center py-12 text-neutral-400">
            <div className="w-20 h-20 bg-neutral-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileSpreadsheet className="w-10 h-10 text-neutral-500" />
            </div>
            <p className="text-lg mb-2">Hozircha ma'lumotlar mavjud emas</p>
            <p className="text-sm">Kassa bo'limida ma'lumot qo'shing</p>
          </div>
        ) : (
          <div>
            <p className="text-neutral-400 mb-6">
              Excel faylida quyidagi sahifalar bo'ladi:
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-neutral-300">
                <span className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center text-green-400">
                  <Check className="w-4 h-4" />
                </span>
                <span>Barcha Tranzaksiyalar</span>
                <span className="text-neutral-500 text-sm">- barcha kiritilgan ma'lumotlar</span>
              </li>
              <li className="flex items-center gap-3 text-neutral-300">
                <span className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center text-green-400">
                  <Check className="w-4 h-4" />
                </span>
                <span>Tushumlar</span>
                <span className="text-neutral-500 text-sm">- pul kelishlari</span>
              </li>
              <li className="flex items-center gap-3 text-neutral-300">
                <span className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center text-red-400">
                  <Check className="w-4 h-4" />
                </span>
                <span>Xarajatlar</span>
                <span className="text-neutral-500 text-sm">- pul chiqishlari</span>
              </li>
              <li className="flex items-center gap-3 text-neutral-300">
                <span className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center text-orange-400">
                  <Check className="w-4 h-4" />
                </span>
                <span>Oyliklar</span>
                <span className="text-neutral-500 text-sm">- ishchilarga berilgan oyliklar</span>
              </li>
              <li className="flex items-center gap-3 text-neutral-300">
                <span className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center text-cyan-400">
                  <Check className="w-4 h-4" />
                </span>
                <span>Xulosa</span>
                <span className="text-neutral-500 text-sm">- jami statistika</span>
              </li>
            </ul>

            <button
              onClick={exportToExcel}
              disabled={isExporting}
              className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg"
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Yuklanmoqda...
                </>
              ) : (
                <>
                  <Download className="w-6 h-6" />
                  Excel Yuklab Olish
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
