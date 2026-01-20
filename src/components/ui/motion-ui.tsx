"use client";

import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

// Fade In Animation
export const FadeIn = ({
    children,
    className,
    delay = 0,
    duration = 0.5,
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// Slide In Animation (good for sidebars or lists)
export const SlideIn = ({
    children,
    className,
    delay = 0,
    direction = "left",
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    direction?: "left" | "right" | "up" | "down";
}) => {
    const variants: Variants = {
        hidden: {
            x: direction === "left" ? -20 : direction === "right" ? 20 : 0,
            y: direction === "up" ? 20 : direction === "down" ? -20 : 0,
            opacity: 0,
        },
        visible: {
            x: 0,
            y: 0,
            opacity: 1,
            transition: { duration: 0.4, delay, ease: "easeOut" },
        },
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={variants}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// Scale on Hover (for interactive cards/buttons)
export const ScaleHover = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn("cursor-pointer", className)}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
            {children}
        </motion.div>
    );
};

// Stagger Container for lists
export const StaggerContainer = ({
    children,
    className,
    delayChildren = 0,
    staggerChildren = 0.1,
}: {
    children: React.ReactNode;
    className?: string;
    delayChildren?: number;
    staggerChildren?: number;
}) => {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        delayChildren,
                        staggerChildren,
                    },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};
