import { motion } from 'framer-motion';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  stars: number;
}

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      quote: "Smart Task Flow completely changed my daily routine. The AI-suggested schedule takes away all decision fatigue, allowing me to dive straight into work.",
      name: "Sarah Chen",
      role: "Lead Product Designer",
      company: "Framer",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      stars: 5
    },
    {
      quote: "The interface is gorgeous and feels extremely premium. We sync our team boards and the AI prioritization helps us hit shipping deadlines without burning out.",
      name: "Marcus Aurelius",
      role: "Senior Engineering Manager",
      company: "Vercel",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      stars: 5
    },
    {
      quote: "The Pomodoro integration and real-time focus analytics are super helpful. It has boosted my study and development efficiency by at least 40%.",
      name: "Emily Watson",
      role: "Full Stack Engineer & Student",
      company: "MIT",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
      stars: 5
    }
  ];

  return (
    <section className="relative py-24 bg-slate-950/20 border-t border-white/5" id="testimonials">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-purple">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            Loved by builders and doers
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            See how professionals and students use Smart Task Flow to maximize their productivity.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="glass-panel p-6 sm:p-8 rounded-2xl text-left glass-card-hover flex flex-col justify-between h-full relative group"
            >
              {/* Star Rating */}
              <div className="flex items-center gap-0.5 mb-4">
                {[...Array(test.stars)].map((_, i) => (
                  <svg key={i} className="w-4.5 h-4.5 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm sm:text-base text-slate-300 italic font-normal leading-relaxed mb-6">
                "{test.quote}"
              </p>

              {/* Profile Card */}
              <div className="flex items-center gap-3 border-t border-white/5 pt-4">
                <img className="w-10 h-10 rounded-full object-cover ring-1 ring-white/10" src={test.avatar} alt={test.name} />
                <div className="text-left overflow-hidden">
                  <p className="text-sm font-bold text-white leading-none">{test.name}</p>
                  <p className="text-xs text-slate-400 mt-1 truncate">
                    {test.role} <span className="text-brand-purple">@ {test.company}</span>
                  </p>
                </div>
              </div>
              
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
