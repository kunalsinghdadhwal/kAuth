"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import React, { ReactNode } from "react";

export default function ThemeProvider({
    children,
    ...props
}: {
    children: ReactNode;
    }) {
    return (
        <NextThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem={true}
            {...props}
        >
            {children}
        </NextThemeProvider>
    );
}