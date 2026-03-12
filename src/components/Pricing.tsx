import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Zap, Building2, Crown } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    icon: Zap,
    description: "Perfect for getting started and testing",
    features: [
      "1,000 API requests/month",
      "Basic AI models",
      "Community support",
      "Standard documentation",
      "99% uptime SLA",
    ],
    cta: "Get Started",
    highlighted: false,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    name: "Pro",
    price: "$49",
    icon: Crown,
    description: "For growing teams and production apps",
    features: [
      "100,000 API requests/month",
      "Advanced AI models",
      "Priority support",
      "Advanced analytics",
      "99.9% uptime SLA",
      "Custom model fine-tuning",
      "Team collaboration tools",
    ],
    cta: "Start Free Trial",
    highlighted: true,
    gradient: "from-violet-500 to-purple-600",
  },
  {
    name: "Enterprise",
    price: "Custom",
    icon: Building2,
    description: "For large-scale deployments",
    features: [
      "Unlimited API requests",
      "All AI models + custom models",
      "24/7 dedicated support",
      "Advanced security & compliance",
      "99.99% uptime SLA",
      "On-premise deployment option",
      "Custom integrations",
      "Dedicated account manager",
    ],
    cta: "Contact Sales",
    highlighted: false,
    gradient: "from-emerald-500 to-teal-500",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-36 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-muted/30" />
      <div className="absolute inset-0 -z-10 bg-gradient-mesh opacity-30" />
      
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6 mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold"
          >
            Simple, transparent{" "}
            <span className="gradient-text">
              pricing
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Choose the plan that's right for you. Always know what you'll pay.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className={`relative p-8 rounded-3xl border bg-card/80 backdrop-blur-xl transition-all duration-500 ${
                  plan.highlighted
                    ? "ring-2 ring-primary shadow-2xl scale-105"
                    : "border-white/10 hover:shadow-xl"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                    <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-2 text-sm font-bold text-white shadow-lg">
                      <Sparkles className="h-4 w-4" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Plan icon */}
                  <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${plan.gradient} shadow-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                    <p className="text-muted-foreground text-sm mt-2">
                      {plan.description}
                    </p>
                  </div>
                  
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-extrabold">{plan.price}</span>
                    {plan.price !== "Custom" && (
                      <span className="text-muted-foreground text-lg">/month</span>
                    )}
                  </div>

                  <Button
                    className={`w-full rounded-2xl py-6 text-base font-semibold ${
                      plan.highlighted 
                        ? "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700" 
                        : ""
                    }`}
                    variant={plan.highlighted ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>

                  <div className="pt-4 space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-3">
                        <div className="mt-0.5 rounded-full bg-primary/20 p-1">
                          <Check className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-muted-foreground">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
