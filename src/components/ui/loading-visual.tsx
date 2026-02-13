"use client";

import React from "react";
import { motion } from "framer-motion";
import { Coins } from "lucide-react";

interface LoadingVisualProps {
    message?: string;
    className?: string;
}

export const LoadingVisual = ({ message = "Loading...", className }: LoadingVisualProps) => {
    return (
        <div className={`flex flex-col items-center gap-6 ${className}`}>
            <motion.div
                animate={{
                    rotateY: [0, 180, 360],
                    y: [0, -20, 0],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    times: [0, 0.5, 1],
                }}
                className="relative flex items-center justify-center p-6 bg-primary/10 rounded-full"
            >
                <Coins className="w-16 h-16 text-primary" strokeWidth={1.5} />
            </motion.div>

            <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg font-medium text-foreground/80 tracking-wide font-body"
            >
                {message}
            </motion.p>
        </div>
    );
};
