"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      window.location.href = "/login";
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

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
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handleDelete = (id: number) => {
    const updated = transactions.filter((t) => t.id !== id);
    setTransactions(updated);
    localStorage.setItem("transactions", JSON.stringify(updated));
  };

  const typeOptions = [
    { value: "tushum", label: "Tushum (Pul kelishi)", color: "green" },
    { value: "xarajat", label: "Xarajat (Pul chiqishi)", color: "red" },
    { value: "oylik", label: "Oylik (Ishchilarga)", color: "orange" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Kassa</h1>
        <p className="text-neutral-400">
          Bu yerda moliyaviy ma'lumotlarni kiritishingiz mumkin
        </p>
      </div>

      {/* Add Transaction Form */}
      <div className="bg-neutral-800 rounded-2xl p-6 border border-neutral-700 mb-8">
        <h2 className="text-xl font-semibold text-white mb-6">
          Yangi Tranzaksiya Qo'shish
        </h2>

        {showSuccess && (
          <div className="mb-6 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-center">
            Tranzaksiya muvaffaqiyatli qo'shildi!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Tranzaksiya Turi
            </label>
            <div className="grid grid-cols-3 gap-3">
              {typeOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setType(option.value as typeof type)}
                  className={`py-3 px-4 rounded-lg font-medium transition-colors ${
                    type === option.value
                      ? option.color === "green"
                        ? "bg-green-500 text-white"
                        : option.color === "red"
                        ? "bg-red-500 text-white"
                        : "bg-orange-500 text-white"
                      : "bg-neutral-700 text-neutral-300 hover:bg-neutral-600"
                  }`}
                >
                  {option.label}
                </button>
              ))}
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
              className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              placeholder="Summani kiriting"
              required
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Tavsif
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 resize-none"
              placeholder="Tranzaksiya haqida ma'lumot"
              rows={3}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            Qo'shish
          </button>
        </form>
      </div>

      {/* Transactions List */}
      <div className="bg-neutral-800 rounded-2xl p-6 border border-neutral-700">
        <h2 className="text-xl font-semibold text-white mb-6">
          Barcha Tranzaksiyalar
        </h2>

        {transactions.length === 0 ? (
          <div className="text-center py-12 text-neutral-400">
            <p className="text-4xl mb-4">📋</p>
            <p>Hozircha tranzaksiyalar mavjud emas</p>
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
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleDelete(t.id)}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
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
