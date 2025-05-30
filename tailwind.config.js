const animate = require("tailwindcss-animate");

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    safelist: ["dark"],

    content: ["./pages/**/*.{js,jsx,vue}", "./components/**/*.{js,jsx,vue}", "./app/**/*.{js,jsx,vue}", "./src/**/*.{js,jsx,vue}", "./src/**/*.{vue,js,ts,jsx,tsx}", "./public/**/*.html"],

    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            fontSize: {
                text13: ["13px", "16px"],
            },
            screens: {
                x: "420px",
            },

            colors: {
                primary_2: "var(--primary_2)",
                primary_light_2: "var(--primary_light_2)",
                secondary_2: "var(--secondary_2)",
                accent_2: "var(--accent_2)",
                foreground_2: "var(--foreground_2)",
                background_2: "var(--background_2)",
                text_2: "var(--text_2)",
                details: "var(--details)",
                details_2: "var(--details_2)",
                // ////////////////
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: 0 },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: 0 },
                },
                "collapsible-down": {
                    from: { height: 0 },
                    to: { height: "var(--radix-collapsible-content-height)" },
                },
                "collapsible-up": {
                    from: { height: "var(--radix-collapsible-content-height)" },
                    to: { height: 0 },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "collapsible-down": "collapsible-down 0.2s ease-in-out",
                "collapsible-up": "collapsible-up 0.2s ease-in-out",
            },
            fontFamily: {
                roboto: ["Roboto", " sans-serif"],
            },
            gridTemplateColumns: {
                13: "repeat(auto-fit, minmax(1fr, 300px))",
            },
        },
    },
    plugins: [animate],
};
