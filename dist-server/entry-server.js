import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.mjs";
import * as React from "react";
import { useState, useEffect, useRef, createContext, useContext } from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva } from "class-variance-authority";
import { X, Menu, Flame, Droplets, Bug, Thermometer, DollarSign, Clock, TrendingUp, BadgeCheck, ArrowRight, Wind, Recycle, Shield, Volume2, Check } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useTheme } from "next-themes";
import { Toaster as Toaster$2 } from "sonner";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useLocation, Link, useNavigate, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1e6;
let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}
const toastTimeouts = /* @__PURE__ */ new Map();
const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId
    });
  }, TOAST_REMOVE_DELAY);
  toastTimeouts.set(toastId, timeout);
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
      };
    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) => t.id === action.toast.id ? { ...t, ...action.toast } : t)
      };
    case "DISMISS_TOAST": {
      const { toastId } = action;
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast2) => {
          addToRemoveQueue(toast2.id);
        });
      }
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === toastId || toastId === void 0 ? {
            ...t,
            open: false
          } : t
        )
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === void 0) {
        return {
          ...state,
          toasts: []
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId)
      };
  }
};
const listeners = [];
let memoryState = { toasts: [] };
function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}
function toast({ ...props }) {
  const id = genId();
  const update = (props2) => dispatch({
    type: "UPDATE_TOAST",
    toast: { ...props2, id }
  });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      }
    }
  });
  return {
    id,
    dismiss,
    update
  };
}
function useToast() {
  const [state, setState] = React.useState(memoryState);
  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);
  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId })
  };
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const ToastProvider = ToastPrimitives.Provider;
const ToastViewport = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Viewport,
  {
    ref,
    className: cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    ),
    ...props
  }
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;
const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const Toast = React.forwardRef(({ className, variant, ...props }, ref) => {
  return /* @__PURE__ */ jsx(ToastPrimitives.Root, { ref, className: cn(toastVariants({ variant }), className), ...props });
});
Toast.displayName = ToastPrimitives.Root.displayName;
const ToastAction = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Action,
  {
    ref,
    className: cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors group-[.destructive]:border-muted/40 hover:bg-secondary group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 group-[.destructive]:focus:ring-destructive disabled:pointer-events-none disabled:opacity-50",
      className
    ),
    ...props
  }
));
ToastAction.displayName = ToastPrimitives.Action.displayName;
const ToastClose = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Close,
  {
    ref,
    className: cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity group-hover:opacity-100 group-[.destructive]:text-red-300 hover:text-foreground group-[.destructive]:hover:text-red-50 focus:opacity-100 focus:outline-none focus:ring-2 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    ),
    "toast-close": "",
    ...props,
    children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
  }
));
ToastClose.displayName = ToastPrimitives.Close.displayName;
const ToastTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(ToastPrimitives.Title, { ref, className: cn("text-sm font-semibold", className), ...props }));
ToastTitle.displayName = ToastPrimitives.Title.displayName;
const ToastDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(ToastPrimitives.Description, { ref, className: cn("text-sm opacity-90", className), ...props }));
ToastDescription.displayName = ToastPrimitives.Description.displayName;
function Toaster$1() {
  const { toasts } = useToast();
  return /* @__PURE__ */ jsxs(ToastProvider, { children: [
    toasts.map(function({ id, title, description, action, ...props }) {
      return /* @__PURE__ */ jsxs(Toast, { ...props, children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1", children: [
          title && /* @__PURE__ */ jsx(ToastTitle, { children: title }),
          description && /* @__PURE__ */ jsx(ToastDescription, { children: description })
        ] }),
        action,
        /* @__PURE__ */ jsx(ToastClose, {})
      ] }, id);
    }),
    /* @__PURE__ */ jsx(ToastViewport, {})
  ] });
}
const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();
  return /* @__PURE__ */ jsx(
    Toaster$2,
    {
      theme,
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
const TooltipProvider = TooltipPrimitive.Provider;
const TooltipContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(
  TooltipPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
const logoLight = "/assets/lief-logo-light-O5v9duEF.png";
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isDarkHero = location.pathname === "/" || location.pathname === "/about";
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navLinks2 = [
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
    { href: "/#contact", label: "Contact" }
  ];
  return /* @__PURE__ */ jsxs(
    motion.header,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 1, delay: 0.5 },
      className: `fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isScrolled ? "bg-greek-villa/95 backdrop-blur-md py-5" : "bg-transparent py-8"}`,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between", children: [
          /* @__PURE__ */ jsx(Link, { to: "/", className: "group", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: logoLight,
              alt: "Lïef",
              className: `h-6 md:h-8 w-auto transition-all duration-500 ${isScrolled ? "brightness-0" : ""}`
            }
          ) }),
          /* @__PURE__ */ jsx("nav", { className: "hidden md:flex items-center gap-10", children: navLinks2.map((link) => /* @__PURE__ */ jsx(
            Link,
            {
              to: link.href,
              className: `font-body text-sm tracking-wider transition-colors duration-500 ${isScrolled ? "text-tricorn-black hover:text-goldenrod" : isDarkHero ? "text-greek-villa/80 hover:text-greek-villa" : "text-tricorn-black hover:text-goldenrod"}`,
              children: link.label
            },
            link.href
          )) }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen),
              className: `md:hidden p-2 transition-colors ${isScrolled ? "text-tricorn-black" : isDarkHero ? "text-greek-villa" : "text-tricorn-black"}`,
              "aria-label": "Toggle menu",
              children: isMobileMenuOpen ? /* @__PURE__ */ jsx(X, { size: 24 }) : /* @__PURE__ */ jsx(Menu, { size: 24 })
            }
          )
        ] }),
        /* @__PURE__ */ jsx(AnimatePresence, { children: isMobileMenuOpen && /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, height: 0 },
            animate: { opacity: 1, height: "auto" },
            exit: { opacity: 0, height: 0 },
            transition: { duration: 0.4, ease: "easeInOut" },
            className: "md:hidden bg-greek-villa border-t border-tricorn-black/10",
            children: /* @__PURE__ */ jsx("nav", { className: "px-6 py-8 flex flex-col gap-6", children: navLinks2.map((link) => /* @__PURE__ */ jsx(
              Link,
              {
                to: link.href,
                onClick: () => setIsMobileMenuOpen(false),
                className: "font-body text-tricorn-black text-lg",
                children: link.label
              },
              link.href
            )) })
          }
        ) })
      ]
    }
  );
};
const heroImage = "/assets/hero-home-C-sQVQl-.jpg";
const liefDevLogo = "/assets/lief-dev-greek-villa-BRceOOw8.png";
const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  return /* @__PURE__ */ jsxs(
    "section",
    {
      ref: containerRef,
      className: "relative h-[100vh] flex items-center justify-center overflow-hidden",
      children: [
        /* @__PURE__ */ jsxs(motion.div, { className: "absolute inset-0", style: { scale }, children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: heroImage,
              alt: "Lïef Development luxury residence",
              className: "w-full h-full object-cover"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-tricorn-black/50 via-tricorn-black/30 to-tricorn-black/70" })
        ] }),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            className: "relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12",
            style: { y, opacity },
            children: [
              /* @__PURE__ */ jsx(
                motion.div,
                {
                  initial: { opacity: 0, y: 40 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] },
                  className: "mb-8",
                  children: /* @__PURE__ */ jsx("span", { className: "font-body text-goldenrod text-sm tracking-[0.4em] uppercase font-medium", children: "Arizona's Premier Luxury Builder" })
                }
              ),
              /* @__PURE__ */ jsx(
                motion.div,
                {
                  initial: { opacity: 0, y: 60 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 1.2, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] },
                  className: "mb-12",
                  children: /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: liefDevLogo,
                      alt: "Lïef Development",
                      className: "h-[36vw] sm:h-[28vw] md:h-[24vw] lg:h-[20vw] w-auto"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx(
                motion.div,
                {
                  initial: { opacity: 0, y: 40 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 1, delay: 0.9, ease: [0.25, 0.1, 0.25, 1] },
                  className: "max-w-2xl",
                  children: /* @__PURE__ */ jsxs("p", { className: "font-body text-greek-villa/80 text-xl md:text-2xl leading-relaxed", children: [
                    "Created 300+ skilled tradesmen.",
                    /* @__PURE__ */ jsx("br", {}),
                    /* @__PURE__ */ jsx("span", { className: "text-goldenrod", children: "80% in-house capability." }),
                    /* @__PURE__ */ jsx("br", {}),
                    "One standard: excellence."
                  ] })
                }
              ),
              /* @__PURE__ */ jsx(
                motion.div,
                {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  transition: { duration: 1, delay: 1.4 },
                  className: "mt-20 md:mt-28 flex flex-wrap gap-8 md:gap-16",
                  children: [
                    { number: "25+", label: "Years of Legacy" },
                    { number: "300+", label: "Skilled Tradesmen" },
                    { number: "80%", label: "In-House Capability" }
                  ].map((item, i) => /* @__PURE__ */ jsxs(
                    motion.div,
                    {
                      initial: { opacity: 0, y: 20 },
                      animate: { opacity: 1, y: 0 },
                      transition: { duration: 0.8, delay: 1.6 + i * 0.15 },
                      className: "flex items-baseline gap-3",
                      children: [
                        /* @__PURE__ */ jsx("span", { className: "font-display text-goldenrod text-3xl md:text-4xl font-medium", children: item.number }),
                        /* @__PURE__ */ jsx("span", { className: "font-body text-greek-villa/50 text-sm tracking-wide", children: item.label })
                      ]
                    },
                    item.label
                  ))
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { duration: 1, delay: 2 },
            className: "absolute bottom-12 left-1/2 -translate-x-1/2",
            children: /* @__PURE__ */ jsx(
              motion.div,
              {
                animate: { y: [0, 12, 0] },
                transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
                className: "w-px h-16 bg-gradient-to-b from-greek-villa/60 to-transparent"
              }
            )
          }
        )
      ]
    }
  );
};
const pillars = [
  {
    number: "01",
    title: "Vertical Integration",
    headline: "Everything under one roof.",
    description: "While others outsource, we own every step. Design. Engineering. Construction. Interiors. When the same team carries your vision from first sketch to final walkthrough, nothing gets lost in translation.",
    stat: "80%",
    statLabel: "In-House Capability"
  },
  {
    number: "02",
    title: "Unrivaled Workforce",
    headline: "An army of masters.",
    description: "Over 300 skilled tradesmen—each an expert in their craft. This isn't a network of subcontractors. This is a dedicated force that builds together, thinks together, and executes with one singular standard.",
    stat: "300+",
    statLabel: "Skilled Tradesmen"
  },
  {
    number: "03",
    title: "Generational Experience",
    headline: "Twenty-five years of proof.",
    description: "Experience doesn't list on a brochure. It shows in the silence of a perfectly sealed home. In walls that breathe with the desert. In craftsmanship that our grandchildren will inherit. Twenty-five years of doing it right.",
    stat: "25+",
    statLabel: "Years of Excellence"
  }
];
const BrandPillars = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  return /* @__PURE__ */ jsxs("section", { ref: containerRef, className: "relative bg-greek-villa", children: [
    /* @__PURE__ */ jsx("div", { className: "py-24 md:py-32 border-b border-urbane-bronze/10", children: /* @__PURE__ */ jsx("div", { className: "max-w-[1400px] mx-auto px-6 md:px-12", children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 1 },
        viewport: { once: true },
        children: [
          /* @__PURE__ */ jsx("span", { className: "block font-body text-urbane-bronze/60 text-sm tracking-[0.3em] uppercase mb-6", children: "What Defines Us" }),
          /* @__PURE__ */ jsxs("h2", { className: "font-display text-tricorn-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.02em] leading-[1.05] max-w-4xl", children: [
            "The difference isn't in what we build.",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { className: "text-goldenrod", children: "It's in how we build." })
          ] })
        ]
      }
    ) }) }),
    pillars.map((pillar, index) => /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        transition: { duration: 0.8 },
        viewport: { once: true, margin: "-100px" },
        className: "border-b border-urbane-bronze/10 last:border-b-0",
        children: /* @__PURE__ */ jsx("div", { className: "max-w-[1400px] mx-auto px-6 md:px-12 py-20 md:py-32", children: /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-12 gap-8 md:gap-12 items-start", children: [
          /* @__PURE__ */ jsx("div", { className: "md:col-span-1", children: /* @__PURE__ */ jsx("span", { className: "font-display text-urbane-bronze/30 text-6xl md:text-7xl font-bold", children: pillar.number }) }),
          /* @__PURE__ */ jsxs("div", { className: "md:col-span-6", children: [
            /* @__PURE__ */ jsx(
              motion.span,
              {
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                transition: { duration: 0.6, delay: 0.1 },
                viewport: { once: true },
                className: "block font-body text-goldenrod text-sm tracking-[0.2em] uppercase mb-4",
                children: pillar.title
              }
            ),
            /* @__PURE__ */ jsx(
              motion.h3,
              {
                initial: { opacity: 0, y: 30 },
                whileInView: { opacity: 1, y: 0 },
                transition: { duration: 0.8, delay: 0.2 },
                viewport: { once: true },
                className: "font-display text-tricorn-black text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.02em] leading-[1.1] mb-8",
                children: pillar.headline
              }
            ),
            /* @__PURE__ */ jsx(
              motion.p,
              {
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                transition: { duration: 0.8, delay: 0.3 },
                viewport: { once: true },
                className: "font-body text-urbane-bronze/70 text-lg md:text-xl leading-relaxed",
                children: pillar.description
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "md:col-span-5 md:text-right", children: /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.9 },
              whileInView: { opacity: 1, scale: 1 },
              transition: { duration: 0.8, delay: 0.4 },
              viewport: { once: true },
              children: [
                /* @__PURE__ */ jsx("span", { className: "block font-display text-tricorn-black text-7xl sm:text-8xl md:text-9xl font-bold tracking-[-0.03em] leading-none", children: pillar.stat }),
                /* @__PURE__ */ jsx("span", { className: "block font-body text-urbane-bronze/50 text-sm tracking-[0.2em] uppercase mt-4", children: pillar.statLabel })
              ]
            }
          ) })
        ] }) })
      },
      pillar.number
    ))
  ] });
};
const capabilities = [
  "Architectural Design",
  "Structural Engineering",
  "General Construction",
  "Custom Millwork",
  "Electrical Systems",
  "Plumbing & Mechanical",
  "HVAC Engineering",
  "Interior Design",
  "Landscape Architecture",
  "Smart Home Integration",
  "Custom Stone & Tile",
  "Fine Finishing"
];
const CraftSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  return /* @__PURE__ */ jsxs(
    "section",
    {
      ref: containerRef,
      className: "relative bg-tricorn-black py-32 md:py-48 overflow-hidden",
      children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "absolute top-1/2 -translate-y-1/2 whitespace-nowrap",
            style: { x },
            children: /* @__PURE__ */ jsx("div", { className: "flex gap-8", children: [...capabilities, ...capabilities].map((cap, i) => /* @__PURE__ */ jsx(
              "span",
              {
                className: "font-display text-greek-villa/[0.03] text-[15vw] font-bold tracking-[-0.02em]",
                children: cap
              },
              i
            )) })
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "relative z-10 max-w-[1400px] mx-auto px-6 md:px-12", children: /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-16 md:gap-24 items-center", children: [
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 40 },
              whileInView: { opacity: 1, y: 0 },
              transition: { duration: 1 },
              viewport: { once: true },
              children: [
                /* @__PURE__ */ jsx("span", { className: "block font-body text-goldenrod text-sm tracking-[0.3em] uppercase mb-6", children: "Complete Mastery" }),
                /* @__PURE__ */ jsxs("h2", { className: "font-display text-greek-villa text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.02em] leading-[1.1] mb-8", children: [
                  "One company.",
                  /* @__PURE__ */ jsx("br", {}),
                  "Every discipline."
                ] }),
                /* @__PURE__ */ jsx("p", { className: "font-body text-greek-villa/60 text-lg leading-relaxed max-w-lg", children: "From the first line drawn to the final fixture placed, Lïef commands every aspect of creation. No handoffs. No compromises. No excuses." })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 40 },
              whileInView: { opacity: 1, y: 0 },
              transition: { duration: 1, delay: 0.2 },
              viewport: { once: true },
              className: "grid grid-cols-2 gap-4",
              children: capabilities.map((cap, i) => /* @__PURE__ */ jsx(
                motion.div,
                {
                  initial: { opacity: 0, y: 20 },
                  whileInView: { opacity: 1, y: 0 },
                  transition: { duration: 0.5, delay: i * 0.05 },
                  viewport: { once: true },
                  className: "group py-4 border-b border-greek-villa/10",
                  children: /* @__PURE__ */ jsx("span", { className: "font-body text-greek-villa/70 text-sm tracking-wide group-hover:text-goldenrod transition-colors duration-300", children: cap })
                },
                cap
              ))
            }
          )
        ] }) })
      ]
    }
  );
};
const features = [
  {
    icon: Flame,
    title: "Anti-Fire",
    description: "Non-combustible concrete shell—the ultimate desert safety standard."
  },
  {
    icon: Droplets,
    title: "Anti-Mold & Moisture",
    description: "100% impermeable to Arizona's extreme monsoon elements."
  },
  {
    icon: Bug,
    title: "Anti-Termite",
    description: "Zero wood framing means zero risk from structural pests."
  },
  {
    icon: Thermometer,
    title: "Thermal Performance",
    description: "Massive HVAC overhead reduction through high-density insulation."
  }
];
const stats$1 = [
  {
    icon: DollarSign,
    value: "$13",
    unit: "/sq ft",
    label: "Average Savings",
    detail: "Average residential construction costs"
  },
  {
    icon: Clock,
    value: "14",
    unit: "%",
    label: "Timeline Reduction",
    detail: "Average reduction across build types"
  },
  {
    icon: TrendingUp,
    value: "+50",
    unit: "%",
    label: "Energy Efficiency",
    detail: "R-75 to R-100 insulation cuts HVAC costs by half compared to conventional construction"
  },
  {
    icon: BadgeCheck,
    value: "100",
    unit: "+",
    label: "SABS Projects Delivered",
    detail: "SABS Technology has delivered 100+ projects in multiple climates and regions"
  }
];
const ExcellenceSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  useTransform(scrollYProgress, [0, 1], [0, -80]);
  return /* @__PURE__ */ jsxs(
    "section",
    {
      ref: containerRef,
      className: "relative bg-tricorn-black text-greek-villa py-32 md:py-48 overflow-hidden",
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-[80%] max-w-[600px] h-px bg-gradient-to-r from-transparent via-greek-villa/20 to-transparent" }),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-[1400px] mx-auto px-6 md:px-12", children: [
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 40 },
              whileInView: { opacity: 1, y: 0 },
              transition: { duration: 1 },
              viewport: { once: true },
              className: "mb-20",
              children: [
                /* @__PURE__ */ jsx("span", { className: "block font-body text-goldenrod text-sm tracking-[0.3em] uppercase mb-6", children: "Built to Last" }),
                /* @__PURE__ */ jsxs("h2", { className: "font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.02em] leading-[1.1] mb-8", children: [
                  "Arizona's #1 builder.",
                  /* @__PURE__ */ jsx("br", {}),
                  /* @__PURE__ */ jsx("span", { className: "text-goldenrod", children: "Lïef Blocks certified." })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "font-body text-greek-villa/70 text-lg leading-relaxed max-w-2xl", children: "Our partnership with Xtrata's revolutionary Lïef Blocks with SABS Technology isn't just a certification—it's validation. We don't just meet building codes. We exceed them by generations." })
              ]
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8", children: features.map((feature, index) => /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 30 },
              whileInView: { opacity: 1, y: 0 },
              transition: { duration: 0.6, delay: index * 0.1 },
              viewport: { once: true },
              className: "group border border-greek-villa/20 p-6 md:p-8 transition-all duration-300 hover:border-goldenrod/40 hover:bg-greek-villa/[0.02]",
              children: [
                /* @__PURE__ */ jsx("div", { className: "w-12 h-12 flex items-center justify-center bg-greek-villa/10 mb-6 transition-all duration-300 group-hover:bg-goldenrod/20 group-hover:scale-110", children: /* @__PURE__ */ jsx(feature.icon, { className: "w-6 h-6 text-goldenrod transition-transform duration-300 group-hover:scale-110" }) }),
                /* @__PURE__ */ jsx("h3", { className: "font-display text-goldenrod text-lg font-bold mb-3 transition-colors duration-300 group-hover:text-goldenrod", children: feature.title }),
                /* @__PURE__ */ jsx("p", { className: "font-body text-greek-villa/60 text-sm leading-relaxed transition-colors duration-300 group-hover:text-greek-villa/80", children: feature.description })
              ]
            },
            feature.title
          )) }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16", children: stats$1.map((stat, index) => /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 30 },
              whileInView: { opacity: 1, y: 0 },
              transition: { duration: 0.6, delay: index * 0.1 + 0.2 },
              viewport: { once: true },
              className: "group border border-greek-villa/20 p-6 md:p-8 transition-all duration-300 hover:border-goldenrod/40 hover:bg-greek-villa/[0.02]",
              children: [
                /* @__PURE__ */ jsx("div", { className: "w-12 h-12 flex items-center justify-center bg-greek-villa/10 mb-6 transition-all duration-300 group-hover:bg-goldenrod/20 group-hover:scale-110", children: /* @__PURE__ */ jsx(stat.icon, { className: "w-6 h-6 text-goldenrod transition-transform duration-300 group-hover:scale-110" }) }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-1 mb-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "font-display text-greek-villa text-4xl md:text-5xl font-bold transition-colors duration-300 group-hover:text-goldenrod", children: stat.value }),
                  /* @__PURE__ */ jsx("span", { className: "font-body text-greek-villa/50 text-lg transition-colors duration-300 group-hover:text-goldenrod/70", children: stat.unit })
                ] }),
                /* @__PURE__ */ jsx("h3", { className: "font-display text-greek-villa text-base font-bold mb-2 transition-colors duration-300 group-hover:text-greek-villa", children: stat.label }),
                /* @__PURE__ */ jsx("p", { className: "font-body text-greek-villa/50 text-sm leading-relaxed transition-colors duration-300 group-hover:text-greek-villa/70", children: stat.detail })
              ]
            },
            stat.label
          )) }),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              transition: { duration: 0.8 },
              viewport: { once: true },
              className: "text-center border-t border-greek-villa/10 pt-12",
              children: [
                /* @__PURE__ */ jsxs("p", { className: "font-body text-lg md:text-xl leading-relaxed mb-4", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-goldenrod font-medium", children: "Structural Superiority:" }),
                  " ",
                  "Anti-Fire, Anti-Mold, and Anti-Termite protection are standard."
                ] }),
                /* @__PURE__ */ jsx("p", { className: "font-body text-greek-villa/50 text-base leading-relaxed max-w-3xl mx-auto", children: "Lïef Blocks with SABS Technology radically reduces the number of trades required on-site, allowing for total schedule control and unprecedented quality consistency." })
              ]
            }
          )
        ] })
      ]
    }
  );
};
const liefOsbornImage = "/assets/lief-osborn-DG3mv38u.jpg";
const FeaturedProject = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.15, 1]);
  return /* @__PURE__ */ jsxs("section", { ref: containerRef, className: "relative bg-tricorn-black", children: [
    /* @__PURE__ */ jsx("div", { className: "py-20 md:py-28 border-b border-greek-villa/10", children: /* @__PURE__ */ jsx("div", { className: "max-w-[1400px] mx-auto px-6 md:px-12", children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.8 },
        viewport: { once: true },
        className: "flex flex-col md:flex-row md:items-end md:justify-between gap-8",
        children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { className: "block font-body text-goldenrod text-sm tracking-[0.3em] uppercase mb-4", children: "The Work" }),
            /* @__PURE__ */ jsx("h2", { className: "font-display text-greek-villa text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.02em] leading-[1.1]", children: "Where vision becomes reality." })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "font-body text-greek-villa/50 text-base max-w-md leading-relaxed", children: "Each project is a testament to what's possible when experience, craftsmanship, and uncompromising standards converge." })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxs("div", { className: "relative h-[80vh] overflow-hidden", children: [
      /* @__PURE__ */ jsxs(motion.div, { className: "absolute inset-0", style: { scale: imageScale }, children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: liefOsbornImage,
            alt: "Lïef Osborn by Lïef Development",
            className: "w-full h-full object-cover"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-tricorn-black via-tricorn-black/10 to-transparent" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 right-0 p-8 md:p-16", children: /* @__PURE__ */ jsx("div", { className: "max-w-[1400px] mx-auto", children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 40 },
          whileInView: { opacity: 1, y: 0 },
          transition: { duration: 1 },
          viewport: { once: true },
          className: "flex flex-col md:flex-row md:items-end justify-between gap-8",
          children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-4 mb-4", children: [
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: logoLight,
                    alt: "Lïef",
                    className: "h-16 sm:h-20 md:h-24 w-auto"
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "font-display text-greek-villa text-5xl sm:text-6xl md:text-7xl font-bold tracking-[-0.02em]", children: "Osborn" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "font-body text-greek-villa/60 text-lg max-w-lg", children: "40,000 square feet of architectural precision. Midtown Phoenix." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-greek-villa/40", children: [
              /* @__PURE__ */ jsx("span", { className: "font-body text-sm tracking-wider", children: "2026" }),
              /* @__PURE__ */ jsx("span", { children: "•" }),
              /* @__PURE__ */ jsx("span", { className: "font-body text-sm tracking-wider", children: "Phoenix, AZ" })
            ] })
          ]
        }
      ) }) })
    ] }),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        transition: { duration: 0.8 },
        viewport: { once: true },
        className: "py-12 border-t border-greek-villa/10",
        children: /* @__PURE__ */ jsx("div", { className: "max-w-[1400px] mx-auto px-6 md:px-12", children: /* @__PURE__ */ jsxs(
          Link,
          {
            to: "/projects",
            className: "group inline-flex items-center gap-4 font-body text-greek-villa text-lg tracking-wide hover:text-goldenrod transition-colors duration-500",
            children: [
              /* @__PURE__ */ jsx("span", { children: "View all projects" }),
              /* @__PURE__ */ jsx(
                ArrowRight,
                {
                  size: 20,
                  className: "transform group-hover:translate-x-2 transition-transform duration-300"
                }
              )
            ]
          }
        ) })
      }
    )
  ] });
};
const ContactSection = () => {
  return /* @__PURE__ */ jsx("section", { id: "contact", className: "relative bg-greek-villa py-32 md:py-48", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1200px] mx-auto px-6 text-center", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 1 },
        viewport: { once: true },
        className: "mb-16",
        children: [
          /* @__PURE__ */ jsxs("h2", { className: "font-display text-tricorn-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.02em] leading-[1.1] mb-8", children: [
            "Ready to begin",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { className: "italic font-normal", children: "your legacy?" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "font-body text-urbane-bronze/70 text-lg md:text-xl max-w-xl mx-auto", children: "Every exceptional home starts with a conversation." })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.8, delay: 0.3 },
        viewport: { once: true },
        children: /* @__PURE__ */ jsxs(
          "a",
          {
            href: "mailto:hello@liefdev.com",
            className: "group inline-flex items-center gap-4 px-10 py-5 bg-tricorn-black text-greek-villa font-body text-lg tracking-wide hover:bg-urbane-bronze transition-colors duration-500",
            children: [
              /* @__PURE__ */ jsx("span", { children: "Start a conversation" }),
              /* @__PURE__ */ jsx(
                ArrowRight,
                {
                  size: 20,
                  className: "transform group-hover:translate-x-2 transition-transform duration-300"
                }
              )
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        transition: { duration: 1, delay: 0.6 },
        viewport: { once: true },
        className: "mt-20 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsx("span", { className: "block font-body text-urbane-bronze/40 text-xs tracking-[0.2em] uppercase mb-2", children: "Location" }),
            /* @__PURE__ */ jsx("span", { className: "font-body text-tricorn-black text-sm", children: "Phoenix, Arizona" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "hidden sm:block w-px h-8 bg-urbane-bronze/20" }),
          /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsx("span", { className: "block font-body text-urbane-bronze/40 text-xs tracking-[0.2em] uppercase mb-2", children: "Email" }),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "mailto:hello@liefdev.com",
                className: "font-body text-tricorn-black text-sm hover:text-primary transition-colors",
                children: "hello@liefdev.com"
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "hidden sm:block w-px h-8 bg-urbane-bronze/20" }),
          /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsx("span", { className: "block font-body text-urbane-bronze/40 text-xs tracking-[0.2em] uppercase mb-2", children: "Phone" }),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "tel:+18057227598",
                className: "font-body text-tricorn-black text-sm hover:text-primary transition-colors",
                children: "(805) 722-7598"
              }
            )
          ] })
        ]
      }
    )
  ] }) });
};
const Footer = () => {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  return /* @__PURE__ */ jsx("footer", { className: "bg-tricorn-black text-greek-villa py-16", children: /* @__PURE__ */ jsx("div", { className: "max-w-[1400px] mx-auto px-6 md:px-12", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center gap-8", children: [
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        transition: { duration: 0.8 },
        viewport: { once: true },
        children: /* @__PURE__ */ jsx(
          "img",
          {
            src: logoLight,
            alt: "Lïef",
            className: "h-6 md:h-8 w-auto"
          }
        )
      }
    ),
    /* @__PURE__ */ jsxs(
      motion.p,
      {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        transition: { duration: 0.8, delay: 0.2 },
        viewport: { once: true },
        className: "font-body text-greek-villa/40 text-sm",
        children: [
          "© ",
          currentYear,
          " Lïef Development. Crafting legacies in Arizona."
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      motion.p,
      {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        transition: { duration: 0.8, delay: 0.3 },
        viewport: { once: true },
        className: "font-body text-greek-villa/40 text-sm",
        children: [
          "Branded by",
          " ",
          /* @__PURE__ */ jsx("a", { href: "https://liploicreative.com", target: "_blank", rel: "noopener noreferrer", className: "hover:opacity-80 transition-opacity", style: { color: "#D4A843" }, children: "Lip Loi Creative" }),
          " ",
          "|",
          " ",
          "Enhanced by",
          " ",
          /* @__PURE__ */ jsx("a", { href: "https://commonground.ventures", target: "_blank", rel: "noopener noreferrer", className: "hover:opacity-80 transition-opacity", style: { color: "#8B5CF6" }, children: "Common Ground" })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        transition: { duration: 0.8, delay: 0.4 },
        viewport: { once: true },
        className: "flex items-center gap-8",
        children: [
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "#",
              className: "font-body text-greek-villa/40 text-sm hover:text-greek-villa transition-colors duration-300",
              children: "Instagram"
            }
          ),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "#",
              className: "font-body text-greek-villa/40 text-sm hover:text-greek-villa transition-colors duration-300",
              children: "LinkedIn"
            }
          )
        ]
      }
    )
  ] }) }) });
};
const Index = () => {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen overflow-x-hidden", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx(Hero, {}),
      /* @__PURE__ */ jsx(BrandPillars, {}),
      /* @__PURE__ */ jsx(CraftSection, {}),
      /* @__PURE__ */ jsx(ExcellenceSection, {}),
      /* @__PURE__ */ jsx(FeaturedProject, {}),
      /* @__PURE__ */ jsx(ContactSection, {})
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
const FounderStory = () => {
  return /* @__PURE__ */ jsx("section", { className: "relative bg-greek-villa py-32 md:py-48", children: /* @__PURE__ */ jsx("div", { className: "max-w-[1400px] mx-auto px-6 md:px-12", children: /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-16 md:gap-24 items-start", children: [
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, x: -40 },
        whileInView: { opacity: 1, x: 0 },
        transition: { duration: 1 },
        viewport: { once: true },
        className: "relative",
        children: /* @__PURE__ */ jsxs("div", { className: "aspect-[4/5] bg-urbane-bronze/10 relative overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "font-body text-urbane-bronze/30 text-sm tracking-widest uppercase", children: "Founder Portrait" }) }),
          /* @__PURE__ */ jsx("div", { className: "absolute -bottom-6 -right-6 w-32 h-32 border-2 border-goldenrod/30" })
        ] })
      }
    ),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 1, delay: 0.2 },
        viewport: { once: true },
        className: "md:pt-12",
        children: [
          /* @__PURE__ */ jsx("span", { className: "block font-body text-goldenrod text-sm tracking-[0.3em] uppercase mb-6", children: "The Founder" }),
          /* @__PURE__ */ jsxs("h2", { className: "font-display text-tricorn-black text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.02em] leading-[1.05] mb-8", children: [
            "A legacy built",
            /* @__PURE__ */ jsx("br", {}),
            "by hand."
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6 font-body text-urbane-bronze/80 text-lg leading-relaxed", children: [
            /* @__PURE__ */ jsx("p", { children: "In 1993, with nothing but a worn toolbelt and an unshakeable vision, our founder set out to redefine what luxury home building could mean in the Arizona desert." }),
            /* @__PURE__ */ jsx("p", { children: "Where others saw limitations, he saw opportunity. Where the industry chose shortcuts, he chose the longer path—the one that led to homes that would outlast their builders." }),
            /* @__PURE__ */ jsx("p", { children: "That founding philosophy remains unchanged: every nail driven, every joint fitted, every finish applied carries the same uncompromising standard that built our first home." }),
            /* @__PURE__ */ jsx("p", { className: "text-tricorn-black font-medium", children: "Three decades later, Lïef stands as proof that conviction, when paired with craft, creates something that endures." })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-12 pt-8 border-t border-urbane-bronze/20", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6", children: [
            /* @__PURE__ */ jsx("div", { className: "w-16 h-px bg-goldenrod" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-display text-tricorn-black text-xl italic", children: '"Excellence is not negotiable."' }),
              /* @__PURE__ */ jsx("p", { className: "font-body text-urbane-bronze/60 text-sm mt-2", children: "— Founder & CEO" })
            ] })
          ] }) })
        ]
      }
    )
  ] }) }) });
};
const milestones = [
  {
    year: "1993",
    title: "The Beginning",
    description: "Founded with a commitment to building homes that honor both craft and client. Our first project—a modest Paradise Valley residence—established the Lïef standard."
  },
  {
    year: "2001",
    title: "Vertical Integration",
    description: "Made the pivotal decision to bring all trades in-house. What seemed unconventional became our greatest competitive advantage—complete quality control from foundation to finish."
  },
  {
    year: "2008",
    title: "Through the Storm",
    description: "While the industry contracted, we invested in our team. Not a single craftsman was let go. This loyalty forged the unbreakable workforce that defines us today."
  },
  {
    year: "2015",
    title: "300+ Tradesmen Strong",
    description: "Reached a milestone that validated our model: over 300 specialized tradespeople under one roof, each a master of their discipline."
  },
  {
    year: "2020",
    title: "Lïef Blocks Certification",
    description: "Became Arizona's first and only builder certified in Lïef Blocks with SABS Technology—homes engineered to endure for 300 years."
  },
  {
    year: "2024",
    title: "Arizona's #1",
    description: "Recognized as Arizona's premier luxury home builder. Three decades of conviction, craft, and uncompromising standards brought to this moment."
  }
];
const Timeline = () => {
  return /* @__PURE__ */ jsxs("section", { className: "relative bg-tricorn-black py-32 md:py-48 overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.02]", children: /* @__PURE__ */ jsx("span", { className: "font-display text-greek-villa text-[40vw] font-bold", children: "30" }) }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-[1400px] mx-auto px-6 md:px-12", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 40 },
          whileInView: { opacity: 1, y: 0 },
          transition: { duration: 1 },
          viewport: { once: true },
          className: "mb-20 md:mb-32",
          children: [
            /* @__PURE__ */ jsx("span", { className: "block font-body text-goldenrod text-sm tracking-[0.3em] uppercase mb-6", children: "Our Journey" }),
            /* @__PURE__ */ jsxs("h2", { className: "font-display text-greek-villa text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.02em] leading-[1.05]", children: [
              "Three decades of",
              /* @__PURE__ */ jsx("br", {}),
              "building excellence."
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-greek-villa/10 md:-translate-x-1/2" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-16 md:space-y-24", children: milestones.map((milestone, index) => /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 40 },
            whileInView: { opacity: 1, y: 0 },
            transition: { duration: 0.8, delay: index * 0.1 },
            viewport: { once: true, margin: "-100px" },
            className: `relative grid md:grid-cols-2 gap-8 md:gap-16 ${index % 2 === 0 ? "" : "md:direction-rtl"}`,
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: `absolute left-0 md:left-1/2 top-0 w-4 h-4 rounded-full bg-goldenrod md:-translate-x-1/2 -translate-x-1/2`
                }
              ),
              /* @__PURE__ */ jsxs(
                "div",
                {
                  className: `pl-8 md:pl-0 ${index % 2 === 0 ? "md:pr-16 md:text-right" : "md:col-start-2 md:pl-16 md:text-left"}`,
                  style: { direction: "ltr" },
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "block font-display text-goldenrod text-5xl md:text-6xl font-bold mb-4", children: milestone.year }),
                    /* @__PURE__ */ jsx("h3", { className: "font-display text-greek-villa text-2xl md:text-3xl font-bold mb-4", children: milestone.title }),
                    /* @__PURE__ */ jsx("p", { className: "font-body text-greek-villa/60 text-base md:text-lg leading-relaxed", children: milestone.description })
                  ]
                }
              )
            ]
          },
          milestone.year
        )) })
      ] })
    ] })
  ] });
};
const jesseFowler = "/assets/jesse-BvmC-zU5.png";
const jimmyKhounlavong = "/assets/jimmy-CZHHyNsx.png";
const jonArmstrong = "/assets/jon-DO9kS6Xt.png";
const scottMeiers = "/assets/scott-CvJLIS_C.png";
const leaders = [
  {
    name: "Jesse Fowler",
    role: "Principal / Manager",
    experience: "25+ Years in Design, Build Development",
    image: jesseFowler,
    imagePosition: "object-[center_15%]",
    description: "The visionary. Jesse brings over two decades of design-build expertise to Arizona, fusing development strategy with hands-on construction knowledge to deliver luxury homes that exceed expectations."
  },
  {
    name: "Jimmy Khounlavong",
    role: "Principal / Creative Director",
    experience: "25+ Years of Brand, Product & Marketplace Strategy",
    image: jimmyKhounlavong,
    imagePosition: "object-[center_15%]",
    description: "The creative compass. Jimmy transforms brand vision into compelling client experiences, leveraging decades of merchandising expertise to position every project for lasting impact."
  },
  {
    name: "Jon Armstrong",
    role: "Principal / Manager",
    experience: "15+ Years in Custom Residential & Commercial Building",
    image: jonArmstrong,
    imagePosition: "object-[center_10%] scale-[1.25] origin-top",
    description: "The master builder. As owner of Armstrong Construction Group, Jon commands 300+ specialized trades to deliver uncompromising craftsmanship from foundation to finish."
  },
  {
    name: "Scott Meiers",
    role: "Chief Architectural Design",
    experience: "40+ Years of Architectural Design in Residential & Commercial",
    image: scottMeiers,
    imagePosition: "object-top scale-[1.48] origin-top",
    description: "The artistic soul. With four decades spanning residential and commercial design, Scott brings a rare cross-industry perspective that elevates every home into a work of art."
  }
];
const LeadershipTeam = () => {
  return /* @__PURE__ */ jsx("section", { className: "relative bg-greek-villa py-32 md:py-48", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1400px] mx-auto px-6 md:px-12", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 1 },
        viewport: { once: true },
        className: "mb-20 md:mb-28",
        children: [
          /* @__PURE__ */ jsx("span", { className: "block font-body text-goldenrod text-sm tracking-[0.3em] uppercase mb-6", children: "Leadership" }),
          /* @__PURE__ */ jsxs("h2", { className: "font-display text-tricorn-black text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.02em] leading-[1.05] max-w-3xl", children: [
            "The architects of",
            /* @__PURE__ */ jsx("br", {}),
            "excellence."
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-8 md:gap-12", children: leaders.map((leader, index) => /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.8, delay: index * 0.1 },
        viewport: { once: true },
        className: "group",
        children: /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden", children: [
          /* @__PURE__ */ jsxs("div", { className: "aspect-[4/3] bg-urbane-bronze/10 relative overflow-hidden mb-6", children: [
            leader.image ? /* @__PURE__ */ jsx(
              "img",
              {
                src: leader.image,
                alt: leader.name,
                className: `absolute inset-0 w-full h-full object-cover ${leader.imagePosition || "object-top"}`
              }
            ) : /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "font-body text-urbane-bronze/30 text-sm tracking-widest uppercase", children: "Portrait" }) }),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-goldenrod/0 group-hover:bg-goldenrod/10 transition-colors duration-500" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-display text-tricorn-black text-2xl md:text-3xl font-bold mb-2", children: leader.name }),
            /* @__PURE__ */ jsx("span", { className: "block font-body text-goldenrod text-sm tracking-[0.15em] uppercase mb-3", children: leader.role }),
            leader.experience && /* @__PURE__ */ jsx("span", { className: "block font-body text-urbane-bronze/80 text-sm mb-4", children: leader.experience }),
            /* @__PURE__ */ jsx("p", { className: "font-body text-urbane-bronze/70 text-base leading-relaxed", children: leader.description })
          ] })
        ] })
      },
      leader.role
    )) }),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 1 },
        viewport: { once: true },
        className: "mt-24 md:mt-32 pt-16 border-t border-urbane-bronze/20",
        children: /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8 md:gap-16 items-center", children: [
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("h3", { className: "font-display text-tricorn-black text-3xl md:text-4xl font-bold tracking-[-0.02em] leading-[1.1]", children: [
            "300+ craftsmen.",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { className: "text-urbane-bronze", children: "One standard." })
          ] }) }),
          /* @__PURE__ */ jsx("p", { className: "font-body text-urbane-bronze/70 text-lg leading-relaxed", children: "Behind our leadership stands an army of masters—over 300 specialized tradespeople who bring decades of expertise to every project. This isn't a network of subcontractors. This is a family that builds together." })
        ] })
      }
    )
  ] }) });
};
const AboutHero = () => {
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-[70vh] flex items-center justify-center bg-succulent-green overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-10", children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-goldenrod/30 via-transparent to-transparent" }) }),
    /* @__PURE__ */ jsx("div", { className: "relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 py-32 md:py-40", children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 40 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 1, delay: 0.3 },
        children: [
          /* @__PURE__ */ jsx("span", { className: "block font-body text-goldenrod text-sm tracking-[0.4em] uppercase mb-6", children: "Our Story" }),
          /* @__PURE__ */ jsxs("h1", { className: "font-display text-greek-villa text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[-0.02em] leading-[0.95] mb-8", children: [
            "Built on",
            /* @__PURE__ */ jsx("br", {}),
            "conviction."
          ] }),
          /* @__PURE__ */ jsx("p", { className: "font-body text-greek-villa/70 text-xl md:text-2xl max-w-2xl leading-relaxed", children: "For over three decades, Lïef has been Arizona's benchmark for uncompromising craftsmanship and visionary home building." })
        ]
      }
    ) })
  ] });
};
const About = () => {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen overflow-x-hidden", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx(AboutHero, {}),
      /* @__PURE__ */ jsx(FounderStory, {}),
      /* @__PURE__ */ jsx(Timeline, {}),
      /* @__PURE__ */ jsx(LeadershipTeam, {})
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
const NotFound = () => {
  const location = useLocation();
  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-muted", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "mb-4 text-4xl font-bold", children: "404" }),
    /* @__PURE__ */ jsx("p", { className: "mb-4 text-xl text-muted-foreground", children: "Oops! Page not found" }),
    /* @__PURE__ */ jsx("a", { href: "/", className: "text-primary underline hover:text-primary/90", children: "Return to Home" })
  ] }) });
};
const logoConcrete = "/assets/logo-concrete-BJwcKtx7.png";
const ContactModalContext = createContext({
  isOpen: false,
  openModal: () => {
  },
  closeModal: () => {
  }
});
const useContactModal = () => useContext(ContactModalContext);
const ContactModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return /* @__PURE__ */ jsx(
    ContactModalContext.Provider,
    {
      value: {
        isOpen,
        openModal: () => setIsOpen(true),
        closeModal: () => setIsOpen(false)
      },
      children
    }
  );
};
const navLinks = [
  { href: "/", label: "Home", type: "route" },
  { href: "#model", label: "The Model", type: "scroll" },
  { href: "/ai", label: "AI", type: "route" },
  { href: "/projects", label: "Projects", type: "route" },
  { href: "/sabs", label: "LÏEF X SABS", type: "route" },
  { href: "/team", label: "Team", type: "route" },
  { href: "/testimonials", label: "Testimonials", type: "route" }
];
const V2Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [hoveredLink, setHoveredLink] = useState(null);
  const [contactHovered, setContactHovered] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { openModal } = useContactModal();
  const handleContact = () => {
    setMobileOpen(false);
    openModal();
  };
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection("");
      return;
    }
    const sectionIds = navLinks.filter((l) => l.type === "scroll").map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.05, rootMargin: "-80px 0px -60% 0px" }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [location.pathname]);
  const isLinkActive = (link) => {
    if (link.type === "route") {
      if (link.href === "/" && location.pathname === "/") {
        return !activeSection;
      }
      return location.pathname === link.href;
    }
    return location.pathname === "/" && activeSection === link.href;
  };
  const handleNav = (link) => {
    setMobileOpen(false);
    if (link.type === "route") {
      navigate(link.href);
      window.scrollTo({ top: 0 });
    } else {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          const el = document.querySelector(link.href);
          el == null ? void 0 : el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        const el = document.querySelector(link.href);
        el == null ? void 0 : el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  const handleLogo = () => {
    if (location.pathname !== "/") {
      navigate("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  return /* @__PURE__ */ jsxs(
    motion.header,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 1, delay: 0.3 },
      className: "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
      style: {
        background: scrolled ? "rgba(10,10,10,.95)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,255,136,.06)" : "1px solid transparent"
      },
      children: [
        /* @__PURE__ */ jsxs("div", { className: "max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "flex items-center transition-all duration-500",
                onClick: handleLogo,
                style: { opacity: scrolled ? 1 : 0, transform: scrolled ? "translateY(0)" : "translateY(8px)", pointerEvents: scrolled ? "auto" : "none" },
                children: /* @__PURE__ */ jsx("img", { src: logoConcrete, alt: "Lïef", className: "h-6 md:h-7 w-auto block" })
              }
            ),
            /* @__PURE__ */ jsxs(
              "span",
              {
                className: "v2-headline hidden lg:flex items-center transition-all duration-500",
                style: {
                  fontSize: "clamp(0.85rem, 1.5vw, 1.1rem)",
                  color: "var(--v2-neon)",
                  lineHeight: 1,
                  letterSpacing: "0.02em",
                  height: "28px",
                  opacity: scrolled ? 1 : 0,
                  transform: scrolled ? "translateY(0)" : "translateY(8px)"
                },
                children: [
                  "BUILT",
                  /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "." }),
                  " DIFFERENT",
                  /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "." })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("nav", { className: "hidden lg:flex items-center gap-7", children: [
            navLinks.map((l) => {
              const active = isLinkActive(l);
              const hovered = hoveredLink === l.href;
              return /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => handleNav(l),
                  onMouseEnter: () => setHoveredLink(l.href),
                  onMouseLeave: () => setHoveredLink(null),
                  className: "transition-all duration-300",
                  style: {
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.85rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    color: active || hovered ? "#00FF88" : scrolled ? "#F5F5F3" : "#777",
                    background: "none",
                    border: "none",
                    cursor: "pointer"
                  },
                  children: l.label
                },
                l.href
              );
            }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: handleContact,
                onMouseEnter: () => setContactHovered(true),
                onMouseLeave: () => setContactHovered(false),
                className: "transition-all duration-300",
                style: {
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.85rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  color: contactHovered ? "#0a0a0a" : "#00FF88",
                  border: "1px solid #00FF88",
                  padding: "8px 20px",
                  cursor: "pointer",
                  background: contactHovered ? "#00FF88" : "transparent"
                },
                children: "Contact"
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setMobileOpen(!mobileOpen),
              className: "lg:hidden",
              style: { color: "#F5F5F3" },
              children: mobileOpen ? /* @__PURE__ */ jsx(X, { size: 24 }) : /* @__PURE__ */ jsx(Menu, { size: 24 })
            }
          )
        ] }),
        /* @__PURE__ */ jsx(AnimatePresence, { children: mobileOpen && /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, height: 0 },
            animate: { opacity: 1, height: "auto" },
            exit: { opacity: 0, height: 0 },
            className: "lg:hidden",
            style: { background: "rgba(10,10,10,.98)", borderTop: "1px solid rgba(0,255,136,.06)" },
            children: /* @__PURE__ */ jsxs("nav", { className: "px-6 py-8 flex flex-col gap-6", children: [
              navLinks.map((l) => /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => handleNav(l),
                  style: {
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "1rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.16em",
                    color: isLinkActive(l) ? "#00FF88" : "#F5F5F3",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left"
                  },
                  children: l.label
                },
                l.href
              )),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: handleContact,
                  style: {
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "1rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.16em",
                    color: "#00FF88",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left"
                  },
                  children: "Contact"
                }
              )
            ] })
          }
        ) })
      ]
    }
  );
};
const stagger = (i) => ({ delay: 0.3 + i * 0.15 });
const V2Hero = () => {
  const { openModal } = useContactModal();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const heroLogoOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroLogoScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.4]);
  const heroLogoY = useTransform(scrollYProgress, [0, 0.15], [0, -60]);
  const [showScroll, setShowScroll] = useState(true);
  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY < 200);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return /* @__PURE__ */ jsxs("section", { ref, className: "relative h-screen flex items-center overflow-x-hidden", style: { background: "var(--v2-deep)" }, children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 pointer-events-none", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-[60%] h-[60%]", style: { background: "radial-gradient(ellipse at top right, rgba(0,107,63,.12), transparent 70%)" } }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-[50%] h-[50%]", style: { background: "radial-gradient(ellipse at bottom left, rgba(0,255,136,.04), transparent 70%)" } })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full", children: [
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.75, ...stagger(0), ease: [0.16, 1, 0.3, 1] },
          style: { opacity: heroLogoOpacity, scale: heroLogoScale, y: heroLogoY, transformOrigin: "left center", willChange: "transform, opacity" },
          className: "mb-3 md:mb-4",
          children: /* @__PURE__ */ jsx("img", { src: logoLight, alt: "Lïef", className: "h-14 md:h-24 lg:h-32 w-auto" })
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.75, ...stagger(1), ease: [0.16, 1, 0.3, 1] },
          className: "mb-3 md:mb-4",
          children: [
            /* @__PURE__ */ jsx("span", { className: "v2-label hidden md:inline text-[1.25rem]", children: "Development + Construction · Phoenix, AZ" }),
            /* @__PURE__ */ jsxs(
              "span",
              {
                className: "md:hidden",
                style: { fontSize: "1rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--v2-neon)" },
                children: [
                  /* @__PURE__ */ jsx("span", { className: "inline-block w-4 h-px mr-2 align-middle", style: { background: "var(--v2-neon)" } }),
                  "Development + Construction · Phoenix, AZ"
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.h1,
        {
          initial: { opacity: 0, y: 35 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.75, ...stagger(1), ease: [0.16, 1, 0.3, 1] },
          className: "v2-headline leading-[0.95] mb-3 md:mb-4",
          style: { fontSize: "clamp(2.2rem, 5.5vw, 5rem)" },
          children: [
            "BUILT",
            /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "." }),
            /* @__PURE__ */ jsx("br", {}),
            "DIFFERENT",
            /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "." })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.p,
        {
          initial: { opacity: 0, y: 35 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.75, ...stagger(2), ease: [0.16, 1, 0.3, 1] },
          style: { fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1.1rem, 3vw, 1.4rem)", color: "var(--v2-muted)", lineHeight: 1.5 },
          children: [
            /* @__PURE__ */ jsx("span", { className: "hidden md:inline", children: "We draw it. We build it. We own it." }),
            /* @__PURE__ */ jsx("span", { className: "md:hidden", children: "We draw it. We build it. We own it." })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.p,
        {
          initial: { opacity: 0, y: 35 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.75, ...stagger(3), ease: [0.16, 1, 0.3, 1] },
          className: "mt-2 md:mt-2 max-w-[420px] hidden md:block",
          style: { fontSize: "1.1rem", color: "var(--v2-dim)", lineHeight: 1.6 },
          children: [
            "Development + Construction Consolidated.",
            /* @__PURE__ */ jsx("br", { className: "hidden sm:inline" }),
            "300+ Skilled Tradesmen.",
            /* @__PURE__ */ jsx("br", { className: "hidden sm:inline" }),
            "One Team, No Gaps."
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 35 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.75, ...stagger(4), ease: [0.16, 1, 0.3, 1] },
          className: "mt-4 md:mt-6 flex flex-wrap gap-3 md:gap-4",
          children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => {
                  var _a;
                  return (_a = document.querySelector("#communities")) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
                },
                className: "transition-all duration-300 hover:brightness-110",
                style: {
                  fontFamily: "var(--v2-font-body)",
                  fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  fontWeight: 600,
                  background: "var(--v2-neon)",
                  color: "var(--v2-deep)",
                  border: "none",
                  padding: "10px 24px",
                  cursor: "pointer"
                },
                children: "View Projects"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: openModal,
                className: "transition-all duration-300 hover:bg-[#00FF88] hover:text-[#0a0a0a]",
                style: {
                  fontFamily: "var(--v2-font-body)",
                  fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  fontWeight: 600,
                  background: "transparent",
                  color: "var(--v2-neon)",
                  border: "1px solid var(--v2-neon)",
                  padding: "10px 24px",
                  cursor: "pointer"
                },
                children: "Partner With Us"
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        animate: { opacity: showScroll ? 1 : 0 },
        transition: { duration: 0.5 },
        className: "absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2",
        children: [
          /* @__PURE__ */ jsx("span", { style: { fontSize: "1.25rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--v2-muted)" }, children: "Scroll" }),
          /* @__PURE__ */ jsx("div", { className: "w-px h-8 md:h-12", style: { background: "linear-gradient(to bottom, var(--v2-neon), transparent)" } })
        ]
      }
    )
  ] });
};
const items = [
  { value: "$600M+", label: "Billed Project Value" },
  { value: "300+", label: "Skilled Tradesmen" },
  { value: "100+", label: "Years of Expertise" },
  { value: "14%", label: "Average Time Savings" },
  { value: "2–6×", label: "Average Return on Investment" },
  { value: "", label: "Consultants in Every Modality" },
  { value: "", label: "Fire Damage Specialists" },
  { value: "", label: "AI-Powered Oversight & Analytics" },
  { value: "", label: "Palisades · Santa Barbara · Greensburg · Phoenix" }
];
const TickerItem = ({ value, label }) => /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-3 whitespace-nowrap", children: [
  value && /* @__PURE__ */ jsx("span", { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: "1.25rem", color: "var(--v2-neon)" }, children: value }),
  /* @__PURE__ */ jsx("span", { style: { fontSize: "1.25rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--v2-muted)" }, children: label }),
  /* @__PURE__ */ jsx("span", { style: { color: "rgba(0,255,136,.15)", margin: "0 24px" }, children: "◆" })
] });
const V2Ticker = () => {
  const repeated = [...items, ...items, ...items, ...items, ...items, ...items];
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "overflow-hidden",
      style: {
        borderTop: "1px solid var(--v2-rule)",
        borderBottom: "1px solid var(--v2-rule)",
        padding: "0.9rem 0",
        background: "var(--v2-deep)"
      },
      children: /* @__PURE__ */ jsx("div", { className: "v2-ticker-track flex items-center", style: { width: "max-content" }, children: repeated.map((item, i) => /* @__PURE__ */ jsx(TickerItem, { ...item }, i)) })
    }
  );
};
function useInView$1(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold }
    );
    observer.observe(el);
    const rect = el.getBoundingClientRect();
    const visible = (Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0)) / rect.height;
    if (visible >= threshold) {
      setInView(true);
    }
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}
const dotsNeon = "/assets/dots-neon-C9gJBOKh.png";
const rows = [
  {
    num: "01",
    label: "VERTICAL INTEGRATION",
    title: "Everything under one roof.",
    body: "While others outsource, we own every step. Design. Engineering. Construction. Interiors. When the same team carries your vision from first sketch to final walkthrough, nothing gets lost in translation.",
    statValue: 80,
    statSuffix: "%",
    statLabel: "IN-HOUSE CAPABILITY"
  },
  {
    num: "02",
    label: "UNRIVALED WORKFORCE",
    title: "An army of masters.",
    body: "Over 300 in-house skilled labor and construction managers — each an expert in their craft. This isn't a network of subcontractors. This is a dedicated force that builds together, thinks together, and executes with one singular standard.",
    statValue: 300,
    statSuffix: "+",
    statLabel: "IN-HOUSE TEAM"
  },
  {
    num: "03",
    label: "GENERATIONAL EXPERIENCE",
    title: "Over a century of proof.",
    body: "Experience doesn't list on a brochure. It shows in the silence of a perfectly sealed home. In walls that breathe with the desert. In craftsmanship that our grandchildren will inherit. Over a century of doing it right.",
    statValue: 100,
    statSuffix: "+",
    statLabel: "YEARS OF EXPERTISE"
  }
];
const ease$9 = [0.16, 1, 0.3, 1];
const ScrollStat = ({ value, suffix }) => {
  const ref = useRef(null);
  const [display, setDisplay] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });
  const counter = useTransform(scrollYProgress, [0, 1], [0, value]);
  useMotionValueEvent(counter, "change", (v) => {
    setDisplay(Math.round(v));
  });
  return /* @__PURE__ */ jsx("div", { ref, children: /* @__PURE__ */ jsxs("span", { className: "v2-headline block", style: { fontSize: "clamp(3rem, 6vw, 5.5rem)", color: "var(--v2-white)", lineHeight: 1 }, children: [
    display,
    suffix
  ] }) });
};
const V2Model = () => {
  const { ref, inView } = useInView$1(0.1);
  return /* @__PURE__ */ jsxs("section", { id: "model", className: "relative py-12 md:py-28", style: { background: "var(--v2-deep)" }, children: [
    /* @__PURE__ */ jsx("div", { className: "v2-ghost-text hidden lg:block top-20 right-8 text-right", style: { fontSize: "min(9.6vw, 120px)", color: "rgba(0,107,63,.24)" }, children: "MODEL" }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden", children: /* @__PURE__ */ jsx("img", { src: dotsNeon, alt: "", className: "w-[176vw] max-w-[1512px] opacity-[0.01]" }) }),
    /* @__PURE__ */ jsx("div", { ref, className: "relative z-10 max-w-[1400px] mx-auto px-6 md:px-12", children: inView && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, y: 35 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.75, delay: 0, ease: ease$9 }, className: "v2-label mb-6", children: "The Model" }),
      /* @__PURE__ */ jsxs(motion.h2, { initial: { opacity: 0, y: 35 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.75, delay: 0.08, ease: ease$9 }, className: "v2-headline text-4xl md:text-6xl lg:text-7xl mb-4", style: { color: "var(--v2-white)" }, children: [
        "ONE TEAM",
        /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "." }),
        /* @__PURE__ */ jsx("br", {}),
        "NO GAPS",
        /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "." })
      ] }),
      /* @__PURE__ */ jsx(motion.p, { initial: { opacity: 0, y: 35 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.75, delay: 0.16, ease: ease$9 }, className: "mb-16 max-w-lg", style: { fontSize: "1.375rem", color: "var(--v2-muted)", fontWeight: 300, lineHeight: 1.7 }, children: "The entire chain, under one roof." }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-col", children: rows.map((row, i) => /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 35 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.75, delay: 0.24 + i * 0.1, ease: ease$9 },
          className: "grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-6 md:gap-12 items-start py-10 md:py-14",
          style: { borderTop: "1px solid var(--v2-rule)" },
          children: [
            /* @__PURE__ */ jsx("span", { className: "v2-headline", style: { fontSize: "clamp(3rem, 5vw, 4.5rem)", color: "rgba(0,107,63,.24)", lineHeight: 1 }, children: row.num }),
            /* @__PURE__ */ jsxs("div", { className: "max-w-xl", children: [
              /* @__PURE__ */ jsx("span", { className: "v2-label mb-3 block", style: { fontSize: "1.25rem" }, children: row.label }),
              /* @__PURE__ */ jsx("h3", { className: "mb-4", style: { fontFamily: "var(--v2-font-body)", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 400, color: "var(--v2-white)", lineHeight: 1.2 }, children: row.title }),
              /* @__PURE__ */ jsx("p", { style: { fontSize: "1.25rem", color: "var(--v2-dim)", lineHeight: 1.8 }, children: row.body })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-right md:min-w-[200px]", children: [
              /* @__PURE__ */ jsx(ScrollStat, { value: row.statValue, suffix: row.statSuffix }),
              /* @__PURE__ */ jsx("span", { className: "block mt-2", style: { fontSize: "1.25rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--v2-muted)" }, children: row.statLabel })
            ] })
          ]
        },
        row.num
      )) })
    ] }) })
  ] });
};
const disciplines = [
  ["Architectural Design", "Structural Engineering"],
  ["General Construction", "Custom Millwork"],
  ["Electrical Systems", "Plumbing & Mechanical"],
  ["HVAC Engineering", "Interior Design"],
  ["Landscape Architecture", "Smart Home Integration"],
  ["Custom Stone & Tile", "Fine Finishing"]
];
const allDisciplines = disciplines.flat();
const ghostText = allDisciplines.join(" · ") + " · " + allDisciplines.join(" · ");
const ease$8 = [0.16, 1, 0.3, 1];
const V2Disciplines = () => {
  const { ref, inView } = useInView$1(0.1);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const ghostX = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  return /* @__PURE__ */ jsxs("section", { ref: sectionRef, className: "relative py-12 md:py-28 overflow-hidden", style: { background: "var(--v2-green)" }, children: [
    /* @__PURE__ */ jsx(
      motion.div,
      {
        className: "absolute top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none select-none",
        style: {
          x: ghostX,
          fontFamily: "'Archivo Black', sans-serif",
          textTransform: "uppercase",
          fontSize: "min(10vw, 140px)",
          color: "rgba(0,50,25,.15)"
        },
        children: ghostText
      }
    ),
    /* @__PURE__ */ jsx("div", { ref, className: "relative z-10 max-w-[1400px] mx-auto px-6 md:px-12", children: inView && /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-0 items-start", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-12 md:mb-0 md:sticky md:top-32", children: [
        /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, y: 35 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.75, delay: 0, ease: ease$8 }, className: "mb-6", style: { fontSize: "1.25rem", textTransform: "uppercase", letterSpacing: "0.22em", color: "rgba(0,255,136,.7)" }, children: "Complete Mastery" }),
        /* @__PURE__ */ jsxs(
          motion.h2,
          {
            initial: { opacity: 0, y: 35 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.75, delay: 0.08, ease: ease$8 },
            className: "mb-6",
            style: { fontFamily: "var(--v2-font-body)", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 400, color: "var(--v2-white)", lineHeight: 1.15 },
            children: [
              "One company.",
              /* @__PURE__ */ jsx("br", {}),
              "Every discipline."
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          motion.p,
          {
            initial: { opacity: 0, y: 35 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.75, delay: 0.16, ease: ease$8 },
            className: "max-w-md",
            style: { fontSize: "1.25rem", color: "rgba(245,245,243,.7)", lineHeight: 1.8 },
            children: "From the first line drawn to the final fixture placed, Lïef commands every aspect of creation. No handoffs. No compromises. No excuses."
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-x-8", children: disciplines.map((pair, i) => /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.2 + i * 0.06, ease: ease$8 },
          className: "col-span-2 grid grid-cols-2 gap-x-8",
          children: pair.map((d) => /* @__PURE__ */ jsx(
            "div",
            {
              className: "py-6",
              style: { borderBottom: "1px solid rgba(255,255,255,.12)" },
              children: /* @__PURE__ */ jsx("span", { style: { fontSize: "1.25rem", color: "rgba(245,245,243,.8)", fontWeight: 400 }, children: d })
            },
            d
          ))
        },
        i
      )) })
    ] }) })
  ] });
};
const ease$7 = [0.16, 1, 0.3, 1];
const faqs = [
  {
    question: "What makes Lïef Development different from other builders?",
    answer: "Lïef Development is vertically integrated. Architecture, engineering, construction, and brand creative all operate under one roof with over 300 skilled tradesmen to execute. What that means for you is fewer delays, lower costs, and a finished product that actually looks like what you envisioned. When builders outsource key phases, timelines slip, budgets inflate, and the original vision gets diluted. With 80% in-house capability, Lïef controls the schedule and the quality. The team that designs your project is the same team that engineers it, builds it, and brings it to market."
  },
  {
    question: "What types of projects does Lïef Development take on?",
    answer: "From condos to customs to communities. Lïef has delivered $500M+ in projects across the full range of premium construction: custom estates, multi-family developments, boutique communities, commercial, hospitality, mixed-use, and adaptive reuse. The same integrated team and the same standard of precision applies whether it is a 10,000 square foot residence or a 200-unit development."
  },
  {
    question: "What is SABS construction technology?",
    answer: "SABS stands for Saebi Alternative Building System, a patented technology that uses EPS foam panels, we call them Lïef Blocks, with a high-strength cementitious coating called SABSCRETE to create a single monolithic structure. We also think of it as Safe, Architectural, Balanced, and Sustainable. For you, that means 0% flame spread, 250 MPH wind resistance, R-75 to R-100 insulation, and complete mold and termite immunity. It also means 15-20% cost savings and faster build times compared to traditional methods. Lïef is the leading SABS builder in Arizona, and we offer it alongside traditional stick framing and other building methods so you can choose the solution that best fits your project."
  },
  {
    question: "How does Lïef approach design?",
    answer: "Every project starts with a problem to solve. Not a style to copy. We start with the needs of the project and the story it needs to tell. From there, our design team led by Scott Meiers with 50+ years across every building type translates that into architecture, and MOR Studio grounds it in science — how people actually live, work, and move through spaces. We bridge the gap between inspiration and execution with evidence. The result is considered design: built on research, not assumption. That process has produced everything from urban residences to desert modern estates to commercial spaces that perform."
  },
  {
    question: "Who is behind Lïef Development?",
    answer: "Lïef was built by people who have spent their careers doing the work, not talking about it. Jesse Fowler and Jon Armstrong have delivered $500M+ in projects between them, and that experience shows in how they manage risk, control costs, and keep builds on schedule. Scott Meiers has been designing buildings for over 50 years. There is no building type or challenge he has not worked through, which means fewer surprises and faster solutions when complexity shows up. Jimmy Khounlavong spent 16 years at Nike shaping some of the most recognized product lines alongside other leading brands before bringing that discipline to how Lïef thinks about brand, story, and market position. It is the piece most builders miss. The team is also backed by general counsel, investor relations, and a workforce of 300+ skilled tradesmen. That means every decision on your project is informed by decades of experience at the highest level."
  }
];
const useInView = (threshold = 0.1) => {
  const [inView, setInView] = useState(false);
  const ref = (node) => {
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold }
    );
    observer.observe(node);
  };
  return { ref, inView };
};
const FAQAccordion = ({ item, isOpen, onToggle }) => {
  return /* @__PURE__ */ jsxs("div", { className: "py-6", style: { borderTop: "1px solid var(--v2-rule)" }, children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: onToggle,
        className: "w-full flex items-start justify-between text-left gap-4 cursor-pointer",
        children: [
          /* @__PURE__ */ jsx(
            "span",
            {
              style: {
                fontFamily: "var(--v2-font-body)",
                fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
                fontWeight: 500,
                color: "var(--v2-white)",
                lineHeight: 1.4
              },
              children: item.question
            }
          ),
          /* @__PURE__ */ jsx(
            "span",
            {
              className: "shrink-0 mt-1 transition-transform duration-300",
              style: {
                color: "var(--v2-neon)",
                fontSize: "1.5rem",
                lineHeight: 1,
                transform: isOpen ? "rotate(45deg)" : "rotate(0deg)"
              },
              children: "+"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { height: 0, opacity: 0 },
        animate: { height: "auto", opacity: 1 },
        exit: { height: 0, opacity: 0 },
        transition: { duration: 0.35, ease: ease$7 },
        className: "overflow-hidden",
        children: /* @__PURE__ */ jsx(
          "p",
          {
            className: "pt-4",
            style: {
              fontFamily: "var(--v2-font-body)",
              fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
              color: "var(--v2-white)",
              opacity: 0.7,
              lineHeight: 1.7,
              maxWidth: "48rem"
            },
            children: item.answer
          }
        )
      }
    ) })
  ] });
};
const V2FAQ = () => {
  const { ref, inView } = useInView(0.1);
  const [openIndex, setOpenIndex] = useState(null);
  return /* @__PURE__ */ jsx("section", { id: "faq", className: "relative py-20 md:py-28", style: { background: "var(--v2-deep)" }, children: /* @__PURE__ */ jsxs("div", { ref, className: "relative z-10 max-w-[1400px] mx-auto px-6 md:px-12", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 35 },
        animate: inView ? { opacity: 1, y: 0 } : {},
        transition: { duration: 0.75, ease: ease$7 },
        className: "relative mb-12",
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "v2-ghost-text absolute top-0 right-0 md:-right-6",
              style: { fontSize: "min(7vw, 120px)", lineHeight: 1, color: "rgba(0,107,63,.24)" },
              children: "FAQ"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "v2-label mb-6", children: "Common Questions" }),
          /* @__PURE__ */ jsxs(
            "h2",
            {
              className: "v2-headline text-4xl md:text-6xl lg:text-7xl mb-4",
              style: { color: "var(--v2-white)" },
              children: [
                "ANSWERS",
                /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "." })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 35 },
        animate: inView ? { opacity: 1, y: 0 } : {},
        transition: { duration: 0.75, delay: 0.2, ease: ease$7 },
        children: faqs.map((faq, i) => /* @__PURE__ */ jsx(
          FAQAccordion,
          {
            item: faq,
            isOpen: openIndex === i,
            onToggle: () => setOpenIndex(openIndex === i ? null : i)
          },
          i
        ))
      }
    )
  ] }) });
};
const ease$6 = [0.16, 1, 0.3, 1];
const V2CTA = () => {
  const { openModal } = useContactModal();
  const { ref, inView } = useInView$1(0.1);
  return /* @__PURE__ */ jsxs("section", { id: "contact", className: "relative py-16 md:py-28", style: { background: "var(--v2-black)" }, children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-px", style: { height: "100px", background: "linear-gradient(to bottom, var(--v2-neon), transparent)" } }),
    /* @__PURE__ */ jsx("div", { ref, className: "relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 text-center flex flex-col items-center", children: inView && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs(motion.h2, { initial: { opacity: 0, y: 35 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.75, ease: ease$6 }, className: "v2-headline mb-6", style: { fontSize: "clamp(3rem, 6vw, 5rem)", lineHeight: 1.2, color: "var(--v2-white)" }, children: [
        "LET'S",
        /* @__PURE__ */ jsx("br", {}),
        "BUILD",
        /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "." })
      ] }),
      /* @__PURE__ */ jsx(motion.p, { initial: { opacity: 0, y: 35 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.75, delay: 0.08, ease: ease$6 }, className: "mb-10 max-w-[380px]", style: { fontWeight: 300, fontSize: "1.3rem", color: "var(--v2-muted)", lineHeight: 1.7 }, children: "Whether you're an investor, a developer, or a future homeowner — we'd like to hear from you." }),
      /* @__PURE__ */ jsx(
        motion.button,
        {
          initial: { opacity: 0, y: 35 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.75, delay: 0.16, ease: ease$6 },
          onClick: openModal,
          className: "inline-block transition-all duration-300 hover:brightness-110",
          style: {
            fontFamily: "var(--v2-font-body)",
            fontSize: "1.25rem",
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            fontWeight: 600,
            background: "var(--v2-neon)",
            color: "var(--v2-deep)",
            padding: "16px 40px",
            border: "none",
            cursor: "pointer"
          },
          children: "Start a Conversation"
        }
      )
    ] }) })
  ] });
};
const footerLinks = {
  explore: ["Home", "The Model", "AI", "Projects", "Lïef x SABS", "Team", "Testimonials"],
  partner: ["Developers", "Managing General Contractor", "Distributors"]
};
const V2Footer = () => {
  const handleNav = (label) => {
    var _a;
    if (label === "Home") {
      window.location.href = "/";
      return;
    }
    if (label === "Lïef x SABS") {
      window.location.href = "/sabs";
      return;
    }
    if (label === "Team") {
      window.location.href = "/team";
      return;
    }
    if (label === "Projects") {
      window.location.href = "/projects";
      return;
    }
    if (label === "AI") {
      window.location.href = "/ai";
      return;
    }
    if (label === "Testimonials") {
      window.location.href = "/testimonials";
      return;
    }
    const map = {
      "The Model": "#model"
    };
    const target = map[label];
    if (target) (_a = document.querySelector(target)) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
  };
  return /* @__PURE__ */ jsx("footer", { className: "relative", style: { background: "var(--v2-deep)", borderTop: "1px solid var(--v2-rule)" }, children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1400px] mx-auto px-6 md:px-12 py-16", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-12 mb-16", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("img", { src: logoConcrete, alt: "Lïef", className: "h-6 w-auto mb-4" }),
        /* @__PURE__ */ jsx("p", { className: "v2-headline text-sm mb-2", style: { color: "var(--v2-white)" }, children: "DEVELOPMENT + CONSTRUCTION" }),
        /* @__PURE__ */ jsx("p", { style: { fontSize: "1.25rem", color: "var(--v2-neon)" }, children: "BUILT. DIFFERENT." }),
        /* @__PURE__ */ jsx("p", { className: "mt-2", style: { fontSize: "1.25rem", color: "var(--v2-dim)" }, children: "Phoenix, Arizona" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h5", { className: "mb-4", style: { fontSize: "1.25rem", textTransform: "uppercase", letterSpacing: "0.16em", color: "var(--v2-neon)" }, children: "Explore" }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: footerLinks.explore.map((l) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => handleNav(l),
            style: { fontSize: "1.25rem", color: "var(--v2-dim)", background: "none", border: "none", cursor: "pointer", padding: 0 },
            className: "hover:text-[#00FF88] transition-colors duration-300",
            children: l
          }
        ) }, l)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h5", { className: "mb-4", style: { fontSize: "1.25rem", textTransform: "uppercase", letterSpacing: "0.16em", color: "var(--v2-neon)" }, children: "Partner" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("span", { style: { fontSize: "1.25rem", color: "var(--v2-dim)" }, children: "Developers" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "https://acgarizona.com/", target: "_blank", rel: "noopener noreferrer", style: { fontSize: "1.25rem", color: "var(--v2-dim)", textDecoration: "none" }, className: "hover:text-[#00FF88] transition-colors duration-300", children: "Managing General Contractor" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "https://www.strataus.com/", target: "_blank", rel: "noopener noreferrer", style: { fontSize: "1.25rem", color: "var(--v2-dim)", textDecoration: "none" }, className: "hover:text-[#00FF88] transition-colors duration-300", children: "Distributors" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h5", { className: "mb-4", style: { fontSize: "1.25rem", textTransform: "uppercase", letterSpacing: "0.16em", color: "var(--v2-neon)" }, children: "Connect" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "mailto:hello@liefdev.com", style: { fontSize: "1.25rem", color: "var(--v2-dim)", textDecoration: "none" }, className: "hover:text-[#00FF88] transition-colors duration-300", children: "hello@liefdev.com" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", style: { fontSize: "1.25rem", color: "var(--v2-dim)", textDecoration: "none" }, className: "hover:text-[#00FF88] transition-colors duration-300", children: "LinkedIn" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "pt-8 flex flex-col md:flex-row justify-between items-center gap-4", style: { borderTop: "1px solid var(--v2-rule)" }, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { style: { fontSize: "1.25rem", color: "var(--v2-dim)" }, children: "© 2026 Lïef Development + Construction" }),
        /* @__PURE__ */ jsxs("p", { style: { fontSize: "1.25rem", color: "var(--v2-dim)", opacity: 0.6, marginTop: "4px" }, children: [
          "A",
          " ",
          /* @__PURE__ */ jsx("a", { href: "https://commonground.ventures", target: "_blank", rel: "noopener noreferrer", style: { color: "inherit", textDecoration: "none" }, className: "hover:text-[#00FF88] transition-colors duration-300", children: "Common Ground" }),
          " ",
          "venture."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("p", { style: { fontSize: "1.25rem", color: "var(--v2-dim)", opacity: 0.5 }, children: [
        "Branded by",
        " ",
        /* @__PURE__ */ jsx("a", { href: "https://liploicreative.com", target: "_blank", rel: "noopener noreferrer", style: { color: "#D4A843", textDecoration: "none" }, className: "hover-gold transition-colors duration-300", children: "Lip Loi Creative" }),
        " | Enhanced by",
        " ",
        /* @__PURE__ */ jsx("a", { href: "https://commonground.ventures", target: "_blank", rel: "noopener noreferrer", style: { color: "#8B5CF6", textDecoration: "none" }, className: "hover-purple transition-colors duration-300", children: "Common Ground" })
      ] })
    ] })
  ] }) });
};
const V2 = () => {
  return /* @__PURE__ */ jsxs("div", { className: "v2 min-h-screen overflow-x-hidden", children: [
    /* @__PURE__ */ jsx(V2Nav, {}),
    /* @__PURE__ */ jsx("h1", { className: "sr-only", style: { position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }, children: "Lïef Development - Arizona's Premier Luxury Home Builder" }),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx(V2Hero, {}),
      /* @__PURE__ */ jsx(V2Ticker, {}),
      /* @__PURE__ */ jsx(V2Model, {}),
      /* @__PURE__ */ jsx(V2Disciplines, {}),
      /* @__PURE__ */ jsx(V2FAQ, {}),
      /* @__PURE__ */ jsx(V2CTA, {})
    ] }),
    /* @__PURE__ */ jsx(V2Footer, {})
  ] });
};
const logoRitzCarlton = "/assets/ritz-carlton-BC8_pOkW.png";
const logoDiscovery = "/assets/discovery-channel-DrwVHaPd.png";
const logoPgaTour = "/assets/pga-tour-B90bA1qL.png";
const logoAD = "/assets/architectural-digest-DuFnHwfd.png";
const logoCobra = "/assets/shelby-B-8CSwXE.png";
const logoLacma = "/assets/lacma-Dv1b60h2.png";
const logoHgtv = "/assets/hgtv-CkRf6Cjw.png";
const logoPlanetGreen = "/assets/planet-green-BtPpLdiQ.png";
const logoDiy = "/assets/diy-network-CsSScfcu.png";
const logoOakley = "/assets/oakley-BoGXNFOv.png";
const logoForbes = "/assets/forbes-DiguZep2.png";
const logoMarucci = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAiYAAACICAYAAADTRyDxAAAKIklEQVR4nO3dW1IcSRIFUISxhdr/AlkEYzVjstYIWiKzKiOuu5/z2d3WeNx4eSUJ/Pj4+HgBAEjwursAAICfNCYAQAyNCQAQQ2MCAMR4210AAJDjdrst+6mY9/f3H7//M09MAIAYGhMAIIbGBABY/m2cf6MxAQBiaEwAgOW+evH1TmMCAMTQmAAAMTQmAMBLwouvdxoTACDi/ZI7jQkAEENjAgDE0JgAADE0JgAw3C3kxdc7jQkAEPHi653GBACIoTEBAGJoTABgsFvQ+yV3GhMAIIbGBACIePH1TmMCAMTQmAAAMTQmAEDEt3Hufnx8RL2MCwAM5okJABBDYwIAxNCYAAAxNCYAQIy33QVU+pW8332jeMevCV5dW+Vfl9w5q1X5y3D2fpo2/zJba+xP5Ty60K5aZM+6hKtugl1/s6FqXlOadGrspw7rQmb7jWtMUj99X7UZ0hd92h+PqpLbFTyh6yFlT1VaIzIb1pismPDvTOaVdTyymFZtiKQFn3IIJOSWsD/O1PDdXFbO9Zm5Sq+vw55KOnt+NT2zW/CTofbvmKwI/+fXOBL86kVx/3q7D4jkg+CZc3v0/71Tl6bkjPT6uozhyj10hszytf6pnNQFuKuunV83dS6+q3r9HefkVxMP8Grzl1BvQg2d633W/ry0MZl2EX7na+5eaCu/frfLr8tYuoxjauNUeV9NuxOm135WuycmuyfwT19/d207vr3VTbVx/X4hVquf/9dh/lZftB0y6zSOEY3Jrwdv8sSl1XZVPRO6+6rjcxnUJtPjZFYzl/KNSWLQv9eSVNuVpozzGWPd8fLzM/4/Xd7lqLRWuzb7V45JZrW1aEySJ2tKbcnjnK773HRplibO3RXjk1n9/flaPbzUSerasX9lyjirjbvzhV2JeYCBT0zYJ/1yns781DVl7jy5Pe7WfJwaE07rvjmqm/b7cjqR4XEy65OTxgQWq3AwdP6WRHr+6fVdodrL5AluBcZ89sx4nRoYjzHH/yOHvdKbpfT6IJEnJhzmMoZr2FvHyawfjQlAABfscTLrmZfGhJYLO1X3/NLHl14f8PLytrsA6th5qH/ne/UunVnvSiTWdJa1e5zMXv6bQeo+eKSupzcmFgu7Fvf9v7X+SJF6YXynzl1/nV1m3Hliwrfs2HRVDil4xK4L7U/76+e/c9n+P5mt0fYdk+RL7V5bQn0JNTy7tuQxQYKU8+cRqy9/ma3V5onJV4smqYP9U30pNXKtqnP83QM5fXzp9SXy7dHjZPa48o3Jdw7NnQulepe969PJyq9HPV3WiL11nMzyPZrZU7+Vo0s8z+KvybxRZV0k1lSpPtYp/Y5J+kJOry+RzIAU6efRe3h94xqToxOyegLTF0yX9wbIYJ0cJ7PjZDYjt7KNCVTagKl1VW+wu+f/LF3mcSWZ7cvtaY3J9I3P4xwEdFgn6fUd4Vw/TmaPK/9TOV0WS3p91L6AjtZa6bdwAr2UbEzSD8z0+rrS3H3mF9VlslaPk9mc3LxjMlDipfNoTcmbr/vv0EnOvkJ9ZJ5J6d4bZ1byiQnrVFj8Lp6a83ZG13FdSWbHyWxvbq8TLob0+jjP3H7mUN1H9vA4T0wCuFzrZeYCArhGucYk/UJIr6+63Q1JOusvnzV8fM3K7JyquZVrTJh5cVXdYFXr7jK+9PquVnW/M3teNSZEmn6hMO8wTjQx80fHPDGzZ4/7rfsFkl4f/zBXj5l6IKaQPwx8YtJx40++jKuOveM6ZI2qax5WKtWYpEu/sBLqczD3YS5ZwTqbl5vGhMtV3iCPmDruFNPzT/ggUo3MMnJ7qDGZvvH5d9bGWt0P1PTxpdcHlbR+YpJ+OabXd0bHMf3KBQRwrTKNSfqFkF7f1bo3JPAoe+Q4mc1UpjEhs3FycMzMpfv4oLJb8f2pMWHkwqe36etz+hPcM2SWk9vpvy48feNPZu6zdD9Q08eXXh9U0/aJSfrlmV5fl5qfyQUEcL3TT0xWSr8Q0ut7hulNCTzC/jlOZnNzK9GYsLdx6rDQV+qeV/r40uu72oQPSvSmMaHcIX8/eB2+M5hnVrDOsnJ763JZVaqvirQcHR6fyWQv+cPAl187bvy0Cz+9xoQ1kFADwATxjUm69AvrTH0JTUl6rlMlrI1qZHaczGbnpjEhamFXb0h25zfd9Pyr758dZNagMZm+8ck4HKzD/gdq+vjS6ztjxb7qltuqs+g9LLcr62n3UznpF1ZyfbtqS9tw1eqDSvs/+QycPJYk0Y1J+oWQXl8FMqQzF9dxMsM7Jo0dufRXHwYdG5LuB2r38bFGx72fkNmt0f6MfmLCGpoSOuh0MJ9hXx0ns8zcDjUm0zc+GazD/gdq+vjS6zvKnjpOZtdp9cQkfaGk17dCtQO9Wr0A1cU2JukXQnp9ic1Sl8zgO3wQOX4GyOyzae+XRDcmPEYTsFa3g6Ha+NLru5r9Ticak8EqHuYVa+YYlywrWGe5ub12uRDS65vOIfA8styrW/5Tf3PpI2Q28IlJx8nQONXTcR0CpItsTNKlX1hdX5aqWHMHcj9OZsfJ7Jxbw9w0JvCgjgdDJfI/T3bHyex6GhNKcBjUeFrHehXWRFqNafVUqfF9UU2vHS4F9cFM/pzCec4lUsU9Mem08VNVO5B21Gsd5qu2jqnPmhvamKRLv7DS6zvKQbBXav6pdVXJYvpvfO6S2a3pPtCYsETXDdR1XKmZ3v9deubp9UF6g/n2t//AJmMH667GJ89J898lf5/8j0uvr5u/Nibp0hdMen07svjTYZWQV5cLiDnu+8YfyOuR2bvzJ6sxSZ+Q9PqqcEDC9fvqfl7Za30zuxWp8wzvmDSicVqr88EwYXzd7Z6/I+dRytlVKbPONCYAT+RyoZv3xWv6Nbl7/Jv0+uBZXHZ7yf8YeR0ns8AnJh0nReNUT8d1CCvZQ7RpTNKlb7b0+gB4zvl9a/6hV2MCJ3Q/GOAMH5COk9lnGhOAJ5t42Tw6Zpllet9Q42vVT4Tp9SWrsBn4h/naS/5/J6PjZBb+xKTjBGmc6um4DjtLn6/0+hLJjJjGJF36Zkmvj5qS11Wl39DZXfI66ZjZbcC615gMVeEwudeYWOeEgyFZ4proUGvK/pRZjl21ftmYOHhnSN4gybVNymH3199dzzO+XlqGz3D1mGQ2W8knJumNU3p96WxgvmJdZDAPx8msWGOSPmHp9XUb3856NJS5ayShhkmP8BPGILO5Z9T2xoTHdHnUXOUQmnIw/G7n3Hz1tavOQ4U1XmH+K6hadwKNCVs3UZWGhD3vd3RcG5XGlDIHCTVUy+xRO8fw4+Pj8wePVZ9Gzg5cfdcunMT6V9T03XoS81np6vGnzMOK/BOf/KSuu5+mZ3YbcP582ZjAVYs//dBj7xqZvD52XrhVc5dZTxoTLt/8NnB/j6wR66Pn06DVZNaHxgQAiOHlVwAghsYEAIihMQEAYmhMAICXFP8BDRQ/Uz4iyFcAAAAASUVORK5CYII=";
const logoBuilder = "/assets/builder-magazine-CwJSZlui.png";
const logoFoxRacing = "/assets/fox-BuxMQH3m.png";
const logoMaya = "/assets/maya-v7pnuLWg.png";
const logoKW = "/assets/keller-williams-BIcORWOv.png";
const logoZillow = "/assets/zillow-rlV3J0xi.png";
const logoUSNews = "/assets/us-news-BtDP55-2.png";
const logoRobbReport = "/assets/robb-report-Uw_NynVN.png";
const logoLATimes = "/assets/la-times-RTkYLatW.png";
const logoNBC = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgMjAwIiBmaWxsPSJ3aGl0ZSI+CiAgPCEtLSBQZWFjb2NrIGZlYXRoZXJzIC0tPgogIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDkwLCAxMCkiPgogICAgPCEtLSBZZWxsb3cgZmVhdGhlciAtLT4KICAgIDxwYXRoIGQ9Ik01NSAxMjAgUTMwIDYwIDU1IDIwIFE2NSA2MCA1NSAxMjAiIGZpbGw9IiNGOUE4MjUiLz4KICAgIDwhLS0gT3JhbmdlIGZlYXRoZXIgLS0+CiAgICA8cGF0aCBkPSJNNTAgMTE4IFExNSA3MCAzMCAxNSBRNTAgNjUgNTAgMTE4IiBmaWxsPSIjRUY2QzAwIi8+CiAgICA8IS0tIFJlZCBmZWF0aGVyIC0tPgogICAgPHBhdGggZD0iTTQ4IDExNSBRNSA4MCAxMCAyMCBRMzggNzIgNDggMTE1IiBmaWxsPSIjQzYyODI4Ii8+CiAgICA8IS0tIFB1cnBsZSBmZWF0aGVyIC0tPgogICAgPHBhdGggZD0iTTY1IDEyMCBROTAgNjAgNjUgMjAgUTU1IDYwIDY1IDEyMCIgZmlsbD0iIzZBMUI5QSIvPgogICAgPCEtLSBCbHVlIGZlYXRoZXIgLS0+CiAgICA8cGF0aCBkPSJNNzAgMTE4IFExMDUgNzAgOTAgMTUgUTcwIDY1IDcwIDExOCIgZmlsbD0iIzE1NjVDMCIvPgogICAgPCEtLSBHcmVlbiBmZWF0aGVyIC0tPgogICAgPHBhdGggZD0iTTcyIDExNSBRMTE1IDgwIDExMCAyMCBRODIgNzIgNzIgMTE1IiBmaWxsPSIjMkU3RDMyIi8+CiAgPC9nPgogIDwhLS0gTkJDIHRleHQgLS0+CiAgPHRleHQgeD0iMjAwIiB5PSIxODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJBcmlhbCBCbGFjaywgQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSI5MDAiIGZvbnQtc2l6ZT0iNjAiIGZpbGw9IndoaXRlIiBsZXR0ZXItc3BhY2luZz0iNiI+TkJDPC90ZXh0Pgo8L3N2Zz4=";
const logoFoxNews = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgMTIwIiBmaWxsPSJ3aGl0ZSI+CiAgPHRleHQgeD0iMjAwIiB5PSI1NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIEJsYWNrLCBBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC13ZWlnaHQ9IjkwMCIgZm9udC1zaXplPSI1MCIgZmlsbD0id2hpdGUiIGxldHRlci1zcGFjaW5nPSIyIj5GT1ggTkVXUzwvdGV4dD4KICA8dGV4dCB4PSIyMDAiIHk9IjkwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZiIgZm9udC13ZWlnaHQ9IjQwMCIgZm9udC1zaXplPSIxOCIgZmlsbD0id2hpdGUiIGxldHRlci1zcGFjaW5nPSI2IiBvcGFjaXR5PSIwLjYiPkNIQU5ORUw8L3RleHQ+Cjwvc3ZnPg==";
const logoCBS = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgMjAwIiBmaWxsPSJ3aGl0ZSI+CiAgPCEtLSBDQlMgRXllIC0tPgogIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIwMCw3MCkiPgogICAgPGVsbGlwc2UgY3g9IjAiIGN5PSIwIiByeD0iNTUiIHJ5PSIzMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSI0Ii8+CiAgICA8Y2lyY2xlIGN4PSIwIiBjeT0iMCIgcj0iMTgiIGZpbGw9IndoaXRlIi8+CiAgICA8Y2lyY2xlIGN4PSIwIiBjeT0iMCIgcj0iMTAiIGZpbGw9IiMwYTBhMGEiLz4KICA8L2c+CiAgPCEtLSBDQlMgdGV4dCAtLT4KICA8dGV4dCB4PSIyMDAiIHk9IjE3MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSI3MDAiIGZvbnQtc2l6ZT0iNTQiIGZpbGw9IndoaXRlIiBsZXR0ZXItc3BhY2luZz0iMTAiPkNCUzwvdGV4dD4KPC9zdmc+";
const logoPBS = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgMjAwIiBmaWxsPSJ3aGl0ZSI+CiAgPCEtLSBQQlMgSGVhZCBzaWxob3VldHRlIGluIGNpcmNsZSAtLT4KICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMDAsNzUpIj4KICAgIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSI0MiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIzLjUiLz4KICAgIDwhLS0gU2ltcGxpZmllZCBoZWFkIHByb2ZpbGUgZmFjaW5nIHJpZ2h0IC0tPgogICAgPHBhdGggZD0iTS04LC0zMCBRNSwtMzIgMTAsLTI1IFExOCwtMTggMTYsLTggUTIwLC02IDIwLDAgUTIwLDUgMTYsOCBRMTQsMTUgOCwxOCBRMiwyMiAtNSwyMiBRLTEwLDIyIC0xNCwxOCBRLTE4LDE0IC0xOCw4IEwtMTgsLTIwIFEtMTgsLTI4IC04LC0zMFoiIGZpbGw9IndoaXRlIi8+CiAgPC9nPgogIDwhLS0gUEJTIHRleHQgLS0+CiAgPHRleHQgeD0iMjAwIiB5PSIxNzAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmIiBmb250LXdlaWdodD0iNzAwIiBmb250LXNpemU9IjU0IiBmaWxsPSJ3aGl0ZSIgbGV0dGVyLXNwYWNpbmc9IjEyIj5QQlM8L3RleHQ+Cjwvc3ZnPg==";
const logoAZCentral = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MDAgMTIwIiBmaWxsPSJ3aGl0ZSI+CiAgPHRleHQgeD0iMjUwIiB5PSI1NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9Ikdlb3JnaWEsICdUaW1lcyBOZXcgUm9tYW4nLCBzZXJpZiIgZm9udC13ZWlnaHQ9IjQwMCIgZm9udC1zaXplPSI0MiIgZmlsbD0id2hpdGUiIGxldHRlci1zcGFjaW5nPSIxIj5hemNlbnRyYWw8L3RleHQ+CiAgPHRleHQgeD0iMjUwIiB5PSI5NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9Ikdlb3JnaWEsICdUaW1lcyBOZXcgUm9tYW4nLCBzZXJpZiIgZm9udC13ZWlnaHQ9IjQwMCIgZm9udC1zaXplPSIyMiIgZmlsbD0id2hpdGUiIGxldHRlci1zcGFjaW5nPSIzIiBvcGFjaXR5PSIwLjciPlBBUlQgT0YgVEhFIFVTQSBUT0RBWSBORVRXT1JLPC90ZXh0Pgo8L3N2Zz4=";
const logoAZFamily = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MDAgMTIwIiBmaWxsPSJ3aGl0ZSI+CiAgPHRleHQgeD0iMjUwIiB5PSI1MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIEJsYWNrLCBBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC13ZWlnaHQ9IjkwMCIgZm9udC1zaXplPSI0NCIgZmlsbD0id2hpdGUiIGxldHRlci1zcGFjaW5nPSIyIj5BWiBGQU1JTFk8L3RleHQ+CiAgPHRleHQgeD0iMjUwIiB5PSI4NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSI0MDAiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IndoaXRlIiBsZXR0ZXItc3BhY2luZz0iNSIgb3BhY2l0eT0iMC42Ij4zVFYgfCBDQlMgNSB8IEFSSVpPTkEnUyBGQU1JTFk8L3RleHQ+Cjwvc3ZnPg==";
const logoABC15 = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgMTIwIiBmaWxsPSJ3aGl0ZSI+CiAgPHRleHQgeD0iMjAwIiB5PSI1NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIEJsYWNrLCBBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC13ZWlnaHQ9IjkwMCIgZm9udC1zaXplPSI1MCIgZmlsbD0id2hpdGUiIGxldHRlci1zcGFjaW5nPSIxIj5BQkMxNTwvdGV4dD4KICA8dGV4dCB4PSIyMDAiIHk9IjkwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZiIgZm9udC13ZWlnaHQ9IjQwMCIgZm9udC1zaXplPSIxNiIgZmlsbD0id2hpdGUiIGxldHRlci1zcGFjaW5nPSI0IiBvcGFjaXR5PSIwLjYiPkFSSVpPTkE8L3RleHQ+Cjwvc3ZnPg==";
const logoFox10 = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgMTIwIiBmaWxsPSJ3aGl0ZSI+CiAgPHRleHQgeD0iMjAwIiB5PSI1NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIEJsYWNrLCBBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC13ZWlnaHQ9IjkwMCIgZm9udC1zaXplPSI1MCIgZmlsbD0id2hpdGUiIGxldHRlci1zcGFjaW5nPSIyIj5GT1ggMTA8L3RleHQ+CiAgPHRleHQgeD0iMjAwIiB5PSI5MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSI0MDAiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IndoaXRlIiBsZXR0ZXItc3BhY2luZz0iNCIgb3BhY2l0eT0iMC42Ij5QSE9FTklYPC90ZXh0Pgo8L3N2Zz4=";
const logoAZRepublic = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MDAgMTAwIiBmaWxsPSJ3aGl0ZSI+CiAgPHRleHQgeD0iMzAwIiB5PSI0NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IidUaW1lcyBOZXcgUm9tYW4nLCBHZW9yZ2lhLCBzZXJpZiIgZm9udC13ZWlnaHQ9IjQwMCIgZm9udC1zaXplPSIyMCIgZmlsbD0id2hpdGUiIGxldHRlci1zcGFjaW5nPSIxMCI+VEhFPC90ZXh0PgogIDx0ZXh0IHg9IjMwMCIgeT0iODIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSInVGltZXMgTmV3IFJvbWFuJywgR2VvcmdpYSwgc2VyaWYiIGZvbnQtd2VpZ2h0PSI3MDAiIGZvbnQtc2l6ZT0iMzgiIGZpbGw9IndoaXRlIiBsZXR0ZXItc3BhY2luZz0iNCI+QVJJWk9OQSBSRVBVQkxJQzwvdGV4dD4KPC9zdmc+";
const logoBizJournal = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MDAgMTAwIiBmaWxsPSJ3aGl0ZSI+CiAgPHRleHQgeD0iMzAwIiB5PSI0MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IidUaW1lcyBOZXcgUm9tYW4nLCBHZW9yZ2lhLCBzZXJpZiIgZm9udC13ZWlnaHQ9IjQwMCIgZm9udC1zaXplPSIxNiIgZmlsbD0id2hpdGUiIGxldHRlci1zcGFjaW5nPSI2IiBvcGFjaXR5PSIwLjciPlBIT0VOSVg8L3RleHQ+CiAgPHRleHQgeD0iMzAwIiB5PSI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IidUaW1lcyBOZXcgUm9tYW4nLCBHZW9yZ2lhLCBzZXJpZiIgZm9udC13ZWlnaHQ9IjcwMCIgZm9udC1zaXplPSIzNiIgZmlsbD0id2hpdGUiIGxldHRlci1zcGFjaW5nPSIyIj5CVVNJTkVTUyBKT1VSTkFMPC90ZXh0Pgo8L3N2Zz4=";
const ease$5 = [0.16, 1, 0.3, 1];
const accentColor$1 = "#00FF88";
const attributes = [
  { icon: Flame, title: "Anti-Fire", desc: "Non-combustible concrete shell with 0% flame spread. The ultimate desert safety standard." },
  { icon: Droplets, title: "Anti-Mold & Moisture", desc: "100% impermeable to Arizona's extreme monsoon elements. Zero moisture intrusion." },
  { icon: Bug, title: "Anti-Termite", desc: "Zero wood framing means zero risk from structural pests. Permanent protection." },
  { icon: Thermometer, title: "Thermal Performance", desc: "R-75 to R-100 insulation rating. Massive HVAC overhead reduction through high-density insulation." },
  { icon: Wind, title: "260 MPH Wind Rating", desc: "Exceeds Florida hurricane zone requirements. Built for extreme conditions" },
  { icon: Recycle, title: "100% Recyclable", desc: "EPS foam core is fully recyclable. Zero construction waste to landfill" }
];
const stats = [
  { value: "$13", suffix: "/sq ft", label: "Average Savings", desc: "Average residential construction cost savings" },
  { value: "14", suffix: "%", label: "Timeline Reduction", desc: "Average reduction across build types" },
  { value: "+50", suffix: "%", label: "Energy Efficiency", desc: "R-75 to R-100 insulation cuts HVAC costs by half compared to conventional construction" },
  { value: "100", suffix: "+", label: "Projects Delivered", desc: "SABS Technology has delivered 100+ projects in multiple climates and regions" }
];
const technicals = [
  { title: "ICC-ES ESR-1638", detail: "Evaluation report covering structural use in residential and commercial applications" },
  { title: "ASTM C578 Type XI", detail: "Standard specification for rigid cellular polystyrene thermal insulation" },
  { title: "ASTM E-84 Class A", detail: "Surface burning characteristics. Class A fire rating for flame spread and smoke development" },
  { title: "STC 52 Sound Rating", detail: "Sound Transmission Class rating exceeding standard wood-frame construction" },
  { title: "Category A–F Seismic", detail: "Engineered for all seismic design categories per IBC requirements" },
  { title: "100% Recyclable", detail: "EPS foam core is fully recyclable. Zero construction waste to landfill" }
];
const technicalIcons = [Shield, Shield, Flame, Volume2, Shield, Recycle];
const pressOutlets = [
  { name: "NBC", src: logoNBC },
  { name: "Fox News", src: logoFoxNews },
  { name: "CBS", src: logoCBS },
  { name: "PBS", src: logoPBS },
  { name: "AZ Central", src: logoAZCentral },
  { name: "AZ Family", src: logoAZFamily },
  { name: "ABC15", src: logoABC15 },
  { name: "Fox 10", src: logoFox10 },
  { name: "Arizona Republic", src: logoAZRepublic },
  { name: "Business Journal", src: logoBizJournal }
];
const trustLogos = [
  { name: "Ritz-Carlton", src: logoRitzCarlton },
  { name: "Discovery Channel", src: logoDiscovery },
  { name: "PGA Tour", src: logoPgaTour },
  { name: "Architectural Digest", src: logoAD },
  { name: "Cobra", src: logoCobra },
  { name: "LACMA", src: logoLacma },
  { name: "HGTV", src: logoHgtv },
  { name: "Planet Green", src: logoPlanetGreen },
  { name: "DIY Network", src: logoDiy },
  { name: "Oakley", src: logoOakley },
  { name: "Forbes", src: logoForbes },
  { name: "Marucci", src: logoMarucci },
  { name: "Builder", src: logoBuilder },
  { name: "Fox Racing", src: logoFoxRacing },
  { name: "Maya", src: logoMaya },
  { name: "Keller Williams", src: logoKW },
  { name: "Zillow", src: logoZillow },
  { name: "U.S. News", src: logoUSNews },
  { name: "Robb Report", src: logoRobbReport },
  { name: "Los Angeles Times", src: logoLATimes }
];
const projectTypes = {
  "Single Family Residential": { traditional: 185, liefBlocks: 145 },
  "Multi-Family Residential": { traditional: 165, liefBlocks: 130 },
  "Commercial Office": { traditional: 200, liefBlocks: 160 },
  "Mixed-Use Development": { traditional: 190, liefBlocks: 150 },
  "Adaptive Reuse / Conversion": { traditional: 175, liefBlocks: 140 }
};
const LiefBlocks = () => {
  const { openModal } = useContactModal();
  const [projectType, setProjectType] = useState("Single Family Residential");
  const [sqft, setSqft] = useState(5e3);
  const [playingVideo, setPlayingVideo] = useState(null);
  const costs = projectTypes[projectType];
  const totalSavings = (costs.traditional - costs.liefBlocks) * sqft;
  const savingsPercent = Math.round((costs.traditional - costs.liefBlocks) / costs.traditional * 100);
  const { ref: heroRef, inView: heroInView } = useInView$1(0.1);
  const { ref: whatRef, inView: whatInView } = useInView$1(0.1);
  useInView$1(0.1);
  const { ref: statsRef, inView: statsInView } = useInView$1(0.1);
  const { ref: techRef, inView: techInView } = useInView$1(0.1);
  const { ref: vidRef, inView: vidInView } = useInView$1(0.1);
  const { ref: pressRef, inView: pressInView } = useInView$1(0.1);
  const { ref: calcRef, inView: calcInView } = useInView$1(0.1);
  const { ref: ctaRef, inView: ctaInView } = useInView$1(0.1);
  const { scrollY } = useScroll();
  const heroGlowY = useTransform(scrollY, [0, 600], [0, -60]);
  const ghostTextY = useTransform(scrollY, [0, 3e3], [0, -120]);
  const dotsScale = useTransform(scrollY, [0, 1500], [1, 1.08]);
  const show = (inView, y = 35) => inView ? { opacity: 1, y: 0 } : { opacity: 0, y };
  return /* @__PURE__ */ jsxs("div", { className: "v2 min-h-screen overflow-x-hidden", children: [
    /* @__PURE__ */ jsx(V2Nav, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsxs("section", { ref: heroRef, className: "relative h-screen flex items-center overflow-x-hidden", style: { background: "var(--v2-deep)" }, children: [
        /* @__PURE__ */ jsxs(motion.div, { className: "absolute inset-0 pointer-events-none", style: { y: heroGlowY }, children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-[60%] h-[60%]", style: { background: "radial-gradient(ellipse at top right, rgba(0,107,63,.12), transparent 70%)" } }),
          /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-[50%] h-[50%]", style: { background: "radial-gradient(ellipse at bottom left, rgba(0,255,136,.04), transparent 70%)" } })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full -mt-[8vh]", children: [
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: show(heroInView, 20),
              transition: { duration: 0.75, delay: 0.3, ease: ease$5 },
              className: "mb-3 md:mb-4",
              children: [
                /* @__PURE__ */ jsx("span", { className: "v2-label hidden md:inline text-[1.25rem]", children: "Lïef x SABS" }),
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "md:hidden",
                    style: { fontSize: "1rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--v2-neon)" },
                    children: "Lïef x SABS"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.h1,
            {
              initial: { opacity: 0, y: 35 },
              animate: show(heroInView),
              transition: { duration: 0.75, delay: 0.45, ease: ease$5 },
              className: "v2-headline leading-[0.95] mb-6 md:mb-8",
              style: { fontSize: "clamp(2.2rem, 5.5vw, 5rem)", letterSpacing: "-0.02em" },
              children: [
                "SABS™ TECHNOLOGY",
                /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "." }),
                /* @__PURE__ */ jsx("br", {}),
                /* @__PURE__ */ jsx("span", { style: { color: "var(--v2-neon)" }, children: "YOUR STRUCTURAL EDGE" }),
                /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "." })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            motion.p,
            {
              initial: { opacity: 0, y: 35 },
              animate: show(heroInView),
              transition: { duration: 0.75, delay: 0.6, ease: ease$5 },
              style: { fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1.1rem, 3vw, 1.4rem)", color: "var(--v2-muted)", lineHeight: 1.5 },
              children: "Our premier Structural Concrete Insulated Panel System. Faster. Stronger. Smarter."
            }
          ),
          /* @__PURE__ */ jsx(
            motion.p,
            {
              initial: { opacity: 0, y: 35 },
              animate: show(heroInView),
              transition: { duration: 0.75, delay: 0.75, ease: ease$5 },
              className: "mt-2 max-w-[560px]",
              style: { fontSize: "1.1rem", color: "var(--v2-dim)", lineHeight: 1.6 },
              children: "Fire-proof, mold-proof, termite-proof concrete structures with built-in R-75 to R-100 insulation. We deploy it through our proprietary Lïef Block™ components, engineered to bring this technology from blueprint to build."
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 35 },
              animate: show(heroInView),
              transition: { duration: 0.75, delay: 0.9, ease: ease$5 },
              className: "mt-5 md:mt-12 flex flex-wrap gap-3 md:gap-4",
              children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: openModal,
                    className: "transition-all duration-300 hover:brightness-110",
                    style: {
                      fontFamily: "var(--v2-font-body)",
                      fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
                      textTransform: "uppercase",
                      letterSpacing: "0.14em",
                      fontWeight: 600,
                      background: "var(--v2-neon)",
                      color: "var(--v2-deep)",
                      border: "none",
                      padding: "10px 24px",
                      cursor: "pointer"
                    },
                    children: "Get a Quote"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => {
                      var _a;
                      return (_a = document.querySelector("#what-section")) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
                    },
                    className: "transition-all duration-300 hover:bg-[#00FF88] hover:text-[#0a0a0a]",
                    style: {
                      fontFamily: "var(--v2-font-body)",
                      fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
                      textTransform: "uppercase",
                      letterSpacing: "0.14em",
                      fontWeight: 600,
                      background: "transparent",
                      color: "var(--v2-neon)",
                      border: "1px solid var(--v2-neon)",
                      padding: "10px 24px",
                      cursor: "pointer"
                    },
                    children: "Learn More"
                  }
                )
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2", children: [
          /* @__PURE__ */ jsx("span", { style: { fontSize: "1.25rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--v2-muted)" }, children: "Scroll" }),
          /* @__PURE__ */ jsx("div", { className: "w-px h-8 md:h-12", style: { background: "linear-gradient(to bottom, var(--v2-neon), transparent)" } })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { id: "what-section", className: "relative py-12 md:py-28", style: { background: "var(--v2-deep)", borderTop: "1px solid var(--v2-rule)" }, children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden", children: /* @__PURE__ */ jsx(motion.img, { src: dotsNeon, alt: "", className: "w-[176vw] max-w-[1512px] opacity-[0.01]", style: { scale: dotsScale } }) }),
        /* @__PURE__ */ jsx("div", { ref: whatRef, className: "relative z-10 max-w-[1400px] mx-auto px-6 md:px-12", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-12 items-center", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, y: 35 }, animate: show(whatInView), transition: { duration: 0.75, ease: ease$5 }, className: "v2-label mb-6", children: "The Technology" }),
            /* @__PURE__ */ jsxs(motion.h2, { initial: { opacity: 0, y: 35 }, animate: show(whatInView), transition: { duration: 0.75, delay: 0.08, ease: ease$5 }, className: "v2-headline text-3xl md:text-5xl lg:text-6xl mb-6", style: { color: "var(--v2-white)" }, children: [
              "WHAT IS SABS™",
              /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "?" })
            ] }),
            /* @__PURE__ */ jsx(motion.p, { initial: { opacity: 0, y: 35 }, animate: show(whatInView), transition: { duration: 0.75, delay: 0.16, ease: ease$5 }, className: "mb-6", style: { fontWeight: 300, fontSize: "1.25rem", color: "var(--v2-muted)", lineHeight: 1.8 }, children: "SABS (Saebi Alternative Building System) is a patented cementitious coating technology that transforms lightweight structural panels into fire-proof, mold-proof, termite-proof concrete structures. The result: a monolithic building envelope with zero flame spread, 260 MPH wind resistance, and built-in R-75 to R-100 insulation, exceeding every major structural and energy code in the industry." }),
            /* @__PURE__ */ jsx(motion.p, { initial: { opacity: 0, y: 35 }, animate: show(whatInView), transition: { duration: 0.75, delay: 0.24, ease: ease$5 }, style: { fontWeight: 300, fontSize: "1.25rem", color: "var(--v2-muted)", lineHeight: 1.8 }, children: "We deploy SABS through our proprietary Lïef Block™ components, precision-engineered EPS panels that form the structural core of walls, floors, and roofs. Once assembled and coated with the SABS compound, the system creates a seamless, reinforced concrete structure from the ground up." }),
            /* @__PURE__ */ jsx(motion.p, { initial: { opacity: 0, y: 35 }, animate: show(whatInView), transition: { duration: 0.75, delay: 0.32, ease: ease$5 }, className: "mt-6", style: { fontWeight: 300, fontSize: "1.25rem", color: "var(--v2-muted)", lineHeight: 1.8 }, children: "We build across the full construction spectrum — wood frame, steel, and advanced modular — and we've incorporated SABS into our methods because its structural properties are simply unmatched. For our clients, that means another high-performance option and a builder equipped to match the right system to every project." })
          ] }),
          /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, y: 35 }, animate: show(whatInView), transition: { duration: 0.75, delay: 0.4, ease: ease$5 }, className: "hidden md:flex justify-center items-center", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-[420px]", children: [
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-3 mb-5", children: Array.from({ length: 12 }).map((_, i) => /* @__PURE__ */ jsx(
              "div",
              {
                className: "transition-all duration-500",
                style: {
                  aspectRatio: "2/1",
                  border: `1px solid ${accentColor$1}`,
                  background: "rgba(0,255,136,.05)"
                },
                onMouseEnter: (e) => {
                  e.currentTarget.style.background = "rgba(0,255,136,.2)";
                  e.currentTarget.style.boxShadow = `0 0 20px rgba(0,255,136,.15)`;
                },
                onMouseLeave: (e) => {
                  e.currentTarget.style.background = "rgba(0,255,136,.05)";
                  e.currentTarget.style.boxShadow = "none";
                }
              },
              i
            )) }),
            /* @__PURE__ */ jsxs("div", { className: "text-center", style: { letterSpacing: "0.12em", textTransform: "uppercase", color: accentColor$1 }, children: [
              /* @__PURE__ */ jsx("p", { style: { fontSize: "1.05rem", fontWeight: 600 }, children: "Lïef EPS Core x SABS Coating" }),
              /* @__PURE__ */ jsx("p", { style: { fontSize: "1.05rem", fontWeight: 600 }, children: "= Structural Concrete" })
            ] })
          ] }) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "relative py-12 md:py-28", style: { background: "#006B3F" }, children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 top-0 h-[40%] pointer-events-none", style: { background: "linear-gradient(180deg, rgba(0,0,0,.12), transparent)" } }),
        /* @__PURE__ */ jsxs("div", { ref: statsRef, className: "relative z-10 max-w-[1400px] mx-auto px-6 md:px-12", children: [
          /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, y: 35 }, animate: show(statsInView), transition: { duration: 0.75, ease: ease$5 }, className: "mb-6", style: { fontSize: "1.25rem", textTransform: "uppercase", letterSpacing: "0.22em", color: "rgba(0,255,136,.6)" }, children: "Performance" }),
          /* @__PURE__ */ jsxs(motion.h2, { initial: { opacity: 0, y: 35 }, animate: show(statsInView), transition: { duration: 0.75, delay: 0.08, ease: ease$5 }, className: "v2-headline text-4xl md:text-6xl lg:text-7xl mb-6", style: { color: "var(--v2-white)" }, children: [
            "WE BUILD",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsxs("span", { style: { color: "var(--v2-neon)" }, children: [
              "SMARTER",
              /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "." })
            ] })
          ] }),
          /* @__PURE__ */ jsx(motion.p, { initial: { opacity: 0, y: 35 }, animate: show(statsInView), transition: { duration: 0.75, delay: 0.16, ease: ease$5 }, className: "max-w-[550px] mb-20", style: { fontWeight: 300, fontSize: "1.25rem", color: "rgba(245,245,243,.7)", lineHeight: 1.8 }, children: "Arizona's #1 SABS-trained builder. Lïef Blocks with SABS Technology radically reduces the number of trades required on-site, allowing for total schedule control and unprecedented quality consistency." }),
          /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, y: 35 }, animate: show(statsInView), transition: { duration: 0.75, delay: 0.24, ease: ease$5 }, className: "grid grid-cols-1 sm:grid-cols-2 gap-px mb-px", children: attributes.map((attr) => {
            const Icon = attr.icon;
            return /* @__PURE__ */ jsxs(
              "div",
              {
                className: "p-6 md:p-8 transition-all duration-500 group",
                style: { border: "1px solid rgba(245,245,243,.08)", background: "rgba(0,0,0,.15)" },
                onMouseEnter: (e) => e.currentTarget.style.boxShadow = `0 0 40px rgba(0,255,136,.12), inset 0 1px 0 ${accentColor$1}40`,
                onMouseLeave: (e) => e.currentTarget.style.boxShadow = "none",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "w-14 h-14 flex items-center justify-center mb-5", style: { border: `1px solid ${accentColor$1}40` }, children: /* @__PURE__ */ jsx(Icon, { size: 32, style: { color: accentColor$1 } }) }),
                  /* @__PURE__ */ jsx("h4", { className: "mb-3", style: { fontSize: "1.25rem", fontWeight: 600, color: accentColor$1, textTransform: "uppercase" }, children: attr.title }),
                  /* @__PURE__ */ jsx("p", { style: { fontSize: "1.25rem", color: "rgba(245,245,243,.6)", lineHeight: 1.6 }, children: attr.desc })
                ]
              },
              attr.title
            );
          }) }),
          /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, y: 35 }, animate: show(statsInView), transition: { duration: 0.75, delay: 0.32, ease: ease$5 }, className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px", children: stats.map((stat) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: "p-6 md:p-8 transition-all duration-500",
              style: { border: "1px solid rgba(245,245,243,.08)", background: "rgba(0,0,0,.15)" },
              onMouseEnter: (e) => e.currentTarget.style.boxShadow = `0 0 40px rgba(0,255,136,.12), inset 0 1px 0 ${accentColor$1}40`,
              onMouseLeave: (e) => e.currentTarget.style.boxShadow = "none",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "v2-headline mb-1", style: { fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--v2-white)" }, children: [
                  stat.value,
                  /* @__PURE__ */ jsx("span", { style: { fontSize: "0.5em", fontWeight: 400 }, children: stat.suffix })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "mb-2", style: { fontSize: "1rem", textTransform: "uppercase", color: "var(--v2-white)", letterSpacing: "0.1em", fontWeight: 600 }, children: stat.label }),
                /* @__PURE__ */ jsx("div", { style: { fontSize: "1rem", color: "rgba(245,245,243,.55)", lineHeight: 1.5 }, children: stat.desc })
              ]
            },
            stat.label
          )) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "relative py-12 md:py-28", style: { background: "var(--v2-deep)" }, children: [
        /* @__PURE__ */ jsx(motion.div, { className: "v2-ghost-text hidden lg:block top-32 right-8", style: { fontSize: "min(10vw, 140px)", color: "rgba(0,255,136,.04)", y: ghostTextY }, children: "CERTIFIED" }),
        /* @__PURE__ */ jsxs("div", { ref: techRef, className: "relative z-10 max-w-[1400px] mx-auto px-6 md:px-12", children: [
          /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, y: 35 }, animate: show(techInView), transition: { duration: 0.75, ease: ease$5 }, className: "v2-label mb-6", children: "Certified Technicals" }),
          /* @__PURE__ */ jsxs(motion.h2, { initial: { opacity: 0, y: 35 }, animate: show(techInView), transition: { duration: 0.75, delay: 0.08, ease: ease$5 }, className: "v2-headline text-4xl md:text-6xl lg:text-7xl mb-6", style: { color: "var(--v2-white)" }, children: [
            "ICC/ES",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsxs("span", { style: { color: "var(--v2-neon)" }, children: [
              "APPROVED",
              /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "." })
            ] })
          ] }),
          /* @__PURE__ */ jsx(motion.p, { initial: { opacity: 0, y: 35 }, animate: show(techInView), transition: { duration: 0.75, delay: 0.16, ease: ease$5 }, className: "max-w-[600px] mb-16", style: { fontWeight: 300, fontSize: "1.25rem", color: "var(--v2-muted)", lineHeight: 1.8 }, children: "Every component of the LÏEF Blocks system is tested, certified, and code-compliant. No shortcuts. No workarounds." }),
          /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, y: 35 }, animate: show(techInView), transition: { duration: 0.75, delay: 0.24, ease: ease$5 }, className: "grid grid-cols-1 md:grid-cols-2 gap-px", children: technicals.map((tech, i) => {
            const Icon = technicalIcons[i];
            return /* @__PURE__ */ jsxs(
              "div",
              {
                className: "flex items-start gap-5 p-6 md:p-8 transition-all duration-500",
                style: { border: "1px solid var(--v2-rule)", background: "rgba(0,255,136,.01)" },
                onMouseEnter: (e) => {
                  e.currentTarget.style.borderColor = `${accentColor$1}40`;
                  e.currentTarget.style.background = "rgba(0,255,136,.03)";
                },
                onMouseLeave: (e) => {
                  e.currentTarget.style.borderColor = "var(--v2-rule)";
                  e.currentTarget.style.background = "rgba(0,255,136,.01)";
                },
                children: [
                  /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 w-10 h-10 flex items-center justify-center mt-1", style: { border: `1px solid ${accentColor$1}30` }, children: /* @__PURE__ */ jsx(Icon, { size: 20, style: { color: accentColor$1 } }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h4", { className: "mb-2", style: { fontWeight: 600, fontSize: "1.1rem", color: "var(--v2-white)" }, children: tech.title }),
                    /* @__PURE__ */ jsx("p", { style: { fontSize: "1rem", color: "var(--v2-dim)", lineHeight: 1.6 }, children: tech.detail })
                  ] })
                ]
              },
              tech.title
            );
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "relative py-12 md:py-28", style: { background: "var(--v2-deep)", borderTop: "1px solid var(--v2-rule)" }, children: /* @__PURE__ */ jsxs("div", { ref: vidRef, className: "relative z-10 max-w-[1400px] mx-auto px-6 md:px-12", children: [
        /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, y: 35 }, animate: show(vidInView), transition: { duration: 0.75, ease: ease$5 }, className: "v2-label mb-6", children: "See It Built" }),
        /* @__PURE__ */ jsxs(motion.h2, { initial: { opacity: 0, y: 35 }, animate: show(vidInView), transition: { duration: 0.75, delay: 0.08, ease: ease$5 }, className: "v2-headline text-4xl md:text-5xl mb-12", style: { color: "var(--v2-white)" }, children: [
          "HOW IT WORKS",
          /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "." })
        ] }),
        /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, y: 35 }, animate: show(vidInView), transition: { duration: 0.75, delay: 0.16, ease: ease$5 }, className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
          { id: "aQFVqs_XrEY", title: "SABS Start to Finish Process", scale: "1" },
          { id: "vXAN6usiCGg", title: "Timelapse of SABS Texas Project", scale: "1.35" }
        ].map((vid) => /* @__PURE__ */ jsx("div", { className: "relative w-full", style: { aspectRatio: "16/9", border: "1px solid var(--v2-rule)", overflow: "hidden" }, children: playingVideo === vid.id ? /* @__PURE__ */ jsx(
          "iframe",
          {
            src: `https://www.youtube.com/embed/${vid.id}?autoplay=1&rel=0`,
            title: vid.title,
            allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
            allowFullScreen: true,
            className: "absolute inset-0 w-full h-full",
            style: { border: "none" }
          }
        ) : /* @__PURE__ */ jsxs(
          "div",
          {
            onClick: () => setPlayingVideo(vid.id),
            className: "group cursor-pointer absolute inset-0 w-full h-full",
            children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: `https://img.youtube.com/vi/${vid.id}/maxresdefault.jpg`,
                  alt: vid.title,
                  className: "absolute inset-0 w-full h-full object-cover transition-all duration-700",
                  style: {
                    filter: "grayscale(100%)",
                    opacity: 0.6,
                    transform: `scale(${vid.scale})`
                  },
                  onMouseEnter: (e) => {
                    e.currentTarget.style.filter = "grayscale(0%)";
                    e.currentTarget.style.opacity = "1";
                    e.currentTarget.style.transform = `scale(${parseFloat(vid.scale) + 0.1})`;
                  },
                  onMouseLeave: (e) => {
                    e.currentTarget.style.filter = "grayscale(100%)";
                    e.currentTarget.style.opacity = "0.6";
                    e.currentTarget.style.transform = `scale(${vid.scale})`;
                  }
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none", children: /* @__PURE__ */ jsx(
                "svg",
                {
                  viewBox: "0 0 100 100",
                  fill: "none",
                  className: "w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20 lg:w-[100px] lg:h-[100px] transition-all duration-500",
                  style: { filter: "drop-shadow(0 6px 20px rgba(0,0,0,0.7))" },
                  ref: (el) => {
                    if (!el) return;
                    const parent = el.closest(".group");
                    if (!parent) return;
                    parent.addEventListener("mouseenter", () => {
                      el.style.filter = "drop-shadow(0 0 30px rgba(0,255,136,0.6)) drop-shadow(0 6px 20px rgba(0,0,0,0.7))";
                      el.style.transform = "scale(1.15)";
                    });
                    parent.addEventListener("mouseleave", () => {
                      el.style.filter = "drop-shadow(0 6px 20px rgba(0,0,0,0.7))";
                      el.style.transform = "scale(1)";
                    });
                  },
                  children: /* @__PURE__ */ jsx("polygon", { points: "34,18 34,82 84,50", fill: "var(--v2-neon)" })
                }
              ) })
            ]
          }
        ) }, vid.id)) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "relative py-12 md:py-28", style: { background: "var(--v2-deep)", borderTop: "1px solid var(--v2-rule)" }, children: /* @__PURE__ */ jsx("div", { ref: calcRef, className: "relative z-10 max-w-[1400px] mx-auto px-6 md:px-12", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start", children: [
        /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, y: 35 }, animate: show(calcInView), transition: { duration: 0.75, ease: ease$5 }, children: [
          /* @__PURE__ */ jsx("div", { className: "v2-label mb-6", children: "Savings Calculator" }),
          /* @__PURE__ */ jsxs("h2", { className: "v2-headline text-4xl md:text-6xl lg:text-7xl mb-6", style: { color: "var(--v2-white)" }, children: [
            "SEE THE",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { style: { color: "var(--v2-neon)" }, children: "DIFFERENCE" }),
            /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "." })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "max-w-md", style: { fontWeight: 300, fontSize: "1.25rem", color: "var(--v2-muted)", lineHeight: 1.8 }, children: "Estimate your project savings with LÏEF Blocks compared to traditional construction." })
        ] }),
        /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, y: 35 }, animate: show(calcInView), transition: { duration: 0.75, delay: 0.08, ease: ease$5 }, className: "p-8 md:p-10", style: { border: "1px solid var(--v2-rule)", background: "rgba(0,255,136,.01)" }, children: [
          /* @__PURE__ */ jsx("label", { className: "block mb-2", style: { fontSize: "1rem", color: "var(--v2-dim)", letterSpacing: "0.05em" }, children: "Project Type" }),
          /* @__PURE__ */ jsx(
            "select",
            {
              value: projectType,
              onChange: (e) => setProjectType(e.target.value),
              className: "w-full mb-6 p-3 outline-none transition-colors duration-300 focus:border-[#00FF88]",
              style: { background: "var(--v2-deep)", border: "1px solid rgba(255,255,255,.15)", color: "var(--v2-white)", fontFamily: "var(--v2-font-body)", fontSize: "1rem" },
              children: Object.keys(projectTypes).map((t) => /* @__PURE__ */ jsx("option", { value: t, children: t }, t))
            }
          ),
          /* @__PURE__ */ jsxs("label", { className: "block mb-2", style: { fontSize: "1rem", color: "var(--v2-dim)", letterSpacing: "0.05em" }, children: [
            "Square Footage: ",
            /* @__PURE__ */ jsxs("span", { style: { color: accentColor$1, fontWeight: 600 }, children: [
              sqft.toLocaleString(),
              " sq ft"
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "range",
              min: 1e3,
              max: 1e5,
              step: 500,
              value: sqft,
              onChange: (e) => setSqft(Number(e.target.value)),
              className: "w-full mb-8",
              style: { accentColor: accentColor$1 }
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-6 pt-6", style: { borderTop: "1px solid rgba(255,255,255,.1)" }, children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: "v2-headline mb-1", style: { fontSize: "clamp(1.5rem, 3vw, 2.2rem)", color: accentColor$1 }, children: [
                "$",
                totalSavings.toLocaleString()
              ] }),
              /* @__PURE__ */ jsx("div", { style: { fontSize: "1rem", color: "var(--v2-dim)" }, children: "Estimated Savings" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: "v2-headline mb-1", style: { fontSize: "clamp(1.5rem, 3vw, 2.2rem)", color: accentColor$1 }, children: [
                savingsPercent,
                "%"
              ] }),
              /* @__PURE__ */ jsx("div", { style: { fontSize: "1rem", color: "var(--v2-dim)" }, children: "Cost Reduction" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-4", style: { fontSize: "1rem", color: "var(--v2-dim)", fontStyle: "italic", opacity: 0.7 }, children: "*Estimates based on average project data. Actual savings vary by project scope, location, and specifications." })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsx("section", { className: "relative py-12 md:py-20", style: { background: "var(--v2-deep)", borderTop: "1px solid var(--v2-rule)" }, children: /* @__PURE__ */ jsxs("div", { ref: pressRef, className: "relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 text-center", children: [
        /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, y: 35 }, animate: show(pressInView), transition: { duration: 0.75, ease: ease$5 }, className: "v2-label mb-12", children: "As Featured In" }),
        /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, y: 35 }, animate: show(pressInView), transition: { duration: 0.75, delay: 0.08, ease: ease$5 }, className: "flex flex-wrap justify-center items-center gap-8 md:gap-12 mb-20", children: pressOutlets.map((outlet) => /* @__PURE__ */ jsx(
          "img",
          {
            src: outlet.src,
            alt: outlet.name,
            className: "v2-press-logo",
            style: { height: "48px", width: "auto", objectFit: "contain" }
          },
          outlet.name
        )) }),
        /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, y: 35 }, animate: show(pressInView), transition: { duration: 0.75, delay: 0.16, ease: ease$5 }, className: "v2-label mb-10", children: "Trusted By Industry Leaders" }),
        /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, y: 35 }, animate: show(pressInView), transition: { duration: 0.75, delay: 0.24, ease: ease$5 }, className: "flex flex-wrap justify-center items-center gap-10 md:gap-14", children: trustLogos.map((logo) => /* @__PURE__ */ jsx(
          "img",
          {
            src: logo.src,
            alt: logo.name,
            className: "v2-partner-logo",
            style: { height: "60px", width: "auto", objectFit: "contain" }
          },
          logo.name
        )) })
      ] }) }),
      /* @__PURE__ */ jsxs("section", { className: "relative py-16 md:py-28", style: { background: "var(--v2-black)", borderTop: "1px solid var(--v2-rule)" }, children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-px", style: { height: "100px", background: `linear-gradient(to bottom, ${accentColor$1}, transparent)` } }),
        /* @__PURE__ */ jsxs("div", { ref: ctaRef, className: "relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 text-center flex flex-col items-center", children: [
          /* @__PURE__ */ jsxs(motion.h2, { initial: { opacity: 0, y: 35 }, animate: show(ctaInView), transition: { duration: 0.75, ease: ease$5 }, className: "v2-headline mb-6", style: { fontSize: "clamp(3rem, 6vw, 5rem)", color: "var(--v2-white)", lineHeight: 1.2 }, children: [
            "BUILD WITH US",
            /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "." })
          ] }),
          /* @__PURE__ */ jsx(motion.p, { initial: { opacity: 0, y: 35 }, animate: show(ctaInView), transition: { duration: 0.75, delay: 0.08, ease: ease$5 }, className: "mb-10 max-w-[420px]", style: { fontWeight: 300, fontSize: "1.3rem", color: "var(--v2-muted)", lineHeight: 1.7 }, children: "Whether you're a developer, builder, or investor, let's talk about how LÏEF x SABS can transform your next project." }),
          /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, y: 35 }, animate: show(ctaInView), transition: { duration: 0.75, delay: 0.16, ease: ease$5 }, className: "flex flex-wrap justify-center gap-4", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: openModal,
                className: "inline-block transition-all duration-300 hover:brightness-110",
                style: {
                  fontFamily: "var(--v2-font-body)",
                  fontSize: "1.1rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  fontWeight: 600,
                  background: accentColor$1,
                  color: "var(--v2-deep)",
                  padding: "16px 40px",
                  border: "none",
                  cursor: "pointer"
                },
                children: "Start a Conversation"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: openModal,
                className: "inline-block transition-all duration-300 hover:bg-[#00FF88] hover:text-[#0a0a0a]",
                style: {
                  fontFamily: "var(--v2-font-body)",
                  fontSize: "1.1rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  color: accentColor$1,
                  border: `1px solid ${accentColor$1}`,
                  padding: "16px 40px",
                  background: "transparent",
                  cursor: "pointer"
                },
                children: "Contact Us"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: show(ctaInView, 20), transition: { duration: 0.75, delay: 0.24, ease: ease$5 }, className: "flex flex-wrap justify-center gap-12 mt-16", children: [
            /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsx("div", { style: { fontSize: "1rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--v2-dim)", marginBottom: "8px" }, children: "Email" }),
              /* @__PURE__ */ jsx("a", { href: "mailto:hello@liefdev.com", style: { fontSize: "1rem", color: "var(--v2-muted)", textDecoration: "none" }, className: "hover:text-[#00FF88] transition-colors", children: "hello@liefdev.com" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsx("div", { style: { fontSize: "1rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--v2-dim)", marginBottom: "8px" }, children: "Location" }),
              /* @__PURE__ */ jsx("span", { style: { fontSize: "1rem", color: "var(--v2-muted)" }, children: "Phoenix, Arizona" })
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(V2Footer, {})
  ] });
};
const osbornImg = "/assets/301-osborn-CdJDg9di.png";
const canyonImg = "/assets/canyon-corporate-DyhEcC9H.jpg";
const silverImg = "/assets/silver-mountain-BVPniM1P.jpg";
const basinImg = "/assets/pahrump-basin-D0rEQl1L.jpg";
const vailImg = "/assets/the-vail-CsEKpHIO.png";
const ease$4 = [0.16, 1, 0.3, 1];
const accentColor = "#00FF88";
const projects = [
  {
    img: osbornImg,
    name: "301 W Osborn",
    type: "Adaptive Reuse",
    desc: "Commercial to residential conversion. 23 luxury urban units with secure parking & conditioned storage. Full SABS build.",
    location: "Midtown, Phoenix AZ",
    status: "SABS Showcase",
    featured: true
  },
  {
    img: vailImg,
    name: "The Vail",
    type: "Boutique 55+ Community",
    desc: "The Southwest’s premier boutique community where discerning adults trade square footage for more time, freedom, and the memories that matter.",
    location: "Arizona",
    status: "In Design",
    featured: false,
    zoom: 1.1
  },
  {
    img: canyonImg,
    name: "Canyon Corporate Plaza",
    type: "Office-to-Residential",
    desc: "14-story conversion from commercial office to modern residential. SABS cementitious coating system throughout.",
    location: "Phoenix, AZ",
    status: "In Development",
    featured: false
  },
  {
    img: silverImg,
    name: "Silver Mountain Ranches",
    type: "Equestrian Community",
    desc: "100+ acre equestrian community with luxury custom homes built using Lïef Blocks with SABS Technology.",
    location: "Scottsdale, AZ",
    status: "In Development",
    featured: false
  },
  {
    img: basinImg,
    name: "440 Basin Avenue",
    type: "Multi-Family",
    desc: "204-unit multi-family development. $56M savings vs. traditional construction methods.",
    location: "Pahrump, NV",
    status: "In Development",
    featured: false
  }
];
const ProjectsPage = () => {
  const { ref: projRef, inView: projInView } = useInView$1(0.1);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "v2 min-h-screen overflow-x-hidden", children: [
    /* @__PURE__ */ jsx(V2Nav, {}),
    /* @__PURE__ */ jsx("main", { className: "pt-16 md:pt-20", children: /* @__PURE__ */ jsxs("section", { className: "relative overflow-hidden py-12 md:py-28", style: { background: "var(--v2-deep)" }, children: [
      /* @__PURE__ */ jsx("div", { className: "v2-ghost-text hidden lg:block top-8 right-8 text-right", style: { fontSize: "min(9vw, 110px)", color: "rgba(0,107,63,.24)" }, children: "PROJECTS" }),
      /* @__PURE__ */ jsxs("div", { ref: projRef, className: "relative z-10 max-w-[1400px] mx-auto px-6 md:px-12", children: [
        /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, y: 35 }, animate: projInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }, transition: { duration: 0.75, ease: ease$4 }, className: "v2-label mb-6", children: "Current In Process" }),
        /* @__PURE__ */ jsxs(motion.h2, { initial: { opacity: 0, y: 35 }, animate: projInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }, transition: { duration: 0.75, delay: 0.08, ease: ease$4 }, className: "v2-headline text-4xl md:text-6xl lg:text-7xl mb-16", style: { color: "var(--v2-white)" }, children: [
          "THE WORK",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsxs("span", { style: { color: "var(--v2-neon)" }, children: [
            "SPEAKS",
            /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "." })
          ] })
        ] }),
        projects.filter((p) => p.featured).map((proj) => /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, y: 35 }, animate: projInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }, transition: { duration: 0.75, delay: 0.16, ease: ease$4 }, className: "relative overflow-hidden group mb-px", style: { minHeight: "520px", border: `2px solid ${accentColor}` }, children: [
          /* @__PURE__ */ jsx("img", { src: proj.img, alt: proj.name, className: "absolute inset-0 w-full h-full object-cover brightness-[.5] transition-all duration-700 group-hover:brightness-[.65]" }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0", style: { background: "linear-gradient(to top, rgba(10,10,10,.95) 0%, rgba(10,10,10,.2) 50%, transparent 100%)" } }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-4 left-4 z-10", children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 px-4 py-2", style: { background: accentColor, fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#0a0a0a", fontWeight: 700 }, children: [
            /* @__PURE__ */ jsx("span", { style: { width: "6px", height: "6px", borderRadius: "50%", background: "#0a0a0a", display: "inline-block" } }),
            "Featured — ",
            proj.status
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "absolute bottom-0 left-0 p-10 z-10", children: [
            /* @__PURE__ */ jsx("h3", { className: "v2-headline text-3xl md:text-4xl mb-2", style: { color: "var(--v2-white)" }, children: proj.name }),
            /* @__PURE__ */ jsx("p", { className: "mb-3", style: { fontSize: "1rem", color: accentColor, letterSpacing: "0.05em", fontWeight: 600 }, children: proj.type }),
            /* @__PURE__ */ jsx("p", { className: "max-w-2xl mb-4", style: { fontSize: "1.1rem", color: "var(--v2-muted)", lineHeight: 1.7 }, children: proj.desc }),
            /* @__PURE__ */ jsx("p", { style: { fontSize: "0.85rem", color: "var(--v2-dim)" }, children: proj.location })
          ] })
        ] }, proj.name)),
        /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, y: 35 }, animate: projInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }, transition: { duration: 0.75, delay: 0.24, ease: ease$4 }, className: "grid grid-cols-1 md:grid-cols-2 gap-px", children: projects.filter((p) => !p.featured).map((proj) => /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden group", style: { minHeight: "380px", border: "1px solid var(--v2-rule)" }, children: [
          /* @__PURE__ */ jsx("img", { src: proj.img, alt: proj.name, className: "absolute inset-0 w-full h-full object-cover grayscale brightness-[.4] transition-all duration-700 group-hover:grayscale-0 group-hover:brightness-[.6]", style: proj.zoom ? { transform: `scale(${proj.zoom})` } : void 0 }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0", style: { background: "linear-gradient(to top, rgba(10,10,10,.95) 0%, rgba(10,10,10,.3) 60%, transparent 100%)" } }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-4 left-4 z-10", children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 px-3 py-1.5", style: { background: "rgba(0,0,0,.8)", border: `1px solid ${accentColor}`, fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: accentColor }, children: [
            /* @__PURE__ */ jsx("span", { style: { width: "6px", height: "6px", borderRadius: "50%", background: accentColor, display: "inline-block" } }),
            proj.status
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "absolute bottom-0 left-0 p-8 z-10", children: [
            /* @__PURE__ */ jsx("h3", { className: "v2-headline text-xl md:text-2xl mb-1", style: { color: "var(--v2-white)" }, children: proj.name }),
            /* @__PURE__ */ jsx("p", { className: "mb-2", style: { fontSize: "0.9rem", color: accentColor, letterSpacing: "0.05em" }, children: proj.type }),
            /* @__PURE__ */ jsx("p", { className: "max-w-md mb-3", style: { fontSize: "0.95rem", color: "var(--v2-muted)", lineHeight: 1.6 }, children: proj.desc }),
            /* @__PURE__ */ jsx("p", { style: { fontSize: "0.8rem", color: "var(--v2-dim)" }, children: proj.location })
          ] })
        ] }, proj.name)) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(V2Footer, {})
  ] });
};
const jesseImg = "/assets/jesse-BvmC-zU5.png";
const jimmyImg = "/assets/jimmy-CZHHyNsx.png";
const jonImg = "/assets/jon-DO9kS6Xt.png";
const scottImg = "/assets/scott-CvJLIS_C.png";
const nickImg = "/assets/nick-BsE5dslA.png";
const hiblerImg = "/assets/hibler-BgJghIbC.png";
const taniaImg = "/assets/tania-AUiY003V.png";
const alexImg = "/assets/alex-DsAfsEfG.png";
const ease$3 = [0.16, 1, 0.3, 1];
const principals = [
  { name: "Jesse Fowler", role: "Principal / Manager", cred: "25+ Yrs in Design, Build & Development", img: jesseImg, zoom: 1.32 },
  { name: "Jon Armstrong", role: "Principal / Manager", cred: "15+ Yrs in Custom Residential & Commercial Building", img: jonImg, zoom: 1.32 },
  { name: "Jimmy Khounlavong", role: "Principal / Creative", cred: "25+ Yrs of Brand, Product & Marketplace Strategy", img: jimmyImg, zoom: 1.1 }
];
const row2 = [
  { name: "Scott Meiers", role: "Chief Architectural Design", cred: "40+ Yrs of Architectural Design in Commercial & Residential", img: scottImg, zoom: 1.71, originY: "0%" },
  { name: "Tania Karenina Gonzalez", role: "Architectural & Interior Design", cred: "15+ Yrs of Multi-residential Commercial & Interior Design", img: taniaImg }
];
const row3 = [
  { name: "Nick Scavio", role: "General Counsel", cred: "15+ Yrs of Business Law, >$100M In Transactions Closed", img: nickImg, zoom: 1.12, originY: "0%" },
  { name: "Scott Hibler", role: "Real Estate / B2B Partnerships", cred: "20+ Yrs of Sales & Investment Strategy", img: hiblerImg, zoom: 1.2, originY: "3%" },
  { name: "Alex Prince", role: "Investor Relations", cred: "20+ Yrs of Institutional Asset Mgmt. & Investment Banking", img: alexImg, zoom: 1.6, originY: "22%" }
];
const Portrait = ({ member, delay, size = 180 }) => /* @__PURE__ */ jsxs(
  motion.div,
  {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: ease$3 },
    className: "flex flex-col items-center text-center group",
    children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "relative overflow-hidden mb-5",
          style: { width: size, height: size * 1.2, border: "2px solid rgba(0,255,136,.15)" },
          children: /* @__PURE__ */ jsx(
            "img",
            {
              src: member.img,
              alt: member.name,
              className: "w-full h-full object-cover object-top grayscale brightness-[.5] transition-all duration-700 group-hover:grayscale-0 group-hover:brightness-[.85]",
              style: { transform: `scale(${member.zoom ?? 1.15})`, transformOrigin: `center ${member.originY ?? "15%"}` }
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(
        "h4",
        {
          className: "v2-headline mb-1",
          style: { fontSize: "1.25rem", color: "var(--v2-white)", letterSpacing: "0.05em" },
          children: member.name
        }
      ),
      /* @__PURE__ */ jsx(
        "p",
        {
          className: "mb-2 v2-headline",
          style: { fontSize: "1.25rem", color: "var(--v2-neon)", letterSpacing: "0.05em" },
          children: member.role
        }
      ),
      /* @__PURE__ */ jsx("p", { style: { fontSize: "1.25rem", color: "var(--v2-muted)", lineHeight: 1.5, maxWidth: 220 }, children: member.cred })
    ]
  }
);
const TeamPage = () => {
  const { ref, inView } = useInView$1(0.1);
  return /* @__PURE__ */ jsxs("div", { className: "v2 min-h-screen overflow-x-hidden", children: [
    /* @__PURE__ */ jsx(V2Nav, {}),
    /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsxs("section", { className: "relative pt-32 pb-12 md:pt-40 md:pb-28", style: { background: "var(--v2-deep)" }, children: [
      /* @__PURE__ */ jsx("div", { className: "v2-ghost-text hidden lg:block top-32 right-8", style: { fontSize: "min(9.6vw, 120px)", color: "rgba(0,255,136,.23)" }, children: "TEAM" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden", children: /* @__PURE__ */ jsx("img", { src: dotsNeon, alt: "", className: "w-[176vw] max-w-[1512px] opacity-[0.01]" }) }),
      /* @__PURE__ */ jsx("div", { ref, className: "relative z-10 max-w-[1400px] mx-auto px-6 md:px-12", children: inView && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, y: 35 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.75, ease: ease$3 }, className: "v2-label mb-6", children: "The Team" }),
        /* @__PURE__ */ jsxs(motion.h2, { initial: { opacity: 0, y: 35 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.75, delay: 0.08, ease: ease$3 }, className: "v2-headline text-4xl md:text-6xl lg:text-7xl mb-4", style: { color: "var(--v2-white)" }, children: [
          "BIG IDEAS",
          /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "." }),
          /* @__PURE__ */ jsx("br", {}),
          "BIGGER TEAM",
          /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "." })
        ] }),
        /* @__PURE__ */ jsx(motion.p, { initial: { opacity: 0, y: 35 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.75, delay: 0.16, ease: ease$3 }, className: "mb-20", style: { fontStyle: "italic", fontWeight: 300, fontSize: "1.375rem", color: "var(--v2-muted)", maxWidth: "550px", lineHeight: 1.7 }, children: "The entire chain — design, construction, development, brand — one team, no gaps." }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-12 md:gap-16 mb-20", children: principals.map((m, i) => /* @__PURE__ */ jsx(Portrait, { member: m, delay: 0.24 + i * 0.08, size: 200 }, m.name)) }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-8 md:gap-12 mb-20", children: row2.map((m, i) => /* @__PURE__ */ jsx(Portrait, { member: m, delay: 0.5 + i * 0.06, size: 150 }, m.name)) }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-8 md:gap-12", children: row3.map((m, i) => /* @__PURE__ */ jsx(Portrait, { member: m, delay: 0.62 + i * 0.06, size: 150 }, m.name)) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx(V2Footer, {})
  ] });
};
const ease$2 = [0.16, 1, 0.3, 1];
const aiCapabilities = [
  "Change Order Management & Negotiation",
  "Plan & Specification Clarification",
  "Estimating Verification & Audit",
  "Budget Tracking & Variance Analysis",
  "Schedule Optimization & Monitoring",
  "Document Analysis & Compliance Review",
  "Vendor & Material Price Verification",
  "Insurance Claim Documentation"
];
const AISection = () => {
  const { ref, inView } = useInView$1(0.1);
  return /* @__PURE__ */ jsx("section", { id: "technology", className: "relative py-20 md:py-28", style: { background: "var(--v2-deep)" }, children: /* @__PURE__ */ jsx("div", { ref, className: "relative z-10 max-w-[1400px] mx-auto px-6 md:px-12", children: /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 35 },
        animate: inView ? { opacity: 1, y: 0 } : false,
        transition: { duration: 0.75, ease: ease$2 },
        className: "relative mb-12",
        children: [
          /* @__PURE__ */ jsx("div", { className: "v2-ghost-text absolute top-0 right-0 md:-right-6", style: { fontSize: "min(9.6vw, 120px)", lineHeight: 1, color: "rgba(0,107,63,.24)" }, children: "TECH" }),
          /* @__PURE__ */ jsx("div", { className: "v2-label mb-6", children: "The Edge" }),
          /* @__PURE__ */ jsxs("h2", { className: "v2-headline text-4xl md:text-6xl lg:text-7xl mb-4", style: { color: "var(--v2-white)" }, children: [
            "AI-POWERED",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { style: { color: "var(--v2-neon)" }, children: "OVERSIGHT" }),
            /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "." })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          motion.p,
          {
            initial: { opacity: 0, y: 25 },
            animate: inView ? { opacity: 1, y: 0 } : false,
            transition: { duration: 0.75, delay: 0.1, ease: ease$2 },
            className: "mb-4",
            style: { fontSize: "1.1rem", color: "var(--v2-muted)", lineHeight: 1.7 },
            children: "Our team is heavily trained in the latest artificial intelligence and machine learning tools. You're not just getting human expertise. You're armed with an AI agent team that accelerates every phase of your project."
          }
        ),
        /* @__PURE__ */ jsx(
          motion.p,
          {
            initial: { opacity: 0, y: 25 },
            animate: inView ? { opacity: 1, y: 0 } : false,
            transition: { duration: 0.75, delay: 0.15, ease: ease$2 },
            className: "mb-8",
            style: { fontSize: "1.1rem", color: "var(--v2-dim)", lineHeight: 1.7 },
            children: "From automated change order analysis to real-time budget tracking, our AI tools catch discrepancies that manual review misses, faster and with greater precision."
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 25 },
            animate: inView ? { opacity: 1, y: 0 } : false,
            transition: { duration: 0.75, delay: 0.2, ease: ease$2 },
            className: "grid grid-cols-1 sm:grid-cols-2 gap-x-8",
            children: aiCapabilities.map((item) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 py-3", style: { borderBottom: "1px solid var(--v2-rule)" }, children: [
              /* @__PURE__ */ jsx(Check, { size: 16, style: { color: "var(--v2-neon)", flexShrink: 0, marginTop: 4 } }),
              /* @__PURE__ */ jsx("span", { style: { fontSize: "1rem", color: "var(--v2-white)" }, children: item })
            ] }, item))
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 35 },
          animate: inView ? { opacity: 1, y: 0 } : false,
          transition: { duration: 0.75, delay: 0.25, ease: ease$2 },
          className: "flex flex-col gap-6",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "p-8 md:p-10", style: { background: "var(--v2-green)", border: "1px solid rgba(0,255,136,.1)" }, children: [
              /* @__PURE__ */ jsx("span", { className: "v2-headline block text-center", style: { fontSize: "clamp(3rem, 6vw, 5rem)", color: "var(--v2-white)" }, children: "2–6×" }),
              /* @__PURE__ */ jsx("span", { className: "v2-label block text-center mt-2", style: { fontSize: "1rem" }, children: "AVERAGE RETURN ON INVESTMENT" }),
              /* @__PURE__ */ jsx("p", { className: "mt-4 text-center", style: { fontSize: "1rem", color: "rgba(255,255,255,.7)", lineHeight: 1.6 }, children: "There is no better return on your money than hiring an owner's rep. Our clients see an average of 2–6× their investment returned, with accountability and oversight that pays for itself many times over." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-8 md:p-10", style: { background: "rgba(0,107,63,.15)", border: "1px solid var(--v2-rule)" }, children: [
              /* @__PURE__ */ jsx("p", { style: { fontStyle: "italic", fontSize: "1rem", color: "var(--v2-white)", lineHeight: 1.7 }, children: `"Think of it like a cop up the road with a radar gun. Are you gonna speed? The answer is no. That's what an owner's rep does. The contractors aren't going to cut corners because they know they'll get caught. That accountability alone saves you multiples of our fee."` }),
              /* @__PURE__ */ jsx("p", { className: "mt-4", style: { fontSize: "1rem", color: "var(--v2-neon)", textTransform: "uppercase", letterSpacing: "0.12em" } })
            ] })
          ]
        }
      )
    ] })
  ] }) }) });
};
const AIPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "v2 min-h-screen overflow-x-hidden", children: [
    /* @__PURE__ */ jsx(V2Nav, {}),
    /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsx("div", { className: "pt-16 md:pt-20", children: /* @__PURE__ */ jsx(AISection, {}) }) }),
    /* @__PURE__ */ jsx(V2Footer, {})
  ] });
};
const ease$1 = [0.16, 1, 0.3, 1];
const featured = {
  quote: "They handled our VIP event space build from start to finish. What started as a small mural project turned into a complete facility build-out. That's what trust looks like — you earn it, then you deliver.",
  name: "Gary Cummings",
  title: "VP Operations, Carroll Shelby International"
};
const testimonials = [
  {
    quote: "We hired Lïef for a complete home remodel and they exceeded every expectation. Hands-on throughout the entire process. The attention to detail was unmatched and the project came in on time.",
    name: "Michael R.",
    title: "Homeowner, Orange County"
  },
  {
    quote: "From design through completion, the communication was flawless. They walked us through every decision and made sure we understood the budget implications before moving forward. True professionals.",
    name: "Sarah & David K.",
    title: "Homeowners, Santa Barbara"
  },
  {
    quote: "After getting burned by two previous contractors, bringing in an owner's rep was a breath of fresh air. Transparent about costs, realistic about timelines, and the quality of work speaks for itself.",
    name: "Robert T.",
    title: "Commercial Property Owner, Costa Mesa"
  },
  {
    quote: "The Keller Williams office buildout was handled with precision. The team understood our brand requirements and translated them into a workspace that our agents are proud to call home.",
    name: "Branch Manager",
    title: "Keller Williams, Los Angeles"
  },
  {
    quote: "We were overwhelmed after the fire and had no idea where to start. Lïef came in, took over the insurance coordination, vetted every contractor, and saved us nearly 10% on the total rebuild. Worth every penny.",
    name: "Patricia & Mark D.",
    title: "Homeowners, Santa Barbara Fire Rebuild"
  },
  {
    quote: "We built from the ground up and thought we could manage it ourselves. Within two months we were drowning in change orders and missed deadlines. Lïef stepped in, renegotiated three major contracts, and got us back on track. We would have lost six figures without them.",
    name: "Daniel & Christine W.",
    title: "Custom Home Build, Scottsdale"
  }
];
const Testimonials = () => {
  const { ref, inView } = useInView$1(0.1);
  return /* @__PURE__ */ jsx("section", { id: "testimonials", className: "relative py-20 md:py-28", style: { background: "var(--v2-deep)" }, children: /* @__PURE__ */ jsx("div", { ref, className: "relative z-10 max-w-[1400px] mx-auto px-6 md:px-12", children: /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 35 },
        animate: inView ? { opacity: 1, y: 0 } : false,
        transition: { duration: 0.75, ease: ease$1 },
        className: "relative mb-12",
        children: [
          /* @__PURE__ */ jsx("div", { className: "v2-ghost-text absolute top-0 right-0 md:-right-6", style: { fontSize: "min(9.6vw, 120px)", lineHeight: 1, color: "rgba(0,107,63,.24)" }, children: "TRUSTED" }),
          /* @__PURE__ */ jsx("div", { className: "v2-label mb-6", children: "Testimonials" }),
          /* @__PURE__ */ jsxs("h2", { className: "v2-headline text-4xl md:text-6xl lg:text-7xl mb-4", style: { color: "var(--v2-white)" }, children: [
            "WHAT OUR",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { style: { color: "var(--v2-neon)" }, children: "CLIENTS ARE SAYING" }),
            /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "." })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "max-w-[600px]", style: { fontSize: "1.1rem", color: "var(--v2-dim)", lineHeight: 1.6 }, children: "25+ years of client trust across Southern California and the Southwest. Same standards, same results. Now protecting property owners across three markets." })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 35 },
        animate: inView ? { opacity: 1, y: 0 } : false,
        transition: { duration: 0.75, delay: 0.15, ease: ease$1 },
        className: "p-8 md:p-12 mb-8",
        style: { background: "var(--v2-green)" },
        children: [
          /* @__PURE__ */ jsx("span", { style: { fontSize: "3rem", lineHeight: 1, color: "rgba(0,255,136,.3)", fontFamily: "Georgia, serif" }, children: "“" }),
          /* @__PURE__ */ jsxs("p", { className: "mt-2", style: { fontStyle: "italic", fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)", color: "var(--v2-white)", lineHeight: 1.7 }, children: [
            "“",
            featured.quote,
            "”"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
            /* @__PURE__ */ jsx("span", { className: "block", style: { fontWeight: 700, fontSize: "1rem", color: "var(--v2-white)", textTransform: "uppercase", letterSpacing: "0.06em" }, children: featured.name }),
            /* @__PURE__ */ jsx("span", { className: "v2-label mt-1 block", style: { fontSize: "1rem" }, children: featured.title })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 35 },
        animate: inView ? { opacity: 1, y: 0 } : false,
        transition: { duration: 0.75, delay: 0.25, ease: ease$1 },
        className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-12",
        children: testimonials.map((t, i) => /* @__PURE__ */ jsxs("div", { className: "p-6", style: { background: "rgba(0,107,63,.04)", border: "1px solid var(--v2-rule)" }, children: [
          /* @__PURE__ */ jsx("span", { style: { fontSize: "2rem", lineHeight: 1, color: "rgba(0,255,136,.2)", fontFamily: "Georgia, serif" }, children: "“" }),
          /* @__PURE__ */ jsxs("p", { className: "mt-2", style: { fontStyle: "italic", fontSize: "1rem", color: "var(--v2-muted)", lineHeight: 1.6 }, children: [
            "“",
            t.quote,
            "”"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 pt-4", style: { borderTop: "1px solid var(--v2-rule)" }, children: [
            /* @__PURE__ */ jsx("span", { className: "block", style: { fontWeight: 700, fontSize: "1rem", color: "var(--v2-white)" }, children: t.name }),
            /* @__PURE__ */ jsx("span", { className: "block mt-1", style: { fontSize: "1rem", color: "var(--v2-dim)" }, children: t.title })
          ] })
        ] }, i))
      }
    ),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: inView ? { opacity: 1 } : false,
        transition: { duration: 0.75, delay: 0.35, ease: ease$1 },
        className: "text-center",
        children: /* @__PURE__ */ jsx("span", { style: { fontSize: "1rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--v2-dim)" }, children: "YELP · HOUZZ · 5/5 RATING · A+ BBB" })
      }
    )
  ] }) }) });
};
const TestimonialsPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "v2 min-h-screen overflow-x-hidden", children: [
    /* @__PURE__ */ jsx(V2Nav, {}),
    /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsx("div", { className: "pt-16 md:pt-20", children: /* @__PURE__ */ jsx(Testimonials, {}) }) }),
    /* @__PURE__ */ jsx(V2Footer, {})
  ] });
};
const WEBHOOK_URL = "https://services.leadconnectorhq.com/hooks/WK0O8qIOM6F7gCWe6mlC/webhook-trigger/56e0d7db-3ffa-4014-9f09-29882aceb2f7";
const ease = [0.16, 1, 0.3, 1];
const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  background: "#ffffff",
  border: "1px solid rgba(0,0,0,.15)",
  color: "#1A1A1A",
  fontFamily: "var(--v2-font-body)",
  fontSize: "1rem",
  outline: "none",
  borderRadius: "2px"
};
const labelStyle = {
  fontSize: "1rem",
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  color: "#1A1A1A",
  marginBottom: "8px",
  display: "block",
  fontWeight: 600
};
const ContactModal = () => {
  const { isOpen, closeModal } = useContactModal();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const backdropRef = useRef(null);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeModal]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: form.firstName,
          last_name: form.lastName,
          email: form.email,
          message: form.message
        })
      });
      setStatus("sent");
      setForm({ firstName: "", lastName: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };
  const handleClose = () => {
    closeModal();
    setTimeout(() => {
      setStatus("idle");
    }, 300);
  };
  const handleBackdropClick = (e) => {
    if (e.target === backdropRef.current) handleClose();
  };
  return /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsx(
    motion.div,
    {
      ref: backdropRef,
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.3 },
      onClick: handleBackdropClick,
      className: "fixed inset-0 z-[100] flex items-center justify-center px-4",
      style: { background: "rgba(0,0,0,.8)", backdropFilter: "blur(8px)" },
      children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30, scale: 0.97 },
          animate: { opacity: 1, y: 0, scale: 1 },
          exit: { opacity: 0, y: 20, scale: 0.97 },
          transition: { duration: 0.4, ease },
          className: "relative w-full max-w-[500px] p-8 md:p-10",
          style: {
            background: "#006B3F",
            border: "1px solid rgba(0,255,136,.3)",
            boxShadow: "0 40px 80px rgba(0,0,0,.5)"
          },
          children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: handleClose,
                className: "absolute top-4 right-4 transition-colors duration-300 hover:text-[#0a0a0a]",
                style: { background: "none", border: "none", cursor: "pointer", color: "#ffffff" },
                children: /* @__PURE__ */ jsx(X, { size: 20 })
              }
            ),
            status === "sent" ? /* @__PURE__ */ jsxs("div", { className: "text-center py-8", children: [
              /* @__PURE__ */ jsx(
                "h3",
                {
                  className: "v2-headline mb-4",
                  style: { fontSize: "1.4rem", letterSpacing: "0.1em", color: "#ffffff" },
                  children: "MESSAGE SENT"
                }
              ),
              /* @__PURE__ */ jsx("p", { style: { fontSize: "1.05rem", color: "#1A1A1A", lineHeight: 1.6 }, children: "We'll be in touch shortly." }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: handleClose,
                  className: "mt-6 transition-all duration-300 hover:brightness-110",
                  style: {
                    fontFamily: "var(--v2-font-body)",
                    fontSize: "1rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    background: "transparent",
                    color: "#ffffff",
                    border: "1px solid #ffffff",
                    padding: "10px 28px",
                    cursor: "pointer"
                  },
                  children: "Close"
                }
              )
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(
                "h3",
                {
                  className: "v2-headline mb-2",
                  style: { fontSize: "1.2rem", letterSpacing: "0.1em", color: "#ffffff" },
                  children: "START A CONVERSATION"
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "mb-6", style: { fontSize: "1rem", color: "#1A1A1A", lineHeight: 1.5 }, children: "Tell us about your project. We'll follow up within 24 hours." }),
              /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { style: labelStyle, children: "First Name" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        required: true,
                        style: inputStyle,
                        value: form.firstName,
                        onChange: (e) => setForm({ ...form, firstName: e.target.value })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { style: labelStyle, children: "Last Name" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        required: true,
                        style: inputStyle,
                        value: form.lastName,
                        onChange: (e) => setForm({ ...form, lastName: e.target.value })
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { style: labelStyle, children: "Email" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      required: true,
                      type: "email",
                      style: inputStyle,
                      value: form.email,
                      onChange: (e) => setForm({ ...form, email: e.target.value })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { style: labelStyle, children: "Message" }),
                  /* @__PURE__ */ jsx(
                    "textarea",
                    {
                      rows: 4,
                      style: inputStyle,
                      value: form.message,
                      onChange: (e) => setForm({ ...form, message: e.target.value })
                    }
                  )
                ] }),
                status === "error" && /* @__PURE__ */ jsx("p", { style: { fontSize: "1rem", color: "#ff4444" }, children: "Something went wrong. Please try again." }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "submit",
                    disabled: status === "sending",
                    className: "w-full transition-all duration-300 hover:brightness-110",
                    style: {
                      fontFamily: "var(--v2-font-body)",
                      fontSize: "1rem",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.14em",
                      background: "#0a0a0a",
                      color: "#ffffff",
                      border: "none",
                      padding: "14px 24px",
                      cursor: status === "sending" ? "wait" : "pointer",
                      opacity: status === "sending" ? 0.7 : 1
                    },
                    children: status === "sending" ? "Sending..." : "Send Message"
                  }
                )
              ] })
            ] })
          ]
        }
      )
    }
  ) });
};
const queryClient = new QueryClient();
const AppInner = () => /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxs(TooltipProvider, { children: [
  /* @__PURE__ */ jsx(Toaster$1, {}),
  /* @__PURE__ */ jsx(Toaster, {}),
  /* @__PURE__ */ jsxs(ContactModalProvider, { children: [
    /* @__PURE__ */ jsxs(Routes, { children: [
      /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(V2, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/v1", element: /* @__PURE__ */ jsx(Index, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/about", element: /* @__PURE__ */ jsx(About, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/projects", element: /* @__PURE__ */ jsx(ProjectsPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/sabs", element: /* @__PURE__ */ jsx(LiefBlocks, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/liefblocks", element: /* @__PURE__ */ jsx(LiefBlocks, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/ai", element: /* @__PURE__ */ jsx(AIPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/team", element: /* @__PURE__ */ jsx(TeamPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/testimonials", element: /* @__PURE__ */ jsx(TestimonialsPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(NotFound, {}) })
    ] }),
    /* @__PURE__ */ jsx(ContactModal, {})
  ] })
] }) });
function render(url) {
  return renderToString(
    /* @__PURE__ */ jsx(StaticRouter, { location: url, children: /* @__PURE__ */ jsx(AppInner, {}) })
  );
}
export {
  render
};
