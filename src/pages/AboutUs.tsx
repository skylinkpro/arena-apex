export default function AboutUs() {
  return (
    <div className="section-container section pt-[var(--navbar-h)]">
      <h1 className="text-4xl font-heading font-bold mb-6">About Arn-Apex</h1>
      <p className="text-lg text-muted-foreground mb-8">We are building the future of decentralized AI gaming.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-card border border-border rounded-xl">
          <h3 className="text-2xl font-heading font-bold mb-4">Our Mission</h3>
          <p className="text-muted-foreground">To create a living, breathing digital universe where player actions truly matter.</p>
        </div>
        <div className="p-6 bg-card border border-border rounded-xl">
          <h3 className="text-2xl font-heading font-bold mb-4">The Team</h3>
          <p className="text-muted-foreground">A global team of veterans from gaming, AI research, and blockchain development.</p>
        </div>
      </div>
    </div>
  );
}
