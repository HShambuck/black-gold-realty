'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Loader } from 'lucide-react';
import { useUI } from '@/context/UIContext';
import { siteContent } from '@/data/siteContent';
import GoldButton from './GoldButton';
import clsx from 'clsx';

const { contact } = siteContent;

export default function LeadCaptureModal() {
  const { modalOpen, closeModal, modalProperty } = useUI();

  const [form, setForm]     = useState({ name: '', email: '', phone: '', interest: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors]   = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name  = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    if (!form.phone.trim()) e.phone = 'Phone is required';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }
    setLoading(true);
    // Simulate API call — replace with real endpoint
    await new Promise((res) => setTimeout(res, 1500));
    setLoading(false);
    setSuccess(true);
  };

  const handleClose = () => {
    closeModal();
    setTimeout(() => {
      setForm({ name: '', email: '', phone: '', interest: '', message: '' });
      setSuccess(false);
      setErrors({});
    }, 300);
  };

  return (
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          key="lead-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="modal-overlay"
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          <motion.div
            key="lead-modal-content"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative w-full max-w-lg bg-obsidian-900 border border-gold-500/20 rounded-xl2 shadow-gold overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            {/* Gold top accent */}
            <div className="h-0.5 bg-gold-gradient" />

            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8">
              {!success ? (
                <>
                  {/* Header */}
                  <div className="mb-7">
                    <p className="font-sans text-gold-500 text-xs tracking-[0.3em] uppercase mb-2">
                      {modalProperty ? 'Enquire About This Property' : 'Book a Consultation'}
                    </p>
                    <h2 className="font-display text-white text-3xl font-semibold">
                      {modalProperty ? modalProperty.title : 'Speak to a Specialist'}
                    </h2>
                    {modalProperty && (
                      <p className="font-sans text-white/40 text-sm mt-1">
                        {modalProperty.subtitle} — {modalProperty.priceLabel}
                      </p>
                    )}
                    <div className="h-px w-12 bg-gold-500/40 mt-4" />
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="block font-sans text-white/50 text-xs tracking-widest uppercase mb-2">
                        Full Name *
                      </label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className={clsx('input-luxury', errors.name && 'border-red-500/50')}
                      />
                      {errors.name && (
                        <p className="text-red-400 text-xs mt-1 font-sans">{errors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block font-sans text-white/50 text-xs tracking-widest uppercase mb-2">
                        Email Address *
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className={clsx('input-luxury', errors.email && 'border-red-500/50')}
                      />
                      {errors.email && (
                        <p className="text-red-400 text-xs mt-1 font-sans">{errors.email}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block font-sans text-white/50 text-xs tracking-widest uppercase mb-2">
                        Phone / WhatsApp *
                      </label>
                      <input
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+1 000 000 0000"
                        className={clsx('input-luxury', errors.phone && 'border-red-500/50')}
                      />
                      {errors.phone && (
                        <p className="text-red-400 text-xs mt-1 font-sans">{errors.phone}</p>
                      )}
                    </div>

                    {/* Interest */}
                    <div>
                      <label className="block font-sans text-white/50 text-xs tracking-widest uppercase mb-2">
                        I Am Interested In
                      </label>
                      <select
                        name="interest"
                        value={form.interest}
                        onChange={handleChange}
                        className="input-luxury"
                      >
                        <option value="">Select an option</option>
                        {contact.formFields.interest.options.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block font-sans text-white/50 text-xs tracking-widest uppercase mb-2">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={3}
                        placeholder={
                          modalProperty
                            ? `I'm interested in ${modalProperty.title}…`
                            : "Tell us what you're looking for…"
                        }
                        className="input-luxury resize-none"
                      />
                    </div>

                    <GoldButton
                      type="submit"
                      fullWidth
                      size="lg"
                      disabled={loading}
                      icon={loading ? <Loader className="w-4 h-4 animate-spin" /> : null}
                      iconPosition="right"
                    >
                      {loading ? 'Submitting…' : 'Send Enquiry'}
                    </GoldButton>

                    <p className="font-sans text-white/25 text-xs text-center">
                      We respond within 2 hours. Your information is kept private.
                    </p>
                  </form>
                </>
              ) : (
                /* SUCCESS STATE */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-gold-500" />
                  </div>
                  <h3 className="font-display text-white text-3xl font-semibold mb-3">
                    Thank You, {form.name.split(' ')[0]}
                  </h3>
                  <p className="font-sans text-white/50 text-base leading-relaxed mb-6">
                    Your enquiry has been received. A specialist from our team will contact you
                    within 2 hours via your preferred channel.
                  </p>
                  <div className="h-px w-12 bg-gold-500/40 mx-auto mb-6" />
                  <GoldButton onClick={handleClose} variant="outline" size="md">
                    Close
                  </GoldButton>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}