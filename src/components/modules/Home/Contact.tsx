import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Mail, MapPin, Phone, Clock, Send, Package, Truck, CheckCircle
} from "lucide-react";
import { toast } from "sonner";

export const Contact = () => {
    useEffect(() => {
        document.title = "Contact | SwiftParcel ";
      }, []);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      toast.success("Your message has been sent! Our support team will reach out soon.");
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    { icon: Mail, title: "Email Us", description: "For customer support & inquiries", value: "support@deliveryexpress.com", action: "mailto:support@deliveryexpress.com" },
    { icon: Phone, title: "Call Us", description: "Speak with our delivery support", value: "+880 1234-567890", action: "tel:+8801234567890" },
    { icon: MapPin, title: "Head Office", description: "Visit our service center", value: "Sreemongal, Sylhet, Bangladesh", action: "#" },
    { icon: Clock, title: "Working Hours", description: "We’re available to assist", value: "Sat-Thu: 9AM - 9PM", action: "#" }
  ];

  const reasons = [
    { icon: Package, title: "Parcel Inquiries", description: "Questions about sending or tracking a parcel" },
    { icon: Truck, title: "Delivery Support", description: "Need help with a pickup, delay, or lost package" },
    { icon: Mail, title: "Business Partnership", description: "Collaborations with eCommerce & enterprises" }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50  dark:bg-gradient-to-br dark:from-slate-800 dark:via-slate-900 dark:to-slate-800">

      {/* Hero Section */}
      <div
          className="text-center py-10 transition-all duration-700 transform"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Have questions about our services? We're here to help. Send us a
            message and we'll respond as soon as possible.
          </p>
        </div>


      {/* Contact Info Cards */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {contactInfo.map((info, index) => {
          const Icon = info.icon;
          return (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold  mb-2">{info.title}</h3>
                <p className="text-sm text-slate-400 mb-3">{info.description}</p>
                <a href={info.action} className="font-semibold text-slate-400">{info.value}</a>
              </CardContent>
            </Card>
          );
        })}
      </section>

      {/* Contact Form */}
      <section className="pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <Card className="shadow-2xl border-0">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required placeholder="Your full name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="your@email.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input id="subject" name="subject" type="text" value={formData.subject} onChange={handleChange} required placeholder="What's this about?" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={6} placeholder="Tell us more..." />
                  </div>
                  <Button type="submit" size="lg" disabled={isSubmitting} className="w-full bg-blue-500 hover:bg-blue-600 font-semibold">
                    {isSubmitting ? "Sending..." : <><Send className="mr-2 h-4 w-4" />Send Message</>}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold  mb-6">Why Contact Us?</h3>
                <div className="space-y-4">
                  {reasons.map((reason, index) => {
                    const Icon = reason.icon;
                    return (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">{reason.title}</h4>
                          <p className="text-sm text-slate-400">{reason.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Quick Response</h3>
                </div>
                <p className="text-slate-700 mb-4">We typically respond to parcel inquiries within 24 hours.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
