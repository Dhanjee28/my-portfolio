"use client";

import emailjs from "@emailjs/browser";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import { profile } from "@/data/portfolio";

type ContactFormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FormStatus = "idle" | "sending" | "success" | "error";

const initialFormState: ContactFormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const emailJsConfig = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_ci1m7vg",
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_67yo81k",
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "fd4nrv8V1lVFAGUeZ",
  recipientEmail: process.env.NEXT_PUBLIC_CONTACT_TO_EMAIL || profile.links.emailLabel,
};

export function Contact() {
  const [formState, setFormState] = useState<ContactFormState>(initialFormState);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange =
    (field: keyof ContactFormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormState((current) => ({
        ...current,
        [field]: event.target.value,
      }));

      if (status !== "idle") {
        setStatus("idle");
        setStatusMessage("");
      }
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (status === "sending") {
      return;
    }

    setStatus("sending");
    setStatusMessage("");

    const senderName = formState.name.trim();
    const senderEmail = formState.email.trim();
    const subject = formState.subject.trim();
    const message = formState.message.trim();

    if (!senderName || !senderEmail || !subject || !message) {
      setStatus("error");
      setStatusMessage("Please complete all fields before sending.");
      return;
    }

    try {
      await emailjs.send(
        emailJsConfig.serviceId,
        emailJsConfig.templateId,
        {
          to_email: emailJsConfig.recipientEmail,
          recipient_email: emailJsConfig.recipientEmail,
          to_name: `${profile.firstName} ${profile.lastName}`,
          from_name: senderName,
          from_email: senderEmail,
          reply_to: senderEmail,
          name: senderName,
          email: senderEmail,
          subject,
          title: subject,
          message,
          time: new Date().toLocaleString("en-IN", {
            dateStyle: "medium",
            timeStyle: "short",
          }),
        },
        emailJsConfig.publicKey,
      );

      setFormState(initialFormState);
      setStatus("success");
      setStatusMessage(`Message sent to ${emailJsConfig.recipientEmail}. I will get back to you soon.`);
    } catch (error) {
      console.error("EmailJS send failed", error);
      setStatus("error");
      setStatusMessage("Message could not be sent. Please email me directly.");
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-title">
      <div className="section-label">Contact</div>
      <h2 className="section-title" id="contact-title">
        Let's work together
      </h2>

      <div className="contact-grid">
        <div className="contact-panel">
          <h3>Open to opportunities</h3>
          <p>
            I am open to entry-level and early-career backend, full-stack, software
            engineering, and AI-adjacent engineering roles where I can work on APIs,
            debugging, and reliable product systems.
          </p>

          <div className="contact-links" aria-label="Contact links">
            <a className="contact-link" href={profile.links.github} target="_blank" rel="noreferrer">
              <span className="contact-link-icon">GH</span>
              github.com/Dhanjee28
            </a>
            <a className="contact-link" href={profile.links.email}>
              <span className="contact-link-icon">@</span>
              {profile.links.emailLabel}
            </a>
            <a className="contact-link" href={profile.links.linkedin} target="_blank" rel="noreferrer">
              <span className="contact-link-icon">IN</span>
              linkedin.com/in/dhanjeetiwari
            </a>
            <a className="contact-link" href={profile.links.phone}>
              <span className="contact-link-icon">PH</span>
              {profile.links.phoneLabel}
            </a>
          </div>
        </div>

        <div className="contact-panel">
          <h3>Send a message</h3>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="contact-name">
                  Name
                </label>
                <input
                  autoComplete="name"
                  className="form-input"
                  id="contact-name"
                  name="name"
                  onChange={handleChange("name")}
                  placeholder="Jane Doe"
                  required
                  value={formState.name}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-email">
                  Email
                </label>
                <input
                  autoComplete="email"
                  className="form-input"
                  id="contact-email"
                  name="email"
                  onChange={handleChange("email")}
                  placeholder="jane@example.com"
                  required
                  type="email"
                  value={formState.email}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="contact-subject">
                Subject
              </label>
              <input
                className="form-input"
                id="contact-subject"
                name="subject"
                onChange={handleChange("subject")}
                placeholder="Project opportunity"
                required
                value={formState.subject}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="contact-message">
                Message
              </label>
              <textarea
                className="form-textarea"
                id="contact-message"
                name="message"
                onChange={handleChange("message")}
                placeholder="Tell me about your project or opportunity..."
                required
                value={formState.message}
              />
            </div>

            <button className="btn-primary contact-submit" disabled={status === "sending"} type="submit">
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>

            {statusMessage ? (
              <p
                aria-live="polite"
                className={`form-status form-status--${status === "success" ? "success" : "error"}`}
                role={status === "error" ? "alert" : "status"}
              >
                {statusMessage}
                {status === "error" ? (
                  <>
                    {" "}
                    <a href={profile.links.email}>Use email instead.</a>
                  </>
                ) : null}
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}
