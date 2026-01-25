/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0D0D0D',
        foreground: '#F5F5F5',
        card: '#171717',
        muted: '#292929',
        'muted-foreground': '#A6A6A6',
        border: '#2E2E2E',
        'accent-orange': '#F97316',
        'accent-orange-muted': '#CC5A10',
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        'spec-tight': '-0.01em',
        'spec-normal': '0.025em',
        'spec-wide': '0.04em',
        'spec-wider': '0.05em',
        'spec-widest': '0.08em',
      },
    },
  },
  plugins: [],
}
