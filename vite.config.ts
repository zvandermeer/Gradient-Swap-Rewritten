import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            includeAssets: [
                "/src/assets/fonts/Montserrat-VariableFont_wght.ttf",
                "/src/assets/icons/favicon.ico",
                "/src/assets/icons/apple-touch-icon.png",
                "/src/assets/splash_screens/*.png",
            ],
            registerType: "autoUpdate",
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
                        src: "/src/assets/icons/pwa-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                        purpose: "any",
                    },
                    {
                        src: "/src/assets/icons/pwa-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "any",
                    },
                    {
                        src: "/src/assets/icons/pwa-maskable-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                        purpose: "maskable",
                    },
                    {
                        src: "/src/assets/icons/pwa-maskable-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "maskable",
                    },
                ],
            },
        }),
    ],
});
