import {
  ShoppingBag,
  FileText,
  Gift,
  Monitor,
  Briefcase,
  Archive,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useInView } from '@/hooks/useInView'
const categories = [
  {
    icon: ShoppingBag,
    name: 'E-commerce',
  },
  {
    icon: FileText,
    name: 'Documents',
  },
  {
    icon: Gift,
    name: 'Gifts',
  },
  {
    icon: Monitor,
    name: 'Electronics',
  },
  {
    icon: Briefcase,
    name: 'Business',
  },
  {
    icon: Archive,
    name: 'Bulk Cargo',
  },
]
export function Categories() {
  const { ref, hasTriggered } = useInView({
    threshold: 0.1,
    rootMargin: '0px',
  })
  return (
    <section className="pb-16 pt-6 bg-white dark:bg-slate-800" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <div
          className={`flex flex-col md:flex-row justify-between items-end mb-12 gap-4 transition-all duration-700 transform ${hasTriggered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4">
              What We Deliver
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl">
              Specialized handling for every type of shipment.
            </p>
          </div>
          <a
            href="#"
            className="text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1 group"
          >
            View all categories{' '}
            <span className="group-hover:translate-x-1 transition-transform">
              &rarr;
            </span>
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`transition-all duration-500 transform ${hasTriggered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <Card className="hover:border-blue-200 hover:shadow-lg transition-all duration-300 cursor-pointer group h-full hover:-translate-y-1">
                <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                  <div className="p-3 rounded-full bg-slate-50 group-hover:bg-blue-50 transition-colors mb-3">
                    <category.icon className="h-6 w-6 text-slate-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <span className="font-medium text-slate-700 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-50 transition-colors">
                    {category.name}
                  </span>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
