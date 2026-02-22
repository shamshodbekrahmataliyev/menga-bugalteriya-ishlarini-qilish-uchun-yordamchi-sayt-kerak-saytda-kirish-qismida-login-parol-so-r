/* eslint-disable react-hooks/set-state-in-effect, react/no-unescaped-entities */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Loader2, ArrowUpRight, ArrowDownRight, Users, Wallet } from "lucide-react";

interface Transaction {
  id: number;
  type: "tushum" | "xarajat" | "oylik";
  amount: number;
  description: string;
  date: string;
}

export default function KassaPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("transactions");
      if (stored) {
        return JSON.parse(stored);
      }
    }
    return [];
  });
  const [type, setType] = useState<"tushum" | "xarajat" | "oylik">("tushum");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isClient, setIsClient] = useState(false);

   
  useEffect(() => {
    setIsClient(true);
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      window.location.href = "/login";
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting || !amount || !description) return;
    
    setIsSubmitting(true);

    // Small delay to prevent double submit
    await new Promise(resolve => setTimeout(resolve, 300));

    const newTransaction: Transaction = {
      id: Date.now(),
      type,
      amount: parseInt(amount),
      description,
      date: new Date().toLocaleDateString("uz-UZ"),
    };

    const updated = [...transactions, newTransaction];
    setTransactions(updated);
    localStorage.setItem("transactions", JSON.stringify(updated));

    // Reset form
    setAmount("");
    setDescription("");
    setShowSuccess(true);
    setIsSubmitting(false);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handleDelete = (id: number) => {
    const updated = transactions.filter((t) => t.id !== id);
    setTransactions(updated);
    localStorage.setItem("transactions", JSON.stringify(updated));
  };

  const typeOptions = [
    { 
      value: "tushum", 
      label: "Tushum", 
      sublabel: "Pul kelishi",
      icon: ArrowUpRight,
      color: "green",
      bgColor: "bg-green-500",
      activeBg: "bg-green-500 text-white",
      inactiveBg: "bg-neutral-700 text-neutral-300 hover:bg-green-500/20 hover:text-green-400"
    },
    { 
      value: "xarajat", 
      label: "Xarajat", 
      sublabel: "Pul chiqishi",
      icon: ArrowDownRight,
      color: "red",
      bgColor: "bg-red-500",
      activeBg: "bg-red-500 text-white",
      inactiveBg: "bg-neutral-700 text-neutral-300 hover:bg-red-500/20 hover:text-red-400"
    },
    { 
      value: "oylik", 
      label: "Oylik", 
      sublabel: "Ishchilarga",
      icon: Users,
      color: "orange",
      bgColor: "bg-orange-500",
      activeBg: "bg-orange-500 text-white",
      inactiveBg: "bg-neutral-700 text-neutral-300 hover:bg-orange-500/20 hover:text-orange-400"
    },
  ];

  if (!isClient) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <div className="text-white">Yuklanmoqda...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Wallet className="w-8 h-8 text-amber-500" />
          Kassa
        </h1>
        <p className="text-neutral-400">
          Bu yerda moliyaviy ma'lumotlarni kiritishingiz mumkin
        </p>
      </div>

      {/* Add Transaction Form */}
      <div className="bg-neutral-800/80 backdrop-blur-xl rounded-2xl p-5 lg:p-6 border border-neutral-700/50 mb-8">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <Plus className="w-5 h-5 text-amber-500" />
          Yangi Tranzaksiya Qo'shish
        </h2>

        {showSuccess && (
          <div className="mb-6 p-3 bg-green-500/20 border border-green-500/50 rounded-xl text-green-400 text-center">
            Tranzaksiya muvaffaqiyatli qo'shildi!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-3">
              Tranzaksiya Turi
            </label>
            <div className="grid grid-cols-3 gap-3">
              {typeOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setType(option.value as typeof type)}
                    disabled={isSubmitting}
                    className={`py-3 px-4 rounded-xl font-medium transition-all flex flex-col items-center gap-1 ${
                      type === option.value
                        ? option.activeBg
                        : option.inactiveBg
                    } disabled:opacity-50`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{option.label}</span>
                    <span className="text-xs opacity-70">{option.sublabel}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Summa (so'm)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 bg-neutral-900/80 border border-neutral-600 rounded-xl text-white focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
              placeholder="Summani kiriting"
              required
              min="0"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Tavsif
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 bg-neutral-900/80 border border-neutral-600 rounded-xl text-white focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all resize-none"
              placeholder="Tranzaksiya haqida ma'lumot"
              rows={3}
              required
              disabled={isSubmitting}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Qo'shilmoqda...
              </>
            ) : (
              <>
                <Plus className="w-5 h-5" />
                Qo'shish
              </>
            )}
          </button>
        </form>
      </div>

      {/* Transactions List */}
      <div className="bg-neutral-800/80 backdrop-blur-xl rounded-2xl p-5 lg:p-6 border border-neutral-700/50">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <span>Barcha Tranzaksiyalar</span>
          <span className="text-sm font-normal text-neutral-400">
            ({transactions.length} ta)
          </span>
        </h2>

        {transactions.length === 0 ? (
          <div className="text-center py-12 text-neutral-400">
            <div className="w-20 h-20 bg-neutral-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wallet className="w-10 h-10 text-neutral-500" />
            </div>
            <p className="text-lg mb-2">Hozircha tranzaksiyalar mavjud emas</p>
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
                  <th className="text-center py-3 px-4 text-neutral-400 font-medium">Amal</th>
                </tr>
              </thead>
              <tbody>
                {transactions.slice().reverse().map((t) => (
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
                        {t.type === "tushum" ? <ArrowUpRight className="w-3 h-3" /> : t.type === "xarajat" ? <ArrowDownRight className="w-3 h-3" /> : <Users className="w-3 h-3" />}
                        {t.type === "tushum"
                          ? "Tushum"
                          : t.type === "xarajat"
                          ? "Xarajat"
                          : "Oylik"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-neutral-300">{t.description}</td>
                    <td className="py-3 px-4 text-right">
                      <span className={`font-medium ${
                        t.type === "xarajat" || t.type === "oylik" ? "text-red-400" : "text-green-400"
                      }`}>
                        {t.type === "xarajat" || t.type === "oylik" ? "-" : "+"}
                        {t.amount.toLocaleString()} so'm
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleDelete(t.id)}
                        className="text-red-400 hover:text-red-300 text-sm flex items-center gap-1 mx-auto hover:bg-red-500/10 px-3 py-1 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        O'chirish
                      </button>
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
