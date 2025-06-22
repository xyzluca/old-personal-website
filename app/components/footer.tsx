export default function Footer() {
  return (
    <footer className="mb-16 mt-16">
      <div className="flex justify-between items-center text-xs text-neutral-400 dark:text-neutral-600">
        <p>
          © {new Date().getFullYear()} luca kursawe 
        </p>
        <a 
          href="https://nextjs.org" 
          className="hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          Next.js - Custom site builder
        </a>
      </div>
    </footer>
  )
}
