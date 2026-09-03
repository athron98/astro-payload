// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import node from "@astrojs/node";
import { loadEnv } from "payload/node";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
loadEnv();

// https://astro.build/config
export default defineConfig( {
    site: 'http://site.lvh.me:4321',
    i18n: {
        locales: [
            "en",
            "id"
        ],
        defaultLocale: "en",
        routing: 'manual',
    },

    adapter: node( {
        mode: "standalone",
    } ),

    fonts: [
        {
            provider: fontProviders.google(),
            name: "Inter",
            cssVariable: "--font-inter",
        },
    ],

    integrations: [
        react(),
    ],

    vite: {
        // @ts-ignore
        plugins: [
            tailwindcss(),
        ],
    },
} );
