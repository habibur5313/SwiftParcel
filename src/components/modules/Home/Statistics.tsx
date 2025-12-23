export function Statistics() {
  const stats = [
    {
      value: '10M+',
      label: 'Parcels Delivered',
    },
    {
      value: '150+',
      label: 'Countries Served',
    },
    {
      value: '99.9%',
      label: 'On-Time Delivery',
    },
    {
      value: '24/7',
      label: 'Customer Support',
    },
  ]
  return (
    <section className="py-16 bg-slate-900 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-800/50">
          {stats.map((stat, index) => (
            <div key={index} className="p-4">
              <div className="text-4xl md:text-5xl font-bold text-blue-500 mb-2">
                {stat.value}
              </div>
              <div className="text-slate-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
