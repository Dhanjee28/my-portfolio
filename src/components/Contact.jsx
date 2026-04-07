import { useState } from "react";
import "../styles/Contact.css";
import emailjs from '@emailjs/browser';

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
  e.preventDefault();
  emailjs.send(
    'service_gobztet',      // ← paste your Service ID
    'template_q56oe4r',     // ← paste your Template ID
    {
      from_name: formState.name,
      from_email: formState.email,
      subject: formState.subject,
      message: formState.message,
    },
    'Y_OFWj96_PGUCT-S5'       // ← paste your Public Key
  ).then(() => {
    setSubmitted(true);
  }).catch((err) => {
    alert('Failed to send. Please try again or email me directly!');
    console.error(err);
  });
};

  const handleChange = (field) => (e) =>
    setFormState({ ...formState, [field]: e.target.value });

  return (
    <section id="contact">
      <div className="reveal section-label">Contact</div>
      <div className="reveal reveal-delay-1 section-title">Let's Work Together</div>

      <div className="contact-grid">
        {/* Contact info */}
        <div className="reveal reveal-delay-2 contact-info">
          <h3>Open to opportunities</h3>
          <p>
            I'm currently open to full-time roles, internships, and freelance projects.
            Whether you have a question or just want to say hi, my inbox is always open.
          </p>
          <div className="contact-links">
            <a href="mailto:dhanjee.tiwari458@gmail.com" className="contact-link">
              <div className="contact-link-icon">📧</div>
              dhanjee.tiwari458@gmail.com
            </a>
            <a href="https://linkedin.com/in/dhanjeetiwari" target="_blank" rel="noreferrer" className="contact-link">
              <div className="contact-link-icon">💼</div>
              linkedin.com/in/dhanjeetiwari
            </a>
            <a href="tel:+916204946431" className="contact-link">
              <div className="contact-link-icon">📱</div>
              +91-6204946431
            </a>
            <div className="contact-link">
              <div className="contact-link-icon">📍</div>
              Hyderabad, India
            </div>
          </div>
        </div>

        {/* Contact form */}
        <div className="reveal reveal-delay-3">
          {submitted ? (
            <div className="form-success">
              ✅ Message sent! I'll get back to you soon.
            </div>
          ) : (
            <form className="form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input
                    className="form-input"
                    placeholder="Jane Doe"
                    required
                    value={formState.name}
                    onChange={handleChange("name")}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    className="form-input"
                    type="email"
                    placeholder="jane@example.com"
                    required
                    value={formState.email}
                    onChange={handleChange("email")}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Subject</label>
                <input
                  className="form-input"
                  placeholder="Project Opportunity"
                  required
                  value={formState.subject}
                  onChange={handleChange("subject")}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea
                  className="form-textarea"
                  placeholder="Tell me about your project or opportunity..."
                  required
                  value={formState.message}
                  onChange={handleChange("message")}
                />
              </div>
              <button type="submit" className="btn-primary" style={{ alignSelf: "flex-start" }}>
                Send Message →
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}