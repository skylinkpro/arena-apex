import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  return (
    <div className="section-container section pt-[var(--navbar-h)]">
      <h1 className="text-4xl font-heading font-bold mb-6">Contact Us</h1>
      <p className="text-lg text-muted-foreground mb-8">Have questions? We&apos;d love to hear from you.</p>
      <div className="max-w-2xl">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <Input placeholder="Your name" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input type="email" placeholder="your@email.com" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Message</label>
            <Textarea placeholder="How can we help?" className="min-h-[150px]" />
          </div>
          <Button size="lg" className="w-full">Send Message</Button>
        </form>
      </div>
    </div>
  );
}
