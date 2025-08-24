export function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Utkal ExamHub</h3>
            <p className="text-blue-200 text-sm">
              Your comprehensive guide to competitive exams in Odisha. Find the best courses, institutes, and prices all
              in one place.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-blue-200 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/exam/opsc-oas" className="text-blue-200 hover:text-white transition-colors">
                  OPSC OAS
                </a>
              </li>
              <li>
                <a href="/exam/ossc-cgl" className="text-blue-200 hover:text-white transition-colors">
                  OSSC CGL
                </a>
              </li>
              <li>
                <a href="/favorites" className="text-blue-200 hover:text-white transition-colors">
                  My Favorites
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-blue-200 text-sm">
              Have questions? We're here to help you find the perfect course for your exam preparation.
            </p>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-8 pt-8 text-center">
          <p className="text-blue-200 text-sm">© 2024 Utkal ExamHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
