import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            includeAssets: [
                "/fonts/Montserrat-VariableFont_wght.ttf",
                "icons/favicon.ico",
                "icons/apple-touch-icon.png",
            ],
            registerType: "prompt",
            manifest: {
                name: "Color Swap!",
                short_name: "Color Swap!",
                description:
                    "An infinitely replayable, randomly generated clone of the Colours game from Puzzledom",
                start_url: "/",
                background_color: "#fff9e7",
                theme_color: "#fff9e7",
                orientation: "portrait",
                display: "standalone",
                icons: [
                    {
                        src: "/icons/pwa-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                        purpose: "any",
                    },
                    {
                        src: "/icons/pwa-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "any",
                    },
                    {
                        src: "/icons/pwa-maskable-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                        purpose: "maskable",
                    },
                    {
                        src: "/icons/pwa-maskable-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "maskable",
                    },
                ],
            },
        }),
    ],
});
