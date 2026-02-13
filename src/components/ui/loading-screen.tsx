"use client";

import React from "react";
import { useLoading } from "@/context/loading-context";
import { motion, AnimatePresence } from "framer-motion";
import { LoadingVisual } from "@/components/ui/loading-visual";

export const LoadingScreen = () => {
    const { isLoading, message } = useLoading();

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
                >
                    <LoadingVisual message={message} />
                </motion.div>
            )}
        </AnimatePresence>
    );
};
