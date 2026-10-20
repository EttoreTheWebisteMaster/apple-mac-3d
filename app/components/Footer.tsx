import { footerLinks } from "../constants";

export default function Footer() {
  return (
    <footer>
      <div className="info">
        <p>
          More way tho shop: Find an Apple Store or other retailer near you. Or
          call 555-004219
        </p>
        <img src="/logo.svg" alt="Apple Logo" />
      </div>

      <hr />

      <div className="links">
        <p>Copyright © 2026 Apple Inc. All rights reserved.</p>

        <ul>
          {footerLinks.map(({ label, link }) => (
            <li key={label}>
              <a href={link}>{label}</a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
