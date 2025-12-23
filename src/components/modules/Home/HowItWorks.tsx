import { Package, Truck, MapPin, CheckCircle } from 'lucide-react'
import { useInView } from '@/hooks/useInView'
const steps = [
  {
    icon: Package,
    title: 'Book Shipment',
    description: 'Enter details and choose your service level.',
  },
  {
    icon: Truck,
    title: 'We Collect',
    description: 'Courier picks up from your doorstep.',
  },
  {
    icon: MapPin,
    title: 'Track Journey',
    description: 'Follow your parcel in real-time.',
  },
  {
    icon: CheckCircle,
    title: 'Safe Delivery',
    description: 'Secure delivery with proof of receipt.',
  },
]
export function HowItWorks() {
  const { ref, hasTriggered } = useInView({
    threshold: 0.2,
    rootMargin: '0px',
  })
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-slate-50 dark:bg-slate-800" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <div
          className={`text-center mb-16 transition-all duration-700 transform ${hasTriggered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Sending a parcel has never been easier. Just four simple steps.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div
            className={`hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-slate-200 dark:bg-slate-700 -z-10 transform -translate-y-1/2 mx-16 transition-all duration-1000 delay-500 ${hasTriggered ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0 origin-left'}`}
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex flex-col items-center text-center group transition-all duration-700 transform ${hasTriggered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
                style={{
                  transitionDelay: `${index * 200}ms`,
                }}
              >
                <div className="w-24 h-24 bg-white rounded-full border-4 border-slate-50 shadow-sm flex items-center justify-center mb-6 relative z-10 group-hover:border-blue-50 group-hover:scale-110 transition-all duration-300">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg group-hover:bg-blue-700 transition-colors">
                    <step.icon className="h-8 w-8" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-sm border-2 border-white shadow-md">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 max-w-xs">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
