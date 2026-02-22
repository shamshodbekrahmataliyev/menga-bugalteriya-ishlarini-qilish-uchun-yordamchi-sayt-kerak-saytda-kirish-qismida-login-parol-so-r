import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-neutral-900/80 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-xl font-semibold">Menga Bugalteriya</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-neutral-300 hover:text-white transition-colors">Xizmatlar</Link>
              <Link href="#about" className="text-neutral-300 hover:text-white transition-colors">Biz haqimizda</Link>
              <Link href="#contact" className="text-neutral-300 hover:text-white transition-colors">Bog'lanish</Link>
              <button className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-neutral-900 font-medium rounded-lg transition-colors">
                Kirish
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-800 rounded-full text-sm text-neutral-300 mb-8">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
              Endi dunyo bo'ylab mavjud
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Sizning Bugalteriya
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                Ishlaringiz Osson
              </span>
            </h1>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto mb-10">
              Biz sizning buxgalteriya ishlarini professional tarzda 
              yuritishda yordam beramiz. Hisob-kitoblar, soliq hisoblari va 
              moliyaviy maslahat - hamma narsa bir joyda.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity text-lg">
                Ro'yxatdan O'tish
              </button>
              <button className="px-8 py-4 border border-neutral-700 text-white font-semibold rounded-xl hover:bg-neutral-800 transition-colors text-lg">
                Ko'proq Ma'lumot
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-20 border-t border-neutral-800">
            {[
              { number: "500+", label: "Tugatlangan Loyihalar" },
              { number: "98%", label: "Mijoz Mamnuniyati" },
              { number: "50+", label: "Jamoa A'zolari" },
              { number: "10+", label: "Yillik Tajriba" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-cyan-400 mb-2">{stat.number}</div>
                <div className="text-neutral-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Hamma Narsa Siz Uchun</h2>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
              Sizning buxgalteriya ishlarini avtomatlashtirish va osonlashtirish uchun kuchli xususiyatlar
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "⚡",
                title: "Tez va Sanoatli",
                description: "Optimallashtirilgan tizim sizning buxgalteriya yozuvlarini tez va aniq qayta ishlaydi."
              },
              {
                icon: "🎨",
                title: "Zamonaviy Interfeys",
                description: "Foydalanuvchilar uchun quva va oson interfeys barcha operatsiyalarni osonlashtiradi."
              },
              {
                icon: "🔒",
                title: "Xavfsiz va Ishonchli",
                description: "Ma'lumotlaringiz xavfsizligi uchun zamonaviy shifrlash va himoyalash tizimlari."
              },
              {
                icon: "📱",
                title: "Mobil Moslashuvchan",
                description: "Har qanday qurilmada - telefondan kompyutergacha mukammal ishlaydi."
              },
              {
                icon: "🚀",
                title: "Oson Sozlash",
                description: "Bir necha bosish bilan boshlang va darhol buxgalteriya yozuvlarini yuriting."
              },
              {
                icon: "💎",
                title: "Sifatli Xizmat",
                description: "Har bir tafsilot professional darajada ishlab chiqilgan."
              },
            ].map((feature, index) => (
              <div key={index} className="p-8 bg-neutral-900 rounded-2xl border border-neutral-800 hover:border-cyan-500/50 transition-colors">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-neutral-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">G'oyalardan Haqiqatgacha</h2>
              <p className="text-lg text-neutral-400 mb-6">
                2014-yildan buyon Menga Bugalteriya buxgalteriya sohasida yetakchi hisoblanadi. 
                Biz texnologiya kuchiga ishonamiz va har doim mijozlarga eng yaxshi yechimlarni taklif qilamiz.
              </p>
              <p className="text-lg text-neutral-400 mb-8">
                Professional buxgalterlar, moliya mutaxassislari va maslahatchilar jamoasi 
                sizning buxgalteriya ishlarini eng yuqori darajada olib boradi.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center text-2xl">✓</div>
                  <span className="text-neutral-300">Professional Jamoa</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center text-2xl">✓</div>
                  <span className="text-neutral-300">Innovatsion Yechimlar</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center text-2xl">✓</div>
                  <span className="text-neutral-300">Mintaqaviy Qamrov</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center text-2xl">✓</div>
                  <span className="text-neutral-300">24/7 Qo'llab-quvvatlash</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl blur-3xl opacity-30"></div>
              <div className="relative bg-neutral-800 rounded-3xl p-8 border border-neutral-700">
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-32 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-2xl"></div>
                  <div className="h-32 bg-gradient-to-br from-blue-600/20 to-transparent rounded-2xl"></div>
                  <div className="h-32 bg-gradient-to-br from-purple-500/20 to-transparent rounded-2xl"></div>
                  <div className="h-32 bg-gradient-to-br from-pink-500/20 to-transparent rounded-2xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-3xl p-12 border border-cyan-500/30">
            <h2 className="text-4xl font-bold mb-4">Boshlashga Tayyormisiz?</h2>
            <p className="text-xl text-neutral-400 mb-8">
              Loyehangizni muhokama qilish va qanday yordam bera olishimizni bilish uchun bog'laning.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="px-8 py-4 bg-white text-neutral-900 font-semibold rounded-xl hover:bg-neutral-100 transition-colors text-lg">
                Bog'lanish
              </button>
              <button className="px-8 py-4 border border-neutral-600 text-white font-semibold rounded-xl hover:bg-neutral-800 transition-colors text-lg">
                Ko'proq Ma'lumot
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <span className="text-xl font-semibold">Menga Bugalteriya</span>
              </div>
              <p className="text-neutral-400 max-w-md">
                Sizning buxgalteriya ishlarini professional darajada yuritish uchun eng yaxshi yechim.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Xizmatlar</h4>
              <ul className="space-y-2 text-neutral-400">
                <li><a href="#" className="hover:text-white transition-colors">Xususiyatlar</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Narxlar</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Hujjatlar</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Yangiliklar</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Kompaniya</h4>
              <ul className="space-y-2 text-neutral-400">
                <li><a href="#" className="hover:text-white transition-colors">Biz haqimizda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Karyera</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Bog'lanish</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-neutral-500 text-sm">© 2026 Menga Bugalteriya. Barcha huquqlar himoyalangan.</p>
            <div className="flex items-center gap-6 text-neutral-500 text-sm">
              <a href="#" className="hover:text-white transition-colors">Maxfiylik Siyosati</a>
              <a href="#" className="hover:text-white transition-colors">Foydalanish Shartlari</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
