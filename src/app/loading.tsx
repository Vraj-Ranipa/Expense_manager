"use client";

import { motion } from "framer-motion";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/50 backdrop-blur-xl">
            <div className="relative flex flex-col items-center justify-center gap-4">
                {/* Outer Ring */}
                <div className="relative size-24">
                    <motion.div
                        className="absolute inset-0 rounded-full border-t-2 border-l-2 border-primary/50"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                        className="absolute inset-2 rounded-full border-b-2 border-r-2 border-accent/50"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ opacity: 0.5, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                    >
                        <div className="size-4 rounded-full bg-primary shadow-[0_0_15px_rgba(168,85,247,0.8)]" />
                    </motion.div>
                </div>

                <motion.p
                    className="text-sm font-medium tracking-widest text-primary/80 uppercase"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    Loading
                </motion.p>
            </div>
        </div>
    );
}
