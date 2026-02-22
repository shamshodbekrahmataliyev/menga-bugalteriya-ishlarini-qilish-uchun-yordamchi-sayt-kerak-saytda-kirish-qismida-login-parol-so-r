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
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <span className="text-xl font-semibold">BuildStream</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-neutral-300 hover:text-white transition-colors">Features</Link>
              <Link href="#about" className="text-neutral-300 hover:text-white transition-colors">About</Link>
              <Link href="#contact" className="text-neutral-300 hover:text-white transition-colors">Contact</Link>
              <button className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-neutral-900 font-medium rounded-lg transition-colors">
                Get Started
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
              Now available worldwide
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Build Something
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                Extraordinary
              </span>
            </h1>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto mb-10">
              We craft stunning digital experiences that transform your business. 
              From concept to launch, we bring your vision to life with cutting-edge technology.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity text-lg">
                Start Your Project
              </button>
              <button className="px-8 py-4 border border-neutral-700 text-white font-semibold rounded-xl hover:bg-neutral-800 transition-colors text-lg">
                View Our Work
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-20 border-t border-neutral-800">
            {[
              { number: "500+", label: "Projects Completed" },
              { number: "98%", label: "Client Satisfaction" },
              { number: "50+", label: "Team Members" },
              { number: "10+", label: "Years Experience" },
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
            <h2 className="text-4xl font-bold mb-4">Everything You Need</h2>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
              Powerful features to help you build, launch, and grow your digital presence
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "⚡",
                title: "Lightning Fast",
                description: "Optimized performance ensures your website loads in milliseconds, not seconds."
              },
              {
                icon: "🎨",
                title: "Beautiful Design",
                description: "Stunning, modern interfaces that captivate your audience and enhance user experience."
              },
              {
                icon: "🔒",
                title: "Secure & Reliable",
                description: "Enterprise-grade security to protect your data and your customers' trust."
              },
              {
                icon: "📱",
                title: "Fully Responsive",
                description: "Looks perfect on every device, from mobile phones to large desktop displays."
              },
              {
                icon: "🚀",
                title: "Easy Deployment",
                description: "Deploy your project with one click. No complex setup or configuration needed."
              },
              {
                icon: "💎",
                title: "Premium Quality",
                description: "Every detail is crafted with precision to ensure the highest quality output."
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
              <h2 className="text-4xl font-bold mb-6">We Turn Ideas Into Reality</h2>
              <p className="text-lg text-neutral-400 mb-6">
                Founded in 2014, BuildStream has been at the forefront of digital innovation. 
                We believe in the power of technology to transform businesses and create meaningful experiences.
              </p>
              <p className="text-lg text-neutral-400 mb-8">
                Our team of passionate designers, developers, and strategists work together 
                to deliver exceptional results that exceed expectations.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center text-2xl">✓</div>
                  <span className="text-neutral-300">Expert Team</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center text-2xl">✓</div>
                  <span className="text-neutral-300">Innovative Solutions</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center text-2xl">✓</div>
                  <span className="text-neutral-300">Global Reach</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center text-2xl">✓</div>
                  <span className="text-neutral-300">24/7 Support</span>
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
            <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-neutral-400 mb-8">
              Let&apos;s discuss your project and see how we can help you achieve your goals.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="px-8 py-4 bg-white text-neutral-900 font-semibold rounded-xl hover:bg-neutral-100 transition-colors text-lg">
                Schedule a Call
              </button>
              <button className="px-8 py-4 border border-neutral-600 text-white font-semibold rounded-xl hover:bg-neutral-800 transition-colors text-lg">
                Learn More
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
                  <span className="text-white font-bold text-lg">B</span>
                </div>
                <span className="text-xl font-semibold">BuildStream</span>
              </div>
              <p className="text-neutral-400 max-w-md">
                Creating extraordinary digital experiences that transform businesses worldwide.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-neutral-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-neutral-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-neutral-500 text-sm">© 2026 BuildStream. All rights reserved.</p>
            <div className="flex items-center gap-6 text-neutral-500 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
