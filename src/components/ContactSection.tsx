import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 md:py-32 bg-background">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="section-subtitle">Get in Touch</span>
            <h2 className="section-title mt-4 mb-6">
              Let's Build Your
              <br />
              <span className="italic font-normal">Forever Home</span>
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-10 max-w-md">
              Every exceptional home begins with a conversation. Share your vision, 
              and we'll bring our expertise to craft something truly extraordinary.
            </p>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-sm">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-display text-foreground font-medium">Location</h4>
                  <p className="font-body text-muted-foreground text-sm mt-1">
                    Scottsdale, Arizona
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-sm">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-display text-foreground font-medium">Phone</h4>
                  <p className="font-body text-muted-foreground text-sm mt-1">
                    (480) 555-0123
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-sm">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-display text-foreground font-medium">Email</h4>
                  <p className="font-body text-muted-foreground text-sm mt-1">
                    hello@liefdevelopment.com
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <form className="bg-card p-8 md:p-10 border border-border rounded-sm">
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="firstName" className="block font-body text-sm text-foreground mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="w-full px-4 py-3 bg-background border border-input rounded-sm font-body text-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block font-body text-sm text-foreground mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="w-full px-4 py-3 bg-background border border-input rounded-sm font-body text-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block font-body text-sm text-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 bg-background border border-input rounded-sm font-body text-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="projectType" className="block font-body text-sm text-foreground mb-2">
                  Project Type
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  className="w-full px-4 py-3 bg-background border border-input rounded-sm font-body text-foreground focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="">Select an option</option>
                  <option value="custom">Custom Home</option>
                  <option value="renovation">Renovation</option>
                  <option value="consultation">Consultation</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="mb-8">
                <label htmlFor="message" className="block font-body text-sm text-foreground mb-2">
                  Tell us about your vision
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-4 py-3 bg-background border border-input rounded-sm font-body text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                />
              </div>

              <button type="submit" className="btn-primary w-full">
                Start the Conversation
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
