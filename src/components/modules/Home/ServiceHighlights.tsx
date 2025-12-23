import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Truck, Clock, Shield, Globe } from 'lucide-react'
import { useInView } from '@/hooks/useInView'
const features = [
  {
    icon: Truck,
    title: 'Express Delivery',
    description:
      'Same-day and next-day delivery options for urgent shipments within major cities.',
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description:
      'International shipping to over 150 countries with customs handling included.',
  },
  {
    icon: Shield,
    title: 'Secure Handling',
    description:
      'Full insurance coverage and tamper-proof packaging for high-value items.',
  },
  {
    icon: Clock,
    title: 'Real-time Tracking',
    description:
      '24/7 visibility of your package location with precise ETA updates.',
  },
]
export function ServiceHighlights() {
  const { ref, hasTriggered } = useInView({
    threshold: 0.1,
    rootMargin: '0px',
  })
  return (
    <section id="services" className="pt-16 bg-white dark:bg-slate-800" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <div
          className={`text-center mb-16 transition-all duration-700 transform ${hasTriggered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4">
            Why Choose SwiftParcel?
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            We combine technology with logistics expertise to deliver a superior
            shipping experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`transition-all duration-700 transform ${hasTriggered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{
                transitionDelay: `${index * 150}ms`,
              }}
            >
              <Card className="border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl mb-2">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
