import { Card, CardContent } from '@/components/ui/card'
import { Star } from 'lucide-react'
import { useInView } from '@/hooks/useInView'
const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Small Business Owner',
    content:
      'SwiftParcel has transformed how I ship products to my customers. The tracking is incredibly accurate and my customers love the updates.',
    rating: 5,
    avatar: 'SJ',
  },
  {
    name: 'Michael Chen',
    role: 'E-commerce Manager',
    content:
      'We switched to SwiftParcel last year and cut our shipping costs by 20% while improving delivery times. The dashboard is a lifesaver.',
    rating: 5,
    avatar: 'MC',
  },
  {
    name: 'Emma Davis',
    role: 'Freelance Artist',
    content:
      "Shipping fragile artwork is stressful, but SwiftParcel's secure handling gives me peace of mind. Never had a damaged item.",
    rating: 4,
    avatar: 'ED',
  },
]
export function Testimonials() {
  const { ref, hasTriggered } = useInView({
    threshold: 0.1,
    rootMargin: '0px',
  })
  return (
    <section className="pb-16 pt-6 bg-white dark:bg-slate-800" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <div
          className={`text-center mb-16 transition-all duration-700 transform ${hasTriggered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4">
            Trusted by Businesses
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our customers have to
            say.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className={`transition-all duration-700 transform ${hasTriggered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{
                transitionDelay: `${index * 200}ms`,
              }}
            >
              <Card className="bg-slate-50 dark:bg-slate-700 border-none h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8 flex flex-col h-full">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < t.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`}
                      />
                    ))}
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 mb-6 italic flex-1">
                    "{t.content}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold shadow-sm">
                      {t.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-slate-50">
                        {t.name}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">{t.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
