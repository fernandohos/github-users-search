/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            "octodex.github.com",
            "avatars.githubusercontent.com",
            "github.com",
        ],
    },
};

module.exports = nextConfig;
