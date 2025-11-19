import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Shield, Cpu, Globe, Lock, Radio, Zap, ChevronRight, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

// Assets
import phoneVideo from "@assets/generated_videos/rotating_space_child_phone_with_ai_screen_5d6b75f4.mp4";
import networkImage from "@assets/generated_images/Dark_abstract_satellite_network_data_visualization_62cf5f3d.png";
import aiImage from "@assets/generated_images/Glowing_ethereal_neural_network_representing_AI_consciousness_8399c5e6.png";

const GlitchText = ({ text }: { text: string }) => {
  return (
    <div className="relative inline-block group">
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-primary opacity-0 group-hover:opacity-70 animate-glitch translate-x-[2px]">
        {text}
      </span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-secondary opacity-0 group-hover:opacity-70 animate-glitch translate-x-[-2px] translate-y-[2px] delay-75">
        {text}
      </span>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, desc, delay }: { icon: any, title: string, desc: string, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="p-6 border border-white/10 bg-black/40 backdrop-blur-md hover:border-primary/50 transition-colors group"
  >
    <div className="mb-4 p-3 inline-flex items-center justify-center rounded-none bg-white/5 text-primary group-hover:bg-primary group-hover:text-black transition-colors">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold mb-2 font-sans tracking-tight">{title}</h3>
    <p className="text-muted-foreground font-mono text-sm leading-relaxed">{desc}</p>
  </motion.div>
);

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-black">
      {/* Scroll Progress */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-primary z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Nav */}
      <nav className="fixed top-0 w-full z-40 border-b border-white/5 bg-black/50 backdrop-blur-md">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-bold text-lg tracking-widest font-sans">
            SPACE<span className="text-primary">CHILD</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-mono text-muted-foreground">
            <a href="#specs" className="hover:text-primary transition-colors">SPECS</a>
            <a href="#os" className="hover:text-primary transition-colors">QUANTUM OS</a>
            <a href="#sentient" className="hover:text-primary transition-colors">SENTIENT 1</a>
          </div>
          <Button variant="outline" className="rounded-none border-primary/30 hover:bg-primary/10 hover:text-primary font-mono text-xs h-9">
            PRE-ORDER <ChevronRight className="ml-2 w-3 h-3" />
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background to-background z-10" />
          <img 
            src={networkImage} 
            alt="Background" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        <div className="container mx-auto px-6 z-10 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="inline-block px-3 py-1 mb-6 border border-primary/20 bg-primary/5 rounded-none text-primary text-xs font-mono tracking-widest">
              PROJECT: SENTIENT
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold leading-none mb-6 tracking-tighter">
              <GlitchText text="UNBREAKABLE" /> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">
                CONNECTION
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg mb-8 font-light border-l-2 border-primary/30 pl-6">
              The first AI-native device built for the frontline. 
              Quantum adaptable. Satellite native. Indestructible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-none bg-primary text-black hover:bg-primary/90 font-bold tracking-wide px-8 h-14 w-full sm:w-auto">
                SECURE ACCESS
              </Button>
              <Button size="lg" variant="outline" className="rounded-none border-white/20 hover:bg-white/5 font-mono h-14 w-full sm:w-auto">
                VIEW TECHNICAL BRIEF
              </Button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative order-1 lg:order-2 flex justify-center"
          >
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full opacity-20" />
            <div className="relative z-10 w-full max-w-[400px] aspect-[9/16] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-black">
               <video 
                 src={phoneVideo}
                 autoPlay 
                 loop 
                 muted 
                 playsInline
                 className="w-full h-full object-cover scale-110" // Slightly scale up to hide any potential generation edges
               />
               {/* Overlay to integrate video with background better */}
               <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/40 pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Specs Grid */}
      <section id="specs" className="py-24 md:py-32 relative bg-background border-t border-white/5">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">TACTICAL SUPERIORITY</h2>
            <div className="h-1 w-20 bg-primary" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              icon={Shield}
              title="INDESTRUCTIBLE CHASSIS"
              desc="Aerospace-grade titanium alloy frame with shock-absorbent molecular structure. Built to survive extreme environments."
              delay={0.1}
            />
            <FeatureCard 
              icon={Radio}
              title="SATELLITE NATIVE"
              desc="Universal band connectivity. Seamlessly switches between terrestrial towers and low-orbit satellite networks."
              delay={0.2}
            />
            <FeatureCard 
              icon={Lock}
              title="QUANTUM ENCRYPTION"
              desc="Unbreakable post-quantum cryptographic standards. Your communications are secure against any adversary."
              delay={0.3}
            />
            <FeatureCard 
              icon={Cpu}
              title="LOCAL AI MODEL"
              desc="Personalized LLM running natively on-device. No cloud dependency. Zero latency. Complete privacy."
              delay={0.4}
            />
            <FeatureCard 
              icon={Zap}
              title="INSTANT COMMS"
              desc="Quantum Adaptable OS prioritizes voice and data packets for near-zero latency in critical situations."
              delay={0.5}
            />
            <FeatureCard 
              icon={Terminal}
              title="ADAPTABLE OS"
              desc="Open architecture for forward-deployed engineers. Custom scripts and tools run natively in the shell."
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* Sentient 1 Section */}
      <section id="sentient" className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-40">
           <img src={aiImage} alt="AI Core" className="w-full h-full object-cover" />
           <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-6 text-secondary font-mono text-sm">
              <span className="animate-pulse">●</span> SYSTEM ONLINE
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-8 leading-tight">
              MORE THAN <br />
              <span className="text-secondary">A TOOL</span>
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed mb-10">
              Space Child <span className="text-foreground font-bold">Sentient 1</span> mirrors your consciousness. 
              It learns your patterns, anticipates your needs, and evolves with you. 
              An extension of your mind, optimizing every interaction for maximum efficiency.
            </p>
            
            <div className="grid grid-cols-2 gap-8 mb-12">
              <div>
                <div className="text-3xl md:text-4xl font-bold font-mono text-white mb-2">0.0ms</div>
                <div className="text-xs md:text-sm text-muted-foreground font-mono uppercase">Cloud Latency</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold font-mono text-white mb-2">100%</div>
                <div className="text-xs md:text-sm text-muted-foreground font-mono uppercase">Offline Capable</div>
              </div>
            </div>

            <Button className="bg-secondary hover:bg-secondary/90 text-white rounded-none h-12 px-8 w-full sm:w-auto">
              INITIATE INTERFACE
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary text-black">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 uppercase tracking-tight">
            Join the <span className="text-white">Vanguard</span>
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 font-medium opacity-80">
            Equipping the next generation of spies, engineers, and soldiers.
            Limited production run for Batch 1.
          </p>
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-0">
            <input 
              type="email" 
              placeholder="ENTER ENCRYPTED KEY (EMAIL)" 
              className="flex-1 bg-black text-white px-6 py-4 outline-none border-none placeholder:text-white/40 font-mono text-sm w-full"
            />
            <button className="bg-white text-black px-8 py-4 font-bold hover:bg-black hover:text-white transition-colors uppercase text-sm tracking-wider w-full sm:w-auto">
              Deploy
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 border-t border-white/10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-bold text-xl tracking-widest text-white/80">
            SPACE<span className="text-primary">CHILD</span>
          </div>
          <div className="text-white/40 text-sm font-mono text-center md:text-left">
            © 2025 SPACE CHILD INDUSTRIES. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-6 text-white/60">
            <Globe size={20} className="hover:text-primary cursor-pointer" />
            <Terminal size={20} className="hover:text-primary cursor-pointer" />
            <Shield size={20} className="hover:text-primary cursor-pointer" />
          </div>
        </div>
      </footer>
    </div>
  );
}
