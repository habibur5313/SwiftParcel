import  { useEffect, useState } from 'react'
import {
  ArrowRight,
  Search,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Globe,
  Shield,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
const slides = [
  {
    id: 1,
    icon: Zap,
    headline: 'Lightning Fast Delivery',
    subtext:
      'Experience the speed of our express network. Same-day delivery available in major cities.',
    bgClass: 'bg-blue-50',
    accentColor: 'text-blue-600',
    iconBg: 'bg-blue-100',
  },
  {
    id: 2,
    icon: Globe,
    headline: 'Global Reach, Local Care',
    subtext:
      'Shipping to over 150 countries with seamless customs handling and real-time tracking.',
    bgClass: 'bg-indigo-50',
    accentColor: 'text-indigo-600',
    iconBg: 'bg-indigo-100',
  },
  {
    id: 3,
    icon: Shield,
    headline: 'Secure & Insured Handling',
    subtext:
      'Your parcels are protected every step of the way with our comprehensive insurance coverage.',
    bgClass: 'bg-amber-50',
    accentColor: 'text-amber-600',
    iconBg: 'bg-amber-100',
  },
]
export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isPaused])
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-white dark:bg-slate-900">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-amber-100 rounded-full blur-3xl opacity-50" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div
          className="max-w-4xl mx-auto text-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Carousel Container */}
          <div className="relative min-h-[300px] flex items-center justify-center mb-10">
            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all z-20 hidden md:flex"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all z-20 hidden md:flex"
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Slides */}
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ease-in-out transform ${index === currentSlide ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-8 scale-95 pointer-events-none'}`}
              >
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${slide.iconBg} ${slide.accentColor} text-sm font-medium mb-6`}
                >
                  <slide.icon className="h-4 w-4" />
                  <span>{slide.headline}</span>
                </div>

                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-6">
                  {index === 0 && (
                    <>
                      Reliable Shipping for <br className="hidden md:block" />
                      <span className="text-blue-600 dark:text-blue-400">Global Business</span>
                    </>
                  )}
                  {index === 1 && (
                    <>
                      Connect with the <br className="hidden md:block" />
                      <span className="text-indigo-600 dark:text-indigo-400">Whole World</span>
                    </>
                  )}
                  {index === 2 && (
                    <>
                      Safety First for <br className="hidden md:block" />
                      <span className="text-amber-600 dark:text-amber-400">Every Parcel</span>
                    </>
                  )}
                </h1>

                <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                  {slide.subtext}
                </p>
              </div>
            ))}
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mb-10">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'w-8 bg-blue-600 dark:bg-blue-400' : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
            <Button
              size="lg"
              className="w-full sm:w-auto h-12 px-8 text-base shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 transition-all hover:-translate-y-0.5"
            >
              Send a Parcel <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto h-12 px-8 text-base bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all hover:-translate-y-0.5 dark:text-slate-400 dark:hover:text-slate-300"
            >
              Track Shipment <Search className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Quick Track Input */}
          <div className="mt-12 max-w-md mx-auto bg-white dark:bg-slate-900 p-2 rounded-lg shadow-xl shadow-slate-200/50 border border-slate-100 dark:border-slate-700 flex items-center animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500 hover:shadow-2xl transition-shadow">
            <MapPin className="ml-3 h-5 w-5 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder="Enter tracking number..."
              className="flex-1 px-4 py-2 outline-none text-slate-700 dark:text-slate-300 placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
            <Button size="sm">Track</Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:flex flex-col items-center gap-2 text-slate-400 dark:text-slate-500">
        <span className="text-xs font-medium uppercase tracking-widest">
          Scroll
        </span>
        <ArrowRight className="h-4 w-4 rotate-90" />
      </div>
    </section>
  )
}
